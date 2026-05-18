'use client';

import {
  createContext,
  startTransition,
  useContext,
  useDeferredValue,
  useEffect,
  useState,
} from 'react';
import type { CardEntry } from '@/lib/data/cards';
import type { TierEntry, TierListMeta, TierRank } from '@/lib/data/tier-list';

type Lang = 'zh' | 'en';

type Props = {
  initialLang: Lang;
  meta: TierListMeta;
  entries: TierEntry[];
};

type LocaleContextValue = {
  lang: Lang;
};

const TierLocaleContext = createContext<LocaleContextValue>({ lang: 'zh' });

const tierStyles: Record<TierRank, string> = {
  S: 'border-red-500/70 bg-red-950/50',
  A: 'border-orange-500/70 bg-orange-950/45',
  B: 'border-yellow-500/70 bg-yellow-950/35',
  C: 'border-stone-500/60 bg-stone-900/55',
};

const tierBadgeStyles: Record<TierRank, string> = {
  S: 'bg-red-500 text-red-950',
  A: 'bg-orange-400 text-orange-950',
  B: 'bg-yellow-300 text-yellow-950',
  C: 'bg-stone-300 text-stone-950',
};

const characterLabels = {
  all: { zh: '全部职业', en: 'All Classes' },
  Ironclad: { zh: '铁甲战士', en: 'Ironclad' },
  Silent: { zh: '静默猎手', en: 'Silent' },
  Defect: { zh: '缺陷行者', en: 'Defect' },
  Necrobinder: { zh: '死灵术士', en: 'Necrobinder' },
  Regent: { zh: '摄政者', en: 'Regent' },
} as const;

function cardTypeLabel(type: string, lang: Lang) {
  if (lang === 'en') return type;
  if (type === 'Attack') return '攻击';
  if (type === 'Skill') return '技能';
  if (type === 'Power') return '能力';
  return type;
}

function rarityLabel(rarity: string, lang: Lang) {
  if (lang === 'en') return rarity;
  if (rarity === 'Common') return '普通';
  if (rarity === 'Uncommon') return '罕见';
  if (rarity === 'Rare' || rarity === 'Ancient') return '稀有';
  if (rarity === 'Basic') return '基础';
  return rarity;
}

