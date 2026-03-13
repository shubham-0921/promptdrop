'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Prompt } from '@/types';
import { useCreatorSlugs } from '@/hooks/useCreatorToken';
import { CopyLinkButton } from '@/components/share/CopyLinkButton';

interface PromptWithCount extends Prompt { resultCount: number }

const CATEGORY_COLORS: Record<string, string> = {
  personality: 'border-[var(--pink)]  text-[var(--pink)]',
  creative:    'border-[var(--yellow)] text-[var(--yellow)]',
  trivia:      'border-[var(--cyan)]   text-[var(--cyan)]',
  wildcard:    'border-[var(--green)]  text-[var(--green)]',
};

export default function MyDropsPage() {
  const slugs = useCreatorSlugs();
  const [drops, setDrops] = useState<PromptWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slugs.length === 0) { setLoading(false); return; }
    Promise.all(
      slugs.map(async slug => {
        const promptRes = await fetch(`/api/prompts/${slug}`);
        if (!promptRes.ok) return null;
        const prompt: Prompt = await promptRes.json();
        const rRes = await fetch(`/api/results?prompt_id=${prompt.id}`);
        const results = rRes.ok ? await rRes.json() : [];
        return { ...prompt, resultCount: results.length };
      })
    ).then(r => { setDrops(r.filter(Boolean) as PromptWithCount[]); setLoading(false); });
  }, [slugs]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 py-10">

        {/* Nav */}
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="pixel text-xs text-[var(--yellow)]">PROMPTDROP</Link>
          <Link href="/" className="btn btn-secondary btn-sm">+ New Drop</Link>
        </div>

        <h1 className="label text-base text-[var(--text)] mb-6">My Drops</h1>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 border-2 border-[var(--border)] animate-pulse" />
            ))}
          </div>
        ) : drops.length === 0 ? (
          <div className="card border-dashed py-16 text-center">
            <p className="text-3xl mb-4">🎮</p>
            <p className="label mb-4">No drops yet</p>
            <Link href="/" className="btn btn-primary btn-md">Create your first drop →</Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {drops.map((drop, i) => (
              <div
                key={drop.slug}
                className="card card-w p-4 flex items-center justify-between gap-4 fade-up hover:border-[var(--yellow)] transition-colors"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`border-2 px-1.5 py-0 text-[10px] font-bold uppercase tracking-widest font-mono ${CATEGORY_COLORS[drop.category] ?? 'border-[var(--border-hard)] text-[var(--text-muted)]'}`}>
                      {drop.category}
                    </span>
                    <span className="label">
                      {drop.resultCount} {drop.resultCount === 1 ? 'result' : 'results'}
                    </span>
                  </div>
                  <Link href={`/d/${drop.slug}`} className="text-sm font-bold font-mono text-[var(--text)] hover:text-[var(--yellow)] transition-colors truncate block">
                    {drop.title}
                  </Link>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <CopyLinkButton
                    url={`${typeof window !== 'undefined' ? window.location.origin : ''}/d/${drop.slug}`}
                    label="Copy"
                  />
                  <Link href={`/d/${drop.slug}`} className="btn btn-ghost btn-sm">
                    View →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
