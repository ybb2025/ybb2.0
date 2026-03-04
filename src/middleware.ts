import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || "ybb-admin-session-2026";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Let the login page and auth API through
    if (pathname === "/admin-login" || pathname === "/api/admin/auth") {
        return NextResponse.next();
    }

    // Protect /admin/* UI routes and /api/admin/* data routes
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        const session = request.cookies.get("ybb_admin_session");

        if (!session || session.value !== SESSION_TOKEN) {
            // API routes → return 401 JSON (not a redirect)
            if (pathname.startsWith("/api/")) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
            const loginUrl = new URL("/admin-login", request.url);
            loginUrl.searchParams.set("from", pathname);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/admin-login", "/api/admin/:path*"],
};
