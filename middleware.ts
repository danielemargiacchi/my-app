// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('better-auth.session_token')?.value;

  // Se non c'è token, reindirizza alla home (login)
  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 👇 Applica il middleware SOLO a queste rotte:
export const config = {
  matcher: ['/dashboard', '/dashboard/:path', '/dashboard/:path*']
};
