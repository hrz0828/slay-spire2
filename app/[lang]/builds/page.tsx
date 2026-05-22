import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { loadCards } from '@/lib/data/cards';
import { buildTierListData } from '@/lib/data/tier-list';
import { getArticlesByCategory } from '@/lib/data/content-pyramid';
import TierListBoard from './TierListBoard';

export const metadata: Metadata = {
  title: 'Tier List',
};

export default async function BuildsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const cards = await loadCards();
  const tierList = buildTierListData(cards);
  const guideLinks = [
    ...getArticlesByCategory('builds'),
    ...getArticlesByCategory('strategy'),
  ].slice(0, 4);
  const zh = lang === 'zh';

  return (
    <section className="space-y-8">
      <div className="rounded-lg border border-blood-900/70 bg-spire-900/70 p-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold text-bone-100">
            {zh ? '通关流派与强度天梯榜' : 'Builds and Tier List'}
          </h1>
          <p className="mt-3 text-bone-300">
            {zh
              ? '先用攻略理解通关流派的成型条件，再结合强度天梯榜判断当前牌组应该补足的能力。'
              : 'Read the build guides for archetype requirements, then use the tier list to identify what your current deck still needs.'}
          </p>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {guideLinks.map(article => (
            <Link
              key={article.slug}
              href={`/${lang}/articles/${article.slug}`}
              className="group rounded border border-blood-900/70 bg-spire-950/60 px-4 py-3 hover:border-amber-300/45 hover:bg-blood-950/35"
            >
              <span className="text-sm font-semibold text-bone-100 group-hover:text-amber-100">
                {article.title[lang]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <TierListBoard
        initialLang={lang as Locale}
        meta={tierList.meta}
        entries={tierList.entries}
      />
    </section>
  );
}
