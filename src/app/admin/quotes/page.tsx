"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Quote {
    id: string; inquiryId: string; clientName: string; companyName: string;
    developmentCost: number; deploymentCost: number; maintenanceMonthly: number;
    total: number; recurring: number; timeline: string; createdAt: string;
    projectType: string; addons: string[];
}

const fmt = (n: number) => n > 0 ? `₹${n.toLocaleString("en-IN")}` : "—";

export default function QuotesPage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/quotes")
            .then(r => r.json())
            .then(d => setQuotes(Array.isArray(d) ? d : []))
            .finally(() => setLoading(false));
    }, []);

    const totalRevenue = quotes.reduce((s, q) => s + (q.total || 0), 0);
    const totalMRR = quotes.reduce((s, q) => s + (q.recurring || q.maintenanceMonthly || 0), 0);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Quotes</h1>
                <p className="text-sm text-gray-400 mt-1">{loading ? "Loading..." : `${quotes.length} generated`}</p>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                    { label: "Total Quotes", value: loading ? "—" : quotes.length.toString() },
                    { label: "Total Revenue", value: loading ? "—" : fmt(totalRevenue) },
                    { label: "Monthly Recurring", value: loading ? "—" : fmt(totalMRR) },
                ].map(s => (
                    <div key={s.label} className="bg-[#0A0A0A] rounded-2xl border border-white/5 p-5">
                        <div className="text-3xl font-bold tracking-tight text-white">{s.value}</div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5">
                            {["Client", "Project Type", "Initial Investment", "Monthly", "Timeline", "Date", ""].map(h => (
                                <th key={h} className="text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-gray-500">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr><td colSpan={7} className="py-14 text-center"><Loader2 className="w-6 h-6 animate-spin text-blue-500 mx-auto" /></td></tr>
                        ) : quotes.length === 0 ? (
                            <tr><td colSpan={7} className="py-12 text-center text-sm text-gray-500">No quotes yet. Generate one from an inquiry detail page.</td></tr>
                        ) : quotes.map(q => (
                            <tr key={q.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-5 py-4">
                                    <div className="font-semibold text-white text-sm">{q.clientName}</div>
                                    <div className="text-xs text-gray-500">{q.companyName}</div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="text-xs font-medium text-gray-300 bg-white/10 rounded-lg px-2.5 py-1">{q.projectType || "Custom"}</span>
                                </td>
                                <td className="px-5 py-4 text-sm font-bold text-white">{fmt(q.total)}</td>
                                <td className="px-5 py-4 text-sm font-semibold text-green-400">{fmt(q.recurring || q.maintenanceMonthly)}<span className="text-xs text-gray-500 font-normal">/mo</span></td>
                                <td className="px-5 py-4 text-sm text-gray-400">{q.timeline || "—"}</td>
                                <td className="px-5 py-4 text-sm text-gray-500">{new Date(q.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                                <td className="px-5 py-4 text-right">
                                    {q.inquiryId && (
                                        <Link href={`/admin/inquiries/${q.inquiryId}`}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-all"
                                        >
                                            Open <ArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
