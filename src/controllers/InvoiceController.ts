import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { Invoice, CartItem, PaymentMethod, UserProfile, InvoiceStatus } from '../types';
import { InvoiceModel } from '../models/InvoiceModel';
import { ToyController } from './ToyController';

const COLLECTION_NAME = 'invoices';
const LOCAL_STORAGE_KEY = 'toystore_invoices_backup';

export class InvoiceController {
  /**
   * Generates and registers a new Invoice
   */
  static async createInvoice(params: {
    cart: CartItem[];
    customerName: string;
    customerEmail: string;
    customerDocument: string;
    customerPhone?: string;
    customerAddress?: string;
    paymentMethod: PaymentMethod;
    notes?: string;
    currentUser: UserProfile;
  }): Promise<Invoice> {
    const { cart, customerName, customerEmail, customerDocument, customerPhone, customerAddress, paymentMethod, notes, currentUser } = params;

    // Validate input
    const validation = InvoiceModel.validate({
      customerName,
      customerEmail,
      customerDocument,
      items: cart,
    });

    if (!validation.isValid) {
      throw new Error(Object.values(validation.errors)[0]);
    }

    // Compute all detailed item breakdowns and totals
    const calculation = InvoiceModel.generateInvoiceItems(cart);

    // Generate consecutive invoice number
    const existingInvoices = await this.getCachedInvoices();
    const invoiceNumber = InvoiceModel.formatInvoiceNumber(existingInvoices.length + 101);

    const newId = 'inv_' + Math.random().toString(36).substring(2, 9);
    const invoice: Invoice = {
      id: newId,
      invoiceNumber,
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      customerDocument: customerDocument.trim(),
      customerPhone: customerPhone?.trim(),
      customerAddress: customerAddress?.trim(),
      items: calculation.items,
      subtotalBase: calculation.subtotalBase,
      totalTaxes: calculation.totalTaxes,
      totalDiscounts: calculation.totalDiscounts,
      grandTotal: calculation.grandTotal,
      paymentMethod,
      status: 'pagada',
      notes,
      createdByUserId: currentUser.uid || currentUser.id,
      createdByUserEmail: currentUser.email,
      createdByRole: currentUser.role,
      createdAt: new Date().toISOString(),
    };

    // Store in Firestore
    try {
      await setDoc(doc(db, COLLECTION_NAME, newId), invoice);
    } catch (err) {
      console.warn('Firestore invoice save fallback:', err);
    }

    // Decrement stock for purchased toys
    await ToyController.decrementStock(
      cart.map((c) => ({ toyId: c.toy.id, quantity: c.quantity }))
    );

    // Save to local cache
    const updated = [invoice, ...existingInvoices];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

    return invoice;
  }

  /**
   * Retrieves invoices with role-based filtering:
   * - Cliente only sees invoices associated with their email or user ID
   * - Empleado & Admin see all invoices in the store
   */
  static async getInvoices(currentUser: UserProfile): Promise<Invoice[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const invoices: Invoice[] = [];
        querySnapshot.forEach((docSnap) => {
          invoices.push({ id: docSnap.id, ...docSnap.data() } as Invoice);
        });

        invoices.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(invoices));

        return this.filterInvoicesByRole(invoices, currentUser);
      }

      // Local fallback
      const cached = await this.getCachedInvoices();
      return this.filterInvoicesByRole(cached, currentUser);
    } catch (error) {
      console.warn('Firestore invoices fetch warning, using fallback cache:', error);
      const cached = await this.getCachedInvoices();
      return this.filterInvoicesByRole(cached, currentUser);
    }
  }

  /**
   * Updates an invoice status (e.g. pagada -> anulada)
   */
  static async updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<void> {
    try {
      await updateDoc(doc(db, COLLECTION_NAME, id), { status });
    } catch (err) {
      console.warn('Firestore updateInvoiceStatus fallback:', err);
    }

    const existing = await this.getCachedInvoices();
    const updated = existing.map((inv) => (inv.id === id ? { ...inv, status } : inv));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  private static filterInvoicesByRole(invoices: Invoice[], currentUser: UserProfile): Invoice[] {
    if (currentUser.role === 'admin' || currentUser.role === 'empleado') {
      return invoices;
    }
    // For Cliente: filter by user email or createdByUserId
    const userEmail = currentUser.email.toLowerCase();
    const userId = currentUser.uid || currentUser.id;
    return invoices.filter(
      (inv) =>
        inv.createdByUserId === userId ||
        inv.customerEmail?.toLowerCase() === userEmail ||
        inv.createdByUserEmail?.toLowerCase() === userEmail
    );
  }

  private static async getCachedInvoices(): Promise<Invoice[]> {
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
