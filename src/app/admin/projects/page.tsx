"use client";

import { useState } from "react";
import { Plus, FolderKanban } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
    Building: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    Review: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    Live: "bg-green-500/10 text-green-400 border border-green-500/20",
};

// Placeholder — projects will be added as clients approve quotes
const PLACEHOLDER_PROJECTS: { client: string; scope: string; status: string; start: string; end: string }[] = [];

export default function ProjectsPage() {
    const [projects] = useState(PLACEHOLDER_PROJECTS);

    return (
        <div className="p-8">
            <div className="flex items-start justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
                    <p className="text-sm text-gray-400 mt-1">Approved client builds · {projects.length} active</p>
                </div>
                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
                    <Plus className="w-4 h-4" /> Add Project
                </button>
            </div>

            {projects.length === 0 ? (
                <div className="bg-[#0A0A0A] rounded-2xl border border-white/5 border-dashed flex flex-col items-center justify-center py-20 text-center px-8">
                    <FolderKanban className="w-10 h-10 text-gray-600 mb-4" />
                    <h2 className="text-base font-semibold text-gray-200 mb-1">No active projects yet</h2>
                    <p className="text-sm text-gray-500 max-w-xs">
                        When a client approves a quote, convert their inquiry to a project here.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
                        <span className="w-2 h-2 rounded-full bg-blue-500" /> Building
                        <span className="w-2 h-2 rounded-full bg-amber-500 ml-2" /> Review
                        <span className="w-2 h-2 rounded-full bg-green-500 ml-2" /> Live
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {projects.map((p, i) => (
                        <div key={i} className="bg-[#0A0A0A] rounded-2xl border border-white/5 p-6 hover:border-blue-500/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="text-sm font-bold text-white">{p.client}</div>
                                    <div className="text-xs text-gray-400 mt-0.5">{p.scope}</div>
                                </div>
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[p.status]}`}>{p.status}</span>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Started: {p.start}</span>
                                <span>·</span>
                                <span>Due: {p.end}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
