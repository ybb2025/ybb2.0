"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";

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
    return <span className="font-mono text-xs text-gray-500 tabular-nums">{time}</span>;
}

export function AdminTopBar() {
    const pathname = usePathname();

    // Compute breadcrumb segments
    const base = "/" + pathname.split("/").slice(0, 3).join("/").replace(/^\//, "");
    const crumbs = BREADCRUMBS[pathname] ?? BREADCRUMBS[base] ?? ["Admin"];
    const pageTitle = crumbs[crumbs.length - 1];

    const day = new Date().toLocaleDateString("en-IN", {
        weekday: "short", day: "numeric", month: "short"
    });

    return (
        <header className="h-[60px] border-b border-white/[0.06] bg-[#0C0C0C]/80 backdrop-blur-md flex items-center justify-between px-8 shrink-0 sticky top-0 z-20">

            {/* Left: breadcrumb */}
            <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-600 font-medium">YBB</span>
                <span className="text-gray-700">/</span>
                <span className="text-[13px] font-semibold text-white tracking-tight">{pageTitle}</span>
            </div>

            {/* Right: utilities */}
            <div className="flex items-center gap-3">

                {/* Date + clock */}
                <div className="hidden md:flex items-center gap-2 text-xs text-gray-600">
                    <span>{day}</span>
                    <span className="text-gray-700">·</span>
                    <LiveClock />
                </div>

                <div className="w-px h-4 bg-white/[0.08]" />

                {/* Search command */}
                <button className="hidden md:flex items-center gap-2.5 px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.07] rounded-xl text-xs text-gray-500 transition-all border border-white/[0.06] hover:border-white/10 group">
                    <Search className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400" />
                    <span className="text-gray-600 group-hover:text-gray-400">Search</span>
                    <kbd className="ml-1 text-[9px] bg-black/50 border border-white/10 rounded-md px-1.5 py-0.5 text-gray-600 font-mono">⌘K</kbd>
                </button>

                {/* Notification bell */}
                <button className="relative w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white/[0.05] transition-colors text-gray-600 hover:text-gray-300">
                    <Bell className="w-4 h-4" />
                </button>

                {/* Avatar */}
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-[0_0_12px_rgba(37,99,235,0.3)]">
                    A
                </div>

            </div>
        </header>
    );
}
