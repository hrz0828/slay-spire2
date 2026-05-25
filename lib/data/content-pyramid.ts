import type { Locale } from '@/lib/i18n';

export type ContentCategoryId =
  | 'guides'
  | 'characters'
  | 'cards'
  | 'relics'
  | 'builds'
  | 'bosses'
  | 'strategy'
  | 'tools'
  | 'resources'
  | 'news';

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

export type ContentCategory = {
  id: ContentCategoryId;
  href: string;
  title: LocalizedText;
  description: LocalizedText;
  sections: Array<{
    title: LocalizedText;
    items: LocalizedList;
  }>;
};

export type CoreArticle = {
  slug: string;
  category: ContentCategoryId;
  priority: number;
  title: LocalizedText;
  description: LocalizedText;
  keywords: LocalizedList;
  sections: Record<Locale, Array<{
    heading: string;
    body: string;
  }>>;
};

export const contentCategories: ContentCategory[] = [
  {
    id: 'guides',
    href: 'guides',
    title: { zh: '新手指南', en: 'Beginner Guides' },
    description: {
      zh: '从核心规则、地图路线到第一套通关卡组，帮助新玩家建立稳定的学习路径。',
      en: 'Learn core rules, map routing, and first-clear fundamentals through a stable beginner learning path.',
    },
    sections: [
      {
        title: { zh: '核心机制', en: 'Core Mechanics' },
        items: {
          zh: ['回合、能量与抽牌节奏', '攻击、防御与状态的基础取舍', '普通怪、精英与 Boss 的风险差异'],
          en: ['Turns, energy, and draw rhythm', 'Basic tradeoffs between attack, block, and statuses', 'Risk differences between hallway fights, elites, and bosses'],
        },
      },
      {
        title: { zh: '学习路径', en: 'Learning Path' },
        items: {
          zh: ['先学会稳定生存，再追求爆发伤害', '用复盘记录失误类型', '按前 10 小时目标逐步提高难度'],
          en: ['Learn to survive consistently before chasing burst damage', 'Use run reviews to identify mistake patterns', 'Increase difficulty by first-ten-hours milestones'],
        },
      },
    ],
  },
  {
    id: 'characters',
    href: 'characters',
    title: { zh: '职业/角色攻略', en: 'Characters & Classes' },
    description: {
      zh: '理解每个角色的资源系统、常见打法和上手难度，选择适合当前水平的职业。',
      en: 'Understand each class resource system, common plans, and difficulty so you can choose the right character.',
    },
    sections: [
      {
        title: { zh: '角色总览', en: 'Character Overview' },
        items: {
          zh: ['起始遗物与基础牌组差异', '角色专属机制与成长曲线', '新旧角色的上手顺序'],
          en: ['Starting relic and starter deck differences', 'Class mechanics and scaling curves', 'Learning order for returning and new characters'],
        },
      },
      {
        title: { zh: '职业选择', en: 'Class Decisions' },
        items: {
          zh: ['根据容错率选择入门职业', '根据路线奖励调整打法', '用失败类型判断是否换角色练习'],
          en: ['Pick beginner classes by forgiveness', 'Adjust plans around route rewards', 'Use failure patterns to decide when to practice another class'],
        },
      },
    ],
  },
  {
    id: 'cards',
    href: 'cards',
    title: { zh: '卡牌图鉴', en: 'Card Database' },
    description: {
      zh: '查询卡牌效果、稀有度与实际选牌思路，把单卡强度放回当前卡组环境判断。',
      en: 'Browse card effects, rarity, and pick logic while evaluating card power in the context of your deck.',
    },
    sections: [
      {
        title: { zh: '卡牌参考', en: 'Card Reference' },
        items: {
          zh: ['按角色与稀有度浏览卡牌', '理解费用、升级与关键词', '记录常见单卡用途'],
          en: ['Browse cards by class and rarity', 'Understand cost, upgrades, and keywords', 'Track common uses for individual cards'],
        },
      },
      {
        title: { zh: '卡牌评估', en: 'Card Evaluation' },
        items: {
          zh: ['根据当前卡组缺口选牌', '避免只按评级表拿牌', '判断跳牌是否比补强更好'],
          en: ['Pick cards by current deck gaps', 'Avoid drafting only from tier lists', 'Decide when skipping beats adding power'],
        },
      },
    ],
  },
  {
    id: 'relics',
    href: 'relics',
    title: { zh: '遗物数据库', en: 'Relic Database' },
    description: {
      zh: '了解遗物触发条件、收益类型和围绕遗物改变打法的时机。',
      en: 'Learn relic triggers, payoff types, and when a relic is strong enough to reshape your plan.',
    },
    sections: [
      {
        title: { zh: '遗物类型', en: 'Relic Types' },
        items: {
          zh: ['经济、战斗、Boss 与事件遗物', '即时收益与长期成长的区别', '限制型遗物的代价'],
          en: ['Economy, combat, boss, and event relics', 'Immediate value versus long-term scaling', 'The cost of restrictive relics'],
        },
      },
      {
        title: { zh: '遗物决策', en: 'Relic Decisions' },
        items: {
          zh: ['围绕关键遗物调整选牌', '用遗物补足防御或输出短板', 'Boss 遗物的收益与副作用权衡'],
          en: ['Draft around key relics', 'Use relics to cover block or damage gaps', 'Balance boss relic upside against downside'],
        },
      },
    ],
  },
  {
    id: 'builds',
    href: 'builds',
    title: { zh: '通关流派', en: 'Builds & Archetypes' },
    description: {
      zh: '以通关目标为中心梳理常见流派、成型条件和不同阶段的转型策略。',
      en: 'Explore archetypes, build requirements, and transition plans organized around winning runs.',
    },
    sections: [
      {
        title: { zh: '通关计划', en: 'Run Plans' },
        items: {
          zh: ['第一层先解决伤害压力', '第二层补足群体与防御能力', '第三层检查终局成长'],
          en: ['Solve damage pressure in Act 1', 'Add area damage and defense for Act 2', 'Check endgame scaling before Act 3 bosses'],
        },
      },
      {
        title: { zh: '机制流派', en: 'Mechanic Archetypes' },
        items: {
          zh: ['力量、毒、充能球与姿态爆发', '过牌与费用循环', '遗物驱动的临时转型'],
          en: ['Strength, poison, orbs, and stance burst', 'Draw and energy loops', 'Temporary pivots driven by relics'],
        },
      },
    ],
  },
  {
    id: 'bosses',
    href: 'bosses',
    title: { zh: 'Boss 与敌人机制', en: 'Bosses & Enemies' },
    description: {
      zh: '拆解敌人行动模式、关键回合和备战清单，减少被突然击杀的情况。',
      en: 'Break down enemy move patterns, key turns, and preparation checklists to avoid sudden run-ending losses.',
    },
    sections: [
      {
        title: { zh: '敌人类型', en: 'Enemy Types' },
        items: {
          zh: ['普通怪的资源消耗', '精英的门槛测试', 'Boss 的长期能力检查'],
          en: ['Resource pressure from hallway fights', 'Threshold tests from elites', 'Long-term capability checks from bosses'],
        },
      },
      {
        title: { zh: '克制思路', en: 'Counterplay' },
        items: {
          zh: ['提前准备爆发、防御或清场', '识别必须吃伤害的回合', '根据 Boss 调整升级和商店购买'],
          en: ['Prepare burst, block, or area damage early', 'Identify turns where taking damage is acceptable', 'Adjust upgrades and shop buys for the boss'],
        },
      },
    ],
  },
  {
    id: 'strategy',
    href: 'strategy',
    title: { zh: '进阶策略', en: 'Advanced Strategy' },
    description: {
      zh: '深入讲解牌组运转、资源管理和稳定通关所需的长期决策能力。',
      en: 'Study deck operation, resource management, and long-term decisions needed for consistent clears.',
    },
    sections: [
      {
        title: { zh: '局内管理', en: 'Run Management' },
        items: {
          zh: ['血量、金币与药水的转换', '营火升级和休息的边界', '路线风险与奖励期望'],
          en: ['Convert HP, gold, and potions into progress', 'Choose between upgrades and rests', 'Compare route risk against reward expectation'],
        },
      },
      {
        title: { zh: '卡组基础', en: 'Deck Fundamentals' },
        items: {
          zh: ['费用曲线与抽牌密度', '核心牌、过渡牌与污染牌', '输出、防御与成长的平衡'],
          en: ['Cost curve and draw density', 'Core cards, bridge cards, and deck clutter', 'Balance damage, block, and scaling'],
        },
      },
    ],
  },
  {
    id: 'tools',
    href: 'tools',
    title: { zh: '工具与计算器', en: 'Tools & Calculators' },
    description: {
      zh: '提供卡牌、遗物和构筑相关的实用工具，帮助玩家更快完成局内判断。',
      en: 'Use practical tools for cards, relics, and builds to make faster in-run decisions.',
    },
    sections: [
      {
        title: { zh: '实用工具', en: 'Practical Tools' },
        items: {
          zh: ['卡牌筛选与对比', '遗物检索与分类', '构筑路线速查'],
          en: ['Card filtering and comparison', 'Relic search and categorization', 'Build route quick references'],
        },
      },
      {
        title: { zh: '决策辅助', en: 'Decision Support' },
        items: {
          zh: ['用工具发现当前短板', '快速确认关键词和升级效果', '复盘失败局的关键节点'],
          en: ['Use tools to spot deck weaknesses', 'Confirm keywords and upgrade effects quickly', 'Review key points from failed runs'],
        },
      },
    ],
  },
  {
    id: 'resources',
    href: 'resources',
    title: { zh: '资源中心', en: 'Resources' },
    description: {
      zh: '集中整理术语、学习清单、索引页和站内导航，降低查找成本。',
      en: 'Find glossaries, learning checklists, index pages, and site navigation resources in one place.',
    },
    sections: [
      {
        title: { zh: '站点资源', en: 'Site Resources' },
        items: {
          zh: ['术语表与机制解释', '新手学习清单', '按主题整理的文章索引'],
          en: ['Glossaries and mechanic explanations', 'Beginner learning checklists', 'Topic-based article indexes'],
        },
      },
      {
        title: { zh: '查阅方式', en: 'How to Use' },
        items: {
          zh: ['先查概念，再看对应攻略', '用资源页串联卡牌和遗物页面', '把复盘问题转化成下一篇阅读目标'],
          en: ['Look up concepts before reading deep guides', 'Connect resources to card and relic pages', 'Turn run-review questions into the next reading goal'],
        },
      },
    ],
  },
  {
    id: 'news',
    href: 'news',
    title: { zh: '新闻与版本更新', en: 'News & Updates' },
    description: {
      zh: '跟踪版本改动、平衡调整和站点内容更新，帮助玩家理解环境变化。',
      en: 'Track patches, balance changes, and site content updates so players understand how the meta shifts.',
    },
    sections: [
      {
        title: { zh: '版本追踪', en: 'Update Tracking' },
        items: {
          zh: ['重要补丁与平衡改动', '新增内容与机制变化', '影响选牌和路线的更新'],
          en: ['Important patches and balance changes', 'New content and mechanic updates', 'Changes that affect drafting and routing'],
        },
      },
      {
        title: { zh: '内容更新', en: 'Content Updates' },
        items: {
          zh: ['攻略修订记录', '数据库资料补全', '新玩家常见问题补充'],
          en: ['Guide revision notes', 'Database data additions', 'New answers to common beginner questions'],
        },
      },
    ],
  },
];

type ArticleBlueprint = {
  slug: string;
  category: ContentCategoryId;
  priority: number;
  title: LocalizedText;
};