function TooltipCard({
  card,
  active,
  onToggle,
}: {
  card: CardEntry;
  active: boolean;
  onToggle: () => void;
}) {
  const { lang } = useContext(TierLocaleContext);
  const primarySummary = lang === 'zh' ? card.summaryZh : card.summaryEn;
  const secondarySummary = lang === 'zh' ? card.summaryEn : card.summaryZh;

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={onToggle}
        className="group relative flex h-16 w-16 shrink-0 flex-col justify-between overflow-hidden rounded-lg border border-blood-800/70 bg-spire-950/85 p-2 text-left shadow-sm transition-transform duration-150 hover:-translate-y-0.5 hover:border-ember-400/70"
        aria-expanded={active}
      >
        <span className="absolute right-1 top-1 rounded bg-ember-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-bone-100">
          {card.cost >= 0 ? card.cost : 'X'}
        </span>
        <span className="max-w-[2.8rem] text-[10px] font-semibold uppercase leading-tight text-bone-100">
          {(lang === 'zh' ? card.nameZh : card.nameEn).slice(0, 8)}
        </span>
        <span className="text-[10px] text-bone-500">{card.type.slice(0, 1)}</span>
      </button>

      {active && (
        <>
          <div className="absolute left-0 top-[calc(100%+0.6rem)] z-20 hidden w-80 rounded-lg border border-blood-800/80 bg-spire-950/95 p-4 shadow-2xl sm:block">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-semibold text-bone-100">{card.nameZh}</h4>
                  <p className="text-sm text-bone-300">{card.nameEn}</p>
                </div>
                <span className="rounded bg-ember-500 px-2 py-1 text-xs font-bold text-bone-100">
                  {lang === 'zh' ? '费用' : 'Cost'} {card.cost >= 0 ? card.cost : 'X'}
                </span>
              </div>
              <p className="text-xs text-ember-300">
                {rarityLabel(card.rarity, lang)} · {cardTypeLabel(card.type, lang)}
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-bone-100">{primarySummary}</p>
              <p className="whitespace-pre-line border-t border-blood-900/70 pt-3 text-xs leading-5 text-bone-400">
                {secondarySummary}
              </p>
            </div>
          </div>

          <div className="fixed inset-x-4 bottom-4 z-30 rounded-lg border border-blood-800/80 bg-spire-950/95 p-4 shadow-2xl sm:hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-base font-semibold text-bone-100">{card.nameZh}</h4>
                <p className="text-sm text-bone-300">{card.nameEn}</p>
              </div>
              <button
                type="button"
                onClick={onToggle}
                className="rounded border border-blood-800/70 px-2 py-1 text-xs text-bone-300"
              >
                {lang === 'zh' ? '关闭' : 'Close'}
              </button>
            </div>
            <p className="mt-2 text-xs text-ember-300">
              {rarityLabel(card.rarity, lang)} · {cardTypeLabel(card.type, lang)} ·{' '}
              {lang === 'zh' ? '费用' : 'Cost'} {card.cost >= 0 ? card.cost : 'X'}
            </p>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-bone-100">{primarySummary}</p>
            <p className="mt-3 whitespace-pre-line border-t border-blood-900/70 pt-3 text-xs leading-5 text-bone-400">
              {secondarySummary}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function TierSection({
  tier,
  entries,
  activeCardId,
  onCardToggle,
}: {
  tier: TierRank;
  entries: TierEntry[];
  activeCardId: string | null;
  onCardToggle: (id: string) => void;
}) {
  const { lang } = useContext(TierLocaleContext);

  if (entries.length === 0) {
    return null;
  }

  return (
    <section className={`rounded-lg border p-4 sm:p-5 ${tierStyles[tier]}`}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className={`rounded px-3 py-1 text-sm font-black ${tierBadgeStyles[tier]}`}>{tier}</span>
          <div>
            <h2 className="text-lg font-semibold text-bone-100">
              {lang === 'zh' ? `${tier} 级推荐` : `${tier} Tier Picks`}
            </h2>
            <p className="text-sm text-bone-300">
              {lang === 'zh'
                ? '点击卡牌图标查看中英双语属性。'
                : 'Tap any card icon to inspect bilingual details.'}
            </p>
          </div>
        </div>
        <span className="text-xs uppercase tracking-[0.2em] text-bone-500">{entries.length} builds</span>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {entries.map(entry => (
          <article key={entry.id} className="min-w-0 rounded-lg border border-black/20 bg-black/15 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.18em] text-ember-300">
                  {lang === 'zh'
                    ? characterLabels[entry.character].zh
                    : characterLabels[entry.character].en}
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-tight text-bone-100">
                  {lang === 'zh' ? entry.titleZh : entry.titleEn}
                </h3>
              </div>
              <span className="shrink-0 rounded border border-blood-900/70 px-2 py-1 text-[11px] text-bone-300">
                {entry.cards.length} cards
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-bone-300">
              {lang === 'zh' ? entry.noteZh : entry.noteEn}
            </p>

            <div className="mt-4 overflow-x-auto pb-2">
              <div className="flex min-w-max gap-2">
                {entry.cards.map(card => (
                  <TooltipCard
                    key={card.id}
                    card={card}
                    active={activeCardId === card.id}
                    onToggle={() => onCardToggle(card.id)}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function TierListBoard({ initialLang, meta, entries }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [character, setCharacter] = useState<keyof typeof characterLabels>('all');
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const deferredCharacter = useDeferredValue(character);

  useEffect(() => {
    setActiveCardId(null);
  }, [deferredCharacter, lang]);

  const filteredEntries =
    deferredCharacter === 'all'
      ? entries
      : entries.filter(entry => entry.character === deferredCharacter);

  const sections: TierRank[] = ['S', 'A', 'B', 'C'];

  return (
    <TierLocaleContext.Provider value={{ lang }}>
      <section className="space-y-6">
        <div className="overflow-hidden rounded-lg border border-blood-800/70 bg-spire-900/85">
          <div className="border-b border-blood-900/70 bg-[radial-gradient(circle_at_top_left,rgba(240,138,60,0.28),transparent_45%),linear-gradient(135deg,rgba(100,17,17,0.45),rgba(9,6,7,0.95))] p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.28em] text-ember-300">
                  {lang === 'zh' ? meta.patchLabelZh : meta.patchLabelEn}
                </p>
                <h1 className="mt-3 text-3xl font-black leading-tight text-bone-100 sm:text-4xl">
                  {lang === 'zh' ? meta.heroTitleZh : meta.heroTitleEn}
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-bone-300 sm:text-base">
                  {lang === 'zh' ? meta.heroDescriptionZh : meta.heroDescriptionEn}
                </p>
              </div>

              <div className="inline-flex rounded-lg border border-blood-900/70 bg-spire-950/70 p-1">
                <button
                  type="button"
                  onClick={() => {
                    startTransition(() => setLang('zh'));
                  }}
                  className={`rounded px-4 py-2 text-sm ${lang === 'zh' ? 'bg-ember-500 text-bone-100' : 'text-bone-300 hover:text-bone-100'}`}
                >
                  中文
                </button>
                <button
                  type="button"
                  onClick={() => {
                    startTransition(() => setLang('en'));
                  }}
                  className={`rounded px-4 py-2 text-sm ${lang === 'en' ? 'bg-ember-500 text-bone-100' : 'text-bone-300 hover:text-bone-100'}`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(Object.keys(characterLabels) as Array<keyof typeof characterLabels>).map(key => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={character === key}
                  onClick={() => {
                    startTransition(() => setCharacter(key));
                  }}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                    character === key
                      ? 'border-ember-400 bg-ember-500 text-bone-100'
                      : 'border-blood-900/70 bg-spire-950/60 text-bone-300 hover:border-ember-400/60 hover:text-bone-100'
                  }`}
                >
                  {lang === 'zh' ? characterLabels[key].zh : characterLabels[key].en}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map(tier => (
            <TierSection
              key={tier}
              tier={tier}
              entries={filteredEntries.filter(entry => entry.tier === tier)}
              activeCardId={activeCardId}
              onCardToggle={id => setActiveCardId(current => (current === id ? null : id))}
            />
          ))}
        </div>
      </section>
    </TierLocaleContext.Provider>
  );
}
