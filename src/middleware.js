import { NextResponse } from 'next/server'
import { auth } from './lib/auth';
 
export async function middleware(request) {

  const session = await auth.api.getSession({ 
    headers: request.headers
  });

  if(!session || !session?.user){
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}
 
export const config = {
  matcher: ['/appointments/:id', '/dashboard/:path*'],
}

export const runtime = 'nodejs';