"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase-client";
import { CheckCircle2 } from "lucide-react";

const BUDGETS = [
    { value: "", label: "Estimated Budget (optional)" },
    { value: "10k-30k", label: "₹10K – ₹30K" },
    { value: "30k-75k", label: "₹30K – ₹75K" },
    { value: "75k+", label: "₹75K+" },
    { value: "unsure", label: "Not sure yet" },
];

const inputCls =
    "w-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-all font-light";

export default function ContactPage() {
    const [form, setForm] = useState({
        fullName: "", email: "", company: "", description: "", budget: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const set = (k: keyof typeof form, v: string) =>
        setForm(p => ({ ...p, [k]: v }));

    const isValid = form.fullName.trim() && form.email.trim() && form.description.trim();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!isValid) return;
        setSubmitting(true);
        setError("");
        try {
            await addDoc(collection(db, "inquiries"), {
                fullName: form.fullName.trim(),
                email: form.email.trim(),
                companyName: form.company.trim() || null,
                description: form.description.trim(),
                budget: form.budget || null,
                source: "minimal_contact_form",
                status: "New",
                callNotes: "",
                projectType: "unsure",
                primaryGoal: form.description.trim(),
                features: [],
                createdAt: serverTimestamp(),
            });
            setSubmitted(true);
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D1117] flex flex-col transition-colors duration-300">

            {/* Background orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/60 dark:bg-blue-900/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/15 blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>



            {/* Content */}
            <div className="relative z-10 flex flex-1 items-center justify-center px-5 pt-36 pb-20">
                <div className="w-full max-w-xl">

                    {/* Headline */}
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50/70 dark:bg-blue-900/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                            </span>
                            Open to projects
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.1] mb-4">
                            Start a Project.
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed max-w-sm mx-auto">
                            Tell us what you&apos;re building. We&apos;ll handle the infrastructure.
                        </p>
                    </div>

                    {/* Card */}
                    {submitted ? (
                        <SuccessState email={form.email} />
                    ) : (
                        <form onSubmit={handleSubmit}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 rounded-3xl shadow-[0_20px_60px_rgba(37,99,235,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 md:p-10 space-y-5"
                        >

                            {/* Row: Name + Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Full Name *</label>
                                    <input required type="text" value={form.fullName}
                                        onChange={e => set("fullName", e.target.value)}
                                        placeholder="John Doe" className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Email *</label>
                                    <input required type="email" value={form.email}
                                        onChange={e => set("email", e.target.value)}
                                        placeholder="john@company.com" className={inputCls} />
                                </div>
                            </div>

                            {/* Company */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                    Company <span className="text-slate-300 dark:text-slate-600 normal-case font-normal tracking-normal">/ optional</span>
                                </label>
                                <input type="text" value={form.company}
                                    onChange={e => set("company", e.target.value)}
                                    placeholder="Your company or project name" className={inputCls} />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">What are you building? *</label>
                                <textarea required rows={4} value={form.description}
                                    onChange={e => set("description", e.target.value)}
                                    placeholder="Briefly describe your idea or system."
                                    className={`${inputCls} resize-none leading-relaxed`} />
                            </div>

                            {/* Budget */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Estimated Budget</label>
                                <div className="relative">
                                    <select value={form.budget}
                                        onChange={e => set("budget", e.target.value)}
                                        className={`${inputCls} appearance-none pr-10 cursor-pointer`}
                                    >
                                        {BUDGETS.map(b => (
                                            <option key={b.value} value={b.value} className="bg-white dark:bg-slate-800">{b.label}</option>
                                        ))}
                                    </select>
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3">{error}</p>
                            )}

                            {/* Submit */}
                            <button type="submit" disabled={submitting || !isValid}
                                className="w-full rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_24px_rgba(37,99,235,0.3)] active:scale-[.99] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    "Start the Conversation →"
                                )}
                            </button>

                            <p className="text-center text-xs text-slate-400 dark:text-slate-500 font-light">
                                We review every serious inquiry within 48 hours.
                            </p>
                        </form>
                    )}
                </div>
            </div>

        </main>
    );
}

// Success state
function SuccessState({ email }: { email: string }) {
    return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 rounded-3xl shadow-[0_20px_60px_rgba(37,99,235,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-10 flex flex-col items-center text-center gap-5">
            <div className="h-16 w-16 rounded-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-500 dark:text-green-400" />
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">Inquiry received.</h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-light leading-relaxed max-w-xs">
                    We got your message and will reach out to{" "}
                    <span className="font-medium text-slate-700 dark:text-slate-300">{email}</span>{" "}
                    within 48 hours.
                </p>
            </div>
            <div className="w-full border-t border-slate-100 dark:border-slate-700 pt-5">
                <Link href="/" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                    ← Back to YBB
                </Link>
            </div>
        </div>
    );
}
