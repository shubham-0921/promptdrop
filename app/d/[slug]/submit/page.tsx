import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseServer } from '@/lib/supabase/server';
import { ResultSubmitForm } from '@/components/results/ResultSubmitForm';

interface PageProps { params: Promise<{ slug: string }> }

export default async function SubmitPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = getSupabaseServer();

  const { data: prompt } = await supabase
    .from('prompts').select('id, title').eq('slug', slug).single();

  if (!prompt) notFound();

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-xl px-4 py-10">

        {/* Nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="pixel text-xs text-[var(--yellow)]">PROMPTDROP</Link>
          <Link href={`/d/${slug}`} className="btn btn-secondary btn-sm">← Back</Link>
        </div>

        {/* Prompt label */}
        <div className="card border-[var(--yellow)] px-4 py-3 mb-5">
          <p className="label mb-1">Prompt</p>
          <p className="text-sm font-mono text-[var(--text)] font-bold line-clamp-2">{prompt.title}</p>
        </div>

        {/* Form card */}
        <div className="card card-y p-6 fade-up">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b-2 border-dashed border-[var(--border)]">
            <span className="text-[var(--yellow)] font-mono text-sm font-bold">▶</span>
            <span className="label text-[var(--text)]">Submit Your Result</span>
          </div>
          <ResultSubmitForm promptId={prompt.id} slug={slug} />
        </div>
      </div>
    </div>
  );
}
