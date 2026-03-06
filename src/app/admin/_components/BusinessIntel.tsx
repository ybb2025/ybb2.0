"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Target, Activity } from "lucide-react";

interface BusinessIntelProps {
    inquiries: any[];
    loading: boolean;
}

export function BusinessIntel({ inquiries, loading }: BusinessIntelProps) {
    // 1. Calculate stats
    const totalPotentialRevenue = inquiries.reduce((sum, inq) => {
        // Simple parser for budget strings like "₹1.5L - ₹2.5L" or "₹50k"
        const budget = inq.budget || "";
        const match = budget.match(/(\d+\.?\d*)/);
        if (match) {
            let val = parseFloat(match[1]);
            if (budget.toLowerCase().includes('l')) val *= 100000;
            else if (budget.toLowerCase().includes('k')) val *= 1000;
            return sum + val;
        }
        return sum;
    }, 0);

    const conversionRate = inquiries.length > 0
        ? Math.round((inquiries.filter(i => i.status === 'Quoted').length / inquiries.length) * 100)
        : 0;

    const stats = [
        { label: "Pipeline Value", value: `₹${(totalPotentialRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { label: "Conversion Rate", value: `${conversionRate}%`, icon: Target, color: "text-indigo-400", bg: "bg-indigo-500/10" },
        { label: "Quality Score", value: "8.4", icon: Activity, color: "text-amber-400", bg: "bg-amber-500/10" },
    ];

    if (loading) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((s, i) => (
                <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-[#111113] border border-slate-800/60 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all shadow-lg"
                >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.02] rounded-bl-[40px] pointer-events-none group-hover:scale-110 transition-transform" />

                    <div className="flex items-center gap-4 mb-4">
                        <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center shadow-inner`}>
                            <s.icon className={`w-5 h-5 ${s.color}`} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-white tracking-tight">{s.value}</div>
                            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{s.label}</div>
                        </div>
                    </div>

                    {/* Simple Sparkline simulation */}
                    <div className="flex items-end gap-1 h-8 mt-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        {[40, 70, 45, 90, 65, 80, 50, 85].map((h, j) => (
                            <motion.div
                                key={j}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: j * 0.05 }}
                                className={`w-full rounded-t-sm ${s.color.replace('text', 'bg')}`}
                            />
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
