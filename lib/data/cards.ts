import cardsData from './cards.generated.json';

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

const cards = cardsData satisfies CardEntry[];

export async function loadCards(): Promise<CardEntry[]> {
  return cards;
}

export async function getAllCardIds(): Promise<string[]> {
  const cards = await loadCards();
  return cards.map(card => card.id);
}

export async function getCardById(id: string): Promise<CardEntry | null> {
  const cards = await loadCards();
  return cards.find(card => card.id === id) ?? null;
}
