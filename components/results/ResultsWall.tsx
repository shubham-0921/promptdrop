'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useResults } from '@/hooks/useResults';
import { ResultCard } from './ResultCard';
import { ResultsStatBar } from './ResultsStatBar';

interface ResultsWallProps {
  promptId: string;
  slug: string;
  hideResults?: boolean;
}

export function ResultsWall({ promptId, slug, hideResults = false }: ResultsWallProps) {
  const { results, loading } = useResults(promptId);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(`promptdrop_submitted_${promptId}`) === 'true') {
      setUnlocked(true);
    }
  }, [promptId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-24 border-2 border-[var(--border)] animate-pulse" />
        ))}
      </div>
    );
  }

  const isHidden = hideResults && !unlocked;

  return (
    <div className="flex flex-col gap-4" id="results">
      <ResultsStatBar results={results} hideCount={isHidden} />

      {results.length === 0 ? (
        <div className="card border-dashed py-12 text-center">
          <p className="text-2xl mb-3">💬</p>
          <p className="label">No entries yet — be the first!</p>
        </div>
      ) : isHidden ? (
        /* Locked state */
        <div className="relative">
          {/* Ghost cards */}
          <div className="flex flex-col gap-3 pointer-events-none select-none" aria-hidden>
            {results.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className="card h-24"
                style={{ filter: 'blur(5px)', opacity: 1 - i * 0.25 }}
              />
            ))}
          </div>

          {/* Lock overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-4 pt-8"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--bg) 55%)' }}>
            <div className="card card-y p-6 text-center max-w-xs w-full">
              <p className="text-3xl mb-3">🔒</p>
              <p className="text-sm font-bold text-[var(--yellow)] font-mono uppercase tracking-wide mb-1">
                {results.length} {results.length === 1 ? 'player' : 'players'} have played
              </p>
              <p className="text-xs text-[var(--text-muted)] font-mono mb-5">
                Try the prompt to unlock all results
              </p>
              <Link href={`/d/${slug}/submit`} className="btn btn-primary btn-md w-full">
                Play to unlock →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {results.map(r => (
            <ResultCard key={r.id} result={r} slug={slug} />
          ))}
        </div>
      )}
    </div>
  );
}
