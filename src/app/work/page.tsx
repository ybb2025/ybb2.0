"use client";

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
    {
        title: "Beads to Brilliance",
        category: "B2B EdTech · Learning Platform",
        tags: ["Structured Learning", "Student Portal", "Stage-Based Curriculum"],
        link: "https://b2bproduction-ready5.vercel.app",
        desc: "A full-stack structured abacus learning platform — featuring a marketing site, student dashboard with stage-gated progression, mastery tracking, live assessments, and an admin control system. Built end-to-end from zero.",
        status: "Live in Production",
        accent: "#f97316",
        accentGrad: "linear-gradient(135deg, #f97316, #b45309)",
        images: [
            { src: "/portfolio/beadstobrilliance-1.png", label: "Marketing Site" },
            { src: "/portfolio/beadstobrilliance-2.png", label: "Student Dashboard" },
            { src: "/portfolio/beadstobrilliance-3.png", label: "Homepage" },
            { src: "/portfolio/beadstobrilliance-4.png", label: "Stage Progress" },
        ],
    },
    {
        title: "Markandeya Solar",
        category: "B2B Energy Infrastructure",
        tags: ["Performance", "Lead Generation", "Custom Platform"],
        link: "https://markandeyasolar.com",
        desc: "A custom-engineered digital solar platform — built to modernise lead generation, showcase services, and drive conversions for a Telangana-based solar provider serving 250+ KW installations.",
        status: "Live in Production",
        accent: "#10b981",
        accentGrad: "linear-gradient(135deg, #059669, #065f46)",
        images: [
            { src: "/portfolio/markandeyasolar-1.png", label: "Homepage" },
            { src: "/portfolio/markandeyasolar-2.png", label: "About & Team" },
            { src: "/portfolio/markandeyasolar-3.png", label: "Leadership" },
            { src: "/portfolio/markandeyasolar-4.png", label: "Services" },
        ],
    },
];

function ProjectCard({ project, flip }: { project: typeof projects[0]; flip: boolean }) {
    const [active, setActive] = useState(0);

    return (
        <div className={`flex flex-col ${flip ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-16 items-start lg:items-center`}>

            {/* ─── Image Panel ─── */}
            <div className="w-full lg:w-[56%] shrink-0 flex flex-col gap-4">

                {/* Main display image */}
                <div
                    className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-[0_20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-slate-100 dark:bg-[#111]"
                    style={{ aspectRatio: "1/1" }}
                >
                    <img
                        src={project.images[active].src}
                        alt={project.images[active].label}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                            display: "block",
                            transition: "opacity 0.35s ease",
                        }}
                    />
                    {/* Badge */}
                    <div style={{
                        position: "absolute", top: 14, left: 14,
                        display: "flex", alignItems: "center", gap: 8,
                        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 999, padding: "5px 12px",
                        fontSize: 10, fontWeight: 700, textTransform: "uppercase",
                        letterSpacing: "0.12em", color: "#fff"
                    }}>
                        <span style={{
                            width: 7, height: 7, borderRadius: 999,
                            background: "#34d399", boxShadow: "0 0 6px rgba(52,211,153,0.8)",
                            display: "inline-block", animation: "pulse 2s infinite"
                        }} />
                        {project.status}
                    </div>
                    {/* Active label */}
                    <div style={{
                        position: "absolute", bottom: 14, right: 14,
                        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        borderRadius: 8, padding: "4px 10px",
                        fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 600
                    }}>
                        {project.images[active].label}
                    </div>
                </div>

                {/* Thumbnail grid (2×2) */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                    {project.images.map((img, i) => (
                        <div
                            key={i}
                            role="button"
                            tabIndex={0}
                            onClick={() => setActive(i)}
                            onKeyDown={(e) => e.key === "Enter" && setActive(i)}
                            style={{
                                aspectRatio: "16/9",
                                borderRadius: 12,
                                overflow: "hidden",
                                cursor: "pointer",
                                border: active === i
                                    ? `2.5px solid ${project.accent}`
                                    : "2.5px solid transparent",
                                outline: active === i
                                    ? "none"
                                    : "2.5px solid rgba(148,163,184,0.3)",
                                opacity: active === i ? 1 : 0.5,
                                transition: "all 0.2s ease",
                                boxShadow: active === i
                                    ? `0 0 14px ${project.accent}55`
                                    : "none",
                                position: "relative",
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.label}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "top",
                                    display: "block",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                }}
                            />
                            {/* Label on hover */}
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0,
                                background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                                padding: "12px 8px 6px",
                                fontSize: 9, fontWeight: 700,
                                textTransform: "uppercase", letterSpacing: "0.1em",
                                color: "rgba(255,255,255,0.85)", textAlign: "center",
                            }}>
                                {img.label}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* ─── Content Panel ─── */}
            <div className="flex-1">
                <div className="text-[10px] font-black uppercase tracking-[0.18em] mb-4"
                    style={{ color: project.accent }}>
                    {project.category}
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-5">
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

                {/* Image switcher dots */}
                <div className="flex items-center gap-3 mb-8">
                    {project.images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className="flex items-center gap-2 text-xs font-semibold transition-all"
                            style={{ color: active === i ? project.accent : "#94a3b8" }}
                        >
                            <span style={{
                                width: active === i ? 20 : 6, height: 6,
                                borderRadius: 999,
                                background: active === i ? project.accent : "#94a3b8",
                                display: "inline-block", transition: "all 0.25s ease"
                            }} />
                            {img.label}
                        </button>
                    ))}
                </div>

                {/* CTA */}
                <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 shadow-lg"
                    style={{ background: project.accentGrad }}
                >
                    View Live Project <ExternalLink className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

export default function Work() {
    return (
        <main className="min-h-screen selection:bg-blue-600/20 selection:text-blue-900 dark:selection:text-blue-300 relative overflow-x-hidden">

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="page-bg absolute inset-0 transition-colors duration-500" />
                <div className="dot-grid absolute inset-0" />
                <div className="absolute top-[-15%] left-[20%] h-[700px] w-[700px] rounded-full blur-[160px]"
                    style={{ background: "var(--c-orb-1)" }} />
                <div className="absolute bottom-[-10%] right-[-8%] h-[600px] w-[600px] rounded-full blur-[140px]"
                    style={{ background: "var(--c-orb-2)" }} />
            </div>

            {/* Hero */}
            <section className="relative z-10 w-full pt-36 pb-16 lg:pt-44 lg:pb-24">
                <div className="max-w-[900px] mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] mx-auto rounded-full bg-slate-100 border border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 mb-6">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-60" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                        </span>
                        Selected Portfolio
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.05] mb-6">
                        Engineered For{" "}
                        <span className="italic font-serif text-blue-600 dark:text-blue-400 block sm:inline">Impact.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl mx-auto">
                        Real work for real clients. Every project is built from zero — no templates, no shortcuts, no compromises.
                    </p>
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
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
                        Want to be next?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 font-light">
                        Every great product starts with a conversation. Let's build yours.
                    </p>
                    <Link href="/contact"
                        className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg hover:-translate-y-0.5">
                        Start a Project <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

        </main>
    );
}
