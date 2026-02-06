import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('session_user')?.value;
  const currentPath = request.nextUrl.pathname;

  const publicRoutes = ['/login', '/register'];

  const isProtectedRoute = publicRoutes.includes(currentPath);

  if (!session && !isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
