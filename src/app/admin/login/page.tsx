"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldCheck, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

function AdminLoginInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "/admin";

    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: "admin@ybb.com", // Hidden as per request to remove identifier field
                    password
                }),
            });

            if (res.ok) {
                router.push(from);
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Access Denied.");
            }
        } catch {
            setError("Authentication failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#02040A] flex items-center justify-center px-4 relative overflow-hidden selection:bg-indigo-500/30">

            {/* Background: Subtle Deep Studio Glows */}
            <div className="absolute top-[-20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-slate-900/20 blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

            <div className="relative w-full max-w-sm">

                {/* Brand / Logo */}
                <div className="flex flex-col items-center mb-10">
                    <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-white text-lg tracking-wide shadow-[0_0_30px_rgba(79,70,229,0.3)] mb-6 animate-pulse">
                        YBB
                    </div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Jarvis OS</h1>
                    <p className="text-sm text-slate-500 font-medium mt-1 tracking-widest uppercase opacity-60">Control Interface v2.0</p>
                </div>

                {/* Main Access Card */}
                <div className="backdrop-blur-2xl bg-slate-950/40 border border-slate-800/60 rounded-[32px] shadow-2xl p-10">

                    <div className="flex items-center gap-2.5 mb-8">
                        <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">System Authentication</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Access Key (Password) */}
                        <div className="space-y-2.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                                Command Access Key
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    autoFocus
                                    type={showPass ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-5 py-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 transition-all font-mono tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(p => !p)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors p-1"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Feedback */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-red-500 text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full flex items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] disabled:opacity-40 disabled:cursor-not-allowed group active:scale-[0.98]"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin text-indigo-200" />Initializing...</>
                            ) : (
                                <>
                                    <span>Establish Connection</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                    </form>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.25em]">
                        Your Brand Builders
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-slate-700" />
                        <div className="h-1 w-1 rounded-full bg-slate-700" />
                        <div className="h-1 w-1 rounded-full bg-slate-700" />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default function AdminLogin() {
    return (
        <Suspense fallback={null}>
            <AdminLoginInner />
        </Suspense>
    );
}
