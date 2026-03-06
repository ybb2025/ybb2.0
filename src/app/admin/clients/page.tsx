import React from 'react';
import {
    Users, Briefcase, TrendingUp, Search, Filter,
    MoreHorizontal, Mail, MapPin, Calendar, Star, Phone
} from 'lucide-react';

export default function ClientsPage() {
    const clients = [
        {
            id: 'CL-001',
            name: 'Sarah Jenkins',
            company: 'Nexus Tech',
            email: 'sarah.j@nexustech.io',
            status: 'Active',
            spend: '₹4,50,000',
            projects: 3,
            location: 'Mumbai, IN',
            joined: 'Oct 2023',
            avatar: 'SJ'
        },
        {
            id: 'CL-002',
            name: 'Rahul Mehta',
            company: 'Rahul\'s Ventures',
            email: 'rahul@ventures.in',
            status: 'Active',
            spend: '₹1,50,000',
            projects: 1,
            location: 'Delhi, IN',
            joined: 'Jan 2024',
            avatar: 'RM'
        },
        {
            id: 'CL-003',
            name: 'Priya Sharma',
            company: 'Stellar Design',
            email: 'priya@stellar.design',
            status: 'Inactive',
            spend: '₹85,000',
            projects: 1,
            location: 'Bangalore, IN',
            joined: 'Aug 2023',
            avatar: 'PS'
        },
        {
            id: 'CL-004',
            name: 'Alex Costa',
            company: 'Global Logistics',
            email: 'alex.c@globallogistics.com',
            status: 'Active',
            spend: '₹12,00,000',
            projects: 4,
            location: 'Dubai, UAE',
            joined: 'Mar 2023',
            avatar: 'AC'
        },
        {
            id: 'CL-005',
            name: 'John Doe',
            company: 'FitTrack SaaS',
            email: 'john@fittrack.run',
            status: 'Pending',
            spend: '?',
            projects: 0,
            location: 'Pune, IN',
            joined: 'Mar 2024',
            avatar: 'JD'
        }
    ];

    return (
        <div className="min-h-[calc(100vh-60px)] bg-[#0A0A0B] text-slate-300 font-sans p-8 selection:bg-indigo-500/30">

            {/* Header Area */}
            <div className="max-w-[1600px] mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 bg-indigo-500/10 border border-indigo-500/20 rounded-xl flex justify-center items-center text-indigo-400">
                                <Users size={20} />
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-50">Client Directory</h1>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xl">
                            Manage all active and inactive agency clients. View total lifetime value, active ongoing projects, and contact points from a centralized hub.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-800 bg-slate-900 rounded-lg hover:border-slate-700 hover:text-white transition-all text-sm font-medium">
                            <Filter size={16} />
                            Filter
                        </button>
                        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all text-sm font-medium shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]">
                            Add New Client
                        </button>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-[#111113] border border-slate-800/60 p-5 rounded-2xl flex items-center justify-between shadow-lg">
                        <div>
                            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mb-1">Total Active Clients</p>
                            <p className="text-2xl font-bold text-slate-50">4</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                            <Briefcase size={20} />
                        </div>
                    </div>
                    <div className="bg-[#111113] border border-slate-800/60 p-5 rounded-2xl flex items-center justify-between shadow-lg">
                        <div>
                            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mb-1">Lifetime Value (LTV)</p>
                            <p className="text-2xl font-bold text-slate-50">₹18,85,000</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <div className="bg-[#111113] border border-slate-800/60 p-5 rounded-2xl flex items-center justify-between shadow-lg">
                        <div>
                            <p className="text-xs text-slate-500 font-medium tracking-wider uppercase mb-1">Avg. Projects / Client</p>
                            <p className="text-2xl font-bold text-slate-50">2.1</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-400">
                            <Star size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Clients Table Area */}
            <div className="max-w-[1600px] mx-auto bg-[#111113] border border-slate-800/60 rounded-2xl overflow-hidden shadow-2xl">

                {/* Table Context/Search Bar */}
                <div className="p-4 border-b border-slate-800/60 flex items-center gap-4 bg-[#0A0A0B]/50">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            className="w-full bg-[#18181B] border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#0A0A0B] border-b border-slate-800/60 text-xs uppercase tracking-widest font-semibold text-slate-500">
                                <th className="p-4 pl-6 font-medium">Client Info</th>
                                <th className="p-4 font-medium">Contact</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Value & Stats</th>
                                <th className="p-4 font-medium text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-sm">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-[#18181B] transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                                                {client.avatar}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-200 mb-0.5">{client.name}</div>
                                                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                                                    <Briefcase size={12} /> {client.company}
                                                    <span className="mx-1 text-slate-700">•</span>
                                                    <MapPin size={12} /> {client.location}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex flex-col gap-1.5 text-xs text-slate-400">
                                            <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer transition-colors w-max"><Mail size={13} /> {client.email}</span>
                                            <span className="flex items-center gap-1.5 hover:text-indigo-400 cursor-pointer transition-colors w-max"><Phone size={13} /> Request Phone</span>
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider
                                            ${client.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                client.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                    'bg-slate-500/10 text-slate-400 border border-slate-500/20'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${client.status === 'Active' ? 'bg-emerald-400' : client.status === 'Pending' ? 'bg-amber-400' : 'bg-slate-500'}`} />
                                            {client.status}
                                        </div>
                                    </td>

                                    <td className="p-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold text-slate-200">{client.spend}</span>
                                            <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                                                {client.projects} Active Project{client.projects !== 1 && 's'}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4 pr-6 text-right">
                                        <button className="p-2 text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-medium text-slate-500 bg-[#0A0A0B]/30">
                    <div>Showing 5 of 5 clients</div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 rounded-md border border-slate-800 hover:bg-slate-800 hover:text-slate-300 transition-colors disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1.5 rounded-md border border-slate-800 hover:bg-slate-800 hover:text-slate-300 transition-colors disabled:opacity-50">Next</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
