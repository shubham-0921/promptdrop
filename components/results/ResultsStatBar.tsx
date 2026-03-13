import { Result } from '@/types';
import { extractTopKeyword } from '@/lib/keywords';

interface ResultsStatBarProps {
  results: Result[];
  hideCount?: boolean;
}

export function ResultsStatBar({ results, hideCount = false }: ResultsStatBarProps) {
  const count = results.length;
  const topKeyword = extractTopKeyword(results);
  if (count === 0) return null;

  return (
    <div className="card border-[var(--yellow)] px-4 py-3 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-[var(--yellow)] blink font-mono text-base">▶</span>
        <span className="text-sm font-bold text-[var(--yellow)] font-mono uppercase tracking-wide">
          {count} {count === 1 ? 'player' : 'players'} tried this
        </span>
      </div>
      {!hideCount && topKeyword && (
        <>
          <span className="text-[var(--border-hard)] font-mono">|</span>
          <span className="text-sm font-mono text-[var(--text-muted)]">
            Most got: <span className="text-[var(--text)] font-bold">{topKeyword}</span>
          </span>
        </>
      )}
    </div>
  );
}
