import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface QuoteData {
    clientName: string;
    companyName: string;
    email: string;
    projectType: string;
    addons: string[];
    development: number;
    deployment: number;
    maintenanceMonthly: number;
    maintenance3m: number;
    maintenancePlan: string;
    total: number;
    recurring: number;
    timeline: string;
    validUntil: string;
    generatedDate: string;
}

function inr(n: number) {
    return "Rs. " + n.toLocaleString("en-IN");
}

export async function POST(req: Request) {
    const data: QuoteData = await req.json();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595.28, 841.89]); // A4
    const { width, height } = page.getSize();

    const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const cBlue = rgb(0.145, 0.388, 0.922);
    const cDark = rgb(0.059, 0.082, 0.161);
    const cSlate = rgb(0.427, 0.494, 0.588);
    const cLight = rgb(0.945, 0.960, 0.980);
    const cWhite = rgb(1, 1, 1);
    const cLine = rgb(0.882, 0.902, 0.922);

    const ML = 50;
    const MR = width - 50;
    const CW = MR - ML;

    const hLine = (y: number, color = cLine) => {
        page.drawLine({ start: { x: ML, y }, end: { x: MR, y }, thickness: 0.75, color });
    };

    // ── HEADER ──────────────────────────────────────────────────────────────
    page.drawRectangle({ x: 0, y: height - 90, width, height: 90, color: cBlue });
    page.drawText("YBB", { x: ML, y: height - 42, size: 24, font: bold, color: cWhite });
    page.drawText("Your Brand Builders", { x: ML, y: height - 60, size: 8.5, font: regular, color: rgb(0.75, 0.85, 0.96) });
    const dlW = bold.widthOfTextAtSize("PROJECT ESTIMATION", 12);
    page.drawText("PROJECT ESTIMATION", { x: MR - dlW, y: height - 42, size: 12, font: bold, color: cWhite });
    const dateW = regular.widthOfTextAtSize(data.generatedDate, 8.5);
    page.drawText(data.generatedDate, { x: MR - dateW, y: height - 60, size: 8.5, font: regular, color: rgb(0.75, 0.85, 0.96) });

    // ── CLIENT INFO ──────────────────────────────────────────────────────────
    let y = height - 118;
    page.drawText("PREPARED FOR", { x: ML, y, size: 8, font: bold, color: cSlate });
    y -= 18;
    page.drawText(data.clientName, { x: ML, y, size: 15, font: bold, color: cDark });
    y -= 16;
    page.drawText(data.companyName, { x: ML, y, size: 10, font: regular, color: cSlate });
    y -= 14;
    page.drawText(data.email, { x: ML, y, size: 9, font: regular, color: cSlate });

    page.drawText("Valid Until", { x: MR - 120, y: height - 118, size: 8, font: bold, color: cSlate });
    page.drawText(data.validUntil, { x: MR - 120, y: height - 136, size: 11, font: bold, color: cDark });
    page.drawText("(7 days from issue)", { x: MR - 120, y: height - 150, size: 7.5, font: regular, color: cSlate });

    y -= 24;
    hLine(y);

    // ── PROJECT SCOPE ────────────────────────────────────────────────────────
    y -= 22;
    page.drawText("PROJECT SCOPE", { x: ML, y, size: 8, font: bold, color: cSlate });
    y -= 16;
    page.drawText("Base Infrastructure:", { x: ML, y, size: 10, font: regular, color: cSlate });
    page.drawText(data.projectType, { x: ML + 120, y, size: 10, font: bold, color: cDark });

    if (data.addons.length > 0) {
        y -= 14;
        page.drawText("Add-ons:", { x: ML, y, size: 10, font: regular, color: cSlate });
        page.drawText(data.addons.join(", "), { x: ML + 120, y, size: 10, font: bold, color: cDark, maxWidth: CW - 120 });
    }

    y -= 14;
    page.drawText("Deployment:", { x: ML, y, size: 10, font: regular, color: cSlate });
    page.drawText(data.deployment > 0 ? "Included (Rs. 5,000)" : "Not included", { x: ML + 120, y, size: 10, font: bold, color: cDark });

    y -= 14;
    page.drawText("Maintenance Plan:", { x: ML, y, size: 10, font: regular, color: cSlate });
    page.drawText(data.maintenancePlan, { x: ML + 120, y, size: 10, font: bold, color: cDark });

    y -= 22;
    hLine(y);

    // ── INVESTMENT BREAKDOWN ─────────────────────────────────────────────────
    y -= 22;
    page.drawText("INVESTMENT BREAKDOWN", { x: ML, y, size: 8, font: bold, color: cSlate });

    // Table header
    y -= 18;
    page.drawRectangle({ x: ML - 8, y: y - 6, width: CW + 16, height: 20, color: rgb(0.235, 0.439, 0.957) });
    page.drawText("Item", { x: ML, y, size: 9, font: bold, color: cWhite });
    const aHW = bold.widthOfTextAtSize("Amount", 9);
    page.drawText("Amount", { x: MR - aHW, y, size: 9, font: bold, color: cWhite });

    // Line items
    const lineItems = [
        { label: "Development Total", value: inr(data.development) },
        { label: "Deployment Setup", value: data.deployment > 0 ? inr(data.deployment) : "—" },
        { label: `Initial Maintenance (3 months × ${inr(data.maintenanceMonthly)}/mo)`, value: inr(data.maintenance3m) },
    ];

    for (let i = 0; i < lineItems.length; i++) {
        const item = lineItems[i];
        y -= 22;
        if (i % 2 === 0) {
            page.drawRectangle({ x: ML - 8, y: y - 6, width: CW + 16, height: 20, color: rgb(0.976, 0.980, 0.992) });
        }
        page.drawText(item.label, { x: ML, y, size: 10, font: regular, color: cDark, maxWidth: CW - 100 });
        const vW = regular.widthOfTextAtSize(item.value, 10);
        page.drawText(item.value, { x: MR - vW, y, size: 10, font: regular, color: cDark });
    }

    y -= 8;
    hLine(y, cBlue);

    // Total
    y -= 18;
    page.drawRectangle({ x: ML - 8, y: y - 8, width: CW + 16, height: 28, color: cLight });
    page.drawText("TOTAL INITIAL INVESTMENT", { x: ML, y, size: 11, font: bold, color: cDark });
    const totalStr = inr(data.total);
    const totalW = bold.widthOfTextAtSize(totalStr, 13);
    page.drawText(totalStr, { x: MR - totalW, y: y - 1, size: 13, font: bold, color: cBlue });

    y -= 30;
    const recurStr = `Recurring Monthly (post 3-month initial): ${inr(data.recurring)}/month`;
    page.drawText(recurStr, { x: ML, y, size: 9, font: regular, color: cSlate });

    y -= 22;
    hLine(y);

    // ── TIMELINE ─────────────────────────────────────────────────────────────
    y -= 22;
    page.drawText("ESTIMATED TIMELINE", { x: ML, y, size: 8, font: bold, color: cSlate });
    y -= 18;
    page.drawText(data.timeline, { x: ML, y, size: 18, font: bold, color: cDark });
    y -= 14;
    page.drawText("Includes 20% buffer for revisions and testing cycles.", { x: ML, y, size: 9, font: regular, color: cSlate });

    y -= 22;
    hLine(y);

    // ── TERMS ─────────────────────────────────────────────────────────────────
    y -= 22;
    page.drawText("TERMS & CONDITIONS", { x: ML, y, size: 8, font: bold, color: cSlate });
    y -= 16;
    const terms = [
        "1. Maintenance is billed monthly after the mandatory 3-month initial period.",
        "2. This quotation is valid for 7 days from the issue date.",
        "3. All prices are exclusive of GST (18%).",
        "4. A 50% advance is required to initiate the project.",
        "5. Final delivery subject to client feedback cycles (max 3 rounds included).",
    ];
    for (const term of terms) {
        page.drawText(term, { x: ML, y, size: 9, font: regular, color: cSlate, maxWidth: CW });
        y -= 14;
    }

    y -= 10;
    hLine(y);

    // ── SIGNATURE ─────────────────────────────────────────────────────────────
    y -= 28;
    page.drawText("Authorised by", { x: ML, y, size: 9, font: regular, color: cSlate });
    page.drawText("Accepted by", { x: ML + 260, y, size: 9, font: regular, color: cSlate });
    y -= 40;
    hLine(y - 2);
    page.drawText("YBB · Your Brand Builders", { x: ML, y: y - 14, size: 9, font: bold, color: cDark });
    page.drawText(`${data.clientName} · ${data.companyName}`, { x: ML + 260, y: y - 14, size: 9, font: bold, color: cDark });

    // ── FOOTER BAR ────────────────────────────────────────────────────────────
    page.drawRectangle({ x: 0, y: 0, width, height: 36, color: cBlue });
    const footerText = "yourbrandbuilders.com  |  Confidential — Not for distribution";
    const ftW = regular.widthOfTextAtSize(footerText, 8.5);
    page.drawText(footerText, { x: (width - ftW) / 2, y: 13, size: 8.5, font: regular, color: rgb(0.75, 0.85, 0.96) });

    // ── SAVE ──────────────────────────────────────────────────────────────────
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="YBB-Quote-${data.companyName.replace(/\s+/g, "-")}.pdf"`,
        },
    });
}
