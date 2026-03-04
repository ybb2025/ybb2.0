import Link from "next/link";
import { ArrowRight, ChevronRight, Layers, LayoutGrid, Cpu, Database, Cloud, Zap, Target } from "lucide-react";

export default function Ventures() {
    return (
        <main className="min-h-screen bg-[#F8FAFC] dark:bg-[#0D1117] overflow-hidden selection:bg-blue-600/20 selection:text-blue-900 font-sans flex flex-col transition-colors duration-300">

            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="fixed top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-100/50 dark:bg-blue-900/20 blur-[120px]" />
                <div className="fixed bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/15 blur-[100px]" />
                <div className="fixed inset-0 opacity-[0.03] dark:opacity-[0.04]
                    bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)]
                    dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)]
                    bg-[size:32px_32px]" />
            </div>



            {/* HERO */}
            <section className="relative z-10 w-full pt-44 pb-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/70 px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 backdrop-blur-md shadow-sm mb-8">
                        Engineered. Owned. Operated.
                    </div>
                    <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.05] mb-6">
                        Ventures Built <br className="hidden sm:block" />
                        <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 inline-block pr-6 pb-2">From Zero.</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mx-auto text-balance">
                        We don&apos;t just design for others. We build, launch, and scale our own digital products.
                    </p>
                </div>
            </section>

            {/* VENTURES GRID */}
            <section className="relative z-10 w-full pb-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* Helix */}
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 shadow-[0_20px_60px_rgba(37,99,235,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] rounded-3xl p-10 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-300/10 dark:bg-blue-500/5 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-blue-400/5" />
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center">
                                    <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse" />
                                    Incubating
                                </div>
                            </div>
                            <div className="relative z-10 mb-8 flex-grow">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-2">Helix</h3>
                                <div className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">AI Infrastructure</div>
                                <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                                    An internal intelligence layer designed to automate venture operations and analytics.
                                </p>
                            </div>
                            <div className="relative z-10 border-t border-slate-200/50 dark:border-slate-700/50 pt-6 mt-auto">
                                <Link href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link">
                                    View Details
                                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Spotter */}
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 shadow-[0_20px_60px_rgba(37,99,235,0.05)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)] rounded-3xl p-10 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-300/10 dark:bg-green-500/5 rounded-full blur-[60px] -mr-20 -mt-20 group-hover:bg-green-400/5" />
                            <div className="flex items-center justify-between mb-8 relative z-10">
                                <div className="h-14 w-14 rounded-2xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center">
                                    <Target className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                                </div>
                                <div className="inline-flex items-center gap-2 rounded-full border border-green-200/60 dark:border-green-800/60 bg-green-50/50 dark:bg-green-900/30 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400" />
                                    Live
                                </div>
                            </div>
                            <div className="relative z-10 mb-8 flex-grow">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight mb-2">Spotter</h3>
                                <div className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">Digital Health</div>
                                <p className="text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                                    A performance-first health tracking platform built for scalable user growth.
                                </p>
                            </div>
                            <div className="relative z-10 border-t border-slate-200/50 dark:border-slate-700/50 pt-6 mt-auto">
                                <Link href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group/link">
                                    View Details
                                    <ChevronRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* PHILOSOPHY */}
            <section className="relative z-10 w-full bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border-y border-slate-200/50 dark:border-slate-700/40 py-24 transition-colors duration-300">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.05] mb-8">
                        Why We Build <br className="hidden sm:block" />
                        <span className="italic font-serif text-blue-600 dark:text-blue-400 inline-block pr-6 pb-2">Our Own.</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed text-balance mx-auto">
                        Building our own ventures keeps our standards high. We test, iterate, and scale systems internally before engineering them for clients.{" "}
                        <span className="font-medium text-slate-800 dark:text-slate-200">Every lesson compounds.</span>
                    </p>
                </div>
            </section>

            {/* STACK */}
            <section className="relative z-10 w-full py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-2">The Stack</div>
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">Enterprise-Grade Infrastructure</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[
                            { icon: <Layers className="w-6 h-6 text-slate-600 dark:text-slate-400" />, label: "Next.js" },
                            { icon: <Cpu className="w-6 h-6 text-slate-600 dark:text-slate-400" />, label: "Node" },
                            { icon: <Zap className="w-6 h-6 text-slate-600 dark:text-slate-400" />, label: "Firebase" },
                            { icon: <Database className="w-6 h-6 text-slate-600 dark:text-slate-400" />, label: "Postgres" },
                            { icon: <Cloud className="w-6 h-6 text-slate-600 dark:text-slate-400" />, label: "Cloud\nInfrastructure" },
                            { icon: <LayoutGrid className="w-6 h-6 text-slate-600 dark:text-slate-400" />, label: "AI\nIntegrations" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-2xl py-6 flex flex-col items-center justify-center gap-3 shadow-sm hover:bg-white dark:hover:bg-slate-800 transition-colors">
                                {item.icon}
                                <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 text-center px-2 leading-tight whitespace-pre">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLOSING CTA */}
            <section className="relative z-10 w-full py-24 mb-12">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 tracking-tight leading-[1.05] mb-8">
                        Have a Venture in Mind?
                    </h2>
                    <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-10 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] group">
                        Let&apos;s Build It
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
