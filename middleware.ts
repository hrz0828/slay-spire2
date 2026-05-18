import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, locales, type Locale } from './lib/i18n';

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;

  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language') ?? '';

  for (const item of acceptLanguage.split(',')) {
    const lang = item.split(';')[0]?.trim().toLowerCase();
    const baseLang = lang?.split('-')[0];

    if (baseLang && isLocale(baseLang)) {
      return baseLang;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    const locale = pathname.split('/')[1];

    if (isLocale(locale)) {
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return response;
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();

  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
