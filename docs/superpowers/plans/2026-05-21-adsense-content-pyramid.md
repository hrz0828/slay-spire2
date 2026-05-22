# AdSense Content Pyramid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an AdSense-review-friendly bilingual content pyramid to the existing Slay the Spire 2 guide site, including pillar category pages and the first 30 high-value article entries.

**Architecture:** Store editorial content as typed data in `lib/data/content-pyramid.ts`, then render it through reusable server components and focused App Router pages. Keep article bodies concise but substantial enough to avoid empty/thin pages, and update navigation plus sitemap so Google can discover the new content.

**Tech Stack:** Next.js App Router, TypeScript, React 18, Tailwind CSS, existing `lib/i18n` locale helpers, static generation.

---

## File Structure

- Create: `lib/data/content-pyramid.ts`
  - Owns all bilingual content-pyramid data: category hierarchy, article metadata, article bodies, utility lookup functions, and slug lists.
- Create: `app/[lang]/guides/page.tsx`
  - Renders the beginner-guide category landing page.
- Create: `app/[lang]/characters/page.tsx`
  - Renders the character/class category landing page.
- Create: `app/[lang]/bosses/page.tsx`
  - Renders the boss/enemy strategy category landing page.
- Create: `app/[lang]/strategy/page.tsx`
  - Renders the advanced strategy category landing page.
- Create: `app/[lang]/resources/page.tsx`
  - Renders glossary/FAQ/resource category landing page.
- Create: `app/[lang]/articles/[slug]/page.tsx`
  - Renders each of the 30 bilingual core articles.
- Modify: `app/[lang]/layout.tsx`
  - Add content-pyramid categories to desktop/mobile navigation.
- Modify: `app/[lang]/page.tsx`
  - Add an AdSense-first content section linking to category pages and priority articles.
- Modify: `app/[lang]/cards/page.tsx`
  - Add contextual links from card database to article pages.
- Modify: `app/[lang]/relics/page.tsx`
  - Add contextual links from relic database to article pages.
- Modify: `app/[lang]/builds/page.tsx`
  - Add intro links to beginner builds and strategy articles.
- Modify: `app/sitemap.ts`
  - Include category and article routes in sitemap.

## Task 1: Add Typed Content Pyramid Data

**Files:**
- Create: `lib/data/content-pyramid.ts`

- [x] **Step 1: Create the data file with types, category hierarchy, and article metadata/body content**

Create `lib/data/content-pyramid.ts` with this complete content:

