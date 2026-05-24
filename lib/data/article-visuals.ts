import type { Locale } from '@/lib/i18n';
import type { ContentCategoryId, CoreArticle } from './content-pyramid';

type LocalizedText = Record<Locale, string>;

type CategoryVisual = {
  image: string;
  thumbnail: string;
  alt: LocalizedText;
  caption: LocalizedText;
};

const steamScreenshots = [
  {
    thumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/1a373a95229aab0cfd97f553ecbe86092364bb9c/ss_1a373a95229aab0cfd97f553ecbe86092364bb9c.600x338.jpg?t=1776735385',
    full:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/1a373a95229aab0cfd97f553ecbe86092364bb9c/ss_1a373a95229aab0cfd97f553ecbe86092364bb9c.1920x1080.jpg?t=1776735385',
  },
  {
    thumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/f3af7cb9693b9c4b6a7555227db3fef943db3992/ss_f3af7cb9693b9c4b6a7555227db3fef943db3992.600x338.jpg?t=1776735385',
    full:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/f3af7cb9693b9c4b6a7555227db3fef943db3992/ss_f3af7cb9693b9c4b6a7555227db3fef943db3992.1920x1080.jpg?t=1776735385',
  },
  {
    thumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/c3db69efd984ef012ae85c5b426663720152f0a4/ss_c3db69efd984ef012ae85c5b426663720152f0a4.600x338.jpg?t=1776735385',
    full:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/c3db69efd984ef012ae85c5b426663720152f0a4/ss_c3db69efd984ef012ae85c5b426663720152f0a4.1920x1080.jpg?t=1776735385',
  },
  {
    thumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/0fdb2940c0d367a40b2be6433daf12e3634089cf/ss_0fdb2940c0d367a40b2be6433daf12e3634089cf.600x338.jpg?t=1776735385',
    full:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/0fdb2940c0d367a40b2be6433daf12e3634089cf/ss_0fdb2940c0d367a40b2be6433daf12e3634089cf.1920x1080.jpg?t=1776735385',
  },
  {
    thumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/18e8bda7bc4cdb37b90e0e2ce546967cbec87076/ss_18e8bda7bc4cdb37b90e0e2ce546967cbec87076.600x338.jpg?t=1776735385',
    full:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/18e8bda7bc4cdb37b90e0e2ce546967cbec87076/ss_18e8bda7bc4cdb37b90e0e2ce546967cbec87076.1920x1080.jpg?t=1776735385',
  },
  {
    thumbnail:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/0aa6bff0eff26e37ccfdb07ad6cab52f8ab1ed4b/ss_0aa6bff0eff26e37ccfdb07ad6cab52f8ab1ed4b.600x338.jpg?t=1776735385',
    full:
      'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2868840/0aa6bff0eff26e37ccfdb07ad6cab52f8ab1ed4b/ss_0aa6bff0eff26e37ccfdb07ad6cab52f8ab1ed4b.1920x1080.jpg?t=1776735385',
  },
] as const;

function visualFromScreenshot(index: number, alt: LocalizedText, caption: LocalizedText): CategoryVisual {
  const screenshot = steamScreenshots[index % steamScreenshots.length];

  return {
    image: screenshot.full,
    thumbnail: screenshot.thumbnail,
    alt,
    caption,
  };
}

const fallbackVisualText: Pick<CategoryVisual, 'alt' | 'caption'> = {
  alt: {
    zh: '《杀戮尖塔 2》官方 Steam 实机截图，展示战斗界面、手牌和敌人',
    en: 'Official Steam gameplay screenshot for Slay the Spire 2 showing combat UI, hand, and enemy',
  },
  caption: {
    zh: '官方 Steam 实机截图：阅读攻略时可直接对照战斗界面、手牌、敌人意图和资源栏。',
    en: 'Official Steam gameplay screenshot: compare the guide against the combat UI, hand, enemy intent, and resources.',
  },
};

