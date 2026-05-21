import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tokenData = await auth.api.getToken({
      headers: await headers(),
    });
    return NextResponse.json(tokenData || { token: null });
  } catch (error) {
    console.error("Error retrieving token:", error);
    return NextResponse.json({ token: null }, { status: 500 });
  }
}
