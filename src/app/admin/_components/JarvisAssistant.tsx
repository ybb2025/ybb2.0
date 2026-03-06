"use client";

import { useState, useRef, useEffect } from "react";
import {
    Bot, X, Send, Sparkles, Zap, Terminal,
    MessageSquare, Command, Activity, Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface JarvisAssistantProps {
    isOpen: boolean;
    onClose: () => void;
    context?: { type: string, id: string } | null;
}

export function JarvisAssistant({ isOpen, onClose, context }: JarvisAssistantProps) {
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
        { role: 'assistant', content: "Hello Admin. Jarvis is online. How can I assist you today?" }
    ]);

    useEffect(() => {
        if (context?.type === 'inquiry') {
            setMessages([
                { role: 'assistant', content: `Hello Admin. Jarvis is online. I've detected you are viewing Inquiry #${context.id}. I have pulled the project requirements and am ready to generate blueprints or draft responses.` }
            ]);
        } else {
            setMessages([
                { role: 'assistant', content: "Hello Admin. Jarvis is online. I have analyzed current business metrics. How can I assist you today?" }
            ]);
        }
    }, [context]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isThinking) return;

        const userMessage = { role: 'user' as const, content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsThinking(true);

        try {
            const response = await fetch("/api/admin/jarvis/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages,
                    context: context
                })
            });

            const data = await response.json();
            if (data.content) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error while processing your request." }]);
            }
        } catch (error) {
            console.error("Jarvis Chat Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: "Link to the core engine lost. Please check connection." }]);
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.aside
                    initial={{ x: 350 }}
                    animate={{ x: 0 }}
                    exit={{ x: 350 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed right-0 top-0 h-full w-[350px] bg-[#0A0A0B]/95 backdrop-blur-2xl border-l border-slate-800/60 z-[60] shadow-[-20px_0_50px_rgba(0,0,0,0.5)] flex flex-col"
                >
                    {/* Header */}
                    <div className="h-[60px] border-b border-slate-800/60 px-6 flex items-center justify-between shrink-0 bg-[#111113]/50">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                <Bot className="w-4 h-4" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-100 tracking-wide uppercase">Jarvis</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active System</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
                    >
                        {messages.map((m, i) => (
                            <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${m.role === 'user'
                                    ? 'bg-indigo-600 text-white shadow-lg rounded-tr-none'
                                    : 'bg-[#18181B] border border-slate-800 text-slate-300 rounded-tl-none shadow-sm font-sans'
                                    }`}>
                                    {m.content}
                                </div>
                                <span className="text-[10px] text-slate-600 font-bold uppercase mt-1.5 px-1 tracking-widest">
                                    {m.role === 'user' ? 'Admin' : 'Jarvis'}
                                </span>
                            </div>
                        ))}
                        {isThinking && (
                            <div className="flex flex-col items-start animate-pulse">
                                <div className="bg-[#18181B] border border-slate-800 text-slate-500 p-3 rounded-2xl rounded-tl-none text-[10px] font-mono italic">
                                    Analyzing system data via tool-calling...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Quick suggestions */}
                    <div className="px-6 py-4 grid grid-cols-2 gap-2 border-t border-slate-800/40 bg-[#0A0A0B]/50 backdrop-blur-sm">
                        <button className="flex items-center gap-2 px-3 py-2 bg-[#111113] border border-slate-800/60 rounded-xl text-[10px] font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all text-left uppercase tracking-widest group">
                            <Zap className="w-3 h-3 text-amber-500" />
                            <span>Quick Quote</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-[#111113] border border-slate-800/60 rounded-xl text-[10px] font-bold text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all text-left uppercase tracking-widest group">
                            <Terminal className="w-3 h-3 text-blue-500" />
                            <span>Dev Prompt</span>
                        </button>
                    </div>

                    {/* Input Area */}
                    <div className="p-6 bg-[#111113]/50 border-t border-slate-800/60">
                        <div className="relative group">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Type a command or ask Jarvis..."
                                className="w-full bg-[#0A0A0B] border border-slate-800/60 rounded-2xl p-4 pr-12 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all resize-none min-h-[100px] shadow-inner"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute bottom-4 right-4 p-2.5 bg-indigo-600 text-white rounded-xl shadow-[0_5px_15px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition-all active:scale-95 group-hover:shadow-[0_8px_25px_rgba(79,70,229,0.4)]"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-4 px-1">
                            <div className="flex gap-3">
                                <Activity className="w-3.5 h-3.5 text-slate-700 hover:text-indigo-500 cursor-pointer transition-colors" />
                                <Cpu className="w-3.5 h-3.5 text-slate-700 hover:text-indigo-500 cursor-pointer transition-colors" />
                                <Sparkles className="w-3.5 h-3.5 text-slate-700 hover:text-indigo-500 cursor-pointer transition-colors" />
                            </div>
                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-1.5 underline underline-offset-4 decoration-slate-800">
                                <Command className="w-3 h-3" /> Execute
                            </span>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
