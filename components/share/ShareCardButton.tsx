'use client';

import { useState } from 'react';
import { Result } from '@/types';
import { AI_LABELS } from '@/lib/deeplinks';

interface ShareCardButtonProps { result: Result; slug: string; }

export function ShareCardButton({ result, slug }: ShareCardButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/d/${slug}`;
    const name = result.display_name || 'Anonymous';
    const text = `${name} used ${AI_LABELS[result.ai_used]} on PromptDrop:\n\n${result.result_text}\n\nTry it: ${url}`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className={`text-xs font-bold uppercase tracking-wider font-mono cursor-pointer transition-colors ${
        copied ? 'text-[var(--green)]' : 'text-[var(--text-muted)] hover:text-[var(--yellow)]'
      }`}
    >
      {copied ? '✓ copied' : '[ share ]'}
    </button>
  );
}
