import { 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { auth, googleProvider, db } from '../services/firebase';
import { UserProfile, UserRole } from '../types';
import { UserModel, ROLE_PASSWORDS } from '../models/UserModel';

const USERS_COLLECTION = 'users';
const CURRENT_USER_KEY = 'toystore_current_user_profile';

export class AuthController {
  /**
   * Subscribes to Firebase Auth state changes and manages user profile in Firestore
   */
  static subscribeToAuth(callback: (user: UserProfile | null) => void): () => void {
    return onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
      if (!fbUser) {
        // Check if there is an active guest/demo user profile in local storage
        const saved = localStorage.getItem(CURRENT_USER_KEY);
        if (saved) {
          try {
            callback(JSON.parse(saved));
            return;
          } catch {
            // ignore
          }
        }
        callback(null);
        return;
      }

      try {
        const userDocRef = doc(db, USERS_COLLECTION, fbUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        let profile: UserProfile;

        if (userDocSnap.exists()) {
          profile = userDocSnap.data() as UserProfile;
          // Update last login
          await updateDoc(userDocRef, { lastLogin: new Date().toISOString() });
        } else {
          // Always create new accounts with 'cliente' role by default
          profile = {
            id: fbUser.uid,
            uid: fbUser.uid,
            email: fbUser.email || 'usuario@toystore.com',
            displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Cliente ToyStore',
            role: 'cliente',
            photoURL: fbUser.photoURL || undefined,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString(),
          };
          await setDoc(userDocRef, profile);
        }

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
        callback(profile);
      } catch (err) {
        console.warn('Error fetching user profile from Firestore:', err);
        const fallbackProfile: UserProfile = {
          id: fbUser.uid,
          uid: fbUser.uid,
          email: fbUser.email || 'usuario@toystore.com',
          displayName: fbUser.displayName || 'Usuario ToyStore',
          role: 'cliente',
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(fallbackProfile));
        callback(fallbackProfile);
      }
    });
  }

  /**
   * Google Sign-in with Firebase Auth (Always defaults to 'cliente' role)
   */
  static async signInWithGoogle(): Promise<UserProfile> {
    const result = await signInWithPopup(auth, googleProvider);
    const fbUser = result.user;

    const userDocRef = doc(db, USERS_COLLECTION, fbUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    let profile: UserProfile;
    if (userDocSnap.exists()) {
      profile = userDocSnap.data() as UserProfile;
    } else {
      profile = {
        id: fbUser.uid,
        uid: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || 'Cliente',
        role: 'cliente', // Strictly default to cliente
        photoURL: fbUser.photoURL || undefined,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };
      await setDoc(userDocRef, profile);
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
    return profile;
  }

  /**
   * Sign in with Email and Password
   */
  static async signInWithEmail(email: string, pass: string): Promise<UserProfile> {
    const result = await signInWithEmailAndPassword(auth, email, pass);
    const fbUser = result.user;

    const userDocRef = doc(db, USERS_COLLECTION, fbUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    let profile: UserProfile;
    if (userDocSnap.exists()) {
      profile = userDocSnap.data() as UserProfile;
    } else {
      profile = {
        id: fbUser.uid,
        uid: fbUser.uid,
        email: fbUser.email || email,
        displayName: fbUser.displayName || email.split('@')[0],
        role: 'cliente',
        createdAt: new Date().toISOString(),
      };
      await setDoc(userDocRef, profile);
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
    return profile;
  }

  /**
   * Register with Email, Password, Name, and optional password-protected Role
   */
  static async registerWithEmail(
    email: string, 
    pass: string, 
    displayName: string, 
    requestedRole: UserRole = 'cliente',
    rolePassword?: string
  ): Promise<UserProfile> {
    let finalRole: UserRole = 'cliente';

    // If requesting elevated role, verify password
    if (requestedRole === 'empleado' || requestedRole === 'admin') {
      if (!rolePassword || !UserModel.verifyRolePassword(requestedRole, rolePassword)) {
        throw new Error(
          `Clave de autorización incorrecta para el rol "${requestedRole.toUpperCase()}". Usa "${ROLE_PASSWORDS.empleado}" para Empleado o "${ROLE_PASSWORDS.admin}" para Administrador.`
        );
      }
      finalRole = requestedRole;
    }

    const result = await createUserWithEmailAndPassword(auth, email, pass);
    const fbUser = result.user;

    const profile: UserProfile = {
      id: fbUser.uid,
      uid: fbUser.uid,
      email: email.toLowerCase().trim(),
      displayName: displayName.trim() || email.split('@')[0],
      role: finalRole,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, USERS_COLLECTION, fbUser.uid), profile);
    } catch (e) {
      console.warn('Could not save new user to firestore:', e);
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(profile));
    return profile;
  }

  /**
   * Upgrade user role with Authorization Password
   */
  static async upgradeUserRoleWithPassword(
    userId: string,
    targetRole: UserRole,
    authPassword: string,
    currentProfile: UserProfile | null
  ): Promise<UserProfile> {
    if (targetRole === 'cliente') {
      // Downgrade or keep as cliente does not require password
      const updatedProfile: UserProfile = {
        ...(currentProfile || { id: userId, uid: userId, email: 'usuario@toystore.com', displayName: 'Usuario', role: 'cliente', createdAt: new Date().toISOString() }),
        role: 'cliente',
      };
      try {
        await updateDoc(doc(db, USERS_COLLECTION, userId), { role: 'cliente' });
      } catch (err) {
        console.warn('Firestore role update:', err);
      }
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedProfile));
      return updatedProfile;
    }

    if (!UserModel.verifyRolePassword(targetRole, authPassword)) {
      throw new Error(
        `Clave de autorización incorrecta para ${targetRole.toUpperCase()}. La clave para Empleado es "${ROLE_PASSWORDS.empleado}" y para Administrador es "${ROLE_PASSWORDS.admin}".`
      );
    }

    const updatedProfile: UserProfile = {
      ...(currentProfile || { id: userId, uid: userId, email: 'usuario@toystore.com', displayName: 'Usuario', role: targetRole, createdAt: new Date().toISOString() }),
      role: targetRole,
    };

    try {
      await updateDoc(doc(db, USERS_COLLECTION, userId), { role: targetRole });
    } catch (err) {
      console.warn('Firestore role update:', err);
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedProfile));
    return updatedProfile;
  }

  /**
   * Sign out
   */
  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  /**
   * List all users for Admin User Management
   */
  static async getAllUsers(): Promise<UserProfile[]> {
    try {
      const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
      if (!querySnapshot.empty) {
        const users: UserProfile[] = [];
        querySnapshot.forEach((docSnap) => {
          users.push({ id: docSnap.id, ...docSnap.data() } as UserProfile);
        });
        return users;
      }
      return this.getDemoUsersList();
    } catch {
      return this.getDemoUsersList();
    }
  }

  /**
   * Update a user's role (Admin operation)
   */
  static async updateUserRole(userId: string, newRole: UserRole): Promise<void> {
    try {
      await updateDoc(doc(db, USERS_COLLECTION, userId), { role: newRole });
    } catch (e) {
      console.warn('Failed to update user role in firestore:', e);
    }
  }

  private static getDemoUsersList(): UserProfile[] {
    return [
      {
        id: 'usr_admin_1',
        uid: 'usr_admin_1',
        displayName: 'Valeria Gómez (Admin)',
        email: 'valeria.admin@toystore.com',
        role: 'admin',
        createdAt: '2026-01-15T10:00:00.000Z',
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'usr_emp_1',
        uid: 'usr_emp_1',
        displayName: 'Carlos Mendoza (Ventas)',
        email: 'carlos.ventas@toystore.com',
        role: 'empleado',
        createdAt: '2026-02-01T14:30:00.000Z',
        lastLogin: new Date().toISOString(),
      },
      {
        id: 'usr_cli_1',
        uid: 'usr_cli_1',
        displayName: 'Andrea Silva',
        email: 'andrea.silva@gmail.com',
        role: 'cliente',
        createdAt: '2026-02-20T18:15:00.000Z',
        lastLogin: new Date().toISOString(),
      },
    ];
  }
}

