import jsPDF from 'jspdf';
import { Invoice } from '../types';
import { ToyModel } from '../models/ToyModel';

export function generateInvoicePdf(invoice: Invoice): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // A4 dimensions: 210 x 297 mm
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  let y = margin;

  // 1. Header Banner
  doc.setFillColor(255, 251, 235); // #fffbeb (amber-50)
  doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'F');
  doc.setDrawColor(252, 211, 77); // amber-300
  doc.roundedRect(margin, y, contentWidth, 32, 3, 3, 'S');

  // Brand Badge
  doc.setFillColor(249, 115, 22); // orange-500
  doc.roundedRect(margin + 4, y + 4, 12, 12, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('TK', margin + 10, y + 12, { align: 'center' });

  // Brand Name & Legal Data
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text('ToyStore Kids', margin + 19, y + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105); // slate-600
  doc.text('ToyStore S.A.S. · NIT: 901.884.210-9 · Régimen Común', margin + 19, y + 16);
  doc.text('Av. de la Alegría # 100, Piso 3 · Bogotá D.C., Colombia', margin + 19, y + 21);
  doc.text('contacto@toystore.co · www.toystore.co · PBX: (601) 789 0000', margin + 19, y + 26);

  // Right Header Box (Invoice Number, Date, Status)
  const rightBoxWidth = 62;
  const rightBoxX = margin + contentWidth - rightBoxWidth - 3;
  doc.setFillColor(254, 243, 199); // yellow-100
  doc.roundedRect(rightBoxX, y + 3, rightBoxWidth, 26, 2, 2, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(rightBoxX, y + 3, rightBoxWidth, 26, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(120, 53, 15);
  doc.text('FACTURA ELECTRÓNICA DE VENTA', rightBoxX + rightBoxWidth / 2, y + 8, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(234, 88, 12);
  doc.text(invoice.invoiceNumber, rightBoxX + rightBoxWidth / 2, y + 14.5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(71, 85, 105);
  const formattedDate = new Date(invoice.createdAt).toLocaleString('es-CO');
  doc.text(formattedDate, rightBoxX + rightBoxWidth / 2, y + 19.5, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  if (invoice.status === 'pagada') {
    doc.setTextColor(16, 149, 90);
    doc.text('ESTADO: PAGADA', rightBoxX + rightBoxWidth / 2, y + 24.5, { align: 'center' });
  } else {
    doc.setTextColor(225, 29, 72);
    doc.text(`ESTADO: ${invoice.status.toUpperCase()}`, rightBoxX + rightBoxWidth / 2, y + 24.5, { align: 'center' });
  }

  y += 36;

  // 2. Customer Details & Payment Info Boxes (2 columns)
  const colWidth = (contentWidth - 4) / 2;

  // Left: Customer Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, colWidth, 27, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(194, 65, 12);
  doc.text('DATOS DEL CLIENTE / COMPRADOR', margin + 4, y + 5.5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(invoice.customerName, margin + 4, y + 11);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Cédula / Documento / NIT: ${invoice.customerDocument}`, margin + 4, y + 16);
  doc.text(`Email: ${invoice.customerEmail}`, margin + 4, y + 20.5);
  const extraContact = [invoice.customerPhone, invoice.customerAddress].filter(Boolean).join(' · ');
  if (extraContact) {
    doc.text(extraContact, margin + 4, y + 24.5);
  }

  // Right: Payment Details Box
  const col2X = margin + colWidth + 4;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(col2X, y, colWidth, 27, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(194, 65, 12);
  doc.text('DETALLES DE PAGO Y EMISIÓN', col2X + 4, y + 5.5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text(`Método de Pago: ${invoice.paymentMethod.toUpperCase()}`, col2X + 4, y + 11);
  doc.text('Moneda: Pesos Colombianos (COP)', col2X + 4, y + 16);
  doc.text(`Emitida por: ${invoice.createdByUserEmail} (${invoice.createdByRole})`, col2X + 4, y + 20.5);
  doc.text('Resolución DIAN No. 187640001 · Habilitada', col2X + 4, y + 24.5);

  y += 31;

  // 3. Line Items Table Header
  doc.setFillColor(254, 243, 199); // yellow-100
  doc.rect(margin, y, contentWidth, 7, 'F');
  doc.setDrawColor(252, 211, 77);
  doc.line(margin, y, margin + contentWidth, y);
  doc.line(margin, y + 7, margin + contentWidth, y + 7);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 53, 15);

  const colXDesc = margin + 3;
  const colXQty = margin + 82;
  const colXPrice = margin + 110;
  const colXTax = margin + 136;
  const colXDisc = margin + 158;
  const colXTotal = margin + contentWidth - 3;

  doc.text('DESCRIPCIÓN / PRODUCTO', colXDesc, y + 5);
  doc.text('CANT.', colXQty, y + 5, { align: 'center' });
  doc.text('PRECIO BASE', colXPrice, y + 5, { align: 'right' });
  doc.text('IMPUESTO (IVA)', colXTax, y + 5, { align: 'right' });
  doc.text('DESCUENTO', colXDisc, y + 5, { align: 'right' });
  doc.text('TOTAL ÍTEM', colXTotal, y + 5, { align: 'right' });

  y += 7;

  // 4. Line Items Rows
  invoice.items.forEach((item, index) => {
    if (y > pageHeight - 65) {
      doc.addPage();
      y = margin;
    }

    const isEven = index % 2 === 0;
    if (isEven) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(254, 252, 232); // yellow-50
    }
    doc.rect(margin, y, contentWidth, 8, 'F');
    doc.setDrawColor(241, 245, 249);
    doc.line(margin, y + 8, margin + contentWidth, y + 8);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    const toyTitle = item.toyName.length > 36 ? item.toyName.substring(0, 34) + '...' : item.toyName;
    doc.text(toyTitle, colXDesc, y + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text(`${item.sku} · ${item.categoryName}`, colXDesc, y + 7);

    // Quantity
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(String(item.quantity), colXQty, y + 5.5, { align: 'center' });

    // Unit Base Price
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    doc.text(ToyModel.formatCurrency(item.unitBasePrice), colXPrice, y + 5.5, { align: 'right' });

    // Tax
    doc.setTextColor(67, 56, 202);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.text(`+${item.taxRate}% (${ToyModel.formatCurrency(item.totalTax)})`, colXTax, y + 5.5, { align: 'right' });

    // Discount
    doc.setTextColor(194, 65, 12);
    doc.text(item.totalDiscount > 0 ? `-${ToyModel.formatCurrency(item.totalDiscount)}` : '$0 COP', colXDisc, y + 5.5, { align: 'right' });

    // Total Final Item
    doc.setTextColor(5, 150, 105);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(ToyModel.formatCurrency(item.totalFinal), colXTotal, y + 5.5, { align: 'right' });

    y += 8;
  });

  y += 4;

  // 5. Totals & Conditions Box
  const totalsBoxWidth = 86;
  const totalsBoxX = margin + contentWidth - totalsBoxWidth;
  const notesWidth = contentWidth - totalsBoxWidth - 5;

  // Left Note / Warranty Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, notesWidth, 36, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, notesWidth, 36, 2, 2, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  doc.text('CONDICIONES DE GARANTÍA Y POLÍTICAS:', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('• Todos los juguetes cuentan con 90 días de garantía directa por defectos.', margin + 4, y + 12);
  doc.text('• Para cambios conserve este documento fiscal en formato digital.', margin + 4, y + 17);
  doc.text('• Precios expresados en Pesos Colombianos (COP) con desglose de IVA.', margin + 4, y + 22);
  if (invoice.notes) {
    doc.setFont('helvetica', 'italic');
    doc.text(`Nota: ${invoice.notes.substring(0, 50)}`, margin + 4, y + 28);
  }

  // Right Totals Breakdown Box
  doc.setFillColor(254, 243, 199);
  doc.roundedRect(totalsBoxX, y, totalsBoxWidth, 36, 2, 2, 'F');
  doc.setDrawColor(245, 158, 11);
  doc.roundedRect(totalsBoxX, y, totalsBoxWidth, 36, 2, 2, 'S');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Subtotal Base:', totalsBoxX + 4, y + 7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text(ToyModel.formatCurrency(invoice.subtotalBase), totalsBoxX + totalsBoxWidth - 4, y + 7, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(67, 56, 202);
  doc.text('Impuestos Totales (IVA):', totalsBoxX + 4, y + 13);
  doc.setFont('helvetica', 'bold');
  doc.text(`+${ToyModel.formatCurrency(invoice.totalTaxes)}`, totalsBoxX + totalsBoxWidth - 4, y + 13, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(194, 65, 12);
  doc.text('Descuentos Totales:', totalsBoxX + 4, y + 19);
  doc.setFont('helvetica', 'bold');
  doc.text(`-${ToyModel.formatCurrency(invoice.totalDiscounts)}`, totalsBoxX + totalsBoxWidth - 4, y + 19, { align: 'right' });

  // Divider
  doc.setDrawColor(217, 119, 6);
  doc.line(totalsBoxX + 4, y + 23, totalsBoxX + totalsBoxWidth - 4, y + 23);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('TOTAL A PAGAR:', totalsBoxX + 4, y + 31);

  doc.setFontSize(11);
  doc.setTextColor(5, 150, 105);
  doc.text(ToyModel.formatCurrency(invoice.grandTotal), totalsBoxX + totalsBoxWidth - 4, y + 31, { align: 'right' });

  y += 42;

  // 6. Footer Stamp
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, margin + contentWidth, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('¡GRACIAS POR TU COMPRA EN TOYSTORE KIDS!', margin + contentWidth / 2, y + 5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text('Facturación electrónica oficial · Moneda: COP · Desarrollado por Juan Velandia', margin + contentWidth / 2, y + 9, { align: 'center' });

  // 7. Trigger download
  doc.save(`Factura_${invoice.invoiceNumber}.pdf`);
}