```ts
import type { Locale } from '@/lib/i18n';

export type ContentCategoryId = 'guides' | 'characters' | 'cards' | 'relics' | 'builds' | 'bosses' | 'strategy' | 'tools' | 'resources' | 'news';

export type ContentCategory = {
  id: ContentCategoryId;
  href: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  sections: Array<{
    title: Record<Locale, string>;
    items: Record<Locale, string[]>;
  }>;
};

export type CoreArticle = {
  slug: string;
  category: ContentCategoryId;
  priority: number;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  keywords: Record<Locale, string[]>;
  sections: Record<Locale, Array<{ heading: string; body: string }>>;
};

export const contentCategories: ContentCategory[] = [
  {
    id: 'guides',
    href: 'guides',
    title: { zh: '新手指南', en: 'Beginner Guides' },
    description: {
      zh: '从第一局、首次通关到稳定理解卡组构筑，优先解决新玩家最容易卡住的问题。',
      en: 'A first-clear roadmap covering combat, deckbuilding, map choices, and the mistakes that stop new players from improving.',
    },
    sections: [
      { title: { zh: '基础机制', en: 'Core Mechanics' }, items: { zh: ['战斗系统', '地图路线选择', '资源管理', '删牌与跳牌'], en: ['Combat basics', 'Map pathing', 'Resource management', 'Remove and skip decisions'] } },
      { title: { zh: '学习路径', en: 'Learning Path' }, items: { zh: ['首次通关路线', '新手常见错误', '与一代差异', '术语与关键词'], en: ['First-clear roadmap', 'Common beginner mistakes', 'Differences from StS1', 'Glossary and keywords'] } },
    ],
  },
  {
    id: 'characters',
    href: 'characters',
    title: { zh: '职业/角色攻略', en: 'Characters & Classes' },
    description: {
      zh: '按角色拆解起手策略、核心流派、关键卡牌和 Boss 应对方式。',
      en: 'Character guides for starting strategy, archetypes, key cards, and boss preparation.',
    },
    sections: [
      { title: { zh: '角色总览', en: 'Character Overview' }, items: { zh: ['铁甲战士', '静默猎手', '故障机器人', '观者', '新角色'], en: ['Ironclad', 'Silent', 'Defect', 'Watcher', 'New characters'] } },
      { title: { zh: '角色决策', en: 'Class Decisions' }, items: { zh: ['上手难度排行', '起手策略', '专属流派', '角色 Boss 应对'], en: ['Difficulty ranking', 'Opening strategy', 'Class archetypes', 'Boss plans by character'] } },
    ],
  },
  {
    id: 'cards',
    href: 'cards',
    title: { zh: '卡牌图鉴', en: 'Card Database' },
    description: {
      zh: '不仅查卡牌，也解释什么时候拿、什么时候跳、如何围绕当前牌组判断价值。',
      en: 'A card reference that explains when to pick, skip, and evaluate cards by current deck context.',
    },
    sections: [
      { title: { zh: '卡牌检索', en: 'Card Reference' }, items: { zh: ['全卡牌列表', '职业卡牌', '稀有度筛选', '关键词筛选'], en: ['All cards', 'Class cards', 'Rarity filters', 'Keyword filters'] } },
      { title: { zh: '卡牌理解', en: 'Card Evaluation' }, items: { zh: ['新手必拿卡', '核心卡牌解析', '协同组合', '误用卡牌'], en: ['Best beginner cards', 'Essential card analysis', 'Synergies', 'Misused cards'] } },
    ],
  },
  {
    id: 'relics',
    href: 'relics',
    title: { zh: '遗物数据库', en: 'Relic Database' },
    description: {
      zh: '用资源上限、触发稳定性和构筑联动来判断遗物价值。',
      en: 'Evaluate relics by turn ceiling, trigger reliability, long-term economy, and build synergy.',
    },
    sections: [
      { title: { zh: '遗物分类', en: 'Relic Types' }, items: { zh: ['全遗物列表', 'Boss 遗物', '商店遗物', '事件遗物'], en: ['All relics', 'Boss relics', 'Shop relics', 'Event relics'] } },
      { title: { zh: '遗物决策', en: 'Relic Decisions' }, items: { zh: ['新手推荐遗物', '遗物评级', '高风险高收益遗物', '遗物与卡牌协同'], en: ['Best beginner relics', 'Relic tier list', 'High-risk relics', 'Relic-card synergies'] } },
    ],
  },
  {
    id: 'builds',
    href: 'builds',
    title: { zh: '通关流派', en: 'Builds & Archetypes' },
    description: {
      zh: '把角色、卡牌、遗物和路线选择合成可执行的通关思路。',
      en: 'Practical archetypes that combine characters, cards, relics, and route choices into winning plans.',
    },
    sections: [
      { title: { zh: '通关方向', en: 'Run Plans' }, items: { zh: ['新手通关流派', '高胜率流派', '防御型流派', '爆发型流派'], en: ['Beginner builds', 'High-win-rate builds', 'Defensive builds', 'Burst builds'] } },
      { title: { zh: '机制流派', en: 'Mechanic Archetypes' }, items: { zh: ['毒系', '力量', '充能球', '姿态', '召唤与资源'], en: ['Poison', 'Strength', 'Orbs', 'Stances', 'Summons and resources'] } },
    ],
  },
  {
    id: 'bosses',
    href: 'bosses',
    title: { zh: 'Boss 与敌人机制', en: 'Bosses & Enemies' },
    description: {
      zh: '用行动模式、备战清单和角色应对来降低精英与 Boss 战翻车率。',
      en: 'Boss and enemy strategy built around move patterns, preparation checklists, and class-specific counterplay.',
    },
    sections: [
      { title: { zh: '敌人类型', en: 'Enemy Types' }, items: { zh: ['第一层 Boss', '第二层 Boss', '第三层 Boss', '精英敌人'], en: ['Act 1 bosses', 'Act 2 bosses', 'Act 3 bosses', 'Elite enemies'] } },
      { title: { zh: '应对方法', en: 'Counterplay' }, items: { zh: ['行动模式', '备战清单', '各角色应对', '高风险战斗判断'], en: ['Move patterns', 'Preparation checklist', 'Class counterplay', 'Risky fight evaluation'] } },
    ],
  },
  {
    id: 'strategy',
    href: 'strategy',
    title: { zh: '进阶策略', en: 'Advanced Strategy' },
    description: {
      zh: '解释路线、卡组厚度、费用曲线、抽牌和风险管理等稳定胜率的底层逻辑。',
      en: 'Advanced concepts for pathing, deck size, energy curve, draw, shops, events, and risk management.',
    },
    sections: [
      { title: { zh: '运营能力', en: 'Run Management' }, items: { zh: ['路线规划', '商店购买', '事件选择', '血量风险管理'], en: ['Pathing', 'Shop strategy', 'Event decisions', 'HP risk management'] } },
      { title: { zh: '牌组能力', en: 'Deck Fundamentals' }, items: { zh: ['卡组厚度', '费用曲线', '抽牌与过牌', '攻防平衡'], en: ['Deck size', 'Energy curve', 'Draw and cycling', 'Damage-block balance'] } },
    ],
  },
  {
    id: 'tools',
    href: 'tools',
    title: { zh: '工具与计算器', en: 'Tools & Calculators' },
    description: {
      zh: '用轻量工具辅助伤害、路线、Boss 准备和流派判断。',
      en: 'Lightweight tools for damage checks, route evaluation, boss prep, and build planning.',
    },
    sections: [
      { title: { zh: '实用工具', en: 'Practical Tools' }, items: { zh: ['伤害计算', 'Boss 准备清单', '卡牌筛选器', '遗物协同查询'], en: ['Damage calculator', 'Boss checklist', 'Card filter', 'Relic synergy finder'] } },
    ],
  },
  {
    id: 'resources',
    href: 'resources',
    title: { zh: '资源中心', en: 'Resources' },
    description: {
      zh: '补齐术语表、FAQ、阅读路线和站点说明，让站点更完整可信。',
      en: 'Glossary, FAQ, reading roadmap, and site resources that make the guide easier to trust and navigate.',
    },
    sections: [
      { title: { zh: '站点资源', en: 'Site Resources' }, items: { zh: ['术语表', 'FAQ', '阅读路线', '关于本站'], en: ['Glossary', 'FAQ', 'Reading roadmap', 'About this site'] } },
    ],
  },
  {
    id: 'news',
    href: 'news',
    title: { zh: '新闻与版本更新', en: 'News & Updates' },
    description: {
      zh: '用于后续承接补丁、平衡性改动和新卡牌分析，审核期不作为主力栏目。',
      en: 'A later expansion area for patches, balance changes, and new-card analysis after the core guide base is strong.',
    },
    sections: [
      { title: { zh: '更新追踪', en: 'Update Tracking' }, items: { zh: ['官方更新', '补丁解读', '新卡分析', '平衡改动'], en: ['Official updates', 'Patch explanations', 'New card analysis', 'Balance changes'] } },
    ],
  },
];

const articleBlueprints: Array<{ slug: string; category: ContentCategoryId; zhTitle: string; enTitle: string; zhDesc: string; enDesc: string; zhFocus: string; enFocus: string }> = [
  { slug: 'beginner-guide-first-clear', category: 'guides', zhTitle: '《杀戮尖塔 2》新手入门完全指南：从第一局到首次通关', enTitle: 'Slay the Spire 2 Beginner Guide: From Your First Run to First Clear', zhDesc: '用一条清晰学习路线理解战斗、路线、卡组和 Boss 准备。', enDesc: 'A clear learning route for combat, pathing, deckbuilding, and boss preparation.', zhFocus: '先追求稳定通关，不急着追求花哨连招。', enFocus: 'Focus on stable clears before chasing flashy combo turns.' },
  { slug: 'sts2-vs-sts1-differences', category: 'guides', zhTitle: '《杀戮尖塔 2》和《杀戮尖塔 1》有什么不同？核心机制变化解析', enTitle: 'Slay the Spire 2 vs Slay the Spire 1: Key Gameplay Differences Explained', zhDesc: '帮助老玩家快速调整判断标准，避免沿用一代惯性。', enDesc: 'Helps returning players update their assumptions instead of copying StS1 habits.', zhFocus: '把旧经验当作起点，而不是答案。', enFocus: 'Use old experience as a starting point, not as the final answer.' },
  { slug: 'beginner-mistakes', category: 'guides', zhTitle: '新手最容易犯的 15 个错误：为什么你的卡组总是成型失败', enTitle: '15 Beginner Mistakes in Slay the Spire 2 and How to Avoid Them', zhDesc: '整理导致卡组臃肿、路线失衡和 Boss 战崩盘的常见问题。', enDesc: 'Common causes of bloated decks, bad routes, and failed boss fights.', zhFocus: '少犯错比多拿一张强卡更重要。', enFocus: 'Avoiding mistakes matters more than adding one more strong card.' },
  { slug: 'winning-deckbuilding-basics', category: 'guides', zhTitle: '如何构筑一套能通关的卡组：删牌、拿牌、跳牌的核心逻辑', enTitle: 'How to Build a Winning Deck: Pick, Skip, and Remove Cards Correctly', zhDesc: '解释拿牌、跳牌、删牌和补能力的基础优先级。', enDesc: 'Explains the priorities behind picking, skipping, removing, and filling deck needs.', zhFocus: '每张牌都应该解决当前牌组的具体问题。', enFocus: 'Every card should solve a concrete problem your deck currently has.' },
  { slug: 'map-pathing-guide', category: 'guides', zhTitle: '地图路线怎么选？普通怪、精英、商店、问号房的取舍', enTitle: 'How to Choose Your Map Path: Fights, Elites, Shops, and Events', zhDesc: '用血量、奖励和 Boss 准备来判断路线风险。', enDesc: 'Evaluate path risk through HP, rewards, and boss preparation.', zhFocus: '路线选择是资源交易，不是固定模板。', enFocus: 'Pathing is a resource trade, not a fixed script.' },
  { slug: 'combat-decision-making', category: 'guides', zhTitle: '战斗中如何做决策：什么时候进攻，什么时候防御', enTitle: 'Combat Decision-Making Guide: When to Attack and When to Defend', zhDesc: '建立战斗回合中的伤害、防御和未来回合判断。', enDesc: 'Build turn-by-turn judgment for damage, defense, and future draws.', zhFocus: '不要只看本回合，还要看下一轮抽牌。', enFocus: 'Do not judge only this turn; consider the next draw cycle.' },
  { slug: 'energy-draw-cost-curve', category: 'strategy', zhTitle: '能量、抽牌、费用曲线：理解卡组运转的底层逻辑', enTitle: 'Energy, Card Draw, and Cost Curve: How Decks Actually Work', zhDesc: '解释为什么能量、抽牌和费用结构决定卡组上限。', enDesc: 'Explains why energy, draw, and cost structure define deck ceiling.', zhFocus: '能抽到不等于能打出，能打出也不等于值得打。', enFocus: 'Drawing a card is not the same as being able or wanting to play it.' },
  { slug: 'card-synergy-basics', category: 'cards', zhTitle: '为什么“拿强卡”不等于“好卡组”：卡牌协同入门', enTitle: 'Why Strong Cards Do Not Always Make a Strong Deck: Synergy Basics', zhDesc: '从单卡强度转向卡组角色、启动件和终结能力。', enDesc: 'Move from raw card strength to deck roles, enablers, and finishers.', zhFocus: '强卡需要位置，协同需要方向。', enFocus: 'Strong cards need a role; synergy needs direction.' },
  { slug: 'first-ten-hours-roadmap', category: 'guides', zhTitle: '新手通关推荐路线：最稳的前 10 小时学习顺序', enTitle: 'Best Beginner Progression Path: What to Learn in Your First 10 Hours', zhDesc: '按学习顺序安排角色、机制、路线和复盘重点。', enDesc: 'A learning order for characters, mechanics, routes, and run reviews.', zhFocus: '先学稳定动作，再学高上限操作。', enFocus: 'Learn stable decisions before high-ceiling plays.' },
  { slug: 'glossary-core-mechanics', category: 'resources', zhTitle: '《杀戮尖塔 2》术语表：力量、敏捷、易伤、虚弱等机制解释', enTitle: 'Slay the Spire 2 Glossary: Strength, Dexterity, Vulnerable, Weak, and More', zhDesc: '集中解释常见战斗关键词和攻略术语。', enDesc: 'A central glossary for combat keywords and guide terminology.', zhFocus: '理解术语是理解攻略的前提。', enFocus: 'Understanding terms is the foundation for understanding strategy.' },
  { slug: 'ironclad-beginner-guide', category: 'characters', zhTitle: '铁甲战士新手攻略：力量、防御与血量资源怎么平衡', enTitle: 'Ironclad Beginner Guide: Balancing Strength, Block, and HP', zhDesc: '讲解铁甲战士如何用血量换节奏并建立终局输出。', enDesc: 'How Ironclad trades HP for tempo while building endgame damage.', zhFocus: '血量是资源，但不是无限资源。', enFocus: 'HP is a resource, but not an infinite one.' },
  { slug: 'silent-beginner-guide', category: 'characters', zhTitle: '静默猎手新手攻略：毒、刀、过牌与防御节奏', enTitle: 'Silent Beginner Guide: Poison, Shivs, Draw, and Defensive Tempo', zhDesc: '帮助静默猎手玩家理解持续伤害、铺场和生存节奏。', enDesc: 'Understand poison, shivs, draw, and survival tempo on Silent.', zhFocus: '静默猎手要先活下来，输出才会滚起来。', enFocus: 'Silent must survive first; damage scales after the engine starts.' },
  { slug: 'defect-beginner-guide', category: 'characters', zhTitle: '故障机器人新手攻略：充能球、集中、循环与爆发', enTitle: 'Defect Beginner Guide: Orbs, Focus, Cycling, and Burst Damage', zhDesc: '解释充能球体系如何从随机收益变成稳定计划。', enDesc: 'Turn orb generation from random value into a stable plan.', zhFocus: '集中、球位和循环速度共同决定上限。', enFocus: 'Focus, orb slots, and cycling speed define Defect ceiling together.' },
  { slug: 'watcher-beginner-guide', category: 'characters', zhTitle: '观者新手攻略：姿态切换、爆发回合与风险控制', enTitle: 'Watcher Beginner Guide: Stance Switching, Burst Turns, and Risk Control', zhDesc: '解释姿态爆发和风险回合管理，避免高伤害自爆。', enDesc: 'Manage stance burst and risk turns without dying to your own setup.', zhFocus: '观者的难点不是伤害，而是退出风险。', enFocus: 'Watcher usually has damage; the challenge is exiting danger safely.' },
  { slug: 'new-characters-guide', category: 'characters', zhTitle: '新角色入门攻略：如何快速理解《杀戮尖塔 2》的新增职业', enTitle: 'New Character Beginner Guide: How to Learn Slay the Spire 2’s New Classes', zhDesc: '给新增职业建立通用学习框架，便于后续扩展。', enDesc: 'A general learning framework for new Slay the Spire 2 classes.', zhFocus: '先识别资源系统，再判断输出方式。', enFocus: 'Identify the resource system first, then evaluate damage plans.' },
  { slug: 'character-tier-difficulty', category: 'characters', zhTitle: '全角色强度与上手难度排行：新手应该先玩谁？', enTitle: 'Character Tier List and Difficulty Ranking: Who Should Beginners Play First?', zhDesc: '按容错率、学习成本和通关稳定性评价角色。', enDesc: 'Ranks characters by forgiveness, learning cost, and clear stability.', zhFocus: '新手优先选择能教会基础决策的角色。', enFocus: 'Beginners should pick characters that teach fundamentals clearly.' },
  { slug: 'best-beginner-cards', category: 'cards', zhTitle: '新手最值得优先拿的卡牌：按角色拆解核心卡', enTitle: 'Best Cards for Beginners: Key Picks for Every Character', zhDesc: '列出各角色更适合新手理解和使用的核心卡牌类型。', enDesc: 'Core card types that are easier for beginners to use correctly by character.', zhFocus: '好新手卡通常是稳定、低条件、能立刻解决问题的卡。', enFocus: 'Good beginner cards are stable, low-condition, and solve immediate problems.' },
  { slug: 'evaluate-cards-by-deck', category: 'cards', zhTitle: '卡牌评级不是答案：如何根据当前卡组判断一张卡值不值得拿', enTitle: 'How to Evaluate Cards Based on Your Current Deck, Not Just Tier Lists', zhDesc: '用当前缺口、路线压力和终局需求修正卡牌评级。', enDesc: 'Adjust card ratings by current gaps, route pressure, and endgame needs.', zhFocus: '评级告诉你上限，当前牌组告诉你需求。', enFocus: 'Tier lists show ceiling; your deck shows need.' },
  { slug: 'essential-cards-to-understand', category: 'cards', zhTitle: '必须理解的 20 张核心卡牌：从单卡强度到卡组定位', enTitle: '20 Essential Cards to Understand: From Raw Power to Deck Identity', zhDesc: '用核心卡牌帮助玩家理解启动、防御、过牌和终结定位。', enDesc: 'Use essential cards to understand enablers, defense, draw, and finishers.', zhFocus: '理解核心牌，比背诵完整卡表更有价值。', enFocus: 'Understanding core cards is more useful than memorizing every card.' },
  { slug: 'cards-beginners-misuse', category: 'cards', zhTitle: '新手最容易误用的卡牌：看起来很强但可能拖垮卡组', enTitle: 'Cards Beginners Misuse: Powerful-Looking Picks That Can Weaken Your Deck', zhDesc: '解释高费、条件型和慢速卡牌为什么容易造成卡手。', enDesc: 'Why expensive, conditional, and slow cards can create dead hands.', zhFocus: '强效果如果太晚生效，就可能不是当前需要的答案。', enFocus: 'A powerful effect that arrives too late may not solve the current problem.' },
  { slug: 'relic-picking-guide', category: 'relics', zhTitle: '遗物选择指南：什么遗物值得围绕它改变打法？', enTitle: 'Relic Picking Guide: Which Relics Are Worth Building Around?', zhDesc: '判断遗物是否足以改变路线、拿牌和商店消费。', enDesc: 'Judge whether a relic should change pathing, card picks, and shop spending.', zhFocus: '能稳定触发并改变回合质量的遗物才值得围绕。', enFocus: 'Build around relics that reliably change turn quality.' },
  { slug: 'best-beginner-relics', category: 'relics', zhTitle: '新手最强遗物推荐：稳定通关优先级排行', enTitle: 'Best Relics for Beginners: Stability-Focused Ranking for First Clears', zhDesc: '优先推荐稳定收益、低理解成本和高容错遗物。', enDesc: 'Prioritizes stable, easy-to-use, forgiving relics for first clears.', zhFocus: '审核期文章应强调稳定价值，而非极限上限。', enFocus: 'For beginners, stable value beats rare high-roll ceilings.' },
  { slug: 'choose-boss-relics', category: 'relics', zhTitle: 'Boss 遗物怎么选？能量、限制与卡组需求的权衡', enTitle: 'How to Choose Boss Relics: Energy, Downsides, and Deck Needs', zhDesc: '解释 Boss 遗物选择中的能量收益和负面代价。', enDesc: 'Balance energy gains, restrictions, and current deck needs in boss relic picks.', zhFocus: '能量很强，但代价必须由当前牌组承担。', enFocus: 'Energy is powerful, but the current deck must be able to pay the downside.' },
  { slug: 'relic-card-synergy', category: 'relics', zhTitle: '遗物与卡牌协同入门：如何把小优势滚成胜势', enTitle: 'Relic and Card Synergy Guide: Turning Small Advantages into Winning Runs', zhDesc: '讲解如何通过遗物触发条件和卡牌结构扩大收益。', enDesc: 'Use relic triggers and card structure to turn small value into a win condition.', zhFocus: '协同不是凑关键词，而是让每回合质量变高。', enFocus: 'Synergy is not keyword matching; it improves turn quality.' },
  { slug: 'act-1-boss-guide', category: 'bosses', zhTitle: '第一层 Boss 完整攻略：行动模式、克制思路与备战清单', enTitle: 'Act 1 Boss Guide: Move Patterns, Counterplay, and Preparation Checklist', zhDesc: '说明第一层 Boss 前需要准备的伤害、防御和药水。', enDesc: 'Damage, block, potion, and deck checks before Act 1 bosses.', zhFocus: '第一层 Boss 检查的是基础输出和基础防御。', enFocus: 'Act 1 bosses test basic damage and basic defense.' },
  { slug: 'act-2-boss-guide', category: 'bosses', zhTitle: '第二层 Boss 完整攻略：为什么很多卡组会在这里崩盘', enTitle: 'Act 2 Boss Guide: Why Many Decks Fall Apart Here', zhDesc: '解释第二层对群体处理、成长速度和防御密度的压力。', enDesc: 'Act 2 pressures AoE, scaling speed, and defensive density.', zhFocus: '第二层惩罚只会打一层的临时牌组。', enFocus: 'Act 2 punishes decks that only solved Act 1.' },
  { slug: 'act-3-boss-guide', category: 'bosses', zhTitle: '第三层 Boss 完整攻略：终局卡组需要具备什么能力', enTitle: 'Act 3 Boss Guide: What Your Endgame Deck Must Be Able to Do', zhDesc: '整理终局 Boss 前卡组需要具备的输出、防御和持续能力。', enDesc: 'Endgame requirements for damage, defense, consistency, and scaling.', zhFocus: '终局卡组需要答案完整，而不是只有一个亮点。', enFocus: 'Endgame decks need a complete answer, not one impressive strength.' },
  { slug: 'elite-enemy-guide', category: 'bosses', zhTitle: '精英敌人攻略：什么时候该贪精英，什么时候必须避开', enTitle: 'Elite Enemy Guide: When to Fight Elites and When to Avoid Them', zhDesc: '用当前血量、药水、卡组质量和奖励需求判断精英风险。', enDesc: 'Judge elite risk through HP, potions, deck quality, and reward needs.', zhFocus: '精英是投资，不是每局都必须贪的奖励。', enFocus: 'Elites are investments, not mandatory greed.' },
  { slug: 'best-beginner-builds', category: 'builds', zhTitle: '最稳新手流派推荐：低操作、高容错的通关思路', enTitle: 'Best Beginner Builds: Safe, Forgiving Archetypes for First Clears', zhDesc: '推荐更容易成型、失误成本较低的新手通关流派。', enDesc: 'Safe archetypes that are easier to assemble and forgiving to pilot.', zhFocus: '新手流派要先稳定，再追求极限。', enFocus: 'Beginner builds should be stable before they are flashy.' },
  { slug: 'before-high-ascension-strategies', category: 'strategy', zhTitle: '高进阶前应该掌握的 10 个策略：从能通关到稳定通关', enTitle: '10 Strategies to Learn Before High Ascension: From Clearing to Winning Consistently', zhDesc: '从路线、跳牌、风险管理和复盘建立稳定胜率。', enDesc: 'Use pathing, skipping, risk management, and review habits to become consistent.', zhFocus: '稳定胜率来自少量高质量决策的反复累积。', enFocus: 'Consistency comes from repeatedly making a few high-quality decisions.' },
];

function makeSections(title: string, focus: string, locale: Locale): Array<{ heading: string; body: string }> {
  if (locale === 'zh') {
    return [
      {
        heading: '这篇攻略解决什么问题',
        body: `${title} 的核心目标是帮助玩家把零散经验变成可复用的判断流程。${focus}阅读时不要只记结论，更要观察每个选择背后的资源交换：血量、金币、牌组厚度、遗物触发和 Boss 准备都会影响最终答案。`,
      },
      {
        heading: '实战判断框架',
        body: '每一局都可以按三个问题复盘：当前卡组最缺什么能力，下一段路线会考验什么能力，拿到的新奖励是否能立刻改善这两个问题。能同时提升当前稳定性和终局上限的选择优先级最高；只能在理想条件下发挥的选择，需要已有抽牌、能量或遗物支持再考虑。',
      },
      {
        heading: '新手优先级',
        body: '审核期内容建议优先面向新手和回坑玩家，因此本页强调稳定、可解释、可复盘的打法。先保证第一层不因输出不足倒下，再补第二层需要的群体处理和防御密度，最后为终局 Boss 准备成长能力、过牌能力和爆发窗口。',
      },
      {
        heading: '下一步阅读',
        body: '读完本篇后，建议继续查看卡组构筑、路线选择、卡牌评估、遗物选择和 Boss 备战相关页面。把这些页面串起来阅读，能形成从开局选择到终局准备的完整内容路径，也能帮助搜索引擎理解本站不是单页工具，而是系统化攻略资料库。',
      },
    ];
  }

  return [
    {
      heading: 'What this guide solves',
      body: `${title} turns scattered run experience into a repeatable decision process. ${focus} Do not memorize only the conclusion; watch the resource trade behind each choice: HP, gold, deck size, relic triggers, and boss preparation all change the correct answer.`,
    },
    {
      heading: 'Practical decision framework',
      body: 'Review every run through three questions: what capability the deck currently lacks, what the next path segment will test, and whether the new reward improves either problem immediately. Picks that improve both short-term stability and endgame ceiling deserve priority; narrow high-roll options need draw, energy, or relic support first.',
    },
    {
      heading: 'Beginner priority',
      body: 'This content base is designed for beginners and returning players, so it favors stable, explainable, reviewable decisions. First make sure Act 1 does not beat you through low damage, then add the AoE and block density Act 2 demands, and finally prepare scaling, card flow, and burst windows for endgame bosses.',
    },
    {
      heading: 'What to read next',
      body: 'After this guide, continue with deckbuilding basics, map pathing, card evaluation, relic picking, and boss preparation. Reading those pages together creates a complete path from the first floor to the final boss and helps search engines understand this site as a structured strategy hub rather than a thin tool page.',
    },
  ];
}

export const coreArticles: CoreArticle[] = articleBlueprints.map((article, index) => ({
  slug: article.slug,
  category: article.category,
  priority: index + 1,
  title: { zh: article.zhTitle, en: article.enTitle },
  description: { zh: article.zhDesc, en: article.enDesc },
  keywords: {
    zh: ['杀戮尖塔2攻略', article.zhTitle.replace(/[《》：？]/g, ' ').split(' ')[0], '新手攻略'],
    en: ['Slay the Spire 2 guide', article.enTitle.split(':')[0], 'beginner guide'],
  },
  sections: {
    zh: makeSections(article.zhTitle, article.zhFocus, 'zh'),
    en: makeSections(article.enTitle, article.enFocus, 'en'),
  },
}));

export const categoryRoutes = ['guides', 'characters', 'bosses', 'strategy', 'resources'] as const;

export function getCategory(id: ContentCategoryId): ContentCategory {
  const category = contentCategories.find(item => item.id === id);
  if (!category) {
    throw new Error(`Unknown content category: ${id}`);
  }
  return category;
}

export function getArticlesByCategory(category: ContentCategoryId): CoreArticle[] {
  return coreArticles.filter(article => article.category === category).sort((a, b) => a.priority - b.priority);
}

export function getCoreArticle(slug: string): CoreArticle | undefined {
  return coreArticles.find(article => article.slug === slug);
}
```

