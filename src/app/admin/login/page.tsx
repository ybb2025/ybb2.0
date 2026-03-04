"use client";

import { useState, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react";

function AdminLoginInner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const from = searchParams.get("from") || "/admin";

    const [email, setEmail] = useState("");
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
                body: JSON.stringify({ email, password }),
            });

            if (res.ok) {
                router.push(from);
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Invalid credentials.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F4F8FC] flex items-center justify-center px-4 relative overflow-hidden">

            {/* Background */}
            <div className="absolute top-[-15%] left-[-10%] h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-15%] right-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-100/50 blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="relative w-full max-w-sm">

                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="h-14 w-14 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-white text-base tracking-wide shadow-[0_8px_24px_rgba(37,99,235,0.35)] mb-4">
                        YBB
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">YBB Operating System</h1>
                    <p className="text-sm text-slate-500 font-light mt-1">Admin access only</p>
                </div>

                {/* Card */}
                <div className="backdrop-blur-xl bg-white/60 border border-white/70 rounded-3xl shadow-[0_20px_60px_rgba(37,99,235,0.09)] p-8">

                    <div className="flex items-center gap-2 mb-6">
                        <ShieldCheck className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">Secure Login</span>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Email Address
                            </label>
                            <input
                                required
                                autoFocus
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="admin@ybb.com"
                                className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    required
                                    type={showPass ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/80 border border-slate-200 rounded-xl px-4 py-3 pr-11 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(p => !p)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-xs font-medium text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !email || !password}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" />Authenticating...</>
                            ) : (
                                "Access Admin Panel"
                            )}
                        </button>

                    </form>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6 font-light">
                    Restricted to authorised YBB team members only.
                </p>

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
