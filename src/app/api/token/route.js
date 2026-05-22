import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const requestHeaders = await headers();

    const result = await auth.api.getToken({
      headers: requestHeaders
    });

    return NextResponse.json(result || { token: null });
  } catch (error) {
    console.error("Error retrieving token:", error);
    return NextResponse.json({ token: null }, { status: 401 });
  }
}
