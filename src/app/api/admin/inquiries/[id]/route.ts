import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

type Params = { params: Promise<{ id: string }> };

// ── GET /api/admin/inquiries/[id] ─────────────────────────────────────────────
export async function GET(_req: Request, { params }: Params) {
    const { id } = await params;
    try {
        const doc = await db.collection("inquiries").doc(id).get();
        if (!doc.exists) {
            return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
        }
        const data = doc.data()!;
        return NextResponse.json({
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.().toISOString() ?? new Date().toISOString(),
        });
    } catch (err) {
        console.error("GET /api/admin/inquiries/[id]", err);
        return NextResponse.json({ error: "Failed to fetch inquiry." }, { status: 500 });
    }
}

// ── PATCH /api/admin/inquiries/[id] — update status / call notes ──────────────
export async function PATCH(req: Request, { params }: Params) {
    const { id } = await params;
    try {
        const body = await req.json();
        await db.collection("inquiries").doc(id).update({
            ...body,
            updatedAt: new Date(),
        });
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("PATCH /api/admin/inquiries/[id]", err);
        return NextResponse.json({ error: "Failed to update inquiry." }, { status: 500 });
    }
}
