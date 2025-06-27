// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('better-auth.session_token')?.value;

  const { pathname } = request.nextUrl;

  // ✅ Se l'utente è autenticato e va alla root (/), reindirizza a /dashboard
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // ✅ Se sta accedendo a /dashboard o sottopagine senza token → redirect a /
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ✅ Altrimenti continua normalmente
  return NextResponse.next();
}

// ✅ Applica il middleware a root e dashboard
export const config = {
  matcher: ['/', '/dashboard/:path*'],
};