const articleBlueprints: ArticleBlueprint[] = [
  { slug: 'beginner-guide-first-clear', category: 'guides', priority: 1, title: { zh: '《杀戮尖塔 2》新手入门完全指南：从第一局到首次通关', en: 'Slay the Spire 2 Beginner Guide: From Your First Run to First Clear' } },
  { slug: 'sts2-vs-sts1-differences', category: 'guides', priority: 2, title: { zh: '《杀戮尖塔 2》和《杀戮尖塔 1》有什么不同？核心机制变化解析', en: 'Slay the Spire 2 vs Slay the Spire 1: Key Gameplay Differences Explained' } },
  { slug: 'beginner-mistakes', category: 'guides', priority: 3, title: { zh: '新手最容易犯的 15 个错误：为什么你的卡组总是成型失败', en: '15 Beginner Mistakes in Slay the Spire 2 and How to Avoid Them' } },
  { slug: 'winning-deckbuilding-basics', category: 'guides', priority: 4, title: { zh: '如何构筑一套能通关的卡组：删牌、拿牌、跳牌的核心逻辑', en: 'How to Build a Winning Deck: Pick, Skip, and Remove Cards Correctly' } },
  { slug: 'map-pathing-guide', category: 'guides', priority: 5, title: { zh: '地图路线怎么选？普通怪、精英、商店、问号房的取舍', en: 'How to Choose Your Map Path: Fights, Elites, Shops, and Events' } },
  { slug: 'combat-decision-making', category: 'guides', priority: 6, title: { zh: '战斗中如何做决策：什么时候进攻，什么时候防御', en: 'Combat Decision-Making Guide: When to Attack and When to Defend' } },
  { slug: 'energy-draw-cost-curve', category: 'strategy', priority: 7, title: { zh: '能量、抽牌、费用曲线：理解卡组运转的底层逻辑', en: 'Energy, Card Draw, and Cost Curve: How Decks Actually Work' } },
  { slug: 'card-synergy-basics', category: 'cards', priority: 8, title: { zh: '为什么“拿强卡”不等于“好卡组”：卡牌协同入门', en: 'Why Strong Cards Do Not Always Make a Strong Deck: Synergy Basics' } },
  { slug: 'first-ten-hours-roadmap', category: 'guides', priority: 9, title: { zh: '新手通关推荐路线：最稳的前 10 小时学习顺序', en: 'Best Beginner Progression Path: What to Learn in Your First 10 Hours' } },
  { slug: 'glossary-core-mechanics', category: 'resources', priority: 10, title: { zh: '《杀戮尖塔 2》术语表：力量、敏捷、易伤、虚弱等机制解释', en: 'Slay the Spire 2 Glossary: Strength, Dexterity, Vulnerable, Weak, and More' } },
  { slug: 'ironclad-beginner-guide', category: 'characters', priority: 11, title: { zh: '铁甲战士新手攻略：力量、防御与血量资源怎么平衡', en: 'Ironclad Beginner Guide: Balancing Strength, Block, and HP' } },
  { slug: 'silent-beginner-guide', category: 'characters', priority: 12, title: { zh: '静默猎手新手攻略：毒、刀、过牌与防御节奏', en: 'Silent Beginner Guide: Poison, Shivs, Draw, and Defensive Tempo' } },
  { slug: 'defect-beginner-guide', category: 'characters', priority: 13, title: { zh: '故障机器人新手攻略：充能球、集中、循环与爆发', en: 'Defect Beginner Guide: Orbs, Focus, Cycling, and Burst Damage' } },
  { slug: 'watcher-beginner-guide', category: 'characters', priority: 14, title: { zh: '观者新手攻略：姿态切换、爆发回合与风险控制', en: 'Watcher Beginner Guide: Stance Switching, Burst Turns, and Risk Control' } },
  { slug: 'new-characters-guide', category: 'characters', priority: 15, title: { zh: '新角色入门攻略：如何快速理解《杀戮尖塔 2》的新增职业', en: 'New Character Beginner Guide: How to Learn Slay the Spire 2’s New Classes' } },
  { slug: 'character-tier-difficulty', category: 'characters', priority: 16, title: { zh: '全角色强度与上手难度排行：新手应该先玩谁？', en: 'Character Tier List and Difficulty Ranking: Who Should Beginners Play First?' } },
  { slug: 'best-beginner-cards', category: 'cards', priority: 17, title: { zh: '新手最值得优先拿的卡牌：按角色拆解核心卡', en: 'Best Cards for Beginners: Key Picks for Every Character' } },
  { slug: 'evaluate-cards-by-deck', category: 'cards', priority: 18, title: { zh: '卡牌评级不是答案：如何根据当前卡组判断一张卡值不值得拿', en: 'How to Evaluate Cards Based on Your Current Deck, Not Just Tier Lists' } },
  { slug: 'essential-cards-to-understand', category: 'cards', priority: 19, title: { zh: '必须理解的 20 张核心卡牌：从单卡强度到卡组定位', en: '20 Essential Cards to Understand: From Raw Power to Deck Identity' } },
  { slug: 'cards-beginners-misuse', category: 'cards', priority: 20, title: { zh: '新手最容易误用的卡牌：看起来很强但可能拖垮卡组', en: 'Cards Beginners Misuse: Powerful-Looking Picks That Can Weaken Your Deck' } },
  { slug: 'relic-picking-guide', category: 'relics', priority: 21, title: { zh: '遗物选择指南：什么遗物值得围绕它改变打法？', en: 'Relic Picking Guide: Which Relics Are Worth Building Around?' } },
  { slug: 'best-beginner-relics', category: 'relics', priority: 22, title: { zh: '新手最强遗物推荐：稳定通关推荐排行', en: 'Best Relics for Beginners: Stability-Focused Ranking for First Clears' } },
  { slug: 'choose-boss-relics', category: 'relics', priority: 23, title: { zh: 'Boss 遗物怎么选？能量、限制与卡组需求的权衡', en: 'How to Choose Boss Relics: Energy, Downsides, and Deck Needs' } },
  { slug: 'relic-card-synergy', category: 'relics', priority: 24, title: { zh: '遗物与卡牌协同入门：如何把小优势滚成胜势', en: 'Relic and Card Synergy Guide: Turning Small Advantages into Winning Runs' } },
  { slug: 'act-1-boss-guide', category: 'bosses', priority: 25, title: { zh: '第一层 Boss 完整攻略：行动模式、克制思路与备战清单', en: 'Act 1 Boss Guide: Move Patterns, Counterplay, and Preparation Checklist' } },
  { slug: 'act-2-boss-guide', category: 'bosses', priority: 26, title: { zh: '第二层 Boss 完整攻略：为什么很多卡组会在这里崩盘', en: 'Act 2 Boss Guide: Why Many Decks Fall Apart Here' } },
  { slug: 'act-3-boss-guide', category: 'bosses', priority: 27, title: { zh: '第三层 Boss 完整攻略：终局卡组需要具备什么能力', en: 'Act 3 Boss Guide: What Your Endgame Deck Must Be Able to Do' } },
  { slug: 'elite-enemy-guide', category: 'bosses', priority: 28, title: { zh: '精英敌人攻略：什么时候该贪精英，什么时候必须避开', en: 'Elite Enemy Guide: When to Fight Elites and When to Avoid Them' } },
  { slug: 'best-beginner-builds', category: 'builds', priority: 29, title: { zh: '最稳新手流派推荐：低操作、高容错的通关思路', en: 'Best Beginner Builds: Safe, Forgiving Archetypes for First Clears' } },
  { slug: 'before-high-ascension-strategies', category: 'strategy', priority: 30, title: { zh: '高进阶前应该掌握的 10 个策略：从能通关到稳定通关', en: '10 Strategies to Learn Before High Ascension: From Clearing to Winning Consistently' } },
];

const categoryKeywordMap: Record<ContentCategoryId, LocalizedList> = {
  guides: {
    zh: ['杀戮尖塔2新手攻略', '首次通关', '路线选择', '卡组构筑'],
    en: ['Slay the Spire 2 beginner guide', 'first clear', 'map pathing', 'deckbuilding'],
  },
  characters: {
    zh: ['角色攻略', '职业选择', '上手难度', '核心机制'],
    en: ['character guide', 'class choice', 'difficulty ranking', 'core mechanics'],
  },
  cards: {
    zh: ['卡牌图鉴', '选牌策略', '卡牌协同', '卡牌评级'],
    en: ['card database', 'drafting strategy', 'card synergy', 'card tier list'],
  },
  relics: {
    zh: ['遗物数据库', '遗物选择', 'Boss遗物', '遗物协同'],
    en: ['relic database', 'relic picks', 'boss relics', 'relic synergy'],
  },
  builds: {
    zh: ['通关流派', '新手流派', '卡组原型', '稳定通关'],
    en: ['best builds', 'beginner builds', 'deck archetypes', 'consistent clears'],
  },
  bosses: {
    zh: ['Boss攻略', '敌人机制', '精英敌人', '备战清单'],
    en: ['boss guide', 'enemy mechanics', 'elite enemies', 'preparation checklist'],
  },
  strategy: {
    zh: ['进阶策略', '费用曲线', '资源管理', '稳定通关'],
    en: ['advanced strategy', 'cost curve', 'resource management', 'consistent wins'],
  },
  tools: {
    zh: ['工具', '计算器', '卡牌筛选', '遗物检索'],
    en: ['tools', 'calculators', 'card filters', 'relic search'],
  },
  resources: {
    zh: ['术语表', '机制解释', '学习资源', '资料中心'],
    en: ['glossary', 'mechanic explanations', 'learning resources', 'resource hub'],
  },
  news: {
    zh: ['版本更新', '补丁说明', '平衡调整', '新闻'],
    en: ['updates', 'patch notes', 'balance changes', 'news'],
  },
};

type ArticleSectionSeed = {
  zh: {
    intent: string;
    decisions: string[];
    practice: string[];
    review: string[];
  };
  en: {
    intent: string;
    decisions: string[];
    practice: string[];
    review: string[];
  };
};

type DetailedArticleContent = {
  description: LocalizedText;
  keywords?: LocalizedList;
  sections: CoreArticle['sections'];
};

