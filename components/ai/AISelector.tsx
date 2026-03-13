'use client';

import { AIProvider } from '@/types';
import { buildDeeplink, AI_LABELS, AI_ICONS, AI_ACCENT } from '@/lib/deeplinks';
import Link from 'next/link';

const AI_PROVIDERS: AIProvider[] = ['chatgpt', 'claude', 'gemini', 'perplexity'];

interface AISelectorProps {
  promptBody: string;
  slug: string;
}

export function AISelector({ promptBody, slug }: AISelectorProps) {
  function handleSelect(ai: AIProvider) {
    navigator.clipboard.writeText(promptBody).catch(() => {});
    sessionStorage.setItem('promptdrop_selected_ai', ai);
    window.open(buildDeeplink(ai, promptBody), '_blank');
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        {AI_PROVIDERS.map(ai => (
          <button
            key={ai}
            onClick={() => handleSelect(ai)}
            style={{ '--ai-accent': AI_ACCENT[ai] } as React.CSSProperties}
            className="group card flex items-center gap-3 px-4 py-3.5 text-sm font-bold font-mono uppercase tracking-wide text-[var(--text-muted)] transition-all duration-100 cursor-pointer hover:text-[var(--text)] hover:[border-color:var(--ai-accent)] hover:[box-shadow:3px_3px_0_var(--ai-accent)] hover:[color:var(--ai-accent)]"
          >
            <span className="text-base">{AI_ICONS[ai]}</span>
            <span>{AI_LABELS[ai]}</span>
            <span className="ml-auto text-xs opacity-0 group-hover:opacity-60 transition-opacity">↗</span>
          </button>
        ))}
      </div>

      <p className="text-center text-[11px] text-[var(--text-muted)] font-mono uppercase tracking-wider">
        Prompt also copied to clipboard if it doesn&apos;t auto-fill
      </p>

      <Link
        href={`/d/${slug}/submit`}
        className="btn btn-primary btn-lg w-full text-center"
      >
        Got your result? Add it here →
      </Link>
    </div>
  );
}
