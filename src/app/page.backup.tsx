"use client";

import dynamic from "next/dynamic";
const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });
import Link from "next/link";
import { ArrowRight, Zap, Target, Cpu, Globe, Smartphone, Server, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F4F8FC] selection:bg-blue-600/20 selection:text-blue-900 font-sans">

      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/50 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-[100px]" />
      </div>

      {/* ── NAVBAR ─────────────────────────────────────────────────────── */}
      <nav className="fixed top-6 left-1/2 z-50 w-[90%] max-w-5xl -translate-x-1/2">
        <div className="flex items-center justify-between rounded-full border border-white/40 bg-white/60 px-6 py-3 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">YB</div>
            <span className="font-semibold tracking-tight text-slate-900">Your Brand Builders</span>
          </div>
          <div className="hidden space-x-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="/studio" className="hover:text-blue-600 transition-colors">Studio</Link>
            <Link href="/ventures" className="hover:text-blue-600 transition-colors">Ventures</Link>
            <Link href="/work" className="hover:text-blue-600 transition-colors">Work</Link>
          </div>
          <Link href="/contact" className="rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white transition-all hover:bg-slate-800 hover:shadow-lg active:scale-95">
            Start a Project
          </Link>
        </div>
      </nav>

      {/* ══ SECTION 1 — HERO ════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col md:grid md:grid-cols-2 items-center justify-center px-6 md:px-8 pt-32 pb-16 lg:pt-20 gap-10 overflow-visible">

        {/* TEXT */}
        <div className="flex flex-col space-y-6 md:space-y-8 text-center md:text-left z-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-blue-600 mx-auto md:mx-0 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-600" />
            </span>
            YBB Operating System
          </div>

          <h1 className="max-w-2xl text-[2.75rem] leading-[1.1] tracking-tight text-slate-900 md:text-[4.5rem] lg:text-[5rem] font-bold w-full mx-auto md:mx-0">
            We Build the Systems That{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent italic font-serif inline-block pr-8 pb-2">
              Build Your Business.
            </span>
          </h1>

          <p className="max-w-lg text-base md:text-lg leading-relaxed text-slate-500/90 font-medium pb-2 mx-auto md:mx-0">
            Custom digital infrastructure engineered from zero.{" "}
            <span className="text-slate-900 underline decoration-blue-500/30 underline-offset-4">No templates.</span> No compromises.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/work"
              className="w-full sm:w-auto rounded-full border border-slate-200 bg-white px-8 py-4 font-semibold text-slate-600 transition-all hover:bg-slate-50"
            >
              Explore Work
            </Link>
          </div>
        </div>

        {/* ROBOT */}
        <div className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center overflow-visible">
          <div className="relative h-full w-[calc(100%+5rem)] -ml-20">
            <Spline
              scene="https://prod.spline.design/mjwFk898JHCjMpbs/scene.splinecode"
              className="relative z-10 w-full h-full drop-shadow-2xl"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[300px] md:h-[400px] w-[300px] md:w-[400px] bg-blue-400/20 blur-[60px] md:blur-[80px] rounded-full scale-75 pointer-events-none" />
            {/* Badge */}
            <div className="absolute bottom-3 right-3 z-50 flex items-center justify-center gap-2 w-[190px] h-[50px] backdrop-blur-3xl bg-[#F4F8FC] border border-white shadow-[0_4px_24px_rgba(0,0,0,0.06)] rounded-full pointer-events-none">
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 mt-[1px]">System Core: Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SECTION 2 — ANTI-TEMPLATE MANIFESTO ════════════════════════ */}
      <section className="relative z-10 w-full bg-white/10 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-600 backdrop-blur-md mb-8 shadow-sm">
              0% Templates — 100% Engineered
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 tracking-tight leading-[1.05] mb-6">
              Escape the{" "}<br />
              <span className="italic font-serif text-blue-600 inline-block pr-6 pb-2">Template Economy.</span>
            </h2>
            <p className="text-xl text-slate-500 font-light leading-relaxed mb-4">
              The digital world is saturated with &quot;good enough.&quot;<br />
              <span className="font-medium text-slate-800">We don&apos;t build &quot;good enough.&quot;</span>
            </p>
            <p className="text-lg text-slate-500 font-light leading-relaxed">
              At YBB, every system begins with a blank canvas and a purpose-built architecture. No recycled themes. No patched plugins. Just original, high-performance infrastructure engineered specifically for your business.
            </p>
          </div>

          <div className="relative p-10 md:p-14 backdrop-blur-2xl bg-white/40 border border-white/60 shadow-[0_20px_60px_rgba(37,99,235,0.08)] rounded-[2.5rem] overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-300/10 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-blue-400/10 transition-opacity" />
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mb-8 shadow-sm">
              <Zap className="w-5 h-5 text-slate-700" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 tracking-tight">Generic is Expensive.</h3>
            <p className="text-slate-600 leading-relaxed font-light text-lg">
              Templates cost you differentiation, performance, and long-term flexibility. Custom infrastructure compounds over time.
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — WHAT WE ENGINEER ═══════════════════════════════ */}
      <section className="relative z-10 w-full py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-600 backdrop-blur-md shadow-sm mb-6">
              Full-Spectrum Development
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-slate-900 tracking-tight leading-[1.05]">
              What We <span className="italic font-serif text-blue-600 inline-block pr-6 pb-2">Engineer.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Globe className="w-6 h-6 text-blue-600" />,
                title: "Custom Websites",
                desc: "Pixel-perfect, performance-first websites engineered from zero. No themes. No shortcuts.",
                bg: "bg-blue-50",
                border: "border-blue-100",
              },
              {
                icon: <Cpu className="w-6 h-6 text-indigo-600" />,
                title: "Web Applications",
                desc: "Full-stack web apps with auth, dashboards, and databases built for real-world scale.",
                bg: "bg-indigo-50",
                border: "border-indigo-100",
              },
              {
                icon: <Server className="w-6 h-6 text-slate-700" />,
                title: "Digital Infrastructure",
                desc: "End-to-end systems: APIs, CI/CD, cloud architecture. Built to compound over time.",
                bg: "bg-slate-100",
                border: "border-slate-200",
              },
              {
                icon: <Smartphone className="w-6 h-6 text-green-600" />,
                title: "Mobile Applications",
                desc: "Native-quality Android & iOS apps built with Flutter for performance and reach.",
                bg: "bg-green-50",
                border: "border-green-100",
              },
            ].map((card, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/50 border border-white/60 shadow-[0_20px_60px_rgba(37,99,235,0.06)] rounded-[2rem] p-8 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className={`w-14 h-14 rounded-2xl ${card.bg} border ${card.border} flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 tracking-tight">{card.title}</h3>
                <p className="text-slate-500 font-light leading-relaxed text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 4 — VENTURES PREVIEW ═══════════════════════════════ */}
      <section className="relative z-10 w-full bg-white/40 backdrop-blur-md border-y border-white/60 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-600 backdrop-blur-md shadow-sm mb-6">
                Engineered · Owned · Operated
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.05]">
                Ventures Built{" "}<br />
                <span className="italic font-serif text-blue-600 inline-block pr-6 pb-2">From Zero.</span>
              </h2>
            </div>
            <Link
              href="/ventures"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              All Ventures <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Helix",
                category: "AI Infrastructure",
                status: "Incubating",
                statusColor: "border-blue-200/60 bg-blue-50/50 text-blue-600",
                dotColor: "bg-blue-500 animate-pulse",
                desc: "An internal intelligence layer designed to automate venture operations and analytics.",
                icon: <Cpu className="w-6 h-6 text-blue-600" />,
                iconBg: "bg-white border-slate-200",
              },
              {
                name: "Spotter",
                category: "Digital Health",
                status: "Live",
                statusColor: "border-green-200/60 bg-green-50/50 text-green-700",
                dotColor: "bg-green-500",
                desc: "A performance-first health tracking platform built for scalable user growth.",
                icon: <Target className="w-6 h-6 text-slate-700" />,
                iconBg: "bg-white border-slate-200",
              },
            ].map((v, i) => (
              <div key={i} className="backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_20px_60px_rgba(37,99,235,0.05)] rounded-[2rem] p-10 hover:-translate-y-1 transition-transform duration-300 group flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <div className={`h-14 w-14 rounded-2xl ${v.iconBg} shadow-sm flex items-center justify-center border`}>{v.icon}</div>
                  <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${v.statusColor}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${v.dotColor}`} />
                    {v.status}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-1">{v.name}</h3>
                <div className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-5">{v.category}</div>
                <p className="text-slate-600 font-light leading-relaxed flex-grow">{v.desc}</p>
                <div className="border-t border-slate-200/50 pt-6 mt-6">
                  <Link href="/ventures" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors group/link">
                    View Details
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — WORK PREVIEW ═══════════════════════════════════ */}
      <section className="relative z-10 w-full py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/50 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-600 backdrop-blur-md shadow-sm mb-6">
                Selected Projects
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.05]">
                Work That{" "}
                <span className="italic font-serif text-blue-600 inline-block pr-6 pb-2">Speaks.</span>
              </h2>
            </div>
            <Link
              href="/work"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              All Work <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "FinoTrack",
                category: "Web Application",
                desc: "Invoice & finance tracking platform for freelancers. Custom-built from zero with Stripe integration.",
                gradient: "from-blue-600 to-indigo-600",
                pattern: "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.08)_0%,transparent_60%)]",
              },
              {
                title: "MoveNest",
                category: "Mobile Application",
                desc: "Urban rental discovery app. Flutter-built Android & iOS with real-time listings and map view.",
                gradient: "from-green-500 to-teal-600",
                pattern: "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08)_0%,transparent_60%)]",
              },
              {
                title: "Bloomfield Studios",
                category: "Custom Website",
                desc: "High-end photography portfolio with integrated booking system. Minimal, cinematic design.",
                gradient: "from-slate-700 to-slate-900",
                pattern: "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.06)_0%,transparent_60%)]",
              },
            ].map((project, i) => (
              <div key={i} className="group backdrop-blur-xl bg-white/40 border border-white/60 shadow-[0_20px_60px_rgba(37,99,235,0.06)] rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-300">
                {/* Visual placeholder */}
                <div className={`relative h-52 bg-gradient-to-br ${project.gradient} ${project.pattern} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="text-xs font-bold uppercase tracking-widest text-white/70 bg-white/10 border border-white/20 rounded-full px-3 py-1">
                      {project.category}
                    </div>
                  </div>
                </div>
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{project.title}</h3>
                  <p className="text-slate-500 font-light text-sm leading-relaxed mb-6">{project.desc}</p>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors group/link"
                  >
                    View Case Study
                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — FINAL CTA ═══════════════════════════════════════ */}
      <section className="relative z-10 w-full py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
        <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-white/5 blur-[80px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white tracking-tight leading-[1.05] mb-6">
            Ready to Build Something{" "}
            <span className="italic font-serif text-blue-200">That Lasts?</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100/80 font-light leading-relaxed mb-10 max-w-xl mx-auto">
            Every great product starts with a conversation. Let&apos;s define the architecture together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold text-blue-700 text-base hover:bg-blue-50 transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group"
          >
            Start the Conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
      <div className="mt-12 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent relative z-10" />
      <footer className="backdrop-blur-xl bg-white/40 border-t border-white/60 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">YB</div>
              <span className="font-semibold tracking-tight text-slate-900">YBB</span>
            </div>
            <p className="text-sm text-slate-500 font-light leading-relaxed mb-4">
              Digital Venture Studio engineering custom infrastructure for ambitious teams.
            </p>
            <p className="text-sm font-medium text-slate-900">0% Templates. 100% Engineered.</p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Studio</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link href="/studio" className="hover:text-blue-600 transition-colors">Studio</Link></li>
              <li><Link href="/process" className="hover:text-blue-600 transition-colors">Process</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Work</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link href="/ventures" className="hover:text-blue-600 transition-colors">Ventures</Link></li>
              <li><Link href="/work" className="hover:text-blue-600 transition-colors">Work</Link></li>
              <li><Link href="/case-studies" className="hover:text-blue-600 transition-colors">Case Studies</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Connect</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-light">
              <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 transition-colors">Terms</Link></li>
              <li><Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">LinkedIn</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200/50">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 font-light">
            <p>© 2026 YBB. All rights reserved.</p>
            <p>
              Designed &amp; Developed by{" "}
              <a href="https://yourbrandbuilders.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">
                Your Brand Builders
              </a>
            </p>
          </div>
        </div>
      </footer>

    </main>
  );
}
