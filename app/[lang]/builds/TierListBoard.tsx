'use client';

import { startTransition, useMemo, useState } from 'react';
import type { CardEntry } from '@/lib/data/cards';
import type { TierCharacter, TierEntry, TierListMeta, TierRank } from '@/lib/data/tier-list';

type Lang = 'zh' | 'en';

type Props = {
  initialLang: Lang;
  meta: TierListMeta;
  entries: TierEntry[];
};

type CharacterFilter = 'all' | 'Ironclad' | 'Silent' | 'Defect' | 'Necrobinder';

type TierCard = {
  id: string;
  tier: TierRank;
  character: TierCharacter;
  buildTitleZh: string;
  buildTitleEn: string;
  noteZh: string;
  noteEn: string;
  card: CardEntry;
};

const tierOrder: TierRank[] = ['S', 'A', 'B', 'C'];

const tierStyles = {
  S: {
    row: 'border-rose-500/50 bg-rose-950/30',
    badge: 'text-rose-500 border-rose-500/50 bg-rose-950/55 shadow-[0_0_30px_rgba(244,63,94,0.22)]',
    label: 'God Tier',
  },
  A: {
    row: 'border-amber-500/45 bg-amber-950/20',
    badge: 'text-amber-500 border-amber-500/50 bg-amber-950/45 shadow-[0_0_30px_rgba(245,158,11,0.18)]',
    label: 'Core Picks',
  },
  B: {
    row: 'border-yellow-500/35 bg-yellow-950/15',
    badge: 'text-yellow-400 border-yellow-500/45 bg-yellow-950/35',
    label: 'Playable',
  },
  C: {
    row: 'border-slate-500/30 bg-slate-950/25',
    badge: 'text-slate-400 border-slate-500/40 bg-slate-900/55',
    label: 'Niche',
  },
} satisfies Record<TierRank, { row: string; badge: string; label: string }>;

const characterLabels = {
  all: { zh: '全职业', en: 'All Classes' },
  Ironclad: { zh: '铁甲战士', en: 'Ironclad' },
  Silent: { zh: '静默猎手', en: 'Silent' },
  Defect: { zh: '缺陷行者', en: 'Defect' },
  Necrobinder: { zh: '死灵术士', en: 'Necrobinder' },
} satisfies Record<CharacterFilter, { zh: string; en: string }>;

const characterTabs = Object.keys(characterLabels) as CharacterFilter[];

function localizeRarity(rarity: string, lang: Lang) {
  if (lang === 'en') return rarity;

  const labels: Record<string, string> = {
    Basic: '基础',
    Common: '普通',
    Uncommon: '罕见',
    Rare: '稀有',
    Ancient: '远古',
  };

  return labels[rarity] ?? rarity;
}

function localizeType(type: string, lang: Lang) {
  if (lang === 'en') return type;

  const labels: Record<string, string> = {
    Attack: '攻击',
    Skill: '技能',
    Power: '能力',
    Status: '状态',
    Curse: '诅咒',
  };

  return labels[type] ?? type;
}

function keywordLabels(card: CardEntry, lang: Lang) {
  const tags = card.tags.length > 0 ? card.tags.slice(0, 3) : [card.type, card.rarity];

  return tags.map(tag => {
    if (lang === 'en') return tag;
    if (/doom/i.test(tag)) return '厄运';
    if (/enchant/i.test(tag)) return '附魔';
    if (/summon/i.test(tag)) return '召唤';
    if (/exhaust/i.test(tag)) return '消耗';
    if (/poison/i.test(tag)) return '毒';
    return tag;
  });
}

function flattenTierData(entries: TierEntry[]): TierCard[] {
  return entries.flatMap(entry =>
    entry.cards.map(card => ({
      id: `${entry.id}-${card.id}`,
      tier: entry.tier,
      character: entry.character,
      buildTitleZh: entry.titleZh,
      buildTitleEn: entry.titleEn,
      noteZh: entry.noteZh,
      noteEn: entry.noteEn,
      card,
    }))
  );
}

