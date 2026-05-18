export type RelicTier = 'starter' | 'common' | 'uncommon' | 'rare' | 'boss';

export type RelicEntry = {
  id: string;
  nameZh: string;
  nameEn: string;
  tier: RelicTier;
  style: 'offense' | 'defense' | 'economy' | 'utility';
  summaryZh: string;
  summaryEn: string;
};

export const relics: RelicEntry[] = [
  {
    id: 'burning-blood',
    nameZh: '燃烧之血',
    nameEn: 'Burning Blood',
    tier: 'starter',
    style: 'defense',
    summaryZh: '每场战斗后恢复生命，强化续航与容错。',
    summaryEn: 'Post-combat healing that increases sustain and margin.',
  },
  {
    id: 'anchor',
    nameZh: '船锚',
    nameEn: 'Anchor',
    tier: 'common',
    style: 'defense',
    summaryZh: '首回合格挡，提升开局稳定性。',
    summaryEn: 'Turn-one block, useful for early stabilization.',
  },
  {
    id: 'lantern',
    nameZh: '灯笼',
    nameEn: 'Lantern',
    tier: 'common',
    style: 'utility',
    summaryZh: '首回合额外能量，利于先手展开。',
    summaryEn: 'Extra first-turn energy for faster openings.',
  },
  {
    id: 'toxic-egg',
    nameZh: '有毒之蛋',
    nameEn: 'Toxic Egg',
    tier: 'uncommon',
    style: 'economy',
    summaryZh: '技能牌自动升级，显著节省篝火压力。',
    summaryEn: 'Auto-upgraded skills, reducing campfire upgrade pressure.',
  },
  {
    id: 'incense-burner',
    nameZh: '熏香',
    nameEn: 'Incense Burner',
    tier: 'rare',
    style: 'defense',
    summaryZh: '周期无实体，Boss 战上限极高。',
    summaryEn: 'Periodic Intangible creates huge boss-fight upside.',
  },
  {
    id: 'fusion-hammer',
    nameZh: '融合之锤',
    nameEn: 'Fusion Hammer',
    tier: 'boss',
    style: 'economy',
    summaryZh: '提供能量但失去升级，需要高质量基础牌组。',
    summaryEn: 'Energy now, no upgrades later; demands strong baseline cards.',
  },
];
