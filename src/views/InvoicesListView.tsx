import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Eye, 
  Download, 
  Calendar, 
  CreditCard, 
  User, 
  Filter, 
  CheckCircle2, 
  Ban, 
  AlertCircle,
  Clock,
  Printer
} from 'lucide-react';
import { Invoice, UserProfile, UserRole } from '../types';
import { ToyModel } from '../models/ToyModel';
import { InvoiceController } from '../controllers/InvoiceController';
import { generateInvoicePdf } from '../utils/generateInvoicePdf';

interface InvoicesListViewProps {
  invoices: Invoice[];
  currentUser: UserProfile | null;
  onSelectInvoice: (invoice: Invoice) => void;
  onRefreshInvoices: () => Promise<void>;
}

export const InvoicesListView: React.FC<InvoicesListViewProps> = ({
  invoices,
  currentUser,
  onSelectInvoice,
  onRefreshInvoices,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const role: UserRole = currentUser?.role || 'cliente';
  const isStaffOrAdmin = role === 'admin' || role === 'empleado';

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.customerDocument.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchQuery, statusFilter]);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    if (!isStaffOrAdmin) return;
    const nextStatus = currentStatus === 'pagada' ? 'anulada' : 'pagada';
    if (confirm(`¿Deseas cambiar el estado de la factura a "${nextStatus.toUpperCase()}"?`)) {
      await InvoiceController.updateInvoiceStatus(id, nextStatus as any);
      await onRefreshInvoices();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs font-black mb-2 border border-orange-200 dark:border-orange-500/30">
            <FileText className="w-3.5 h-3.5" />
            <span>{isStaffOrAdmin ? 'Libro Fiscal de Facturas (MVC)' : 'Mis Facturas de Compra'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display tracking-tight">
            {isStaffOrAdmin ? 'Historial Global de Facturación' : 'Mis Compras & Facturas'}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-medium">
            {isStaffOrAdmin
              ? 'Consulta, descarga en PDF y audita todas las transacciones emitidas en la tienda con desglose tributario en COP.'
              : 'Revisa y descarga tus facturas oficiales en formato PDF.'}
          </p>
        </div>

        {/* Total revenue badge for staff/admin */}
        {isStaffOrAdmin && (
          <div className="bg-white dark:bg-slate-900 p-4 rounded-[2rem] border border-yellow-200/90 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-950 dark:text-orange-300 block">Total Facturado</span>
              <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                {ToyModel.formatCurrency(invoices.reduce((acc, i) => (i.status === 'pagada' ? acc + i.grandTotal : acc), 0))}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 border border-yellow-200/90 dark:border-slate-800 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
          <input
            type="text"
            placeholder="Buscar por N° Factura, Nombre de cliente o Documento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-slate-800 border border-yellow-300 dark:border-slate-700 text-sm font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-black text-slate-600 dark:text-slate-400 whitespace-nowrap">Estado:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-[#FFFBEB] dark:bg-slate-800 border border-yellow-300 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-orange-500"
          >
            <option value="all">Todos ({invoices.length})</option>
            <option value="pagada">Pagadas</option>
            <option value="anulada">Anuladas</option>
          </select>
        </div>
      </div>

      {/* Invoices List / Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-yellow-200/90 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-yellow-50 dark:bg-slate-800/90 text-xs font-black uppercase tracking-wider text-orange-950 dark:text-orange-300 border-b border-yellow-200 dark:border-slate-800">
              <tr>
                <th className="py-4 px-4 sm:px-6">N° Factura</th>
                <th className="py-4 px-4">Fecha & Hora</th>
                <th className="py-4 px-4">Cliente / Documento</th>
                <th className="py-4 px-4 text-center">Ítems</th>
                <th className="py-4 px-4 text-right">Subtotal</th>
                <th className="py-4 px-4 text-right">Total Factura</th>
                <th className="py-4 px-4 text-center">Estado</th>
                <th className="py-4 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-14 text-center text-slate-400 dark:text-slate-500 font-bold">
                    <div className="w-14 h-14 rounded-3xl bg-yellow-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-2 text-amber-600 dark:text-amber-400">
                      <FileText className="w-7 h-7" />
                    </div>
                    No se encontraron facturas registradas.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-amber-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    
                    {/* Invoice Number */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-orange-950 dark:text-orange-300 bg-yellow-100 dark:bg-slate-800 px-3 py-1 rounded-xl text-xs border border-yellow-300 dark:border-slate-700">
                          {inv.invoiceNumber}
                        </span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(inv.createdAt).toLocaleString('es-CO', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-4">
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 dark:text-white block">{inv.customerName}</span>
                        <span className="text-slate-400 dark:text-slate-500 font-mono">{inv.customerDocument}</span>
                      </div>
                    </td>

                    {/* Items count */}
                    <td className="py-4 px-4 text-center">
                      <span className="px-3 py-1 rounded-full bg-yellow-50 dark:bg-slate-800 border border-yellow-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold">
                        {inv.items.reduce((acc, i) => acc + i.quantity, 0)} un.
                      </span>
                    </td>

                    {/* Subtotal */}
                    <td className="py-4 px-4 text-right text-xs font-bold text-slate-700 dark:text-slate-300">
                      {ToyModel.formatCurrency(inv.subtotalBase)}
                    </td>

                    {/* Grand Total */}
                    <td className="py-4 px-4 text-right font-black text-emerald-600 dark:text-emerald-400 text-base font-display">
                      {ToyModel.formatCurrency(inv.grandTotal)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black ${
                          inv.status === 'pagada'
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40'
                            : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/40'
                        }`}
                      >
                        {inv.status === 'pagada' ? <CheckCircle2 className="w-3 h-3" /> : <Ban className="w-3 h-3" />}
                        <span className="capitalize">{inv.status}</span>
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectInvoice(inv)}
                          className="px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-black transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                          title="Ver detalle completo de la factura"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Ver Factura</span>
                        </button>

                        <button
                          onClick={() => generateInvoicePdf(inv)}
                          className="px-3 py-2 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                          title="Descargar Factura PDF oficial en 1 página"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </button>

                        {isStaffOrAdmin && (
                          <button
                            onClick={() => handleToggleStatus(inv.id, inv.status)}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 cursor-pointer"
                            title="Cambiar estado de factura"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

