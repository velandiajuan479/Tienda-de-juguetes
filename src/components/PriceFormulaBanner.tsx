import React, { useState } from 'react';
import { Calculator, Sparkles, ChevronRight, Info, CheckCircle2 } from 'lucide-react';
import { ToyModel } from '../models/ToyModel';

export const PriceFormulaBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [demoBase, setDemoBase] = useState(120000);
  const [demoTaxRate, setDemoTaxRate] = useState(19);
  const [demoDiscountType, setDemoDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [demoDiscountValue, setDemoDiscountValue] = useState(15);

  const breakdown = ToyModel.calculatePriceBreakdown(demoBase, demoTaxRate, demoDiscountType, demoDiscountValue);

  return (
    <div className="bg-white rounded-[2rem] border border-yellow-200/90 p-5 mb-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0 shadow-xs">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-black text-slate-900 font-display">
                Cálculo de Precios Automatizado (Arquitectura MVC)
              </h3>
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                100% Automático · COP
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              <span className="font-bold text-slate-800">Fórmula de Negocio:</span> Precio Final = Precio Base + (Precio Base × Impuesto%) - Descuentos
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl bg-yellow-100/70 hover:bg-yellow-100 text-orange-950 text-xs font-black transition-all border border-yellow-300/60 shadow-xs"
        >
          <span>{isOpen ? 'Ocultar Simulador' : 'Abrir Simulador de Precios'}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 pt-4 border-t border-yellow-200 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs animate-in fade-in duration-200">
          <div className="bg-[#FFFBEB] p-3.5 rounded-2xl border border-yellow-200/80">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Precio Base (COP)</label>
            <input
              type="number"
              min="0"
              value={demoBase}
              onChange={(e) => setDemoBase(Number(e.target.value) || 0)}
              className="w-full px-3 py-1.5 rounded-xl bg-white border border-yellow-300 font-bold text-slate-900 focus:outline-orange-500"
            />
          </div>

          <div className="bg-[#FFFBEB] p-3.5 rounded-2xl border border-yellow-200/80">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">Impuesto (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={demoTaxRate}
              onChange={(e) => setDemoTaxRate(Number(e.target.value) || 0)}
              className="w-full px-3 py-1.5 rounded-xl bg-white border border-yellow-300 font-bold text-slate-900 focus:outline-orange-500"
            />
            <div className="text-[10px] text-indigo-700 font-semibold mt-1">Impuesto: +{ToyModel.formatCurrency(breakdown.taxAmount)}</div>
          </div>

          <div className="bg-[#FFFBEB] p-3.5 rounded-2xl border border-yellow-200/80">
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Descuento ({demoDiscountType === 'percentage' ? '%' : '$'})
            </label>
            <div className="flex gap-1.5">
              <input
                type="number"
                min="0"
                value={demoDiscountValue}
                onChange={(e) => setDemoDiscountValue(Number(e.target.value) || 0)}
                className="w-full px-3 py-1.5 rounded-xl bg-white border border-yellow-300 font-bold text-slate-900 focus:outline-orange-500"
              />
              <button
                type="button"
                onClick={() => setDemoDiscountType(demoDiscountType === 'percentage' ? 'fixed' : 'percentage')}
                className="px-2.5 py-1 bg-yellow-200 rounded-xl text-[10px] font-black text-orange-950 hover:bg-yellow-300 transition-colors"
              >
                {demoDiscountType === 'percentage' ? '%' : '$'}
              </button>
            </div>
            <div className="text-[10px] text-orange-700 font-bold mt-1">Ahorro: -{ToyModel.formatCurrency(breakdown.discountAmount)}</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-amber-500 text-white p-4 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-100">Precio Final Calculado</span>
              <div className="text-xl sm:text-2xl font-black mt-0.5">{ToyModel.formatCurrency(breakdown.finalPrice)}</div>
            </div>
            <div className="text-[10px] text-orange-100 font-medium flex items-center gap-1 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Base + Impuesto - Descuento</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
