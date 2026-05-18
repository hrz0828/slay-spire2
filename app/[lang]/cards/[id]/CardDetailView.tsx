'use client';

import { useState } from 'react';
import type { CardEntry } from '@/lib/data/cards';

type Props = {
  lang: 'zh' | 'en';
  card: CardEntry;
};

function rarityClass(rarity: string) {
  const key = rarity.toLowerCase();
  if (key.includes('rare')) return 'border-amber-400 shadow-[0_0_28px_rgba(251,191,36,0.25)]';
  if (key.includes('uncommon')) return 'border-sky-400 shadow-[0_0_24px_rgba(56,189,248,0.2)]';
  return 'border-stone-300/70 shadow-[0_0_20px_rgba(231,229,228,0.12)]';
}

export default function CardDetailView({ lang, card }: Props) {
  const zh = lang === 'zh';
  const [tab, setTab] = useState<'base' | 'upgraded'>('base');
  const summary = tab === 'base' ? (zh ? card.summaryZh : card.summaryEn) : zh ? card.summaryUpgradedZh : card.summaryUpgradedEn;

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-bone-100">{zh ? card.nameZh : card.nameEn}</h1>

      <div className={`relative overflow-hidden rounded-lg border-2 bg-spire-900/90 p-6 ${rarityClass(card.rarity)}`}>
        <div className="absolute right-4 top-4 h-12 w-12 rounded-full border border-ember-300 bg-spire-950 text-center text-lg font-bold leading-[3rem] text-ember-300">
          {card.cost >= 0 ? card.cost : 'X'}
        </div>

        <div className="pr-16">
          <p className="text-sm font-semibold text-ember-300">
            {card.character} · {card.rarity} · {card.type}
          </p>
          <p className="mt-4 whitespace-pre-line text-base leading-7 text-bone-100">{summary}</p>
          {card.tags.length > 0 && <p className="mt-4 text-xs text-bone-500">{card.tags.join(' · ')}</p>}
        </div>
      </div>

      <div className="inline-flex rounded-lg border border-blood-900/80 bg-spire-950/60 p-1">
        <button
          type="button"
          onClick={() => setTab('base')}
          className={`rounded px-4 py-2 text-sm ${tab === 'base' ? 'bg-ember-500 text-bone-100' : 'text-bone-300 hover:text-bone-100'}`}
        >
          {zh ? '升级前' : 'Base'}
        </button>
        <button
          type="button"
          onClick={() => setTab('upgraded')}
          className={`rounded px-4 py-2 text-sm ${tab === 'upgraded' ? 'bg-ember-500 text-bone-100' : 'text-bone-300 hover:text-bone-100'}`}
        >
          {zh ? '升级后' : 'Upgraded'}
        </button>
      </div>
    </section>
  );
}
