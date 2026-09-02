import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  DollarSign, 
  Percent, 
  Layers, 
  Check, 
  X, 
  AlertTriangle, 
  Calculator, 
  Sparkles,
  Package,
  Image as ImageIcon
} from 'lucide-react';
import { Toy, Category, TaxType, DiscountType, UserProfile } from '../types';
import { ToyModel, TAX_PRESETS } from '../models/ToyModel';
import { ToyController } from '../controllers/ToyController';

interface ToyManagementViewProps {
  toys: Toy[];
  categories: Category[];
  currentUser: UserProfile | null;
  onRefreshData: () => Promise<void>;
  editingToyItem?: Toy | null;
  onClearEditingToy?: () => void;
}

export const ToyManagementView: React.FC<ToyManagementViewProps> = ({
  toys,
  categories,
  currentUser,
  onRefreshData,
  editingToyItem,
  onClearEditingToy,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [deletingToyId, setDeletingToyId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [basePrice, setBasePrice] = useState<number>(80000);
  const [taxType, setTaxType] = useState<TaxType>('IVA_GENERAL');
  const [taxRate, setTaxRate] = useState<number>(19);
  const [discountType, setDiscountType] = useState<DiscountType>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(10);
  const [stock, setStock] = useState<number>(15);
  const [minAge, setMinAge] = useState<number>(4);
  const [imageUrl, setImageUrl] = useState('');

  // When props pass an editing toy from catalog
  React.useEffect(() => {
    if (editingToyItem) {
      handleOpenEdit(editingToyItem);
      onClearEditingToy?.();
    }
  }, [editingToyItem]);

  // Real-time calculation using MVC Model logic
  const livePriceBreakdown = useMemo(() => {
    return ToyModel.calculatePriceBreakdown(basePrice, taxRate, discountType, discountValue);
  }, [basePrice, taxRate, discountType, discountValue]);

  const handleOpenCreate = () => {
    setEditingId(null);
    setName('');
    setSku('TOY-' + Math.floor(1000 + Math.random() * 9000));
    setDescription('');
    setCategoryId(categories[0]?.id || '');
    setBasePrice(80000);
    setTaxType('IVA_GENERAL');
    setTaxRate(19);
    setDiscountType('percentage');
    setDiscountValue(10);
    setStock(20);
    setMinAge(3);
    setImageUrl('https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (toy: Toy) => {
    setEditingId(toy.id);
    setName(toy.name);
    setSku(toy.sku || '');
    setDescription(toy.description);
    setCategoryId(toy.categoryId);
    setBasePrice(toy.basePrice);
    setTaxType(toy.taxType || 'IVA_GENERAL');
    setTaxRate(toy.taxRate);
    setDiscountType(toy.discountType || 'percentage');
    setDiscountValue(toy.discountValue || 0);
    setStock(toy.stock);
    setMinAge(toy.minAge || 3);
    setImageUrl(toy.imageUrl);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleTaxPresetChange = (preset: typeof TAX_PRESETS[0]) => {
    setTaxType(preset.type);
    setTaxRate(preset.rate);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');

    try {
      const selectedCat = categories.find((c) => c.id === categoryId || c.name.toLowerCase() === categoryId.toLowerCase());
      const categoryName = selectedCat?.name || (categories.length > 0 ? categories[0].name : 'General');
      const resolvedCategoryId = selectedCat?.id || categoryId;

      const toyPayload = {
        name,
        sku,
        description,
        categoryId: resolvedCategoryId,
        categoryName,
        basePrice: Number(basePrice) || 0,
        taxType,
        taxRate: Number(taxRate) || 0,
        discountType,
        discountValue: Number(discountValue) || 0,
        stock: Number(stock) || 0,
        minAge: Number(minAge) || 1,
        imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80',
      };

      if (editingId) {
        await ToyController.updateToy(editingId, toyPayload);
      } else {
        await ToyController.createToy(toyPayload);
      }

      await onRefreshData();
      setIsModalOpen(false);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error al guardar el juguete. Revisa los datos.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await ToyController.deleteToy(id);
      await onRefreshData();
      setDeletingToyId(null);
    } catch (err: any) {
      alert('Error al eliminar juguete: ' + err.message);
    }
  };

  const filteredToys = useMemo(() => {
    const selectedFilterCat = categories.find((c) => c.id === selectedCategoryFilter);
    return toys.filter((toy) => {
      const matchesSearch =
        toy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        toy.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        toy.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat =
        selectedCategoryFilter === 'all' ||
        toy.categoryId === selectedCategoryFilter ||
        (selectedFilterCat && Boolean(toy.categoryName) && toy.categoryName.trim().toLowerCase() === selectedFilterCat.name.trim().toLowerCase());
      return matchesSearch && matchesCat;
    });
  }, [toys, categories, searchQuery, selectedCategoryFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-700 text-xs font-black mb-2 border border-orange-200">
            <Package className="w-3.5 h-3.5" />
            <span>Módulo de Inventario & Tarifas (MVC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
            Gestión de Juguetes & Tarifas
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Crea, actualiza y administra juguetes con cálculo automático de impuestos y descuentos fiscales.
          </p>
        </div>

        <button
          id="btn-add-toy-modal"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Nuevo Juguete</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-[2rem] p-4 border border-yellow-200/90 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, SKU o categoría..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium text-slate-800 focus:outline-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-black text-slate-600 whitespace-nowrap">Categoría:</span>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-bold text-slate-800 focus:outline-orange-500"
          >
            <option value="all">Todas ({toys.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Toys Table */}
      <div className="bg-white rounded-[2rem] border border-yellow-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-yellow-50 text-xs font-black uppercase tracking-wider text-orange-950 border-b border-yellow-200">
              <tr>
                <th className="py-4 px-4 sm:px-6">Juguete / SKU</th>
                <th className="py-4 px-4">Categoría</th>
                <th className="py-4 px-4 text-right">Precio Base</th>
                <th className="py-4 px-4 text-right">Impuesto</th>
                <th className="py-4 px-4 text-right">Descuento</th>
                <th className="py-4 px-4 text-right">Precio Final</th>
                <th className="py-4 px-4 text-center">Stock</th>
                <th className="py-4 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-yellow-100 font-medium text-slate-700">
              {filteredToys.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 font-bold">
                    No se encontraron juguetes registrados con ese filtro.
                  </td>
                </tr>
              ) : (
                filteredToys.map((toy) => {
                  const b = ToyModel.calculatePriceBreakdown(
                    toy.basePrice,
                    toy.taxRate,
                    toy.discountType,
                    toy.discountValue
                  );

                  return (
                    <tr key={toy.id} className="hover:bg-amber-50/50 transition-colors">
                      {/* Name and Image */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={toy.imageUrl}
                            alt={toy.name}
                            className="w-12 h-12 rounded-2xl object-cover bg-amber-50 shrink-0 border border-yellow-200"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1">{toy.name}</span>
                            <span className="text-[11px] font-mono text-slate-500">{toy.sku || 'N/A'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full bg-yellow-100 text-orange-900 text-xs font-bold">
                          {toy.categoryName}
                        </span>
                      </td>

                      {/* Base Price */}
                      <td className="py-4 px-4 text-right font-bold text-slate-800">
                        {ToyModel.formatCurrency(b.basePrice)}
                      </td>

                      {/* Tax */}
                      <td className="py-4 px-4 text-right text-xs">
                        <span className="text-indigo-700 font-bold block">+{b.taxRate}%</span>
                        <span className="text-[10px] text-slate-500">+{ToyModel.formatCurrency(b.taxAmount)}</span>
                      </td>

                      {/* Discount */}
                      <td className="py-4 px-4 text-right text-xs">
                        {b.discountAmount > 0 ? (
                          <>
                            <span className="text-orange-600 font-bold block">
                              -{toy.discountType === 'percentage' ? `${toy.discountValue}%` : ToyModel.formatCurrency(toy.discountValue)}
                            </span>
                            <span className="text-[10px] text-orange-500">-{ToyModel.formatCurrency(b.discountAmount)}</span>
                          </>
                        ) : (
                          <span className="text-slate-400 text-xs">0%</span>
                        )}
                      </td>

                      {/* Final Price */}
                      <td className="py-4 px-4 text-right font-black text-emerald-600 text-base font-display">
                        {ToyModel.formatCurrency(b.finalPrice)}
                      </td>

                      {/* Stock */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black ${
                            toy.stock > 10
                              ? 'bg-emerald-100 text-emerald-800'
                              : toy.stock > 0
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {toy.stock} un.
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            id={`edit-table-btn-${toy.id}`}
                            onClick={() => handleOpenEdit(toy)}
                            className="p-2 rounded-xl text-slate-500 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                            title="Editar juguete"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            id={`delete-table-btn-${toy.id}`}
                            onClick={() => setDeletingToyId(toy.id)}
                            className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Eliminar juguete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Toy Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-3xl rounded-[2rem] shadow-2xl border border-yellow-200 overflow-hidden my-8">
            
            <div className="px-6 py-4 border-b border-yellow-200 flex items-center justify-between bg-yellow-50/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-orange-500 text-white font-bold rotate-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-display">
                  {editingId ? 'Editar Juguete' : 'Registrar Nuevo Juguete'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* General Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Juguete *</label>
                  <input
                    id="toy-form-name"
                    type="text"
                    required
                    placeholder="Ej. Castillo Legendario LEGO"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium focus:outline-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Categoría *</label>
                  <select
                    id="toy-form-category"
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium focus:outline-orange-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Detallada *</label>
                <textarea
                  id="toy-form-description"
                  required
                  rows={2}
                  placeholder="Detalles sobre piezas, edad, materiales y características..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium focus:outline-orange-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Código SKU</label>
                  <input
                    type="text"
                    placeholder="TOY-1234"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-mono font-medium focus:outline-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stock Disponible *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium focus:outline-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Edad Mínima Recomendada</label>
                  <input
                    type="number"
                    min="0"
                    placeholder="3"
                    value={minAge}
                    onChange={(e) => setMinAge(Number(e.target.value))}
                    className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium focus:outline-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL de la Imagen</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium focus:outline-orange-500"
                />
              </div>

              {/* Price, Tax, and Discount Section (Automated Calculations) */}
              <div className="bg-[#FFFBEB] p-4 sm:p-5 rounded-2xl border border-yellow-300 space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-black text-sm">
                  <Calculator className="w-4 h-4 text-orange-500" />
                  <span>Configuración Fiscal & Descuentos (Fórmula MVC)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Base Price */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Precio Base (COP) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input
                        id="toy-form-baseprice"
                        type="number"
                        step="1000"
                        min="0"
                        placeholder="Ej. 95000"
                        required
                        value={basePrice}
                        onChange={(e) => setBasePrice(Number(e.target.value) || 0)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-yellow-300 text-sm font-bold text-slate-800 focus:outline-orange-500"
                      />
                    </div>
                  </div>

                  {/* Tax Preset & Rate */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Impuesto *</label>
                    <select
                      value={taxRate}
                      onChange={(e) => {
                        const rate = Number(e.target.value);
                        const match = TAX_PRESETS.find((p) => p.rate === rate);
                        if (match) handleTaxPresetChange(match);
                        else setTaxRate(rate);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-yellow-300 text-xs font-semibold text-slate-800 focus:outline-orange-500"
                    >
                      {TAX_PRESETS.map((p) => (
                        <option key={p.label} value={p.rate}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Discount */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Descuento ({discountType === 'percentage' ? '% Porcentaje' : '$ COP Fijo'})
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="number"
                        step={discountType === 'percentage' ? '1' : '1000'}
                        min="0"
                        placeholder={discountType === 'percentage' ? 'Ej. 15' : 'Ej. 20000'}
                        value={discountValue}
                        onChange={(e) => setDiscountValue(Number(e.target.value) || 0)}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-yellow-300 text-sm font-bold text-slate-800 focus:outline-orange-500"
                      />
                      <button
                        type="button"
                        onClick={() => setDiscountType(discountType === 'percentage' ? 'fixed' : 'percentage')}
                        className="px-3 py-1 bg-yellow-200 hover:bg-yellow-300 rounded-xl text-xs font-black text-orange-950 whitespace-nowrap"
                        title="Cambiar entre porcentaje (%) o valor en pesos (COP)"
                      >
                        {discountType === 'percentage' ? '%' : 'COP'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Real-time calculated Result Box */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl shadow-sm border border-slate-800">
                  <div className="text-xs text-orange-300 font-bold mb-1">
                    Cálculo Automático en Vivo (Moneda COP):
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-mono text-slate-300">
                      Base: <span className="font-bold text-white">{ToyModel.formatCurrency(livePriceBreakdown.basePrice)}</span> + 
                      Impuesto ({livePriceBreakdown.taxRate}%): <span className="font-bold text-indigo-300">+{ToyModel.formatCurrency(livePriceBreakdown.taxAmount)}</span> - 
                      Descuento: <span className="font-bold text-orange-300">-{ToyModel.formatCurrency(livePriceBreakdown.discountAmount)}</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">Precio Final:</span>
                      <span className="text-2xl font-black text-emerald-400 font-display">
                        {ToyModel.formatCurrency(livePriceBreakdown.finalPrice)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  id="toy-form-submit"
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
                >
                  {isSaving ? (
                    <span>Guardando...</span>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{editingId ? 'Guardar Cambios' : 'Crear Juguete'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingToyId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white max-w-md w-full rounded-[2rem] p-6 shadow-2xl border border-yellow-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900 font-display">¿Eliminar este juguete?</h3>
            <p className="text-xs text-slate-500 mt-1">
              Esta acción eliminará el juguete del catálogo y no se podrá deshacer.
            </p>
            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setDeletingToyId(null)}
                className="px-4 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deletingToyId)}
                className="px-5 py-2 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
