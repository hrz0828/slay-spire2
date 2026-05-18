'use client';

import { useMemo, useState } from 'react';
import type { RelicEntry, RelicTier } from '@/lib/data/relics';

type Props = {
  lang: 'zh' | 'en';
  items: RelicEntry[];
};

export default function RelicsFilter({ lang, items }: Props) {
  const zh = lang === 'zh';
  const [tier, setTier] = useState<'all' | RelicTier>('all');
  const [style, setStyle] = useState<'all' | RelicEntry['style']>('all');
  const [keyword, setKeyword] = useState('');

  const filtered = useMemo(
    () =>
      items.filter(item => {
        const tierOk = tier === 'all' || item.tier === tier;
        const styleOk = style === 'all' || item.style === style;
        const kw = keyword.toLowerCase().trim();
        const text = `${item.nameZh} ${item.nameEn} ${item.summaryZh} ${item.summaryEn}`.toLowerCase();
        const keywordOk = !kw || text.includes(kw);
        return tierOk && styleOk && keywordOk;
      }),
    [items, keyword, style, tier],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-lg border border-blood-900/70 bg-spire-900/70 p-4 md:grid-cols-3">
        <select
          value={tier}
          onChange={e => setTier(e.target.value as typeof tier)}
          className="rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-sm text-bone-100"
        >
          <option value="all">{zh ? '全部等级' : 'All Tiers'}</option>
          <option value="starter">{zh ? '起始' : 'Starter'}</option>
          <option value="common">{zh ? '普通' : 'Common'}</option>
          <option value="uncommon">{zh ? '非凡' : 'Uncommon'}</option>
          <option value="rare">{zh ? '稀有' : 'Rare'}</option>
          <option value="boss">{zh ? 'Boss' : 'Boss'}</option>
        </select>

        <select
          value={style}
          onChange={e => setStyle(e.target.value as typeof style)}
          className="rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-sm text-bone-100"
        >
          <option value="all">{zh ? '全部定位' : 'All Roles'}</option>
          <option value="offense">{zh ? '进攻' : 'Offense'}</option>
          <option value="defense">{zh ? '防御' : 'Defense'}</option>
          <option value="economy">{zh ? '经济' : 'Economy'}</option>
          <option value="utility">{zh ? '功能' : 'Utility'}</option>
        </select>

        <input
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          placeholder={zh ? '搜索关键词' : 'Search keyword'}
          className="rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-sm text-bone-100 placeholder:text-bone-500"
        />
      </div>

      <p className="text-sm text-bone-300">
        {zh ? '当前结果: ' : 'Results: '}
        <span className="font-semibold text-ember-300">{filtered.length}</span>
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map(item => (
          <article key={item.id} className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-4">
            <h3 className="font-semibold text-bone-100">{zh ? item.nameZh : item.nameEn}</h3>
            <p className="mt-1 text-xs text-ember-300">
              {item.tier} / {item.style}
            </p>
            <p className="mt-2 text-sm text-bone-300">{zh ? item.summaryZh : item.summaryEn}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
