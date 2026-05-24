import type { Metadata } from 'next';
import Link from 'next/link';
import { isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import RelicsFilter from './RelicsFilter';
import { relics } from '@/lib/data/relics';
import { getArticlesByCategory } from '@/lib/data/content-pyramid';
import { localizedPath } from '@/lib/routes';

export const metadata: Metadata = {
  title: 'Relics',
};

export default async function RelicsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const zh = lang === 'zh';
  const relatedArticles = getArticlesByCategory('relics').slice(0, 4);
  const tiers = zh
    ? [
        ['A 级', '额外能量 / 稳定抽牌', '直接提升每回合上限，优先围绕它调整牌组'],
        ['B 级', '回合外收益 / 事件增益', '影响长期资源，适合配合安全路线'],
        ['C 级', '高波动触发型', '只有在已有联动时拿，避免盲目博上限'],
      ]
    : [
        ['Tier A', 'Energy or stable draw', 'Raises turn ceiling; shape your deck around it'],
        ['Tier B', 'Out-of-combat and event value', 'Strong long-run economy on safer routes'],
        ['Tier C', 'High variance triggers', 'Take only with existing synergies'],
      ];

  const pitfalls = zh
    ? [
        '拿到高费增益遗物后，仍保留过多 0~1 费低效牌导致输出密度不足。',
        '看到事件型遗物就转问号路线，忽略当前血线与精英压力。',
        '为了触发单一遗物效果，强行选入多张弱功能牌。',
      ]
    : [
        'After picking premium relics, keeping too many low-impact 0-1 cost cards.',
        'Forcing event-heavy paths without considering HP and elite pressure.',
        'Adding weak cards only to force one relic trigger.',
      ];

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-bone-100">{zh ? '遗物图鉴' : 'Relic Index'}</h1>
        <p className="mt-3 text-bone-300">
          {zh
            ? '用“资源上限、长期收益、触发稳定性”三维度评估遗物价值，减少后期崩盘局。'
            : 'Relic value evaluated by turn ceiling, long-term economy, and trigger stability.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {tiers.map(([tier, trait, note]) => (
          <article key={tier} className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-5">
            <p className="text-sm font-semibold text-ember-300">{tier}</p>
            <p className="mt-2 font-medium text-bone-100">{trait}</p>
            <p className="mt-2 text-sm text-bone-300">{note}</p>
          </article>
        ))}
      </div>

      <div className="rounded-lg border border-blood-900/70 bg-spire-900/70 p-6">
        <h2 className="text-xl font-semibold text-bone-100">{zh ? '常见误区' : 'Common Pitfalls'}</h2>
        <ul className="mt-4 space-y-3 text-bone-300">
          {pitfalls.map(item => (
            <li key={item} className="rounded border border-blood-900/70 bg-spire-950/60 px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-blood-900/70 bg-spire-900/70 p-6">
        <h2 className="text-xl font-semibold text-bone-100">
          {zh ? '遗物攻略阅读' : 'Relic Strategy Reading'}
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
        <h2 className="text-xl font-semibold text-bone-100">{zh ? '遗物筛选器' : 'Relic Filters'}</h2>
        <p className="text-sm text-bone-300">
          {zh ? '按等级、定位和关键词检索遗物。' : 'Filter relics by tier, role and keyword.'}
        </p>
        <RelicsFilter lang={lang} items={relics} />
      </div>
    </section>
  );
}
