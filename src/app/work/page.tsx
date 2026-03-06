"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { projects, Project } from "@/data/projects";
import { FadeIn } from "@/components/ui/FadeIn";
import { Magnetic } from "@/components/ui/Magnetic";

function ProjectCard({ project, flip }: { project: Project; flip: boolean }) {
    const [active, setActive] = useState(0);

    return (
        <FadeIn direction={flip ? "left" : "right"} className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-start lg:items-center group`}>

            {/* ─── Image Panel ─── */}
            <div className="w-full lg:w-[56%] shrink-0 flex flex-col gap-4">

                {/* Main display image with premium screen mockup */}
                <Link href={`/work/${project.slug}`} className="block group/screen relative w-full aspect-[4/3] rounded-2xl p-1.5 bg-slate-200 dark:bg-slate-800 shadow-2xl overflow-hidden border border-slate-300 dark:border-slate-700 transition-transform duration-500 hover:-translate-y-2">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 gap-1.5 z-10">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-60" />
                    </div>

                    <div className="relative w-full h-full pt-8 rounded-xl overflow-hidden bg-slate-100 dark:bg-[#111]">
                        <img
                            key={active}
                            src={project.images[active].src}
                            alt={project.images[active].label}
                            className="w-full h-full object-cover object-top animate-fade-in transition-transform duration-700 group-hover/screen:scale-[1.05]"
                        />

                        {/* Badge */}
                        <div className="absolute top-12 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                            {project.status}
                        </div>

                        {/* Overlay with 'View Case Study' text on hover */}
                        <div className="absolute inset-x-0 bottom-0 top-8 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/screen:opacity-100 transition-opacity duration-500">
                            <div className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm flex items-center gap-2">
                                Read Case Study <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </Link>

                {/* Thumbnails */}
                <div className="flex gap-3 mt-2 overflow-x-auto pb-4 no-scrollbar">
                    {project.images.map((img, i) => (
                        <button
                            key={img.src}
                            onClick={() => setActive(i)}
                            className={`relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform
                            ${active === i
                                    ? "ring-2 ring-blue-500 scale-105 shadow-lg"
                                    : "opacity-60 hover:opacity-100 hover:scale-[1.02]"}`}
                        >
                            <img
                                src={img.src}
                                alt={img.label}
                                className="w-full h-full object-cover"
                            />
                            {active === i && (
                                <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
                            )}
                        </button>
                    ))}
                </div>

            </div>

            {/* ─── Content Panel ─── */}
            <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] mb-4"
                    style={{ color: project.accent }}>
                    {project.category}
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed mb-8">
                    {project.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {project.tags.map(tag => (
                        <span key={tag}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4 items-center">
                    <Magnetic strength={0.3}>
                        <Link
                            href={`/work/${project.slug}`}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-105 shadow-lg active:scale-95"
                            style={{ background: project.accentGrad }}
                        >
                            Read Case Study <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Magnetic>

                    <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all underline underline-offset-4"
                    >
                        Live Preview <ExternalLink className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </FadeIn>
    );
}

export default function Work() {
    return (
        <main className="min-h-screen selection:bg-blue-600/20 relative overflow-x-hidden">

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="page-bg absolute inset-0 transition-colors duration-500" />
                <div className="dot-grid absolute inset-0" />
            </div>

            {/* Hero */}
            <section className="relative z-10 w-full pt-36 pb-16 lg:pt-44 lg:pb-24">
                <div className="max-w-[900px] mx-auto px-6 text-center">
                    <FadeIn direction="down">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] mx-auto rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 mb-6">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                            </span>
                            Selected Portfolio
                        </div>
                    </FadeIn>
                    <FadeIn delay={100}>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.05] mb-6">
                            Engineered For{" "}
                            <span className="italic font-serif text-blue-600 dark:text-blue-400 block sm:inline">Impact.</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={200}>
                        <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                            Real work for real clients. Every project is built from zero — no templates, no shortcuts, no compromises.
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Projects */}
            <section className="relative z-10 w-full pb-32">
                <div className="max-w-[1200px] mx-auto px-6 md:px-10 space-y-28 md:space-y-40">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.title} project={project} flip={i % 2 !== 0} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 w-full pb-24 px-6">
                <FadeIn className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        Want to be next?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-light">
                        Every great product starts with a conversation. Let's build yours.
                    </p>
                    <Magnetic strength={0.3}>
                        <Link href="/contact"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:-translate-y-0.5">
                            Start a Project <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Magnetic>
                </FadeIn>
            </section>

        </main>
    );
}
