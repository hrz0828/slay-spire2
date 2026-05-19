import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';

type Props = {
  params: Promise<{
    lang: string;
  }>;
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
  modules: Array<{
    title: string;
    description: string;
    href: string;
  }>;
  intelTitle: string;
  intelItems: string[];
};

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
    modulesTitle: '冲塔情报模块',
    modulesDescription: '把攻略、图鉴、天梯榜和工具整合成一个适合副屏使用的资料站。',
    modules: [
      {
        title: '全职卡牌库',
        description: '按职业检索核心牌、启动件与终结组件，快速定位构筑所需卡牌。',
        href: 'cards',
      },
      {
        title: '神装遗物数据',
        description: '整理遗物收益、触发场景与构筑联动，方便跑图时判断优先级。',
        href: 'relics',
      },
      {
        title: '强度天梯榜',
        description: '聚焦死灵术士流派、进阶20卡组推荐与高胜率核心路线。',
        href: 'builds',
      },
      {
        title: '硬核攻略工具',
        description: '提供轻量计算与路线判断入口，为 Boss、事件和资源分配服务。',
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
    modulesTitle: 'Run Intel Modules',
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
      canonical: `/${lang}`,
      languages: {
        zh: '/zh',
        en: '/en',
        'x-default': '/zh',
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: lang === 'zh' ? ['en_US'] : ['zh_CN'],
      title: content.title,
      description: content.description,
      url: `/${lang}`,
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
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-[2rem] border border-rose-900/70 bg-black/35 px-5 py-10 shadow-[0_0_80px_rgba(136,19,55,0.22)] sm:px-8 lg:px-12 lg:py-16">
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
                href={`/${lang}/cards`}
                className="rounded-full bg-gradient-to-r from-amber-200 to-yellow-500 px-5 py-3 text-sm font-black text-[#1b0b05] shadow-[0_0_28px_rgba(245,158,11,0.35)] hover:scale-[1.02]"
              >
                {content.primaryCta}
              </a>
              <a
                href={`/${lang}/builds`}
                className="rounded-full border border-rose-500/50 bg-rose-950/40 px-5 py-3 text-sm font-bold text-rose-100 hover:border-amber-300/60 hover:text-amber-100"
              >
                {content.secondaryCta}
              </a>
            </div>
          </div>

          <aside className="rounded-3xl border border-amber-300/20 bg-[#120606]/80 p-5 shadow-inner shadow-black/60" aria-label={content.keywordLabel}>
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

      <section aria-labelledby="modules-title">
        <div className="mb-6 max-w-3xl">
          <h2 id="modules-title" className="text-2xl font-black text-slate-100 sm:text-3xl">
            {content.modulesTitle}
          </h2>
          <p className="mt-3 leading-7 text-slate-400">{content.modulesDescription}</p>
        </div>

        <nav className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={content.modulesTitle}>
          {content.modules.map(module => (
            <a
              key={module.href}
              href={`/${lang}/${module.href}`}
              className="group rounded-2xl border border-rose-900/70 bg-[#120606]/75 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.24)] hover:-translate-y-1 hover:border-amber-300/45 hover:bg-rose-950/40"
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
      </section>

      <section aria-labelledby="intel-title" className="rounded-3xl border border-rose-950/80 bg-black/25 p-6 sm:p-8">
        <h2 id="intel-title" className="text-2xl font-black text-slate-100">
          {content.intelTitle}
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {content.intelItems.map((item, index) => (
            <article key={item} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 p-5">
              <p className="text-sm font-black text-rose-500">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 leading-7 text-slate-300">{item}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
