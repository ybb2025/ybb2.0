"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatedPasswordInput } from "@/components/ui/animated-password-input";
import { Eye, EyeOff } from "lucide-react";

// ─── Pupil ────────────────────────────────────────────────────────────────────

interface PupilProps {
    size?: number;
    maxDistance?: number;
    pupilColor?: string;
    forceLookX?: number;
    forceLookY?: number;
}

const Pupil = ({ size = 12, maxDistance = 5, pupilColor = "black", forceLookX, forceLookY }: PupilProps) => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", h);
        return () => window.removeEventListener("mousemove", h);
    }, []);

    const pos = () => {
        if (!ref.current) return { x: 0, y: 0 };
        if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
        const r = ref.current.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = mouse.x - cx, dy = mouse.y - cy;
        const d = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
        const a = Math.atan2(dy, dx);
        return { x: Math.cos(a) * d, y: Math.sin(a) * d };
    };
    const p = pos();

    return (
        <div
            ref={ref}
            className="rounded-full"
            style={{ width: size, height: size, backgroundColor: pupilColor, transform: `translate(${p.x}px,${p.y}px)`, transition: "transform 0.1s ease-out" }}
        />
    );
};

// ─── EyeBall ──────────────────────────────────────────────────────────────────

interface EyeBallProps {
    size?: number; pupilSize?: number; maxDistance?: number;
    eyeColor?: string; pupilColor?: string; isBlinking?: boolean;
    forceLookX?: number; forceLookY?: number;
}

const EyeBall = ({ size = 48, pupilSize = 16, maxDistance = 10, eyeColor = "white", pupilColor = "black", isBlinking = false, forceLookX, forceLookY }: EyeBallProps) => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", h);
        return () => window.removeEventListener("mousemove", h);
    }, []);

    const pos = () => {
        if (!ref.current) return { x: 0, y: 0 };
        if (forceLookX !== undefined && forceLookY !== undefined) return { x: forceLookX, y: forceLookY };
        const r = ref.current.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = mouse.x - cx, dy = mouse.y - cy;
        const d = Math.min(Math.sqrt(dx ** 2 + dy ** 2), maxDistance);
        const a = Math.atan2(dy, dx);
        return { x: Math.cos(a) * d, y: Math.sin(a) * d };
    };
    const p = pos();

    return (
        <div
            ref={ref}
            className="rounded-full flex items-center justify-center transition-all duration-150"
            style={{ width: size, height: isBlinking ? 2 : size, backgroundColor: eyeColor, overflow: "hidden" }}
        >
            {!isBlinking && (
                <div
                    className="rounded-full"
                    style={{ width: pupilSize, height: pupilSize, backgroundColor: pupilColor, transform: `translate(${p.x}px,${p.y}px)`, transition: "transform 0.1s ease-out" }}
                />
            )}
        </div>
    );
};

// ─── Animated Login Page ─────────────────────────────────────────────────────