const categoryVisualText: Partial<Record<ContentCategoryId, Pick<CategoryVisual, 'alt' | 'caption'>>> = {
  guides: fallbackVisualText,
  characters: {
    alt: {
      zh: '《杀戮尖塔 2》官方 Steam 实机截图，展示角色与战斗场景',
      en: 'Official Steam gameplay screenshot for Slay the Spire 2 showing a character in combat',
    },
    caption: {
      zh: '官方 Steam 实机截图：角色攻略可以结合画面中的职业、手牌和敌人压力理解资源节奏。',
      en: 'Official Steam gameplay screenshot: use the visible class, hand, and enemy pressure to read resource tempo.',
    },
  },
  cards: {
    alt: {
      zh: '《杀戮尖塔 2》官方 Steam 实机截图，展示卡牌选择与战斗信息',
      en: 'Official Steam gameplay screenshot for Slay the Spire 2 showing cards and combat information',
    },
    caption: {
      zh: '官方 Steam 实机截图：卡牌攻略重点看费用、手牌质量、敌人意图和本回合可执行动作。',
      en: 'Official Steam gameplay screenshot: card guides focus on cost, hand quality, enemy intent, and playable lines.',
    },
  },
  relics: {
    alt: {
      zh: '《杀戮尖塔 2》官方 Steam 实机截图，展示遗物栏与局内战斗状态',
      en: 'Official Steam gameplay screenshot for Slay the Spire 2 showing relics and run state',
    },
    caption: {
      zh: '官方 Steam 实机截图：遗物价值要放回局内状态判断，包括血量、金币、手牌和战斗节奏。',
      en: 'Official Steam gameplay screenshot: relic value is judged through HP, gold, hand state, and combat tempo.',
    },
  },
  builds: {
    alt: {
      zh: '《杀戮尖塔 2》官方 Steam 实机截图，展示成型卡组的战斗回合',
      en: 'Official Steam gameplay screenshot for Slay the Spire 2 showing a developed combat turn',
    },
    caption: {
      zh: '官方 Steam 实机截图：流派攻略应回到真实回合，检查输出、防御、过牌和成长是否能同时运转。',
      en: 'Official Steam gameplay screenshot: build guides return to real turns where damage, block, draw, and scaling must work together.',
    },
  },
  bosses: {
    alt: {
      zh: '《杀戮尖塔 2》官方 Steam 实机截图，展示敌人机制与关键战斗回合',
      en: 'Official Steam gameplay screenshot for Slay the Spire 2 showing enemy mechanics and a key combat turn',
    },
    caption: {
      zh: '官方 Steam 实机截图：Boss 和精英攻略应优先观察敌人意图、血线、手牌与药水窗口。',
      en: 'Official Steam gameplay screenshot: boss and elite guides start from enemy intent, HP lines, hand state, and potion windows.',
    },
  },
  strategy: {
    alt: {
      zh: '《杀戮尖塔 2》官方 Steam 实机截图，展示路线决策后的战斗局面',
      en: 'Official Steam gameplay screenshot for Slay the Spire 2 showing a combat state after route decisions',
    },
    caption: {
      zh: '官方 Steam 实机截图：进阶策略把路线、资源、战斗回合和终局能力放在同一局里衡量。',
      en: 'Official Steam gameplay screenshot: advanced strategy weighs routing, resources, combat turns, and win conditions together.',
    },
  },
  resources: {
    alt: {
      zh: '《杀戮尖塔 2》官方 Steam 实机截图，用于资料页机制对照',
      en: 'Official Steam gameplay screenshot for Slay the Spire 2 used for resource and mechanic reference',
    },
    caption: {
      zh: '官方 Steam 实机截图：资料页用于把术语、机制和攻略建议对应到真实局内画面。',
      en: 'Official Steam gameplay screenshot: resource pages connect terms, mechanics, and guide advice to the real game screen.',
    },
  },
};

const categoryScreenshotOffset: Partial<Record<ContentCategoryId, number>> = {
  guides: 0,
  characters: 1,
  cards: 2,
  relics: 3,
  builds: 4,
  bosses: 5,
  strategy: 2,
  resources: 4,
};

function hashSlug(slug: string) {
  return Array.from(slug).reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

function getScreenshotIndex(article: Pick<CoreArticle, 'category' | 'slug' | 'priority'>) {
  const offset = categoryScreenshotOffset[article.category] ?? 0;

  return offset + article.priority + hashSlug(article.slug);
}

export function getArticleVisual(
  article: Pick<CoreArticle, 'category' | 'title' | 'slug' | 'priority'>,
): CategoryVisual {
  const text = categoryVisualText[article.category] ?? fallbackVisualText;
  const visual = visualFromScreenshot(getScreenshotIndex(article), text.alt, text.caption);

  return {
    ...visual,
    alt: {
      zh: `${article.title.zh}配图：${visual.alt.zh}`,
      en: `${article.title.en} visual: ${visual.alt.en}`,
    },
  };
}
