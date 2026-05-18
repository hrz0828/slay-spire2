import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

export type CardEntry = {
  id: string;
  nameZh: string;
  nameEn: string;
  character: string;
  rarity: string;
  type: string;
  cost: number;
  tags: string[];
  summaryZh: string;
  summaryEn: string;
  summaryUpgradedZh: string;
  summaryUpgradedEn: string;
};

type SourceCard = {
  key?: string;
  category?: string;
  name_chs?: string;
  name_eng?: string;
  cost?: number;
  rarity?: string;
  type?: string;
  text_default_chs?: string;
  text_upgraded_chs?: string;
  text_default_eng?: string;
  text_upgraded_eng?: string;
  text_raw_eng?: string;
};

function normalize(value: string | undefined, fallback: string) {
  return (value ?? fallback).trim();
}

function makeTags(card: SourceCard) {
  const text = `${card.text_default_eng ?? ''} ${card.text_raw_eng ?? ''}`.toLowerCase();
  const tags: string[] = [];
  if (text.includes('draw')) tags.push('draw');
  if (text.includes('block')) tags.push('block');
  if (text.includes('poison')) tags.push('poison');
  if (text.includes('lightning') || text.includes('channel')) tags.push('orb');
  if (text.includes('vulnerable')) tags.push('vulnerable');
  if (text.includes('strength')) tags.push('strength');
  if (text.includes('all enemies')) tags.push('aoe');
  return tags;
}

export async function loadCards(): Promise<CardEntry[]> {
  const dir = path.join(process.cwd(), 'cards');
  const files = (await readdir(dir)).filter(file => file.endsWith('.json')).sort();

  const cards = await Promise.all(
    files.map(async file => {
      const raw = await readFile(path.join(dir, file), 'utf8');
      const parsed = JSON.parse(raw) as { card?: SourceCard };
      const card = parsed.card;
      if (!card) return null;

      return {
        id: normalize(card.key, file.replace(/\.json$/i, '')),
        nameZh: normalize(card.name_chs, card.key ?? file),
        nameEn: normalize(card.name_eng, card.key ?? file),
        character: normalize(card.category, 'Unknown'),
        rarity: normalize(card.rarity, 'Unknown'),
        type: normalize(card.type, 'Unknown'),
        cost: typeof card.cost === 'number' ? card.cost : -1,
        tags: makeTags(card),
        summaryZh: normalize(card.text_default_chs, '暂无描述'),
        summaryEn: normalize(card.text_default_eng, normalize(card.text_raw_eng, 'No description')),
        summaryUpgradedZh: normalize(
          card.text_upgraded_chs,
          normalize(card.text_default_chs, '暂无描述'),
        ),
        summaryUpgradedEn: normalize(
          card.text_upgraded_eng,
          normalize(card.text_default_eng, normalize(card.text_raw_eng, 'No description')),
        ),
      } satisfies CardEntry;
    }),
  );

  return cards.filter((card): card is CardEntry => card !== null);
}

export async function getAllCardIds(): Promise<string[]> {
  const cards = await loadCards();
  return cards.map(card => card.id);
}

export async function getCardById(id: string): Promise<CardEntry | null> {
  const cards = await loadCards();
  return cards.find(card => card.id === id) ?? null;
}
