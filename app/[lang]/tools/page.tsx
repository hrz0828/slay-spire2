import type { Metadata } from 'next';
import { isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import ToolsCalculators from './ToolsCalculators';

export const metadata: Metadata = {
  title: 'Tools',
};

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) {
    notFound();
  }

  const zh = lang === 'zh';
  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-bone-100">{zh ? '实用工具' : 'Tools'}</h1>
        <p className="mt-3 text-bone-300">
          {zh
            ? '把当前血量、药水、牌组厚度和 Boss 血量填进去，快速估算路线风险、删牌收益和斩杀回合，方便跑图时做取舍。'
            : 'Interactive planning calculators for in-run decisions and faster route choices.'}
        </p>
      </div>

      <ToolsCalculators lang={lang} />
    </section>
  );
}
