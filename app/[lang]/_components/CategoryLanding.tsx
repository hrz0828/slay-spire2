import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { ContentCategoryId } from '@/lib/data/content-pyramid';
import { getArticlesByCategory, getCategory } from '@/lib/data/content-pyramid';

type CategoryLandingProps = {
  categoryId: ContentCategoryId;
  lang: Locale;
};

export function CategoryLanding({ categoryId, lang }: CategoryLandingProps) {
  const category = getCategory(categoryId);
  const articles = getArticlesByCategory(categoryId);
  const zh = lang === 'zh';

  return (
    <section className="space-y-10">
      <div className="max-w-3xl">
        <p className="mb-4 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-amber-200">
          {zh ? '内容金字塔' : 'Content Pyramid'}
        </p>
        <h1 className="text-3xl font-black text-bone-100 sm:text-4xl">
          {category.title[lang]}
        </h1>
        <p className="mt-4 text-lg leading-8 text-bone-300">
          {category.description[lang]}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {category.sections.map(section => (
          <article key={section.title[lang]} className="rounded-2xl border border-blood-900/70 bg-spire-900/75 p-6">
            <h2 className="text-xl font-bold text-bone-100">{section.title[lang]}</h2>
            <ul className="mt-4 space-y-3 text-bone-300">
              {section.items[lang].map(item => (
                <li key={item} className="rounded-lg border border-blood-900/60 bg-spire-950/55 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section aria-labelledby={`${categoryId}-priority-articles`} className="rounded-2xl border border-blood-900/70 bg-spire-900/70 p-6">
        <h2 id={`${categoryId}-priority-articles`} className="text-2xl font-black text-bone-100">
          {zh ? '优先阅读文章' : 'Priority Articles'}
        </h2>
        <div className="mt-5 grid gap-4">
          {articles.map(article => (
            <Link
              key={article.slug}
              href={`/${lang}/articles/${article.slug}`}
              className="group rounded-xl border border-blood-900/70 bg-spire-950/65 p-5 hover:border-amber-300/45 hover:bg-blood-950/35"
            >
              <p className="text-xs font-black uppercase tracking-[0.22em] text-ember-300">
                {zh ? '优先级' : 'Priority'} {article.priority}
              </p>
              <h3 className="mt-3 text-lg font-bold text-bone-100 group-hover:text-amber-100">
                {article.title[lang]}
              </h3>
              <p className="mt-2 leading-7 text-bone-300">
                {article.description[lang]}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
}
