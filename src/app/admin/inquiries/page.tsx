"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, ChevronRight, Search } from "lucide-react";

interface Inquiry {
    id: string; fullName: string; companyName: string;
    email: string; status: string; createdAt: string; projectType?: string;
}

const STATUS: Record<string, { cls: string; dot: string }> = {
    New: { cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", dot: "bg-blue-400" },
    Reviewing: { cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", dot: "bg-amber-400" },
    Quoted: { cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
    Closed: { cls: "bg-white/5 text-gray-500 border-white/10", dot: "bg-gray-600" },
};

const PROJECT_LABELS: Record<string, string> = {
    website: "Website", webapp: "Web App", mobile: "Mobile App",
    infrastructure: "Infrastructure", internal: "Internal", unsure: "Unsure",
};

export default function InquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/admin/inquiries")
            .then(r => r.json())
            .then(d => setInquiries(Array.isArray(d) ? d : []))
            .finally(() => setLoading(false));
    }, []);

    const FILTERS = ["All", "New", "Reviewing", "Quoted", "Closed"];

    const filtered = inquiries.filter(i => {
        const matchStatus = filter === "All" || i.status === filter;
        const matchSearch = !search || [i.fullName, i.companyName, i.email]
            .some(s => s?.toLowerCase().includes(search.toLowerCase()));
        return matchStatus && matchSearch;
    });

    const counts: Record<string, number> = { All: inquiries.length };
    FILTERS.slice(1).forEach(s => { counts[s] = inquiries.filter(i => i.status === s).length; });

    return (
        <div className="p-8 max-w-[1400px]">

            {/* Header */}
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight mb-1">Inquiries</h1>
                    <p className="text-sm text-gray-600">
                        {loading ? "Loading..." : `${inquiries.length} total · ${counts.New ?? 0} new`}
                    </p>
                </div>
            </div>

            {/* Filters + search bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                {/* Status pills */}
                <div className="flex items-center gap-1.5 bg-[#111] border border-white/[0.06] rounded-xl p-1">
                    {FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`relative px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${filter === f
                                    ? "bg-blue-600 text-white shadow-[0_0_12px_rgba(37,99,235,0.35)]"
                                    : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            {f}
                            {counts[f] > 0 && (
                                <span className={`ml-1.5 text-[9px] font-bold ${filter === f ? "text-blue-200" : "text-gray-700"}`}>
                                    {counts[f]}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search name, company, email..."
                        className="pl-9 pr-4 py-2 text-sm bg-[#111] border border-white/[0.06] rounded-xl text-gray-300 placeholder-gray-700 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all w-64"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">
                {/* Column headers */}
                <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_80px] gap-4 px-6 py-3 border-b border-white/[0.06] bg-[#0C0C0C]">
                    {["Client", "Project Type", "Status", "Date", ""].map(h => (
                        <div key={h} className="text-[9px] font-black uppercase tracking-[0.14em] text-gray-700">{h}</div>
                    ))}
                </div>

                {loading ? (
                    <div className="divide-y divide-white/[0.04]">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="grid grid-cols-[2fr_1.5fr_1fr_1fr_80px] gap-4 px-6 py-5 animate-pulse">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-white/[0.05]" />
                                    <div>
                                        <div className="h-3 w-28 bg-white/[0.05] rounded mb-1" />
                                        <div className="h-2.5 w-20 bg-white/[0.04] rounded" />
                                    </div>
                                </div>
                                <div className="h-3 w-20 bg-white/[0.05] rounded self-center" />
                                <div className="h-5 w-16 bg-white/[0.05] rounded-full self-center" />
                                <div className="h-3 w-16 bg-white/[0.05] rounded self-center" />
                                <div />
                            </div>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center px-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                            <Inbox className="w-6 h-6 text-gray-700" />
                        </div>
                        <p className="text-sm font-semibold text-gray-400 mb-1">No inquiries found</p>
                        <p className="text-xs text-gray-700">{search ? "Try a different search term" : "New submissions will appear here"}</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.04]">
                        {filtered.map(inq => {
                            const st = STATUS[inq.status] ?? STATUS.New;
                            const initials = inq.fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                            return (
                                <Link key={inq.id} href={`/admin/inquiries/${inq.id}`}
                                    className="grid grid-cols-[2fr_1.5fr_1fr_1fr_80px] gap-4 px-6 py-4 hover:bg-white/[0.03] transition-colors group items-center"
                                >
                                    {/* Client */}
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600/40 to-indigo-600/40 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                            {initials}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[13px] font-semibold text-white truncate">{inq.fullName}</div>
                                            <div className="text-[11px] text-gray-600 truncate">{inq.companyName || inq.email}</div>
                                        </div>
                                    </div>

                                    {/* Type */}
                                    <div className="text-[12px] text-gray-500">
                                        {PROJECT_LABELS[inq.projectType ?? ""] || "—"}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${st.cls}`}>
                                            <span className={`w-1 h-1 rounded-full ${st.dot}`} />
                                            {inq.status || "New"}
                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="text-[11px] text-gray-600 tabular-nums">
                                        {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "2-digit" })}
                                    </div>

                                    {/* Arrow */}
                                    <div className="flex justify-end">
                                        <ChevronRight className="w-4 h-4 text-gray-700 group-hover:text-blue-400 transition-colors" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
