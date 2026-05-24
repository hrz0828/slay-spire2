'use client';

import { useMemo, useState } from 'react';
import type { CardEntry } from '@/lib/data/cards';
import { localizedPath } from '@/lib/routes';

type Props = {
  lang: 'zh' | 'en';
  items: CardEntry[];
};

export default function CardsFilter({ lang, items }: Props) {
  const zh = lang === 'zh';
  const [character, setCharacter] = useState('all');
  const [rarity, setRarity] = useState('all');
  const [type, setType] = useState('all');
  const [maxCost, setMaxCost] = useState(3);
  const [tag, setTag] = useState('');

  const characters = useMemo(
    () => Array.from(new Set(items.map(item => item.character))).sort(),
    [items],
  );
  const rarities = useMemo(() => Array.from(new Set(items.map(item => item.rarity))).sort(), [items]);
  const types = useMemo(() => Array.from(new Set(items.map(item => item.type))).sort(), [items]);

  const filtered = useMemo(
    () =>
      items.filter(card => {
        const charOk = character === 'all' || card.character === character;
        const rarityOk = rarity === 'all' || card.rarity === rarity;
        const typeOk = type === 'all' || card.type === type;
        const costOk = card.cost <= maxCost;
        const tagOk = !tag || card.tags.some(t => t.includes(tag.toLowerCase().trim()));
        return charOk && rarityOk && typeOk && costOk && tagOk;
      }),
    [character, items, maxCost, rarity, tag, type],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-3 rounded-lg border border-blood-900/70 bg-spire-900/70 p-4 md:grid-cols-5">
        <select
          value={character}
          onChange={e => setCharacter(e.target.value as typeof character)}
          className="rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-sm text-bone-100"
        >
          <option value="all">{zh ? '全部角色' : 'All Characters'}</option>
          {characters.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={rarity}
          onChange={e => setRarity(e.target.value as typeof rarity)}
          className="rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-sm text-bone-100"
        >
          <option value="all">{zh ? '全部稀有度' : 'All Rarities'}</option>
          {rarities.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={e => setType(e.target.value as typeof type)}
          className="rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-sm text-bone-100"
        >
          <option value="all">{zh ? '全部类型' : 'All Types'}</option>
          {types.map(value => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <label className="flex items-center gap-2 rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-sm text-bone-300">
          {zh ? '最大费用' : 'Max Cost'}
          <input
            type="number"
            min={0}
            max={5}
            value={maxCost}
            onChange={e => setMaxCost(Math.min(5, Math.max(0, Number(e.target.value) || 0)))}
            className="w-14 rounded border border-blood-900/70 bg-spire-900 px-2 py-1 text-bone-100"
          />
        </label>

        <input
          value={tag}
          onChange={e => setTag(e.target.value)}
          placeholder={zh ? '关键词: draw / aoe / poison' : 'Tag: draw / aoe / poison'}
          className="rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-sm text-bone-100 placeholder:text-bone-500"
        />
      </div>

      <p className="text-sm text-bone-300">
        {zh ? '当前结果: ' : 'Results: '}
        <span className="font-semibold text-ember-300">{filtered.length}</span>
      </p>

      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map(card => (
          <a
            key={card.id}
            href={localizedPath(lang, `cards/${card.id}`)}
            className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-4 hover:border-ember-400/70"
          >
            <h3 className="font-semibold text-bone-100">{zh ? card.nameZh : card.nameEn}</h3>
            <p className="mt-1 text-xs text-ember-300">
              {card.character} / {card.rarity} / {card.type} / {zh ? '费用' : 'Cost'} {card.cost}
            </p>
            <p className="mt-2 text-sm text-bone-300">{zh ? card.summaryZh : card.summaryEn}</p>
            <p className="mt-2 text-xs text-bone-500">{card.tags.join(' · ')}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
