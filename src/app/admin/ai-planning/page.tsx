"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
    Sparkles, FileText, CheckCircle2, ChevronRight, Download, BrainCircuit, Activity,
    Code, Server, Zap, Copy, Bot
} from "lucide-react";

interface Inquiry {
    id: string;
    fullName: string;
    companyName?: string;
    projectType?: string;
    budget?: string;
    projectDetails?: string;
    aiBlueprint?: string;
    status: string;
}

const PROJECT_LABELS: Record<string, string> = {
    "Website": "Website",
    "SaaS App": "SaaS Platform",
    "Mobile App": "Mobile Application",
    "AI Tool": "AI Agent / Tool",
    "Dashboard": "Admin Dashboard",
};

export default function AIPlanningPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading AI Studio...</div>}>
            <AIPlanningContent />
        </Suspense>
    );
}

function AIPlanningContent() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
    const [loading, setLoading] = useState(true);

    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
    const [activePrompt, setActivePrompt] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const inquiryId = searchParams.get("inquiryId");

    useEffect(() => {
        fetch("/api/admin/inquiries")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setInquiries(data);
                    // Deep link support
                    if (inquiryId) {
                        const target = data.find(i => i.id === inquiryId);
                        if (target) setSelectedInquiry(target);
                    }
                }
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [inquiryId]);

    const handleGenerate = async () => {
        if (!selectedInquiry) return;
        setIsGenerating(true);
        // Simulate Gemini/AI generation or use actual pre-generated blueprint
        setTimeout(() => {
            setGeneratedPlan(selectedInquiry.aiBlueprint || "No AI Blueprint found for this inquiry. Please ensure the lead passed through the intake flow correctly.");
            setIsGenerating(false);
        }, 1500);
    };

    const handleCreateAntigravityPrompt = () => {
        if (!selectedInquiry || !generatedPlan) return;
        const prompt = `Use the following project blueprint to construct the core structure:
${generatedPlan}

Please set up a Next.js + Tailwind project and begin scaffolding the features listed in Phase 1 above. Use a modern, minimalistic design.`;
        setActivePrompt(prompt);
    };

    return (
        <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-[12px] flex items-center justify-center shadow-sm">
                            <BrainCircuit className="w-5 h-5" />
                        </div>
                        AI Architecture Studio
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm max-w-xl">
                        Select a validated client inquiry to autogenerate software blueprints, architecture plans, and Antigravity prompts.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">

                {/* ══ Left Sidebar (Lead Selection) ══ */}
                <div className="lg:col-span-4 flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                    {loading ? (
                        <div className="text-sm text-slate-500 text-center py-8">Loading leads...</div>
                    ) : (
                        inquiries.filter(i => i.status !== "Closed").map(inq => (
                            <button
                                key={inq.id}
                                onClick={() => {
                                    setSelectedInquiry(inq);
                                    setGeneratedPlan(null);
                                    setActivePrompt(null);
                                }}
                                className={`text-left p-4 rounded-xl border transition-all duration-200 shadow-sm ${selectedInquiry?.id === inq.id
                                    ? "bg-[#18181B] border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]"
                                    : "bg-[#111113] border-slate-800/60 hover:border-slate-700 hover:bg-[#18181B] cursor-pointer"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-bold text-slate-200">{inq.fullName}</div>
                                    <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700/50 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">
                                        {PROJECT_LABELS[inq.projectType ?? ""] || inq.projectType || "TBD"}
                                    </span>
                                </div>
                                <div className="text-xs text-slate-500 font-medium line-clamp-2">
                                    {inq.projectDetails || "No further details."}
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold tracking-wide px-2 rounded-md py-0.5 shadow-sm">
                                        {inq.budget || "?"}
                                    </span>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* ══ Main Pipeline Area ══ */}
                <div className="lg:col-span-8 bg-[#111113] border border-slate-800/60 rounded-2xl shadow-xl p-6 min-h-[500px] flex flex-col relative overflow-hidden">
                    {/* Decorative bg */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

                    {!selectedInquiry ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 bg-[#18181B] border border-slate-800 text-slate-500 rounded-full flex items-center justify-center mb-4 shadow-inner">
                                <Sparkles className="w-8 h-8 opacity-50" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-200 mb-2 tracking-wide">No Project Selected</h3>
                            <p className="text-slate-500 max-w-sm text-sm">
                                Select an active lead from the sidebar to begin analyzing their requirements and generating a system architecture.
                            </p>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col z-10 space-y-8">

                            {/* Phase 1: Requirement Analysis */}
                            <div>
                                <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-3">
                                    <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs shadow-sm">1</span>
                                    Structured Requirements
                                </h3>
                                <div className="bg-[#0A0A0B] border border-slate-800/60 text-slate-400 p-5 rounded-2xl font-mono text-xs overflow-x-auto shadow-inner leading-relaxed">
                                    <pre className="whitespace-pre-wrap">
                                        {JSON.stringify({
                                            client: selectedInquiry.fullName,
                                            company: selectedInquiry.companyName || "N/A",
                                            projectType: selectedInquiry.projectType,
                                            budgetRange: selectedInquiry.budget,
                                            intent: selectedInquiry.projectDetails
                                        }, null, 2)}
                                    </pre>
                                </div>
                            </div>

                            {/* Phase 2: Generation Action */}
                            <div className="flex justify-center border-y border-slate-800/60 py-8">
                                {!generatedPlan ? (
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] transition-all active:scale-95 flex items-center gap-2 border border-indigo-500"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Activity className="w-5 h-5 animate-pulse" />
                                                Synthesizing Plan...
                                            </>
                                        ) : (
                                            <>
                                                <Bot className="w-5 h-5" />
                                                Generate AI Project Blueprint
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="text-emerald-400 font-bold tracking-wide flex items-center gap-2 bg-emerald-500/10 px-6 py-3 rounded-xl border border-emerald-500/20 shadow-sm">
                                        <CheckCircle2 className="w-5 h-5" />
                                        Blueprint successfully generated.
                                    </div>
                                )}
                            </div>

                            {/* Phase 3: Generated Blueprint Display */}
                            {generatedPlan && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs shadow-sm">2</span>
                                        AI System Blueprint
                                    </h3>
                                    <div className="bg-[#0A0A0B] border border-slate-800/60 p-6 rounded-2xl text-sm text-slate-300 whitespace-pre-wrap font-sans leading-relaxed max-h-[300px] overflow-y-auto mb-8 custom-scrollbar shadow-inner">
                                        {generatedPlan}
                                    </div>

                                    {/* Agent Delivery */}
                                    <h3 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-3">
                                        <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs shadow-sm">3</span>
                                        Agent Delivery
                                    </h3>

                                    {!activePrompt ? (
                                        <button
                                            onClick={handleCreateAntigravityPrompt}
                                            className="w-full border-2 border-dashed border-slate-700 hover:border-indigo-500/50 hover:bg-[#18181B] text-slate-400 font-bold tracking-wide py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                                        >
                                            <Code className="w-4 h-4" />
                                            Build Antigravity Execution Prompt
                                        </button>
                                    ) : (
                                        <div className="bg-[#18181B] border border-slate-800 p-1.5 rounded-2xl shadow-lg">
                                            <div className="relative bg-[#0A0A0B] border border-slate-800/60 text-slate-300 p-5 rounded-xl font-mono text-xs overflow-x-auto shadow-inner">
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(activePrompt || "")}
                                                    className="absolute top-3 right-3 hover:bg-slate-800 p-2 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                                                    title="Copy to clipboard"
                                                >
                                                    <Copy className="w-4 h-4 text-slate-400 hover:text-indigo-400 transition-colors" />
                                                </button>
                                                <pre className="whitespace-pre-wrap pr-12 leading-relaxed text-slate-400">{activePrompt}</pre>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
