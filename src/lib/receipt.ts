import jsPDF from "jspdf";
import { formatNaira, impactCounts, donationLabel } from "@/lib/format";

export type ReceiptData = {
  reference: string;
  amount: number;
  type: string;
  date?: Date;
  donorName?: string;
  email?: string;
};

function buildImpactLine(type: string, amount: number): string {
  const { girls, boys } = impactCounts(type, amount);
  const parts: string[] = [];
  if (girls > 0) parts.push(`${girls} girl${girls > 1 ? "s" : ""} supported with pads + health education`);
  if (boys > 0) parts.push(`${boys} boy${boys > 1 ? "s" : ""} supported with hygiene kits + workshop`);
  return parts.join("  •  ") || "Support for Nigerian youth";
}

export function generateReceiptPDF(data: ReceiptData): jsPDF {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 48;
  const date = data.date ?? new Date();

  // Header band
  doc.setFillColor(124, 58, 237); // brand purple
  doc.rect(0, 0, pageW, 110, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("PadAndFresh.ng", margin, 50);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Donation Receipt", margin, 72);
  doc.setFontSize(10);
  doc.text(date.toLocaleString("en-NG"), pageW - margin, 50, { align: "right" });
  doc.text(`Ref: ${data.reference}`, pageW - margin, 66, { align: "right" });

  // Thank-you
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Thank you for your generosity 💜💙", margin, 160);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  const intro = `This receipt confirms your donation ${donationLabel(data.type)}. Your support directly funds pads, hygiene supplies, and education workshops for Nigerian youth.`;
  doc.text(doc.splitTextToSize(intro, pageW - margin * 2), margin, 184);

  // Summary box
  const boxY = 240;
  doc.setDrawColor(220, 220, 230);
  doc.setFillColor(248, 247, 255);
  doc.roundedRect(margin, boxY, pageW - margin * 2, 200, 8, 8, "FD");

  const rows: Array<[string, string]> = [
    ["Donor", data.donorName?.trim() || "Anonymous donor"],
    ["Email", data.email?.trim() || "—"],
    ["Reference", data.reference],
    ["Program", prettyType(data.type)],
    ["Amount", formatNaira(data.amount)],
    ["Payment", "Paystack"],
    ["Status", "Completed"],
  ];

  doc.setFontSize(11);
  let y = boxY + 28;
  rows.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(90, 90, 90);
    doc.text(label, margin + 16, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(20, 20, 20);
    doc.text(String(value), margin + 140, y);
    y += 22;
  });

  // Impact section
  const impactY = boxY + 220;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(20, 20, 20);
  doc.text("Your Impact", margin, impactY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(60, 60, 60);
  const impactLines = doc.splitTextToSize(buildImpactLine(data.type, data.amount), pageW - margin * 2);
  doc.text(impactLines, margin, impactY + 22);

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 80;
  doc.setDrawColor(230, 230, 235);
  doc.line(margin, footerY, pageW - margin, footerY);
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text("PadAndFresh.ng — Keeping Nigerian girls in school and Nigerian boys confident.", margin, footerY + 18);
  doc.text("Questions? hello@padandfresh.ng  •  padandfresh.ng", margin, footerY + 32);
  doc.text("This is an electronic receipt and does not require a signature.", margin, footerY + 46);

  return doc;
}

export function downloadReceiptPDF(data: ReceiptData) {
  const doc = generateReceiptPDF(data);
  doc.save(`PadAndFresh-Receipt-${data.reference}.pdf`);
}

export function buildReceiptMailto(data: ReceiptData): string {
  const { girls, boys } = impactCounts(data.type, data.amount);
  const subject = `My PadAndFresh.ng donation receipt (${data.reference})`;
  const body =
    `Hi,\n\nHere is my PadAndFresh.ng donation receipt:\n\n` +
    `Reference: ${data.reference}\n` +
    `Amount: ${formatNaira(data.amount)}\n` +
    `Program: ${prettyType(data.type)}\n` +
    `Date: ${(data.date ?? new Date()).toLocaleString("en-NG")}\n` +
    `Payment: Paystack\n\n` +
    `Impact: ${girls} girl(s) and ${boys} boy(s) supported.\n\n` +
    `Learn more: https://padandfresh.ng\n`;
  const to = data.email ? encodeURIComponent(data.email) : "";
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function prettyType(t?: string): string {
  switch (t) {
    case "pad_girl": return "Pad a Girl 💜";
    case "fresh_boy": return "Fresh Boy 💙";
    case "both": return "Support Both 💚";
    case "sponsor_10": return "Sponsor 10 Youth ✨";
    default: return "Custom donation";
  }
}
