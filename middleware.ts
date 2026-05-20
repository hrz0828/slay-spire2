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
  const localeFromPath = pathname.split('/')[1];

  // Keep /en prefixed, but canonicalize /zh to no-prefix paths.
  if (localeFromPath === defaultLocale) {
    const url = request.nextUrl.clone();
    const rest = pathname.replace(new RegExp(`^/${defaultLocale}`), '') || '/';
    url.pathname = rest;
    const response = NextResponse.redirect(url, 308);
    response.cookies.set('NEXT_LOCALE', defaultLocale, {
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const pathnameHasLocale = locales.some(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    const locale = localeFromPath;

    if (isLocale(locale)) {
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
      });
    }

    return response;
  }

  const url = request.nextUrl.clone();
  const locale = detectLocale(request);

  if (locale === defaultLocale) {
    // Rewrite to internal /zh route while keeping user-facing URL without /zh.
    url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
    return NextResponse.rewrite(url);
  }

  // Non-default locales stay prefixed in the URL.
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)',
  ],
};
