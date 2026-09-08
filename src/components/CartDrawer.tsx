import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Receipt, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText,
  AlertCircle,
  Lock,
  ExternalLink,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, PaymentMethod, UserProfile, Invoice } from '../types';
import { ToyModel } from '../models/ToyModel';
import { InvoiceModel } from '../models/InvoiceModel';
import { InvoiceController } from '../controllers/InvoiceController';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (toyId: string, delta: number) => void;
  onRemoveItem: (toyId: string) => void;
  onClearCart: () => void;
  currentUser: UserProfile | null;
  onInvoiceCreated: (invoice: Invoice) => void;
  onOpenAuth: () => void;
  onOpenProfile?: () => void;
}

const PAYMENT_METHOD_INFO: Record<PaymentMethod, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  tarjeta: { label: 'Tarjeta Crédito/Débito', icon: CreditCard },
  efectivo: { label: 'Efectivo en Tienda', icon: Receipt },
  transferencia: { label: 'Transferencia Bancaria', icon: Sparkles },
  digital: { label: 'Billetera Digital', icon: ShieldCheck },
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentUser,
  onInvoiceCreated,
  onOpenAuth,
  onOpenProfile,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerAddress, setCustomerAddress] = useState(currentUser?.address || 'Calle 123 # 45-67');
  const [notes, setNotes] = useState('Factura generada en tienda');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize address with currentUser profile when opened
  React.useEffect(() => {
    if (currentUser?.address) {
      setCustomerAddress(currentUser.address);
    }
  }, [currentUser, isOpen]);

  // Compute live cart breakdown using InvoiceModel
  const summary = React.useMemo(() => {
    return InvoiceModel.generateInvoiceItems(cart);
  }, [cart]);

  if (!isOpen) return null;

  const userPaymentMethod: PaymentMethod = currentUser?.defaultPaymentMethod || 'tarjeta';
  const paymentInfo = PAYMENT_METHOD_INFO[userPaymentMethod] || PAYMENT_METHOD_INFO.tarjeta;

  const handleGenerateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Tu carrito está vacío.');
      return;
    }

    setIsSubmitting(true);

    try {
      const finalName = currentUser?.displayName || 'Cliente ToyStore';
      const finalEmail = currentUser?.email || 'cliente@toystore.com';
      const finalDoc = currentUser?.document || '1094829104';
      const finalPhone = currentUser?.phone || '';
      const finalPayment = userPaymentMethod;
      const finalAddress = customerAddress.trim() || currentUser?.address || 'Dirección no especificada';

      const activeUser: UserProfile = currentUser || {
        id: 'guest_user',
        uid: 'guest_user',
        email: finalEmail,
        displayName: finalName,
        role: 'cliente',
        createdAt: new Date().toISOString(),
      };

      const newInvoice = await InvoiceController.createInvoice({
        cart,
        customerName: finalName,
        customerEmail: finalEmail,
        customerDocument: finalDoc,
        customerPhone: finalPhone,
        customerAddress: finalAddress,
        paymentMethod: finalPayment,
        notes,
        currentUser: activeUser,
      });

      // Launch joyful confetti celebration!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // confetti fallback
      }

      onClearCart();
      setIsCheckingOut(false);
      onClose();
      onInvoiceCreated(newInvoice);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error al generar la factura. Verifica los campos requeridos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-8 md:pl-10">
        <div className="w-full sm:w-screen max-w-full sm:max-w-md md:max-w-lg bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-transparent dark:border-slate-800 transition-colors">
          
          {/* Header */}
          <div className="px-4 py-3.5 sm:px-6 sm:py-5 border-b border-yellow-200 dark:border-slate-800 flex items-center justify-between bg-yellow-50/80 dark:bg-slate-800/80 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-orange-500 text-white font-bold shadow-xs shrink-0">
                <Receipt className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-display truncate">
                  {isCheckingOut ? 'Generar Factura Fiscal' : 'Carrito de Compras'}
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                  {isCheckingOut ? 'Completa los datos de facturación' : `${cart.length} productos seleccionados`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl sm:rounded-2xl hover:bg-yellow-100 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 ml-2"
              title="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 space-y-4 sm:space-y-6">
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* If cart is empty */}
            {cart.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-yellow-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-4 border border-yellow-200 dark:border-slate-700">
                  <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-display">El carrito está vacío</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  Agrega juguetes desde el catálogo para calcular precios y emitir facturas.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-md cursor-pointer"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : !isCheckingOut ? (
              /* Normal Cart Items View */
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between text-xs font-black text-slate-500 dark:text-slate-400 pb-2 border-b border-yellow-100 dark:border-slate-800">
                  <span>Productos en la orden</span>
                  <button onClick={onClearCart} className="text-rose-500 dark:text-rose-400 hover:underline font-bold cursor-pointer">
                    Vaciar Carrito
                  </button>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  {cart.map(({ toy, quantity }) => {
                    const b = ToyModel.calculatePriceBreakdown(
                      toy.basePrice,
                      toy.taxRate,
                      toy.discountType,
                      toy.discountValue
                    );
                    const itemTotal = b.finalPrice * quantity;

                    return (
                      <div
                        key={toy.id}
                        className="p-3 sm:p-4 rounded-2xl sm:rounded-[1.5rem] bg-amber-50/40 dark:bg-slate-800/50 border border-yellow-200/90 dark:border-slate-700 flex gap-2.5 sm:gap-3 items-center"
                      >
                        <img
                          src={toy.imageUrl}
                          alt={toy.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover bg-white dark:bg-slate-800 shrink-0 border border-yellow-200 dark:border-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">{toy.name}</h4>
                          <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 flex flex-wrap items-center gap-1 sm:gap-1.5">
                            <span>Base: {ToyModel.formatCurrency(b.basePrice)}</span>
                            <span>·</span>
                            <span className="text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/40 px-1.5 py-0.5 rounded-md">
                              IVA ({b.taxRate}%): +{ToyModel.formatCurrency(b.taxAmount * quantity)}
                            </span>
                            {b.discountAmount > 0 && (
                              <>
                                <span>·</span>
                                <span className="text-orange-600 dark:text-orange-400 font-bold">
                                  Desc {toy.discountType === 'percentage' ? `${toy.discountValue}%` : ToyModel.formatCurrency(toy.discountValue)}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="text-[11px] sm:text-xs font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                            {ToyModel.formatCurrency(b.finalPrice)} c/u
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-1.5 sm:gap-2 shrink-0">
                          <div className="flex items-center border border-yellow-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 overflow-hidden shadow-xs">
                            <button
                              onClick={() => onUpdateQuantity(toy.id, -1)}
                              className="p-1 sm:p-1.5 text-slate-600 dark:text-slate-300 hover:bg-yellow-50 dark:hover:bg-slate-700 cursor-pointer"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 sm:px-2.5 text-xs font-black text-slate-900 dark:text-white">{quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(toy.id, 1)}
                              disabled={quantity >= toy.stock}
                              className="p-1 sm:p-1.5 text-slate-600 dark:text-slate-300 hover:bg-yellow-50 dark:hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-xs sm:text-xs font-black text-slate-900 dark:text-white font-display text-right">
                            {ToyModel.formatCurrency(itemTotal)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Checkout / Invoice Billing Form */
              <form id="checkout-invoice-form" onSubmit={handleGenerateInvoice} className="space-y-4">
                <div className="p-4 bg-orange-500/10 dark:bg-orange-950/30 rounded-2xl border border-orange-200 dark:border-orange-800/50 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-950 dark:text-orange-200 font-medium leading-relaxed">
                    La factura fiscal se emitirá con tus datos oficiales registrados. En este paso únicamente puedes modificar la <strong className="text-orange-700 dark:text-orange-300">dirección de entrega</strong> si lo requieres.
                  </p>
                </div>

                {/* Datos del Usuario - Solo Lectura (Provenientes del Perfil) */}
                <div className="p-4 rounded-3xl bg-amber-50/50 dark:bg-slate-800/80 border border-yellow-200/90 dark:border-slate-700 space-y-3.5 shadow-xs">
                  <div className="flex items-center justify-between pb-2.5 border-b border-yellow-200/80 dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 dark:text-slate-200">
                      <Lock className="w-3.5 h-3.5 text-orange-500" />
                      <span>Datos del Titular (Sección de Usuario)</span>
                    </div>
                    {onOpenProfile && (
                      <button
                        type="button"
                        onClick={onOpenProfile}
                        className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 flex items-center gap-1 hover:underline cursor-pointer"
                        title="Modificar datos en tu perfil de usuario"
                      >
                        <span>Editar en Perfil</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  {/* Nombre y Cédula */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Nombre / Razón Social
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 font-extrabold text-slate-900 dark:text-white truncate">
                        <User className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span className="truncate">{currentUser?.displayName || 'Cliente ToyStore'}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Cédula / NIT
                      </span>
                      <div className="flex items-center gap-1.5 mt-1">
                        <FileText className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        {currentUser?.document ? (
                          <span className="font-mono font-bold text-slate-900 dark:text-white">
                            C.C. {currentUser.document}
                          </span>
                        ) : (
                          <div className="flex items-center gap-1">
                            <span className="text-amber-700 dark:text-amber-400 text-[11px] font-bold italic">
                              Sin cédula
                            </span>
                            {onOpenProfile && (
                              <button
                                type="button"
                                onClick={onOpenProfile}
                                className="text-[10px] text-orange-600 dark:text-orange-400 underline font-bold"
                              >
                                (Completar)
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Correo y Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2.5 border-t border-yellow-200/60 dark:border-slate-700/60">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Correo de Factura
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 text-slate-700 dark:text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span className="truncate text-[11px] font-medium">{currentUser?.email || 'cliente@toystore.com'}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Teléfono Móvil
                      </span>
                      <div className="flex items-center gap-1.5 mt-1 text-slate-700 dark:text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span className="truncate text-[11px] font-medium">{currentUser?.phone || 'No registrado'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Forma de Pago vinculada */}
                  <div className="pt-2.5 border-t border-yellow-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Forma de Pago vinculada
                      </span>
                      <div className="flex items-center gap-2 mt-1 text-slate-900 dark:text-white font-black">
                        {React.createElement(paymentInfo.icon, { className: 'w-4 h-4 text-orange-500 shrink-0' })}
                        <span>{paymentInfo.label}</span>
                      </div>
                    </div>
                    {onOpenProfile && (
                      <button
                        type="button"
                        onClick={onOpenProfile}
                        className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:underline cursor-pointer"
                      >
                        Cambiar en perfil
                      </button>
                    )}
                  </div>
                </div>

                {/* ÚNICO CAMPO EDITABLE: DIRECCIÓN DE ENTREGA / FACTURACIÓN */}
                <div className="p-4 rounded-3xl bg-white dark:bg-slate-800 border-2 border-orange-400 dark:border-orange-500 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="cart-customer-address" className="block text-xs font-black text-slate-900 dark:text-white">
                      Dirección de Entrega / Facturación *
                    </label>
                    <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-800">
                      Editable en este paso
                    </span>
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                    <input
                      id="cart-customer-address"
                      type="text"
                      required
                      placeholder="Ej. Calle 123 # 45-67, Apto 302, Bogotá"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-yellow-50/50 dark:bg-slate-900 border border-yellow-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:ring-2 focus:ring-orange-500 transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    Puedes ajustar tu dirección de entrega específicamente para este pedido antes de generar la factura. Los demás datos se administran en tu perfil de usuario.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Summary Breakdown Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-yellow-50/70 dark:bg-slate-800/90 border-t border-yellow-200 dark:border-slate-700 space-y-3 sm:space-y-4 shrink-0">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Subtotal Base:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{ToyModel.formatCurrency(summary.subtotalBase)}</span>
                </div>
                <div className="flex justify-between items-center text-indigo-800 dark:text-indigo-200 bg-indigo-50/90 dark:bg-indigo-950/50 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-indigo-200 dark:border-indigo-800/60">
                  <div>
                    <span className="font-bold block text-[11px] sm:text-xs">Impuesto (IVA 19%):</span>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">Desglosado para tu compra y factura</span>
                  </div>
                  <span className="font-black text-xs sm:text-xs">+{ToyModel.formatCurrency(summary.totalTaxes)}</span>
                </div>
                <div className="flex justify-between text-orange-700 dark:text-orange-400">
                  <span className="font-medium">Total Descuentos Aplicados:</span>
                  <span className="font-black">-{ToyModel.formatCurrency(summary.totalDiscounts)}</span>
                </div>

                <div className="pt-2.5 sm:pt-3 border-t border-yellow-200 dark:border-slate-700 flex justify-between items-baseline">
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-display">TOTAL A PAGAR:</span>
                  <span className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white font-display">
                    {ToyModel.formatCurrency(summary.grandTotal)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {!isCheckingOut ? (
                <button
                  id="btn-proceed-to-checkout"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3 sm:py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Comprar</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer shrink-0"
                  >
                    Volver
                  </button>
                  <button
                    id="btn-confirm-invoice"
                    type="submit"
                    form="checkout-invoice-form"
                    disabled={isSubmitting}
                    className="flex-1 py-2.5 sm:py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Generando Factura...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Emitir Factura Oficial</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
