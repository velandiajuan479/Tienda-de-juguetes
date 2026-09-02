import { Category } from '../types';

export class CategoryModel {
  static validate(category: Partial<Category>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!category.name || category.name.trim().length < 2) {
      errors.name = 'El nombre de la categoría es obligatorio (mínimo 2 caracteres).';
    }

    if (!category.icon || category.icon.trim().length === 0) {
      errors.icon = 'Selecciona un ícono para la categoría.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  static getDefaultCategories(): Omit<Category, 'id'>[] {
    return [
      {
        name: 'Construcción y Bloques',
        description: 'Sets de LEGO, bloques magnéticos y kits de ingeniería creativa.',
        icon: 'Boxes',
        color: '#f59e0b', // Amber
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Peluches y Muñecas',
        description: 'Peluches suaves, muñecas articuladas y accesorios de fantasía.',
        icon: 'Heart',
        color: '#ec4899', // Pink
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Juegos de Mesa y Puzzles',
        description: 'Juegos de estrategia familiar, cartas y rompecabezas de retos.',
        icon: 'Dice5',
        color: '#8b5cf6', // Violet
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Vehículos y Radio Control',
        description: 'Autos de carreras, drones infantiles, trenes y pistas acrobáticas.',
        icon: 'Car',
        color: '#3b82f6', // Blue
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Figuras de Acción y Héroes',
        description: 'Superhéroes, dinosaurios interactivos, robots y coleccionables.',
        icon: 'Zap',
        color: '#ef4444', // Red
        createdAt: new Date().toISOString(),
      },
      {
        name: 'Educativos y STEM',
        description: 'Microscopios infantiles, experimentos científicos y lógica.',
        icon: 'Sparkles',
        color: '#10b981', // Emerald
        createdAt: new Date().toISOString(),
      },
    ];
  }
}
