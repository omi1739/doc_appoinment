import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const baseURL = process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BETTER_AUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://doc-appoinment-coral.vercel.app");
    const headersList = await headers();
    const cookie = headersList.get("cookie") || "";
    
    if (!cookie) {
      return NextResponse.json({ token: null }, { status: 401 });
    }

    const tokenRes = await fetch(`${baseURL}/api/auth/token`, {
      headers: { cookie },
      cache: "no-store"
    });
    
    if (tokenRes.ok) {
        const tokenData = await tokenRes.json();
        return NextResponse.json(tokenData || { token: null });
    }
    
    const errorData = await tokenRes.text().catch(() => "Unknown error");
    console.error("Auth token fetch failed:", tokenRes.status, errorData);
    
    return NextResponse.json({ token: null }, { status: 401 });
  } catch (error) {
    console.error("Error retrieving token:", error);
    return NextResponse.json({ token: null }, { status: 500 });
  }
}
