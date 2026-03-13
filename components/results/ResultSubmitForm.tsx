'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AIProvider } from '@/types';
import { AI_LABELS } from '@/lib/deeplinks';

const AI_OPTIONS: AIProvider[] = ['chatgpt', 'claude', 'gemini', 'perplexity'];

interface ResultSubmitFormProps { promptId: string; slug: string; }

export function ResultSubmitForm({ promptId, slug }: ResultSubmitFormProps) {
  const router = useRouter();
  const [resultText, setResultText] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [aiUsed, setAiUsed] = useState<AIProvider>('claude');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('promptdrop_selected_ai') as AIProvider | null;
    if (stored && AI_OPTIONS.includes(stored)) setAiUsed(stored);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (resultText.trim().length < 10) { setError('Result must be at least 10 characters.'); return; }
    setError('');
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt_id: promptId,
          display_name: displayName.trim() || null,
          ai_used: aiUsed,
          result_text: resultText.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit');
      sessionStorage.removeItem('promptdrop_selected_ai');
      sessionStorage.setItem(`promptdrop_submitted_${promptId}`, 'true');
      router.push(`/d/${slug}#results`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* AI selector */}
      <div className="flex flex-col gap-2">
        <label className="label">Which AI did you use?</label>
        <div className="flex flex-wrap gap-2">
          {AI_OPTIONS.map(ai => (
            <button
              key={ai}
              type="button"
              onClick={() => setAiUsed(ai)}
              className={`border-2 px-3 py-1.5 text-xs font-bold uppercase tracking-widest font-mono transition-all duration-100 cursor-pointer ${
                aiUsed === ai
                  ? 'border-[var(--yellow)] text-[var(--yellow)] bg-[var(--yellow)]/10'
                  : 'border-[var(--border-hard)] text-[var(--text-muted)] hover:border-[var(--yellow)] hover:text-[var(--yellow)]'
              }`}
            >
              {AI_LABELS[ai]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <label className="label">Paste your result</label>
          <span className={`label ${resultText.length > 1350 ? 'text-[var(--pink)]' : ''}`}>
            {resultText.length}/1500
          </span>
        </div>
        <textarea
          placeholder="> Paste what your AI said..."
          value={resultText}
          onChange={e => setResultText(e.target.value)}
          maxLength={1500}
          rows={8}
          className="input-retro resize-none"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="label">Your name or emoji (optional)</label>
        <input
          type="text"
          placeholder="> e.g. Shubham 🦕  or leave blank"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          maxLength={60}
          className="input-retro"
        />
      </div>

      {error && (
        <p className="border-2 border-[var(--pink)] px-3 py-2 text-xs text-[var(--pink)] font-mono uppercase tracking-wide">
          ✕ {error}
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg w-full">
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 border-2 border-black border-t-transparent animate-spin" />
            Submitting...
          </span>
        ) : 'Add My Result →'}
      </button>
    </form>
  );
}
