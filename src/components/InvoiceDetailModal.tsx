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
  Loader2
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Invoice } from '../types';
import { ToyModel } from '../models/ToyModel';

interface InvoiceDetailModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const InvoiceDetailModal: React.FC<InvoiceDetailModalProps> = ({ invoice, onClose }) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('invoice-printable-area');
    if (!element) return;

    try {
      setIsGeneratingPdf(true);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 800,
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 8;
      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      // Calculate aspect ratio
      const imgHeight = (canvas.height * availableWidth) / canvas.width;

      if (imgHeight <= availableHeight) {
        // Fits comfortably in 1 page with margins
        pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, imgHeight, undefined, 'FAST');
      } else {
        // Scale to fit completely in 1 single A4 page
        const scale = availableHeight / imgHeight;
        const scaledWidth = availableWidth * scale;
        const xOffset = margin + (availableWidth - scaledWidth) / 2;
        pdf.addImage(imgData, 'PNG', xOffset, margin, scaledWidth, availableHeight, undefined, 'FAST');
      }

      pdf.save(`Factura_${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      console.error('Error generando PDF:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150 print:p-0 print:bg-white print:static print:inset-auto">
      <div className="bg-white w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl shadow-2xl border border-yellow-200 overflow-hidden my-auto print:shadow-none print:border-none print:m-0 print:w-full print:max-w-none print:max-h-none">
        
        {/* Modal Action Bar (Sticky at top, hidden when printing) */}
        <div className="px-5 sm:px-6 py-4 border-b border-yellow-200 flex items-center justify-between bg-yellow-50/95 shrink-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Factura Emitida</span>
            </span>
            <span className="text-xs font-mono font-bold text-orange-950">{invoice.invoiceNumber}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-download-pdf-invoice"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition-all shadow-xs disabled:opacity-50 cursor-pointer"
              title="Descargar factura en formato PDF (1 página)"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span className="hidden sm:inline">Generando PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black transition-all shadow-xs cursor-pointer"
              title="Imprimir factura"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-2xl hover:bg-yellow-100 cursor-pointer transition-colors"
              title="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Body with dedicated vertical scrollbar */}
        <div 
          id="invoice-printable-area" 
          className="overflow-y-auto flex-1 p-6 sm:p-10 text-slate-800 space-y-6 sm:space-y-8 bg-white print:overflow-visible print:p-2"
        >
          
          {/* Header & Company Info */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-yellow-200 pb-8">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-xs">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-2xl font-black text-slate-900 font-display">
                  Toy<span className="text-orange-500">Store</span> Kids
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium pt-1">
                ToyStore S.A.S. · NIT 901.884.210-9 · Régimen Común
              </p>
              <p className="text-xs text-slate-500">
                Av. de la Alegría # 100, Piso 3 · Bogotá D.C., Colombia
              </p>
              <p className="text-xs text-slate-500">
                contacto@toystore.co · www.toystore.co · PBX: (601) 789 0000
              </p>
            </div>

            <div className="sm:text-right space-y-1 bg-yellow-50/70 p-4 rounded-[1.5rem] border border-yellow-200 sm:min-w-[220px]">
              <div className="text-xs uppercase font-black tracking-widest text-orange-950">
                Factura Electrónica de Venta
              </div>
              <div className="text-xl font-black text-orange-600 font-mono">
                {invoice.invoiceNumber}
              </div>
              <div className="text-xs text-slate-500 flex items-center sm:justify-end gap-1 pt-1">
                <Calendar className="w-3.5 h-3.5 text-orange-400" />
                <span>{new Date(invoice.createdAt).toLocaleString('es-CO')}</span>
              </div>
              <div className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                Estado: {invoice.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Customer & Billing Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-yellow-50/40 p-5 rounded-[1.5rem] border border-yellow-200/80 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-950 block mb-1">
                Datos del Cliente / Comprador:
              </span>
              <p className="font-black text-sm text-slate-900">{invoice.customerName}</p>
              <p className="text-slate-600 font-mono">Documento / Cédula / NIT: <span className="font-bold text-slate-900">{invoice.customerDocument}</span></p>
              <p className="text-slate-600 font-medium">Email: {invoice.customerEmail}</p>
              {invoice.customerPhone && <p className="text-slate-600">Teléfono: {invoice.customerPhone}</p>}
              {invoice.customerAddress && <p className="text-slate-600">Dirección: {invoice.customerAddress}</p>}
            </div>

            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-950 block mb-1">
                Detalles de Pago y Emisión:
              </span>
              <p className="text-slate-600">
                Método de Pago: <span className="font-black capitalize text-slate-900">{invoice.paymentMethod}</span>
              </p>
              <p className="text-slate-600">
                Moneda: <span className="font-black text-orange-600">Pesos Colombianos (COP)</span>
              </p>
              <p className="text-slate-600">
                Emitida por: <span className="font-medium text-slate-900">{invoice.createdByUserEmail}</span> ({invoice.createdByRole})
              </p>
              <p className="text-slate-400 text-[11px] pt-1 font-medium">
                Resolución DIAN No. 187640001 · Habilitada
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-yellow-50 uppercase tracking-wider font-black text-orange-950 border-y border-yellow-200">
                <tr>
                  <th className="py-3 px-3">Ítem / Juguete</th>
                  <th className="py-3 px-2 text-center">Cant.</th>
                  <th className="py-3 px-3 text-right">Precio Base</th>
                  <th className="py-3 px-3 text-right">Impuesto</th>
                  <th className="py-3 px-3 text-right">Descuento</th>
                  <th className="py-3 px-3 text-right">Total Ítem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-100 font-medium">
                {invoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-yellow-50/30">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{item.toyName}</div>
                      <div className="text-[10px] font-mono text-slate-400">{item.sku} · {item.categoryName}</div>
                    </td>
                    <td className="py-3 px-2 text-center font-bold text-slate-800">
                      {item.quantity}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-700 font-bold">
                      {ToyModel.formatCurrency(item.unitBasePrice)}
                    </td>
                    <td className="py-3 px-3 text-right text-indigo-700 font-black">
                      +{item.taxRate}% ({ToyModel.formatCurrency(item.totalTax)})
                    </td>
                    <td className="py-3 px-3 text-right text-orange-700 font-black">
                      {item.totalDiscount > 0 ? `-${ToyModel.formatCurrency(item.totalDiscount)}` : '$0 COP'}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-emerald-600 text-sm font-display">
                      {ToyModel.formatCurrency(item.totalFinal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Summary Card */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pt-4 border-t border-yellow-200">
            <div className="max-w-xs text-[11px] text-slate-500 space-y-1">
              <p className="font-black text-slate-800">Condiciones de Garantía:</p>
              <p>
                Todos los juguetes cuentan con 90 días de garantía directa por defectos de fábrica. Conserve este documento fiscal en formato PDF.
              </p>
              {invoice.notes && (
                <p className="pt-2 text-slate-600 italic font-medium">
                  Nota: {invoice.notes}
                </p>
              )}
            </div>

            <div className="w-full sm:w-80 bg-yellow-50/70 p-5 rounded-[1.5rem] border border-yellow-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span className="font-medium">Subtotal Base:</span>
                <span className="font-bold text-slate-900">{ToyModel.formatCurrency(invoice.subtotalBase)}</span>
              </div>
              <div className="flex justify-between text-indigo-700">
                <span className="font-medium">Impuestos Totales (IVA):</span>
                <span className="font-black">+{ToyModel.formatCurrency(invoice.totalTaxes)}</span>
              </div>
              <div className="flex justify-between text-orange-700">
                <span className="font-medium">Descuentos Totales:</span>
                <span className="font-black">-{ToyModel.formatCurrency(invoice.totalDiscounts)}</span>
              </div>

              <div className="pt-3 border-t border-yellow-200 flex justify-between items-baseline">
                <span className="font-black text-sm text-slate-900 font-display">TOTAL A PAGAR:</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 font-display">
                  {ToyModel.formatCurrency(invoice.grandTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer stamp */}
          <div className="text-center pt-8 border-t border-slate-100 text-[10px] text-slate-400 space-y-1">
            <p className="font-bold uppercase tracking-widest text-slate-500">
              ¡Gracias por tu compra en ToyStore Kids!
            </p>
            <p>Facturación electrónica oficial con cálculo automático de impuestos y descuentos · Moneda: COP</p>
          </div>
        </div>
      </div>
    </div>
  );
};

