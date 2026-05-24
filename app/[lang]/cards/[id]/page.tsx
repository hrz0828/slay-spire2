import type { Metadata } from 'next';
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/lib/i18n';
import { localizedAlternates, localizedPath } from '@/lib/routes';

type RawCardFile = {
  card?: {
    key?: string;
    category?: string;
    name_chs?: string;
    name_eng?: string;
    cost?: number | string;
    rarity?: string;
    type?: string;
    text_default_chs?: string;
    text_raw_eng?: string;
  };
};

type Card = {
  key: string;
  category: string;
  nameChs: string;
  nameEng: string;
  cost: string;
  rarity: string;
  type: string;
  descZh: string;
  descEn: string;
};

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

const CARDS_DIR = path.join(process.cwd(), 'cards');

function normalizeText(value: unknown, fallback: string) {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function loadAllCards(): Card[] {
  let files: string[] = [];
  try {
    files = readdirSync(CARDS_DIR);
  } catch {
    return [];
  }

  const cards: Card[] = [];

  for (const file of files) {
    if (!file.endsWith('.json')) continue;

    try {
      const fullPath = path.join(CARDS_DIR, file);
      const raw = readFileSync(fullPath, 'utf8');
      const parsed = JSON.parse(raw) as RawCardFile;
      const source = parsed.card;
      if (!source || typeof source.key !== 'string' || source.key.trim().length === 0) continue;

      const key = source.key.trim();
      cards.push({
        key,
        category: normalizeText(source.category, 'Unknown'),
        nameChs: normalizeText(source.name_chs, key),
        nameEng: normalizeText(source.name_eng, key),
        cost:
          typeof source.cost === 'number' || typeof source.cost === 'string'
            ? String(source.cost)
            : '?',
        rarity: normalizeText(source.rarity, 'Unknown'),
        type: normalizeText(source.type, 'Unknown'),
        descZh: normalizeText(source.text_default_chs, '暂无描述'),
        descEn: normalizeText(source.text_raw_eng, 'No description'),
      });
    } catch {
      // Ignore malformed card files and continue scanning.
    }
  }

  return cards;
}

function getCardByKey(key: string): Card | null {
  const cards = loadAllCards();
  return cards.find(card => card.key === key) ?? null;
}

function rarityClass(rarity: string) {
  const value = rarity.toLowerCase();
  if (value.includes('rare')) return 'border-amber-300 bg-amber-400/10 text-amber-200';
  if (value.includes('uncommon')) return 'border-orange-300 bg-orange-400/10 text-orange-200';
  if (value.includes('basic')) return 'border-emerald-300 bg-emerald-400/10 text-emerald-200';
  return 'border-zinc-300/70 bg-zinc-300/10 text-zinc-100';
}

function typeClass(type: string) {
  const value = type.toLowerCase();
  if (value.includes('attack')) return 'border-red-300 bg-red-400/10 text-red-200';
  if (value.includes('skill')) return 'border-sky-300 bg-sky-400/10 text-sky-200';
  if (value.includes('power')) return 'border-yellow-300 bg-yellow-400/10 text-yellow-200';
  return 'border-blood-700 bg-blood-900/50 text-bone-200';
}

export async function generateStaticParams() {
  const cards = loadAllCards();
  return locales.flatMap(lang => cards.map(card => ({ lang, id: card.key })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};

  const card = getCardByKey(id);
  if (!card) return {};

  const zh = lang === 'zh';
  const name = zh ? card.nameChs : card.nameEng;

  const title = zh
    ? `《杀戮尖塔2攻略》${name}｜卡牌图鉴与流派搭配`
    : `${name} Card Guide - Slay the Spire 2 Wiki`;
  const description = zh
    ? `${name}卡牌详情：费用、稀有度、类型、效果与流派搭配建议。`
    : `${name} card details: cost, rarity, type, effect text and build synergies for Slay the Spire 2.`;
  const route = `cards/${card.key}`;

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath(lang, route),
      languages: localizedAlternates(route),
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: localizedPath(lang, route),
      locale: zh ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export default async function CardPage({ params }: Props) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const card = getCardByKey(id);
  if (!card) notFound();

  const locale = lang as Locale;
  const zh = locale === 'zh';

  const displayName = zh ? card.nameChs : card.nameEng;
  const displayDesc = zh ? card.descZh : card.descEn;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-bone-100 sm:text-4xl">{zh ? '卡牌详情' : 'Card Detail'}</h1>
        <a
          href={localizedPath(locale, 'cards')}
          className="rounded-md border border-blood-700 bg-spire-900/80 px-4 py-2 text-sm text-bone-200 hover:border-amber-400/80 hover:text-amber-200"
        >
          {zh ? '返回卡牌列表' : 'Back to Cards'}
        </a>
      </div>

      <article className="relative overflow-hidden rounded-md border border-blood-700 bg-gradient-to-br from-[#1f0d0d] via-[#170b0b] to-[#120a07] p-6 shadow-[0_0_40px_rgba(120,20,20,0.35)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.18),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(153,27,27,0.3),transparent_50%)]" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-amber-300/90">Slay the Spire 2</p>
              <h2 className="text-3xl font-semibold text-bone-100 sm:text-4xl">{displayName}</h2>
              <p className="text-sm text-bone-400">{card.key}</p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-300 bg-black/25 text-2xl font-bold text-amber-200">
              {card.cost}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-blood-800/80 bg-black/20 px-4 py-3">
              <p className="text-xs text-bone-400">{zh ? '职业' : 'Character'}</p>
              <p className="mt-1 font-medium text-bone-100">{card.category}</p>
            </div>
            <div className={`rounded-md border px-4 py-3 ${rarityClass(card.rarity)}`}>
              <p className="text-xs opacity-80">{zh ? '稀有度' : 'Rarity'}</p>
              <p className="mt-1 font-medium">{card.rarity}</p>
            </div>
            <div className={`rounded-md border px-4 py-3 ${typeClass(card.type)}`}>
              <p className="text-xs opacity-80">{zh ? '类型' : 'Type'}</p>
              <p className="mt-1 font-medium">{card.type}</p>
            </div>
          </div>

          <div className="rounded-md border border-amber-500/40 bg-black/20 px-5 py-4">
            <p className="mb-2 text-xs uppercase tracking-wide text-amber-300">{zh ? '效果描述' : 'Effect'}</p>
            <p className="whitespace-pre-line text-base leading-7 text-bone-100">{displayDesc}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
