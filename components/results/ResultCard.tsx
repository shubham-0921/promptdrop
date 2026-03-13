'use client';

import { useState } from 'react';
import { Result } from '@/types';
import { AIBadge } from '@/components/ai/AIBadge';
import { ShareCardButton } from '@/components/share/ShareCardButton';

interface ResultCardProps { result: Result; slug: string; }

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const TRUNCATE = 200;

export function ResultCard({ result, slug }: ResultCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = result.result_text.length > TRUNCATE;
  const displayText = expanded || !isLong
    ? result.result_text
    : result.result_text.slice(0, TRUNCATE) + '...';

  return (
    <div className="card card-w fade-up flex flex-col gap-3 p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-bold text-[var(--text)] truncate font-mono uppercase tracking-wide">
            {result.display_name || 'ANON'}
          </span>
          <AIBadge ai={result.ai_used} />
        </div>
        <span className="text-xs text-[var(--text-muted)] font-mono shrink-0">
          {relativeTime(result.created_at)}
        </span>
      </div>

      {/* Result text */}
      <div className="border-l-2 border-[var(--border-hard)] pl-3">
        <p className="text-sm text-[var(--text)] font-mono whitespace-pre-wrap leading-relaxed">
          {displayText}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t-2 border-dashed border-[var(--border)]">
        {isLong ? (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-[var(--yellow)] font-bold uppercase tracking-wider font-mono cursor-pointer hover:underline"
          >
            {expanded ? '[ show less ]' : '[ show more ]'}
          </button>
        ) : <div />}
        <ShareCardButton result={result} slug={slug} />
      </div>
    </div>
  );
}
