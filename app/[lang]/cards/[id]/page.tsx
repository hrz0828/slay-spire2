import type { Metadata } from 'next';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { notFound } from 'next/navigation';
import { isLocale, locales, type Locale } from '@/lib/i18n';

interface Card {
  id: string;
  character: string;
  name_zh: string;
  name_en: string;
  rarity: string;
  type: string;
  cost: string;
  desc_zh: string;
  desc_en: string;
}

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

const CARDS_FILE_PATH = path.join(process.cwd(), 'public', 'data', 'cards.json');

async function loadCards(): Promise<Card[]> {
  try {
    const file = await readFile(CARDS_FILE_PATH, 'utf8');
    const parsed = JSON.parse(file) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter(
      (item): item is Card =>
        Boolean(
          item &&
            typeof item === 'object' &&
            typeof (item as Card).id === 'string' &&
            typeof (item as Card).character === 'string' &&
            typeof (item as Card).name_zh === 'string' &&
            typeof (item as Card).name_en === 'string' &&
            typeof (item as Card).rarity === 'string' &&
            typeof (item as Card).type === 'string' &&
            typeof (item as Card).cost === 'string' &&
            typeof (item as Card).desc_zh === 'string' &&
            typeof (item as Card).desc_en === 'string',
        ),
    );
  } catch {
    return [];
  }
}

async function getCardById(id: string): Promise<Card | null> {
  const cards = await loadCards();
  return cards.find(card => card.id === id) ?? null;
}

function rarityClass(rarity: string) {
  const key = rarity.toLowerCase();
  if (key.includes('rare')) return 'border-amber-300 bg-amber-400/10 text-amber-200';
  if (key.includes('uncommon')) return 'border-orange-300 bg-orange-400/10 text-orange-200';
  return 'border-zinc-300/70 bg-zinc-300/10 text-zinc-100';
}

function typeClass(type: string) {
  const key = type.toLowerCase();
  if (key.includes('attack')) return 'border-red-300 bg-red-400/10 text-red-200';
  if (key.includes('skill')) return 'border-sky-300 bg-sky-400/10 text-sky-200';
  if (key.includes('power')) return 'border-yellow-300 bg-yellow-400/10 text-yellow-200';
  return 'border-blood-700 bg-blood-900/50 text-bone-200';
}

export async function generateStaticParams() {
  const cards = await loadCards();
  return locales.flatMap(lang => cards.map(card => ({ lang, id: card.id })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await params;
  if (!isLocale(lang)) return {};

  const card = await getCardById(id);
  if (!card) return {};

  const zh = lang === 'zh';
  const cardName = zh ? card.name_zh : card.name_en;

  const title = zh
    ? `《杀戮尖塔2攻略》${cardName}｜卡牌图鉴、流派搭配与构筑思路`
    : `${cardName} Card Guide - Slay the Spire 2 (StS2 Wiki, Builds & Synergies)`;

  const description = zh
    ? `${cardName}卡牌详情：职业定位、费用、稀有度、效果解析与流派搭配。覆盖“杀戮尖塔2攻略”“卡牌构筑”“路线决策”高频检索场景。`
    : `${cardName} in-depth card page for Slay the Spire 2: cost, rarity, type, effect and synergy routes. Built for StS2 Wiki lookups, build planning, and meta guide searches.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/cards/${card.id}`,
      languages: {
        zh: `/zh/cards/${card.id}`,
        en: `/en/cards/${card.id}`,
      },
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/${lang}/cards/${card.id}`,
      locale: zh ? 'zh_CN' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CardPage({ params }: Props) {
  const { lang, id } = await params;
  if (!isLocale(lang)) notFound();

  const card = await getCardById(id);
  if (!card) notFound();

  const locale = lang as Locale;
  const zh = locale === 'zh';

  const cardName = zh ? card.name_zh : card.name_en;
  const cardDesc = zh ? card.desc_zh : card.desc_en;
  const labels = {
    title: zh ? '卡牌详情' : 'Card Profile',
    character: zh ? '职业' : 'Character',
    rarity: zh ? '稀有度' : 'Rarity',
    type: zh ? '类型' : 'Type',
    cost: zh ? '费用' : 'Cost',
    backToList: zh ? '返回卡牌列表' : 'Back to Cards',
  };

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-bone-100 sm:text-4xl">{labels.title}</h1>
        <a
          href={`/${locale}/cards`}
          className="rounded-md border border-blood-700 bg-spire-900/80 px-4 py-2 text-sm text-bone-200 hover:border-amber-400/80 hover:text-amber-200"
        >
          {labels.backToList}
        </a>
      </div>

      <article className="relative overflow-hidden rounded-md border border-blood-700 bg-gradient-to-br from-[#1f0d0d] via-[#170b0b] to-[#120a07] p-6 shadow-[0_0_40px_rgba(120,20,20,0.35)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.18),transparent_42%),radial-gradient(circle_at_bottom_left,rgba(153,27,27,0.3),transparent_50%)]" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-amber-300/90">Slay the Spire 2</p>
              <h2 className="text-3xl font-semibold text-bone-100 sm:text-4xl">{cardName}</h2>
              <p className="text-sm text-bone-400">{card.id}</p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-300 bg-black/25 text-2xl font-bold text-amber-200">
              {card.cost}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-blood-800/80 bg-black/20 px-4 py-3">
              <p className="text-xs text-bone-400">{labels.character}</p>
              <p className="mt-1 font-medium text-bone-100">{card.character}</p>
            </div>

            <div className={`rounded-md border px-4 py-3 ${rarityClass(card.rarity)}`}>
              <p className="text-xs opacity-80">{labels.rarity}</p>
              <p className="mt-1 font-medium">{card.rarity}</p>
            </div>

            <div className={`rounded-md border px-4 py-3 ${typeClass(card.type)}`}>
              <p className="text-xs opacity-80">{labels.type}</p>
              <p className="mt-1 font-medium">{card.type}</p>
            </div>
          </div>

          <div className="rounded-md border border-amber-500/40 bg-black/20 px-5 py-4">
            <p className="mb-2 text-xs uppercase tracking-wide text-amber-300">{zh ? '效果描述' : 'Effect'}</p>
            <p className="whitespace-pre-line text-base leading-7 text-bone-100">{cardDesc}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
