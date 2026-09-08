import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  KeyRound, 
  Check, 
  AlertCircle, 
  Mail, 
  Lock,
  MapPin,
  CreditCard,
  Banknote,
  Building2,
  Smartphone,
  Phone,
  Save,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { UserProfile, UserRole, PaymentMethod } from '../types';
import { UserModel } from '../models/UserModel';
import { AuthController } from '../controllers/AuthController';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onRoleUpdated?: (updatedUser: UserProfile) => void;
  onUserUpdated?: (updatedUser: UserProfile) => void;
  onSignOut: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onRoleUpdated,
  onUserUpdated,
  onSignOut,
}) => {
  // Modal active tab: 'personal' (default) or 'role'
  const [activeTab, setActiveTab] = useState<'personal' | 'role'>('personal');

  // Personal Info Form State
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [defaultPaymentMethod, setDefaultPaymentMethod] = useState<PaymentMethod>('tarjeta');
  
  const [isSavingPersonal, setIsSavingPersonal] = useState(false);
  const [personalError, setPersonalError] = useState('');
  const [personalSuccess, setPersonalSuccess] = useState('');

  // Role Form State
  const [selectedRole, setSelectedRole] = useState<UserRole>('empleado');
  const [authPassword, setAuthPassword] = useState('');
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);
  const [roleError, setRoleError] = useState('');
  const [roleSuccess, setRoleSuccess] = useState('');

  // Sync state whenever currentUser changes or modal opens
  useEffect(() => {
    if (currentUser) {
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
      setAddress(currentUser.address || '');
      setPhone(currentUser.phone || '');
      setDefaultPaymentMethod(currentUser.defaultPaymentMethod || 'tarjeta');
      setSelectedRole(currentUser.role === 'cliente' ? 'empleado' : currentUser.role);
    }
    setPersonalError('');
    setPersonalSuccess('');
    setRoleError('');
    setRoleSuccess('');
  }, [currentUser, isOpen]);

  if (!isOpen || !currentUser) return null;

  const currentRole = currentUser.role || 'cliente';
  const roleBadge = UserModel.getRoleBadge(currentRole);

  const handleNotifyUpdate = (updated: UserProfile) => {
    if (onUserUpdated) {
      onUserUpdated(updated);
    } else if (onRoleUpdated) {
      onRoleUpdated(updated);
    }
  };

  // Submit Handler for Personal Info
  const handleSavePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    setPersonalError('');
    setPersonalSuccess('');
    setIsSavingPersonal(true);

    try {
      const updated = await AuthController.updateUserProfile(
        currentUser.id || currentUser.uid,
        {
          displayName,
          email,
          address,
          phone,
          defaultPaymentMethod,
        },
        currentUser
      );
      handleNotifyUpdate(updated);
      setPersonalSuccess('¡Datos guardados con éxito!');
      setTimeout(() => setPersonalSuccess(''), 4000);
    } catch (err: any) {
      setPersonalError(err?.message || 'Error al actualizar información personal.');
    } finally {
      setIsSavingPersonal(false);
    }
  };

  // Submit Handler for Role Upgrade
  const handleUpgradeRole = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingRole(true);
    setRoleError('');
    setRoleSuccess('');

    try {
      const updated = await AuthController.upgradeUserRoleWithPassword(
        currentUser.id || currentUser.uid,
        selectedRole,
        authPassword,
        currentUser
      );
      if (onRoleUpdated) {
        onRoleUpdated(updated);
      } else {
        handleNotifyUpdate(updated);
      }
      setRoleSuccess(`¡Rol actualizado exitosamente a "${selectedRole.toUpperCase()}"!`);
      setAuthPassword('');
      setTimeout(() => setRoleSuccess(''), 4000);
    } catch (err: any) {
      setRoleError(err?.message || 'Error al validar clave de rol.');
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const paymentOptions: { id: PaymentMethod; label: string; icon: any; desc: string }[] = [
    { 
      id: 'tarjeta', 
      label: 'Tarjeta de Crédito / Débito', 
      icon: CreditCard,
      desc: 'Visa, Mastercard, Amex' 
    },
    { 
      id: 'efectivo', 
      label: 'Efectivo', 
      icon: Banknote,
      desc: 'Pago contra entrega en domicilio' 
    },
    { 
      id: 'transferencia', 
      label: 'Transferencia Bancaria', 
      icon: Building2,
      desc: 'PSE, Bancolombia, Davivienda' 
    },
    { 
      id: 'digital', 
      label: 'Billetera Digital', 
      icon: Smartphone,
      desc: 'Nequi, Daviplata, Dale' 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2rem] shadow-2xl border border-yellow-200 dark:border-slate-800 overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-yellow-200 dark:border-slate-800 flex items-center justify-between bg-yellow-50/80 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white font-display">
                Perfil de Usuario
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Edita tus datos básicos, dirección y preferencias
              </p>
            </div>
          </div>
          <button 
            id="btn-close-profile-modal"
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-yellow-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-yellow-200 dark:border-slate-800 text-xs font-black text-center bg-yellow-50/40 dark:bg-slate-800/40">
          <button
            id="tab-profile-personal"
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'personal'
                ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-500 bg-white dark:bg-slate-900'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Información Básica</span>
          </button>
          <button
            id="tab-profile-role"
            type="button"
            onClick={() => setActiveTab('role')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
              activeTab === 'role'
                ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-500 bg-white dark:bg-slate-900'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Rol y Seguridad</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* User Quick Info Summary Banner */}
          <div className="p-4 rounded-3xl bg-[#FFFBEB] dark:bg-slate-800/90 border border-yellow-200 dark:border-slate-700 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-black text-lg shadow-sm shrink-0 rotate-2">
              {currentUser.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                  {currentUser.displayName}
                </h4>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black border ${roleBadge.bg} ${roleBadge.border}`}>
                  {roleBadge.label}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium truncate mt-0.5">
                {currentUser.email}
              </p>
            </div>
          </div>

          {/* TAB 1: INFORMACIÓN BÁSICA (NOMBRE, CORREO, DIRECCIÓN, FORMA DE PAGO, TELÉFONO) */}
          {activeTab === 'personal' && (
            <form onSubmit={handleSavePersonalInfo} className="space-y-4">
              
              {personalError && (
                <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{personalError}</span>
                </div>
              )}

              {personalSuccess && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{personalSuccess}</span>
                </div>
              )}

              {/* Nombre Completo */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre Completo *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    id="input-profile-name"
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-slate-800 border border-yellow-300 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-orange-500"
                  />
                </div>
              </div>

              {/* Correo Electrónico */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Correo Electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    id="input-profile-email"
                    type="email"
                    required
                    placeholder="usuario@toystore.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-slate-800 border border-yellow-300 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-orange-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Se utilizará para el envío de facturas y confirmación de compras.
                </p>
              </div>

              {/* Dirección de Entrega / Facturación */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Dirección de Entrega / Facturación
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    id="input-profile-address"
                    type="text"
                    placeholder="Ej. Calle 123 # 45-67, Apto 302, Bogotá"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-slate-800 border border-yellow-300 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-orange-500"
                  />
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Tu dirección se autocompletará automáticamente en tus pedidos del carrito.
                </p>
              </div>

              {/* Teléfono de Contacto */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Teléfono o Celular de Contacto
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    id="input-profile-phone"
                    type="tel"
                    placeholder="Ej. +57 312 458 9921"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-slate-800 border border-yellow-300 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-orange-500"
                  />
                </div>
              </div>

              {/* Forma de Pago Preferida */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Forma de Pago Preferida
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {paymentOptions.map((opt) => {
                    const IconComponent = opt.icon;
                    const isSelected = defaultPaymentMethod === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        id={`btn-payment-${opt.id}`}
                        onClick={() => setDefaultPaymentMethod(opt.id)}
                        className={`p-3 rounded-2xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 text-orange-950 dark:text-orange-200 ring-2 ring-orange-500/20 shadow-xs'
                            : 'bg-white dark:bg-slate-800 border-yellow-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-orange-300'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected 
                            ? 'bg-orange-500 text-white shadow-xs' 
                            : 'bg-yellow-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black block truncate">{opt.label}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />}
                          </div>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                            {opt.desc}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  id="btn-save-personal-info"
                  type="submit"
                  disabled={isSavingPersonal}
                  className="w-full py-3 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingPersonal ? (
                    <span>Guardando información...</span>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Guardar Datos Personales</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: ROL Y PRIVILEGIOS */}
          {activeTab === 'role' && (
            <div className="space-y-5">
              
              {/* Role Capabilities Summary */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-orange-950 dark:text-orange-300 block">
                  Tus Privilegios Actuales:
                </span>
                <div className="p-4 rounded-2xl bg-slate-900 dark:bg-slate-950 text-slate-200 text-xs space-y-2 border border-slate-800">
                  {currentRole === 'cliente' && (
                    <div className="flex items-start gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <p>
                        <span className="font-bold text-white">Perfil Cliente:</span> Puedes explorar el catálogo de juguetes, filtrar por categorías, agregar al carrito y generar facturas de compra.
                      </p>
                    </div>
                  )}
                  {currentRole === 'empleado' && (
                    <div className="flex items-start gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
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
              <div className="p-5 rounded-3xl bg-white dark:bg-slate-800/80 border border-yellow-200/90 dark:border-slate-700 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-yellow-100 dark:bg-slate-700 text-orange-700 dark:text-orange-300">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      Cambiar o Elevar Rol de Cuenta
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Ingresa la contraseña de autorización asignada para cambiar tu nivel de permisos
                    </p>
                  </div>
                </div>

                {roleError && (
                  <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/50 text-rose-700 dark:text-rose-300 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{roleError}</span>
                  </div>
                )}

                {roleSuccess && (
                  <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{roleSuccess}</span>
                  </div>
                )}

                <form onSubmit={handleUpgradeRole} className="space-y-3 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Rol a Solicitar
                    </label>
                    <select
                      id="select-profile-role"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-slate-900 border border-yellow-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-orange-500 cursor-pointer"
                    >
                      <option value="cliente">Cliente (Sin contraseña requerida)</option>
                      <option value="empleado">Empleado (Requiere clave de autorización)</option>
                      <option value="admin">Administrador (Requiere clave de autorización)</option>
                    </select>
                  </div>

                  {selectedRole !== 'cliente' && (
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Contraseña de Autorización de Rol
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                        <input
                          id="input-profile-role-password"
                          type="password"
                          required
                          placeholder={`Ingresa clave de seguridad`}
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-slate-900 border border-yellow-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-orange-500"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    id="btn-submit-role-upgrade"
                    type="submit"
                    disabled={isUpdatingRole}
                    className="w-full py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-[0_4px_0_0_rgba(234,88,12,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isUpdatingRole ? (
                      <span>Validando clave...</span>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Actualizar Rol</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-yellow-50/60 dark:bg-slate-800/60 border-t border-yellow-200 dark:border-slate-800 flex items-center justify-between">
          <button
            id="btn-profile-signout"
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="text-xs font-bold text-rose-600 hover:text-rose-800 dark:text-rose-400 dark:hover:text-rose-300 hover:underline cursor-pointer"
          >
            Cerrar Sesión
          </button>
          <button
            id="btn-profile-done"
            onClick={onClose}
            className="px-5 py-2 rounded-2xl bg-white dark:bg-slate-700 border border-yellow-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-yellow-50 dark:hover:bg-slate-600 cursor-pointer transition-colors"
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
