import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  contentCategories,
  coreArticles,
  getCategory,
} from '@/lib/data/content-pyramid';
import { isLocale, type Locale } from '@/lib/i18n';
import { localizedAlternates, localizedPath } from '@/lib/routes';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

type ContentPyramidContent = {
  eyebrow: string;
  title: string;
  description: string;
  coreTitle: string;
  coreAriaLabel: string;
};

type HomeContent = {
  title: string;
  description: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  keywordLabel: string;
  modulesTitle: string;
  modulesDescription: string;
  modules: {
    title: string;
    description: string;
    href: string;
  }[];
  intelTitle: string;
  intelItems: string[];
};

const contentPyramidContent = {
  zh: {
    eyebrow: '从开局到高进阶',
    title: '按当前局面找到下一步答案',
    description:
      '先用新手指南建立稳定通关思路，再通过职业攻略、Boss 机制和进阶策略拆解每一层的关键检查点；查卡、看遗物和用工具复盘时，都能回到同一套判断框架。',
    coreTitle: '新手先读这些',
    coreAriaLabel: '新手推荐核心文章列表',
  },
  en: {
    eyebrow: 'From first run to high ascension',
    title: 'Find the next answer for your current run',
    description:
      'Start with beginner guides for stable clears, then use character guides, boss mechanics and advanced strategy to understand each floor check. Card lookup, relic review and tools all connect back to the same decision framework.',
    coreTitle: 'Start Here',
    coreAriaLabel: 'Beginner recommended articles list',
  },
} satisfies Record<Locale, ContentPyramidContent>;

