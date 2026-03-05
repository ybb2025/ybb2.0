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
import { FadeIn } from "@/components/ui/FadeIn";
import { Magnetic } from "@/components/ui/Magnetic";

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
        <div className="blueprint-grid absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" />
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
      <section className="relative z-10 w-full pt-24 lg:pt-32 pb-16 lg:pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Right Column (Mobile: Top): Robot Area with Glow & Status */}
          <FadeIn direction="none" delay={300} className="relative flex justify-center lg:justify-end items-center h-[430px] sm:h-[620px] lg:h-[770px] order-first lg:order-last group/robot">
            {/* Soft Radial Glow behind robot */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[430px] h-[430px] sm:w-[720px] sm:h-[720px] opacity-100 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)"
              }}
            />

            <div className="relative w-full h-full lg:w-[140%] lg:-mr-[15%] xl:-mr-[25%] transition-transform duration-700 group-hover/robot:translate-y-[-8px]">
              <Spline
                scene="https://prod.spline.design/p85feVfke2nTctFY/scene.splinecode"
                className="w-full h-full scale-100 cursor-grab active:cursor-grabbing"
              />

              {/* Floating System Status (Pill) - Enlarged to cover watermark completely (hiding the top black edge) */}
              <div className="absolute bottom-1 right-0.5 z-20 flex items-center gap-3 px-10 py-5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl hover:scale-105 transition-transform duration-300 translate-x-1 -translate-y-1.5 focus-within:outline-none">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800 dark:text-slate-200 whitespace-nowrap">
                  Robot Active
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Left Column: Hero Typography & CTAs */}
          <div className="flex flex-col z-20 text-center lg:text-left">
            <FadeIn direction="down">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 w-fit mx-auto lg:mx-0">
                INFRASTRUCTURE STUDIO
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mt-8 text-slate-900 dark:text-white tracking-tight">
                Build Systems <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  That Actually Scale.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-lg leading-relaxed font-light mx-auto lg:mx-0">
                We design and engineer scalable digital infrastructure — web platforms, SaaS systems, and mobile applications built from zero.
              </p>
            </FadeIn>

            <FadeIn delay={300} className="flex flex-col sm:flex-row gap-4 mt-10 justify-center lg:justify-start">
              <Magnetic strength={0.3}>
                <Link
                  href="/contact"
                  className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-lg font-semibold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  Start a Project
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>

              <Magnetic strength={0.2}>
                <Link
                  href="/work"
                  className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900/50 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-lg font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 backdrop-blur-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center w-full sm:w-auto"
                >
                  View Our Work
                </Link>
              </Magnetic>
            </FadeIn>

            {/* Stats Section with Cards */}
            <div className="flex flex-wrap gap-4 sm:gap-8 mt-12 pt-10 border-t border-slate-100 dark:border-slate-800/50 justify-center lg:justify-start">
              <FadeIn delay={500} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-xl px-6 py-4 shadow-sm backdrop-blur-sm hover:shadow-md transition-shadow group">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors">12+</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mt-1">Projects Deployed</p>
              </FadeIn>

              <FadeIn delay={600} className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 rounded-xl px-6 py-4 shadow-sm backdrop-blur-sm hover:shadow-md transition-shadow group">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">99.9%</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1">System Reliability</p>
              </FadeIn>
            </div>

            {/* Trusted Tech Stack Row */}
            <FadeIn delay={800} className="mt-10 flex flex-col items-center lg:items-start gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Trusted Infrastructure Stack</span>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 grayscale opacity-50 dark:opacity-40 hover:opacity-100 dark:hover:opacity-100 transition-opacity duration-500">
                {['Next.js', 'Firebase', 'Stripe', 'AWS', 'Vercel'].map((tech) => (
                  <span key={tech} className="text-sm font-semibold text-slate-600 dark:text-slate-300">{tech}</span>
                ))}
              </div>
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ══ 2. CAPABILITIES (BENTO GRID) ══ */}
      <section className="relative z-10 w-full py-24 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center md:text-left mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              Premium Infrastructure.
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-light max-w-2xl">
              We execute across the entire stack to deliver resilient, highly performant digital products.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {serviceCards.map((card, i) => (
              <FadeIn
                key={i}
                delay={i * 100}
                className="group relative p-8 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden hover:border-blue-500/50 dark:hover:border-blue-400/30"
              >
                {/* Subtle gradient hover effect inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-transparent dark:from-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glass Light Follow Effect Overlay (Simulated) */}
                <div className="absolute -inset-px bg-gradient-to-br from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center mb-6 text-slate-700 dark:text-slate-300 shadow-sm group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-700 transition-all duration-500">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{card.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">{card.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. VENTURES ══ */}
      <section className="relative z-10 w-full py-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
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
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            {ventures.map((v, i) => (
              <FadeIn
                key={i}
                delay={i * 150}
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
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. SELECTED WORK ══ */}
      <section className="relative z-10 w-full pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight text-center md:text-left">
                Featured Client Work
              </h2>
            </div>
            <Link href="/work" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
              View Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
          </FadeIn>

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
              <FadeIn key={i} delay={i * 200} className="group rounded-[24px] bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
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
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-8 text-center md:hidden">
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400">
              View Portfolio <ChevronRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ══ 5. PREMIUM CTA ══ */}
      <section className="relative z-10 w-full px-6 pb-24">
        <FadeIn className="max-w-5xl mx-auto rounded-[32px] bg-slate-900 dark:bg-black text-white p-12 md:p-20 text-center relative overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-blue-600/10 blur-[100px] pointer-events-none group-hover:bg-blue-600/20 transition-colors duration-700" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-700" />

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
              <Link href="/contact" className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-slate-900 bg-white hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-lg">
                Start the Dialogue
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}
