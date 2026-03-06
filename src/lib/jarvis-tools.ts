import { db } from "./firebase-admin";

/**
 * Fetches a summary of recent leads for Jarvis to analyze.
 */
export async function list_recent_leads(limit = 10) {
    try {
        const snapshot = await db.collection("inquiries")
            .orderBy("createdAt", "desc")
            .limit(limit)
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.fullName,
                type: data.projectType,
                budget: data.budget,
                status: data.status,
                date: data.createdAt?.toDate?.().toISOString().split('T')[0]
            };
        });
    } catch (err) {
        console.error("Jarvis Tool Error (list_recent_leads):", err);
        return { error: "Could not fetch leads." };
    }
}

/**
 * Fetches deep details for a specific inquiry.
 */
export async function get_lead_details(id: string) {
    try {
        const doc = await db.collection("inquiries").doc(id).get();
        if (!doc.exists) return { error: "Inquiry not found." };

        const data = doc.data()!;
        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate?.().toISOString()
        };
    } catch (err) {
        console.error("Jarvis Tool Error (get_lead_details):", err);
        return { error: "Could not fetch lead details." };
    }
}

/**
 * Aggregates high-level business stats.
 */
export async function get_business_stats() {
    try {
        const inquiries = await db.collection("inquiries").get();
        const quotes = await db.collection("quotes").get();

        const stats = {
            totalLeads: inquiries.size,
            statusCounts: {} as Record<string, number>,
            totalQuotesGenerated: quotes.size,
            recentActivity: `${inquiries.size} inquiries and ${quotes.size} quotes exist in the system.`
        };

        inquiries.docs.forEach(doc => {
            const status = doc.data().status || "New";
            stats.statusCounts[status] = (stats.statusCounts[status] || 0) + 1;
        });

        return stats;
    } catch (err) {
        console.error("Jarvis Tool Error (get_business_stats):", err);
        return { error: "Could not fetch business stats." };
    }
}
