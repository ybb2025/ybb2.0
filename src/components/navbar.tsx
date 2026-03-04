"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Globe, Layers, Zap, Briefcase, User } from "lucide-react";
import { TubelightNavbar } from "@/components/ui/tubelight-navbar";

export function Navbar() {
    const pathname = usePathname();
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Do not render this navbar on admin routes
    if (pathname?.startsWith("/admin")) {
        return null;
    }

    const navItems = [
        { name: 'Home', url: '/', icon: Globe },
        { name: 'Studio', url: '/studio', icon: Layers },
        { name: 'Ventures', url: '/ventures', icon: Zap },
        { name: 'Work', url: '/work', icon: Briefcase },
        { name: 'Contact', url: '/contact', icon: User }
    ];

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">
            {/* The actual Tubelight Nav wrapper (centered) */}
            <div className="pointer-events-auto">
                <TubelightNavbar items={navItems} />
            </div>

            {/* Corner controls (Theme toggle & Admin) */}
            <div className="absolute top-6 right-6 flex items-center gap-3 pointer-events-auto">
                <button
                    aria-label="Toggle dark mode"
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="relative h-10 w-10 rounded-full flex items-center justify-center transition-all bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hover:bg-white dark:hover:bg-slate-800 shadow-sm hover:scale-105"
                >
                    <Sun className="h-4 w-4 text-slate-700 dark:text-amber-400 absolute transition-all duration-300" style={{ opacity: mounted && !isDark ? 1 : 0, transform: mounted && !isDark ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)" }} />
                    <Moon className="h-4 w-4 text-slate-700 dark:text-blue-400 absolute transition-all duration-300" style={{ opacity: mounted && isDark ? 1 : 0, transform: mounted && isDark ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)" }} />
                </button>
                <Link
                    href="/admin-login"
                    className="hidden sm:inline-flex h-10 items-center justify-center rounded-full px-5 text-[13px] font-semibold text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                    Admin
                </Link>
            </div>

            {/* Branding Logo (Left corner) */}
            <div className="absolute top-6 left-6 flex items-center pointer-events-auto">
                <Link href="/" className="h-10 w-10 rounded-xl flex items-center justify-center font-black text-white text-[10px] tracking-wide bg-slate-900 shadow-lg hover:scale-105 transition-transform" aria-label="Home">
                    YBB
                </Link>
            </div>
        </nav>
    );
}
