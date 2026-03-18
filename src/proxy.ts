import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const PUBLIC_ROUTES = ['/login', '/registration'];
const SUPPORTED_LANGS = ['en', 'ru'];
const DEFAULT_LANG = 'en';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('token')?.value;

  const segments = pathname.split('/').filter(Boolean);
  const langFromUrl = segments[0];

  if (!SUPPORTED_LANGS.includes(langFromUrl)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${DEFAULT_LANG}${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set('i18next', DEFAULT_LANG);
    return response;
  }

  const response = NextResponse.next();
  response.cookies.set('i18next', langFromUrl);

  const routeWithoutLang = `/${segments.slice(1).join('/')}`;
  const isPublicRoute = PUBLIC_ROUTES.includes(routeWithoutLang);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL(`/${langFromUrl}/login`, request.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL(`/${langFromUrl}`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
