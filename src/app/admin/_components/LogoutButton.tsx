"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.push("/admin-login");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
        >
            <LogOut className="w-3.5 h-3.5" />
            {loading ? "Logging out..." : "Log out"}
        </button>
    );
}
