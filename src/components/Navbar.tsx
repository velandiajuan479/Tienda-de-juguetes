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
  UserCheck
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
}) => {
  const role = currentUser?.role || 'cliente';
  const roleBadge = UserModel.getRoleBadge(role);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-orange-500 text-white shadow-lg border-b border-orange-600/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand (Vibrant Theme Rotated Badge) */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('catalog')}>
            <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-2xl flex items-center justify-center rotate-3 shadow-md hover:rotate-6 transition-transform">
              <span className="text-2xl font-black text-orange-500 font-display">T!</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-display">
                  TOYBOX <span className="font-light text-orange-100">MVC</span>
                </span>
                <span className="text-[10px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-xs">
                  COLOMBIA (COP)
                </span>
              </div>
              <p className="text-[11px] text-orange-100 font-medium hidden sm:block">
                Tienda de Juguetes & Facturación
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
                  ? 'bg-white text-orange-600 shadow-md scale-102'
                  : 'text-orange-50 hover:bg-orange-600/70 hover:text-white'
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
                    ? 'bg-white text-orange-600 shadow-md scale-102'
                    : 'text-orange-50 hover:bg-orange-600/70 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Gestión Juguetes</span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-orange-200 text-orange-800">
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
                    ? 'bg-white text-orange-600 shadow-md scale-102'
                    : 'text-orange-50 hover:bg-orange-600/70 hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Categorías</span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-orange-200 text-orange-800">
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
                  ? 'bg-white text-orange-600 shadow-md scale-102'
                  : 'text-orange-50 hover:bg-orange-600/70 hover:text-white'
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
                    ? 'bg-white text-orange-600 shadow-md scale-102'
                    : 'text-orange-50 hover:bg-orange-600/70 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Usuarios & Roles</span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-orange-200 text-orange-800">
                  Admin
                </span>
              </button>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            
            {/* User Role Badge Display */}
            {currentUser && (
              <div 
                onClick={onOpenProfile}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-orange-600/90 border border-orange-400/40 text-xs font-bold cursor-pointer hover:bg-orange-600 transition-colors shadow-xs"
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
              className="relative p-2.5 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white border border-orange-400/40 transition-all shadow-xs"
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
                  className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white text-orange-600 hover:bg-orange-50 font-black text-xs shadow-md transition-all"
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
                  className="p-2 rounded-xl text-orange-100 hover:text-white hover:bg-orange-600 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="sign-in-button"
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-white hover:bg-orange-50 text-orange-600 text-xs font-black transition-all shadow-md"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Ingresar / Crear Cuenta</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-2xl bg-orange-600 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-orange-400/40 space-y-2">
            {currentUser && (
              <div 
                onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }}
                className="p-3 bg-orange-600 rounded-2xl flex items-center justify-between cursor-pointer mb-2"
              >
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-orange-200" />
                  <span className="text-xs font-bold text-white">{currentUser.displayName}</span>
                </div>
                <span className="text-xs font-black bg-white text-orange-600 px-2 py-0.5 rounded-full">
                  {roleBadge.label}
                </span>
              </div>
            )}

            <button
              onClick={() => { setCurrentView('catalog'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                currentView === 'catalog' ? 'bg-white text-orange-600' : 'text-orange-50'
              }`}
            >
              <Package className="w-4 h-4" /> Catálogo
            </button>

            {UserModel.can(role, 'manage_toys') && (
              <button
                onClick={() => { setCurrentView('toys'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                  currentView === 'toys' ? 'bg-white text-orange-600' : 'text-orange-50'
                }`}
              >
                <Layers className="w-4 h-4" /> Gestión Juguetes
              </button>
            )}

            {UserModel.can(role, 'manage_categories') && (
              <button
                onClick={() => { setCurrentView('categories'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                  currentView === 'categories' ? 'bg-white text-orange-600' : 'text-orange-50'
                }`}
              >
                <Layers className="w-4 h-4" /> Categorías
              </button>
            )}

            <button
              onClick={() => { setCurrentView('invoices'); setMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                currentView === 'invoices' ? 'bg-white text-orange-600' : 'text-orange-50'
              }`}
            >
              <FileText className="w-4 h-4" /> {role === 'cliente' ? 'Mis Facturas' : 'Facturas'}
            </button>

            {UserModel.can(role, 'manage_users') && (
              <button
                onClick={() => { setCurrentView('users'); setMobileMenuOpen(false); }}
                className={`w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold ${
                  currentView === 'users' ? 'bg-white text-orange-600' : 'text-orange-50'
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

