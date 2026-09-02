import { CartItem, Invoice, InvoiceItem, PaymentMethod, UserRole, UserProfile } from '../types';
import { ToyModel } from './ToyModel';

export class InvoiceModel {
  /**
   * Generates InvoiceItems from a CartItem list and computes all base prices, taxes, discounts, and totals
   */
  static generateInvoiceItems(cart: CartItem[]): {
    items: InvoiceItem[];
    subtotalBase: number;
    totalTaxes: number;
    totalDiscounts: number;
    grandTotal: number;
  } {
    let subtotalBase = 0;
    let totalTaxes = 0;
    let totalDiscounts = 0;
    let grandTotal = 0;

    const items: InvoiceItem[] = cart.map(({ toy, quantity }) => {
      const breakdown = ToyModel.calculatePriceBreakdown(
        toy.basePrice,
        toy.taxRate,
        toy.discountType,
        toy.discountValue
      );

      const itemSubtotalBase = Number((breakdown.basePrice * quantity).toFixed(2));
      const itemTotalTax = Number((breakdown.taxAmount * quantity).toFixed(2));
      const itemTotalDiscount = Number((breakdown.discountAmount * quantity).toFixed(2));
      const itemTotalFinal = Number((breakdown.finalPrice * quantity).toFixed(2));

      subtotalBase += itemSubtotalBase;
      totalTaxes += itemTotalTax;
      totalDiscounts += itemTotalDiscount;
      grandTotal += itemTotalFinal;

      return {
        toyId: toy.id,
        toyName: toy.name,
        sku: toy.sku || 'SKU-000',
        categoryName: toy.categoryName || 'General',
        quantity,
        unitBasePrice: breakdown.basePrice,
        taxType: toy.taxType,
        taxRate: breakdown.taxRate,
        unitTaxAmount: breakdown.taxAmount,
        discountType: toy.discountType,
        discountValue: breakdown.discountValue,
        unitDiscountAmount: breakdown.discountAmount,
        unitFinalPrice: breakdown.finalPrice,
        subtotalBase: itemSubtotalBase,
        totalTax: itemTotalTax,
        totalDiscount: itemTotalDiscount,
        totalFinal: itemTotalFinal,
      };
    });

    return {
      items,
      subtotalBase: Number(subtotalBase.toFixed(2)),
      totalTaxes: Number(totalTaxes.toFixed(2)),
      totalDiscounts: Number(totalDiscounts.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2)),
    };
  }

  /**
   * Validates customer data when creating an invoice
   */
  static validate(data: {
    customerName: string;
    customerEmail: string;
    customerDocument: string;
    items: any[];
  }): { isValid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    if (!data.customerName || data.customerName.trim().length < 2) {
      errors.customerName = 'Ingresa el nombre del cliente o empresa.';
    }

    if (!data.customerEmail || !data.customerEmail.includes('@')) {
      errors.customerEmail = 'Ingresa un correo electrónico válido.';
    }

    if (!data.customerDocument || data.customerDocument.trim().length < 4) {
      errors.customerDocument = 'Ingresa el documento de identidad / NIT / RUT / Cédula.';
    }

    if (!data.items || data.items.length === 0) {
      errors.items = 'La factura debe contener al menos un juguete.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Generates a sequential-looking formatted invoice number e.g. FACT-2026-0042
   */
  static formatInvoiceNumber(seqNumber: number): string {
    const year = new Date().getFullYear();
    const padded = String(seqNumber).padStart(4, '0');
    return `FACT-${year}-${padded}`;
  }
}
