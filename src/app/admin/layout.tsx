import { SidebarNav } from "./_components/SidebarNav";
import { AdminTopBar } from "./_components/AdminTopBar";

export const metadata = { title: "YBB — Command Center" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#080808] text-white flex font-sans selection:bg-blue-500/30 antialiased">

            {/* ══ Sidebar ══ */}
            <aside className="w-64 bg-[#0C0C0C] border-r border-white/[0.06] flex flex-col shrink-0 fixed left-0 top-0 h-full z-30">

                {/* Logo / Brand */}
                <div className="px-6 h-[60px] flex items-center border-b border-white/[0.06] shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-[8px] bg-blue-600 flex items-center justify-center font-black text-white text-[9px] tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            YBB
                        </div>
                        <div>
                            <div className="font-bold text-white text-sm leading-none">YBB</div>
                            <div className="text-[9px] text-gray-600 mt-0.5 font-medium tracking-widest uppercase">Command Center</div>
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
            <div className="flex-1 ml-64 flex flex-col min-h-screen">
                <AdminTopBar />
                <main className="flex-1 bg-[#080808]">
                    {children}
                </main>
            </div>

        </div>
    );
}
