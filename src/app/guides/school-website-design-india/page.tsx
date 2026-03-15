"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Clock, Globe, Smartphone, UserCheck, ShieldCheck, Zap, Share2 } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { FAQStructuredData } from "@/components/faq-structured-data";

export default function SchoolGuidePage() {
    const articleFaqs = [
        {
            q: "How much does a school website with ERP cost in South India?",
            a: "For schools in cities like Hyderabad, Vijayawada, Vizag, and Khammam, a professional website with ERP integration typically costs between ₹40,000 and ₹1,20,000. Simple informational sites start at ₹15,000."
        },
        {
            q: "What features are essential for a school website in 2026?",
            a: "Essential features include a Digital Admission System, Online Fee Payment, Student/Parent Portal, Mobile Responsiveness, SEO-optimized content, and secure SSL encryption."
        },
        {
            q: "How does a website improve school admissions?",
            a: "Websites improve admissions by providing a seamless, 24/7 digital journey for parents, reducing friction with online forms, and showcasing school achievements through high-quality media."
        }
    ];

    return (
        <main className="min-h-screen selection:bg-blue-600/20 selection:text-blue-900 dark:selection:text-blue-300 relative overflow-x-hidden">
            {/* ── SEO/GEO Structured Data ── */}
            <FAQStructuredData />

            {/* ── BACKGROUND ── */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="page-bg absolute inset-0 transition-colors duration-500" />
                <div className="blueprint-grid absolute inset-0 opacity-[0.03] dark:opacity-[0.06]" />
            </div>

            <section className="relative z-10 pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Breadcrumb */}
                    <FadeIn direction="down" className="mb-8">
                        <Link href="/studio" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Studio
                        </Link>
                    </FadeIn>

                    {/* Header */}
                    <FadeIn delay={100}>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest">
                                2026 Industry Guide
                            </span>
                            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                <Clock className="w-3.5 h-3.5" /> 12 min read
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-8">
                            Best School Website Design in India: <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
                                The Definitive 2026 Guide.
                            </span>
                        </h1>
                    </FadeIn>

                    {/* Answer First Section */}
                    <FadeIn delay={200} className="p-8 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl mb-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <BookOpen className="w-12 h-12" />
                        </div>
                        <p className="text-xl md:text-2xl text-slate-800 dark:text-slate-100 leading-relaxed font-medium">
                            <strong className="text-blue-600 dark:text-blue-400">The best school website design in India integrates digital admission systems, secure student portals, and mobile-first responsiveness to achieve a 47% higher engagement rate from parents.</strong>
                            <br className="mb-4" />
                            Modern educational platforms must move beyond static brochures and function as central operating systems for school communication, automated fee collection, and real-time student progress tracking.
                        </p>
                    </FadeIn>

                    {/* Article Content */}
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <FadeIn delay={300}>
                            <h2 className="text-3xl font-bold mb-6">Why School Website Design Matters in 2026</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                In the competitive landscape of Indian education, your website is no longer just a digital business card; it is the first stage of your admission funnel. According to recent search data, <strong>73% of Indian parents</strong> prefer schools that offer a seamless digital experience for inquiry and admission.
                            </p>

                            {/* Stats Card */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                {[
                                    { val: "47%", label: "Higher Engagement" },
                                    { val: "73%", label: "Parent Preference" },
                                    { val: "3.4s", label: "Max Load Time" },
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-center">
                                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stat.val}</div>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <h2 className="text-3xl font-bold mb-6">Core Features of a High-Performing School Website</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="mt-1 w-10 h-10 shrink-0 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                            <UserCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Digital Admission System</h4>
                                            <p className="text-sm text-slate-500">Eliminate paperwork with cloud-based forms and instant document uploads.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 w-10 h-10 shrink-0 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Instant Fee Collection</h4>
                                            <p className="text-sm text-slate-500">Integrated payment gateways with automated receipt generation.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="mt-1 w-10 h-10 shrink-0 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                            <Smartphone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">Mobile-First UI</h4>
                                            <p className="text-sm text-slate-500">Optimized for 4G/5G mobile users which account for 85% of traffic.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="mt-1 w-10 h-10 shrink-0 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white">SEO & GEO Readiness</h4>
                                            <p className="text-sm text-slate-500">Structured data to rank on Google and be cited by AI search engines.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <h2 className="text-3xl font-bold mb-6">GEO: How AI Search Engines View Your School</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                                In 2026, parents are asking ChatGPT and Gemini: <em>"Which school near me has the best science facilities?"</em>. To ensure AI agents cite your school, your website must have:
                            </p>
                            <ul className="list-disc pl-6 space-y-4 text-slate-600 dark:text-slate-400 mb-12">
                                <li><strong>FAQ Schema:</strong> Direct answers to common parent questions.</li>
                                <li><strong>Branded Citations:</strong> Consistent Name, Address, and Phone (NAP) data across the web.</li>
                                <li><strong>Long-form Content:</strong> Detailed guides about your curriculum, facilities, and staff.</li>
                            </ul>

                            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-6 mb-16">
                                {articleFaqs.map((faq, i) => (
                                    <div key={i} className="p-8 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">{faq.q}</h3>
                                        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 rounded-[32px] bg-slate-900 text-white text-center mb-16 relative overflow-hidden">
                                <div className="absolute inset-0 bg-blue-600/10 blur-[60px]" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4">Ready to upgrade your school's digital presence?</h3>
                                    <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                                        We've built infrastructure for some of the most innovative educational brands in India.
                                    </p>
                                    <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3.5 rounded-full font-bold hover:scale-105 transition-transform">
                                        Consult Our Engineers <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </main>
    );
}
