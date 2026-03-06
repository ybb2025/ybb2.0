"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ExternalLink, ArrowLeft, ArrowRight, CheckCircle2,
    Clock, Smartphone, Building2, Globe, Cpu, Layers, Target
} from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { FadeIn } from "@/components/ui/FadeIn";
import { Magnetic } from "@/components/ui/Magnetic";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen selection:bg-blue-600/20 relative overflow-x-hidden pb-24">
            <ScrollProgress />

            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="page-bg absolute inset-0" />
                <div className="blueprint-grid absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" />
            </div>

            {/* ─── 1. HERO SECTION ─── */}
            <section className="relative z-10 pt-32 lg:pt-48 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <FadeIn direction="down" className="mb-8">
                        <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Work
                        </Link>
                    </FadeIn>

                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <FadeIn direction="up">
                                <div className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 p-2 px-4 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-fit"
                                    style={{ color: project.accent }}>
                                    {project.category}
                                </div>
                                <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-6">
                                    {project.title}
                                </h1>
                                <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-10 max-w-xl">
                                    {project.desc}
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Magnetic strength={0.3}>
                                        <Link
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                                            style={{ background: project.accentGrad }}
                                        >
                                            Visit Live Website <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </Magnetic>
                                </div>
                            </FadeIn>
                        </div>

                        <FadeIn direction="none" delay={300} className="relative">
                            <div className="relative aspect-[4/3] rounded-3xl p-2 bg-slate-200 dark:bg-slate-800 shadow-2xl border border-slate-300 dark:border-slate-700 overflow-hidden transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-1.5 z-10">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-60" />
                                </div>
                                <img
                                    src={project.images[0].src}
                                    alt={project.title}
                                    className="w-full h-full object-cover rounded-2xl pt-8"
                                />
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ─── 2. STATS SECTION ─── */}
            <section className="relative z-10 border-y border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <FadeIn delay={100} direction="none" className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry</p>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-blue-500" /> {project.industry}
                            </p>
                        </FadeIn>
                        <FadeIn delay={200} direction="none" className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform</p>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-emerald-500" /> {project.platform}
                            </p>
                        </FadeIn>
                        <FadeIn delay={300} direction="none" className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timeline</p>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <Clock className="w-4 h-4 text-orange-500" /> {project.timeline}
                            </p>
                        </FadeIn>
                        <FadeIn delay={400} direction="none" className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                            <p className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500" /> {project.status}
                            </p>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ─── 3. OVERVIEW & FEATURES ─── */}
            <section className="relative z-10 py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-[1fr_2fr] gap-20">
                        <FadeIn direction="right">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">Overview</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                                {project.overview}
                            </p>
                        </FadeIn>

                        <div className="grid md:grid-cols-2 gap-8">
                            {project.features.map((feature, i) => (
                                <FadeIn key={i} delay={i * 100} className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Layers className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">{feature.description}</p>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 4. UI GALLERY ─── */}
            <section className="relative z-10 py-24 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeIn className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">UI Architecture</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-light">Visual breakdown of the system components and user interface design.</p>
                    </FadeIn>

                    <div className="space-y-24">
                        {project.images.map((img, i) => (
                            <FadeIn key={i} delay={i * 200} className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <span className="w-8 h-px bg-slate-300 dark:bg-slate-700" />
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">{img.label}</h3>
                                </div>
                                <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl">
                                    <img src={img.src} alt={img.label} className="w-full h-auto" />
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 5. TECH STACK & RESULTS ─── */}
            <section className="relative z-10 py-32 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
                    <FadeIn direction="right">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                            <Cpu className="w-8 h-8 text-blue-500" /> Technology Stack
                        </h2>
                        <div className="flex flex-wrap gap-3">
                            {project.techStack.map(tech => (
                                <span key={tech} className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold tracking-tight shadow-sm hover:border-blue-500/50 transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </FadeIn>

                    <FadeIn direction="left">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                            <Target className="w-8 h-8 text-emerald-500" /> Impact & Results
                        </h2>
                        <div className="space-y-6">
                            {project.results.map((result, i) => (
                                <div key={i} className="flex items-center gap-4 p-6 rounded-3xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                                        <ArrowRight className="w-5 h-5 text-white" />
                                    </div>
                                    <p className="text-xl font-bold text-slate-800 dark:text-white">{result}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ─── 6. FINAL CTA ─── */}
            <section className="relative z-10 px-6 mt-12">
                <FadeIn className="max-w-5xl mx-auto rounded-[40px] bg-slate-900 dark:bg-black p-12 lg:p-24 text-center relative overflow-hidden shadow-2xl group">
                    {/* Immersive glow */}
                    <div className="absolute inset-0 bg-blue-600/10 blur-[100px] pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-700" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-8">
                            Build your next <br /> <span className="text-blue-400">venture studio</span> quality system.
                        </h2>
                        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-light">
                            We design and engineer scalable digital infrastructure for innovators. Ready to construct your vision?
                        </p>
                        <Magnetic strength={0.4}>
                            <Link href="/contact" className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-slate-900 font-bold text-lg hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-xl">
                                Start a Conversation <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Magnetic>
                    </div>
                </FadeIn>
            </section>
        </main>
    );
}
