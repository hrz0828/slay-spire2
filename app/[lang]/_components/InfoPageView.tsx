import Link from 'next/link';
import { infoPages, type InfoPage } from '@/lib/data/site-info';
import type { Locale } from '@/lib/i18n';
import { localizedPath } from '@/lib/routes';

const labels = {
  zh: {
    updated: '最后更新',
    more: '站点信息',
    home: '返回首页',
  },
  en: {
    updated: 'Last updated',
    more: 'Site Information',
    home: 'Back Home',
  },
} satisfies Record<Locale, Record<string, string>>;

type Props = {
  lang: Locale;
  page: InfoPage;
};

export function InfoPageView({ lang, page }: Props) {
  const text = labels[lang];
  const relatedPages = infoPages.filter(item => item.slug !== page.slug);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <article className="space-y-6">
        <header className="rounded-[2rem] border border-blood-900/80 bg-spire-900/80 p-6 shadow-[0_0_70px_rgba(120,20,20,0.24)] sm:p-8 lg:p-10">
          <p className="text-xs font-black uppercase tracking-[0.26em] text-ember-300">
            {text.updated}: {page.updatedAt}
          </p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight text-bone-100 sm:text-4xl lg:text-5xl">
            {page.title[lang]}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-bone-300">
            {page.description[lang]}
          </p>
        </header>

        {page.sections.map(section => (
          <section
            key={section.heading[lang]}
            className="rounded-2xl border border-blood-900/70 bg-spire-900/75 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.2)]"
          >
            <h2 className="text-2xl font-black text-bone-100">
              {section.heading[lang]}
            </h2>
            <div className="mt-4 space-y-4">
              {section.body[lang].map(paragraph => (
                <p key={paragraph} className="text-base leading-8 text-bone-300">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </article>

      <aside className="space-y-5 lg:sticky lg:top-28">
        <section className="rounded-2xl border border-blood-900/70 bg-spire-900/75 p-5 shadow-inner shadow-black/50">
          <h2 className="text-lg font-black text-bone-100">{text.more}</h2>
          <nav className="mt-4 space-y-3" aria-label={text.more}>
            {relatedPages.map(item => (
              <Link
                key={item.slug}
                href={localizedPath(lang, item.slug)}
                className="block rounded-xl border border-blood-900/70 bg-spire-950/65 p-4 hover:border-amber-300/45 hover:bg-blood-950/35"
              >
                <span className="text-sm font-bold text-bone-100">
                  {item.title[lang]}
                </span>
                <span className="mt-2 block text-xs leading-5 text-bone-400">
                  {item.description[lang]}
                </span>
              </Link>
            ))}
          </nav>
        </section>

        <Link
          href={localizedPath(lang)}
          className="block rounded-2xl border border-amber-300/25 bg-amber-300/10 px-5 py-4 text-center text-sm font-black text-amber-100 hover:border-amber-300/60 hover:bg-amber-300/15"
        >
          {text.home}
        </Link>
      </aside>
    </div>
  );
}
