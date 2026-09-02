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
  AlertCircle
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
}

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
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState(currentUser?.displayName || '');
  const [customerEmail, setCustomerEmail] = useState(currentUser?.email || '');
  const [customerDocument, setCustomerDocument] = useState('1094829104');
  const [customerPhone, setCustomerPhone] = useState('+57 312 458 9921');
  const [customerAddress, setCustomerAddress] = useState('Calle 123 # 45-67');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('tarjeta');
  const [notes, setNotes] = useState('Factura generada en línea');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Synchronize with currentUser profile when opened
  React.useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.displayName);
      if (!customerEmail) setCustomerEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);

  // Compute live cart breakdown using InvoiceModel
  const summary = React.useMemo(() => {
    return InvoiceModel.generateInvoiceItems(cart);
  }, [cart]);

  if (!isOpen) return null;

  const handleGenerateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (cart.length === 0) {
      setErrorMessage('Tu carrito está vacío.');
      return;
    }

    setIsSubmitting(true);

    try {
      const activeUser: UserProfile = currentUser || {
        id: 'guest_user',
        uid: 'guest_user',
        email: customerEmail,
        displayName: customerName,
        role: 'cliente',
        createdAt: new Date().toISOString(),
      };

      const newInvoice = await InvoiceController.createInvoice({
        cart,
        customerName,
        customerEmail,
        customerDocument,
        customerPhone,
        customerAddress,
        paymentMethod,
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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-yellow-200 flex items-center justify-between bg-yellow-50/80">
            <div className="flex items-center gap-2.5">
              <div className="p-2.5 rounded-2xl bg-orange-500 text-white font-bold shadow-xs">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-black text-slate-900 font-display">
                  {isCheckingOut ? 'Generar Factura Fiscal' : 'Carrito de Compras'}
                </h2>
                <p className="text-xs text-slate-500">
                  {isCheckingOut ? 'Completa los datos de facturación' : `${cart.length} productos seleccionados`}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-2xl hover:bg-yellow-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {errorMessage && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* If cart is empty */}
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-3xl bg-yellow-100 text-orange-600 flex items-center justify-center mx-auto mb-4 border border-yellow-200">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-black text-slate-900 font-display">El carrito está vacío</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Agrega juguetes desde el catálogo para calcular precios y emitir facturas.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-6 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-md"
                >
                  Explorar Catálogo
                </button>
              </div>
            ) : !isCheckingOut ? (
              /* Normal Cart Items View */
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-black text-slate-500 pb-2 border-b border-yellow-100">
                  <span>Productos en la orden</span>
                  <button onClick={onClearCart} className="text-rose-500 hover:underline font-bold">
                    Vaciar Carrito
                  </button>
                </div>

                <div className="space-y-3">
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
                        className="p-4 rounded-[1.5rem] bg-amber-50/40 border border-yellow-200/90 flex gap-3 items-center"
                      >
                        <img
                          src={toy.imageUrl}
                          alt={toy.name}
                          className="w-16 h-16 rounded-2xl object-cover bg-white shrink-0 border border-yellow-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-900 truncate">{toy.name}</h4>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            <span>Base: {ToyModel.formatCurrency(b.basePrice)}</span> ·{' '}
                            <span className="text-indigo-600 font-bold">IVA {b.taxRate}%</span> ·{' '}
                            <span className="text-orange-600 font-bold">
                              Desc {toy.discountType === 'percentage' ? `${toy.discountValue}%` : ToyModel.formatCurrency(toy.discountValue)}
                            </span>
                          </div>
                          <div className="text-xs font-extrabold text-slate-900 mt-1">
                            {ToyModel.formatCurrency(b.finalPrice)} c/u
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center border border-yellow-300 rounded-xl bg-white overflow-hidden shadow-xs">
                            <button
                              onClick={() => onUpdateQuantity(toy.id, -1)}
                              className="p-1.5 text-slate-600 hover:bg-yellow-50"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2.5 text-xs font-black text-slate-900">{quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(toy.id, 1)}
                              disabled={quantity >= toy.stock}
                              className="p-1.5 text-slate-600 hover:bg-yellow-50 disabled:opacity-30"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="text-xs font-black text-slate-900 font-display">
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
                <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-200 flex items-start gap-2.5">
                  <FileText className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-orange-950 font-medium leading-relaxed">
                    La factura se registrará con numeración correlativa y aplicará el desglose exacto de impuestos y descuentos fiscales en Pesos Colombianos (COP).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre Completo / Razón Social *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input
                      id="invoice-customer-name"
                      type="text"
                      required
                      placeholder="Ej. Juan Pérez o Inversiones S.A.S."
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-medium focus:outline-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Documento / Cédula / NIT *</label>
                    <input
                      id="invoice-customer-doc"
                      type="text"
                      required
                      placeholder="1094829104"
                      value={customerDocument}
                      onChange={(e) => setCustomerDocument(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-mono font-bold focus:outline-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Teléfono Móvil</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-orange-400" />
                      <input
                        type="text"
                        placeholder="+57 300 000 0000"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-medium focus:outline-orange-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico para Factura *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input
                      id="invoice-customer-email"
                      type="email"
                      required
                      placeholder="cliente@correo.com"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-medium focus:outline-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Dirección de Entrega / Facturación</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input
                      type="text"
                      placeholder="Dirección, Ciudad"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-medium focus:outline-orange-500"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Método de Pago</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'tarjeta', label: 'Tarjeta Crédito/Débito', icon: CreditCard },
                      { id: 'efectivo', label: 'Efectivo en Tienda', icon: Receipt },
                      { id: 'transferencia', label: 'Transferencia Bancaria', icon: Sparkles },
                      { id: 'digital', label: 'Billetera Digital', icon: ShieldCheck },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                        className={`p-3 rounded-2xl border text-left text-xs font-bold flex items-center gap-2 transition-all ${
                          paymentMethod === m.id
                            ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-xs'
                            : 'border-yellow-200 text-slate-700 hover:bg-yellow-50'
                        }`}
                      >
                        <m.icon className="w-4 h-4 shrink-0 text-orange-500" />
                        <span className="truncate">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Summary Breakdown Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-yellow-50/70 border-t border-yellow-200 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span className="font-medium">Subtotal Base:</span>
                  <span className="font-bold text-slate-900">{ToyModel.formatCurrency(summary.subtotalBase)}</span>
                </div>
                <div className="flex justify-between text-indigo-700">
                  <span className="font-medium">Total Impuestos (IVA):</span>
                  <span className="font-black">+{ToyModel.formatCurrency(summary.totalTaxes)}</span>
                </div>
                <div className="flex justify-between text-orange-700">
                  <span className="font-medium">Total Descuentos Aplicados:</span>
                  <span className="font-black">-{ToyModel.formatCurrency(summary.totalDiscounts)}</span>
                </div>

                <div className="pt-3 border-t border-yellow-200 flex justify-between items-baseline">
                  <span className="text-sm font-black text-slate-900 font-display">TOTAL A PAGAR:</span>
                  <span className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                    {ToyModel.formatCurrency(summary.grandTotal)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              {!isCheckingOut ? (
                <button
                  id="btn-proceed-to-checkout"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <Receipt className="w-4 h-4" />
                  <span>Proceder a Generar Factura</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="px-5 py-3 rounded-2xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50"
                  >
                    Volver
                  </button>
                  <button
                    id="btn-confirm-invoice"
                    type="submit"
                    form="checkout-invoice-form"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2"
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
