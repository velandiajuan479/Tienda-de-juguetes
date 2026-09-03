import React from 'react';
import { 
  Package, 
  Layers, 
  FileText, 
  Users, 
  LogOut, 
  LogIn, 
  User as UserIcon, 
  ShoppingBag, 
  Menu, 
  X, 
  ShieldCheck, 
  Briefcase, 
  UserCheck,
  Sun,
  Moon
} from 'lucide-react';
import { UserProfile, UserRole } from '../types';
import { UserModel } from '../models/UserModel';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onSignOut: () => void;
  cartCount: number;
  onOpenCart: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  currentUser,
  onOpenAuth,
  onOpenProfile,
  onSignOut,
  cartCount,
  onOpenCart,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const role = currentUser?.role || 'cliente';
  const roleBadge = UserModel.getRoleBadge(role);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-orange-500 dark:bg-slate-900 text-white shadow-lg border-b border-orange-600/40 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand (Vibrant Theme Rotated Badge) */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('catalog')}>
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center rotate-3 shadow-md hover:rotate-6 transition-transform border dark:border-slate-700">
              <span className="text-2xl font-black text-orange-500 font-display">🧸</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
                  ToyStore <span className="font-extrabold text-amber-200 dark:text-amber-400">Kids</span>
                </span>
              </div>
              <p className="text-[11px] text-orange-100 dark:text-slate-400 font-medium hidden sm:block">
                Tienda de Juguetes & Diversión
              </p>
            </div>
          </div>

          {/* Navigation Items (Role-Aware) */}
          <nav className="hidden lg:flex items-center gap-1.5">
            
            {/* Catalogo - Visible for all */}
            <button
              id="nav-btn-catalog"
              onClick={() => setCurrentView('catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                currentView === 'catalog'
                  ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-400 shadow-md scale-102 border border-transparent dark:border-slate-700'
                  : 'text-orange-50 dark:text-slate-300 hover:bg-orange-600/70 dark:hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Catálogo</span>
            </button>

            {/* Gestion de Juguetes - Empleado & Admin */}
            {UserModel.can(role, 'manage_toys') && (
              <button
                id="nav-btn-toys"
                onClick={() => setCurrentView('toys')}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  currentView === 'toys'
                    ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-400 shadow-md scale-102 border border-transparent dark:border-slate-700'
                    : 'text-orange-50 dark:text-slate-300 hover:bg-orange-600/70 dark:hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Gestión Juguetes</span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-orange-200 dark:bg-slate-700 text-orange-800 dark:text-amber-300">
                  {role === 'admin' ? 'Admin' : 'Staff'}
                </span>
              </button>
            )}

            {/* Categorias - Admin Only */}
            {UserModel.can(role, 'manage_categories') && (
              <button
                id="nav-btn-categories"
                onClick={() => setCurrentView('categories')}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  currentView === 'categories'
                    ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-400 shadow-md scale-102 border border-transparent dark:border-slate-700'
                    : 'text-orange-50 dark:text-slate-300 hover:bg-orange-600/70 dark:hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Categorías</span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-orange-200 dark:bg-slate-700 text-orange-800 dark:text-amber-300">
                  Admin
                </span>
              </button>
            )}

            {/* Facturas / Historial */}
            <button
              id="nav-btn-invoices"
              onClick={() => setCurrentView('invoices')}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                currentView === 'invoices'
                  ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-400 shadow-md scale-102 border border-transparent dark:border-slate-700'
                  : 'text-orange-50 dark:text-slate-300 hover:bg-orange-600/70 dark:hover:bg-slate-800 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{role === 'cliente' ? 'Mis Facturas' : 'Facturas Tienda'}</span>
            </button>

            {/* Gestion de Usuarios - Admin Only */}
            {UserModel.can(role, 'manage_users') && (
              <button
                id="nav-btn-users"
                onClick={() => setCurrentView('users')}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  currentView === 'users'
                    ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-400 shadow-md scale-102 border border-transparent dark:border-slate-700'
                    : 'text-orange-50 dark:text-slate-300 hover:bg-orange-600/70 dark:hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Usuarios & Roles</span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-orange-200 dark:bg-slate-700 text-orange-800 dark:text-amber-300">
                  Admin
                </span>
              </button>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Dark / Light Mode Toggle Button */}
            <button
              id="theme-toggle-button"
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-2xl bg-orange-600 dark:bg-slate-800 hover:bg-orange-700 dark:hover:bg-slate-700 text-amber-200 dark:text-amber-300 border border-orange-400/40 dark:border-slate-700 transition-all shadow-xs flex items-center justify-center cursor-pointer"
              title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              aria-label={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-300" />
              ) : (
                <Moon className="w-5 h-5 text-amber-100" />
              )}
            </button>

            {/* User Role Badge Display */}
            {currentUser && (
              <div 
                onClick={onOpenProfile}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-orange-600/90 dark:bg-slate-800 border border-orange-400/40 dark:border-slate-700 text-xs font-bold cursor-pointer hover:bg-orange-600 dark:hover:bg-slate-700 transition-colors shadow-xs"
                title="Haz clic para ver o gestionar tu perfil y rol"
              >
                {role === 'admin' && <ShieldCheck className="w-4 h-4 text-amber-300" />}
                {role === 'empleado' && <Briefcase className="w-4 h-4 text-sky-200" />}
                {role === 'cliente' && <UserCheck className="w-4 h-4 text-emerald-300" />}
                <span className="capitalize text-white font-black">{roleBadge.label}</span>
              </div>
            )}

            {/* Cart Button with Vibrant Styling */}
            <button
              id="cart-drawer-toggle"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-2xl bg-orange-600 dark:bg-slate-800 hover:bg-orange-700 dark:hover:bg-slate-700 text-white border border-orange-400/40 dark:border-slate-700 transition-all shadow-xs cursor-pointer"
              title="Ver Carrito y Facturación"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-emerald-400 text-slate-900 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth / Profile Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="profile-button"
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-300 hover:bg-orange-50 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 font-black text-xs shadow-md transition-all cursor-pointer"
                  title="Abrir Mi Perfil"
                >
                  <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-[10px]">
                    {currentUser.displayName?.substring(0, 2).toUpperCase() || 'US'}
                  </div>
                  <span className="hidden md:inline truncate max-w-[100px]">
                    {currentUser.displayName?.split(' ')[0]}
                  </span>
                </button>

                <button
                  id="sign-out-button"
                  onClick={onSignOut}
                  className="p-2 rounded-xl text-orange-100 dark:text-slate-400 hover:text-white hover:bg-orange-600 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="sign-in-button"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-slate-700 text-orange-600 dark:text-amber-300 border border-transparent dark:border-slate-700 text-xs font-black transition-all shadow-md cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Ingresar / Crear Cuenta</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-2xl bg-orange-600 dark:bg-slate-800 text-white border border-transparent dark:border-slate-700 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-orange-400/40 dark:border-slate-800 space-y-2">
            {currentUser && (
              <div 
                onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }}
                className="p-3 bg-orange-600 dark:bg-slate-800 rounded-2xl flex items-center justify-between cursor-pointer mb-2 border border-transparent dark:border-slate-700"
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-orange-200 dark:text-amber-300" />
                  <span className="text-xs font-bold text-white">{currentUser.displayName}</span>
                </div>
                <span className="text-xs font-black bg-white dark:bg-slate-700 text-orange-600 dark:text-amber-300 px-2 py-0.5 rounded-full">
                  {roleBadge.label}
                </span>
              </div>
            )}

            {/* Dark Mode toggle in mobile menu */}
            <button
              onClick={onToggleDarkMode}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-orange-600/70 dark:bg-slate-800 text-white border border-orange-400/30 dark:border-slate-700"
            >
              <div className="flex items-center gap-2">
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-amber-200" />}
                <span>Tema: {isDarkMode ? 'Modo Oscuro' : 'Modo Claro'}</span>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-white/20">
                {isDarkMode ? 'Activo' : 'Activo'}
              </span>
            </button>

            <button
              onClick={() => { setCurrentView('catalog'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                currentView === 'catalog' 
                  ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-300 border border-transparent dark:border-slate-700' 
                  : 'text-orange-50 dark:text-slate-300'
              }`}
            >
              <Package className="w-4 h-4" /> Catálogo
            </button>

            {UserModel.can(role, 'manage_toys') && (
              <button
                onClick={() => { setCurrentView('toys'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                  currentView === 'toys' 
                    ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-300 border border-transparent dark:border-slate-700' 
                    : 'text-orange-50 dark:text-slate-300'
                }`}
              >
                <Layers className="w-4 h-4" /> Gestión Juguetes
              </button>
            )}

            {UserModel.can(role, 'manage_categories') && (
              <button
                onClick={() => { setCurrentView('categories'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                  currentView === 'categories' 
                    ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-300 border border-transparent dark:border-slate-700' 
                    : 'text-orange-50 dark:text-slate-300'
                }`}
              >
                <Layers className="w-4 h-4" /> Categorías
              </button>
            )}

            <button
              onClick={() => { setCurrentView('invoices'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                currentView === 'invoices' 
                  ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-300 border border-transparent dark:border-slate-700' 
                  : 'text-orange-50 dark:text-slate-300'
              }`}
            >
              <FileText className="w-4 h-4" /> {role === 'cliente' ? 'Mis Facturas' : 'Facturas'}
            </button>

            {UserModel.can(role, 'manage_users') && (
              <button
                onClick={() => { setCurrentView('users'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                  currentView === 'users' 
                    ? 'bg-white dark:bg-slate-800 text-orange-600 dark:text-amber-300 border border-transparent dark:border-slate-700' 
                    : 'text-orange-50 dark:text-slate-300'
                }`}
              >
                <Users className="w-4 h-4" /> Usuarios & Roles
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