const articleSectionSeeds: Record<string, ArticleSectionSeed> = {
  'beginner-guide-first-clear': {
    zh: {
      intent: '这篇文章面向第一次接触爬塔卡牌的新玩家，目标是把“活到下一层”拆成能执行的顺序：先解决第一层伤害，再补防御，最后补成长。',
      decisions: ['前 3 场普通战优先拿能立即造成伤害的牌', '营火优先升级能改变关键回合的核心牌', '血量低于安全线时少走问号和精英'],
      practice: ['每层开始前写下当前最怕的敌人类型', '只保留一到两个主要输出计划', '商店先看删牌和药水，再看昂贵稀有牌'],
      review: ['死亡前两层是否缺伤害', '是否因为贪路线导致没有营火修正', '是否拿了太多暂时打不出的牌'],
    },
    en: {
      intent: 'This article is for players starting their first roguelike deckbuilding runs. It turns “survive to the next act” into a sequence: solve Act 1 damage, add defense, then add scaling.',
      decisions: ['Prioritize immediate damage in the first three hallway fights', 'Upgrade cards that change key turns rather than cards that only look efficient', 'Avoid greedy question marks and elites when HP is already below a safe route line'],
      practice: ['Name the enemy type your deck fears at the start of each act', 'Keep one or two main damage plans instead of drafting every payoff', 'Check removals and potions in shops before buying expensive rares'],
      review: ['Did the run die because Act 1 damage was too low?', 'Did route greed remove the chance to fix the deck at a campfire?', 'Did too many cards sit in hand without being playable?'],
    },
  },
  'sts2-vs-sts1-differences': {
    zh: {
      intent: '这篇文章帮助老玩家从一代经验切换到二代判断，重点不是列改动，而是说明哪些旧习惯需要重新验证。',
      decisions: ['先确认能量、抽牌和敌人节奏是否沿用旧预期', '不要把一代强势卡组模板直接套到新卡池', '遇到新增机制时先测试触发频率再决定围绕构筑'],
      practice: ['用前几局记录新敌人的关键回合', '把熟悉的删牌、升级、药水优先级重新排序', '比较同类卡在新环境中的实际战斗表现'],
      review: ['失败是否来自沿用旧 Boss 备战方式', '是否高估了旧协同在新卡池里的稳定性', '是否忽略了新增资源或限制条件'],
    },
    en: {
      intent: 'This article helps returning players translate Slay the Spire 1 habits into Slay the Spire 2 decisions. The focus is not just what changed, but which old instincts need retesting.',
      decisions: ['Confirm whether energy, draw, and enemy tempo still match old expectations', 'Do not force old archetype templates onto a changed card pool', 'Test trigger frequency before building around a new mechanic'],
      practice: ['Use early runs to record new enemy key turns', 'Re-rank familiar removal, upgrade, and potion priorities', 'Compare similar cards by actual fight performance in the new environment'],
      review: ['Did the loss come from old boss preparation assumptions?', 'Did you overrate a familiar synergy in the new pool?', 'Did you ignore a new resource or restriction?'],
    },
  },
  'beginner-mistakes': {
    zh: {
      intent: '这篇文章聚焦新手卡组成型失败的常见原因：不是运气差，而是每次奖励都在加入互相冲突的小决定。',
      decisions: ['拿牌前先问它解决下一场战斗还是只提供想象空间', '不要同时追三种成长路线', '跳牌是保持核心循环密度的正常选择'],
      practice: ['每次奖励只标记一个当前最缺能力', '看到稀有牌时先算能否稳定打出', '路线选择以当前血量和药水为边界'],
      review: ['卡组是否超过能力需要的厚度', '关键牌是否被过多低影响牌稀释', '是否在缺防御时继续拿慢速输出'],
    },
    en: {
      intent: 'This article targets why beginner decks fail to come together. The issue is usually not luck; it is a series of small rewards that pull the deck in conflicting directions.',
      decisions: ['Ask whether a pick solves the next fight or only creates imagined upside', 'Avoid chasing three scaling plans at once', 'Treat skipping as a normal way to protect deck density'],
      practice: ['Label the single capability your deck lacks before each reward', 'When offered a rare, check whether you can reliably play it', 'Let HP and potions define route greed'],
      review: ['Did the deck become thicker than its engine could support?', 'Were key cards diluted by low-impact additions?', 'Did you keep drafting slow damage while block was missing?'],
    },
  },
  'winning-deckbuilding-basics': {
    zh: {
      intent: '这篇文章讲清删牌、拿牌、跳牌的基础逻辑：通关卡组通常不是牌越多越强，而是每张牌都有明确工作。',
      decisions: ['删掉低效率基础牌来提高关键牌出现率', '前期拿过渡伤害，后期减少无关补牌', '当奖励不能提高当前胜率时果断跳过'],
      practice: ['把卡组分成输出、防御、过牌、成长四类检查缺口', '升级前判断该牌是否经常在关键回合出现', '新增高费牌时同步检查能量来源'],
      review: ['是否因为不舍得跳牌导致抽不到核心牌', '是否过早删除防御或攻击造成短板', '是否拿了需要未来配合但从未补齐的牌'],
    },
    en: {
      intent: 'This article explains the pick, skip, and remove logic behind winning decks. A clear deck is not the largest deck; it is a deck where every card has a job.',
      decisions: ['Remove inefficient starter cards to increase access to key cards', 'Draft bridge damage early and reduce unrelated additions later', 'Skip rewards that do not improve current win probability'],
      practice: ['Classify the deck into damage, block, draw, and scaling before drafting', 'Upgrade cards that appear on important turns often', 'Check energy sources whenever adding expensive cards'],
      review: ['Did refusing to skip make core cards harder to find?', 'Did early removals create a damage or block hole?', 'Did you draft cards that needed support the run never found?'],
    },
  },
  'map-pathing-guide': {
    zh: {
      intent: '这篇文章把地图路线当作风险管理问题：普通怪给选牌，精英给上限，商店和营火给修正机会。',
      decisions: ['第一层有足够伤害和药水时再考虑多精英路线', '商店价值取决于金币和是否急需删牌或药水', '问号房适合血量紧张或卡组已能打怪时使用'],
      practice: ['进入一层先比较两条可回退路线', '把营火位置当作升级和休息保险', 'Boss 信息出现后调整后半层路线'],
      review: ['是否在没有药水时强行打精英', '是否为了问号错过必要普通战奖励', '是否没有预留商店金币解决短板'],
    },
    en: {
      intent: 'This article treats map pathing as risk management. Hallway fights give card rewards, elites raise ceiling, and shops or campfires create correction points.',
      decisions: ['Take multiple elites in Act 1 only when damage and potions support it', 'Shop value depends on gold plus urgent needs for removals or potions', 'Question marks are better when HP is tight or the deck already handles fights'],
      practice: ['Compare two routes with fallback options at the start of an act', 'Use campfire positions as upgrade and rest insurance', 'Adjust the second half of the act after boss information is known'],
      review: ['Did you force an elite without potion support?', 'Did question marks replace needed card rewards?', 'Did you reach a shop without enough gold to fix a weakness?'],
    },
  },
  'combat-decision-making': {
    zh: {
      intent: '这篇文章关注回合内取舍：胜利不是每回合都完美防御，而是在可承受伤害内更快结束危险战斗。',
      decisions: ['敌人下回合更危险时，本回合可以优先进攻', '面对多段攻击时优先计算防御效率', '药水应在能避免大量损血或缩短战斗时使用'],
      practice: ['行动前先估算击杀回合数', '把手牌按必打、可选、浪费能量三类排序', '保留足够输出处理召唤物或转阶段'],
      review: ['是否为了满防多拖了一回合导致总损血更高', '是否忘记计算易伤和虚弱影响', '是否把药水留到已经无法挽回时才用'],
    },
    en: {
      intent: 'This article focuses on turn-level tradeoffs. Winning does not mean full blocking every turn; it means ending dangerous fights faster while taking acceptable damage.',
      decisions: ['Attack now if the enemy next turn is more dangerous', 'Against multi-hit turns, calculate block efficiency first', 'Use potions when they prevent major HP loss or shorten the fight'],
      practice: ['Estimate how many turns remain before playing cards', 'Sort the hand into must-play, optional, and wasted-energy cards', 'Keep enough damage for summons or phase changes'],
      review: ['Did full blocking extend the fight and cause more total damage?', 'Did you forget Vulnerable or Weak math?', 'Did you save a potion until it could no longer change the outcome?'],
    },
  },
  'energy-draw-cost-curve': {
    zh: {
      intent: '这篇文章解释卡组运转的底层：能量决定一回合能打多少牌，抽牌决定能否看到关键牌，费用曲线决定两者是否匹配。',
      decisions: ['高费牌增加上限前先检查能量来源', '过牌只有在能继续打出抽到的牌时才稳定', '低费牌过多也会造成手牌质量下降'],
      practice: ['统计一手牌平均需要多少能量', '把抽牌牌和能量牌放在同一轮循环里评估', '升级优先考虑降费、加抽或关键数值断点'],
      review: ['是否经常满手牌但能量不够', '是否能量充足却抽不到核心牌', '是否费用曲线让关键回合只能打半套计划'],
    },
    en: {
      intent: 'This article explains how decks actually operate: energy limits cards played, draw controls access to key cards, and the cost curve decides whether both systems match.',
      decisions: ['Check energy sources before adding expensive ceiling cards', 'Draw is stable only when the deck can play what it draws', 'Too many cheap cards can still lower hand quality'],
      practice: ['Estimate the average energy demand of a hand', 'Evaluate draw cards and energy cards within the same cycle', 'Prioritize upgrades that reduce cost, add draw, or hit key breakpoints'],
      review: ['Were hands full but energy-starved?', 'Was energy available while core cards stayed buried?', 'Did the curve prevent key turns from playing a complete plan?'],
    },
  },
  'card-synergy-basics': {
    zh: {
      intent: '这篇文章说明强卡和好卡组的区别：单卡强度提供基础，协同决定这些牌能否在同一回合互相放大。',
      decisions: ['先确认强卡需要的费用、抽牌或状态支持', '不要为了遥远组合牺牲眼前战斗能力', '协同牌至少要有独立可用的下限'],
      practice: ['把每张新牌写成“它配合谁、解决什么”', '优先选择能连接已有核心的中间件', '当组合件不足时保留通用输出和防御'],
      review: ['是否拿了多个互相不服务的强牌', '是否组合成型前已经被普通战消耗过多', '是否缺少让协同循环起来的抽牌或能量'],
    },
    en: {
      intent: 'This article separates strong cards from strong decks. Raw card power creates a baseline, while synergy decides whether those cards amplify each other on real turns.',
      decisions: ['Confirm the energy, draw, or status support a strong card needs', 'Do not sacrifice immediate fight strength for a distant combo', 'Synergy cards should still have a usable floor on their own'],
      practice: ['Describe each pick as “what it works with and what it solves”', 'Prefer connector cards that link existing cores', 'Keep generic damage and block when combo pieces are incomplete'],
      review: ['Did you draft several strong cards that did not serve each other?', 'Did hallway fights punish the deck before the combo existed?', 'Was draw or energy missing from the synergy loop?'],
    },
  },
  'first-ten-hours-roadmap': {
    zh: {
      intent: '这篇文章把前 10 小时拆成学习路线，避免新手同时研究角色、卡牌、遗物和高阶技巧而失去重点。',
      decisions: ['前几局只练路线和基础战斗，不急着追稀有流派', '稳定到第二层后再系统学习删牌和跳牌', '首次通关前优先使用容错高的角色和构筑'],
      practice: ['每两小时设一个学习主题', '失败后只记录一个最重要失误', '重复练同一角色直到能解释失败原因'],
      review: ['是否频繁换角色导致无法积累判断', '是否过早学习高进阶技巧忽略基础', '是否没有把失败转化成下一局目标'],
    },
    en: {
      intent: 'This article breaks the first ten hours into a learning roadmap so beginners do not study characters, cards, relics, and advanced tricks all at once.',
      decisions: ['Use early runs to practice routing and basic combat before chasing rare archetypes', 'Study removals and skips after you can reach Act 2 consistently', 'Before the first clear, prefer forgiving characters and plans'],
      practice: ['Set one learning theme for every two-hour block', 'Record only the most important mistake after each loss', 'Repeat one character until you can explain why runs fail'],
      review: ['Did constant character switching prevent pattern learning?', 'Did advanced advice distract from fundamentals?', 'Did losses fail to create a clear next-run goal?'],
    },
  },
  'glossary-core-mechanics': {
    zh: {
      intent: '这篇术语表用于快速补齐规则理解，帮助玩家把力量、敏捷、易伤、虚弱等关键词转化成战斗计算。',
      decisions: ['先区分永久成长、临时状态和回合内修正', '遇到负面状态时判断影响攻击还是防御', '读卡牌描述时确认触发时点和持续时间'],
      practice: ['把常见关键词和一张代表卡绑定记忆', '战斗中先算状态修正后的真实伤害', '复盘时记录最常误判的机制'],
      review: ['是否因为误解易伤导致错误防御', '是否把临时力量当成永久成长', '是否忽略了状态在回合结束时清除'],
    },
    en: {
      intent: 'This glossary fills rule gaps quickly, turning terms like Strength, Dexterity, Vulnerable, and Weak into usable combat math.',
      decisions: ['Separate permanent scaling, temporary statuses, and turn-only modifiers', 'When a debuff appears, identify whether it changes attacks or defense', 'Read card text for trigger timing and duration'],
      practice: ['Pair common keywords with one representative card', 'Calculate real damage after status modifiers during combat', 'Record the mechanics you misread most often in reviews'],
      review: ['Did Vulnerable math cause a wrong block decision?', 'Did you treat temporary Strength as permanent scaling?', 'Did you miss a status clearing at end of turn?'],
    },
  },
  'ironclad-beginner-guide': {
    zh: {
      intent: '这篇铁甲攻略聚焦血量资源、力量成长和防御厚度的平衡，让新手知道什么时候可以用生命换节奏。',
      decisions: ['燃烧之血让小额损血可接受，但不能替代防御体系', '力量牌需要足够攻击次数兑现收益', '高费攻击要配合能量或删牌保持流畅'],
      practice: ['第一层优先补高质量攻击', '中期加入可重复防御或回复来源', '用血量优势换精英前确认药水和营火'],
      review: ['是否把回血当成无限容错', '是否只有力量没有攻击密度', '是否防御成长不足导致后期被多段攻击击穿'],
    },
    en: {
      intent: 'This Ironclad guide focuses on balancing HP as a resource, Strength scaling, and block density so beginners know when life can buy tempo.',
      decisions: ['Burning Blood makes small damage acceptable, not a replacement for defense', 'Strength cards need enough attack hits to convert value', 'Expensive attacks require energy or removals to stay smooth'],
      practice: ['Prioritize quality attacks in Act 1', 'Add repeatable block or sustain by midgame', 'Check potions and campfires before spending HP on elites'],
      review: ['Did healing get treated as infinite forgiveness?', 'Was Strength present without enough attack density?', 'Did weak defensive scaling collapse against multi-hit turns?'],
    },
  },
  'silent-beginner-guide': {
    zh: {
      intent: '这篇静默猎手攻略解释毒、刀、过牌和防御节奏，重点是避免只堆输出而没有活到结算回合。',
      decisions: ['毒适合长战但需要前期防御支撑', '刀牌需要攻击触发或力量类收益才更稳定', '过牌增加选择，但也会放大能量短缺'],
      practice: ['第一层补即时伤害避免启动太慢', '中期围绕毒或刀确定主线', '保留弱化、格挡和药水处理爆发回合'],
      review: ['是否毒还没叠起来就失去太多血', '是否刀牌缺少增伤只是在低效出牌', '是否抽很多牌却没有能量完成防御'],
    },
    en: {
      intent: 'This Silent guide explains poison, shivs, draw, and defensive tempo, with emphasis on surviving long enough for the chosen payoff to matter.',
      decisions: ['Poison fits long fights but needs early block support', 'Shivs become steadier with attack triggers or Strength-like payoffs', 'Draw creates options but can expose energy shortages'],
      practice: ['Add immediate damage in Act 1 so setup is not too slow', 'Choose a poison or shiv main line by midgame', 'Keep Weak, block, and potions for burst turns'],
      review: ['Did poison take too long while HP disappeared?', 'Were shivs low-impact because no payoff existed?', 'Did extra draw fail because energy could not cover defense?'],
    },
  },
  'defect-beginner-guide': {
    zh: {
      intent: '这篇故障机器人攻略帮助新手理解充能球、集中和循环，避免把每种球都拿一点却没有稳定输出或防御。',
      decisions: ['冰球提供稳定防御，电球提供前期自动输出', '集中是球体系的核心成长但需要足够球位或生成', '黑暗球和爆发牌要围绕释放时机规划'],
      practice: ['先确定电球快攻还是冰球防守主线', '补抽牌和能量让关键能力反复出现', '升级能提高集中、球位或生成效率的牌'],
      review: ['是否球类型太杂导致回合目标混乱', '是否有集中但缺少生成频率', '是否等待黑暗球时没有足够防御'],
    },
    en: {
      intent: 'This Defect guide helps beginners understand orbs, Focus, cycling, and burst so the deck does not collect every orb type without stable damage or block.',
      decisions: ['Frost gives stable defense while Lightning gives early automatic damage', 'Focus is core scaling but needs enough orb slots or generation', 'Dark orbs and burst cards require a planned evoke timing'],
      practice: ['Choose a Lightning tempo or Frost defense line first', 'Add draw and energy so key powers recur', 'Upgrade cards that improve Focus, slots, or orb generation'],
      review: ['Did too many orb types blur the turn plan?', 'Was Focus present without generation frequency?', 'Did waiting for Dark orb payoff leave defense exposed?'],
    },
  },
  'watcher-beginner-guide': {
    zh: {
      intent: '这篇观者攻略强调姿态切换的收益和风险：爆发回合很强，但留在错误姿态会让一局突然结束。',
      decisions: ['进入愤怒前先确认退出方式或击杀线', '平静提供能量回合，应和抽牌及高费牌配合', '防御不足时不要只依赖爆发解决所有战斗'],
      practice: ['每回合先算愤怒后的击杀可能', '保留一张稳定退出姿态的手段', '升级能稳定切换或提供抽牌的关键牌'],
      review: ['是否因为贪双倍伤害留在愤怒', '是否平静能量没有转化成有效回合', '是否缺少普通状态下的防御方案'],
    },
    en: {
      intent: 'This Watcher guide emphasizes the reward and risk of stance switching. Burst turns are powerful, but ending in the wrong stance can end a run immediately.',
      decisions: ['Enter Wrath only with an exit or a lethal line in mind', 'Calm creates energy turns and should pair with draw or expensive cards', 'Do not rely on burst alone when the deck lacks defense'],
      practice: ['Calculate lethal potential after Wrath before playing cards', 'Keep one reliable stance-exit option available', 'Upgrade cards that stabilize switching or draw'],
      review: ['Did greed for double damage leave you in Wrath?', 'Did Calm energy fail to become an effective turn?', 'Was there no defensive plan outside stance burst?'],
    },
  },
  'new-characters-guide': {
    zh: {
      intent: '这篇新角色攻略提供学习新增职业的方法，不假设玩家已理解专属资源，而是先建立观察和验证流程。',
      decisions: ['前几局先测试起始牌组的伤害和防御节奏', '新机制先看触发条件、收益延迟和失败代价', '不要用旧角色的选牌优先级覆盖新职业需求'],
      practice: ['每局只围绕一个新关键词做实验', '记录哪些奖励能立刻改善第一层', '把新角色的防御来源和成长来源分开整理'],
      review: ['是否还在用旧职业思路评价新牌', '是否忽略了新机制的启动成本', '是否没有找到角色最稳定的过渡牌'],
    },
    en: {
      intent: 'This new-character guide gives a learning process for added classes. It does not assume the class resource is understood; it starts with observation and validation.',
      decisions: ['Use early runs to test starter-deck damage and block tempo', 'For new mechanics, check trigger conditions, payoff delay, and failure cost', 'Do not overwrite new class needs with old character pick orders'],
      practice: ['Experiment with one new keyword per run', 'Record which rewards immediately improve Act 1', 'Separate the class defensive sources from its scaling sources'],
      review: ['Were new cards judged by old class habits?', 'Was the startup cost of a new mechanic ignored?', 'Did the run fail to identify stable bridge cards?'],
    },
  },
  'character-tier-difficulty': {
    zh: {
      intent: '这篇排行关注新手该先玩谁，而不是争论绝对强度；上手难度来自容错率、计算量和失败惩罚。',
      decisions: ['优先选择失败后容易看懂原因的角色', '高上限但低容错角色适合熟悉基础后练习', '角色强度要和当前版本、卡池和个人习惯一起判断'],
      practice: ['用同一角色连续练到能稳定进第二层', '比较每个角色最常见的死亡原因', '按学习目标选择角色而非只看排名'],
      review: ['是否因为强度榜频繁换职业', '是否选择了计算负担过高的角色', '是否把个人不熟练误判成角色弱'],
    },
    en: {
      intent: 'This ranking focuses on who beginners should play first, not absolute power. Difficulty comes from forgiveness, calculation load, and how harsh mistakes are.',
      decisions: ['Start with characters whose losses are easy to diagnose', 'Practice high-ceiling low-forgiveness classes after fundamentals are stable', 'Judge character strength alongside patch state, card pool, and personal habits'],
      practice: ['Repeat one character until Act 2 is consistent', 'Compare the common death pattern for each class', 'Pick characters by learning goal rather than ranking alone'],
      review: ['Did tier lists cause constant class switching?', 'Was the chosen class too calculation-heavy for the current skill level?', 'Was unfamiliarity mistaken for weakness?'],
    },
  },
  'best-beginner-cards': {
    zh: {
      intent: '这篇文章按角色拆解新手优先卡，重点是稳定解决常见短板，而不是追求理论最高上限。',
      decisions: ['第一层优先能立即提高伤害或防御的牌', '角色核心卡要看是否容易被当前卡组支持', '新手牌优先选择低条件、低惩罚、好升级的选项'],
      practice: ['按角色列出三类安全补强牌', '遇到强牌时检查费用和触发条件', '把药水和遗物纳入选牌判断'],
      review: ['是否拿了高上限但启动过慢的牌', '是否忽略当前 Boss 的具体需求', '是否因为评级高而重复补同一能力'],
    },
    en: {
      intent: 'This article breaks down beginner-friendly card picks by character. The emphasis is stable coverage of common weaknesses rather than theoretical ceiling.',
      decisions: ['In Act 1, prioritize cards that immediately improve damage or block', 'Evaluate core class cards by how easily the current deck supports them', 'Beginner picks should have low conditions, low punishment, and good upgrades'],
      practice: ['List three safe upgrade categories for each character', 'Check cost and trigger requirements before taking a powerful card', 'Include potions and relics in drafting decisions'],
      review: ['Did you take high-ceiling cards that started too slowly?', 'Did you ignore the current boss requirement?', 'Did tier ratings make you overfill one capability?'],
    },
  },
  'evaluate-cards-by-deck': {
    zh: {
      intent: '这篇文章反对脱离环境看评级，教玩家用当前卡组、路线和下一场关键战斗判断一张牌。',
      decisions: ['先看这张牌是否补足当前最短板', '再看它会不会稀释已有核心循环', '最后判断升级、遗物和药水能否提高它的价值'],
      practice: ['选牌前写下卡组现在最缺的一个能力', '对每张候选牌给出拿和不拿的理由', 'Boss 前优先考虑即将面对的能力检查'],
      review: ['是否因为单卡评分忽略了费用曲线', '是否拿了不能服务当前路线的未来牌', '是否跳过了看似普通但正好补短板的牌'],
    },
    en: {
      intent: 'This article pushes card evaluation away from isolated tier lists and toward the current deck, route, and next key fight.',
      decisions: ['First ask whether the card covers the deck’s biggest current gap', 'Then check whether it dilutes an existing core loop', 'Finally judge whether upgrades, relics, or potions raise its value'],
      practice: ['Name the deck’s single missing capability before rewards', 'Give both a pick reason and a skip reason for each candidate', 'Before bosses, prioritize the specific capability test coming next'],
      review: ['Did card rating hide cost-curve problems?', 'Did you draft future cards that did not serve the current route?', 'Did you skip a plain card that perfectly covered a weakness?'],
    },
  },
  'essential-cards-to-understand': {
    zh: {
      intent: '这篇文章用核心卡理解卡组定位：某些牌的价值不只在数值，而在它们定义输出、防御或循环方式。',
      decisions: ['把核心卡分为发动机、 payoff、过渡和防守支柱', '理解升级后是否改变整套牌优先级', '围绕核心卡补足触发频率和保护手段'],
      practice: ['每学一张核心卡就记录它需要的支持', '用实战观察它在第几回合开始产生价值', '比较同类核心卡适合的路线风险'],
      review: ['是否只看单次伤害忽略长期引擎', '是否拿到核心卡却没有补支持牌', '是否把过渡牌误当成终局定位'],
    },
    en: {
      intent: 'This article uses essential cards to teach deck identity. Some cards matter not only for numbers, but because they define damage, defense, or cycling plans.',
      decisions: ['Classify key cards as engines, payoffs, bridges, or defensive anchors', 'Understand whether an upgrade changes the whole deck priority', 'Support key cards with trigger frequency and protection'],
      practice: ['For each essential card, record what support it needs', 'Observe which turn it begins producing value in real fights', 'Compare route risk for similar identity-defining cards'],
      review: ['Did you judge only one-hit damage and miss long-term engines?', 'Did a core card arrive without support picks?', 'Was a bridge card mistaken for an endgame identity?'],
    },
  },
  'cards-beginners-misuse': {
    zh: {
      intent: '这篇文章指出看起来很强却容易拖垮卡组的牌，帮助新手识别启动慢、条件重或费用不匹配的陷阱。',
      decisions: ['高费牌要先证明能量和抽牌跟得上', '需要多张配合的牌不能在第一层过度囤积', '负面效果牌要计算真实代价而不是只看面板'],
      practice: ['拿牌前模拟它出现在差手牌中的表现', '记录每张误用牌最常卡手的原因', '用跳牌保护已经顺畅的核心循环'],
      review: ['是否为了稀有度忽略可玩性', '是否把未来配合当作当前战力', '是否因为一张牌破坏了防御回合'],
    },
    en: {
      intent: 'This article identifies powerful-looking cards that can weaken beginner decks by being slow, conditional, or mismatched with the cost curve.',
      decisions: ['Expensive cards must prove the deck has enough energy and draw', 'Multi-piece support cards should not be stockpiled too early', 'Cards with downsides need real cost accounting, not just stat reading'],
      practice: ['Imagine the card appearing in a bad hand before taking it', 'Record why each misused card most often bricks', 'Use skips to protect a core loop that is already smooth'],
      review: ['Did rarity distract from playability?', 'Was future synergy counted as current power?', 'Did one card break important defensive turns?'],
    },
  },
  'relic-picking-guide': {
    zh: {
      intent: '这篇遗物选择指南解释什么时候值得围绕遗物改变打法，重点看触发频率、收益类型和对路线的影响。',
      decisions: ['高频触发的小收益往往比低频大收益更稳定', '经济遗物需要路线和商店配合兑现', '改变选牌的遗物要尽早识别并调整优先级'],
      practice: ['获得遗物后立即写下它奖励的行为', '下一次选牌检查是否能提高触发次数', '路线选择考虑遗物是否鼓励精英、商店或问号'],
      review: ['是否拿到关键遗物却没有改变选牌', '是否为了触发遗物做了过度冒险', '是否低估了稳定防御类遗物'],
    },
    en: {
      intent: 'This relic guide explains when a relic is worth changing your plan around, focusing on trigger frequency, payoff type, and route impact.',
      decisions: ['Small frequent triggers are often steadier than rare large payoffs', 'Economy relics need routes and shops to convert value', 'Relics that change drafting should be recognized early'],
      practice: ['After gaining a relic, name the behavior it rewards', 'At the next card reward, check whether a pick increases trigger count', 'Route with the relic’s preference for elites, shops, or question marks in mind'],
      review: ['Did a key relic fail to change drafting?', 'Did relic greed create unnecessary risk?', 'Did you undervalue stable defensive relics?'],
    },
  },
  'best-beginner-relics': {
    zh: {
      intent: '这篇文章按稳定通关评价新手遗物，优先考虑能降低操作难度、补短板或提供持续资源的选择。',
      decisions: ['防御、回复和经济遗物能提高犯错容忍度', '需要复杂触发的遗物不一定适合首通', 'Boss 前遗物价值取决于能否解决具体检查项'],
      practice: ['把遗物分为稳定、成长、爆发和经济四类', '获得遗物后调整下一层路线风险', '用遗物补足卡组不愿再拿牌解决的短板'],
      review: ['是否追求花哨收益而忽略稳定性', '是否没把经济遗物转化成商店收益', '是否让遗物和卡组计划互相冲突'],
    },
    en: {
      intent: 'This article ranks beginner relics by stable clears, favoring choices that reduce execution difficulty, cover gaps, or provide steady resources.',
      decisions: ['Defensive, sustain, and economy relics increase mistake tolerance', 'Relics with complex triggers are not always best for first clears', 'Before bosses, relic value depends on the exact test it helps solve'],
      practice: ['Classify relics as stability, scaling, burst, or economy', 'Adjust next-act route risk after each relic', 'Use relics to cover weaknesses the deck should not fix with more cards'],
      review: ['Did flashy upside beat practical stability?', 'Did economy relics fail to become shop value?', 'Did relic incentives conflict with the deck plan?'],
    },
  },
  'choose-boss-relics': {
    zh: {
      intent: '这篇 Boss 遗物指南帮助玩家权衡能量、限制和卡组需求，因为 Boss 遗物常常同时给胜利条件和失败条件。',
      decisions: ['能量遗物要评估限制是否破坏核心回合', '非能量遗物适合已经有流畅费用曲线的卡组', '选择前先看下一层最缺输出、防御还是抽牌'],
      practice: ['列出每个候选遗物影响的三类回合', '检查限制和现有遗物是否互相冲突', '根据下一层路线决定是否需要更高爆发或更稳防御'],
      review: ['是否只看到加能量忽略副作用', '是否错过了更适合当前引擎的非能量选择', '是否选择后没有调整拿牌和路线'],
    },
    en: {
      intent: 'This boss relic guide helps players weigh energy, restrictions, and deck needs because boss relics often create both win conditions and failure conditions.',
      decisions: ['For energy relics, test whether the downside breaks key turns', 'Non-energy relics fit decks that already have a smooth curve', 'Before choosing, identify whether the next act needs damage, block, or draw most'],
      practice: ['List three turn types affected by each candidate relic', 'Check whether the restriction conflicts with existing relics', 'Use next-act routing to decide between burst and defensive consistency'],
      review: ['Did extra energy hide a damaging downside?', 'Did you miss a non-energy relic better suited to the engine?', 'Did drafting and routing fail to change after the pick?'],
    },
  },
  'relic-card-synergy': {
    zh: {
      intent: '这篇文章讲遗物与卡牌如何把小优势滚成胜势，核心是让触发条件和出牌计划自然重合。',
      decisions: ['先找已经高频发生的行为，再选择放大它的牌', '不要为了遗物强行加入低质量触发牌', '遗物提供防御时可把选牌重心转向输出或成长'],
      practice: ['获得遗物后标记可被它增强的现有卡', '下一层优先寻找能同时补短板和触发遗物的牌', '商店购买围绕遗物能否立即兑现'],
      review: ['是否触发遗物的行为本身不值得做', '是否忽略了遗物已经补足的能力', '是否没有把小收益累积成路线优势'],
    },
    en: {
      intent: 'This article explains how relic-card synergy turns small advantages into winning runs by making triggers overlap naturally with the deck’s normal play pattern.',
      decisions: ['Find behaviors already happening often, then draft cards that amplify them', 'Do not add low-quality trigger cards just to use a relic', 'When a relic supplies block, shift card picks toward damage or scaling'],
      practice: ['After each relic, mark existing cards it improves', 'In the next act, seek cards that both cover gaps and trigger the relic', 'Buy shop cards only when the relic payoff converts immediately'],
      review: ['Was the trigger behavior not worth doing on its own?', 'Did you ignore a capability the relic already covered?', 'Did small payoffs fail to become route advantage?'],
    },
  },
  'act-1-boss-guide': {
    zh: {
      intent: '这篇第一层 Boss 攻略帮助玩家提前准备行动模式、克制思路和清单，因为第一层主要检查前期伤害与基础防御。',
      decisions: ['Boss 信息出现后决定是否继续补伤害或开始补防御', '营火升级优先选择能缩短 Boss 战的牌', '药水可以为 Boss 保留，但不能因此牺牲精英存活'],
      practice: ['在后半层模拟 Boss 的关键回合', '商店优先购买能解决 Boss 检查项的药水或牌', '避免 Boss 前加入无法立刻发挥的慢速牌'],
      review: ['是否第一层伤害不足导致战斗拖长', '是否没有根据 Boss 调整升级', '是否为了未来成长忽略眼前检查'],
    },
    en: {
      intent: 'This Act 1 boss guide prepares move patterns, counterplay, and checklists because Act 1 mainly tests early damage and basic block.',
      decisions: ['After boss reveal, decide whether to keep adding damage or start adding block', 'Use campfire upgrades on cards that shorten the boss fight', 'Save potions for the boss only when elite survival is still safe'],
      practice: ['Simulate the boss key turns in the second half of the act', 'Buy potions or cards that answer the boss test directly', 'Avoid slow cards before the boss if they cannot matter immediately'],
      review: ['Did low Act 1 damage make the fight too long?', 'Did upgrades ignore the revealed boss?', 'Did future scaling distract from the immediate test?'],
    },
  },
  'act-2-boss-guide': {
    zh: {
      intent: '这篇第二层 Boss 攻略解释很多卡组在这里崩盘的原因：敌人开始同时检查群体处理、防御厚度和成长速度。',
      decisions: ['进入第二层后尽快补群体或多目标处理', '单纯前期攻击牌需要升级为可持续输出计划', '防御要能承受连续高压而不是只挡一回合'],
      practice: ['第二层前半段检查卡组是否有清场手段', '商店优先寻找防御、药水或关键升级替代品', '路线避免在短板明显时连续精英'],
      review: ['是否第一层过渡牌没有及时替换', '是否缺少群体能力导致普通战掉血过多', '是否成长太慢无法通过 Boss 长战'],
    },
    en: {
      intent: 'This Act 2 boss guide explains why many decks collapse here: enemies begin testing area handling, block depth, and scaling speed at the same time.',
      decisions: ['Add area or multi-target tools early in Act 2', 'Turn simple early attacks into a sustainable damage plan', 'Block must handle repeated pressure, not just one safe turn'],
      practice: ['Check for area damage in the first half of Act 2', 'Use shops to find block, potions, or substitutes for missing upgrades', 'Avoid chained elites when a weakness is obvious'],
      review: ['Did Act 1 bridge cards stay too long?', 'Did lack of area tools cause hallway HP loss?', 'Was scaling too slow for the boss fight length?'],
    },
  },
  'act-3-boss-guide': {
    zh: {
      intent: '这篇第三层 Boss 攻略定义终局卡组必须具备的能力：持续输出、可靠防御、足够成长和处理特殊限制的方案。',
      decisions: ['第三层不再随意补低影响牌', '根据 Boss 检查项决定最后升级和商店购买', '卡组需要能在差手牌中活过关键回合'],
      practice: ['进入第三层列出终局四项能力缺口', '优先删除或避免污染核心循环的牌', '保留药水解决最难的一到两个 Boss 回合'],
      review: ['是否卡组有上限但不稳定', '是否没有为特定 Boss 限制调整打法', '是否终局前还在拿过渡牌'],
    },
    en: {
      intent: 'This Act 3 boss guide defines what an endgame deck needs: sustained damage, reliable block, enough scaling, and answers to special restrictions.',
      decisions: ['Stop adding low-impact cards in Act 3', 'Use the boss test to choose final upgrades and shop buys', 'The deck must survive key turns even with imperfect hands'],
      practice: ['List endgame gaps across damage, block, scaling, and consistency', 'Remove or avoid cards that pollute the core loop', 'Reserve potions for the hardest one or two boss turns'],
      review: ['Did the deck have ceiling without consistency?', 'Did it ignore the specific boss restriction?', 'Were bridge cards still being added before the finale?'],
    },
  },
  'elite-enemy-guide': {
    zh: {
      intent: '这篇精英攻略帮助玩家判断什么时候该贪精英，什么时候必须避开；精英奖励高，但它们会放大当前卡组短板。',
      decisions: ['伤害、药水和营火位置决定是否能打精英', '不同精英检查不同能力，不能只看平均强度', '血量不足时商店或普通战可能比精英更能提高胜率'],
      practice: ['路线前标记每个精英前的补给点', '根据当前卡组预测最怕的精英类型', '用药水弥补一次能力短板而不是硬吃伤害'],
      review: ['是否贪奖励忽略死亡概率', '是否没有为精英保留关键药水', '是否低估了连续精英后的资源消耗'],
    },
    en: {
      intent: 'This elite guide helps decide when to greed elites and when to avoid them. Elite rewards are high, but elites amplify the deck’s current weaknesses.',
      decisions: ['Damage, potions, and campfire positions decide elite safety', 'Different elites test different capabilities, so average strength is not enough', 'At low HP, shops or hallway fights may improve win rate more than elites'],
      practice: ['Mark every recovery point before elite nodes', 'Predict which elite type the current deck fears most', 'Use potions to cover one capability gap instead of absorbing huge damage'],
      review: ['Did reward greed ignore death probability?', 'Was a key potion spent before the elite test?', 'Did chained elites drain more resources than expected?'],
    },
  },
  'best-beginner-builds': {
    zh: {
      intent: '这篇新手流派推荐低操作、高容错的通关思路，强调可稳定执行，而不是需要完美抽牌的华丽组合。',
      decisions: ['优先选择有稳定防御和清晰输出的流派', '流派形成前保留通用过渡牌', '不要因为看到一个 payoff 就强行锁定路线'],
      practice: ['按角色准备一套安全成型信号', '每层检查流派是否解决当前敌人压力', '缺少关键组件时及时转向更朴素的通关计划'],
      review: ['是否过早宣布流派成型', '是否组合需要太多组件导致前期失血', '是否忽略了流派的防御或群体短板'],
    },
    en: {
      intent: 'This beginner-build guide recommends safe, forgiving archetypes with reliable execution rather than flashy combos that require perfect draws.',
      decisions: ['Prefer archetypes with stable block and clear damage', 'Keep generic bridge cards before the archetype is real', 'Do not lock a route just because one payoff appears'],
      practice: ['Prepare safe build signals for each character', 'Check each act whether the build answers current enemy pressure', 'Pivot to a simpler clear plan if key pieces never arrive'],
      review: ['Was the archetype declared complete too early?', 'Did the combo need too many pieces and bleed HP early?', 'Did the build ignore defensive or area weaknesses?'],
    },
  },
  'before-high-ascension-strategies': {
    zh: {
      intent: '这篇高进阶前策略清单帮助玩家从偶尔通关变成稳定通关，重点是资源转换、风险控制和复盘习惯。',
      decisions: ['血量是资源但必须换成明确奖励', '升级、休息和商店购买都要服务下一场关键战斗', '稳定胜率来自减少低质量随机选择'],
      practice: ['每层开始设定路线风险上限', '用金币优先购买能立即降低失败率的东西', '复盘时按路线、选牌、战斗三类归因'],
      review: ['是否把高进阶理解成只需要更强流派', '是否没有量化贪心路线的代价', '是否重复同类错误却不调整默认选择'],
    },
    en: {
      intent: 'This pre-high-ascension checklist helps players move from occasional clears to consistent wins through resource conversion, risk control, and review habits.',
      decisions: ['HP is a resource only when it buys a clear reward', 'Upgrades, rests, and shop buys should serve the next key fight', 'Consistency comes from reducing low-quality random choices'],
      practice: ['Set a route risk limit at the start of each act', 'Spend gold first on items that immediately lower fail rate', 'Review losses by route, drafting, and combat categories'],
      review: ['Was high ascension treated as only needing stronger archetypes?', 'Was the cost of greedy routing left unmeasured?', 'Did repeated mistakes fail to change default decisions?'],
    },
  },
};

