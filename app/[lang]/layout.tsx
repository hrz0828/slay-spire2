import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import '../globals.css';
import {
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from '@/lib/i18n';
import { localizedAlternates, localizedPath } from '@/lib/routes';

type Props = {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
};

const navItems = {
  zh: [
    { label: '新手指南', href: 'guides' },
    { label: '职业攻略', href: 'characters' },
    { label: '卡牌图鉴', href: 'cards' },
    { label: '遗物数据', href: 'relics' },
    { label: '通关流派', href: 'builds' },
    { label: 'Boss 机制', href: 'bosses' },
    { label: '进阶策略', href: 'strategy' },
  ],
  en: [
    { label: 'Beginner guides', href: 'guides' },
    { label: 'Characters', href: 'characters' },
    { label: 'Cards', href: 'cards' },
    { label: 'Relics', href: 'relics' },
    { label: 'Builds', href: 'builds' },
    { label: 'Bosses', href: 'bosses' },
    { label: 'Strategy', href: 'strategy' },
  ],
} satisfies Record<Locale, Array<{ label: string; href: string }>>;

const siteLogoText = {
  zh: '杀戮尖塔 2',
  en: 'Slay the Spire 2',
} satisfies Record<Locale, string>;

const siteTagline = {
  zh: '攻略站',
  en: 'Guide',
} satisfies Record<Locale, string>;

const footerLinks = {
  zh: [
    { label: '关于我们', href: 'about' },
    { label: '联系我们', href: 'contact' },
    { label: '隐私政策', href: 'privacy-policy' },
    { label: '使用条款', href: 'terms' },
    { label: '编辑原则', href: 'editorial-policy' },
  ],
  en: [
    { label: 'About', href: 'about' },
    { label: 'Contact', href: 'contact' },
    { label: 'Privacy Policy', href: 'privacy-policy' },
    { label: 'Terms', href: 'terms' },
    { label: 'Editorial Policy', href: 'editorial-policy' },
  ],
} satisfies Record<Locale, Array<{ label: string; href: string }>>;

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sts2hub.com';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dict.meta.title,
      template: `%s | ${dict.meta.siteName}`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: localizedPath(lang),
      languages: localizedAlternates(),
    },
    openGraph: {
      type: 'website',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      siteName: dict.meta.siteName,
      title: dict.meta.title,
      description: dict.meta.description,
      url: localizedPath(lang),
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
  const alternateLang: Locale = lang === 'zh' ? 'en' : 'zh';
  const languageLabel = lang === 'zh' ? 'EN' : '中';

  return (
    <html lang={lang}>
      <head>
        <meta name="baidu-site-verification" content="codeva-ov0tsUrwXv" />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#0c0505] via-[#120a0a] to-[#080303] text-slate-200 antialiased scrollbar-thin scrollbar-track-[#160707] scrollbar-thumb-rose-900 selection:bg-rose-500/30 selection:text-amber-100">
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3222328785646871"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_34rem)]" />
          <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-rose-950/30 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35" />
        </div>

        <header className="sticky top-0 z-50 border-b border-rose-950/80 bg-[#0b0505]/85 shadow-[0_16px_50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <nav
            aria-label={dict.nav.primary}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <input id="nav-menu-toggle" type="checkbox" className="peer sr-only" />
            <div className="flex min-h-20 items-center justify-between gap-4">
              <a href={localizedPath(lang)} className="group flex items-center gap-3">
                <span className="relative grid h-11 w-11 place-items-center overflow-hidden rounded-xl border border-amber-300/30 bg-gradient-to-br from-rose-950 via-[#2a0808] to-black shadow-[0_0_28px_rgba(225,29,72,0.32)]">
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(252,211,77,0.36),transparent_2rem)]" />
                  <span className="relative text-lg font-black text-amber-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.65)]">
                    II
                  </span>
                </span>
                <span className="leading-tight">
                  <span className="block bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-lg font-black tracking-wide text-transparent sm:text-xl">
                    {siteLogoText[lang]}
                  </span>
                  <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-rose-500">
                    {siteTagline[lang]}
                  </span>
                </span>
              </a>

              <div className="hidden items-center gap-2 lg:flex">
                {navItems[lang].map(item => (
                  <a
                    key={item.href}
                    href={localizedPath(lang, item.href)}
                    className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-amber-300/30 hover:bg-rose-950/40 hover:text-amber-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <div className="hidden items-center gap-3 lg:flex">
                <a
                  href={localizedPath(alternateLang)}
                  aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
                  className="group relative flex h-10 w-20 items-center rounded-full border border-amber-300/25 bg-black/45 p-1 shadow-inner shadow-black/70 transition hover:border-amber-300/55"
                >
                  <span
                    className={`absolute top-1 h-8 w-9 rounded-full bg-gradient-to-r from-amber-200 to-yellow-500 shadow-[0_0_18px_rgba(245,158,11,0.45)] transition-transform duration-300 ease-out ${
                      lang === 'zh' ? 'translate-x-0' : 'translate-x-9'
                    }`}
                  />
                  <span className="relative z-10 grid w-1/2 place-items-center text-xs font-black text-[#1b0b05]">
                    中
                  </span>
                  <span className="relative z-10 grid w-1/2 place-items-center text-xs font-black text-slate-300 group-hover:text-amber-100">
                    EN
                  </span>
                </a>
              </div>

              <label
                htmlFor="nav-menu-toggle"
                className="grid h-11 w-11 cursor-pointer place-items-center rounded-xl border border-rose-900/70 bg-rose-950/35 text-slate-200 shadow-inner shadow-black/60 transition hover:border-amber-300/40 hover:text-amber-200 lg:hidden"
                aria-label="Toggle navigation menu"
              >
                <span className="space-y-1.5">
                  <span className="block h-0.5 w-5 rounded-full bg-current transition peer-checked:rotate-45" />
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                  <span className="block h-0.5 w-5 rounded-full bg-current" />
                </span>
              </label>
            </div>

            <div className="grid max-h-0 overflow-hidden transition-[max-height,padding] duration-300 ease-out peer-checked:max-h-96 peer-checked:pb-5 lg:hidden">
              <div className="rounded-2xl border border-rose-900/70 bg-black/35 p-3 shadow-2xl shadow-black/40">
                <div className="grid gap-2">
                  {navItems[lang].map(item => (
                    <a
                      key={item.href}
                      href={localizedPath(lang, item.href)}
                      className="rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-amber-300/30 hover:bg-rose-950/50 hover:text-amber-200"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
                <a
                  href={localizedPath(alternateLang)}
                  className="mt-3 flex items-center justify-between rounded-xl border border-amber-300/20 bg-rose-950/30 px-4 py-3 text-sm font-bold text-amber-100 transition hover:border-amber-300/50"
                >
                  <span>{lang === 'zh' ? '切换语言' : 'Language'}</span>
                  <span className="rounded-full bg-gradient-to-r from-amber-200 to-yellow-500 px-3 py-1 text-xs font-black text-[#1b0b05] transition-transform duration-300 hover:scale-105">
                    {languageLabel}
                  </span>
                </a>
              </div>
            </div>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {children}
        </main>

        <footer className="border-t border-rose-950/80 bg-black/25 px-4 py-8 text-sm text-slate-500">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 text-center">
            <nav
              aria-label={lang === 'zh' ? '站点信息' : 'Site information'}
              className="flex flex-wrap justify-center gap-x-5 gap-y-2"
            >
              {footerLinks[lang].map(item => (
                <a
                  key={item.href}
                  href={localizedPath(lang, item.href)}
                  className="font-semibold text-slate-400 hover:text-amber-200"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <span className="max-w-3xl bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 bg-clip-text text-transparent">
              {dict.footer.copyright}
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
