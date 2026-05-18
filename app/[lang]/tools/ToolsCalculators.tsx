'use client';

import { useMemo, useState } from 'react';

type Props = {
  lang: 'zh' | 'en';
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function ToolsCalculators({ lang }: Props) {
  const zh = lang === 'zh';

  const [hp, setHp] = useState(55);
  const [potions, setPotions] = useState(2);
  const [elites, setElites] = useState(2);

  const [deckSize, setDeckSize] = useState(20);
  const [keyCards, setKeyCards] = useState(4);
  const [drawPerTurn, setDrawPerTurn] = useState(5);

  const [bossHp, setBossHp] = useState(420);
  const [avgDamage, setAvgDamage] = useState(48);
  const [burstTurns, setBurstTurns] = useState(2);
  const [burstBonus, setBurstBonus] = useState(30);

  const pathRisk = useMemo(() => {
    const sustain = hp * 0.85 + potions * 18 - elites * 16;
    const fights = clamp(Math.floor(sustain / 18), 1, 12);
    const level =
      sustain >= 130 ? (zh ? '低风险' : 'Low risk') : sustain >= 85 ? (zh ? '中风险' : 'Medium risk') : (zh ? '高风险' : 'High risk');
    return { fights, level };
  }, [elites, hp, potions, zh]);

  const drawRate = useMemo(() => {
    const sizeBefore = Math.max(5, deckSize);
    const sizeAfter = Math.max(5, deckSize - 1);
    const keys = clamp(keyCards, 1, Math.min(8, sizeBefore));
    const draw = clamp(drawPerTurn, 1, 10);
    const before = clamp((keys / sizeBefore) * draw, 0, 1) * 100;
    const after = clamp((keys / sizeAfter) * draw, 0, 1) * 100;
    return {
      before: before.toFixed(1),
      after: after.toFixed(1),
      gain: (after - before).toFixed(1),
    };
  }, [deckSize, drawPerTurn, keyCards]);

  const killWindow = useMemo(() => {
    const totalBurst = avgDamage + burstBonus;
    const damageForBurstTurns = totalBurst * clamp(burstTurns, 0, 6);
    let remain = bossHp - damageForBurstTurns;
    let turns = clamp(burstTurns, 0, 6);
    if (remain > 0) {
      turns += Math.ceil(remain / Math.max(1, avgDamage));
    }
    remain = Math.max(0, remain);
    return { turns, remain };
  }, [avgDamage, bossHp, burstBonus, burstTurns]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-5">
        <h2 className="text-lg font-semibold text-ember-300">
          {zh ? '路线风险评估' : 'Path Risk Estimator'}
        </h2>
        <div className="mt-4 space-y-3 text-sm text-bone-300">
          <label className="block">
            {zh ? '当前血量' : 'Current HP'}
            <input
              type="number"
              value={hp}
              onChange={e => setHp(clamp(Number(e.target.value) || 0, 1, 200))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
          <label className="block">
            {zh ? '药水数量' : 'Potion count'}
            <input
              type="number"
              value={potions}
              onChange={e => setPotions(clamp(Number(e.target.value) || 0, 0, 5))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
          <label className="block">
            {zh ? '目标精英数' : 'Target elites'}
            <input
              type="number"
              value={elites}
              onChange={e => setElites(clamp(Number(e.target.value) || 0, 0, 4))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
        </div>
        <p className="mt-4 rounded border border-blood-900/70 bg-spire-950/60 px-3 py-2 text-sm text-bone-100">
          {zh ? '建议可承受战斗数: ' : 'Suggested sustainable fights: '}
          <span className="font-semibold text-ember-300">{pathRisk.fights}</span>
          {' | '}
          {zh ? '风险级别: ' : 'Risk: '}
          <span className="font-semibold text-ember-300">{pathRisk.level}</span>
        </p>
      </article>

      <article className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-5">
        <h2 className="text-lg font-semibold text-ember-300">
          {zh ? '删牌收益估算' : 'Card Remove Value'}
        </h2>
        <div className="mt-4 space-y-3 text-sm text-bone-300">
          <label className="block">
            {zh ? '牌组张数' : 'Deck size'}
            <input
              type="number"
              value={deckSize}
              onChange={e => setDeckSize(clamp(Number(e.target.value) || 0, 5, 60))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
          <label className="block">
            {zh ? '核心牌数量' : 'Key cards'}
            <input
              type="number"
              value={keyCards}
              onChange={e => setKeyCards(clamp(Number(e.target.value) || 0, 1, 8))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
          <label className="block">
            {zh ? '每回合抽牌' : 'Cards drawn per turn'}
            <input
              type="number"
              value={drawPerTurn}
              onChange={e => setDrawPerTurn(clamp(Number(e.target.value) || 0, 1, 10))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
        </div>
        <p className="mt-4 rounded border border-blood-900/70 bg-spire-950/60 px-3 py-2 text-sm text-bone-100">
          {zh ? '抽到核心牌概率(单回合): ' : 'Key-card hit chance (per turn): '}
          <span className="font-semibold text-ember-300">
            {drawRate.before}% → {drawRate.after}%
          </span>
          {' | '}
          {zh ? '提升: ' : 'Gain: '}
          <span className="font-semibold text-ember-300">+{drawRate.gain}%</span>
        </p>
      </article>

      <article className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-5">
        <h2 className="text-lg font-semibold text-ember-300">
          {zh ? 'Boss 斩杀窗' : 'Boss Kill Window'}
        </h2>
        <div className="mt-4 space-y-3 text-sm text-bone-300">
          <label className="block">
            {zh ? 'Boss 血量' : 'Boss HP'}
            <input
              type="number"
              value={bossHp}
              onChange={e => setBossHp(clamp(Number(e.target.value) || 0, 50, 1200))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
          <label className="block">
            {zh ? '平均回合伤害' : 'Average turn damage'}
            <input
              type="number"
              value={avgDamage}
              onChange={e => setAvgDamage(clamp(Number(e.target.value) || 0, 1, 300))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
          <label className="block">
            {zh ? '爆发回合数' : 'Burst turns'}
            <input
              type="number"
              value={burstTurns}
              onChange={e => setBurstTurns(clamp(Number(e.target.value) || 0, 0, 6))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
          <label className="block">
            {zh ? '爆发额外伤害/回合' : 'Burst bonus damage/turn'}
            <input
              type="number"
              value={burstBonus}
              onChange={e => setBurstBonus(clamp(Number(e.target.value) || 0, 0, 500))}
              className="mt-1 w-full rounded border border-blood-900/70 bg-spire-950/70 px-3 py-2 text-bone-100"
            />
          </label>
        </div>
        <p className="mt-4 rounded border border-blood-900/70 bg-spire-950/60 px-3 py-2 text-sm text-bone-100">
          {zh ? '预计击杀回合: ' : 'Estimated kill turn: '}
          <span className="font-semibold text-ember-300">{killWindow.turns}</span>
          {' | '}
          {zh ? '爆发后剩余血量: ' : 'HP left after burst phase: '}
          <span className="font-semibold text-ember-300">{killWindow.remain}</span>
        </p>
      </article>
    </div>
  );
}
