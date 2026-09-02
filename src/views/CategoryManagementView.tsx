import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  RotateCcw,
  Palette
} from 'lucide-react';
import { Category, Toy, UserProfile } from '../types';
import { CategoryController } from '../controllers/CategoryController';
import { CategoryIcon } from '../components/CategoryIcon';
import { CategoryIconPicker } from '../components/CategoryIconPicker';

interface CategoryManagementViewProps {
  categories: Category[];
  toys: Toy[];
  currentUser: UserProfile | null;
  onRefreshData: () => Promise<void>;
}

const PRESET_COLORS = [
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // Emerald
  '#06b6d4', // Cyan
  '#64748b', // Slate
];

export const CategoryManagementView: React.FC<CategoryManagementViewProps> = ({
  categories,
  toys,
  currentUser,
  onRefreshData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Boxes');
  const [color, setColor] = useState('#f59e0b');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);

  const handleOpenCreate = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setIcon('Boxes');
    setColor('#f59e0b');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDescription(cat.description || '');
    setIcon(cat.icon || 'Boxes');
    setColor(cat.color || '#f59e0b');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');

    try {
      if (editingId) {
        await CategoryController.updateCategory(editingId, { name, description, icon, color });
      } else {
        await CategoryController.createCategory({ name, description, icon, color });
      }
      await onRefreshData();
      setIsModalOpen(false);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Error al guardar categoría');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await CategoryController.deleteCategory(id);
      await onRefreshData();
      setDeletingCatId(null);
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const renderCategoryIcon = (iconName: string, iconColor: string) => {
    return <CategoryIcon name={iconName} color={iconColor} className="w-6 h-6" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 text-orange-700 text-xs font-black mb-2 border border-orange-200">
            <Layers className="w-3.5 h-3.5" />
            <span>Módulo de Categorías (Admin)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
            Gestión de Categorías de Juguetes
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Organiza los juguetes por colecciones, grupos de edad e intereses temáticos.
          </p>
        </div>

        <button
          id="btn-add-category-modal"
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Categoría</span>
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const toyCount = toys.filter((t) => t.categoryId === cat.id).length;

          return (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              className="bg-white rounded-[2rem] p-6 border border-yellow-200/90 hover:border-orange-300 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs border border-yellow-200/60"
                    style={{ backgroundColor: `${cat.color || '#f59e0b'}20` }}
                  >
                    {renderCategoryIcon(cat.icon, cat.color || '#f59e0b')}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(cat)}
                      className="p-2 rounded-xl text-slate-400 hover:text-orange-600 hover:bg-orange-50 transition-colors"
                      title="Editar categoría"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingCatId(cat.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Eliminar categoría"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-900 font-display">{cat.name}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description || 'Sin descripción disponible.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-yellow-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-semibold">Juguetes vinculados:</span>
                <span className="font-bold px-3 py-1 rounded-full bg-yellow-100 text-orange-950">
                  {toyCount} {toyCount === 1 ? 'juguete' : 'juguetes'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-2xl max-h-[92vh] flex flex-col rounded-[2rem] shadow-2xl border border-yellow-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-yellow-200 flex items-center justify-between bg-yellow-50/70 shrink-0">
              <h3 className="text-base font-black text-slate-900 font-display">
                {editingId ? 'Editar Categoría' : 'Crear Nueva Categoría'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto">
              {errorMessage && (
                <div className="p-3.5 rounded-2xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nombre de la Categoría *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Robótica y Drones"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium focus:outline-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descripción</label>
                <textarea
                  rows={2}
                  placeholder="Breve reseña sobre los juguetes de esta categoría..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-sm font-medium focus:outline-orange-500"
                />
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Color Distintivo</label>
                <div className="flex items-center gap-2">
                  {PRESET_COLORS.map((col) => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setColor(col)}
                      className={`w-7 h-7 rounded-full transition-transform ${color === col ? 'scale-125 ring-2 ring-offset-2 ring-orange-500' : 'hover:scale-110'}`}
                      style={{ backgroundColor: col }}
                      title={`Color ${col}`}
                    />
                  ))}
                </div>
              </div>

              {/* Icon Selection with CategoryIconPicker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Ícono Representativo (+400 íconos para elegir)
                </label>
                <CategoryIconPicker
                  selectedIcon={icon}
                  selectedColor={color}
                  onSelectIcon={setIcon}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-yellow-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black shadow-[0_4px_0_0_rgba(16,185,129,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingId ? 'Actualizar' : 'Guardar'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCatId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white max-w-sm w-full rounded-[2rem] p-6 shadow-2xl border border-yellow-200 text-center">
            <h3 className="text-base font-black text-slate-900 font-display">¿Eliminar categoría?</h3>
            <p className="text-xs text-slate-500 mt-1">Los juguetes asignados quedarán sin categoría.</p>
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => setDeletingCatId(null)}
                className="px-4 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deletingCatId)}
                className="px-5 py-2 rounded-2xl bg-rose-600 text-white text-xs font-bold shadow-sm"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
