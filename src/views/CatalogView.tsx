import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShoppingBag, 
  Sparkles, 
  Tag, 
  Percent, 
  ArrowUpDown, 
  Check, 
  Layers, 
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Edit,
  Plus
} from 'lucide-react';
import { Toy, Category, UserProfile, UserRole } from '../types';
import { ToyModel } from '../models/ToyModel';
import { UserModel } from '../models/UserModel';

interface CatalogViewProps {
  toys: Toy[];
  categories: Category[];
  currentUser: UserProfile | null;
  onAddToCart: (toy: Toy, quantity?: number) => void;
  onEditToy?: (toy: Toy) => void;
  onNewToy?: () => void;
  onSelectCategoryFilter?: (categoryId: string) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  toys,
  categories,
  currentUser,
  onAddToCart,
  onEditToy,
  onNewToy,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount' | 'name'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [selectedToyDetail, setSelectedToyDetail] = useState<Toy | null>(null);
  const [addedAnimationToyId, setAddedAnimationToyId] = useState<string | null>(null);

  const role: UserRole = currentUser?.role || 'cliente';
  const canManageToys = UserModel.can(role, 'manage_toys');

  // Filter and sort toys
  const filteredToys = useMemo(() => {
    return toys
      .filter((toy) => {
        const matchesSearch =
          toy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          toy.categoryName?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'all' || toy.categoryId === selectedCategory;
        const matchesPrice = toy.finalPrice <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.finalPrice - b.finalPrice;
        if (sortBy === 'price-desc') return b.finalPrice - a.finalPrice;
        if (sortBy === 'discount') {
          const discA = a.discountType === 'percentage' ? (a.basePrice * a.discountValue) / 100 : a.discountValue;
          const discB = b.discountType === 'percentage' ? (b.basePrice * b.discountValue) / 100 : b.discountValue;
          return discB - discA;
        }
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [toys, searchQuery, selectedCategory, maxPrice, sortBy]);


  const handleAdd = (toy: Toy) => {
    onAddToCart(toy, 1);
    setAddedAnimationToyId(toy.id);
    setTimeout(() => setAddedAnimationToyId(null), 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* Top Welcome & MVC Formula Explanation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-700 text-xs font-black mb-2 border border-orange-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Catálogo Oficial de Juguetes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
            Descubre Juguetes Mágicos con Precios Transparentes
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl font-medium">
            Todos los precios finales se calculan en tiempo real integrando precio base, impuestos fiscales y descuentos automáticos.
          </p>
        </div>

        {canManageToys && (
          <div className="flex items-center gap-2">
            <button
              id="catalog-new-toy-btn"
              onClick={onNewToy}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-black shadow-md shadow-orange-500/20 transition-all hover:scale-102"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Nuevo Juguete</span>
            </button>
          </div>
        )}
      </div>

      {/* Filter Toolbar (Vibrant Styling) */}
      <div className="bg-white rounded-[2rem] p-5 border border-yellow-200/90 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
            <input
              id="catalog-search-input"
              type="text"
              placeholder="Buscar juguetes por nombre, código SKU o categoría..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-orange-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-orange-600 hover:text-orange-800"
              >
                Limpiar
              </button>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-black text-slate-600 whitespace-nowrap">
              <ArrowUpDown className="w-3.5 h-3.5 text-orange-500" />
              <span>Ordenar:</span>
            </div>
            <select
              id="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2.5 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs sm:text-sm font-bold text-slate-800 focus:outline-orange-500"
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Menor Precio Final</option>
              <option value="price-desc">Mayor Precio Final</option>
              <option value="discount">Mayor Descuento</option>
              <option value="name">Alfabético (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            id="cat-pill-all"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-yellow-50 text-slate-700 hover:bg-yellow-100 border border-yellow-200'
            }`}
          >
            Todas ({toys.length})
          </button>
          {categories.map((cat) => {
            const count = toys.filter((t) => t.categoryId === cat.id).length;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`cat-pill-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-yellow-50 border border-yellow-200'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/25 text-white' : 'bg-yellow-100 text-slate-700'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toys Grid */}
      {filteredToys.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-[2rem] border-2 border-dashed border-yellow-300 p-8">
          <div className="w-16 h-16 rounded-3xl bg-yellow-100 flex items-center justify-center mx-auto text-amber-600 mb-3">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-slate-800 font-display">No se encontraron juguetes</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
            Intenta cambiar los términos de búsqueda o selecciona otra categoría.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black rounded-2xl shadow-md transition-all"
          >
            Ver todos los juguetes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredToys.map((toy) => {
            const breakdown = ToyModel.calculatePriceBreakdown(
              toy.basePrice,
              toy.taxRate,
              toy.discountType,
              toy.discountValue
            );
            const hasDiscount = breakdown.discountAmount > 0;
            const isAdded = addedAnimationToyId === toy.id;

            return (
              <div
                key={toy.id}
                id={`toy-card-${toy.id}`}
                className="group bg-white rounded-[2rem] p-5 border border-yellow-200/90 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Vibrant Rounded Header */}
                  <div className="relative h-52 bg-amber-50 rounded-2xl overflow-hidden cursor-pointer mb-4" onClick={() => setSelectedToyDetail(toy)}>
                    <img
                      src={toy.imageUrl || 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80'}
                      alt={toy.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80';
                      }}
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider">
                        {toy.categoryName || 'General'}
                      </span>
                      {toy.minAge && (
                        <span className="px-2.5 py-1 rounded-full bg-yellow-300 text-slate-900 text-[10px] font-black">
                          +{toy.minAge} años
                        </span>
                      )}
                    </div>

                    {/* Discount Badge */}
                    {hasDiscount && (
                       <div className="absolute top-3 right-3 bg-orange-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse">
                         <Percent className="w-3 h-3" />
                         <span>
                           {toy.discountType === 'percentage'
                             ? `-${toy.discountValue}%`
                             : `-${ToyModel.formatCurrency(toy.discountValue)}`}
                         </span>
                       </div>
                     )}

                    {/* SKU & Stock preview */}
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold text-slate-700 shadow-xs">
                      {toy.sku}
                    </div>

                    <div className="absolute bottom-3 right-3">
                      {toy.stock > 0 ? (
                        <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500 text-white text-[10px] font-black shadow-xs">
                          Stock: {toy.stock}
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-lg bg-rose-500 text-white text-[10px] font-black shadow-xs">
                          Agotado
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Title & Desc */}
                  <div>
                    <h3 
                      onClick={() => setSelectedToyDetail(toy)}
                      className="text-lg font-black text-slate-900 group-hover:text-orange-600 transition-colors line-clamp-1 cursor-pointer font-display"
                    >
                      {toy.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {toy.description}
                    </p>
                  </div>
                </div>

                {/* Price Breakdown Calculation Section (MVC Requirement) */}
                <div className="mt-4 pt-3 border-t border-yellow-100 bg-[#FFFBEB] -mx-5 -mb-5 px-5 py-4 rounded-b-[2rem]">
                  <div className="grid grid-cols-3 text-[10px] text-slate-600 mb-2">
                    <div>
                      <span className="block text-slate-400 font-semibold">Precio Base</span>
                      <span className="font-bold text-slate-800">{ToyModel.formatCurrency(breakdown.basePrice)}</span>
                    </div>
                    <div className="text-center">
                      <span className="block text-slate-400 font-semibold">Impuesto ({breakdown.taxRate}%)</span>
                      <span className="font-bold text-indigo-700">+{ToyModel.formatCurrency(breakdown.taxAmount)}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-slate-400 font-semibold">Descuento</span>
                      <span className={`font-bold ${hasDiscount ? 'text-orange-600' : 'text-slate-400'}`}>
                        {hasDiscount ? `-${ToyModel.formatCurrency(breakdown.discountAmount)}` : '$0 COP'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-yellow-200/70">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                        Precio Final (COP)
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl sm:text-2xl font-black text-emerald-600 font-display">
                          {ToyModel.formatCurrency(breakdown.finalPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons with 3D tactile emerald button */}
                    <div className="flex items-center gap-1.5">
                      {canManageToys && onEditToy && (
                        <button
                          id={`edit-toy-btn-${toy.id}`}
                          onClick={() => onEditToy(toy)}
                          className="p-2.5 rounded-xl border border-yellow-300 bg-white text-slate-700 hover:text-orange-600 hover:bg-orange-50 transition-colors shadow-xs"
                          title="Editar Juguete (Rol Empleado/Admin)"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        id={`add-to-cart-${toy.id}`}
                        disabled={toy.stock <= 0}
                        onClick={() => handleAdd(toy)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
                          toy.stock <= 0
                            ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            : isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>¡Añadido!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Comprar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Toy Detail Modal */}
      {selectedToyDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl border border-yellow-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-amber-50 relative">
              <img
                src={selectedToyDetail.imageUrl}
                alt={selectedToyDetail.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                {selectedToyDetail.categoryName}
              </span>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                  <span>SKU: {selectedToyDetail.sku}</span>
                  <span>Edad: +{selectedToyDetail.minAge} años</span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 font-display">
                  {selectedToyDetail.name}
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedToyDetail.description}
                </p>

                {/* Calculation Breakdown Box */}
                <div className="mt-5 p-4 rounded-2xl bg-[#FFFBEB] border border-yellow-200">
                  <span className="text-[11px] font-black uppercase tracking-wider text-orange-900 block mb-2">
                    Desglose Fiscal & Cálculo en Vivo
                  </span>
                  {(() => {
                    const b = ToyModel.calculatePriceBreakdown(
                      selectedToyDetail.basePrice,
                      selectedToyDetail.taxRate,
                      selectedToyDetail.discountType,
                      selectedToyDetail.discountValue
                    );
                    return (
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between text-slate-700">
                          <span>Precio Base:</span>
                          <span className="font-bold">{ToyModel.formatCurrency(b.basePrice)}</span>
                        </div>
                        <div className="flex justify-between text-indigo-700 font-semibold">
                          <span>Impuesto ({selectedToyDetail.taxType} - {b.taxRate}%):</span>
                          <span>+{ToyModel.formatCurrency(b.taxAmount)}</span>
                        </div>
                        <div className="flex justify-between text-orange-700 font-semibold">
                          <span>Descuento ({selectedToyDetail.discountType === 'percentage' ? `${selectedToyDetail.discountValue}%` : ToyModel.formatCurrency(selectedToyDetail.discountValue)}):</span>
                          <span>-{ToyModel.formatCurrency(b.discountAmount)}</span>
                        </div>
                        <div className="pt-2 border-t border-yellow-300 flex justify-between items-baseline">
                          <span className="font-black text-slate-900">Total Precio Final:</span>
                          <span className="text-2xl font-black text-emerald-600 font-display">
                            {ToyModel.formatCurrency(b.finalPrice)}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedToyDetail(null)}
                  className="px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    handleAdd(selectedToyDetail);
                    setSelectedToyDetail(null);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
