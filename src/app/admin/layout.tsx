"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { SidebarNav } from "./_components/SidebarNav";
import { AdminTopBar } from "./_components/AdminTopBar";
import { JarvisAssistant } from "./_components/JarvisAssistant";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isJarvisOpen, setIsJarvisOpen] = useState(false);
    const pathname = usePathname();

    const context = useMemo(() => {
        const inquiryMatch = pathname.match(/\/admin\/inquiries\/([a-zA-Z0-9]+)/);
        if (inquiryMatch) {
            return { type: 'inquiry', id: inquiryMatch[1] };
        }
        return null;
    }, [pathname]);

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-slate-300 flex font-sans selection:bg-indigo-500/30 antialiased overflow-x-hidden">
            {/* ══ Sidebar ══ */}
            <aside className="w-64 bg-slate-950 border-r border-slate-900 flex flex-col shrink-0 fixed left-0 top-0 h-full z-[40] shadow-2xl">
                {/* Logo / Brand */}
                <div className="px-6 h-[60px] flex items-center border-b border-slate-800/60 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-[8px] bg-indigo-600 flex items-center justify-center font-black text-white text-[9px] tracking-wide shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                            YBB
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm leading-none">YBB</div>
                            <div className="text-[9px] text-slate-500 mt-0.5 font-medium tracking-widest uppercase">Command Center</div>
                        </div>
                    </div>
                    {/* Live ping */}
                    <div className="ml-auto flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                    </div>
                </div>
                {/* Navigation */}
                <SidebarNav />
            </aside>

            {/* ══ Main Content ══ */}
            <div className={`flex-1 ml-64 flex flex-col min-h-screen transition-all duration-500 ${isJarvisOpen ? 'mr-[350px]' : 'mr-0'}`}>
                <AdminTopBar onToggleJarvis={() => setIsJarvisOpen(!isJarvisOpen)} isJarvisOpen={isJarvisOpen} />
                <main className="flex-1 bg-[#0A0A0B]">
                    {children}
                </main>
            </div>

            {/* ══ Jarvis AI Assistant ══ */}
            <JarvisAssistant
                isOpen={isJarvisOpen}
                onClose={() => setIsJarvisOpen(false)}
                context={context}
            />
        </div>
    );
}
