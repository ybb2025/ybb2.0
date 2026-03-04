"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Loader2 } from "lucide-react";

interface Quote {
    total: number; recurring: number; maintenanceMonthly: number;
    clientName: string; createdAt: string;
}

const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function RevenuePage() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/quotes")
            .then(r => r.json())
            .then(d => setQuotes(Array.isArray(d) ? d : []))
            .finally(() => setLoading(false));
    }, []);

    const totalDev = quotes.reduce((s, q) => s + (q.total || 0), 0);
    const mrr = quotes.reduce((s, q) => s + (q.recurring || q.maintenanceMonthly || 0), 0);
    const arr = mrr * 12;

    // This month's quotes
    const thisMonth = quotes.filter(q => {
        const d = new Date(q.createdAt);
        const n = new Date();
        return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear();
    });
    const monthRev = thisMonth.reduce((s, q) => s + (q.total || 0), 0);

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white tracking-tight">Revenue</h1>
                <p className="text-sm text-gray-400 mt-1">Studio financial snapshot</p>
            </div>

            {/* Key metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total Dev Revenue", value: loading ? "—" : fmt(totalDev), sub: "all time", color: "text-white" },
                    { label: "This Month", value: loading ? "—" : fmt(monthRev), sub: "dev revenue", color: "text-blue-400" },
                    { label: "Monthly Recurring", value: loading ? "—" : fmt(mrr), sub: "MRR", color: "text-green-400" },
                    { label: "Annual Recurring", value: loading ? "—" : fmt(arr), sub: "ARR (projected)", color: "text-indigo-400" },
                ].map(s => (
                    <div key={s.label} className="bg-[#0A0A0A] rounded-2xl border border-white/5 p-5">
                        <div className={`text-3xl font-bold tracking-tight mb-1 ${s.color}`}>
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : s.value}
                        </div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">{s.label}</div>
                        <div className="text-xs text-gray-600 mt-0.5">{s.sub}</div>
                    </div>
                ))}
            </div>

            {/* Maintenance clients */}
            <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-white">Maintenance Clients</h2>
                    <span className="text-xs font-semibold text-gray-300 bg-white/10 rounded-lg px-2.5 py-1">{quotes.filter(q => (q.recurring || q.maintenanceMonthly) > 0).length} active</span>
                </div>
                {loading ? (
                    <div className="py-12 flex justify-center"><Loader2 className="w-5 h-5 animate-spin text-blue-500" /></div>
                ) : quotes.filter(q => (q.recurring || q.maintenanceMonthly) > 0).length === 0 ? (
                    <div className="py-12 text-center">
                        <TrendingUp className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                        <p className="text-sm text-gray-400">No maintenance clients yet.</p>
                        <p className="text-xs text-gray-600 mt-1">They'll appear here once quotes with maintenance plans are generated.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {quotes.filter(q => (q.recurring || q.maintenanceMonthly) > 0).map((q, i) => (
                            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors">
                                <div>
                                    <div className="text-sm font-semibold text-white">{q.clientName}</div>
                                    <div className="text-xs text-gray-500">Since {new Date(q.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-green-400">{fmt(q.recurring || q.maintenanceMonthly)}</div>
                                    <div className="text-[10px] text-gray-500">/ month</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
