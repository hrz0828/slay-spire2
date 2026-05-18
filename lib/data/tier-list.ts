import type { CardEntry } from './cards';
import tierListConfig from './tier-list.json';

export type TierRank = 'S' | 'A' | 'B' | 'C';
export type TierCharacter = 'Ironclad' | 'Silent' | 'Defect' | 'Necrobinder' | 'Regent';

export type TierSeed = {
  id: string;
  tier: TierRank;
  character: TierCharacter;
  titleZh: string;
  titleEn: string;
  noteZh: string;
  noteEn: string;
  cardIds: string[];
};

export type TierEntry = TierSeed & {
  cards: CardEntry[];
};

export type TierListMeta = {
  patchLabelZh: string;
  patchLabelEn: string;
  heroTitleZh: string;
  heroTitleEn: string;
  heroDescriptionZh: string;
  heroDescriptionEn: string;
};

export type TierListData = {
  meta: TierListMeta;
  entries: TierEntry[];
};

type TierListConfigSource = {
  meta: TierListMeta;
  entries: TierSeed[];
};

const config = tierListConfig as TierListConfigSource;

export function buildTierListData(cards: CardEntry[]): TierListData {
  const byId = new Map(cards.map(card => [card.id, card]));

  return {
    meta: config.meta,
    entries: config.entries
      .map(entry => ({
        ...entry,
        cards: entry.cardIds
          .map(cardId => byId.get(cardId))
          .filter((card): card is CardEntry => Boolean(card)),
      }))
      .filter(entry => entry.cards.length > 0),
  };
}
