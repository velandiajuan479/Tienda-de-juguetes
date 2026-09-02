import React, { useState, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Layers, 
  Package, 
  FileText, 
  Users, 
  ShoppingBag, 
  ShieldCheck, 
  Info,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Toy, Category, Invoice, CartItem, UserProfile, UserRole } from './types';
import { CategoryController } from './controllers/CategoryController';
import { ToyController } from './controllers/ToyController';
import { InvoiceController } from './controllers/InvoiceController';
import { AuthController } from './controllers/AuthController';
import { UserModel } from './models/UserModel';

// Components & Views
import { Navbar } from './components/Navbar';
import { CatalogView } from './views/CatalogView';
import { ToyManagementView } from './views/ToyManagementView';
import { CategoryManagementView } from './views/CategoryManagementView';
import { InvoicesListView } from './views/InvoicesListView';
import { UserManagementView } from './views/UserManagementView';
import { CartDrawer } from './components/CartDrawer';
import { InvoiceDetailModal } from './components/InvoiceDetailModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<'catalog' | 'toys' | 'categories' | 'invoices' | 'users'>('catalog');

  // Core Data State
  const [categories, setCategories] = useState<Category[]>([]);
  const [toys, setToys] = useState<Toy[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('toystore_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // User & Auth State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('toystore_current_user_profile');
    return saved ? JSON.parse(saved) : null;
  });

  // Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [celebrationInvoice, setCelebrationInvoice] = useState<Invoice | null>(null);
  const [editingToyItem, setEditingToyItem] = useState<Toy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Persist cart
  useEffect(() => {
    localStorage.setItem('toystore_cart', JSON.stringify(cart));
  }, [cart]);

  // Load Initial Data from Controllers
  const refreshAllData = useCallback(async () => {
    try {
      const loadedCategories = await CategoryController.getCategories();
      setCategories(loadedCategories);

      const loadedToys = await ToyController.getToys(loadedCategories);
      setToys(loadedToys);

      if (currentUser) {
        const loadedInvoices = await InvoiceController.getInvoices(currentUser);
        setInvoices(loadedInvoices);
      }
    } catch (err) {
      console.warn('Data refresh warning:', err);
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Auth Subscription
  useEffect(() => {
    const unsubscribe = AuthController.subscribeToAuth((profile) => {
      setCurrentUser(profile);
      if (profile) {
        InvoiceController.getInvoices(profile).then(setInvoices);
      }
    });
    return () => unsubscribe();
  }, []);

  // Cart operations
  const handleAddToCart = (toy: Toy, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.toy.id === toy.id);
      if (existing) {
        const newQty = Math.min(toy.stock, existing.quantity + quantity);
        return prev.map((item) => (item.toy.id === toy.id ? { ...item, quantity: newQty } : item));
      }
      return [...prev, { toy, quantity: Math.min(toy.stock, quantity) }];
    });
    showToast(`¡"${toy.name}" añadido al carrito!`);
  };

  const handleUpdateQuantity = (toyId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.toy.id === toyId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: Math.min(item.toy.stock, nextQty) } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (toyId: string) => {
    setCart((prev) => prev.filter((item) => item.toy.id !== toyId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Role updated callback from ProfileModal
  const handleRoleUpdated = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    showToast(`Rol actualizado a: ${updatedUser.role.toUpperCase()}`);

    // If currently on a view not allowed for this role, redirect to catalog
    if (updatedUser.role === 'cliente' && (currentView === 'toys' || currentView === 'categories' || currentView === 'users')) {
      setCurrentView('catalog');
    } else if (updatedUser.role === 'empleado' && (currentView === 'categories' || currentView === 'users')) {
      setCurrentView('catalog');
    }

    refreshAllData();
  };

  const handleSignOut = async () => {
    await AuthController.signOut();
    setCurrentUser(null);
    setCurrentView('catalog');
    showToast('Sesión cerrada.');
  };

  const handleEditToyFromCatalog = (toy: Toy) => {
    setEditingToyItem(toy);
    setCurrentView('toys');
  };

  const handleNewToyFromCatalog = () => {
    setEditingToyItem(null);
    setCurrentView('toys');
  };

  const totalCartItemsCount = cart.reduce((acc, i) => acc + i.quantity, 0);
  const role: UserRole = currentUser?.role || 'cliente';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFBEB] text-slate-800 selection:bg-orange-500 selection:text-white font-sans">
      
      {/* Toast Notification with Vibrant Styling */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-yellow-400/30 animate-in slide-in-from-bottom duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shrink-0">
            ✓
          </div>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        setCurrentView={(v: any) => setCurrentView(v)}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onSignOut={handleSignOut}
        cartCount={totalCartItemsCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="w-14 h-14 rounded-3xl bg-orange-500 shadow-lg shadow-orange-500/30 rotate-3 flex items-center justify-center text-white mb-4 animate-bounce">
              <span className="text-2xl font-black">T!</span>
            </div>
            <p className="text-sm font-black text-slate-700 font-display">Cargando juguetería mágica...</p>
          </div>
        ) : (
          <>
            {currentView === 'catalog' && (
              <CatalogView
                toys={toys}
                categories={categories}
                currentUser={currentUser}
                onAddToCart={handleAddToCart}
                onEditToy={UserModel.can(role, 'manage_toys') ? handleEditToyFromCatalog : undefined}
                onNewToy={UserModel.can(role, 'manage_toys') ? handleNewToyFromCatalog : undefined}
              />
            )}

            {currentView === 'toys' && UserModel.can(role, 'manage_toys') && (
              <ToyManagementView
                toys={toys}
                categories={categories}
                currentUser={currentUser}
                onRefreshData={refreshAllData}
                editingToyItem={editingToyItem}
                onClearEditingToy={() => setEditingToyItem(null)}
              />
            )}

            {currentView === 'categories' && UserModel.can(role, 'manage_categories') && (
              <CategoryManagementView
                categories={categories}
                toys={toys}
                currentUser={currentUser}
                onRefreshData={refreshAllData}
              />
            )}

            {currentView === 'invoices' && (
              <InvoicesListView
                invoices={invoices}
                currentUser={currentUser}
                onSelectInvoice={(inv) => setSelectedInvoice(inv)}
                onRefreshInvoices={refreshAllData}
              />
            )}

            {currentView === 'users' && UserModel.can(role, 'manage_users') && (
              <UserManagementView
                currentUser={currentUser}
                onRefreshData={refreshAllData}
              />
            )}
          </>
        )}
      </main>

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currentUser={currentUser}
        onInvoiceCreated={(invoice) => {
          setCelebrationInvoice(invoice);
          showToast('¡Compra realizada con éxito! 🎉');
          refreshAllData();
        }}
        onOpenAuth={() => {
          setIsCartOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* Celebration & Festive Order Success Modal */}
      <OrderSuccessModal
        invoice={celebrationInvoice}
        onClose={() => setCelebrationInvoice(null)}
        onViewInvoice={(invoice) => {
          setSelectedInvoice(invoice);
          setCelebrationInvoice(null);
        }}
      />

      {/* Invoice Detail Modal with PDF Download */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(profile) => {
          setCurrentUser(profile);
          showToast(`¡Bienvenido/a, ${profile.displayName}!`);
          refreshAllData();
        }}
      />

      {/* Profile & Role Upgrade Modal with Passwords */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onRoleUpdated={handleRoleUpdated}
        onSignOut={handleSignOut}
      />

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-yellow-200 py-8 px-4 sm:px-6 lg:px-8 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-orange-500 flex items-center justify-center text-white font-black rotate-3 shadow-xs">
              <span className="text-xs">🧸</span>
            </div>
            <span className="font-black text-slate-900 font-display">ToyStore Kids</span>
            <span className="text-slate-400">· Tienda de Juguetes</span>
          </div>

          <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <span>Desarrollado por</span>
            <span className="font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
              Juan Velandia
            </span>
          </div>

          <div className="text-[11px] font-medium text-slate-500">
            © {new Date().getFullYear()} ToyStore Kids · Todos los derechos reservados
          </div>
        </div>
      </footer>
    </div>
  );
}