function CardTooltip({ item, lang }: { item: TierCard; lang: Lang }) {
  const cardName = lang === 'zh' ? item.card.nameZh : item.card.nameEn;
  const buildTitle = lang === 'zh' ? item.buildTitleZh : item.buildTitleEn;
  const note = lang === 'zh' ? item.noteZh : item.noteEn;
  const baseText = lang === 'zh' ? item.card.summaryZh : item.card.summaryEn;
  const upgradedText = lang === 'zh' ? item.card.summaryUpgradedZh : item.card.summaryUpgradedEn;

  return (
    <div className="pointer-events-none absolute left-1/2 top-[calc(100%+0.75rem)] z-30 w-80 -translate-x-1/2 rounded-2xl border border-amber-300/25 bg-[#100606]/95 p-4 text-left opacity-0 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-1 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-1 group-focus-within:opacity-100 max-sm:hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-rose-500">{buildTitle}</p>
          <h4 className="mt-1 text-base font-black text-amber-100">{cardName}</h4>
        </div>
        <span className="rounded-lg bg-gradient-to-r from-amber-200 to-yellow-500 px-2 py-1 text-xs font-black text-[#1b0b05]">
          {item.card.cost >= 0 ? item.card.cost : 'X'}
        </span>
      </div>

      <p className="mt-2 text-xs font-semibold text-slate-400">
        {localizeRarity(item.card.rarity, lang)} · {localizeType(item.card.type, lang)}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-200">{note}</p>

      <div className="mt-4 space-y-3 border-t border-rose-950 pt-4">
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-slate-500">
            {lang === 'zh' ? '升级前' : 'Base'}
          </p>
          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-slate-300">{baseText}</p>
        </div>
        <div>
          <p className="text-[0.68rem] font-black uppercase tracking-[0.22em] text-amber-500">
            {lang === 'zh' ? '升级后' : 'Upgraded'}
          </p>
          <p className="mt-1 whitespace-pre-line text-sm leading-6 text-amber-100">{upgradedText}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {keywordLabels(item.card, lang).map(keyword => (
          <span key={keyword} className="rounded-full border border-rose-500/30 bg-rose-950/45 px-2 py-1 text-xs font-bold text-rose-100">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

function TierCardButton({
  item,
  lang,
  active,
  onOpen,
}: {
  item: TierCard;
  lang: Lang;
  active: boolean;
  onOpen: () => void;
}) {
  const cardName = lang === 'zh' ? item.card.nameZh : item.card.nameEn;
  const initials = cardName.replace(/\s+/g, '').slice(0, 2).toUpperCase();

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative flex h-[5.5rem] w-[5.5rem] shrink-0 flex-col items-center justify-center rounded-2xl border bg-black/35 p-2 text-center shadow-inner shadow-black/70 transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-amber-300/60 focus:outline-none focus:ring-2 focus:ring-amber-300/60 ${
        active ? 'border-amber-300/80 ring-2 ring-amber-300/40' : 'border-rose-900/70'
      }`}
      aria-expanded={active}
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl border border-amber-300/20 bg-gradient-to-br from-rose-950 via-[#2a0808] to-black text-xs font-black text-amber-100 shadow-[0_0_22px_rgba(225,29,72,0.2)]">
        {initials}
      </span>
      <span className="mt-2 line-clamp-2 text-[0.68rem] font-bold leading-tight text-slate-200">
        {cardName}
      </span>
      <CardTooltip item={item} lang={lang} />
    </button>
  );
}

function MobileDetail({ item, lang, onClose }: { item: TierCard; lang: Lang; onClose: () => void }) {
  const cardName = lang === 'zh' ? item.card.nameZh : item.card.nameEn;
  const baseText = lang === 'zh' ? item.card.summaryZh : item.card.summaryEn;
  const upgradedText = lang === 'zh' ? item.card.summaryUpgradedZh : item.card.summaryUpgradedEn;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-amber-300/25 bg-[#100606]/95 p-4 shadow-[0_24px_90px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:hidden">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-rose-500">{item.tier} Tier</p>
          <h4 className="mt-1 text-base font-black text-amber-100">{cardName}</h4>
          <p className="mt-1 text-xs font-semibold text-slate-400">
            {localizeRarity(item.card.rarity, lang)} · {localizeType(item.card.type, lang)}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-rose-900/80 px-3 py-1 text-xs font-bold text-slate-300"
        >
          {lang === 'zh' ? '关闭' : 'Close'}
        </button>
      </div>
      <div className="mt-4 grid gap-3 text-sm leading-6">
        <p className="whitespace-pre-line text-slate-300">{baseText}</p>
        <p className="whitespace-pre-line rounded-xl border border-amber-300/15 bg-amber-300/10 p-3 text-amber-100">
          {upgradedText}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {keywordLabels(item.card, lang).map(keyword => (
          <span key={keyword} className="rounded-full border border-rose-500/30 bg-rose-950/45 px-2 py-1 text-xs font-bold text-rose-100">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

function TierRow({
  tier,
  items,
  lang,
  activeId,
  onOpenCard,
}: {
  tier: TierRank;
  items: TierCard[];
  lang: Lang;
  activeId: string | null;
  onOpenCard: (id: string) => void;
}) {
  const styles = tierStyles[tier];

  return (
    <section className={`grid gap-4 rounded-3xl border p-4 transition-opacity duration-300 sm:grid-cols-[7rem_minmax(0,1fr)] sm:p-5 ${styles.row}`}>
      <div className={`flex items-center justify-between rounded-2xl border p-4 sm:flex-col sm:items-start ${styles.badge}`}>
        <span className="text-5xl font-black leading-none">{tier}</span>
        <span className="text-xs font-black uppercase tracking-[0.22em] text-current/70">{styles.label}</span>
      </div>

      <div className="min-w-0 overflow-x-auto pb-2">
        {items.length > 0 ? (
          <div className="grid auto-cols-[5.5rem] grid-flow-col gap-3 sm:grid-flow-row sm:grid-cols-[repeat(auto-fill,minmax(5.5rem,1fr))]">
            {items.map(item => (
              <TierCardButton
                key={item.id}
                item={item}
                lang={lang}
                active={activeId === item.id}
                onOpen={() => onOpenCard(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="grid min-h-[5.5rem] place-items-center rounded-2xl border border-dashed border-slate-700/70 text-sm text-slate-500">
            {lang === 'zh' ? '该职业暂无此评级卡牌' : 'No cards in this tier for this class'}
          </div>
        )}
      </div>
    </section>
  );
}

export default function TierListBoard({ initialLang, meta, entries }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [character, setCharacter] = useState<CharacterFilter>('all');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const tierData = useMemo(() => flattenTierData(entries), [entries]);

  const filteredData = useMemo(() => {
    if (character === 'all') return tierData;
    return tierData.filter(item => item.character === character);
  }, [character, tierData]);

  const activeItem = activeCardId
    ? filteredData.find(item => item.id === activeCardId) ?? null
    : null;

  function switchLang(nextLang: Lang) {
    startTransition(() => {
      setLang(nextLang);
      setActiveCardId(null);
    });
  }

  function switchCharacter(nextCharacter: CharacterFilter) {
    startTransition(() => {
      setCharacter(nextCharacter);
      setActiveCardId(null);
    });
  }

  return (
    <section className="space-y-6">
      <div className="overflow-hidden rounded-[2rem] border border-rose-900/70 bg-black/35 shadow-[0_0_70px_rgba(136,19,55,0.18)]">
        <div className="bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.2),transparent_30rem),linear-gradient(135deg,rgba(76,5,25,0.5),rgba(8,3,3,0.95))] p-5 sm:p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">
                {lang === 'zh' ? meta.patchLabelZh : meta.patchLabelEn}
              </p>
              <h1 className="mt-3 bg-gradient-to-r from-amber-100 via-yellow-400 to-rose-500 bg-clip-text text-3xl font-black leading-tight text-transparent sm:text-5xl">
                {lang === 'zh' ? meta.heroTitleZh : meta.heroTitleEn}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {lang === 'zh' ? meta.heroDescriptionZh : meta.heroDescriptionEn}
              </p>
            </div>

            <div className="inline-flex w-fit rounded-full border border-amber-300/25 bg-black/45 p-1 shadow-inner shadow-black/70">
              <button
                type="button"
                onClick={() => switchLang('zh')}
                className={`rounded-full px-4 py-2 text-sm font-black transition ${
                  lang === 'zh'
                    ? 'bg-gradient-to-r from-amber-200 to-yellow-500 text-[#1b0b05]'
                    : 'text-slate-400 hover:text-amber-100'
                }`}
              >
                中文
              </button>
              <button
                type="button"
                onClick={() => switchLang('en')}
                className={`rounded-full px-4 py-2 text-sm font-black transition ${
                  lang === 'en'
                    ? 'bg-gradient-to-r from-amber-200 to-yellow-500 text-[#1b0b05]'
                    : 'text-slate-400 hover:text-amber-100'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {characterTabs.map(tab => (
              <button
                key={tab}
                type="button"
                aria-pressed={character === tab}
                onClick={() => switchCharacter(tab)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition duration-200 ${
                  character === tab
                    ? 'border-amber-300/60 bg-amber-300/15 text-amber-100 shadow-[0_0_22px_rgba(245,158,11,0.18)]'
                    : 'border-rose-900/70 bg-[#120606]/70 text-slate-300 hover:border-amber-300/40 hover:text-amber-100'
                }`}
              >
                {characterLabels[tab][lang]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div key={`${lang}-${character}`} className="space-y-4 animate-[fadeIn_220ms_ease-out]">
        {tierOrder.map(tier => (
          <TierRow
            key={tier}
            tier={tier}
            items={filteredData.filter(item => item.tier === tier)}
            lang={lang}
            activeId={activeCardId}
            onOpenCard={id => setActiveCardId(current => (current === id ? null : id))}
          />
        ))}
      </div>

      {activeItem && (
        <MobileDetail item={activeItem} lang={lang} onClose={() => setActiveCardId(null)} />
      )}
    </section>
  );
}
