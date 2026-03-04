"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";

const FIELD_CLS = "w-full bg-[#0A0A0A] border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all placeholder-gray-600";

interface Config {
    staticWebsite: number; dynamicWebsite: number; androidApp: number; iosApp: number;
    deployment: number; adminDashboard: number; paymentGateway: number; cms: number; apiIntegration: number;
    maintenanceBasic: number; maintenanceGrowth: number; maintenanceAdvanced: number;
    timelineBuffer: number;
}

const DEFAULT: Config = {
    staticWebsite: 10000, dynamicWebsite: 20000, androidApp: 20000, iosApp: 40000,
    deployment: 5000, adminDashboard: 5000, paymentGateway: 10000, cms: 5000, apiIntegration: 5000,
    maintenanceBasic: 10000, maintenanceGrowth: 15000, maintenanceAdvanced: 20000,
    timelineBuffer: 20,
};

export default function SettingsPage() {
    const [config, setConfig] = useState<Config>(DEFAULT);
    const [saved, setSaved] = useState(false);

    const set = (k: keyof Config, v: string) => setConfig(p => ({ ...p, [k]: Number(v) || 0 }));

    const handleSave = () => {
        // In a future version, persist to Firestore settings document
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5">
                <h2 className="text-sm font-bold text-white">{title}</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{children}</div>
        </div>
    );

    const Field = ({ label, k, prefix = "₹" }: { label: string; k: keyof Config; prefix?: string }) => (
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{label}</label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">{prefix}</span>
                <input type="number" value={config[k]} onChange={e => set(k, e.target.value)}
                    className={`${FIELD_CLS} pl-8`}
                />
            </div>
        </div>
    );

    return (
        <div className="p-8 max-w-4xl">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
                    <p className="text-sm text-gray-400 mt-1">Pricing defaults used by the estimation calculator</p>
                </div>
                <button onClick={handleSave}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${saved ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]"}`}
                >
                    {saved ? <><Check className="w-4 h-4" />Saved</> : <><Save className="w-4 h-4" />Save Changes</>}
                </button>
            </div>

            <div className="space-y-6">
                <Section title="Base Infrastructure Pricing (₹)">
                    <Field label="Static Website" k="staticWebsite" />
                    <Field label="Dynamic Website" k="dynamicWebsite" />
                    <Field label="Android App" k="androidApp" />
                    <Field label="iOS App" k="iosApp" />
                </Section>

                <Section title="Add-on Pricing (₹)">
                    <Field label="Admin Dashboard" k="adminDashboard" />
                    <Field label="Payment Gateway" k="paymentGateway" />
                    <Field label="CMS / Blog" k="cms" />
                    <Field label="API Integration" k="apiIntegration" />
                    <Field label="Deployment Setup" k="deployment" />
                </Section>

                <Section title="Maintenance Plans (₹/month)">
                    <Field label="Basic" k="maintenanceBasic" />
                    <Field label="Growth" k="maintenanceGrowth" />
                    <Field label="App Advanced" k="maintenanceAdvanced" />
                </Section>

                <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/5">
                        <h2 className="text-sm font-bold text-white">Timeline Settings</h2>
                    </div>
                    <div className="p-6 max-w-xs">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Revision Buffer</label>
                            <div className="relative">
                                <input type="number" value={config.timelineBuffer} onChange={e => set("timelineBuffer", e.target.value)}
                                    className={`${FIELD_CLS} pr-8`}
                                />
                                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-2">Added to raw week estimate. Default: 20%</p>
                        </div>
                    </div>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-4 text-xs text-amber-400">
                    <strong className="text-amber-300">Note:</strong> Settings are currently stored in memory only. Firestore persistence for pricing config will be added in the next update.
                </div>
            </div>
        </div>
    );
}