const detailedArticleContent: Record<string, DetailedArticleContent> = {
  'beginner-guide-first-clear': {
    description: {
      zh: '从第一局到首次通关的完整路线：按层数拆解伤害、防御、成长、商店和营火优先级，帮助新手把每个选择转化为更高胜率。',
      en: 'A complete first-clear route from run one to victory, organized by act priorities for damage, block, scaling, shops, and campfires.',
    },
    keywords: {
      zh: ['杀戮尖塔2新手攻略', '杀戮尖塔2首次通关', '第一层路线', '新手卡组构筑', '营火升级'],
      en: ['Slay the Spire 2 beginner guide', 'first clear guide', 'Act 1 routing', 'beginner deckbuilding', 'campfire upgrades'],
    },
    sections: {
      zh: [
        {
          heading: '首次通关的核心目标',
          body: '第一次通关不要把目标设成“做出最强流派”，而要设成“每一层都回答当前最危险的问题”。第一层的问题通常是伤害够不够，第二层的问题是防御和群体处理够不够，第三层的问题是成长能否支撑长战。只要把目标从追求完美组合改成逐层补短板，胜率会立刻稳定很多。',
        },
        {
          heading: '第一层：先拿能打赢精英和 Boss 的伤害',
          body: '开局前几场普通战，优先拿能马上造成伤害的牌。新手最常见的失败是过早拿慢速成长、复杂配合或高费牌，导致精英战前没有足够输出。第一层的好牌不一定是终局核心，它只需要让你更快结束危险战斗，减少血量消耗，并争取更多营火升级机会。',
        },
        {
          heading: '第二层：补防御、清场和稳定性',
          body: '能过第一层并不代表卡组已经成型。第二层往往会惩罚只会单点输出的卡组，也会惩罚防御牌密度过低的卡组。进入第二层后先检查三件事：是否能处理多个敌人，是否能在高压回合挡住主要伤害，是否有足够抽牌或能量让核心牌稳定出现。如果没有，就不要继续拿只增加上限但不能改善当前战斗的奖励。',
        },
        {
          heading: '第三层：检查终局成长，而不是继续补杂牌',
          body: '第三层开始后，普通战奖励的边际价值会下降。此时最重要的是确认卡组有没有终局答案：输出是否会随回合增长，防御是否能重复产生，关键牌是否能被抽到和打出。很多首次通关失败不是因为没有强牌，而是强牌被太多低影响牌稀释，导致关键回合抽不到真正需要的东西。',
        },
        {
          heading: '商店与营火的优先级',
          body: '商店不是看到稀有牌就买，营火也不是永远升级。商店优先看删牌、药水和能立即补短板的牌；营火优先升级能改变关键回合的牌，例如费用下降、伤害断点、防御断点或稳定抽牌。血量危险时休息不是失败，而是把已经获得的强度保留下来。',
        },
        {
          heading: '新手最稳的路线选择',
          body: '第一层可以适度贪精英，但前提是你已经有伤害牌、药水或营火支撑。第二层如果血量低、药水差、卡组还没补防御，就应减少精英路线，把商店和营火当成修正点。路线不是越贪越强，而是用当前血量、药水、金币和卡组短板决定能承担多少风险。',
        },
        {
          heading: '首次通关前的复盘模板',
          body: '每次失败后只记录三个问题：死前两场战斗最缺什么，上一层有没有机会补这个短板，哪一次选择让问题变得更严重。不要把复盘写成流水账。你需要找的是重复模式，例如总是缺伤害、总是过早拿成长、总是为了精英路线牺牲营火。',
        },
        {
          heading: '一局游戏内的执行清单',
          body: '进入新一层时先写下当前最怕的敌人类型；拿牌前先判断它解决伤害、防御、过牌、能量还是成长；进商店前先决定是否需要删牌或药水；打 Boss 前检查有没有至少一种长期输出和一种可重复防御。把这份清单执行完整，比记住单张卡牌排行更重要。',
        },
      ],
      en: [
        {
          heading: 'The Real First-Clear Goal',
          body: 'Your first clear should not be about forcing the flashiest archetype. It should be about answering the most dangerous question in each act. Act 1 usually asks for damage, Act 2 asks for stable defense and multi-enemy handling, and Act 3 asks whether your scaling can survive long fights.',
        },
        {
          heading: 'Act 1: Draft Damage Before Dreams',
          body: 'In the first few hallway fights, prioritize cards that immediately improve damage. A common beginner loss comes from taking slow scaling, expensive payoffs, or fragile synergy before the deck can beat elites. Early damage cards do not need to be perfect endgame cards; they need to preserve HP and open stronger routes.',
        },
        {
          heading: 'Act 2: Add Defense and Fight Control',
          body: 'Passing Act 1 does not mean the deck is complete. Act 2 punishes decks that only attack one target or cannot block high-pressure turns. Check whether you can handle multiple enemies, produce enough block on key turns, and find core cards reliably through draw or energy support.',
        },
        {
          heading: 'Act 3: Stop Adding Filler',
          body: 'By Act 3, many card rewards are less valuable than deck consistency. Confirm whether damage scales, block can be repeated, and key cards can be found and played. Many first-clear losses happen because strong cards are buried under too many low-impact additions.',
        },
        {
          heading: 'Shops and Campfires',
          body: 'A shop is not just a place to buy the rarest card, and a campfire is not always an upgrade. Shops should solve removals, potions, or urgent deck gaps. Campfire upgrades are best when they change real turns through cost reduction, damage breakpoints, block breakpoints, or better draw.',
        },
        {
          heading: 'Safe Routing',
          body: 'Act 1 elites are good when damage, potions, and campfires support them. In Act 2, low HP or weak defense should push you toward shops and campfires instead of greed. Good routing is not maximum risk; it is risk matched to HP, potions, gold, and deck weakness.',
        },
        {
          heading: 'Review Template',
          body: 'After a loss, answer three questions: what did the final two fights demand, where did the previous act offer a chance to fix it, and which choice made the weakness worse? Look for repeated patterns instead of writing a long run diary.',
        },
        {
          heading: 'In-Run Checklist',
          body: 'At the start of each act, name the enemy type you fear. Before taking a card, decide whether it improves damage, block, draw, energy, or scaling. Before a shop, decide whether removal or potions matter more. Before a boss, check for one lasting damage plan and one repeatable block plan.',
        },
      ],
    },
  },
  'beginner-mistakes': {
    description: {
      zh: '拆解新手最常见的 15 类失败模式：拿牌过多、路线过贪、药水太晚、只看稀有度、忽略费用曲线，并给出可执行修正方法。',
      en: 'A detailed breakdown of common beginner failure patterns: over-drafting, greedy routing, late potions, rarity traps, and broken cost curves.',
    },
    sections: {
      zh: [
        {
          heading: '错误一：把每次奖励都当成必须拿牌',
          body: '跳牌是构筑的一部分，不是浪费奖励。每多一张低影响牌，核心牌出现率都会下降。新手应在中后期更频繁地问：这张牌能不能解决当前短板，还是只让卡组变厚？如果答案不清楚，跳过通常比拿一张“也许有用”的牌更好。',
        },
        {
          heading: '错误二：第一层过早追求终局组合',
          body: '很多终局强牌需要能量、抽牌、遗物或其他组件支撑。第一层真正稀缺的是即时伤害和减少掉血的能力。过早拿慢速成长会让你在精英战中付出大量血量，甚至还没等组合启动就结束一局。',
        },
        {
          heading: '错误三：路线只看奖励，不看修正点',
          body: '好路线不只是精英多、问号多、宝箱多，还要有营火和商店作为修正点。没有营火的多精英路线会放大一次错误选牌的代价；没有商店的路线会让你无法删牌、买药水或补关键短板。',
        },
        {
          heading: '错误四：药水留到已经救不了的时候',
          body: '药水的价值在于改变危险战斗的结果，而不是作为收藏品进 Boss 房。能少掉 15 点血、保住一次升级、打赢一个关键精英时，药水就已经创造了足够价值。新手可以把药水看成临时强牌，而不是最后底牌。',
        },
        {
          heading: '错误五：只看单卡强度，不看费用曲线',
          body: '一手牌里有三张强牌但只能打出一张，实际强度就会大幅下降。拿高费牌前要检查能量来源，拿大量过牌前要检查抽到后能不能打出。费用曲线失衡的卡组看起来很豪华，实战却经常空过。',
        },
        {
          heading: '错误六：防御和输出只补一边',
          body: '只补输出会在高压回合被击穿，只补防御会把战斗拖长并承受更多总伤害。稳定卡组需要在不同阶段切换：前期用输出减少掉血，中期补防御抗压力，后期用成长解决长战。',
        },
        {
          heading: '错误七：把失败归因于运气，忽略可控选择',
          body: '爬塔游戏当然有随机性，但大部分失败前都有可控信号：血量太低还打精英、缺伤害却拿慢牌、没有药水还走危险路线。复盘时先找能改变的选择，再谈运气，这样下一局才会变强。',
        },
        {
          heading: '修正方法：每次选择前问一个问题',
          body: '奖励界面问“它解决什么短板”，地图界面问“失败时有没有退路”，商店界面问“金币能否立刻降低死亡风险”，战斗界面问“这回合进攻会不会比满防更少掉血”。把这些问题变成习惯，就能避开大多数新手坑。',
        },
      ],
      en: [
        {
          heading: 'Mistake 1: Treating Every Reward as Mandatory',
          body: 'Skipping is part of deckbuilding. Every low-impact card lowers access to key cards. In the midgame, ask whether the card solves a current gap or merely makes the deck thicker.',
        },
        {
          heading: 'Mistake 2: Chasing Endgame Too Early',
          body: 'Many powerful plans need energy, draw, relics, or support cards. Act 1 usually needs immediate damage first. Slow scaling can cost so much HP that the run ends before the payoff matters.',
        },
        {
          heading: 'Mistake 3: Ignoring Correction Points',
          body: 'Good paths include campfires and shops, not just rewards. A greedy route without campfires magnifies bad drafts, while a route without shops can block removals, potions, and urgent fixes.',
        },
        {
          heading: 'Mistake 4: Saving Potions Too Long',
          body: 'A potion is valuable when it changes a dangerous fight. Preventing major HP loss, protecting an upgrade, or winning a key elite is enough value. Treat potions as temporary strong cards.',
        },
        {
          heading: 'Mistake 5: Ignoring the Cost Curve',
          body: 'A hand of strong cards is weak if only one can be played. Before adding expensive cards, check energy. Before adding draw, check whether the deck can play what it finds.',
        },
        {
          heading: 'Mistake 6: Solving Only Damage or Only Block',
          body: 'Pure damage gets punished by pressure turns, while pure block stretches fights and increases total damage taken. Good decks shift from early damage to midgame defense and late scaling.',
        },
        {
          heading: 'Mistake 7: Blaming Only Luck',
          body: 'Randomness matters, but most losses have earlier signals: low HP before elites, slow cards when damage is missing, or dangerous routes without potions. Review controllable decisions first.',
        },
        {
          heading: 'The Fix',
          body: 'On rewards, ask what gap the card solves. On maps, ask where the fallback is. In shops, ask how gold lowers death risk. In combat, ask whether attacking now reduces total damage more than full blocking.',
        },
      ],
    },
  },
  'winning-deckbuilding-basics': {
    description: {
      zh: '深入讲解删牌、拿牌、跳牌和升级的判断顺序，帮助玩家从“拿强卡”进阶到“构筑能通关的完整系统”。',
      en: 'A deeper guide to removals, picks, skips, and upgrades that turns strong-card drafting into complete winning deck construction.',
    },
    sections: {
      zh: [
        {
          heading: '通关卡组不是强牌集合，而是运转系统',
          body: '一套能通关的卡组通常包含五个能力：足够早的伤害、可重复防御、抽到关键牌的方法、打出关键牌的能量，以及面对长战的成长。拿牌时不要只问“这张强不强”，而要问“它让系统哪一部分更可靠”。',
        },
        {
          heading: '前期拿牌：接受过渡牌，但要知道何时停止',
          body: '第一层需要过渡伤害牌，因为基础牌组通常无法稳定打精英。但过渡牌的使命是帮你活到中期，不是无限堆叠。进入第二层后，如果输出已经够用，就应减少同类攻击，转向防御、过牌、能量或成长。',
        },
        {
          heading: '删牌：提高关键牌出现率',
          body: '删牌的价值不只是移除弱牌，更是让好牌更频繁出现。通常先删低效率基础牌，但不要机械执行。若卡组极度缺攻击，过早删攻击会让第一层更危险；若防御密度不足，也不要为了“标准答案”删掉仍然需要的牌。',
        },
        {
          heading: '跳牌：保护卡组密度',
          body: '当奖励不能提高当前胜率，也不能连接已有核心时，跳牌就是正确选择。尤其在卡组已经有清晰主线后，额外补一张低影响牌常常会降低关键回合质量。跳牌的本质是用少量选择换稳定抽牌。',
        },
        {
          heading: '升级：优先改变关键回合',
          body: '好升级应该改变战斗结果，而不只是数字好看。费用降低、抽牌增加、伤害达到击杀断点、防御达到少掉一段伤害的断点，都比单纯小幅加值更重要。升级前可以问：它会在哪个敌人或 Boss 回合救我？',
        },
        {
          heading: '协同：先有底座，再谈上限',
          body: '围绕协同构筑时，要先确认底座是否能独立运转。只拿 payoff 而没有触发器，或只拿触发器而没有收益，都会让卡组变弱。最稳的协同牌通常既能配合核心，又有独立下限。',
        },
        {
          heading: '卡组检查：用五类标签复盘',
          body: '每层结束时把卡组按伤害、防御、过牌、能量、成长五类标记。某一类完全缺失时，下一层路线和奖励就要围绕它修正；某一类已经过量时，继续补同类牌通常会稀释卡组。',
        },
        {
          heading: '实战例子：为什么强稀有牌也可能不拿',
          body: '如果一张稀有牌费用高、启动慢、需要配合，而你下一场要面对高压精英，它可能不是当前答案。相反，一张普通但能马上补伤害或防御断点的牌，可能更接近通关选择。构筑水平的提升，正是从敢于拒绝“不适合现在的强牌”开始。',
        },
      ],
      en: [
        {
          heading: 'A Winning Deck Is a System',
          body: 'A winning deck usually needs early damage, repeatable block, access to key cards, enough energy to play them, and scaling for long fights. Ask what part of the system a card improves.',
        },
        {
          heading: 'Early Picks: Take Bridge Cards, Then Stop',
          body: 'Act 1 often requires bridge damage because starter decks cannot fight elites reliably. Those cards help you reach the midgame; they should not become endless additions once damage is already solved.',
        },
        {
          heading: 'Removals Improve Access',
          body: 'Removing weak cards makes good cards appear more often. Usually starter cards go first, but context matters. Do not remove needed attacks or block before the deck has replacements.',
        },
        {
          heading: 'Skipping Protects Density',
          body: 'When a reward does not improve current win rate or connect to an existing core, skipping is correct. A clear deck often beats a thicker deck with more medium cards.',
        },
        {
          heading: 'Upgrades Should Change Turns',
          body: 'Strong upgrades change outcomes through cost reduction, draw, damage breakpoints, or block breakpoints. Before upgrading, ask which enemy or boss turn it improves.',
        },
        {
          heading: 'Synergy Needs a Floor',
          body: 'A payoff without triggers or triggers without payoff weakens the deck. The safest synergy cards connect to your core while still doing something useful alone.',
        },
        {
          heading: 'Five-Tag Review',
          body: 'At the end of each act, tag the deck by damage, block, draw, energy, and scaling. Missing tags define the next priority. Overfilled tags warn you to stop drafting more of the same.',
        },
        {
          heading: 'Why Strong Rares Can Be Wrong',
          body: 'An expensive, slow, unsupported rare may fail the next elite. A plain card that fixes an immediate damage or block breakpoint can be the better winning choice.',
        },
      ],
    },
  },
  'map-pathing-guide': {
    description: {
      zh: '把地图路线拆成风险、奖励和修正点：什么时候打精英，什么时候进商店，什么时候走问号，如何根据血量和药水动态改路线。',
      en: 'A routing guide that breaks maps into risk, reward, and correction points: elites, shops, events, campfires, HP, and potions.',
    },
    sections: {
      zh: [
        {
          heading: '路线选择的本质：用风险换成长',
          body: '每个节点都在交换资源。普通战用血量换选牌，精英用更高风险换遗物和更强奖励，商店用金币换确定性修正，营火用路线位置换升级或休息。好路线不是奖励最多，而是风险能被当前卡组承受。',
        },
        {
          heading: '第一层：精英路线要看伤害和药水',
          body: '第一层精英通常是提高上限的重要来源，但前提是你能在精英前拿到足够伤害或强药水。如果前三场普通战后仍然缺输出，强行走多精英路线很容易把血量打穿。优秀路线通常会给你一个可回退选择：打得顺就进精英，打得差就转营火或商店。',
        },
        {
          heading: '第二层：不要低估普通战压力',
          body: '第二层普通战本身就可能消耗大量血量，因此路线不能只看精英数量。若卡组缺群体处理、防御或稳定抽牌，连续普通战也会很危险。此时商店和营火的价值上升，因为它们能在真正崩盘前修正短板。',
        },
        {
          heading: '问号房：不是免费奖励',
          body: '问号的优势是可能给高价值事件，缺点是减少选牌和可预测性。新手常在缺伤害时走太多问号，结果到了 Boss 前仍然没有基础能力。问号更适合两种情况：血量不适合打怪，或卡组已经足够稳定，只需要事件、金币、删牌或遗物机会。',
        },
        {
          heading: '商店：带着目标进去',
          body: '进商店前先看金币和短板。金币少时商店价值有限；金币多且卡组有明确问题时，商店可能比精英更重要。常见优先级是关键药水、删牌、补短板卡、核心遗物。不要因为商店里有贵牌，就忘记删牌和药水的稳定价值。',
        },
        {
          heading: '营火：路线里的保险',
          body: '营火让路线有弹性。血量高时它是升级点，血量低时它是保命点。选择路线时要看精英前后有没有营火：精英前营火能升级关键牌提高胜率，精英后营火能修复损血，让你继续执行后半层计划。',
        },
        {
          heading: '动态改路线：不要被开局计划绑死',
          body: '路线计划必须随着奖励变化。拿到强伤害和好药水，可以从保守路线转向精英；连续掉血或奖励不佳，就要及时转向商店、营火或低风险节点。高手和新手的差距往往不在开局规划，而在中途承认计划已经不适合当前局面。',
        },
        {
          heading: '路线复盘：看代价是否换到收益',
          body: '复盘路线时不要只问“我是不是该打精英”，要问“我用多少血量换到了什么”。如果打精英后获得遗物并保住升级，通常值得；如果为了问号错过普通战选牌，导致 Boss 前缺伤害，就说明路线没有服务卡组需求。',
        },
      ],
      en: [
        {
          heading: 'Routing Trades Risk for Growth',
          body: 'Every node exchanges resources. Hallway fights trade HP for card rewards, elites trade higher risk for relics, shops trade gold for certainty, and campfires trade route position for upgrades or healing.',
        },
        {
          heading: 'Act 1: Elites Need Damage and Potions',
          body: 'Act 1 elites can raise ceiling, but only when damage or strong potions support the fight. Good paths often include a fallback: take the elite if rewards are good, pivot if the run starts poorly.',
        },
        {
          heading: 'Act 2: Hallways Can Be Dangerous',
          body: 'Act 2 hallway fights can drain HP by themselves. If the deck lacks multi-enemy control, block, or draw, shops and campfires become more valuable than another risky fight.',
        },
        {
          heading: 'Events Are Not Free',
          body: 'Question marks can be powerful, but they reduce predictable card rewards. They are better when HP is too low for fights or the deck is already stable and wants events, removals, gold, or relic chances.',
        },
        {
          heading: 'Enter Shops With a Goal',
          body: 'Before a shop, check gold and deck weakness. Potions, removals, gap-filling cards, and core relics often beat expensive cards that do not change the next fight.',
        },
        {
          heading: 'Campfires Are Insurance',
          body: 'Campfires create route flexibility. At high HP they become upgrades; at low HP they preserve the run. Their position before or after elites changes how much risk the route can hold.',
        },
        {
          heading: 'Change Routes Mid-Act',
          body: 'A route plan should update after rewards. Strong damage and potions can justify more elites. Bad fights or weak rewards should push toward shops, campfires, or safer nodes.',
        },
        {
          heading: 'Review the Exchange',
          body: 'Do not review routing as only “should I have fought the elite?” Ask what HP bought. A relic plus preserved upgrades may be worth it; missing card rewards because of too many events may not be.',
        },
      ],
    },
  },
  'combat-decision-making': {
    description: {
      zh: '深入讲解回合内决策：击杀线、伤害承受、药水时机、敌人意图、状态计算，帮助玩家减少“看似防住却输掉整场”的情况。',
      en: 'A turn-by-turn combat decision guide covering lethal math, acceptable damage, potion timing, enemy intent, and status calculations.',
    },
    sections: {
      zh: [
        {
          heading: '战斗目标不是满防，而是降低总损失',
          body: '新手常把“本回合不掉血”当成唯一目标，但很多战斗中更好的选择是少挡一点、提前击杀、减少后续回合总伤害。判断一回合时不要只看当前伤害，而要估算如果拖一回合，敌人还会多造成多少压力。',
        },
        {
          heading: '先算击杀线，再决定防御线',
          body: '行动前先问：这回合能不能击杀，或者下回合能不能稳定击杀？如果能击杀，防御价值会下降；如果不能击杀，就要计算这回合投入多少防御能让下一回合仍有资源结束战斗。击杀线判断是进攻和防御取舍的基础。',
        },
        {
          heading: '敌人意图决定手牌价值',
          body: '同一张牌在不同敌人意图下价值完全不同。敌人本回合不攻击时，防御牌价值下降，成长、过牌和输出价值上升；敌人多段攻击时，防御效率和减伤状态更重要；敌人即将强化或召唤时，爆发输出可能比满防更关键。',
        },
        {
          heading: '状态计算：易伤、虚弱和多段伤害',
          body: '易伤和虚弱会改变真实伤害，不能凭感觉出牌。多段攻击尤其需要认真计算，因为一点力量、一次减伤或一层虚弱会被重复放大。养成先算修正后数值再出牌的习惯，可以避免很多“差一点死”的局面。',
        },
        {
          heading: '药水时机：能改变路线就值得用',
          body: '药水不一定要留给 Boss。若一瓶药水能让你少休息一次、多升级一次、打赢精英或避免掉到危险血线，它就已经影响了整局路线。最糟糕的药水使用方式，是等血量已经低到下一场普通战都危险时才想起来。',
        },
        {
          heading: '什么时候可以主动吃伤害',
          body: '主动吃伤害必须换到明确收益，例如提前击杀、保留关键药水、完成强升级路线或避免更危险的下回合。不能为了多打几滴伤害盲目掉血。判断标准是：这次掉血是否降低整场战斗或整层地图的总风险。',
        },
        {
          heading: '手牌排序：必打、条件打、不要打',
          body: '每回合先把手牌分成三类：必打牌解决击杀或防御断点；条件牌取决于剩余能量和敌人行动；不要打的牌会浪费能量、打乱抽牌或让下回合更差。这个排序能减少“看到能打就打”的低质量操作。',
        },
        {
          heading: '战斗复盘：记录错过的转折点',
          body: '战斗结束后只复盘一个问题：哪一回合如果换一种打法，后续损失会明显减少？常见转折点包括药水晚用、错过击杀线、过度防御拖长战斗、没有提前处理召唤物或转阶段。抓住这些点，战斗水平提升最快。',
        },
      ],
      en: [
        {
          heading: 'The Goal Is Not Always Full Block',
          body: 'The real combat goal is reducing total loss. Sometimes taking a little damage now to end the fight earlier prevents more damage across later turns.',
        },
        {
          heading: 'Calculate Lethal Before Block',
          body: 'Before playing cards, ask whether you can kill this turn or guarantee lethal next turn. If lethal is available, block value changes. If not, block enough to keep the next turn playable.',
        },
        {
          heading: 'Enemy Intent Changes Card Value',
          body: 'The same hand has different value against different intents. Non-attacking turns favor scaling and damage. Multi-hit turns raise the value of efficient block and damage reduction.',
        },
        {
          heading: 'Status Math Matters',
          body: 'Vulnerable, Weak, and multi-hit attacks change real numbers. Calculate modified damage before playing, especially when small modifiers repeat across many hits.',
        },
        {
          heading: 'Potion Timing',
          body: 'A potion is worth using if it preserves an upgrade, wins an elite, prevents a dangerous HP drop, or changes the route. Saving every potion for bosses often wastes value.',
        },
        {
          heading: 'When Taking Damage Is Correct',
          body: 'Taking damage is correct only when it buys a clear benefit: lethal, a safer next turn, a preserved potion, or a stronger route. The damage should reduce total risk, not just add a few points of attack.',
        },
        {
          heading: 'Sort the Hand',
          body: 'Divide each hand into must-play, conditional, and do-not-play cards. This prevents autopiloting every playable card and wasting energy on actions that do not improve the fight.',
        },
        {
          heading: 'Combat Review',
          body: 'After a fight, identify the one turn where a different line would have reduced later loss. Common turning points are late potions, missed lethal, over-blocking, and ignoring summons or phase changes.',
        },
      ],
    },
  },
};

