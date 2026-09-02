import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, FileText, ShoppingBag, CheckCircle2, Gift, PartyPopper } from 'lucide-react';
import { Invoice } from '../types';

interface OrderSuccessModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onViewInvoice: (invoice: Invoice) => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  invoice,
  onClose,
  onViewInvoice,
}) => {
  useEffect(() => {
    if (!invoice) return;

    // Cannon explosion of celebratory confetti
    const fireCelebration = () => {
      // First burst - Center
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f97316', '#eab308', '#10b981', '#06b6d4', '#ec4899', '#8b5cf6'],
      });

      // Second burst - Left cannon
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 70,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#f97316', '#fbbf24', '#34d399', '#f43f5e'],
        });
      }, 250);

      // Third burst - Right cannon
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 70,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#f97316', '#fbbf24', '#38bdf8', '#a855f7'],
        });
      }, 450);
    };

    fireCelebration();
  }, [invoice]);

  if (!invoice) return null;

  const totalItemsCount = invoice.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border-2 border-yellow-300 overflow-hidden relative text-center p-6 sm:p-8 animate-in zoom-in-95 duration-200">
        
        {/* Decorative Festive Top Ribbon */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full blur-2xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-tr from-emerald-300 to-teal-400 rounded-full blur-2xl opacity-30 pointer-events-none" />

        {/* Animated Celebration Icon */}
        <div className="relative mx-auto mb-4 w-20 h-20">
          <div className="absolute inset-0 bg-orange-400/20 rounded-full animate-ping" />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-orange-500/30 rotate-6 hover:rotate-12 transition-transform">
            <PartyPopper className="w-10 h-10" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* Heading */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-900 text-xs font-black mb-2">
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
          <span>¡Compra Finalizada con Éxito!</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mb-2">
          ¡Gracias por tu compra! 🎉
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mb-6">
          Tu pedido en <strong className="text-orange-600 font-bold">ToyStore Kids</strong> ha sido registrado y la factura fiscal se generó correctamente.
        </p>

        {/* Order Details Card */}
        <div className="bg-[#FFFBEB] border border-yellow-200 rounded-2xl p-4 mb-6 text-left space-y-2.5">
          <div className="flex items-center justify-between text-xs pb-2 border-b border-yellow-200/80">
            <span className="text-slate-500 font-medium">Factura N°:</span>
            <span className="font-mono font-bold text-orange-950 bg-white px-2 py-0.5 rounded-md border border-yellow-300">
              {invoice.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-yellow-200/80">
            <span className="text-slate-500 font-medium">Cliente:</span>
            <span className="font-bold text-slate-800">{invoice.customerName}</span>
          </div>

          <div className="flex items-center justify-between text-xs pb-2 border-b border-yellow-200/80">
            <span className="text-slate-500 font-medium">Juguetes adquiridos:</span>
            <span className="font-bold text-slate-800 flex items-center gap-1">
              <Gift className="w-3.5 h-3.5 text-orange-500" />
              <span>{totalItemsCount} {totalItemsCount === 1 ? 'unidad' : 'unidades'}</span>
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-black uppercase text-orange-950">Total Pagado:</span>
            <span className="text-lg font-black text-emerald-700 font-display">
              ${invoice.totalAmount.toLocaleString('es-CO')} COP
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onViewInvoice(invoice);
              onClose();
            }}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shadow-[0_4px_0_0_rgba(234,88,12,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Ver Factura & Descargar PDF</span>
          </button>

          <button
            onClick={onClose}
            className="py-3.5 px-5 rounded-2xl bg-yellow-100 hover:bg-yellow-200 text-orange-950 text-xs font-black transition-colors flex items-center justify-center gap-2 border border-yellow-300 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-orange-700" />
            <span>Seguir Comprando</span>
          </button>
        </div>

      </div>
    </div>
  );
};
