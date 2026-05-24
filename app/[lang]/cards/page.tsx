import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import CardsFilter from './CardsFilter';
import { loadCards } from '@/lib/data/cards';
import { getArticlesByCategory } from '@/lib/data/content-pyramid';
import { localizedPath } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Cards',
};

export default async function CardsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }
  const cards = await loadCards();
  const relatedArticles = getArticlesByCategory('cards').slice(0, 4);

  const zh = lang === 'zh';
  const priorities = zh
    ? [
        ['前期过渡', '低费攻击/格挡', '稳定过 1 层精英，避免卡手'],
        ['资源滚动', '抽牌/能量/保留', '提升每回合可用动作数量'],
        ['终盘斩杀', '倍率/易伤/脆弱联动', '在 Boss 战打出 2 回合内爆发'],
      ]
    : [
        ['Early consistency', 'Cheap attack/defend', 'Stabilize Act 1 elite fights'],
        ['Resource engine', 'Draw/energy/retain', 'Increase playable actions per turn'],
        ['Boss finisher', 'Scaling + vuln synergies', 'Enable 2-turn kill windows'],
      ];

  const pickRules = zh
    ? [
        '首层奖励先拿“能独立出牌”的牌，避免过早绑定特定遗物。',
        '如果牌组超过 18 张，优先补抽牌而不是继续塞中费输出。',
        '问号路线多时保留 1 张解状态或群体处理牌。',
      ]
    : [
        'In early floors, prefer standalone cards over narrow combos.',
        'If deck size is above 18, add draw before adding more medium-cost damage.',
        'On event-heavy paths, keep one status-cleanup or AoE answer.',
      ];

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-bone-100">{zh ? '卡牌数据库' : 'Card Database'}</h1>
        <p className="mt-3 text-bone-300">
          {zh
            ? '按“前期稳定、资源循环、终盘斩杀”三段思路整理选牌。先保证回合质量，再堆叠爆发。'
            : 'Card picks organized by three stages: early stability, resource engine, and boss finishing burst.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {priorities.map(([phase, focus, target]) => (
          <article key={phase} className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-5">
            <p className="text-sm font-semibold text-ember-300">{phase}</p>
            <p className="mt-2 font-medium text-bone-100">{focus}</p>
            <p className="mt-2 text-sm text-bone-300">{target}</p>
          </article>
        ))}
      </div>

      <div className="rounded-lg border border-blood-900/70 bg-spire-900/70 p-6">
        <h2 className="text-xl font-semibold text-bone-100">
          {zh ? '快速选牌规则' : 'Quick Pick Rules'}
        </h2>
        <ul className="mt-4 space-y-3 text-bone-300">
          {pickRules.map(rule => (
            <li key={rule} className="rounded border border-blood-900/70 bg-spire-950/60 px-4 py-3">
              {rule}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-blood-900/70 bg-spire-900/70 p-6">
        <h2 className="text-xl font-semibold text-bone-100">
          {zh ? '卡牌攻略阅读' : 'Card Strategy Reading'}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {relatedArticles.map(article => (
            <Link
              key={article.slug}
              href={localizedPath(lang, `articles/${article.slug}`)}
              className="group rounded border border-blood-900/70 bg-spire-950/60 px-4 py-3 hover:border-amber-300/45 hover:bg-blood-950/35"
            >
              <span className="text-sm font-semibold text-bone-100 group-hover:text-amber-100">
                {article.title[lang]}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-bone-100">{zh ? '卡牌筛选器' : 'Card Filters'}</h2>
        <p className="text-sm text-bone-300">
          {zh ? '按角色、费用、稀有度和关键词快速筛选。' : 'Filter by character, cost, rarity and tags.'}
        </p>
        <CardsFilter lang={lang} items={cards} />
      </div>
    </section>
  );
}