function buildSections(article: ArticleBlueprint): CoreArticle['sections'] {
  const detailed = detailedArticleContent[article.slug];

  if (detailed) {
    return detailed.sections;
  }

  const seed = articleSectionSeeds[article.slug];
  const category = getCategory(article.category);

  if (!seed) {
    throw new Error(`Missing article section seed: ${article.slug}`);
  }

  const zhDecisionText = seed.zh.decisions.join('；');
  const zhPracticeText = seed.zh.practice.join('；');
  const zhReviewText = seed.zh.review.join('；');
  const enDecisionText = seed.en.decisions.join('; ');
  const enPracticeText = seed.en.practice.join('; ');
  const enReviewText = seed.en.review.join('; ');

  return {
    zh: [
      {
        heading: '这篇攻略适合谁',
        body: `${seed.zh.intent} 如果你正在查${category.title.zh}，建议先把这篇当作一局游戏前的检查表，而不是只看结论。攻略中的判断顺序更适合新手和回归玩家，用来减少前两层突然崩盘、选牌方向摇摆和 Boss 前才发现短板的情况。`,
      },
      {
        heading: '先建立正确目标',
        body: `《杀戮尖塔 2》的稳定通关不是每次都追求最华丽的组合，而是让当前卡组持续回答下一场战斗的问题。阅读本篇时，可以把目标拆成三层：先活过眼前战斗，再让卡组拥有清晰输出或防御计划，最后才考虑高上限成长。这样做的好处是每一次拿牌、删牌、升级和路线选择都有依据。`,
      },
      {
        heading: '关键判断',
        body: `实战中优先确认这些问题：${zhDecisionText}。这些判断不需要等卡组完全成型才做，越早确认越能避免后面被迫补救。尤其在普通战奖励、精英路线和商店之间选择时，先问“这能不能提高下一场关键战斗胜率”，通常比单纯追求稀有度或理论上限更可靠。`,
      },
      {
        heading: '推荐执行顺序',
        body: `第一步，检查当前最短板的能力，通常是伤害、防御、过牌、能量或成长其中之一。第二步，只选择能直接补短板或明显增强已有核心的奖励。第三步，在营火和商店把资源花到下一场高风险战斗上。第四步，进入下一层后重新评估，不要让上一层的成功经验固定住整局思路。`,
      },
      {
        heading: '局内练习',
        body: `下一局可以直接练习：${zhPracticeText}。练习时不要同时改太多习惯，最好每局只盯一个主题，例如只练路线风险、只练跳牌，或只练 Boss 前的药水保留。这样复盘时能知道胜负变化来自哪个决定，而不是把所有结果都归因于运气。`,
      },
      {
        heading: '常见误区',
        body: `新手最容易把“看起来很强”误认为“现在需要”。一张高费牌、一个复杂组合或一条多精英路线，只有在当前资源能支撑时才是优势。遇到诱人的奖励时，先把它放进最差的一手牌里想一遍：如果它不能帮助你活过危险回合，或者会稀释已经顺畅的循环，就应该降低期待。`,
      },
      {
        heading: '复盘清单',
        body: `失败后重点检查：${zhReviewText}。复盘时建议按路线、选牌、战斗三个维度记录原因：路线问题通常表现为血量和营火不足，选牌问题表现为关键牌抽不到或打不出，战斗问题则表现为药水太晚使用、击杀回合估算错误或防御过度拖长战斗。`,
      },
      {
        heading: '下一步阅读',
        body: `读完后可以回到${category.title.zh}继续查同类文章，再结合卡牌图鉴、遗物数据库和通关流派页面验证具体卡牌与遗物的价值。真正能提高通关率的不是记住某个固定答案，而是把本篇的检查顺序带进每一次奖励选择和每一场关键战斗。`,
      },
    ],
    en: [
      {
        heading: 'Who This Guide Helps',
        body: `${seed.en.intent} If you are browsing ${category.title.en.toLowerCase()}, use this page as a pre-run checklist rather than a list of isolated answers. The order is written for new and returning players who want fewer early collapses, clearer drafts, and fewer boss fights entered with an unsolved weakness.`,
      },
      {
        heading: 'Set the Right Goal First',
        body: 'Consistent Slay the Spire 2 runs are not built by chasing the flashiest combo every time. The practical goal is to answer the next fight, then give the deck a clear damage or block plan, and only then add long-term scaling. That framing makes picks, skips, removals, upgrades, shops, and routes easier to compare.',
      },
      {
        heading: 'Key Decisions',
        body: `In real runs, check these first: ${enDecisionText}. These decisions matter before the deck is complete. When choosing between a card reward, elite route, shop, or campfire, ask whether the choice improves the next important fight instead of judging only rarity or theoretical ceiling.`,
      },
      {
        heading: 'Recommended Order',
        body: 'First, name the deck capability that is currently weakest: damage, block, draw, energy, or scaling. Second, take rewards that directly cover that gap or strengthen a real existing core. Third, spend campfires and shop gold on the next high-risk fight. Fourth, reassess at the start of every act instead of forcing last act’s plan.',
      },
      {
        heading: 'In-Run Practice',
        body: `Use the next run to practice: ${enPracticeText}. Do not change every habit at once. Pick one focus per run, such as route risk, skipping, potion timing, or boss preparation. That makes the review useful because you can connect the result to a specific decision pattern.`,
      },
      {
        heading: 'Common Trap',
        body: 'The most common beginner trap is confusing “powerful-looking” with “needed now.” An expensive card, a complex package, or a greedy route is only an advantage when the current resources can support it. Before taking a tempting reward, imagine it in a bad hand and decide whether it helps you survive the dangerous turn.',
      },
      {
        heading: 'Review Checklist',
        body: `After a loss, review: ${enReviewText}. Sort the cause into route, drafting, and combat. Route problems usually show up as low HP or missing campfire options. Drafting problems show up as key cards being hard to find or play. Combat problems often come from late potion use, bad lethal math, or blocking so much that the fight lasts too long.`,
      },
      {
        heading: 'What To Read Next',
        body: `After this page, return to ${category.title.en.toLowerCase()} for related guides, then use the card database, relic database, and build pages to test specific card and relic choices. The durable improvement is not memorizing one answer; it is carrying this checklist into every reward screen and key fight.`,
      },
    ],
  };
}

