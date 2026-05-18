import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { loadCards } from '@/lib/data/cards';
import { buildTierListData } from '@/lib/data/tier-list';
import TierListBoard from './TierListBoard';

export const metadata: Metadata = {
  title: 'Tier List',
};

export default async function BuildsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const cards = await loadCards();
  const tierList = buildTierListData(cards);

  return (
    <TierListBoard
      initialLang={lang as Locale}
      meta={tierList.meta}
      entries={tierList.entries}
    />
  );
}
