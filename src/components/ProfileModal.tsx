import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  KeyRound, 
  Check, 
  AlertCircle, 
  Calendar, 
  Mail, 
  Sparkles,
  Award,
  Lock,
  ArrowRight
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { UserModel, ROLE_PASSWORDS } from '../models/UserModel';
import { AuthController } from '../controllers/AuthController';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRoleUpdated: (updatedUser: UserProfile) => void;
  onSignOut: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onRoleUpdated,
  onSignOut,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('empleado');
  const [authPassword, setAuthPassword] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen || !currentUser) return null;

  const currentRole = currentUser.role || 'cliente';
  const roleBadge = UserModel.getRoleBadge(currentRole);

  const handleUpgradeRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const updated = await AuthController.upgradeUserRoleWithPassword(
        currentUser.id || currentUser.uid,
        selectedRole,
        authPassword,
        currentUser
      );
      onRoleUpdated(updated);
      setSuccessMessage(`¡Rol actualizado exitosamente a "${selectedRole.toUpperCase()}"!`);
      setAuthPassword('');
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error al validar clave de rol.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl border border-yellow-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-yellow-200 flex items-center justify-between bg-yellow-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 font-display">
                Perfil de Usuario
              </h3>
              <p className="text-xs text-slate-500">Gestión de cuenta y credenciales</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-yellow-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* User Info Card */}
          <div className="p-5 rounded-3xl bg-[#FFFBEB] border border-yellow-200 flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0 rotate-2">
              {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-black text-slate-900 truncate">
                  {currentUser.displayName}
                </h4>
                <span className={`px-3 py-0.5 rounded-full text-xs font-black border ${roleBadge.bg} ${roleBadge.border}`}>
                  {roleBadge.label}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-orange-400" />
                <span className="truncate">{currentUser.email}</span>
              </p>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2 font-mono">
                <span>Miembro desde: {new Date(currentUser.createdAt || Date.now()).toLocaleDateString('es-CO')}</span>
              </div>
            </div>
          </div>

          {/* Role Capabilities Summary */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-orange-950 block">
              Tus Privilegios Actuales:
            </span>
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs space-y-2 border border-slate-800">
              {currentRole === 'cliente' && (
                <div className="flex items-start gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-white">Perfil Cliente:</span> Puedes explorar juguetes con cálculo automático de precios, realizar compras y descargar tus facturas fiscales en PDF.
                  </p>
                </div>
              )}
              {currentRole === 'empleado' && (
                <div className="flex items-start gap-2">
                  <Briefcase className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-white">Perfil Empleado:</span> Tienes acceso a crear, modificar y listar juguetes en inventario, ajustar tarifas tributarias y facturar en caja.
                  </p>
                </div>
              )}
              {currentRole === 'admin' && (
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <span className="font-bold text-white">Perfil Administrador:</span> Acceso irrestricto a todas las funciones: gestión de categorías, inventario, auditoría de facturas y asignación de roles.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Elevate Role Section with Authorization Password */}
          <div className="p-5 rounded-3xl bg-white border border-yellow-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-yellow-100 text-orange-700">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Cambiar o Elevar Rol de Cuenta
                </h4>
                <p className="text-[11px] text-slate-500">
                  Ingresa la contraseña del rol correspondiente
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Secret Passwords Hint Card */}
            <div className="p-3 rounded-2xl bg-yellow-50/70 border border-yellow-200 text-[11px] text-slate-700 space-y-1">
              <span className="font-black text-orange-950 block">Claves de Autorización Asignadas:</span>
              <div className="flex justify-between items-center py-0.5">
                <span>Rol Empleado:</span>
                <code className="bg-yellow-200/70 px-2 py-0.5 rounded-lg font-mono font-bold text-slate-900 select-all">
                  {ROLE_PASSWORDS.empleado}
                </code>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span>Rol Administrador:</span>
                <code className="bg-yellow-200/70 px-2 py-0.5 rounded-lg font-mono font-bold text-slate-900 select-all">
                  {ROLE_PASSWORDS.admin}
                </code>
              </div>
            </div>

            <form onSubmit={handleUpgradeRole} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Rol a Solicitar
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-bold text-slate-800 focus:outline-orange-500"
                >
                  <option value="cliente">Cliente (Sin contraseña requerida)</option>
                  <option value="empleado">Empleado (Requiere clave EMPLEADO2025)</option>
                  <option value="admin">Administrador (Requiere clave ADMINTOYSTORE2025)</option>
                </select>
              </div>

              {selectedRole !== 'cliente' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contraseña de Autorización de Rol
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input
                      type="password"
                      required
                      placeholder={`Ingresa clave para ${selectedRole}`}
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-mono font-bold focus:outline-orange-500"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <span>Validando clave...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Actualizar Rol con Contraseña</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-yellow-50/60 border-t border-yellow-200 flex items-center justify-between">
          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 hover:underline"
          >
            Cerrar Sesión
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-white border border-yellow-300 text-slate-700 text-xs font-bold hover:bg-yellow-50"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
