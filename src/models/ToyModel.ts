import { Toy, TaxType, DiscountType, PriceBreakdown } from '../types';

export const TAX_PRESETS: { label: string; type: TaxType; rate: number }[] = [
  { label: 'IVA General Colombia (19%)', type: 'IVA_GENERAL', rate: 19 },
  { label: 'IVA Reducido (5%)', type: 'IVA_REDUCIDO', rate: 5 },
  { label: 'Exento de Impuesto (0%)', type: 'EXENTO', rate: 0 },
  { label: 'Impuesto al Consumo (8%)', type: 'OTRO', rate: 8 },
];

export class ToyModel {
  /**
   * Calculates the full price breakdown according to the requested formula:
   * Precio Final = Precio Base + (Precio Base * Impuesto%) - Descuentos
   */
  static calculatePriceBreakdown(
    basePrice: number,
    taxRate: number,
    discountType: DiscountType = 'percentage',
    discountValue: number = 0
  ): PriceBreakdown {
    const validBase = Math.max(0, Number(basePrice) || 0);
    const validTaxRate = Math.max(0, Number(taxRate) || 0);
    const validDiscountVal = Math.max(0, Number(discountValue) || 0);

    // Tax amount = basePrice * (taxRate / 100)
    const taxAmount = Number((validBase * (validTaxRate / 100)).toFixed(2));

    // Discount amount: either % of base price or fixed value
    let discountAmount = 0;
    if (discountType === 'percentage') {
      discountAmount = Number((validBase * (validDiscountVal / 100)).toFixed(2));
    } else {
      discountAmount = Number(validDiscountVal.toFixed(2));
    }

    // Final price = Base + Tax - Discount (min 0)
    const finalPrice = Math.max(0, Number((validBase + taxAmount - discountAmount).toFixed(2)));

    return {
      basePrice: validBase,
      taxRate: validTaxRate,
      taxAmount,
      discountType,
      discountValue: validDiscountVal,
      discountAmount,
      finalPrice,
    };
  }

  /**
   * Validates toy creation / editing inputs
   */
  static validate(toy: Partial<Toy>): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!toy.name || toy.name.trim().length < 2) {
      errors.name = 'El nombre del juguete debe tener al menos 2 caracteres.';
    }

    if (!toy.categoryId) {
      errors.categoryId = 'Debes seleccionar una categoría válida.';
    }

    if (toy.basePrice === undefined || toy.basePrice < 0) {
      errors.basePrice = 'El precio base debe ser mayor o igual a 0.';
    }

    if (toy.taxRate === undefined || toy.taxRate < 0 || toy.taxRate > 100) {
      errors.taxRate = 'El impuesto debe estar entre 0% y 100%.';
    }

    if (toy.discountValue === undefined || toy.discountValue < 0) {
      errors.discountValue = 'El descuento no puede ser negativo.';
    }

    if (toy.discountType === 'percentage' && (toy.discountValue ?? 0) > 100) {
      errors.discountValue = 'El porcentaje de descuento no puede superar el 100%.';
    }

    if (toy.stock === undefined || toy.stock < 0) {
      errors.stock = 'El stock disponible debe ser 0 o superior.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Formats currency display in Colombian Pesos (COP)
   */
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(amount);
  }
}

