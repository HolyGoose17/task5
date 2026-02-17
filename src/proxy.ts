import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const session = request.cookies.get('token')?.value;
  const currentPath = request.nextUrl.pathname;

  const publicRoutes = ['/login', '/registration'];

  const isOnlyPublicRoute = publicRoutes.includes(currentPath);

  if (!session && !isOnlyPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isOnlyPublicRoute) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
