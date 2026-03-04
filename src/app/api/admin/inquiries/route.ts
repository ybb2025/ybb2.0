import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

// ── GET /api/admin/inquiries — list all, newest first ────────────────────────
export async function GET() {
    try {
        const snapshot = await db
            .collection("inquiries")
            .orderBy("createdAt", "desc")
            .get();

        const inquiries = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate?.().toISOString() ?? new Date().toISOString(),
            };
        });

        return NextResponse.json(inquiries);
    } catch (err) {
        console.error("GET /api/admin/inquiries", err);
        return NextResponse.json({ error: "Failed to fetch inquiries." }, { status: 500 });
    }
}
