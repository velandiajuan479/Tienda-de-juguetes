import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { Toy, Category, TaxType, DiscountType } from '../types';
import { ToyModel } from '../models/ToyModel';

const COLLECTION_NAME = 'toys';
const LOCAL_STORAGE_KEY = 'toystore_toys_backup';

export class ToyController {
  /**
   * Retrieves all toys from Firestore or local fallback
   */
  static async getToys(categories: Category[] = []): Promise<Toy[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const toys: Toy[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          let basePrice = Number(data.basePrice) || 0;
          let discountValue = Number(data.discountValue) || 0;
          const discountType = data.discountType || 'percentage';

          // Migrate any legacy small numbers to realistic Colombian Peso values
          if (basePrice > 0 && basePrice < 1000) {
            basePrice = Math.round(basePrice * 3500);
            if (discountType === 'fixed' && discountValue < 500) {
              discountValue = Math.round(discountValue * 3500);
            }
          }

          const breakdown = ToyModel.calculatePriceBreakdown(
            basePrice,
            data.taxRate ?? 19,
            discountType,
            discountValue
          );
          toys.push({
            id: docSnap.id,
            ...data,
            basePrice,
            discountValue,
            finalPrice: breakdown.finalPrice,
          } as Toy);
        });
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toys));
        return toys;
      }

      // If empty, seed initial toys
      return await this.seedInitialToys(categories);
    } catch (error) {
      console.warn('Firestore toys fetch warning, using fallback cache:', error);
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // parse error
        }
      }
      return await this.seedInitialToys(categories);
    }
  }

  /**
   * Creates a new toy with automatic calculation of finalPrice
   */
  static async createToy(toyData: Omit<Toy, 'id' | 'finalPrice' | 'createdAt'>): Promise<Toy> {
    const validation = ToyModel.validate(toyData);
    if (!validation.isValid) {
      throw new Error(Object.values(validation.errors)[0]);
    }

    const breakdown = ToyModel.calculatePriceBreakdown(
      toyData.basePrice,
      toyData.taxRate,
      toyData.discountType,
      toyData.discountValue
    );

    const newId = 'toy_' + Math.random().toString(36).substring(2, 9);
    const sku = toyData.sku || 'TOY-' + Math.floor(1000 + Math.random() * 9000);

    const fullToy: Toy = {
      ...toyData,
      id: newId,
      sku,
      finalPrice: breakdown.finalPrice,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, COLLECTION_NAME, newId), {
        ...toyData,
        sku,
        finalPrice: breakdown.finalPrice,
        createdAt: fullToy.createdAt,
      });
    } catch (err) {
      console.warn('Firestore createToy fallback:', err);
    }

    // Update local cache
    const existing = await this.getCachedToys();
    const updated = [fullToy, ...existing];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    return fullToy;
  }

  /**
   * Updates an existing toy
   */
  static async updateToy(id: string, toyData: Partial<Toy>): Promise<void> {
    const existing = await this.getCachedToys();
    const currentToy = existing.find((t) => t.id === id);

    const basePrice = toyData.basePrice ?? currentToy?.basePrice ?? 0;
    const taxRate = toyData.taxRate ?? currentToy?.taxRate ?? 19;
    const discountType = toyData.discountType ?? currentToy?.discountType ?? 'percentage';
    const discountValue = toyData.discountValue ?? currentToy?.discountValue ?? 0;

    const breakdown = ToyModel.calculatePriceBreakdown(basePrice, taxRate, discountType, discountValue);

    const payload = {
      ...toyData,
      finalPrice: breakdown.finalPrice,
      updatedAt: new Date().toISOString(),
    };

    try {
      await updateDoc(doc(db, COLLECTION_NAME, id), payload);
    } catch (err) {
      console.warn('Firestore updateToy fallback:', err);
    }

    // Update local cache
    const updated = existing.map((t) => (t.id === id ? { ...t, ...payload } : t));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  /**
   * Deletes a toy
   */
  static async deleteToy(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (err) {
      console.warn('Firestore deleteToy fallback:', err);
    }

    const existing = await this.getCachedToys();
    const updated = existing.filter((t) => t.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  /**
   * Decrements stock for purchased toys in an invoice
   */
  static async decrementStock(items: { toyId: string; quantity: number }[]): Promise<void> {
    const existing = await this.getCachedToys();

    for (const item of items) {
      const toy = existing.find((t) => t.id === item.toyId);
      if (toy) {
        const newStock = Math.max(0, toy.stock - item.quantity);
        try {
          await updateDoc(doc(db, COLLECTION_NAME, toy.id), { stock: newStock });
        } catch (err) {
          console.warn('Firestore decrementStock error:', err);
        }
        toy.stock = newStock;
      }
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existing));
  }

  /**
   * Seeds realistic toy products for immediate visual appeal and testing
   */
  static async seedInitialToys(categories: Category[]): Promise<Toy[]> {
    const getCat = (namePattern: string) =>
      categories.find((c) => c.name.toLowerCase().includes(namePattern.toLowerCase())) || categories[0] || {
        id: 'cat_gen',
        name: 'General',
      };

    const catBloques = getCat('construcción');
    const catPeluches = getCat('peluche');
    const catMesa = getCat('mesa');
    const catAutos = getCat('vehículo');
    const catHero = getCat('figuras');
    const catStem = getCat('educativo');

    const sampleToys: Omit<Toy, 'id' | 'finalPrice'>[] = [
      {
        sku: 'LEG-8841',
        name: 'Castillo Legendario Medieval LEGO',
        description: 'Set maestro de 1,450 piezas con puente levadizo, caballeros, rey y dragón articulado.',
        categoryId: catBloques.id,
        categoryName: catBloques.name,
        basePrice: 280000,
        taxType: 'IVA_GENERAL',
        taxRate: 19,
        discountType: 'percentage',
        discountValue: 15, // 15% de descuento
        stock: 14,
        minAge: 8,
        imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&auto=format&fit=crop&q=80',
        isFeatured: true,
        createdAt: new Date().toISOString(),
      },
      {
        sku: 'CAR-5021',
        name: 'Supercar Todo Terreno RC 4x4',
        description: 'Auto a control remoto de alta velocidad 35km/h con suspensión de aluminio y batería recargable.',
        categoryId: catAutos.id,
        categoryName: catAutos.name,
        basePrice: 160000,
        taxType: 'IVA_GENERAL',
        taxRate: 19,
        discountType: 'fixed',
        discountValue: 20000, // $20.000 COP de descuento
        stock: 22,
        minAge: 6,
        imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80',
        isFeatured: true,
        createdAt: new Date().toISOString(),
      },
      {
        sku: 'TED-1092',
        name: 'Oso de Peluche Gigante Huggy 80cm',
        description: 'Peluche ultra suave hipoalergénico con moño satinado, ideal para abrazar y decorar habitaciones.',
        categoryId: catPeluches.id,
        categoryName: catPeluches.name,
        basePrice: 95000,
        taxType: 'IVA_GENERAL',
        taxRate: 19,
        discountType: 'percentage',
        discountValue: 10, // 10% de descuento
        stock: 35,
        minAge: 1,
        imageUrl: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=600&auto=format&fit=crop&q=80',
        isFeatured: false,
        createdAt: new Date().toISOString(),
      },
      {
        sku: 'BRD-3309',
        name: 'Aventura Galáctica: Juego de Estrategia',
        description: 'Juego de mesa interactivo para 2 a 6 jugadores con miniaturas 3D, cartas de misión y tablero modular.',
        categoryId: catMesa.id,
        categoryName: catMesa.name,
        basePrice: 120000,
        taxType: 'IVA_GENERAL',
        taxRate: 19,
        discountType: 'percentage',
        discountValue: 20, // 20% de descuento
        stock: 18,
        minAge: 10,
        imageUrl: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80',
        isFeatured: true,
        createdAt: new Date().toISOString(),
      },
      {
        sku: 'STM-7712',
        name: 'Laboratorio de Robótica Solar 12 en 1',
        description: 'Kit científico STEM que permite construir 12 robots diferentes propulsados por panel solar real.',
        categoryId: catStem.id,
        categoryName: catStem.name,
        basePrice: 145000,
        taxType: 'IVA_REDUCIDO',
        taxRate: 5,
        discountType: 'fixed',
        discountValue: 15000, // $15.000 COP de descuento
        stock: 25,
        minAge: 8,
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop&q=80',
        isFeatured: true,
        createdAt: new Date().toISOString(),
      },
      {
        sku: 'ACT-9904',
        name: 'T-Rex Mecatrónico Rugido Feroz',
        description: 'Figura de dinosaurio con sonidos reales, mandíbula animada, ojos LED y sensor de movimiento táctil.',
        categoryId: catHero.id,
        categoryName: catHero.name,
        basePrice: 89000,
        taxType: 'IVA_GENERAL',
        taxRate: 19,
        discountType: 'percentage',
        discountValue: 10,
        stock: 30,
        minAge: 4,
        imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80',
        isFeatured: false,
        createdAt: new Date().toISOString(),
      },
    ];

    const toys: Toy[] = [];

    for (const item of sampleToys) {
      const breakdown = ToyModel.calculatePriceBreakdown(
        item.basePrice,
        item.taxRate,
        item.discountType,
        item.discountValue
      );
      const newId = 'toy_' + Math.random().toString(36).substring(2, 9);
      const toy: Toy = {
        ...item,
        id: newId,
        finalPrice: breakdown.finalPrice,
      };
      toys.push(toy);

      try {
        await setDoc(doc(db, COLLECTION_NAME, newId), {
          ...item,
          finalPrice: breakdown.finalPrice,
        });
      } catch (err) {
        console.warn('Failed to seed toy to Firestore:', err);
      }
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toys));
    return toys;
  }

  private static async getCachedToys(): Promise<Toy[]> {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return [];
      }
    }
    return [];
  }
}
