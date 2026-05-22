import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseURL = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
    const headersList = await headers();
    const cookie = headersList.get("cookie") || "";
    
    const tokenRes = await fetch(`${baseURL}/api/auth/token`, {
      headers: { cookie },
      cache: "no-store"
    });
    
    if (tokenRes.ok) {
        const tokenData = await tokenRes.json();
        return NextResponse.json(tokenData || { token: null });
    }
    return NextResponse.json({ token: null }, { status: 401 });
  } catch (error) {
    console.error("Error retrieving token:", error);
    return NextResponse.json({ token: null }, { status: 500 });
  }
}
