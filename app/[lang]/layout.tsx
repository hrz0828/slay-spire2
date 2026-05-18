import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, isLocale, locales, type Locale } from '@/lib/i18n';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

export function generateStaticParams() {
  return locales.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://slay-spire2-guide.pages.dev';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        zh: '/zh',
        en: '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      siteName: dict.meta.siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      url: `/${lang}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="min-h-screen bg-spire-radial bg-spire-950 text-bone-100 antialiased">
        <header className="border-b border-blood-800/70 bg-spire-950/90">
          <nav
            aria-label={dict.nav.primary}
            className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4"
          >
            <a href={`/${lang}`} className="text-base font-semibold text-ember-300">
              {dict.site.name}
            </a>

            <div className="flex flex-wrap items-center justify-end gap-4 text-sm text-bone-300">
              <a className="hover:text-ember-300" href={`/${lang}/cards`}>
                {dict.nav.cards}
              </a>
              <a className="hover:text-ember-300" href={`/${lang}/relics`}>
                {dict.nav.relics}
              </a>
              <a className="hover:text-ember-300" href={`/${lang}/builds`}>
                {dict.nav.builds}
              </a>
              <a className="hover:text-ember-300" href={`/${lang}/tools`}>
                {dict.nav.tools}
              </a>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

        <footer className="border-t border-blood-900/70 px-4 py-6 text-center text-sm text-bone-500">
          {dict.footer.copyright}
        </footer>
      </body>
    </html>
  );
}
