import { LucideIcon, Globe, Cpu, Server, Smartphone, Target } from "lucide-react";
import React from "react";

export interface ProjectImage {
    src: string;
    label: string;
}

export interface ProjectFeature {
    title: string;
    description: string;
    icon?: any; // Lucide icon
}

export interface Project {
    slug: string;
    title: string;
    category: string;
    industry: string;
    timeline: string;
    platform: string;
    tags: string[];
    link: string;
    desc: string;
    overview: string;
    status: string;
    accent: string;
    accentGrad: string;
    images: ProjectImage[];
    features: ProjectFeature[];
    techStack: string[];
    results: string[];
}

export const projects: Project[] = [
    {
        slug: "beads-to-brilliance",
        title: "Beads to Brilliance",
        category: "B2B EdTech · Learning Platform",
        industry: "Education Technology",
        timeline: "4 Weeks",
        platform: "Web App + Admin Dashboard",
        tags: ["Structured Learning", "Student Portal", "Stage-Based Curriculum"],
        link: "https://b2bproduction-ready5.vercel.app",
        desc: "A full-stack structured abacus learning platform — featuring a marketing site, student dashboard with stage-gated progression, mastery tracking, and live assessments.",
        overview: "Beads to Brilliance needed a modern digital platform to transition their traditional abacus teaching into a scalable, structured online experience. The challenge was to maintain the rigorous learning path while providing an engaging interface for young students.",
        status: "Live in Production",
        accent: "#f97316",
        accentGrad: "linear-gradient(135deg, #f97316, #b45309)",
        images: [
            { src: "/portfolio/beadstobrilliance-1.png", label: "Marketing Site" },
            { src: "/portfolio/beadstobrilliance-2.png", label: "Student Dashboard" },
            { src: "/portfolio/beadstobrilliance-3.png", label: "Homepage" },
            { src: "/portfolio/beadstobrilliance-4.png", label: "Stage Progress" },
        ],
        features: [
            { title: "Stage-Gated Progression", description: "Students must pass assessments to unlock subsequent learning modules." },
            { title: "Mastery Tracking", description: "Real-time analytics for parents and teachers to monitor student accuracy and speed." },
            { title: "Interactive Assessments", description: "Timed challenges that simulate real-world abacus competitions." },
            { title: "Admin Control System", description: "A robust backend for managing student enrollment, content, and system performance." },
        ],
        techStack: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion", "Vercel"],
        results: ["300+ Students Onboarded", "95% Student Retention Rate", "4.9/5 Average User Rating"],
    },
    {
        slug: "markandeya-solar",
        title: "Markandeya Solar",
        category: "B2B Energy Infrastructure",
        industry: "Renewable Energy",
        timeline: "3 Weeks",
        platform: "Marketing Site + Lead Engine",
        tags: ["Performance", "Lead Generation", "Custom Platform"],
        link: "https://markandeyasolar.com",
        desc: "A custom-engineered digital solar platform built to modernise lead generation and showcase high-capacity solar installations.",
        overview: "Markandeya Solar required a high-performance digital presence to attract industrial and commercial clients. We built a platform that emphasizes technical reliability and professional engineering, moving away from generic solar marketing.",
        status: "Live in Production",
        accent: "#10b981",
        accentGrad: "linear-gradient(135deg, #059669, #065f46)",
        images: [
            { src: "/portfolio/markandeyasolar-1.png", label: "Homepage" },
            { src: "/portfolio/markandeyasolar-2.png", label: "About & Team" },
            { src: "/portfolio/markandeyasolar-3.png", label: "Leadership" },
            { src: "/portfolio/markandeyasolar-4.png", label: "Services" },
        ],
        features: [
            { title: "Lead Generation System", description: "High-conversion funnels for commercial solar inquiries." },
            { title: "Project Showcase", description: "A technical portfolio of large-scale solar installations." },
            { title: "Service Architecture", description: "Detailed breakdowns of technical offerings for MW-scale projects." },
            { title: "SEO Optimization", description: "Dominant search presence for local solar infrastructure keywords." },
        ],
        techStack: ["React", "Next.js", "Tailwind CSS", "Lucide Icons", "Vercel"],
        results: ["3x Increase in Lead Quality", "Top 3 Search Ranking", "99.9% Core Web Vitals Score"],
    },
];

export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);
