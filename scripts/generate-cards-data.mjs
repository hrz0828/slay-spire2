import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const cardsDir = path.join(root, 'cards');
const outputFile = path.join(root, 'lib/data/cards.generated.json');

function normalize(value, fallback) {
  return (value ?? fallback).trim();
}

function makeTags(card) {
  const text = `${card.text_default_eng ?? ''} ${card.text_raw_eng ?? ''}`.toLowerCase();
  const tags = [];
  if (text.includes('draw')) tags.push('draw');
  if (text.includes('block')) tags.push('block');
  if (text.includes('poison')) tags.push('poison');
  if (text.includes('lightning') || text.includes('channel')) tags.push('orb');
  if (text.includes('vulnerable')) tags.push('vulnerable');
  if (text.includes('strength')) tags.push('strength');
  if (text.includes('all enemies')) tags.push('aoe');
  return tags;
}

const files = (await readdir(cardsDir)).filter(file => file.endsWith('.json')).sort();
const cards = [];

for (const file of files) {
  const raw = await readFile(path.join(cardsDir, file), 'utf8');
  const parsed = JSON.parse(raw);
  const card = parsed.card;
  if (!card) continue;

  cards.push({
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
  });
}

await writeFile(outputFile, `${JSON.stringify(cards, null, 2)}\n`);
console.log(`Wrote ${cards.length} cards to ${path.relative(root, outputFile)}`);