function buildDescription(article: ArticleBlueprint): LocalizedText {
  const detailed = detailedArticleContent[article.slug];

  if (detailed) {
    return detailed.description;
  }

  const category = getCategory(article.category);

  return {
    zh: `${article.title.zh}围绕${category.title.zh}展开，帮助玩家把机制理解转化为更稳定的路线、选牌和战斗决策。`,
    en: `${article.title.en} focuses on ${category.title.en.toLowerCase()}, turning mechanic knowledge into steadier routing, drafting, and combat decisions.`,
  };
}

function buildKeywords(article: ArticleBlueprint): LocalizedList {
  const detailed = detailedArticleContent[article.slug];

  if (detailed?.keywords) {
    return detailed.keywords;
  }

  return {
    zh: [article.title.zh, ...categoryKeywordMap[article.category].zh],
    en: [article.title.en, ...categoryKeywordMap[article.category].en],
  };
}


export const coreArticles: CoreArticle[] = articleBlueprints.map((article) => ({
  ...article,
  description: buildDescription(article),
  keywords: buildKeywords(article),
  sections: buildSections(article),
}));

export const categoryRoutes = ['guides', 'characters', 'bosses', 'strategy', 'resources'] as const;

export function getCategory(id: ContentCategoryId): ContentCategory {
  const category = contentCategories.find((item) => item.id === id);

  if (!category) {
    throw new Error(`Unknown content category: ${id}`);
  }

  return category;
}

export function getArticlesByCategory(category: ContentCategoryId): CoreArticle[] {
  return coreArticles.filter((article) => article.category === category);
}

export function getCoreArticle(slug: string): CoreArticle | undefined {
  return coreArticles.find((article) => article.slug === slug);
}