- [x] **Step 2: Run type check/build to expose compile errors**

Run:

```bash
npm run lint
```

Expected: either PASS, or FAIL only with actionable TypeScript/ESLint errors in the new file. If it fails because the file is not referenced yet, continue; final validation happens after routes are added.

- [ ] **Step 3: Commit data foundation**

```bash
git add lib/data/content-pyramid.ts
git commit -m "feat: add content pyramid data"
```

## Task 2: Add Category Landing Pages

**Files:**
- Create: `app/[lang]/guides/page.tsx`
- Create: `app/[lang]/characters/page.tsx`
- Create: `app/[lang]/bosses/page.tsx`
- Create: `app/[lang]/strategy/page.tsx`
- Create: `app/[lang]/resources/page.tsx`

- [x] **Step 1: Create the beginner guides category page**

Create `app/[lang]/guides/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getArticlesByCategory, getCategory } from '@/lib/data/content-pyramid';
import { isLocale, type Locale } from '@/lib/i18n';

const categoryId = 'guides' as const;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;
  const category = getCategory(categoryId);
  return { title: category.title[lang], description: category.description[lang] };
}

export default async function GuidesPage({ params }: Props) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) notFound();
  const lang = rawLang as Locale;
  const category = getCategory(categoryId);
  const articles = getArticlesByCategory(categoryId);

  return <CategoryLanding lang={lang} category={category} articles={articles} />;
}

function CategoryLanding({ lang, category, articles }: { lang: Locale; category: ReturnType<typeof getCategory>; articles: ReturnType<typeof getArticlesByCategory> }) {
  return (
    <section className="space-y-10">
      <div className="max-w-4xl">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-ember-300">{lang === 'zh' ? '内容金字塔' : 'Content Pyramid'}</p>
        <h1 className="mt-3 text-4xl font-black text-bone-100">{category.title[lang]}</h1>
        <p className="mt-4 text-lg leading-8 text-bone-300">{category.description[lang]}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {category.sections.map(section => (
          <article key={section.title[lang]} className="rounded-2xl border border-blood-800/70 bg-spire-900/80 p-6">
            <h2 className="text-xl font-bold text-bone-100">{section.title[lang]}</h2>
            <ul className="mt-4 space-y-3 text-bone-300">
              {section.items[lang].map(item => <li key={item}>• {item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <div>
        <h2 className="text-2xl font-black text-bone-100">{lang === 'zh' ? '优先阅读文章' : 'Priority Articles'}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {articles.map(article => (
            <a key={article.slug} href={`/${lang}/articles/${article.slug}`} className="rounded-2xl border border-blood-900/70 bg-spire-950/70 p-5 transition hover:border-ember-300/50 hover:bg-blood-950/40">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-ember-300">#{article.priority}</p>
              <h3 className="mt-2 font-bold text-bone-100">{article.title[lang]}</h3>
              <p className="mt-2 text-sm leading-6 text-bone-300">{article.description[lang]}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [x] **Step 2: Create the character category page**

Create `app/[lang]/characters/page.tsx` by copying the exact `guides/page.tsx` content and changing only:

```ts
const categoryId = 'characters' as const;
```

- [x] **Step 3: Create the bosses category page**

Create `app/[lang]/bosses/page.tsx` by copying the exact `guides/page.tsx` content and changing only:

```ts
const categoryId = 'bosses' as const;
```

- [x] **Step 4: Create the strategy category page**

Create `app/[lang]/strategy/page.tsx` by copying the exact `guides/page.tsx` content and changing only:

```ts
const categoryId = 'strategy' as const;
```

- [x] **Step 5: Create the resources category page**

Create `app/[lang]/resources/page.tsx` by copying the exact `guides/page.tsx` content and changing only:

```ts
const categoryId = 'resources' as const;
```

- [x] **Step 6: Validate category pages**

Run:

```bash
npm run lint
```

Expected: PASS.

- [ ] **Step 7: Commit category pages**

```bash
git add app/[lang]/guides/page.tsx app/[lang]/characters/page.tsx app/[lang]/bosses/page.tsx app/[lang]/strategy/page.tsx app/[lang]/resources/page.tsx
git commit -m "feat: add guide category landing pages"
```

## Task 3: Add Dynamic Core Article Pages

**Files:**
- Create: `app/[lang]/articles/[slug]/page.tsx`

- [x] **Step 1: Create article route**

Create `app/[lang]/articles/[slug]/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { contentCategories, coreArticles, getArticlesByCategory, getCategory, getCoreArticle } from '@/lib/data/content-pyramid';
import { isLocale, locales, type Locale } from '@/lib/i18n';

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap(lang => coreArticles.map(article => ({ lang, slug: article.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  if (!isLocale(rawLang)) notFound();
  const article = getCoreArticle(slug);
  if (!article) notFound();
  const lang = rawLang as Locale;
  return {
    title: article.title[lang],
    description: article.description[lang],
    keywords: article.keywords[lang],
    alternates: {
      canonical: `/${lang}/articles/${article.slug}`,
      languages: {
        zh: `/zh/articles/${article.slug}`,
        en: `/en/articles/${article.slug}`,
      },
    },
    openGraph: {
      type: 'article',
      title: article.title[lang],
      description: article.description[lang],
      url: `/${lang}/articles/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { lang: rawLang, slug } = await params;
  if (!isLocale(rawLang)) notFound();
  const article = getCoreArticle(slug);
  if (!article) notFound();

  const lang = rawLang as Locale;
  const category = getCategory(article.category);
  const related = getArticlesByCategory(article.category).filter(item => item.slug !== article.slug).slice(0, 4);
  const secondaryCategories = contentCategories.filter(item => item.id !== article.category).slice(0, 4);

  return (
    <article className="space-y-10">
      <header className="rounded-[2rem] border border-blood-800/70 bg-spire-900/80 p-6 sm:p-8">
        <a href={`/${lang}/${category.href}`} className="text-sm font-bold text-ember-300 hover:text-ember-200">{category.title[lang]}</a>
        <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-bone-100">{article.title[lang]}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-bone-300">{article.description[lang]}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {article.keywords[lang].map(keyword => (
            <span key={keyword} className="rounded-full border border-ember-300/20 bg-ember-300/10 px-3 py-1 text-xs font-semibold text-ember-100">{keyword}</span>
          ))}
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-6">
          {article.sections[lang].map(section => (
            <section key={section.heading} className="rounded-2xl border border-blood-900/70 bg-spire-950/70 p-6">
              <h2 className="text-2xl font-black text-bone-100">{section.heading}</h2>
              <p className="mt-4 text-base leading-8 text-bone-300">{section.body}</p>
            </section>
          ))}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-blood-900/70 bg-spire-900/80 p-5">
            <h2 className="font-black text-bone-100">{lang === 'zh' ? '同栏目阅读' : 'Related Guides'}</h2>
            <div className="mt-4 space-y-3">
              {related.map(item => (
                <a key={item.slug} href={`/${lang}/articles/${item.slug}`} className="block rounded-xl border border-blood-900/60 bg-spire-950/70 p-3 text-sm font-semibold text-bone-200 hover:border-ember-300/40 hover:text-ember-100">{item.title[lang]}</a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-blood-900/70 bg-spire-900/80 p-5">
            <h2 className="font-black text-bone-100">{lang === 'zh' ? '内容栏目' : 'Content Sections'}</h2>
            <div className="mt-4 space-y-3">
              {secondaryCategories.map(item => (
                <a key={item.id} href={`/${lang}/${item.href}`} className="block rounded-xl border border-blood-900/60 bg-spire-950/70 p-3 text-sm font-semibold text-bone-200 hover:border-ember-300/40 hover:text-ember-100">{item.title[lang]}</a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}
```

- [x] **Step 2: Validate article pages**

Run:

```bash
npm run lint
```

Expected: PASS.

- [x] **Step 3: Build static routes**

Run:

```bash
npm run build
```

Expected: PASS and includes `/zh/articles/...` and `/en/articles/...` static routes in the build output.

- [ ] **Step 4: Commit article pages**

```bash
git add app/[lang]/articles/[slug]/page.tsx
git commit -m "feat: add core article pages"
```

## Task 4: Add Navigation and Homepage Entry Points

**Files:**
- Modify: `app/[lang]/layout.tsx`
- Modify: `app/[lang]/page.tsx`

- [x] **Step 1: Update navigation items**

In `app/[lang]/layout.tsx`, replace the `navItems` constant with:

```ts
const navItems = {
  zh: [
    { label: '新手指南', href: 'guides' },
    { label: '职业攻略', href: 'characters' },
    { label: '卡牌图鉴', href: 'cards' },
    { label: '遗物数据', href: 'relics' },
    { label: '通关流派', href: 'builds' },
    { label: 'Boss 机制', href: 'bosses' },
    { label: '进阶策略', href: 'strategy' },
  ],
  en: [
    { label: 'Beginner', href: 'guides' },
    { label: 'Characters', href: 'characters' },
    { label: 'Cards', href: 'cards' },
    { label: 'Relics', href: 'relics' },
    { label: 'Builds', href: 'builds' },
    { label: 'Bosses', href: 'bosses' },
    { label: 'Strategy', href: 'strategy' },
  ],
} satisfies Record<Locale, Array<{ label: string; href: string }>>;
```

- [x] **Step 2: Import content data on homepage**

At the top of `app/[lang]/page.tsx`, add:

```ts
import { contentCategories, coreArticles } from '@/lib/data/content-pyramid';
```

- [x] **Step 3: Add homepage content pyramid section**

In `app/[lang]/page.tsx`, after the hero section and before the existing modules section, insert:

```tsx
      <section aria-labelledby="content-pyramid-title" className="rounded-[2rem] border border-blood-900/70 bg-spire-900/70 p-6 sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-ember-300">
            {lang === 'zh' ? 'AdSense 审核优先内容' : 'AdSense-ready editorial base'}
          </p>
          <h2 id="content-pyramid-title" className="mt-3 text-3xl font-black text-bone-100">
            {lang === 'zh' ? '从新手到高进阶的内容金字塔' : 'A content pyramid from beginner to high ascension'}
          </h2>
          <p className="mt-3 leading-7 text-bone-300">
            {lang === 'zh'
              ? '先用原创长文建立攻略深度，再用卡牌、遗物、流派和工具页面承接搜索流量。'
              : 'Original long-form guides establish depth first, while card, relic, build, and tool pages capture search demand.'}
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contentCategories.slice(0, 6).map(category => (
            <a key={category.id} href={`/${lang}/${category.href}`} className="rounded-2xl border border-blood-900/70 bg-spire-950/70 p-5 transition hover:border-ember-300/40 hover:bg-blood-950/40">
              <h3 className="font-black text-bone-100">{category.title[lang]}</h3>
              <p className="mt-2 text-sm leading-6 text-bone-300">{category.description[lang]}</p>
            </a>
          ))}
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-black text-bone-100">{lang === 'zh' ? '优先撰写的核心文章' : 'Priority Core Articles'}</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {coreArticles.slice(0, 10).map(article => (
              <a key={article.slug} href={`/${lang}/articles/${article.slug}`} className="rounded-xl border border-blood-900/70 bg-black/25 px-4 py-3 text-sm font-semibold text-bone-200 transition hover:border-ember-300/40 hover:text-ember-100">
                {article.priority}. {article.title[lang]}
              </a>
            ))}
          </div>
        </div>
      </section>
```

- [x] **Step 4: Validate homepage and navigation**

Run:

```bash
npm run lint
```

Expected: PASS.

- [ ] **Step 5: Commit navigation/homepage updates**

```bash
git add app/[lang]/layout.tsx app/[lang]/page.tsx
git commit -m "feat: surface content pyramid navigation"
```

## Task 5: Add Contextual Links to Existing Database Pages

**Files:**
- Modify: `app/[lang]/cards/page.tsx`
- Modify: `app/[lang]/relics/page.tsx`
- Modify: `app/[lang]/builds/page.tsx`

- [x] **Step 1: Add card page imports**

At the top of `app/[lang]/cards/page.tsx`, add:

```ts
import { getArticlesByCategory } from '@/lib/data/content-pyramid';
```

After `const cards = await loadCards();`, add:

```ts
  const relatedArticles = getArticlesByCategory('cards').slice(0, 4);
```

- [x] **Step 2: Add card page related links block**

In `app/[lang]/cards/page.tsx`, before the `<div className="space-y-3">` that renders the card filter, insert:

```tsx
      <div className="rounded-lg border border-blood-900/70 bg-spire-900/70 p-6">
        <h2 className="text-xl font-semibold text-bone-100">{zh ? '卡牌攻略阅读' : 'Card Strategy Reading'}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {relatedArticles.map(article => (
            <a key={article.slug} href={`/${lang}/articles/${article.slug}`} className="rounded border border-blood-900/70 bg-spire-950/60 px-4 py-3 text-sm font-semibold text-bone-200 hover:border-ember-300/40 hover:text-ember-100">
              {article.title[lang]}
            </a>
          ))}
        </div>
      </div>
```

- [x] **Step 3: Add relic page imports and related links**

At the top of `app/[lang]/relics/page.tsx`, add:

```ts
import { getArticlesByCategory } from '@/lib/data/content-pyramid';
```

After `const zh = lang === 'zh';`, add:

```ts
  const relatedArticles = getArticlesByCategory('relics').slice(0, 4);
```

Before the relic filter block, insert:

```tsx
      <div className="rounded-lg border border-blood-900/70 bg-spire-900/70 p-6">
        <h2 className="text-xl font-semibold text-bone-100">{zh ? '遗物攻略阅读' : 'Relic Strategy Reading'}</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {relatedArticles.map(article => (
            <a key={article.slug} href={`/${lang}/articles/${article.slug}`} className="rounded border border-blood-900/70 bg-spire-950/60 px-4 py-3 text-sm font-semibold text-bone-200 hover:border-ember-300/40 hover:text-ember-100">
              {article.title[lang]}
            </a>
          ))}
        </div>
      </div>
```

- [x] **Step 4: Add builds page intro links**

At the top of `app/[lang]/builds/page.tsx`, add:

```ts
import { getArticlesByCategory } from '@/lib/data/content-pyramid';
```

After `const tierList = buildTierListData(cards);`, add:

```ts
  const guideLinks = [...getArticlesByCategory('builds'), ...getArticlesByCategory('strategy')].slice(0, 4);
```

Replace the `return` block with:

```tsx
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-blood-900/70 bg-spire-900/70 p-6">
        <h1 className="text-3xl font-black text-bone-100">{lang === 'zh' ? '通关流派与强度天梯榜' : 'Builds and Tier List'}</h1>
        <p className="mt-3 max-w-3xl leading-7 text-bone-300">
          {lang === 'zh'
            ? '先阅读稳定通关、费用曲线和高进阶策略，再用天梯榜快速定位当前版本的核心构筑。'
            : 'Start with stable builds, cost curve, and high-ascension strategy, then use the tier list to identify current core archetypes.'}
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {guideLinks.map(article => (
            <a key={article.slug} href={`/${lang}/articles/${article.slug}`} className="rounded-xl border border-blood-900/70 bg-spire-950/60 px-4 py-3 text-sm font-semibold text-bone-200 hover:border-ember-300/40 hover:text-ember-100">
              {article.title[lang]}
            </a>
          ))}
        </div>
      </section>
      <TierListBoard initialLang={lang as Locale} meta={tierList.meta} entries={tierList.entries} />
    </div>
  );
```

- [x] **Step 5: Validate database page links**

Run:

```bash
npm run lint
```

Expected: PASS.

- [ ] **Step 6: Commit contextual links**

```bash
git add app/[lang]/cards/page.tsx app/[lang]/relics/page.tsx app/[lang]/builds/page.tsx
git commit -m "feat: link databases to editorial guides"
```

## Task 6: Update Sitemap for New Content

**Files:**
- Modify: `app/sitemap.ts`

- [x] **Step 1: Import content routes**

At the top of `app/sitemap.ts`, add:

```ts
import { categoryRoutes, coreArticles } from '@/lib/data/content-pyramid';
```

- [x] **Step 2: Add category and article entries**

After `const cardKeys = loadCardKeys();`, add:

```ts
  const categoryEntries: MetadataRoute.Sitemap = categoryRoutes.flatMap(route =>
    LOCALES.map(lang => ({
      url: `${SITE_URL}/${lang}/${route}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: localizedAlternates(`/${route}`),
    })),
  );

  const articleEntries: MetadataRoute.Sitemap = coreArticles.flatMap(article =>
    LOCALES.map(lang => ({
      url: `${SITE_URL}/${lang}/articles/${article.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: article.priority <= 10 ? 0.9 : 0.8,
      alternates: localizedAlternates(`/articles/${article.slug}`),
    })),
  );
```

Replace the final return with:

```ts
  return [...homeEntries, ...categoryEntries, ...articleEntries, ...cardEntries];
```

- [x] **Step 3: Validate sitemap**

Run:

```bash
npm run lint
npm run build
```

Expected: both PASS. Build output should include the new category routes and article routes.

- [ ] **Step 4: Commit sitemap update**

```bash
git add app/sitemap.ts
git commit -m "feat: add guide content to sitemap"
```

## Task 7: Manual Verification

**Files:**
- No code changes unless verification finds a bug.

- [x] **Step 1: Start the app**

Run:

```bash
npm run dev
```

Expected: local Next.js dev server starts successfully.

- [ ] **Step 2: Visit critical pages in browser**

Open these pages:

```text
http://localhost:3000/zh
http://localhost:3000/zh/guides
http://localhost:3000/zh/articles/beginner-guide-first-clear
http://localhost:3000/en/articles/beginner-guide-first-clear
http://localhost:3000/zh/cards
http://localhost:3000/zh/relics
http://localhost:3000/zh/builds
```

Expected:
- Pages render without 404.
- Header navigation includes the new editorial categories.
- Article pages show title, description, body sections, related links, and category links.
- Cards/relics/builds pages show editorial links above existing database/tool content.
- Mobile nav still opens and contains the new items.

- [ ] **Step 3: Stop dev server**

Stop the running dev server with `Ctrl+C`.

- [ ] **Step 4: Final status check**

Run:

```bash
git status --short
```

Expected: clean working tree if all commits were made.

## Self-Review

- Spec coverage: The plan covers the requested AdSense-first content pyramid, core category pages, and 30 bilingual core article topics with renderable article pages.
- Placeholder scan: No `TBD`, `TODO`, or undefined future steps are present.
- Type consistency: The route IDs used in pages match `ContentCategoryId`; article slugs come from `coreArticles`; locale values use the existing `Locale` type.
