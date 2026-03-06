"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Bell, Bot, Sparkles } from "lucide-react";

const BREADCRUMBS: Record<string, string[]> = {
    "/admin": ["Dashboard"],
    "/admin/inquiries": ["Inquiries"],
    "/admin/quotes": ["Quotes"],
    "/admin/projects": ["Projects"],
    "/admin/revenue": ["Revenue"],
    "/admin/settings": ["Settings"],
};

function LiveClock() {
    const [time, setTime] = useState("");
    useEffect(() => {
        const update = () => {
            setTime(new Date().toLocaleTimeString("en-IN", {
                hour: "2-digit", minute: "2-digit", hour12: true
            }));
        };
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return <span className="font-mono text-xs text-slate-500 tabular-nums">{time}</span>;
}

interface AdminTopBarProps {
    onToggleJarvis?: () => void;
    isJarvisOpen?: boolean;
}

export function AdminTopBar({ onToggleJarvis, isJarvisOpen }: AdminTopBarProps) {
    const pathname = usePathname();

    // Compute breadcrumb segments
    const base = "/" + pathname.split("/").slice(0, 3).join("/").replace(/^\//, "");
    const crumbs = BREADCRUMBS[pathname] ?? BREADCRUMBS[base] ?? ["Admin"];
    const pageTitle = crumbs[crumbs.length - 1];

    const day = new Date().toLocaleDateString("en-IN", {
        weekday: "short", day: "numeric", month: "short"
    });

    return (
        <header className="h-[60px] border-b border-slate-800/60 bg-[#0A0A0B]/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 sticky top-0 z-20 shadow-sm">

            {/* Left: breadcrumb */}
            <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">YBB</span>
                <span className="text-slate-800 font-bold text-lg">/</span>
                <span className="text-[13px] font-bold text-slate-100 tracking-wide uppercase">{pageTitle}</span>
            </div>

            {/* Right: utilities */}
            <div className="flex items-center gap-4">

                {/* Date + clock */}
                <div className="hidden lg:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span>{day}</span>
                    <span className="text-slate-800">·</span>
                    <LiveClock />
                </div>

                <div className="w-px h-4 bg-slate-800/60" />

                {/* Jarvis Trigger */}
                <button
                    onClick={onToggleJarvis}
                    className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold transition-all border group relative overflow-hidden ${isJarvisOpen
                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                            : 'bg-[#111113] border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30'
                        }`}
                >
                    <div className="relative">
                        <Bot className={`w-4 h-4 ${isJarvisOpen ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`} />
                        {!isJarvisOpen && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full animate-ping opacity-75" />
                        )}
                    </div>
                    <span className="uppercase tracking-widest">Jarvis</span>
                    {isJarvisOpen && <Sparkles className="w-3 h-3 animate-pulse text-indigo-200" />}
                </button>

                {/* Search command */}
                <button className="hidden xl:flex items-center gap-2.5 px-3.5 py-2 bg-[#111113] hover:bg-[#18181B] rounded-xl text-xs text-slate-400 transition-all border border-slate-800 hover:border-slate-700 group">
                    <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                    <span className="text-slate-500 group-hover:text-slate-200 uppercase tracking-widest text-[10px] font-bold">Search</span>
                    <kbd className="ml-1 text-[9px] bg-slate-900 border border-slate-800 rounded-md px-1.5 py-0.5 text-slate-500 font-mono shadow-sm">⌘K</kbd>
                </button>

                {/* Notification bell */}
                <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-[#111113] border border-slate-800 hover:bg-slate-800 transition-all text-slate-500 hover:text-slate-200 group">
                    <Bell className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#111113]" />
                </button>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center text-[11px] font-black text-white shadow-[0_0_15px_rgba(99,102,241,0.3)] ring-2 ring-slate-900 ring-offset-2 ring-offset-slate-900 transform active:scale-90 transition-transform cursor-pointer">
                    A
                </div>

            </div>
        </header>
    );
}
