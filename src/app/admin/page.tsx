"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Inbox, FileText, FolderKanban, TrendingUp,
    ArrowUpRight, ChevronRight, Zap, Circle,
    Activity, Clock,
} from "lucide-react";

interface Inquiry {
    id: string; fullName: string; companyName: string;
    email: string; status: string; createdAt: string;
}
interface Quote { total: number; recurring: number; maintenanceMonthly: number; }

const STATUS: Record<string, { label: string; cls: string; dot: string }> = {
    New: { label: "New", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", dot: "bg-blue-400" },
    Reviewing: { label: "Reviewing", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20", dot: "bg-amber-400" },
    Quoted: { label: "Quoted", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", dot: "bg-emerald-400" },
    Closed: { label: "Closed", cls: "bg-white/5 text-gray-500 border-white/10", dot: "bg-gray-600" },
};

function StatSkeleton() {
    return (
        <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6 animate-pulse">
            <div className="h-8 w-8 rounded-lg bg-white/[0.05] mb-5" />
            <div className="h-8 w-20 bg-white/[0.05] rounded-lg mb-2" />
            <div className="h-2.5 w-28 bg-white/[0.04] rounded" />
        </div>
    );
}

function RowSkeleton() {
    return (
        <div className="flex items-center gap-4 px-6 py-4 animate-pulse">
            <div className="h-8 w-8 rounded-full bg-white/[0.05] shrink-0" />
            <div className="flex-1">
                <div className="h-3 w-32 bg-white/[0.05] rounded mb-1.5" />
                <div className="h-2.5 w-20 bg-white/[0.04] rounded" />
            </div>
            <div className="h-5 w-14 bg-white/[0.05] rounded-full" />
        </div>
    );
}

export default function Dashboard() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);
    const [studioOpen, setStudioOpen] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/api/admin/inquiries").then(r => r.json()),
            fetch("/api/admin/quotes").then(r => r.json()),
        ])
            .then(([inq, qts]) => {
                setInquiries(Array.isArray(inq) ? inq : []);
                setQuotes(Array.isArray(qts) ? qts : []);
            })
            .finally(() => setLoading(false));
    }, []);

    const newLeads = inquiries.filter(i => i.status === "New").length;
    const mrr = quotes.reduce((s, q) => s + (q.recurring || q.maintenanceMonthly || 0), 0);
    const totalRev = quotes.reduce((s, q) => s + (q.total || 0), 0);
    const recent = inquiries.slice(0, 6);

    const stats = [
        {
            label: "Inquiries",
            value: loading ? "—" : inquiries.length,
            sub: loading ? "Loading…" : `${newLeads} need review`,
            icon: Inbox,
            accent: "text-blue-400",
            glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
            href: "/admin/inquiries",
            badge: newLeads > 0 ? newLeads : null,
        },
        {
            label: "Quotes",
            value: loading ? "—" : quotes.length,
            sub: "All time",
            icon: FileText,
            accent: "text-indigo-400",
            glow: "",
            href: "/admin/quotes",
            badge: null,
        },
        {
            label: "Projects",
            value: 0,
            sub: "Active builds",
            icon: FolderKanban,
            accent: "text-violet-400",
            glow: "",
            href: "/admin/projects",
            badge: null,
        },
        {
            label: "MRR",
            value: loading ? "—" : mrr > 0 ? `₹${(mrr / 1000).toFixed(1)}K` : "₹0",
            sub: "Monthly recurring",
            icon: TrendingUp,
            accent: "text-emerald-400",
            glow: mrr > 0 ? "shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "",
            href: "/admin/revenue",
            badge: null,
        },
    ];

    return (
        <div className="p-8 max-w-[1400px]">

            {/* ── Page header ── */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1.5">
                        <h1 className="text-2xl font-bold text-white tracking-tight">Command Center</h1>
                        {newLeads > 0 && (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                {newLeads} new
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600">
                        {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>

                {/* Studio status pill */}
                <button
                    onClick={() => setStudioOpen(p => !p)}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-300 ${studioOpen
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                            : "bg-white/5 text-gray-500 border-white/10"
                        }`}
                >
                    <span className={`w-1.5 h-1.5 rounded-full transition-colors ${studioOpen ? "bg-emerald-400 animate-pulse" : "bg-gray-600"}`} />
                    {studioOpen ? "Studio: Open" : "Studio: Closed"}
                </button>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
                    : stats.map(s => (
                        <Link key={s.label} href={s.href}
                            className={`relative bg-[#111] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.12] ${s.glow} hover:bg-[#161616] transition-all duration-200 group overflow-hidden`}
                        >
                            {/* top row */}
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                                    <s.icon className={`w-4 h-4 ${s.accent}`} />
                                </div>
                                <div className="flex items-center gap-2">
                                    {s.badge && (
                                        <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[9px] font-black flex items-center justify-center">
                                            {s.badge}
                                        </span>
                                    )}
                                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-400 transition-colors" />
                                </div>
                            </div>
                            <div className={`text-3xl font-bold ${s.accent} tracking-tight mb-1.5`}>{s.value}</div>
                            <div className="text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">{s.label}</div>
                            <div className="text-xs text-gray-600">{s.sub}</div>
                        </Link>
                    ))}
            </div>

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent Inquiries (2/3 width) */}
                <div className="lg:col-span-2 bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">
                    {/* header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                            <div className="w-1 h-4 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                            <div>
                                <h2 className="text-sm font-bold text-white">Recent Inquiries</h2>
                                <p className="text-[11px] text-gray-600 mt-0.5">Latest from contact form</p>
                            </div>
                        </div>
                        <Link href="/admin/inquiries"
                            className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-400 transition-colors group"
                        >
                            View all <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {/* rows */}
                    {loading ? (
                        <div className="divide-y divide-white/[0.04]">
                            {Array.from({ length: 5 }).map((_, i) => <RowSkeleton key={i} />)}
                        </div>
                    ) : recent.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center px-8">
                            <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                                <Inbox className="w-6 h-6 text-gray-700" />
                            </div>
                            <p className="text-sm font-semibold text-gray-400 mb-1">No inquiries yet</p>
                            <p className="text-xs text-gray-700">New submissions will appear here</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-white/[0.04]">
                            {recent.map(inq => {
                                const st = STATUS[inq.status] ?? STATUS.New;
                                const initials = inq.fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                                return (
                                    <Link key={inq.id} href={`/admin/inquiries/${inq.id}`}
                                        className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.03] transition-colors group"
                                    >
                                        {/* Avatar */}
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600/50 to-indigo-600/50 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                                            {initials}
                                        </div>
                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="text-[13px] font-semibold text-white truncate">{inq.fullName}</div>
                                            <div className="text-[11px] text-gray-600 truncate">{inq.companyName || inq.email}</div>
                                        </div>
                                        {/* Status */}
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border flex items-center gap-1.5 ${st.cls}`}>
                                            <span className={`w-1 h-1 rounded-full ${st.dot}`} />
                                            {st.label}
                                        </span>
                                        {/* Date */}
                                        <span className="text-[11px] text-gray-700 tabular-nums hidden sm:block">
                                            {new Date(inq.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                                        </span>
                                        <ChevronRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-blue-400 transition-colors shrink-0" />
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Right Column (1/3 width) */}
                <div className="space-y-5">

                    {/* Revenue snapshot */}
                    <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-1 h-4 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <h2 className="text-sm font-bold text-white">Revenue</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-end justify-between">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">Total Quoted</div>
                                    <div className="text-2xl font-bold text-white">
                                        {loading ? "—" : totalRev > 0 ? `₹${(totalRev / 100000).toFixed(1)}L` : "₹0"}
                                    </div>
                                </div>
                                <Activity className="w-5 h-5 text-gray-700" />
                            </div>
                            <div className="h-px bg-white/[0.05]" />
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-1">MRR</div>
                                    <div className="text-lg font-bold text-emerald-400">
                                        {loading ? "—" : mrr > 0 ? `₹${mrr.toLocaleString("en-IN")}` : "₹0"}
                                    </div>
                                </div>
                                <Link href="/admin/revenue" className="text-[11px] text-blue-500 hover:text-blue-400 font-semibold transition-colors flex items-center gap-0.5">
                                    Details <ChevronRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="bg-[#111] border border-white/[0.06] rounded-2xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center gap-2">
                            <div className="w-1 h-4 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]" />
                            <h2 className="text-sm font-bold text-white">Quick Access</h2>
                        </div>
                        <div className="p-2">
                            {[
                                { href: "/admin/inquiries", icon: Inbox, label: "All Inquiries", badge: newLeads > 0 ? `${newLeads} new` : undefined },
                                { href: "/admin/quotes", icon: FileText, label: "Generated Quotes", badge: quotes.length > 0 ? `${quotes.length}` : undefined },
                                { href: "/admin/projects", icon: FolderKanban, label: "Active Projects", badge: undefined },
                                { href: "/admin/revenue", icon: TrendingUp, label: "Revenue Tracker", badge: undefined },
                            ].map(item => (
                                <Link key={item.href} href={item.href}
                                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.04] transition-colors group"
                                >
                                    <item.icon className="w-4 h-4 text-gray-600 group-hover:text-gray-300 transition-colors shrink-0" />
                                    <span className="flex-1 text-[13px] text-gray-400 group-hover:text-gray-200 transition-colors font-medium">{item.label}</span>
                                    {item.badge && (
                                        <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">{item.badge}</span>
                                    )}
                                    <ChevronRight className="w-3.5 h-3.5 text-gray-700 group-hover:text-gray-400 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* System status */}
                    <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-4 rounded-full bg-gray-600" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-600">System Status</h2>
                        </div>
                        <div className="space-y-2.5">
                            {[
                                { key: "Database", val: "Firestore · Live", ok: true },
                                { key: "Auth", val: "Session · Secure", ok: true },
                                { key: "Studio", val: studioOpen ? "Open" : "Closed", ok: studioOpen },
                                { key: "Build", val: "YBB OS v1.0.0", ok: true },
                            ].map(row => (
                                <div key={row.key} className="flex items-center justify-between">
                                    <span className="text-[11px] text-gray-600">{row.key}</span>
                                    <div className="flex items-center gap-1.5">
                                        <Circle className={`w-1.5 h-1.5 fill-current ${row.ok ? "text-emerald-400" : "text-red-400"}`} />
                                        <span className="text-[11px] text-gray-400 font-medium">{row.val}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
