"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
    ArrowLeft, Check, Download, Loader2,
    User, Building2, Mail, Globe,
    LayoutGrid, Target, Calendar, DollarSign,
    FileText, ChevronRight, RefreshCw,
} from "lucide-react";

// ─── Pricing data ─────────────────────────────────────────────────────────────

const BASE_OPTIONS = [
    { id: "static", label: "Static Website", price: 10000, weeks: 1 },
    { id: "dynamic", label: "Dynamic Website", price: 20000, weeks: 2 },
    { id: "android", label: "Android App", price: 20000, weeks: 4 },
    { id: "ios", label: "iOS App", price: 40000, weeks: 6 },
];

const ADDONS = [
    { id: "dashboard", label: "Admin Dashboard", price: 5000, weeks: 1 },
    { id: "payment", label: "Payment Gateway", price: 10000, weeks: 1 },
    { id: "cms", label: "CMS / Blog", price: 5000, weeks: 1 },
    { id: "api", label: "API Integration", price: 5000, weeks: 1 },
];

const MAINTENANCE_PLANS = [
    { id: "basic", label: "Basic", price: 10000, desc: "Bug fixes, uptime monitoring" },
    { id: "growth", label: "Growth", price: 15000, desc: "Updates, SEO, support" },
    { id: "advanced", label: "App Advanced", price: 20000, desc: "Full app support + updates" },
];

type Status = "New" | "Reviewing" | "Quoted" | "Closed";

const STATUS_STYLES: Record<Status, string> = {
    New: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    Reviewing: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    Quoted: "bg-green-500/10 text-green-400 border border-green-500/20",
    Closed: "bg-white/5 text-gray-400 border border-white/10",
};

const BUDGET_LABELS: Record<string, string> = {
    "3L-8L": "₹3L – ₹8L", "8L-20L": "₹8L – ₹20L",
    "20L+": "₹20L+", "discuss": "Let's Discuss",
};

const PROJECT_LABELS: Record<string, string> = {
    website: "Custom Website", webapp: "Web Application", mobile: "Mobile App (Android & iOS)",
    infrastructure: "Full Digital Infrastructure", internal: "Internal System", unsure: "Not Sure Yet",
};

