"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import {
    LayoutDashboard, Inbox, FileText,
    FolderKanban, TrendingUp, Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";

const NAV_MAIN = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/inquiries", label: "Inquiries", icon: Inbox },
    { href: "/admin/quotes", label: "Quotes", icon: FileText },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/revenue", label: "Revenue", icon: TrendingUp },
];

const NAV_SYSTEM = [
    { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function SidebarNav() {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (href: string, exact?: boolean) =>
        exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin-login");
    };

    const NavItem = ({ href, label, icon: Icon, exact }: { href: string; label: string; icon: React.ElementType; exact?: boolean }) => {
        const active = isActive(href, exact);
        return (
            <Link
                href={href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group ${active
                        ? "bg-blue-600/15 text-blue-400"
                        : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]"
                    }`}
            >
                {/* Active left bar */}
                {active && (
                    <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] bg-blue-500 rounded-r-full shadow-[0_0_8px_rgba(59,130,246,0.7)]" />
                )}
                <Icon className={`w-[15px] h-[15px] shrink-0 ${active ? "text-blue-400" : "text-gray-600 group-hover:text-gray-300"}`} />
                <span>{label}</span>
                {/* Active dot */}
                {active && (
                    <span className="ml-auto w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                )}
            </Link>
        );
    };

    return (
        <div className="flex-1 flex flex-col overflow-y-auto">
            {/* Main nav */}
            <nav className="flex-1 px-3 py-4 space-y-0.5">
                <p className="px-3 pb-2 text-[9px] font-black uppercase tracking-[0.16em] text-gray-700">Workspace</p>
                {NAV_MAIN.map(n => <NavItem key={n.href} {...n} />)}
            </nav>

            {/* System nav */}
            <div className="px-3 pb-3 pt-3 border-t border-white/[0.05]">
                <p className="px-3 pb-2 text-[9px] font-black uppercase tracking-[0.16em] text-gray-700">System</p>
                {NAV_SYSTEM.map(n => <NavItem key={n.href} {...n} />)}

                <div className="mt-2 space-y-0.5">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-all"
                    >
                        <ExternalLink className="w-[15px] h-[15px] shrink-0" />
                        View Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-600 hover:text-red-400 hover:bg-red-500/[0.05] transition-all"
                    >
                        <LogOut className="w-[15px] h-[15px] shrink-0" />
                        Sign Out
                    </button>
                </div>

                {/* Version badge */}
                <div className="mt-4 px-3 flex items-center justify-between">
                    <span className="text-[9px] text-gray-700 font-mono">v1.0.0</span>
                    <span className="text-[9px] text-gray-700 font-mono">YBB OS</span>
                </div>
            </div>
        </div>
    );
}
