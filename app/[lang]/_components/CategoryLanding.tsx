import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { ContentCategoryId } from '@/lib/data/content-pyramid';
import { getArticlesByCategory, getCategory } from '@/lib/data/content-pyramid';
import { getArticleVisual } from '@/lib/data/article-visuals';
import { localizedPath } from '@/lib/routes';

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
          {zh ? '本栏目新手推荐' : 'Beginner Reading Order'}
        </h2>
        <div className="mt-5 grid gap-4">
          {articles.map(article => {
            const visual = getArticleVisual(article);

            return (
              <Link
                key={article.slug}
                href={localizedPath(lang, `articles/${article.slug}`)}
                className="group grid overflow-hidden rounded-xl border border-blood-900/70 bg-spire-950/65 hover:border-amber-300/45 hover:bg-blood-950/35 md:grid-cols-[15rem_minmax(0,1fr)]"
              >
                <img
                  src={visual.thumbnail}
                  alt=""
                  aria-hidden="true"
                  className="aspect-[16/9] h-full w-full object-cover opacity-85 transition duration-200 group-hover:opacity-100"
                />
                <div className="p-5">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-ember-300">
                    {zh ? '阅读顺序' : 'Reading order'} {String(article.priority).padStart(2, '0')} · {category.title[lang]}
                  </p>
                  <h3 className="mt-3 text-lg font-bold text-bone-100 group-hover:text-amber-100">
                    {article.title[lang]}
                  </h3>
                  <p className="mt-2 leading-7 text-bone-300">
                    {article.description[lang]}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </section>
  );
}
