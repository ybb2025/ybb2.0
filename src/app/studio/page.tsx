"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    Search,
    PenTool,
    Code2,
    Rocket,
    CheckCircle2,
    Layers,
    Cpu,
    Globe, Shield, Zap
} from "lucide-react";

export default function StudioPage() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const isDark = mounted && resolvedTheme === "dark";

    const methodology = [
        {
            icon: Search,
            title: "Discovery & Architecture",
            desc: "We dive deep into your business logic, defining the exact system architecture, database models, and critical paths before a single line of code is written.",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            icon: PenTool,
            title: "Premium Interface Design",
            desc: "Every pixel is intentional. We build cohesive, operating-system-level design systems that look premium, feel fast, and drive user engagement.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
        },
        {
            icon: Code2,
            title: "Full-Stack Engineering",
            desc: "Leveraging modern frameworks, we write clean, scalable, and heavily typed code. Our infrastructure is built to handle high loads securely.",
            color: "text-amber-500",
            bg: "bg-amber-500/10",
        },
        {
            icon: Rocket,
            title: "Deployment & Scaling",
            desc: "Seamless zero-downtime deployments, global edge networks, and continuous monitoring to ensure your product remains fast and reliable at all times.",
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
        }
    ];

    const techStack = [
        { name: "Next.js & React", category: "Frontend Framework" },
        { name: "TypeScript", category: "Type Safety" },
        { name: "Tailwind CSS", category: "Styling & Design Systems" },
        { name: "Firebase & Supabase", category: "Backend Infrastructure" },
        { name: "Framer Motion", category: "Micro-animations" },
        { name: "Vercel & Netlify", category: "Edge Deployment" },
    ];

    return (
        <main className="min-h-screen selection:bg-blue-600/20 selection:text-blue-900 dark:selection:text-blue-300 relative overflow-x-hidden">
            {/* ── PAGE BACKGROUND ──────────────────────────────────────────── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="page-bg absolute inset-0 transition-colors duration-500" />
                <div className="dot-grid absolute inset-0" />
                <div
                    className="absolute top-[-15%] left-[20%] h-[700px] w-[700px] rounded-full blur-[160px] transition-colors duration-500"
                    style={{ background: "var(--c-orb-1)" }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-8%] h-[600px] w-[600px] rounded-full blur-[140px] transition-colors duration-500"
                    style={{ background: "var(--c-orb-2)" }}
                />
            </div>

            {/* ══ HERO SECTION ════════════════════════════════════════════ */}
            <section className="relative z-10 w-full pt-36 pb-20 lg:pt-44 lg:pb-28">
                <div className="max-w-[1000px] mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] mx-auto rounded-full transition-colors duration-300 bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 mb-6 shadow-sm">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                        </span>
                        Inside The Studio
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.05] mb-6">
                        We Build Digital <br className="hidden md:block" />
                        <span className="italic font-serif text-blue-600 dark:text-blue-400">Masterpieces.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto mb-10">
                        At Your Brand Builders, we operate as a boutique engineering studio.
                        We combine cutting-edge technology with rigorous design principles to create software that feels exceptional.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white px-8 py-3.5 text-sm font-bold text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Start a Project <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/work"
                            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-8 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all backdrop-blur-sm"
                        >
                            View Our Work
                        </Link>
                    </div>
                </div>
            </section>

            {/* ══ THE PHILOSOPHY ══════════════════════════════════════════ */}
            <section className="relative z-10 w-full pb-20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div
                        className="rounded-[32px] overflow-hidden p-8 md:p-12 lg:p-16 relative"
                        style={{
                            background: "var(--c-surface-high)",
                            border: "1px solid var(--c-border-soft)",
                            boxShadow: "var(--c-shadow-panel)",
                            backdropFilter: "blur(20px)",
                        }}
                    >
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
                                    Quality is our <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">highest priority.</span>
                                </h2>
                                <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed font-light text-lg">
                                    <p>
                                        We reject the "fast and cheap" model. We believe that your digital presence
                                        is the absolute core of your brand's authority. If it doesn't function flawlessly
                                        and look stunning, it's hurting your reputation.
                                    </p>
                                    <p>
                                        Our studio operates with the precision of a software engineering firm and the
                                        aesthetic eye of a high-end design agency. We obsess over milliseconds of load time,
                                        fluid animations, and impenetrable security layers so you don't have to.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { icon: Shield, title: "Uncompromising Security", desc: "Enterprise-grade protection by default." },
                                    { icon: Zap, title: "Blazing Performance", desc: "Optimized delivery at the global edge." },
                                    { icon: Globe, title: "Scalable Architecture", desc: "Built to handle your next growth phase." },
                                    { icon: Cpu, title: "Future-Proof Tech", desc: "No legacy code. Only modern standards." },
                                ].map((item, i) => (
                                    <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:-translate-y-1">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">{item.title}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ THE METHODOLOGY ══════════════════════════════════════════ */}
            <section className="relative z-10 w-full py-20 border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                            How We Work
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            A structured, transparent engineering process that guarantees results on time and above expectations.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {methodology.map((step, i) => (
                            <div key={i} className="relative group">
                                <div className="absolute top-8 left-8 right-0 h-px bg-slate-200 dark:bg-slate-700 hidden lg:block group-last:hidden" />
                                <div className="relative z-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-[24px] p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 font-bold text-lg ${step.bg} ${step.color}`}>
                                        <step.icon className="w-6 h-6" />
                                    </div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                                        Phase 0{i + 1}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ THE TECH STACK ══════════════════════════════════════════ */}
            <section className="relative z-10 w-full py-24">
                <div className="max-w-[1000px] mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        The Engine Room
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">
                        We don't rely on bloated, outdated platforms. We build custom applications using the same modern tech stack powering the world's leading tech companies.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {techStack.map((tech, i) => (
                            <div
                                key={i}
                                className="flex items-center gap-3 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-full px-5 py-3 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-default shadow-sm lg:px-6 lg:py-4"
                            >
                                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                <div className="text-left">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">{tech.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ INSIGHTS & GUIDES (GEO) ══════════════════════════════════ */}
            <section className="relative z-10 w-full py-32 border-t border-slate-200/50 dark:border-slate-800/50">
                <div className="max-w-[1200px] mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Industry Insights.
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 font-light mt-4">
                                Strategic engineering perspectives for forward-thinking brands.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Best School Website Design in India (2026 Guide)",
                                excerpt: "How digital admission systems and high-performance infrastructure are redefining educational brands.",
                                link: "/guides/school-website-design-india",
                                tag: "Industry Guide"
                            }
                        ].map((post, i) => (
                            <Link key={i} href={post.link} className="group relative p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">{post.tag}</div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-8">{post.excerpt}</p>
                                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                                    Read Guide <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
