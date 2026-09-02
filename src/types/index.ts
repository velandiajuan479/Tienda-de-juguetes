// Domain Types and Interfaces

export type UserRole = 'cliente' | 'empleado' | 'admin';

export type TaxType = 'IVA_GENERAL' | 'IVA_REDUCIDO' | 'IVA_SUPER_REDUCIDO' | 'EXENTO' | 'OTRO';

export type DiscountType = 'percentage' | 'fixed';

export type PaymentMethod = 'tarjeta' | 'efectivo' | 'transferencia' | 'digital';

export type InvoiceStatus = 'pagada' | 'pendiente' | 'anulada';

export interface UserProfile {
  id: string;
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  itemCount?: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Toy {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  basePrice: number;
  taxType: TaxType;
  taxRate: number; // percentage (e.g. 19 for 19%)
  discountType: DiscountType;
  discountValue: number; // percentage or fixed amount
  finalPrice: number; // Calculated: basePrice + (basePrice * taxRate / 100) - discountAmount
  stock: number;
  minAge: number;
  imageUrl: string;
  isFeatured?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface CartItem {
  toy: Toy;
  quantity: number;
}

export interface InvoiceItem {
  toyId: string;
  toyName: string;
  sku: string;
  categoryName: string;
  quantity: number;
  unitBasePrice: number;
  taxType: TaxType;
  taxRate: number;
  unitTaxAmount: number;
  discountType: DiscountType;
  discountValue: number;
  unitDiscountAmount: number;
  unitFinalPrice: number;
  subtotalBase: number;
  totalTax: number;
  totalDiscount: number;
  totalFinal: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. "FACT-2026-0001"
  customerName: string;
  customerEmail: string;
  customerDocument: string; // DNI, RUT or Tax ID
  customerPhone?: string;
  customerAddress?: string;
  items: InvoiceItem[];
  subtotalBase: number;
  totalTaxes: number;
  totalDiscounts: number;
  grandTotal: number;
  paymentMethod: PaymentMethod;
  status: InvoiceStatus;
  notes?: string;
  createdByUserId: string;
  createdByUserEmail: string;
  createdByRole: UserRole;
  createdAt: string;
}

export interface PriceBreakdown {
  basePrice: number;
  taxRate: number;
  taxAmount: number;
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  finalPrice: number;
}
