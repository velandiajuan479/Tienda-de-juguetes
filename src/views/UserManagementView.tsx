import React, { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  Check, 
  ShieldAlert, 
  Sparkles, 
  UserPlus,
  Lock,
  Eye,
  Edit3,
  Receipt
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { AuthController } from '../controllers/AuthController';
import { UserModel } from '../models/UserModel';

interface UserManagementViewProps {
  currentUser: UserProfile | null;
  onRefreshData?: () => Promise<void>;
}

export const UserManagementView: React.FC<UserManagementViewProps> = ({ currentUser }) => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  const loadUsers = async () => {
    setLoading(true);
    const list = await AuthController.getAllUsers();
    setUsers(list);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await AuthController.updateUserRole(userId, newRole);
      setUsers((prev) => prev.map((u) => (u.id === userId || u.uid === userId ? { ...u, role: newRole } : u)));
      setSuccessMsg(`Rol actualizado correctamente a "${newRole.toUpperCase()}".`);
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err: any) {
      alert('Error actualizando rol: ' + err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs font-black mb-2 border border-orange-200 dark:border-orange-500/30">
            <Users className="w-3.5 h-3.5" />
            <span>Control de Acceso RBAC (Admin)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            Gestión de Usuarios y Asignación de Roles
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            Administra los roles del sistema (Cliente, Empleado, Admin). Los cambios se reflejan al instante en la UI.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 mb-6">
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Permissions Matrix Reference Table */}
      <div className="bg-[#1E1B4B] dark:bg-slate-900 text-white rounded-[2rem] p-6 sm:p-8 shadow-xl mb-8 border border-indigo-900 dark:border-slate-800">
        <div className="flex items-center gap-2.5 mb-4">
          <ShieldCheck className="w-6 h-6 text-amber-400" />
          <h3 className="text-base sm:text-lg font-black font-display text-white">
            Matriz de Permisos por Rol (Requerimientos del Sistema)
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-white/10 dark:bg-slate-800/60 border border-white/10 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-black text-emerald-400">
              <UserCheck className="w-4 h-4" />
              <span>Rol: Cliente (Default)</span>
            </div>
            <ul className="space-y-1 text-slate-200 text-[11px] list-disc list-inside font-medium">
              <li>Ver catálogo completo con precios calculados</li>
              <li>Agregar juguetes al carrito</li>
              <li>Generar facturas de compra</li>
              <li>Ver su propio historial de facturas</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 dark:bg-slate-800/60 border border-white/10 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-black text-sky-400">
              <Briefcase className="w-4 h-4" />
              <span>Rol: Empleado / Staff</span>
            </div>
            <ul className="space-y-1 text-slate-200 text-[11px] list-disc list-inside font-medium">
              <li>Crear, editar y listar juguetes</li>
              <li>Ajustar precios base, impuestos y descuentos</li>
              <li>Generar facturas fiscales en punto de venta</li>
              <li>Visualizar todas las facturas de la tienda</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 dark:bg-slate-800/60 border border-white/10 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-black text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Rol: Administrador (Admin)</span>
            </div>
            <ul className="space-y-1 text-slate-200 text-[11px] list-disc list-inside font-medium">
              <li>Acceso total a todas las funciones</li>
              <li>Gestión completa de categorías</li>
              <li>Gestión completa de juguetes y stock</li>
              <li>Auditoría de facturación y anulación</li>
              <li>Asignación y cambio de roles de usuarios</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Users List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-yellow-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-yellow-200 dark:border-slate-800 flex items-center justify-between bg-yellow-50/60 dark:bg-slate-800/60">
          <h3 className="text-base font-black text-slate-900 dark:text-white font-display">
            Usuarios Registrados ({users.length})
          </h3>
          <span className="text-xs text-orange-950 dark:text-orange-300 font-bold">Autenticación Firebase Auth & Firestore</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-yellow-50 dark:bg-slate-800/90 text-xs font-black uppercase tracking-wider text-orange-950 dark:text-orange-300 border-b border-yellow-200 dark:border-slate-800">
              <tr>
                <th className="py-4 px-6">Usuario</th>
                <th className="py-4 px-4">Correo Electrónico</th>
                <th className="py-4 px-4">Rol Actual</th>
                <th className="py-4 px-4 text-center">Fecha Registro</th>
                <th className="py-4 px-6 text-right">Asignar Nuevo Rol</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {users.map((user) => {
                const badge = UserModel.getRoleBadge(user.role);

                return (
                  <tr key={user.id} className="hover:bg-amber-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xs shadow-xs">
                          {user.displayName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-black text-slate-900 dark:text-white block">{user.displayName}</span>
                          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">UID: {user.uid?.slice(0, 8)}...</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-medium text-slate-600 dark:text-slate-400">
                      {user.email}
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-black ${badge.bg}`}>
                        {badge.label}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center text-xs text-slate-400 dark:text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString('es-CO')}
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as UserRole)}
                          className="px-3.5 py-1.5 rounded-2xl border border-yellow-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 bg-[#FFFBEB] dark:bg-slate-800 shadow-xs focus:outline-orange-500 cursor-pointer"
                        >
                          <option value="cliente">Cliente</option>
                          <option value="empleado">Empleado</option>
                          <option value="admin">Administrador</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
