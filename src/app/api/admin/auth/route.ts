import { NextResponse } from "next/server";
import { auth } from "@/lib/firebase-admin";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@ybb.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Password@123";
const SESSION_TOKEN = process.env.ADMIN_SESSION_TOKEN || "ybb-admin-secure-session-2026";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

// ── POST /api/admin/auth — Login ─────────────────────────────────────────────
export async function POST(req: Request) {
    const { email, password } = await req.json();

    // Primary check — env credentials (no external dependency, always works)
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    // ── Ensure Firebase Auth user exists (background, non-blocking) ───────────
    // This creates the admin account in Firebase so Firestore rules referencing
    // request.auth.token.email work correctly if ever needed client-side.
    try {
        await auth.getUserByEmail(ADMIN_EMAIL);
    } catch {
        // User doesn't exist in Firebase Auth yet — create them
        try {
            await auth.createUser({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                emailVerified: true,
                displayName: "YBB Admin",
            });
        } catch (createErr) {
            // Non-fatal — log and continue. Login still succeeds.
            console.warn("Firebase user creation skipped:", createErr);
        }
    }

    return setSessionCookie(SESSION_TOKEN);
}

// ── DELETE /api/admin/auth — Logout ──────────────────────────────────────────
export async function DELETE() {
    const res = NextResponse.json({ success: true });
    res.cookies.set("ybb_admin_session", "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
    });
    return res;
}

// ── Helper ────────────────────────────────────────────────────────────────────
function setSessionCookie(token: string) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("ybb_admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
    });
    return res;
}
