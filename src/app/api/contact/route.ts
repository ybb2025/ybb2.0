import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { generateProjectSummary } from "@/lib/ai-plan";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        let finalBody = { ...body };

        try {
            console.log("Generating AI Summary Plan...");
            const { aiSummary, aiSummaryData } = await generateProjectSummary(finalBody);
            finalBody = {
                ...finalBody,
                rawAiSummary: aiSummary,
                aiStructuredData: aiSummaryData,
                aiGenerated: true
            };
        } catch (aiErr) {
            console.error("AI Step Failed, continuing to save lead safely...", aiErr);
        }

        // Using firebase-admin fully bypasses Firestore Rules logic
        await db.collection("inquiries").add({
            ...finalBody,
            createdAt: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API Error adding document:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
