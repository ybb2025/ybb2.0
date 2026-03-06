"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
    {
        id: "projectType",
        title: "What would you like to build?",
        options: [
            { label: "Website", icon: "🌐" },
            { label: "SaaS App", icon: "🚀" },
            { label: "Mobile App", icon: "📱" },
            { label: "AI Tool", icon: "🤖" },
            { label: "Dashboard", icon: "📊" },
        ]
    },
    {
        id: "stage",
        title: "Where are you in the process?",
        options: [
            { label: "Just an idea" },
            { label: "MVP / prototype" },
            { label: "Existing product redesign" },
            { label: "Scaling an existing system" },
        ]
    },
    {
        id: "budget",
        title: "What is your estimated budget for this project?",
        subtitle: "This helps us recommend the right solution.",
        options: [
            { label: "₹10k – ₹25k" },
            { label: "₹25k – ₹50k" },
            { label: "₹50k – ₹1L" },
            { label: "₹1L – ₹1.5L" },
            { label: "₹1.5L+" },
            { label: "Not sure yet" },
        ]
    },
    {
        id: "timeline",
        title: "When do you want to launch?",
        options: [
            { label: "ASAP" },
            { label: "1–2 months" },
            { label: "3–6 months" },
            { label: "Just exploring" },
        ]
    },
    {
        id: "contact",
        title: "Tell us a bit about yourself.",
        isForm: true
    }
];

const inputCls =
    "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-all font-light relative z-20 pointer-events-auto shadow-sm";

