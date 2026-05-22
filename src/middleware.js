import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
 
export async function middleware(request) {
  try {
    const session = await auth.api.getSession({ 
      headers: request.headers
    });

    if(!session || !session?.user){
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware session check error:", error);
    // On error, redirect to login as a safe default
    return NextResponse.redirect(new URL('/login', request.url))
  }
}
 
export const config = {
  matcher: ['/appointments/:id', '/dashboard/:path*'],
}

export const runtime = 'nodejs';