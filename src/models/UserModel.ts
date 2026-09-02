import { UserRole } from '../types';

export const ROLE_PASSWORDS: Record<'empleado' | 'admin', string> = {
  empleado: 'EMPLEADO2025',
  admin: 'ADMINTOYSTORE2025',
};

export class UserModel {
  /**
   * Helper to verify if the provided authorization code matches the role requirement
   */
  static verifyRolePassword(targetRole: UserRole, providedPassword: string): boolean {
    if (targetRole === 'cliente') return true;
    if (targetRole === 'empleado') {
      return providedPassword.trim() === ROLE_PASSWORDS.empleado;
    }
    if (targetRole === 'admin') {
      return providedPassword.trim() === ROLE_PASSWORDS.admin;
    }
    return false;
  }

  /**
   * Helper to check permissions based on user role
   */
  static can(role: UserRole, action: 'manage_toys' | 'manage_categories' | 'manage_users' | 'create_invoice' | 'view_all_invoices'): boolean {
    switch (action) {
      case 'manage_toys':
        // Empleado and Admin can manage toys
        return role === 'empleado' || role === 'admin';
      case 'manage_categories':
        // Only Admin can manage categories
        return role === 'admin';
      case 'manage_users':
        // Only Admin can manage users and assign roles
        return role === 'admin';
      case 'create_invoice':
        // Everyone (Cliente, Empleado, Admin) can create invoices
        return true;
      case 'view_all_invoices':
        // Empleado and Admin can view all store invoices; Cliente only views their own
        return role === 'empleado' || role === 'admin';
      default:
        return false;
    }
  }

  static getRoleBadge(role: UserRole): { label: string; bg: string; text: string; border: string } {
    switch (role) {
      case 'admin':
        return {
          label: 'Administrador',
          bg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
          text: 'text-amber-700',
          border: 'border-amber-500/30',
        };
      case 'empleado':
        return {
          label: 'Empleado',
          bg: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
          text: 'text-blue-700',
          border: 'border-blue-500/30',
        };
      case 'cliente':
      default:
        return {
          label: 'Cliente',
          bg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
          text: 'text-emerald-700',
          border: 'border-emerald-500/30',
        };
    }
  }
}

