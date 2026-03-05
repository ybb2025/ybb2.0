"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export const Spotlight = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { theme } = useTheme();

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Only show on dark theme or certain pages for maximum impact
    // For now, let's make it more prominent in dark mode
    const opacity = theme === "dark" ? 0.15 : 0.05;
    const size = theme === "dark" ? "600px" : "400px";

    return (
        <div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: `radial-gradient(${size} circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, ${opacity}), transparent 80%)`,
            }}
        />
    );
};
