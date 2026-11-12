import { NextResponse } from "next/server";
import { verifyAdminPassword, createAdminSessionToken, ADMIN_COOKIE_NAME, MAX_AGE_SECONDS } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const isValid = verifyAdminPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: "Incorrect admin password" }, { status: 401 });
    }

    const token = createAdminSessionToken();

    const response = NextResponse.json({ success: true, message: "Logged in successfully" });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE_SECONDS,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Server error during login" }, { status: 500 });
  }
}

