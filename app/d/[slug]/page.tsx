import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabase/server';
import { AISelector } from '@/components/ai/AISelector';
import { ResultsWall } from '@/components/results/ResultsWall';
import { CopyLinkButton } from '@/components/share/CopyLinkButton';

const CATEGORY_COLORS: Record<string, string> = {
  personality: 'border-[var(--pink)]  text-[var(--pink)]',
  creative:    'border-[var(--yellow)] text-[var(--yellow)]',
  trivia:      'border-[var(--cyan)]   text-[var(--cyan)]',
  wildcard:    'border-[var(--green)]  text-[var(--green)]',
};

interface PageProps { params: Promise<{ slug: string }> }

export default async function DropPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = getSupabaseServer();

  const { data: prompt } = await supabase
    .from('prompts').select('*').eq('slug', slug).single();

  if (!prompt) notFound();
  await supabase.rpc('increment_view_count', { p_slug: slug });

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-10">

        {/* Nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="pixel text-xs text-[var(--yellow)]">PROMPTDROP</Link>
          <CopyLinkButton label="Copy Link" />
        </div>

        {/* Prompt card */}
        <div className="card card-y p-5 mb-5 fade-up">
          <div className="flex items-center gap-3 mb-4">
            <span className={`border-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest font-mono ${CATEGORY_COLORS[prompt.category] ?? 'border-[var(--border-hard)] text-[var(--text-muted)]'}`}>
              {prompt.category}
            </span>
            <span className="text-[var(--text-muted)] font-mono text-[11px]">
              {prompt.view_count} views
            </span>
          </div>
          <p className="text-base font-bold text-[var(--text)] font-mono leading-relaxed">
            {prompt.title}
          </p>
          {prompt.body !== prompt.title && (
            <p className="mt-3 text-sm text-[var(--text-muted)] font-mono whitespace-pre-wrap leading-relaxed border-l-2 border-[var(--border-hard)] pl-3">
              {prompt.body}
            </p>
          )}
        </div>

        {/* AI selector */}
        <div className="card card-c p-5 mb-8 fade-up">
          <p className="label mb-4">▶ Choose your AI</p>
          <AISelector promptBody={prompt.body} slug={slug} />
        </div>

        {/* Results divider */}
        <div className="flex items-center gap-3 mb-5">
          <hr className="retro-divider flex-1" />
          <span className="label">Results Wall</span>
          <hr className="retro-divider flex-1" />
        </div>

        <ResultsWall promptId={prompt.id} slug={slug} hideResults={prompt.hide_results} />
      </div>
    </div>
  );
}
