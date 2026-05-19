import { getDictionary, isLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function HomePage({ params }: Props) {
  const { lang: rawLang } = await params;
  if (!isLocale(rawLang)) {
    notFound();
  }

  const lang = rawLang as Locale;
  const dict = await getDictionary(lang);
  const alternateLang = lang === 'zh' ? 'en' : 'zh';
  const sections = [
    ['cards', dict.home.sections.cards],
    ['relics', dict.home.sections.relics],
    ['builds', dict.home.sections.builds],
    ['tools', dict.home.sections.tools],
  ] as const;

  return (
    <div className="space-y-12">
      <section className="max-w-3xl py-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-ember-400">
            {dict.home.eyebrow}
          </p>
          <a
            href={`/${alternateLang}`}
            className="rounded border border-blood-800/80 bg-spire-900/80 px-3 py-1.5 text-sm font-medium text-bone-200 hover:border-ember-400/80 hover:text-ember-300"
          >
            {dict.home.languageSwitch}
          </a>
        </div>
        <h1 className="text-4xl font-bold leading-tight text-bone-100 sm:text-5xl">
          {dict.home.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-bone-300">
          {dict.home.description}
        </p>
      </section>

      <section aria-labelledby="planning-title">
        <div className="mb-5 max-w-2xl">
          <h2 id="planning-title" className="text-2xl font-semibold text-bone-100">
            {dict.home.planningTitle}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {dict.home.planningItems.map((item, index) => (
            <article
              key={item}
              className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-5"
            >
              <p className="text-sm font-semibold text-ember-300">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="mt-3 leading-7 text-bone-300">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="modules-title">
        <div className="mb-5 max-w-2xl">
          <h2 id="modules-title" className="text-2xl font-semibold text-bone-100">
            {dict.home.cardsTitle}
          </h2>
          <p className="mt-2 text-bone-300">{dict.home.cardsDescription}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(([href, label]) => (
            <a
              key={href}
              href={`/${lang}/${href}`}
              className="rounded-lg border border-blood-800/70 bg-spire-900/80 p-5 shadow-ember hover:border-ember-400/80"
            >
              <h3 className="font-semibold text-ember-300">{label}</h3>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
