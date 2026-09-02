import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  LogIn, 
  UserPlus,
  KeyRound,
  ChevronDown
} from 'lucide-react';
import { AuthController } from '../controllers/AuthController';
import { UserRole, UserProfile } from '../types';
import { ROLE_PASSWORDS } from '../models/UserModel';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (profile: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  
  // Registration Role State (Defaults to cliente)
  const [role, setRole] = useState<UserRole>('cliente');
  const [rolePassword, setRolePassword] = useState('');
  const [showRoleUpgrade, setShowRoleUpgrade] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const profile = await AuthController.signInWithGoogle();
      onAuthSuccess(profile);
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error con Google Sign-In.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      if (tab === 'login') {
        const profile = await AuthController.signInWithEmail(email, password);
        onAuthSuccess(profile);
      } else {
        const targetRole = showRoleUpgrade ? role : 'cliente';
        const profile = await AuthController.registerWithEmail(
          email, 
          password, 
          displayName, 
          targetRole,
          targetRole !== 'cliente' ? rolePassword : undefined
        );
        onAuthSuccess(profile);
      }
      onClose();
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error durante la autenticación. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl border border-yellow-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-yellow-200 flex items-center justify-between bg-yellow-50/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-900 font-display">
              {tab === 'login' ? 'Iniciar Sesión en ToyStore' : 'Crear Cuenta en ToyStore'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-yellow-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-yellow-200 text-xs font-black text-center">
          <button
            onClick={() => { setTab('login'); setErrorMessage(''); }}
            className={`flex-1 py-3 transition-colors ${
              tab === 'login'
                ? 'text-orange-600 border-b-2 border-orange-500 bg-yellow-50/60'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => { setTab('register'); setErrorMessage(''); }}
            className={`flex-1 py-3 transition-colors ${
              tab === 'register'
                ? 'text-orange-600 border-b-2 border-orange-500 bg-yellow-50/60'
                : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-2xl border border-yellow-300 hover:border-yellow-400 bg-yellow-50/40 hover:bg-yellow-50 text-xs font-black text-slate-800 flex items-center justify-center gap-3 shadow-xs transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continuar con Google (Rol Cliente)</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-yellow-200" />
            <span className="text-[11px] text-orange-950 font-black uppercase tracking-wider">o con correo</span>
            <div className="flex-1 h-px bg-yellow-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-medium focus:outline-orange-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                <input
                  type="email"
                  required
                  placeholder="usuario@toystore.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-medium focus:outline-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-medium focus:outline-orange-500"
                />
              </div>
            </div>

            {/* Profile Role Assignment during Registration */}
            {tab === 'register' && (
              <div className="pt-2 border-t border-yellow-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Perfil de cuenta: <span className="text-emerald-600 font-black">Cliente</span> (por defecto)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRoleUpgrade(!showRoleUpgrade)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-800 flex items-center gap-1"
                  >
                    <span>{showRoleUpgrade ? 'Cancelar rol especial' : '¿Eres empleado o admin?'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showRoleUpgrade ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {showRoleUpgrade && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 space-y-3 animate-in fade-in duration-150">
                    <div>
                      <label className="block text-[11px] font-black uppercase text-orange-950 mb-1">
                        Selecciona el Rol Solicitado
                      </label>
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-yellow-300 text-xs font-bold text-slate-800 focus:outline-orange-500"
                      >
                        <option value="empleado">Empleado (Crear juguetes y facturas)</option>
                        <option value="admin">Administrador (Acceso Total)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-black uppercase text-orange-950 mb-1">
                        Contraseña de Autorización de Rol *
                      </label>
                      <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-orange-400" />
                        <input
                          type="password"
                          required
                          placeholder={`Clave de ${role}`}
                          value={rolePassword}
                          onChange={(e) => setRolePassword(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white border border-yellow-300 text-xs font-mono font-bold focus:outline-orange-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Claves activas: Empleado: <code className="font-bold">{ROLE_PASSWORDS.empleado}</code> · Admin: <code className="font-bold">{ROLE_PASSWORDS.admin}</code>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Procesando...</span>
              ) : tab === 'login' ? (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Ingresar a mi Cuenta</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Crear Cuenta {showRoleUpgrade && role !== 'cliente' ? `(${role.toUpperCase()})` : '(Cliente)'}</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

