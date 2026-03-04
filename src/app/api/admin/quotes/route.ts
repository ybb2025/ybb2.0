import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// ── POST /api/admin/quotes — save a generated quote linked to an inquiry ──────
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const docRef = await db.collection("quotes").add({
            ...body,
            createdAt: new Date(),
        });
        return NextResponse.json({ id: docRef.id });
    } catch (err) {
        console.error("POST /api/admin/quotes", err);
        return NextResponse.json({ error: "Failed to save quote." }, { status: 500 });
    }
}

// ── GET /api/admin/quotes?inquiryId=xxx — fetch quotes for an inquiry ──────────
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const inquiryId = searchParams.get("inquiryId");

        let query = db.collection("quotes").orderBy("createdAt", "desc");
        if (inquiryId) {
            query = query.where("inquiryId", "==", inquiryId) as typeof query;
        }

        const snapshot = await query.get();
        const quotes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.().toISOString() ?? new Date().toISOString(),
        }));

        return NextResponse.json(quotes);
    } catch (err) {
        console.error("GET /api/admin/quotes", err);
        return NextResponse.json({ error: "Failed to fetch quotes." }, { status: 500 });
    }
}
