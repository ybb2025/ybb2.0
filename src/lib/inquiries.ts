export type Status = "New" | "Reviewing" | "Quoted" | "Closed";

export interface Inquiry {
    id: string;
    fullName: string;
    companyName: string;
    email: string;
    website?: string;
    projectType: string;
    pageCount: string;
    features: string[];
    references?: string;
    theme?: string;
    hasBrandColors?: string;
    targetAudience?: string;
    primaryGoal: string;
    timeline: string;
    budget: string;
    date: string;
    status: Status;
    callNotes: string;
}

export const inquiries: Inquiry[] = [
    {
        id: "inq-001",
        fullName: "Arjun Mehta",
        companyName: "FinoTrack",
        email: "arjun@finotrack.io",
        website: "https://finotrack.io",
        projectType: "webapp",
        pageCount: "10+",
        features: ["User Login", "Payments", "Admin Dashboard", "API Integration"],
        references: "stripe.com, linear.app",
        theme: "Light",
        hasBrandColors: "Yes",
        targetAudience: "Small business owners and freelancers tracking invoices",
        primaryGoal: "Lead Generation",
        timeline: "3-6m",
        budget: "8L-20L",
        date: "2026-03-02",
        status: "New",
        callNotes: "",
    },
    {
        id: "inq-002",
        fullName: "Priya Sharma",
        companyName: "Bloomfield Studios",
        email: "priya@bloomfield.co",
        website: "",
        projectType: "website",
        pageCount: "5-10",
        features: ["Blog / CMS", "Booking System"],
        references: "awwwards.com",
        theme: "Minimal",
        hasBrandColors: "Yes",
        targetAudience: "High-end fashion photographers",
        primaryGoal: "Brand Positioning",
        timeline: "1-2m",
        budget: "3L-8L",
        date: "2026-03-01",
        status: "Reviewing",
        callNotes: "Client wants portfolio + booking in one. Has brand guidelines ready. Prefers no dark mode.",
    },
    {
        id: "inq-003",
        fullName: "Vikram Nair",
        companyName: "MoveNest",
        email: "vikram@movenest.app",
        website: "",
        projectType: "mobile",
        pageCount: "10+",
        features: ["Android App", "iOS App", "User Login", "Payments", "Push Notifications"],
        references: "zomato.com, swiggy.in",
        theme: "Light",
        hasBrandColors: "No",
        targetAudience: "Urban renters aged 22–35",
        primaryGoal: "Product Launch",
        timeline: "3-6m",
        budget: "20L+",
        date: "2026-02-28",
        status: "Quoted",
        callNotes: "Needs full iOS + Android app. Has MVP wireframes. Wants Flutter cross-platform build. Already sent quote v1.",
    },
    {
        id: "inq-004",
        fullName: "Simran Kaur",
        companyName: "EduPath",
        email: "simran@edupathapp.com",
        website: "https://edupathapp.com",
        projectType: "infrastructure",
        pageCount: "10+",
        features: ["Admin Dashboard", "User Login", "Blog / CMS", "API Integration"],
        references: "",
        theme: "Corporate",
        hasBrandColors: "Yes",
        targetAudience: "K-12 students and teachers in India",
        primaryGoal: "Internal Automation",
        timeline: "6m+",
        budget: "20L+",
        date: "2026-02-25",
        status: "Closed",
        callNotes: "Project scope too large for current engagement. Recommend revisiting Q3 2026.",
    },
    {
        id: "inq-005",
        fullName: "Rahul Bose",
        companyName: "GreenCart",
        email: "rahul@greencart.store",
        website: "",
        projectType: "website",
        pageCount: "1-5",
        features: ["Payments"],
        references: "shopify.com",
        theme: "Light",
        hasBrandColors: "No",
        targetAudience: "Organic food buyers in Bangalore",
        primaryGoal: "Sales",
        timeline: "asap",
        budget: "3L-8L",
        date: "2026-03-03",
        status: "New",
        callNotes: "",
    },
];