export default function ContactPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [form, setForm] = useState<Record<string, string>>({
        projectType: "",
        stage: "",
        budget: "",
        timeline: "",
        fullName: "",
        email: "",
        companyName: "",
        description: "",
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const setField = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

    const handleOptionSelect = (stepId: string, value: string) => {
        setField(stepId, value);
        if (currentStep < STEPS.length - 1) {
            setTimeout(() => setCurrentStep((prev) => prev + 1), 300);
        }
    };

    const isContactFormValid =
        form.fullName.trim() && form.email.trim() && form.description.trim();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const step = STEPS[currentStep];
            if (step.isForm) return;

            const num = parseInt(e.key);
            if (!isNaN(num) && step.options && num > 0 && num <= step.options.length) {
                e.preventDefault();
                handleOptionSelect(step.id, step.options[num - 1].label);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentStep, form]);

    const handleSubmit = async (e?: FormEvent) => {
        if (e) e.preventDefault();
        if (!isContactFormValid) return;
        setSubmitting(true);
        setError("");

        try {
            const payload = {
                ...form,
                fullName: form.fullName.trim(),
                email: form.email.trim(),
                companyName: form.companyName.trim(),
                description: form.description.trim(),
                source: "frictionless_intake",
                status: "New",
            };

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to submit inquiry");

            setSubmitted(true);
        } catch (err) {
            console.error("Firebase API Error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const currentStepData = STEPS[currentStep];

    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D1117] flex flex-col transition-colors duration-300">
            {/* Background orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-15%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/60 dark:bg-blue-900/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/15 blur-[100px]" />
                <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative z-10 flex flex-1 items-center justify-center px-5 pt-36 pb-20">
                <div className="w-full max-w-xl">
                    {submitted ? (
                        <SuccessState email={form.email} />
                    ) : (
                        <div className="relative z-20 pointer-events-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-3xl shadow-xl dark:shadow-2xl p-8 md:p-10">

                            {/* Progress Bar & Back Button */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                    Step {currentStep + 1} of {STEPS.length}
                                </div>
                                <div className="flex gap-1.5">
                                    {STEPS.map((_, i) => (
                                        <div
                                            key={i}
                                            className={`h-1.5 w-1.5 sm:w-8 rounded-full transition-all duration-300 ${i === currentStep
                                                ? 'bg-blue-600 dark:bg-blue-500 w-4 sm:w-8'
                                                : i < currentStep
                                                    ? 'bg-blue-600/40 dark:bg-blue-500/40'
                                                    : 'bg-slate-200 dark:bg-slate-800'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Title */}
                            <div className="mb-6 flex items-start gap-3">
                                {currentStep > 0 && (
                                    <button
                                        onClick={() => setCurrentStep(p => p - 1)}
                                        className="mt-1 p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 dark:text-slate-500 disabled:opacity-50"
                                        aria-label="Go back"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                )}
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-snug">
                                        {currentStepData.title}
                                    </h1>
                                    {'subtitle' in currentStepData && currentStepData.subtitle && (
                                        <p className="text-sm text-slate-500 dark:text-slate-400 font-light mt-2">
                                            {currentStepData.subtitle as string}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                >
                                    {!currentStepData.isForm ? (
                                        <div className="grid grid-cols-1 gap-3">
                                            {currentStepData.options?.map((opt: any, i) => {
                                                const isSelected = form[currentStepData.id] === opt.label;
                                                return (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleOptionSelect(currentStepData.id, opt.label)}
                                                        className={`group relative flex items-center justify-between w-full p-4 rounded-xl border text-left transition-all overflow-hidden ${isSelected
                                                            ? 'border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-sm'
                                                            : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/80 shadow-sm hover:shadow-md'
                                                            }`}
                                                    >
                                                        {isSelected && (
                                                            <motion.div
                                                                layoutId="activeIndicator"
                                                                className="absolute inset-0 border-2 border-blue-600 dark:border-blue-500 rounded-xl"
                                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                                            />
                                                        )}
                                                        <div className="flex items-center gap-4 relative z-10">
                                                            <div className={`flex items-center justify-center w-6 h-6 rounded text-[11px] font-mono transition-colors ${isSelected
                                                                ? 'bg-blue-600 dark:bg-blue-500 text-white'
                                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
                                                                }`}>
                                                                {i + 1}
                                                            </div>
                                                            <span className={`font-medium transition-colors ${isSelected
                                                                ? 'text-blue-900 dark:text-blue-100'
                                                                : 'text-slate-700 dark:text-slate-300'
                                                                }`}>
                                                                {opt.icon && <span className="mr-2 text-lg">{opt.icon}</span>}
                                                                {opt.label}
                                                            </span>
                                                        </div>
                                                        <div className={`w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center transition-colors relative z-10 ${isSelected ? 'border-blue-600 dark:border-blue-500 bg-blue-600 dark:bg-blue-500' : ''}`}>
                                                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Your name *</label>
                                                    <input required type="text" value={form.fullName}
                                                        onChange={e => setField("fullName", e.target.value)}
                                                        placeholder="John Doe" className={inputCls} />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Email *</label>
                                                    <input required type="email" value={form.email}
                                                        onChange={e => setField("email", e.target.value)}
                                                        placeholder="john@company.com" className={inputCls} />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                                                    Company (optional)
                                                </label>
                                                <input type="text" value={form.companyName}
                                                    onChange={e => setField("companyName", e.target.value)}
                                                    placeholder="Your company name" className={inputCls} />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Tell us about your idea... *</label>
                                                <textarea required rows={4} value={form.description}
                                                    onChange={e => setField("description", e.target.value)}
                                                    placeholder="Briefly describe your goals, budget, or timeline."
                                                    className={`${inputCls} resize-none leading-relaxed`} />
                                            </div>

                                            {error && (
                                                <p className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl px-4 py-3">{error}</p>
                                            )}

                                            <div className="pt-4">
                                                <button
                                                    type="submit"
                                                    disabled={submitting || !isContactFormValid}
                                                    className="w-full relative group overflow-hidden rounded-xl bg-blue-600 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                                >
                                                    <div className="relative z-10 flex items-center justify-center gap-2">
                                                        {submitting ? (
                                                            <>
                                                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                                                </svg>
                                                                Processing Inquiry...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Start the Conversation
                                                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                            </>
                                                        )}
                                                    </div>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </button>
                                            </div>
                                            <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 font-light mt-4">
                                                Takes less than 30 seconds.
                                            </p>
                                        </form>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

// Success state
function SuccessState({ email }: { email: string }) {
    return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 rounded-3xl shadow-[0_20px_60px_rgba(37,99,235,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-10 flex flex-col items-center text-center gap-5 relative z-20 pointer-events-auto">
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