export function AnimatedLoginPage() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
    const [isBlackBlinking, setIsBlackBlinking] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
    const [isPurplePeeking, setIsPurplePeeking] = useState(false);

    const purpleRef = useRef<HTMLDivElement>(null);
    const blackRef = useRef<HTMLDivElement>(null);
    const yellowRef = useRef<HTMLDivElement>(null);
    const orangeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const h = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", h);
        return () => window.removeEventListener("mousemove", h);
    }, []);

    // Random blink — purple
    useEffect(() => {
        const blink = () => {
            const t = setTimeout(() => {
                setIsPurpleBlinking(true);
                setTimeout(() => { setIsPurpleBlinking(false); blink(); }, 150);
            }, Math.random() * 4000 + 3000);
            return t;
        };
        const t = blink();
        return () => clearTimeout(t);
    }, []);

    // Random blink — black
    useEffect(() => {
        const blink = () => {
            const t = setTimeout(() => {
                setIsBlackBlinking(true);
                setTimeout(() => { setIsBlackBlinking(false); blink(); }, 150);
            }, Math.random() * 4000 + 3000);
            return t;
        };
        const t = blink();
        return () => clearTimeout(t);
    }, []);

    // Characters look at each other briefly when you start typing
    useEffect(() => {
        if (isTyping) {
            setIsLookingAtEachOther(true);
            const t = setTimeout(() => setIsLookingAtEachOther(false), 800);
            return () => clearTimeout(t);
        } else {
            setIsLookingAtEachOther(false);
        }
    }, [isTyping]);

    // Purple peeks when password is visible
    useEffect(() => {
        if (password.length > 0 && showPassword) {
            const t = setTimeout(() => {
                setIsPurplePeeking(true);
                setTimeout(() => setIsPurplePeeking(false), 800);
            }, Math.random() * 3000 + 2000);
            return () => clearTimeout(t);
        } else {
            setIsPurplePeeking(false);
        }
    }, [password, showPassword, isPurplePeeking]);

    const calcPos = (ref: React.RefObject<HTMLDivElement | null>) => {
        if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };
        const r = ref.current.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 3;
        const dx = mouse.x - cx, dy = mouse.y - cy;
        return {
            faceX: Math.max(-15, Math.min(15, dx / 20)),
            faceY: Math.max(-10, Math.min(10, dy / 30)),
            bodySkew: Math.max(-6, Math.min(6, -dx / 120)),
        };
    };

    const pp = calcPos(purpleRef);
    const bp = calcPos(blackRef);
    const yp = calcPos(yellowRef);
    const op = calcPos(orangeRef);

    const isHidingFromPassword = isTyping || (password.length > 0 && !showPassword);
    const isPasswordVisible = password.length > 0 && showPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const data = await res.json();
                setError(data.error || "Invalid credentials.");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 transition-colors duration-300">

            {/* ── LEFT: Characters ─────────────────────────────────────────── */}
            <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-12 text-white overflow-hidden">

                {/* Logo */}
                <div className="relative z-20 flex items-center gap-2 text-lg font-bold">
                    <div className="h-8 w-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-bold">YB</div>
                    <span>YBB</span>
                </div>

                {/* Characters Stage */}
                <div className="relative z-20 flex items-end justify-center h-[500px]">
                    <div className="relative" style={{ width: 550, height: 400 }}>

                        {/* Purple — back */}
                        <div ref={purpleRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                                left: 70, width: 180,
                                height: isHidingFromPassword ? 440 : 400,
                                backgroundColor: "#6C3FF5",
                                borderRadius: "10px 10px 0 0",
                                zIndex: 1,
                                transform: isPasswordVisible
                                    ? "skewX(0deg)"
                                    : isHidingFromPassword
                                        ? `skewX(${(pp.bodySkew || 0) - 12}deg) translateX(40px)`
                                        : `skewX(${pp.bodySkew || 0}deg)`,
                                transformOrigin: "bottom center",
                            }}
                        >
                            <div className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                                style={{
                                    left: isPasswordVisible ? 20 : isLookingAtEachOther ? 55 : 45 + pp.faceX,
                                    top: isPasswordVisible ? 35 : isLookingAtEachOther ? 65 : 40 + pp.faceY,
                                }}
                            >
                                {[0, 1].map(i => (
                                    <EyeBall key={i} size={18} pupilSize={7} maxDistance={5} eyeColor="white" pupilColor="#2D2D2D"
                                        isBlinking={isPurpleBlinking}
                                        forceLookX={isPasswordVisible ? (isPurplePeeking ? 4 : -4) : isLookingAtEachOther ? 3 : undefined}
                                        forceLookY={isPasswordVisible ? (isPurplePeeking ? 5 : -4) : isLookingAtEachOther ? 4 : undefined}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Black — middle */}
                        <div ref={blackRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                                left: 240, width: 120, height: 310,
                                backgroundColor: "#2D2D2D",
                                borderRadius: "8px 8px 0 0",
                                zIndex: 2,
                                transform: isPasswordVisible
                                    ? "skewX(0deg)"
                                    : isLookingAtEachOther
                                        ? `skewX(${(bp.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                                        : isHidingFromPassword
                                            ? `skewX(${(bp.bodySkew || 0) * 1.5}deg)`
                                            : `skewX(${bp.bodySkew || 0}deg)`,
                                transformOrigin: "bottom center",
                            }}
                        >
                            <div className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                                style={{
                                    left: isPasswordVisible ? 10 : isLookingAtEachOther ? 32 : 26 + bp.faceX,
                                    top: isPasswordVisible ? 28 : isLookingAtEachOther ? 12 : 32 + bp.faceY,
                                }}
                            >
                                {[0, 1].map(i => (
                                    <EyeBall key={i} size={16} pupilSize={6} maxDistance={4} eyeColor="white" pupilColor="#2D2D2D"
                                        isBlinking={isBlackBlinking}
                                        forceLookX={isPasswordVisible ? -4 : isLookingAtEachOther ? 0 : undefined}
                                        forceLookY={isPasswordVisible ? -4 : isLookingAtEachOther ? -4 : undefined}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Orange — front left */}
                        <div ref={orangeRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                                left: 0, width: 240, height: 200,
                                backgroundColor: "#FF9B6B",
                                borderRadius: "120px 120px 0 0",
                                zIndex: 3,
                                transform: isPasswordVisible ? "skewX(0deg)" : `skewX(${op.bodySkew || 0}deg)`,
                                transformOrigin: "bottom center",
                            }}
                        >
                            <div className="absolute flex gap-8 transition-all duration-200 ease-out"
                                style={{
                                    left: isPasswordVisible ? 50 : 82 + (op.faceX || 0),
                                    top: isPasswordVisible ? 85 : 90 + (op.faceY || 0),
                                }}
                            >
                                {[0, 1].map(i => (
                                    <Pupil key={i} size={12} maxDistance={5} pupilColor="#2D2D2D"
                                        forceLookX={isPasswordVisible ? -5 : undefined}
                                        forceLookY={isPasswordVisible ? -4 : undefined}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Yellow — front right */}
                        <div ref={yellowRef} className="absolute bottom-0 transition-all duration-700 ease-in-out"
                            style={{
                                left: 310, width: 140, height: 230,
                                backgroundColor: "#E8D754",
                                borderRadius: "70px 70px 0 0",
                                zIndex: 4,
                                transform: isPasswordVisible ? "skewX(0deg)" : `skewX(${yp.bodySkew || 0}deg)`,
                                transformOrigin: "bottom center",
                            }}
                        >
                            <div className="absolute flex gap-6 transition-all duration-200 ease-out"
                                style={{
                                    left: isPasswordVisible ? 20 : 52 + (yp.faceX || 0),
                                    top: isPasswordVisible ? 35 : 40 + (yp.faceY || 0),
                                }}
                            >
                                {[0, 1].map(i => (
                                    <Pupil key={i} size={12} maxDistance={5} pupilColor="#2D2D2D"
                                        forceLookX={isPasswordVisible ? -5 : undefined}
                                        forceLookY={isPasswordVisible ? -4 : undefined}
                                    />
                                ))}
                            </div>
                            {/* Mouth */}
                            <div className="absolute w-20 h-1 bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                                style={{
                                    left: isPasswordVisible ? 10 : 40 + (yp.faceX || 0),
                                    top: isPasswordVisible ? 88 : 88 + (yp.faceY || 0),
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer links */}
                <div className="relative z-20 flex items-center gap-8 text-sm text-white/60">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                </div>

                {/* Decorative */}
                <div className="absolute inset-0 bg-[size:20px_20px] opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)]" />
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            </div>

            {/* ── RIGHT: Form ──────────────────────────────────────────────── */}
            <div className="flex items-center justify-center p-8 bg-[#F8FAFC] dark:bg-[#0D1117] transition-colors duration-300">
                <div className="w-full max-w-[420px]">

                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center justify-center gap-2 text-lg font-bold mb-12">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs">YB</div>
                        <span className="text-slate-900 dark:text-slate-100">YBB</span>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2">Welcome back.</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Admin access · YBB Operating System</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@ybb.com"
                                value={email}
                                autoComplete="off"
                                onChange={e => setEmail(e.target.value)}
                                onFocus={() => setIsTyping(true)}
                                onBlur={() => setIsTyping(false)}
                                required
                                className="h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-blue-400 dark:focus:border-blue-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</Label>
                            <AnimatedPasswordInput
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                error={!!error}
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer text-slate-600 dark:text-slate-400">
                                    Remember for 30 days
                                </Label>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                {error}
                            </div>
                        )}

                        <Button type="submit" size="lg" disabled={isLoading}
                            className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
                        >
                            {isLoading ? "Authenticating..." : "Access Admin Panel"}
                        </Button>
                    </form>

                    <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-8">
                        Restricted to authorised YBB team members only.
                    </p>
                </div>
            </div>

        </div>
    );
}
