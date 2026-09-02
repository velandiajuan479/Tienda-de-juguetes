import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { Category } from '../types';
import { CategoryModel } from '../models/CategoryModel';

const COLLECTION_NAME = 'categories';
const LOCAL_STORAGE_KEY = 'toystore_categories_backup';

export class CategoryController {
  /**
   * Retrieves all categories from Firestore (with local fallback)
   */
  static async getCategories(): Promise<Category[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const categories: Category[] = [];
        querySnapshot.forEach((docSnap) => {
          categories.push({ id: docSnap.id, ...docSnap.data() } as Category);
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
        return categories;
      }
      
      // If empty in DB, let's seed defaults
      return await this.seedDefaultCategories();
    } catch (error) {
      console.warn('Firestore categories fetch warning, falling back to local store:', error);
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // parse error
        }
      }
      return await this.seedDefaultCategories();
    }
  }

  /**
   * Seeds default categories into the database
   */
  static async seedDefaultCategories(): Promise<Category[]> {
    const defaultData = CategoryModel.getDefaultCategories();
    const categories: Category[] = [];

    for (const cat of defaultData) {
      const newId = 'cat_' + Math.random().toString(36).substring(2, 9);
      const item: Category = {
        id: newId,
        ...cat,
      };
      categories.push(item);

      try {
        await setDoc(doc(db, COLLECTION_NAME, newId), {
          ...cat,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        console.warn('Failed seeding category to Firestore:', err);
      }
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
    return categories;
  }

  /**
   * Creates a new category
   */
  static async createCategory(categoryData: Omit<Category, 'id' | 'createdAt'>): Promise<Category> {
    const validation = CategoryModel.validate(categoryData);
    if (!validation.isValid) {
      throw new Error(Object.values(validation.errors)[0]);
    }

    const newId = 'cat_' + Math.random().toString(36).substring(2, 9);
    const newCategory: Category = {
      id: newId,
      ...categoryData,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, COLLECTION_NAME, newId), {
        ...categoryData,
        createdAt: newCategory.createdAt,
      });
    } catch (err) {
      console.warn('Firestore createCategory fallback:', err);
    }

    // Update local cache
    const existing = await this.getCachedCategories();
    const updated = [...existing, newCategory];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    return newCategory;
  }

  /**
   * Updates an existing category
   */
  static async updateCategory(id: string, categoryData: Partial<Category>): Promise<void> {
    const validation = CategoryModel.validate(categoryData);
    if (!validation.isValid) {
      throw new Error(Object.values(validation.errors)[0]);
    }

    const payload = {
      ...categoryData,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateDoc(doc(db, COLLECTION_NAME, id), payload);
    } catch (err) {
      console.warn('Firestore updateCategory fallback:', err);
    }

    // Update local cache
    const existing = await this.getCachedCategories();
    const updated = existing.map((c) => (c.id === id ? { ...c, ...payload } : c));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  /**
   * Deletes a category
   */
  static async deleteCategory(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (err) {
      console.warn('Firestore deleteCategory fallback:', err);
    }

    const existing = await this.getCachedCategories();
    const updated = existing.filter((c) => c.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  private static async getCachedCategories(): Promise<Category[]> {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return [];
      }
    }
    return [];
  }
}