function inr(n: number) { return `₹${n.toLocaleString("en-IN")}`; }

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <span className="mt-0.5 text-gray-500">{icon}</span>
            <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</div>
                <div className="text-sm font-medium text-white mt-0.5">{value || "—"}</div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InquiryDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // ── Data state
    const [inquiry, setInquiry] = useState<Record<string, string | string[] | boolean | number | null | undefined> | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    // ── Editable fields
    const [callNotes, setCallNotes] = useState("");
    const [status, setStatus] = useState<Status>("New");

    // ── Pricing state
    const [selectedBase, setSelectedBase] = useState("");
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
    const [includeDeployment, setIncludeDeployment] = useState(true);
    const [maintenancePlan, setMaintenancePlan] = useState("basic");

    // ── UI state
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [generating, setGenerating] = useState(false);

    // ── Fetch inquiry
    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/inquiries/${id}`);
                if (res.status === 404) { setNotFound(true); return; }
                if (!res.ok) throw new Error();
                const data = await res.json();
                setInquiry(data);
                setCallNotes(data.callNotes || "");
                setStatus((data.status as Status) || "New");
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    // ── Calculations
    const base = BASE_OPTIONS.find(b => b.id === selectedBase);
    const addons = ADDONS.filter(a => selectedAddons.includes(a.id));
    const maintenance = MAINTENANCE_PLANS.find(m => m.id === maintenancePlan)!;

    const devTotal = (base?.price || 0) + addons.reduce((s, a) => s + a.price, 0);
    const deploymentCost = includeDeployment ? 5000 : 0;
    const maintenance3m = maintenance.price * 3;
    const totalInitial = devTotal + deploymentCost + maintenance3m;

    const rawWeeks = (base?.weeks || 0) + addons.reduce((s, a) => s + a.weeks, 0);
    const buffered = rawWeeks * 1.2;
    const timelineRange = selectedBase ? `${Math.floor(buffered)}–${Math.ceil(buffered + 0.9)} weeks` : "—";

    // ── Save notes + status
    const handleSave = async () => {
        setSaving(true);
        try {
            await fetch(`/api/admin/inquiries/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ callNotes, status }),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } finally {
            setSaving(false);
        }
    };

    // ── Generate PDF + save quote to Firestore
    const handleGeneratePDF = async () => {
        if (!selectedBase) return;
        setGenerating(true);

        const today = new Date();
        const validDate = new Date(today.getTime() + 7 * 86400000);
        const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

        const quotePayload = {
            inquiryId: id,
            clientName: inquiry?.fullName as string,
            companyName: inquiry?.companyName as string,
            email: inquiry?.email as string,
            projectType: base?.label || "",
            addons: addons.map(a => a.label),
            development: devTotal,
            deployment: deploymentCost,
            maintenanceMonthly: maintenance.price,
            maintenance3m,
            maintenancePlan: maintenance.label,
            total: totalInitial,
            recurring: maintenance.price,
            timeline: timelineRange,
            generatedDate: fmt(today),
            validUntil: fmt(validDate),
        };

        try {
            // Save quote to Firestore
            await fetch("/api/admin/quotes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quotePayload),
            });

            // Update inquiry status to Quoted
            await fetch(`/api/admin/inquiries/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "Quoted" }),
            });
            setStatus("Quoted");

            // Generate and download PDF
            const res = await fetch("/api/generate-quote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quotePayload),
            });
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `YBB-Quote-${(inquiry?.companyName as string || "Client").replace(/\s+/g, "-")}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } finally {
            setGenerating(false);
        }
    };

    const toggleAddon = (addonId: string) =>
        setSelectedAddons(prev =>
            prev.includes(addonId) ? prev.filter(x => x !== addonId) : [...prev, addonId]
        );

    // ── Loading / not found states
    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
            </div>
        );
    }

    if (notFound || !inquiry) {
        return (
            <div className="p-8 flex flex-col items-center justify-center min-h-screen text-center">
                <div className="text-4xl font-bold text-gray-500 mb-4">404</div>
                <p className="text-gray-400 mb-6">Inquiry not found.</p>
                <Link href="/admin" className="text-sm font-semibold text-blue-500 hover:underline">← Back to Inquiries</Link>
            </div>
        );
    }

    const fullName = inquiry.fullName as string;
    const companyName = inquiry.companyName as string;
    const email = inquiry.email as string;
    const website = inquiry.website as string || "";
    const features = (inquiry.features as string[]) || [];

    return (
        <div className="min-h-screen bg-black">

            {/* Top bar */}
            <div className="bg-[#0A0A0A] border-b border-white/5 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push("/admin/inquiries")} className="p-2 rounded-xl hover:bg-white/5 transition-colors text-gray-400">
                        <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Link href="/admin/inquiries" className="hover:text-gray-300">Inquiries</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="font-semibold text-white">{fullName}</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value as Status)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold border cursor-pointer focus:outline-none bg-transparent ${STATUS_STYLES[status]}`}
                    >
                        {(["New", "Reviewing", "Quoted", "Closed"] as Status[]).map(s => (
                            <option key={s} value={s} className="bg-black text-white">{s}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${saved ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-white/5 text-gray-300 hover:bg-white/10"
                            }`}
                    >
                        {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <Check className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
                        {saved ? "Saved" : saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 py-8 grid lg:grid-cols-12 gap-8 items-start">

                {/* ══ LEFT — Inquiry Detail ══ */}
                <div className="lg:col-span-5 space-y-5">

                    {/* Client card */}
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                            <h2 className="text-sm font-bold text-white">Client Information</h2>
                            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>
                                {status}
                            </span>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-5">
                            <InfoRow icon={<User className="w-4 h-4" />} label="Full Name" value={fullName} />
                            <InfoRow icon={<Building2 className="w-4 h-4" />} label="Company" value={companyName} />
                            <InfoRow icon={<Mail className="w-4 h-4" />} label="Email" value={email} />
                            <InfoRow icon={<Globe className="w-4 h-4" />} label="Website" value={website || "—"} />
                        </div>
                    </div>

                    {/* Project scope */}
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5">
                            <h2 className="text-sm font-bold text-white">Project Scope</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <InfoRow icon={<LayoutGrid className="w-4 h-4" />} label="Project Type"
                                value={PROJECT_LABELS[inquiry.projectType as string] || inquiry.projectType as string} />
                            <InfoRow icon={<FileText className="w-4 h-4" />} label="Pages" value={inquiry.pageCount as string || "—"} />
                            <InfoRow icon={<Target className="w-4 h-4" />} label="Goal" value={inquiry.primaryGoal as string} />
                            <InfoRow icon={<Calendar className="w-4 h-4" />} label="Timeline" value={inquiry.timeline as string || "—"} />
                            <InfoRow icon={<DollarSign className="w-4 h-4" />} label="Budget" value={BUDGET_LABELS[inquiry.budget as string] || inquiry.budget as string} />

                            {features.length > 0 && (
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Required Features</div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {features.map(f => (
                                            <span key={f} className="text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg px-2.5 py-1">{f}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {inquiry.targetAudience && (
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Target Audience</div>
                                    <p className="text-sm text-gray-300 font-light leading-relaxed">{inquiry.targetAudience as string}</p>
                                </div>
                            )}
                            {inquiry.references && (
                                <div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">References</div>
                                    <p className="text-sm text-gray-400 font-light">{inquiry.references as string}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Call notes */}
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5">
                            <h2 className="text-sm font-bold text-white">Call Notes</h2>
                        </div>
                        <div className="p-6">
                            <textarea
                                value={callNotes}
                                onChange={e => setCallNotes(e.target.value)}
                                placeholder="Add notes from discovery call, preferences, red flags..."
                                rows={5}
                                className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all resize-none font-light leading-relaxed"
                            />
                        </div>
                    </div>
                </div>

                {/* ══ RIGHT — Pricing Calculator ══ */}
                <div className="lg:col-span-7 space-y-5">

                    {/* A — Base */}
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">A</div>
                            <h2 className="text-sm font-bold text-white">Base Infrastructure</h2>
                        </div>
                        <div className="p-6 grid grid-cols-2 gap-3">
                            {BASE_OPTIONS.map(opt => {
                                const active = selectedBase === opt.id;
                                return (
                                    <button key={opt.id} type="button" onClick={() => setSelectedBase(active ? "" : opt.id)}
                                        className={`flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all ${active ? "border-blue-500/50 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-white/5 hover:border-white/10 hover:bg-white/5"}`}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span className={`text-sm font-bold ${active ? "text-blue-400" : "text-gray-200"}`}>{opt.label}</span>
                                            {active && <Check className="w-4 h-4 text-blue-500" />}
                                        </div>
                                        <span className="text-xs text-gray-500">{inr(opt.price)}</span>
                                        <span className="text-[10px] text-gray-600">{opt.weeks} week{opt.weeks > 1 ? "s" : ""}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* B — Add-ons */}
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">B</div>
                            <h2 className="text-sm font-bold text-white">Add-ons</h2>
                        </div>
                        <div className="p-6 space-y-3">
                            {ADDONS.map(addon => {
                                const active = selectedAddons.includes(addon.id);
                                return (
                                    <label key={addon.id} className="flex items-center justify-between cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div onClick={() => toggleAddon(addon.id)}
                                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${active ? "bg-blue-600 border-blue-600" : "border-white/10 group-hover:border-white/30"}`}
                                            >
                                                {active && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                            </div>
                                            <span onClick={() => toggleAddon(addon.id)} className="text-sm font-medium text-gray-300">{addon.label}</span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-semibold text-gray-400">{inr(addon.price)}</div>
                                            <div className="text-[10px] text-gray-600">+{addon.weeks} wk</div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* C — Deployment */}
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">C</div>
                            <h2 className="text-sm font-bold text-white">Deployment</h2>
                        </div>
                        <div className="p-6">
                            <label className="flex items-center justify-between cursor-pointer">
                                <div>
                                    <div className="text-sm font-semibold text-white">Include Deployment Setup</div>
                                    <div className="text-xs text-gray-500 mt-0.5">Server config, domain, CI/CD pipeline</div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-gray-300">₹5,000</span>
                                    <button type="button" onClick={() => setIncludeDeployment(p => !p)}
                                        className={`w-11 h-6 rounded-full transition-colors relative ${includeDeployment ? "bg-blue-600" : "bg-white/10"}`}
                                    >
                                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${includeDeployment ? "translate-x-6" : "translate-x-1"}`} />
                                    </button>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* D — Maintenance */}
                    <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">D</div>
                            <h2 className="text-sm font-bold text-white">Maintenance Plan</h2>
                            <span className="text-[10px] text-gray-500 font-medium ml-auto">3-month initial mandatory</span>
                        </div>
                        <div className="p-6 space-y-3">
                            {MAINTENANCE_PLANS.map(plan => {
                                const active = maintenancePlan === plan.id;
                                return (
                                    <label key={plan.id} onClick={() => setMaintenancePlan(plan.id)}
                                        className={`flex items-center justify-between cursor-pointer rounded-xl border p-4 transition-all ${active ? "border-blue-500/50 bg-blue-500/10" : "border-white/5 hover:border-white/10 hover:bg-white/5"}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${active ? "border-blue-500" : "border-white/10"}`}>
                                                {active && <div className="w-2 h-2 rounded-full bg-blue-500" />}
                                            </div>
                                            <div>
                                                <div className={`text-sm font-bold ${active ? "text-blue-400" : "text-gray-200"}`}>{plan.label}</div>
                                                <div className="text-xs text-gray-500">{plan.desc}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-bold text-gray-300">{inr(plan.price)}</div>
                                            <div className="text-[10px] text-gray-600">per month</div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-[#050505] rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-5 border-b border-white/5">
                            <h2 className="text-sm font-bold text-white">Estimation Summary</h2>
                            <p className="text-xs text-gray-500 mt-0.5">Auto-calculated · Updates live</p>
                        </div>
                        <div className="p-6 space-y-3">
                            {[
                                { label: "Development Total", value: inr(devTotal), muted: devTotal === 0 },
                                { label: "Deployment", value: includeDeployment ? inr(5000) : "—" },
                                { label: `Maintenance × 3 months (${inr(maintenance.price)}/mo)`, value: inr(maintenance3m) },
                            ].map(r => (
                                <div key={r.label} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">{r.label}</span>
                                    <span className={`text-sm font-semibold ${r.muted ? "text-gray-600" : "text-white"}`}>{r.value}</span>
                                </div>
                            ))}
                            <div className="border-t border-white/10 pt-3 mt-1">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-bold text-white">Total Initial Investment</span>
                                    <span className="text-xl font-bold text-blue-400">{selectedBase ? inr(totalInitial) : "—"}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Monthly Recurring</span>
                                    <span className="text-sm font-semibold text-gray-300">{inr(maintenance.price)}/mo</span>
                                </div>
                            </div>
                            <div className="bg-black border border-white/5 rounded-xl p-4 mt-2">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Estimated Timeline</div>
                                <div className="text-2xl font-bold text-white">{timelineRange}</div>
                                <div className="text-[10px] text-gray-600 mt-0.5">Includes 20% revision buffer</div>
                            </div>
                            <button
                                type="button"
                                disabled={!selectedBase || generating}
                                onClick={handleGeneratePDF}
                                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-blue-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {generating
                                    ? <><Loader2 className="w-4 h-4 animate-spin" />Generating PDF...</>
                                    : <><Download className="w-4 h-4" />Generate & Download Quote</>}
                            </button>
                            {!selectedBase && (
                                <p className="text-center text-xs text-gray-500">Select a base type above to generate a quote.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