const homeContent = {
  zh: {
    title: '杀戮尖塔2攻略｜死灵术士流派、进阶20卡组推荐与图鉴工具站',
    description:
      '杀戮尖塔2攻略站，覆盖死灵术士流派、进阶20卡组推荐、卡牌遗物图鉴、强度天梯榜与 Act 4 路线规划，适合 EA 版本玩家查表、复盘与构筑。',
    keywords: [
      '杀戮尖塔2攻略',
      '杀戮尖塔2死灵术士流派',
      '进阶20卡组推荐',
      '杀戮尖塔2图鉴工具站',
    ],
    eyebrow: '2026 EA 版本攻略中枢',
    h1: '杀戮尖塔2攻略、死灵术士流派与进阶20卡组推荐',
    lead: '从卡牌、遗物、职业构筑到强度天梯榜，围绕 EA 版本核心环境整理可执行的冲塔情报，帮助你更快判断路线、成型节奏与关键战斗窗口。',
    primaryCta: '查看卡牌图鉴',
    secondaryCta: '打开强度天梯榜',
    keywordLabel: '核心检索词',
    modulesTitle: '冲塔情报站',
    modulesDescription: '跑图时把本站放在副屏：先查卡牌和遗物，再对照流派强度与工具结果，快速判断这一次奖励、路线或 Boss 准备该怎么选。',
    modules: [
      {
        title: '全职卡牌库',
        description: '按职业、费用和定位查卡牌，确认当前奖励是在补伤害、防御、过牌，还是在为核心流派找启动件。',
        href: 'cards',
      },
      {
        title: '神装遗物数据',
        description: '查看遗物触发条件、收益节奏和适配流派，拿到关键遗物后更容易决定接下来该走哪条路线。',
        href: 'relics',
      },
      {
        title: '强度天梯榜',
        description: '用强度分级快速校准死灵术士流派、进阶20核心牌和常见构筑，避免只凭单张牌评级硬凑方向。',
        href: 'builds',
      },
      {
        title: '硬核攻略工具',
        description: '用路线风险、删牌收益和 Boss 斩杀窗估算关键选择，减少精英、商店、营火和药水判断里的盲区。',
        href: 'tools',
      },
    ],
    intelTitle: '当前重点追踪',
    intelItems: [
      '死灵术士召唤爆发、尸体资源与后期爆发窗口。',
      '进阶20环境下的启动卡、过渡牌与 Boss 战容错。',
      'Act 4 关键战前准备：遗物、药水、伤害与防御曲线。',
    ],
  },
  en: {
    title: 'Slay the Spire 2 Wiki｜StS2 Necrobinder Build, Act 4 Boss Guide & Tier List',
    description:
      'A bilingual Slay the Spire 2 wiki for EA players, covering StS2 Necrobinder build paths, Act 4 boss guide planning, card and relic references, and an updated StS2 Tier List.',
    keywords: [
      'Slay the Spire 2 wiki',
      'StS2 Necrobinder build',
      'Act 4 boss guide',
      'StS2 Tier List',
    ],
    eyebrow: '2026 EA Guide Hub',
    h1: 'Slay the Spire 2 Wiki, StS2 Necrobinder Build and Tier List',
    lead: 'A fast second-screen reference for cards, relics, archetypes and route planning, built around the current EA meta so you can evaluate deck direction, scaling windows and boss preparation faster.',
    primaryCta: 'Browse Cards',
    secondaryCta: 'Open Tier List',
    keywordLabel: 'Search targets',
    modulesTitle: 'Run Intel Hub',
    modulesDescription: 'Guides, references, tier data and tools organized for quick decisions during a run.',
    modules: [
      {
        title: 'Card Database',
        description: 'Filter class cards, starters, enablers and finishers for practical build planning.',
        href: 'cards',
      },
      {
        title: 'Artifact Data',
        description: 'Compare relic value, trigger timing and archetype synergy before committing resources.',
        href: 'relics',
      },
      {
        title: 'StS2 Tier List',
        description: 'Track Necrobinder builds, high-ascension deck cores and reliable winning routes.',
        href: 'builds',
      },
      {
        title: 'Hardcore Guides',
        description: 'Use lightweight tools for boss prep, route evaluation and run-by-run decisions.',
        href: 'tools',
      },
    ],
    intelTitle: 'Current Focus',
    intelItems: [
      'Necrobinder summon burst lines, corpse economy and late-fight scaling windows.',
      'Ascension-style deck cores, transition cards and boss-fight safety margins.',
      'Act 4 boss guide prep: relic checks, potion planning, damage curve and block curve.',
    ],
  },
} satisfies Record<Locale, HomeContent>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  const lang = rawLang as Locale;
  const content = homeContent[lang];

  return {
    title: content.title,
    description: content.description,
    keywords: content.keywords,
    alternates: {
      canonical: localizedPath(lang),
      languages: {
        ...localizedAlternates(),
        'x-default': localizedPath('zh'),
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: lang === 'zh' ? ['en_US'] : ['zh_CN'],
      title: content.title,
      description: content.description,
      url: localizedPath(lang),
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.description,
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  const lang = rawLang as Locale;
  const content = homeContent[lang];

  return (
    <div className="space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-rose-900/70 bg-black/35 px-5 py-10 shadow-[0_0_80px_rgba(136,19,55,0.22)] sm:px-8 lg:px-12 lg:py-14">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(251,191,36,0.22),transparent_22rem),radial-gradient(circle_at_80%_20%,rgba(225,29,72,0.18),transparent_20rem)]" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-amber-300/10 bg-rose-950/20 blur-2xl" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-amber-200">
              {content.eyebrow}
            </p>
            <h1 className="max-w-4xl bg-gradient-to-r from-amber-100 via-yellow-400 to-rose-500 bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl lg:text-6xl">
              {content.h1}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {content.lead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={localizedPath(lang, 'cards')}
                className="rounded-full bg-gradient-to-r from-amber-200 to-yellow-500 px-5 py-3 text-sm font-black text-[#1b0b05] shadow-[0_0_28px_rgba(245,158,11,0.35)] hover:scale-[1.02]"
              >
                {content.primaryCta}
              </a>
              <a
                href={localizedPath(lang, 'builds')}
                className="rounded-full border border-rose-500/50 bg-rose-950/40 px-5 py-3 text-sm font-bold text-rose-100 hover:border-amber-300/60 hover:text-amber-100"
              >
                {content.secondaryCta}
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-amber-300/20 bg-[#120606]/80 p-5 shadow-inner shadow-black/60" aria-label={content.keywordLabel}>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-rose-500">
              {content.keywordLabel}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.keywords.map(keyword => (
                <span
                  key={keyword}
                  className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-xs font-semibold text-amber-100"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="modules-title" className="rounded-3xl border border-rose-900/70 bg-[#120606]/65 p-5 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 id="modules-title" className="text-2xl font-black text-slate-100 sm:text-3xl">
              {content.modulesTitle}
            </h2>
            <p className="mt-3 leading-7 text-slate-400">{content.modulesDescription}</p>
          </div>

          <nav className="grid gap-3 sm:grid-cols-2" aria-label={content.modulesTitle}>
          {content.modules.map(module => (
            <a
              key={module.href}
              href={localizedPath(lang, module.href)}
              className="group flex min-h-40 flex-col rounded-xl border border-rose-900/70 bg-black/25 p-5 shadow-[0_14px_34px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:border-amber-300/45 hover:bg-rose-950/40"
            >
              <h3 className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-lg font-black text-transparent">
                {module.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400 group-hover:text-slate-300">
                {module.description}
              </p>
            </a>
          ))}
          </nav>
        </div>
      </section>

      <section aria-labelledby="intel-title" className="rounded-3xl border border-rose-900/70 bg-[#120606]/65 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="intel-title" className="text-2xl font-black text-slate-100">
            {content.intelTitle}
          </h2>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {content.intelItems.map((item, index) => (
            <article key={item} className="min-h-36 rounded-xl border border-rose-900/60 bg-black/25 p-5">
              <p className="text-sm font-black text-rose-500">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 leading-7 text-slate-300">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="content-pyramid-title" className="rounded-3xl border border-rose-900/70 bg-[#120606]/65 p-5 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
          <div>
            <p className="mb-3 inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-amber-200">
              {contentPyramidContent[lang].eyebrow}
            </p>
            <h2 id="content-pyramid-title" className="max-w-3xl text-2xl font-black text-slate-100">
              {contentPyramidContent[lang].title}
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-400">
              {contentPyramidContent[lang].description}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {contentCategories.slice(0, 6).map(category => (
                <a
                  key={category.id}
                  href={localizedPath(lang, category.href)}
                  className="group min-h-32 rounded-xl border border-rose-900/65 bg-black/25 p-4 transition hover:-translate-y-0.5 hover:border-amber-300/45 hover:bg-rose-950/35"
                >
                  <h3 className="text-base font-black text-amber-100 group-hover:text-amber-200">
                    {category.title[lang]}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400 group-hover:text-slate-300">
                    {category.description[lang]}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <aside className="rounded-xl border border-rose-900/65 bg-black/25 p-4">
            <h3 className="text-base font-black text-slate-100">
              {contentPyramidContent[lang].coreTitle}
            </h3>
            <nav className="mt-3 grid gap-2" aria-label={contentPyramidContent[lang].coreAriaLabel}>
              {coreArticles.slice(0, 5).map((article, index) => (
                <a
                  key={article.slug}
                  href={localizedPath(lang, `articles/${article.slug}`)}
                  className="group rounded-xl border border-rose-900/50 bg-rose-950/15 p-3 transition hover:border-amber-300/40 hover:bg-rose-950/35"
                >
                  <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] text-rose-500 group-hover:text-amber-300">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm font-bold leading-6 text-slate-200 group-hover:text-amber-100">
                    {article.title[lang]}
                  </p>
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </section>
    </div>
  );
}
