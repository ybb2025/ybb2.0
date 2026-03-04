"use client";

import dynamic from "next/dynamic";
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  ArrowRight, Zap, Target, Cpu, Globe,
  Smartphone, Server, ChevronRight, Sun, Moon,
  Sparkles, Layers
} from "lucide-react";

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  // ── Theme-aware service card configs ──
  const serviceCards = [
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Custom Websites",
      desc: "Pixel-perfect, performance-first websites engineered from zero. Absolute control over every asset.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-500" />,
      title: "Web Applications",
      desc: "Full-stack web platforms with secure auth, custom dashboards, and highly scalable databases.",
    },
    {
      icon: <Server className="w-6 h-6 text-slate-600 dark:text-slate-400" />,
      title: "Digital Infrastructure",
      desc: "End-to-end cloud architectures, secure APIs, and custom integrations tailored for growth.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-emerald-500" />,
      title: "Mobile Apps",
      desc: "Native-quality iOS and Android applications built with Flutter for unmatched speed and reach.",
    },
  ];

  const ventures = [
    {
      name: "Helix",
      category: "AI Infrastructure",
      status: "Incubating",
      desc: "An internal intelligence layer designed to automate venture operations and analytics.",
      icon: <Cpu className="w-6 h-6 text-blue-500" />,
      dotColor: "#3B82F6",
      dotAnimate: true,
    },
    {
      name: "Spotter",
      category: "Digital Health",
      status: "Live",
      desc: "A performance-first health tracking platform built for scalable user growth.",
      icon: <Target className="w-6 h-6 text-emerald-500" />,
      dotColor: "#10B981",
      dotAnimate: false,
    },
  ];

  return (
    <main className="min-h-screen selection:bg-blue-600/20 selection:text-blue-900 dark:selection:text-blue-300 relative overflow-x-hidden font-sans">

      {/* ── PAGE BACKGROUND ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="page-bg absolute inset-0 transition-colors duration-500" />
        <div className="dot-grid absolute inset-0" />
        {/* Soft immersive ambient glows */}
        <div
          className="absolute top-[-10%] left-[-10%] h-[800px] w-[800px] rounded-full blur-[180px] opacity-60 dark:opacity-40 transition-colors duration-500"
          style={{ background: "var(--c-orb-1)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] h-[700px] w-[700px] rounded-full blur-[160px] opacity-60 dark:opacity-40 transition-colors duration-500"
          style={{ background: "var(--c-orb-2)" }}
        />
      </div>



      {/* ══ 1. HERO SECTION ══ */}
      <section className="relative z-10 w-full pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* Hero Typography & CTAs */}
          <div className="flex flex-col text-center lg:text-left z-20">
            <div className="mx-auto lg:mx-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-[0.15em] mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Infrastructure Studio
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-8">
              Build Systems <br className="hidden lg:block" />
              <span className="text-slate-900 dark:text-white italic pr-4">
                That Scale.
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-10">
              We engineer beautiful web platforms, mobile applications, and resilient architectures from zero. No templates. No compromises.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <Link
                href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-black dark:hover:bg-slate-100 shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all hover:-translate-y-1"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/work"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                View Our Work
              </Link>
            </div>

            {/* Premium Minimal Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 border-t border-slate-200 dark:border-slate-800 pt-8">
              {[
                { label: "Projects Deployed", value: "12+" },
                { label: "Reliability", value: "99.9%" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums tracking-tight">{stat.value}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spline Robot Display */}
          <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center lg:justify-end">
            <div className="absolute top-1/2 left-1/2 lg:left-2/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-blue-500/20 dark:bg-blue-600/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />

            <div className="relative w-full h-full lg:w-[120%] lg:-mr-[10%] xl:-mr-[20%]">
              <Spline
                scene="https://prod.spline.design/p85feVfke2nTctFY/scene.splinecode"
                className="w-full h-full scale-100 cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Live Indicator tag floating near robot */}
            <div className="absolute bottom-4 right-4 lg:right-0 z-20 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">Robot Active</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══ 2. CAPABILITIES (BENTO GRID) ══ */}
      <section className="relative z-10 w-full py-24 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center md:text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Premium Infrastructure.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light max-w-2xl">
              We execute across the entire stack to deliver resilient, highly performant digital products.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {serviceCards.map((card, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle gradient hover effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 text-slate-700 dark:text-slate-300 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{card.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. VENTURES ══ */}
      <section className="relative z-10 w-full py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-[0.15em] mb-4">
                <Layers className="w-3.5 h-3.5" />
                Internal Studio
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Owned Ventures.
              </h2>
            </div>
            <Link href="/ventures" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              Explore All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ventures.map((v, i) => (
              <div
                key={i}
                className="group relative p-10 rounded-[28px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                    {v.icon}
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span className={`w-1.5 h-1.5 rounded-full ${v.dotAnimate ? 'animate-pulse' : ''}`} style={{ backgroundColor: v.dotColor }} />
                    {v.status}
                  </div>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">{v.name}</h3>
                <div className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">{v.category}</div>
                <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SELECTED WORK ══ */}
      <section className="relative z-10 w-full pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center md:text-left">
                Featured Client Work
              </h2>
            </div>
            <Link href="/work" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              View Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                title: "Markandeya Solar",
                category: "Energy Infrastructure",
                desc: "Custom-engineered digital solar platform built for scalability and performance.",
                img: "/portfolio/markandeyasolar-4.png",
                link: "https://markandeyasolar.com"
              },
              {
                title: "Beads to Brilliance",
                category: "B2B EdTech Platform",
                desc: "Secure B2B learning management system with robust user progression.",
                img: "/portfolio/beadstobrilliance-3.png",
                link: "https://b2bproduction-ready5.vercel.app"
              },
            ].map((work, i) => (
              <div key={i} className="group rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                {/* Real screenshot preview */}
                <div className="w-full bg-slate-100 dark:bg-[#0a0f1a] flex items-center justify-center overflow-hidden" style={{ aspectRatio: "16/10" }}>
                  <img
                    src={work.img}
                    alt={work.title}
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-8">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">{work.category}</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{work.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 font-light text-sm leading-relaxed mb-6">{work.desc}</p>
                  <Link href={work.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white group/link">
                    View Project <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              View Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ 5. PREMIUM CTA ══ */}
      <section className="relative z-10 w-full px-6 pb-24">
        <div className="max-w-5xl mx-auto rounded-[32px] bg-slate-900 dark:bg-black text-white p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-blue-600/10 blur-[100px] pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Ready to construct <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                your vision?
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed mb-10">
              Every beautiful product starts with a technical conversation. Let's engineer a solution that pushes the boundaries.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-900 bg-white hover:bg-slate-200 transition-colors shadow-lg">
                Start the Dialogue
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
