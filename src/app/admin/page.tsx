"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    Inbox, FileText, FolderKanban, TrendingUp,
    ArrowUpRight, ChevronRight, Zap, Circle,
    Activity, Clock, User, Download, Sparkles, BarChart3, Users
} from "lucide-react";
import { BusinessIntel } from "./_components/BusinessIntel";

interface Inquiry {
    id: string; fullName: string; companyName: string;
    email: string; status: string; createdAt: string;
    projectType?: string; budget?: string;
}

const STATUS: Record<string, { label: string; cls: string; dot: string }> = {
    New: { label: "New", cls: "bg-blue-500/10 text-blue-400 border border-blue-500/20", dot: "bg-blue-400" },
    Reviewing: { label: "In Review", cls: "bg-amber-500/10 text-amber-400 border border-amber-500/20", dot: "bg-amber-400" },
    Quoted: { label: "Approved", cls: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20", dot: "bg-emerald-400" },
    Closed: { label: "Follow Up", cls: "bg-slate-500/10 text-slate-400 border border-slate-500/20", dot: "bg-slate-400" },
};

function StatSkeleton() {
    return (
        <div className="bg-[#111113] border border-slate-800/60 rounded-2xl p-6 shadow-sm animate-pulse">
            <div className="h-8 w-8 rounded-lg bg-[#18181B] mb-5" />
            <div className="h-8 w-20 bg-[#18181B] rounded-lg mb-2" />
            <div className="h-2.5 w-28 bg-slate-800/50 rounded" />
        </div>
    );
}

export default function Dashboard() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/admin/inquiries")
            .then(r => r.json())
            .then(inq => {
                setInquiries(Array.isArray(inq) ? inq : []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const newLeads = inquiries.filter(i => i.status === "New").length;
    const reviewLeads = inquiries.filter(i => i.status === "Reviewing").length;
    const approvedLeads = inquiries.filter(i => i.status === "Quoted").length;
    const closedLeads = inquiries.filter(i => i.status === "Closed").length;
    const recent = inquiries.slice(0, 6);

    const leadStats = [
        { label: "Total Leads", value: loading ? "—" : inquiries.length, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10 border border-blue-500/20" },
        { label: "In Review", value: loading ? "—" : reviewLeads, icon: Activity, color: "text-amber-400", bg: "bg-amber-500/10 border border-amber-500/20" },
        { label: "Approved", value: loading ? "—" : approvedLeads, icon: FolderKanban, color: "text-emerald-400", bg: "bg-emerald-500/10 border border-emerald-500/20" },
        { label: "Follow Up", value: loading ? "—" : closedLeads, icon: Clock, color: "text-slate-400", bg: "bg-slate-500/10 border border-slate-500/20" },
    ];

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6">

            {/* Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* ══ Left Column (Main) ══ */}
                <div className="xl:col-span-2 space-y-6">

                    {/* Welcome Card */}
                    <div className="relative bg-[#111113] border border-slate-800/60 rounded-2xl shadow-lg p-8 overflow-hidden text-slate-100">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
                        <div className="relative z-10 flex items-center justify-between">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">Welcome Back, Admin</h1>
                                <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                                    You have <span className="text-indigo-400 font-semibold">{newLeads} new leads</span> today. Let's convert them into high-performing digital assets.
                                </p>
                            </div>
                            <div className="hidden md:flex gap-6 text-right">
                                <div>
                                    <div className="text-3xl font-bold text-slate-100 mb-1">12</div>
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Active Projects</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-slate-100 mb-1">₹4.2L</div>
                                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Revenue Filter</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Intelligence Charts */}
                    <BusinessIntel inquiries={inquiries} loading={loading} />

                    {/* Leads Overview Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)
                            : leadStats.map(s => (
                                <div key={s.label} className="bg-[#111113] border border-slate-800/60 rounded-2xl p-5 shadow-lg hover:border-slate-700 transition-colors cursor-pointer text-slate-100">
                                    <div className={`w-10 h-10 ${s.bg} rounded-[12px] flex items-center justify-center mb-4 shadow-sm`}>
                                        <s.icon className={`w-5 h-5 ${s.color}`} />
                                    </div>
                                    <div className="text-2xl font-bold mb-1">{s.value}</div>
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{s.label}</div>
                                </div>
                            ))}
                    </div>

                    {/* Leads Table */}
                    <div className="bg-[#111113] border border-slate-800/60 rounded-2xl shadow-xl overflow-hidden text-slate-300">
                        <div className="px-6 py-5 border-b border-slate-800/60 flex items-center justify-between bg-[#0A0A0B]/50 backdrop-blur-md">
                            <h2 className="text-sm font-bold tracking-wide text-slate-100 uppercase">Recent Leads</h2>
                            <Link href="/admin/inquiries" className="text-sm text-indigo-400 font-medium hover:text-indigo-300 transition-colors flex items-center gap-1">
                                View all <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <div className="overflow-x-auto custom-scrollbar">
                            <table className="w-full text-left text-sm text-slate-400">
                                <thead className="text-[11px] uppercase tracking-widest bg-[#0A0A0B]/80 text-slate-500 font-bold border-b border-slate-800/60">
                                    <tr>
                                        <th className="px-6 py-4">Client</th>
                                        <th className="px-6 py-4 hidden sm:table-cell">Project Type</th>
                                        <th className="px-6 py-4 hidden sm:table-cell">Budget</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800/60">
                                    {loading ? (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
                                    ) : recent.length === 0 ? (
                                        <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-600">No leads found.</td></tr>
                                    ) : recent.map((inq) => {
                                        const st = STATUS[inq.status] ?? STATUS.New;
                                        return (
                                            <tr key={inq.id} className="hover:bg-[#18181B]/80 transition-colors group cursor-pointer">
                                                <td className="px-6 py-4">
                                                    <div className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">{inq.fullName}</div>
                                                    <div className="text-xs text-slate-500 mt-1 font-medium">{inq.companyName || inq.email}</div>
                                                </td>
                                                <td className="px-6 py-4 hidden sm:table-cell text-slate-300 font-medium">
                                                    {inq.projectType || "TBD"}
                                                </td>
                                                <td className="px-6 py-4 hidden sm:table-cell font-bold text-slate-200">
                                                    {inq.budget || "—"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${st.cls}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${inq.status === 'New' ? 'animate-pulse' : ''}`} />
                                                        {st.label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link href={`/admin/inquiries/${inq.id}`} className="inline-flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-white hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-transparent hover:border-slate-700">
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                {/* Action Card: AI Architecture (Prominent) */}
                <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-[0_20px_50px_rgba(79,70,229,0.3)] relative overflow-hidden group cursor-pointer active:scale-[0.98] transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px] pointer-events-none -translate-y-4 translate-x-4" />
                    <Sparkles className="w-8 h-8 mb-4 text-indigo-200" />
                    <h3 className="text-lg font-bold mb-1 tracking-tight">AI Architecture Studio</h3>
                    <p className="text-white/70 text-xs mb-6 leading-relaxed">
                        Convert active inquiries into production-ready blueprints.
                    </p>
                    <Link href="/admin/ai-planning" className="w-full bg-white text-indigo-600 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:bg-slate-50 transition-colors">
                        Launch Studio <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Planning Progress Chart */}
                <div className="bg-[#111113] border border-slate-800/60 rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-100 tracking-wide text-xs uppercase">Pipeline Intensity</h3>
                        <BarChart3 className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="space-y-4">
                        {[
                            { label: "Planning", percent: 65, color: "bg-indigo-500" },
                            { label: "Production", percent: 30, color: "bg-blue-500" },
                            { label: "Complete", percent: 5, color: "bg-emerald-500" },
                        ].map((bar, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                                    <span>{bar.label}</span>
                                    <span className="text-slate-400 font-mono">{bar.percent}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-[#0A0A0B] rounded-full overflow-hidden border border-slate-800/30">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${bar.percent}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.2 }}
                                        className={`h-full ${bar.color} rounded-full`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
