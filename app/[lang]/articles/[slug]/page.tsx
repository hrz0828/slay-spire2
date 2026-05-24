import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  contentCategories,
  coreArticles,
  getArticlesByCategory,
  getCategory,
  getCoreArticle,
} from '@/lib/data/content-pyramid';
import { getArticleVisual } from '@/lib/data/article-visuals';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { localizedAlternates, localizedPath } from '@/lib/routes';

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

const articleLabels = {
  zh: {
    breadcrumb: '内容金字塔文章',
    keywords: '核心关键词',
    related: '同类延伸阅读',
    categories: '继续探索主题',
    categoryCta: '返回分类',
    recommendation: '新手推荐',
    readingOrder: '阅读顺序',
    sectionLabel: '章节',
    visualNote: '攻略配图',
  },
  en: {
    breadcrumb: 'Content Pyramid Article',
    keywords: 'Core Keywords',
    related: 'Related Articles',
    categories: 'Explore More Topics',
    categoryCta: 'Back to Category',
    recommendation: 'Beginner pick',
    readingOrder: 'Reading order',
    sectionLabel: 'Section',
    visualNote: 'Guide visual',
  },
} satisfies Record<Locale, Record<string, string>>;

export function generateStaticParams() {
  return locales.flatMap(lang =>
    coreArticles.map(article => ({
      lang,
      slug: article.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  const article = getCoreArticle(slug);
  if (!article) {
    notFound();
  }

  const lang = rawLang as Locale;
  const title = article.title[lang];
  const description = article.description[lang];
  const keywords = article.keywords[lang];
  const visual = getArticleVisual(article);
  const route = `articles/${article.slug}`;
  const canonical = localizedPath(lang, route);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: localizedAlternates(route),
    },
    openGraph: {
      type: 'article',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: lang === 'zh' ? ['en_US'] : ['zh_CN'],
      title,
      description,
      url: canonical,
      tags: keywords,
      images: [
        {
          url: visual.image,
          width: 1200,
          height: 675,
          alt: visual.alt[lang],
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [visual.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  const article = getCoreArticle(slug);
  if (!article) {
    notFound();
  }

  const lang = rawLang as Locale;
  const labels = articleLabels[lang];
  const category = getCategory(article.category);
  const visual = getArticleVisual(article);
  const relatedArticles = getArticlesByCategory(article.category)
    .filter(item => item.slug !== article.slug)
    .slice(0, 4);
  const siblingCategories = contentCategories
    .filter(item => item.id !== article.category)
    .slice(0, 4);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
      <article className="space-y-8">
        <header className="relative overflow-hidden rounded-[2rem] border border-blood-900/80 bg-gradient-to-br from-[#1f0d0d] via-spire-900 to-[#120a07] p-6 shadow-[0_0_70px_rgba(120,20,20,0.28)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.2),transparent_26rem),radial-gradient(circle_at_bottom_right,rgba(153,27,27,0.32),transparent_28rem)]" />
          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href={localizedPath(lang, category.href)}
                className="rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-ember-200 hover:border-amber-300/55 hover:text-amber-100"
              >
                {category.title[lang]}
              </Link>
              <span className="rounded-full border border-blood-700 bg-spire-950/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-bone-300">
                {labels.recommendation} {String(article.priority).padStart(2, '0')}
              </span>
            </div>

            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-rose-500">
                {labels.breadcrumb}
              </p>
              <h1 className="max-w-4xl bg-gradient-to-r from-amber-100 via-yellow-400 to-rose-500 bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-4xl lg:text-5xl">
                {article.title[lang]}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-bone-300">
                {article.description[lang]}
              </p>
            </div>

            <div aria-label={labels.keywords} className="flex flex-wrap gap-2">
              {article.keywords[lang].map(keyword => (
                <span
                  key={keyword}
                  className="rounded-full border border-amber-300/20 bg-black/25 px-3 py-2 text-xs font-semibold text-amber-100"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </header>

        <figure className="overflow-hidden rounded-2xl border border-blood-900/70 bg-spire-900/75 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
          <img
            src={visual.image}
            alt={visual.alt[lang]}
            className="aspect-[16/9] w-full object-cover"
          />
          <figcaption className="border-t border-blood-900/70 px-5 py-4 text-sm leading-6 text-bone-300">
            <span className="font-black text-ember-300">{labels.visualNote}:</span>{' '}
            {visual.caption[lang]}
          </figcaption>
        </figure>

        <div className="space-y-5">
          {article.sections[lang].map((section, index) => (
            <section
              key={section.heading}
              className="rounded-2xl border border-blood-900/70 bg-spire-900/75 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.2)]"
            >
              <p className="text-xs font-black uppercase tracking-[0.24em] text-ember-300">
                {labels.sectionLabel} {String(index + 1).padStart(2, '0')}
              </p>
              <h2 className="mt-3 text-2xl font-black text-bone-100">
                {section.heading}
              </h2>
              <p className="mt-4 text-base leading-8 text-bone-300">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>

      <aside className="space-y-5 lg:sticky lg:top-28">
        <section className="rounded-2xl border border-blood-900/70 bg-spire-900/75 p-5 shadow-inner shadow-black/50">
          <h2 className="text-lg font-black text-bone-100">{labels.related}</h2>
          <div className="mt-4 space-y-3">
            {relatedArticles.map(item => (
              (() => {
                const itemVisual = getArticleVisual(item);

                return (
              <Link
                key={item.slug}
                href={localizedPath(lang, `articles/${item.slug}`)}
                className="group block overflow-hidden rounded-xl border border-blood-900/70 bg-spire-950/65 hover:border-amber-300/45 hover:bg-blood-950/35"
              >
                <img
                  src={itemVisual.thumbnail}
                  alt=""
                  aria-hidden="true"
                  className="h-24 w-full object-cover opacity-80"
                />
                <div className="p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-ember-300">
                  {labels.readingOrder} {String(item.priority).padStart(2, '0')} · {category.title[lang]}
                </p>
                <h3 className="mt-2 text-sm font-bold leading-6 text-bone-100 group-hover:text-amber-100">
                  {item.title[lang]}
                </h3>
                </div>
              </Link>
                );
              })()
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-blood-900/70 bg-spire-900/75 p-5 shadow-inner shadow-black/50">
          <h2 className="text-lg font-black text-bone-100">{labels.categories}</h2>
          <nav className="mt-4 space-y-3" aria-label={labels.categories}>
            {siblingCategories.map(item => (
              <Link
                key={item.id}
                href={localizedPath(lang, item.href)}
                className="block rounded-xl border border-blood-900/70 bg-spire-950/65 p-4 hover:border-amber-300/45 hover:bg-blood-950/35"
              >
                <span className="text-sm font-bold text-bone-100">{item.title[lang]}</span>
                <span className="mt-2 block text-xs leading-5 text-bone-400">{item.description[lang]}</span>
              </Link>
            ))}
          </nav>
        </section>

        <Link
          href={localizedPath(lang, category.href)}
          className="block rounded-2xl border border-amber-300/25 bg-amber-300/10 px-5 py-4 text-center text-sm font-black text-amber-100 hover:border-amber-300/60 hover:bg-amber-300/15"
        >
          {labels.categoryCta}: {category.title[lang]}
        </Link>
      </aside>
    </div>
  );
}
