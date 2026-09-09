import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Receipt, 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  User, 
  Mail, 
  CreditCard, 
  Calendar,
  FileCheck,
  Loader2,
  Trash2
} from 'lucide-react';
import { Invoice, UserProfile } from '../types';
import { ToyModel } from '../models/ToyModel';
import { generateInvoicePdf } from '../utils/generateInvoicePdf';
import { InvoiceController } from '../controllers/InvoiceController';

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  currentUser?: UserProfile | null;
  onClose: () => void;
  onDeleteInvoice?: (id: string) => Promise<void>;
}

export const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({ 
  invoice, 
  currentUser,
  onClose,
  onDeleteInvoice
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!invoice) return null;

  const isAdmin = currentUser?.role === 'admin';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    try {
      setIsGeneratingPdf(true);
      generateInvoicePdf(invoice);
    } catch (err) {
      console.error('Error generando PDF:', err);
    } finally {
      setTimeout(() => setIsGeneratingPdf(false), 400);
    }
  };

  const handleDeleteFromModal = async () => {
    if (!isAdmin) return;
    const confirmMessage = `¿Estás seguro de eliminar permanentemente la factura ${invoice.invoiceNumber} de ${invoice.customerName}?\n\nComo administrador, esta acción borrará la factura de la base de datos sin importar el cliente o la fecha.`;
    if (window.confirm(confirmMessage)) {
      try {
        setIsDeleting(true);
        if (onDeleteInvoice) {
          await onDeleteInvoice(invoice.id);
        } else {
          await InvoiceController.deleteInvoice(invoice.id, currentUser);
        }
        onClose();
      } catch (err: any) {
        alert(err?.message || 'Error al eliminar la factura');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div 
      id="invoice-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150 print:p-0 print:bg-white print:static print:inset-auto"
    >
      <div 
        id="invoice-printable-card"
        className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl border border-yellow-200 dark:border-slate-800 overflow-hidden my-auto print:shadow-none print:border-none print:m-0 print:w-full print:max-w-none print:max-h-none"
      >
        
        {/* Modal Action Bar (Sticky at top, hidden when printing) */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-yellow-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 bg-yellow-50/95 dark:bg-slate-800/95 shrink-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] sm:text-xs font-black flex items-center gap-1 border border-emerald-200 dark:border-emerald-800/40">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Emitida</span>
            </span>
            <span className="text-xs font-mono font-bold text-orange-950 dark:text-orange-300">{invoice.invoiceNumber}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="btn-download-pdf-invoice"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              title="Descargar factura en formato PDF (1 página oficial)"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Descargando...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black transition-all shadow-xs cursor-pointer"
              title="Imprimir factura"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            {isAdmin && (
              <button
                id="btn-delete-invoice-modal"
                onClick={handleDeleteFromModal}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-2xl bg-rose-50 hover:bg-rose-600 dark:bg-rose-950/40 dark:hover:bg-rose-600 text-rose-600 dark:text-rose-400 hover:text-white dark:hover:text-white border border-rose-200 dark:border-rose-900/50 text-xs font-black transition-all shadow-xs cursor-pointer disabled:opacity-50"
                title="Eliminar factura permanentemente de la base de datos (Solo Administrador)"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isDeleting ? 'Borrando...' : 'Eliminar'}</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-2xl hover:bg-yellow-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
              title="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body with dedicated vertical scrollbar */}
        <div 
          id="invoice-printable-area" 
          className="overflow-y-auto flex-1 p-4 sm:p-8 lg:p-10 text-slate-800 dark:text-slate-200 space-y-5 sm:space-y-8 bg-white dark:bg-slate-900 print:overflow-visible print:p-2 print:bg-white print:text-slate-800"
        >
          
          {/* Header & Company Info */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-yellow-200 dark:border-slate-800 pb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-900 dark:text-white font-display">
                  Toy<span className="text-orange-500">Store</span> Kids
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium pt-1">
                ToyStore S.A.S. · NIT 901.884.210-9 · Régimen Común
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Av. de la Alegría # 100, Piso 3 · Bogotá D.C., Colombia
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                contacto@toystore.co · www.toystore.co · PBX: (601) 789 0000
              </p>
            </div>

            <div className="sm:text-right space-y-1 bg-yellow-50/70 dark:bg-slate-800 p-4 rounded-[1.5rem] border border-yellow-200 dark:border-slate-700 sm:min-w-[220px]">
              <div className="text-xs uppercase font-black tracking-widest text-orange-950 dark:text-orange-300">
                Factura Electrónica de Venta
              </div>
              <div className="text-xl font-black text-orange-600 dark:text-orange-400 font-mono">
                {invoice.invoiceNumber}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center sm:justify-end gap-1 pt-1">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>{new Date(invoice.createdAt).toLocaleString('es-CO')}</span>
              </div>
              <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider border border-emerald-200 dark:border-emerald-800/40">
                Estado: {invoice.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Customer & Billing Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-yellow-50/40 dark:bg-slate-800/50 p-5 rounded-[1.5rem] border border-yellow-200/80 dark:border-slate-700 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-950 dark:text-orange-300 block mb-1">
                Datos del Cliente / Comprador:
              </span>
              <p className="font-black text-sm text-slate-900 dark:text-white">{invoice.customerName}</p>
              <p className="text-slate-600 dark:text-slate-400 font-mono">Documento / Cédula / NIT: <span className="font-bold text-slate-900 dark:text-white">{invoice.customerDocument}</span></p>
              <p className="text-slate-600 dark:text-slate-300 font-medium">Email: {invoice.customerEmail}</p>
              {invoice.customerPhone && <p className="text-slate-600 dark:text-slate-400">Teléfono: {invoice.customerPhone}</p>}
              {invoice.customerAddress && <p className="text-slate-600 dark:text-slate-400">Dirección: {invoice.customerAddress}</p>}
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-950 dark:text-orange-300 block mb-1">
                Detalles de Pago y Emisión:
              </span>
              <p className="text-slate-600 dark:text-slate-300">
                Método de Pago: <span className="font-black capitalize text-slate-900 dark:text-white">{invoice.paymentMethod}</span>
              </p>
              <p className="text-slate-600 dark:text-slate-300">
                Moneda: <span className="font-black text-orange-600 dark:text-orange-400">Pesos Colombianos (COP)</span>
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Emitida por: <span className="font-medium text-slate-900 dark:text-white">{invoice.createdByUserEmail}</span> ({invoice.createdByRole})
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-[11px] pt-1 font-medium">
                Resolución DIAN No. 187640001 · Habilitada
              </p>
            </div>
          </div>

          {/* Line Items Table (Desktop & Print) */}
          <div className="hidden sm:block print:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-yellow-50 dark:bg-slate-800 uppercase tracking-wider font-black text-orange-950 dark:text-orange-300 border-y border-yellow-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-3">Ítem / Juguete</th>
                  <th className="py-3 px-2 text-center">Cant.</th>
                  <th className="py-3 px-3 text-right">Precio Base</th>
                  <th className="py-3 px-3 text-right">Impuesto</th>
                  <th className="py-3 px-3 text-right">Descuento</th>
                  <th className="py-3 px-3 text-right">Total Ítem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-100 dark:divide-slate-800 font-medium">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50/30 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{item.toyName}</div>
                      <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{item.sku} · {item.categoryName}</div>
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-slate-800 dark:text-slate-200">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-700 dark:text-slate-300 font-bold">
                      {ToyModel.formatCurrency(item.unitBasePrice)}
                    </td>
                    <td className="py-3 px-3 text-right text-indigo-700 dark:text-indigo-400 font-black">
                      +{item.taxRate}% ({ToyModel.formatCurrency(item.totalTax)})
                    </td>
                    <td className="py-3 px-3 text-right text-orange-700 dark:text-orange-400 font-black">
                      {item.totalDiscount > 0 ? `-${ToyModel.formatCurrency(item.totalDiscount)}` : '$0 COP'}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-emerald-600 dark:text-emerald-400 text-sm font-display">
                      {ToyModel.formatCurrency(item.totalFinal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Line Items Cards (Mobile Screen Only) */}
          <div className="block sm:hidden print:hidden space-y-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-orange-950 dark:text-orange-300 block">
              Ítems Comprados ({invoice.items.length}):
            </span>
            <div className="divide-y divide-yellow-100 dark:divide-slate-800 rounded-2xl border border-yellow-200 dark:border-slate-800 overflow-hidden bg-yellow-50/20 dark:bg-slate-800/30">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{item.toyName}</h5>
                      <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500">{item.sku} · {item.categoryName}</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-yellow-100 dark:bg-slate-800 text-orange-950 dark:text-orange-300 text-[10px] font-black shrink-0">
                      Cant: {item.quantity}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Base unit.:</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{ToyModel.formatCurrency(item.unitBasePrice)}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">IVA (+{item.taxRate}%):</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">+{ToyModel.formatCurrency(item.totalTax)}</span>
                    </div>
                    {item.totalDiscount > 0 && (
                      <div>
                        <span className="text-slate-400 block text-[10px]">Descuento:</span>
                        <span className="font-semibold text-orange-600 dark:text-orange-400">-{ToyModel.formatCurrency(item.totalDiscount)}</span>
                      </div>
                    )}
                    <div className={item.totalDiscount > 0 ? '' : 'col-span-2'}>
                      <span className="text-slate-400 block text-[10px]">Total ítem:</span>
                      <span className="font-black text-emerald-600 dark:text-emerald-400 text-xs font-display">
                        {ToyModel.formatCurrency(item.totalFinal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals Summary Card */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-yellow-200 dark:border-slate-800">
            <div className="max-w-xs text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
              <p className="font-black text-slate-800 dark:text-slate-200">Condiciones de Garantía:</p>
              <p>
                Todos los juguetes cuentan con 90 días de garantía directa por defectos de fábrica. Conserve este documento fiscal en formato PDF.
              </p>
              {invoice.notes && (
                <p className="pt-2 text-slate-600 dark:text-slate-400 italic font-medium">
                  Nota: {invoice.notes}
                </p>
              )}
            </div>

            <div className="w-full sm:w-80 bg-yellow-50/70 dark:bg-slate-800 p-5 rounded-[1.5rem] border border-yellow-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span className="font-medium">Subtotal Base:</span>
                <span className="font-bold text-slate-900 dark:text-white">{ToyModel.formatCurrency(invoice.subtotalBase)}</span>
              </div>
              <div className="flex justify-between text-indigo-700 dark:text-indigo-400">
                <span className="font-medium">Impuestos Totales (IVA):</span>
                <span className="font-black">+{ToyModel.formatCurrency(invoice.totalTaxes)}</span>
              </div>
              <div className="flex justify-between text-orange-700 dark:text-orange-400">
                <span className="font-medium">Descuentos Totales:</span>
                <span className="font-black">-{ToyModel.formatCurrency(invoice.totalDiscounts)}</span>
              </div>

              <div className="pt-3 border-t border-yellow-200 dark:border-slate-700 flex justify-between items-baseline">
                <span className="font-black text-sm text-slate-900 dark:text-white font-display">TOTAL A PAGAR:</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                  {ToyModel.formatCurrency(invoice.grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer stamp */}
          <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 space-y-1">
            <p className="font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              ¡Gracias por tu compra en ToyStore Kids!
            </p>
            <p>Facturación electrónica oficial con cálculo automático de impuestos y descuentos · Moneda: COP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

