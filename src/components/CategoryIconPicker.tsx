import React, { useState, useMemo } from 'react';
import { Search, X, Check, Sparkles } from 'lucide-react';
import { CATEGORY_ICONS, CATEGORY_ICON_GROUPS, CategoryIconOption } from '../data/categoryIcons';
import { CategoryIcon } from './CategoryIcon';

interface CategoryIconPickerProps {
  selectedIcon: string;
  selectedColor: string;
  onSelectIcon: (iconName: string) => void;
}

export const CategoryIconPicker: React.FC<CategoryIconPickerProps> = ({
  selectedIcon,
  selectedColor,
  onSelectIcon,
}) => {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState<string>('Todos');

  // Filter icons based on group and search query
  const filteredIcons = useMemo(() => {
    const q = search.trim().toLowerCase();

    return CATEGORY_ICONS.filter((item) => {
      // Group filter
      if (activeGroup !== 'Todos' && item.category !== activeGroup) {
        return false;
      }

      // Search filter
      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.toLowerCase().includes(q)
      );
    });
  }, [search, activeGroup]);

  // Find info about the currently selected icon
  const currentIconInfo = useMemo(() => {
    return (
      CATEGORY_ICONS.find((i) => i.name === selectedIcon) || {
        name: selectedIcon,
        label: selectedIcon,
        category: 'General',
        tags: '',
      }
    );
  }, [selectedIcon]);

  return (
    <div className="space-y-3">
      {/* Header and selected preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs border border-white/60 transition-colors"
            style={{ backgroundColor: `${selectedColor}22` }}
          >
            <CategoryIcon name={selectedIcon} color={selectedColor} className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-amber-800">
              <Sparkles className="w-3 h-3 text-amber-600" />
              <span>Ícono Seleccionado</span>
            </div>
            <div className="text-sm font-black text-slate-900 leading-snug">
              {currentIconInfo.label}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Código: <span className="font-bold text-slate-700">{selectedIcon}</span>
            </div>
          </div>
        </div>

        <div className="text-xs font-bold text-amber-900/80 bg-amber-100/70 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          {CATEGORY_ICONS.length} íconos disponibles
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar entre +400 íconos (ej. robot, auto, dado, música, estrella, lego)..."
          className="w-full pl-10 pr-9 py-2 rounded-2xl bg-[#FFFBEB] border border-yellow-300 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-orange-500 focus:bg-white transition-all"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Category Pills (Horizontal scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
        {CATEGORY_ICON_GROUPS.map((group) => {
          const isActive = activeGroup === group;
          const count =
            group === 'Todos'
              ? CATEGORY_ICONS.length
              : CATEGORY_ICONS.filter((i) => i.category === group).length;

          return (
            <button
              key={group}
              type="button"
              onClick={() => setActiveGroup(group)}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap text-[11px] transition-all ${
                isActive
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-yellow-50/80 hover:bg-yellow-100 text-slate-700 border border-yellow-200/80'
              }`}
            >
              {group} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid of Icons */}
      <div className="rounded-2xl border border-yellow-200 bg-[#FFFBEB]/40 p-2.5">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2 px-1">
          <span>Mostrando {filteredIcons.length} íconos</span>
          {filteredIcons.length > 0 && <span>Haz clic para seleccionar</span>}
        </div>

        {filteredIcons.length === 0 ? (
          <div className="py-8 text-center px-4">
            <p className="text-xs font-bold text-slate-600">
              No encontramos íconos que coincidan con "{search}"
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Prueba buscando por tema como "juego", "robot", "barco", "regalo", "flor" o cambia la categoría.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setActiveGroup('Todos');
              }}
              className="mt-3 px-3 py-1.5 text-xs font-black text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-xl border border-orange-200 transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
            {filteredIcons.map((item) => {
              const isSelected = selectedIcon === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onSelectIcon(item.name)}
                  title={`${item.label} (${item.name})`}
                  className={`group relative p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'border-orange-500 bg-orange-100/90 text-orange-700 font-bold ring-2 ring-orange-400 ring-offset-1 shadow-xs scale-105 z-10'
                      : 'border-yellow-200/80 bg-white/90 text-slate-700 hover:bg-yellow-50 hover:border-orange-300 hover:scale-105'
                  }`}
                >
                  <CategoryIcon
                    name={item.name}
                    color={isSelected ? selectedColor : undefined}
                    className="w-5 h-5 transition-transform group-hover:scale-110"
                  />
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[8px]">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
