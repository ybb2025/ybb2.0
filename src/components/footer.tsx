"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    // Do not render this footer on admin routes
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#0A0F1A]/50 backdrop-blur-xl transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-8 w-8 rounded-lg flex items-center justify-center font-black text-white text-[9px] tracking-wide bg-slate-900 dark:bg-white dark:text-slate-900 shadow-sm border border-slate-800 dark:border-slate-200">
                            YBB
                        </div>
                        <span className="font-bold tracking-tight text-slate-900 dark:text-white">YBB</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-4">
                        Quality over everything else. We build masterpieces that become your competitive advantage.
                    </p>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-4">
                        0% Templates. 100% Engineered.
                    </p>
                </div>

                {[
                    {
                        title: "Studio",
                        links: [
                            { label: "Studio", href: "/studio" },
                            { label: "Contact", href: "/contact" },
                        ]
                    },
                    {
                        title: "Work",
                        links: [
                            { label: "Our Work", href: "/work" },
                            { label: "Ventures", href: "/ventures" },
                        ]
                    },
                    {
                        title: "Connect",
                        links: [
                            { label: "Admin System Login", href: "/admin-login" },
                        ]
                    }
                ].map((col, idx) => (
                    <div key={idx}>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-widest">{col.title}</h4>
                        <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400 font-light cursor-pointer">
                            {col.links.map((link, linkIdx) => (
                                <li key={linkIdx}>
                                    <Link href={link.href} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
                    <p>© {new Date().getFullYear()} YBB. All rights reserved.</p>
                    <p>
                        Designed & Developed by <a href="/" className="hover:text-slate-800 dark:hover:text-white font-semibold transition-colors">Your Brand Builders</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
