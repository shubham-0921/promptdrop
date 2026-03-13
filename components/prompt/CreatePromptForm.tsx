'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveCreatorToken } from '@/lib/storage';

const EXAMPLES = [
  { emoji: '🦁', text: 'Knowing me, what living animal would I be?' },
  { emoji: '🌍', text: 'Knowing me, which country would I be?' },
  { emoji: '⏳', text: 'Knowing me, what historical era would I have thrived in?' },
  { emoji: '🌦️', text: 'Knowing me, what type of weather would I be?' },
  { emoji: '🎭', text: 'Knowing me, what fictional character would I secretly be?' },
];

export function CreatePromptForm() {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [hideResults, setHideResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittingExample, setSubmittingExample] = useState<number | null>(null);
  const [error, setError] = useState('');

  async function createDrop(promptBody: string) {
    const res = await fetch('/api/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: promptBody.slice(0, 100),
        body: promptBody,
        category: 'wildcard',
        hide_results: hideResults,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create drop');
    saveCreatorToken(data.slug, data.creatorToken);
    router.push(`/d/${data.slug}`);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) { setError('Write a prompt first.'); return; }
    setError('');
    setIsSubmitting(true);
    try { await createDrop(body.trim()); }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setIsSubmitting(false);
    }
  }

  async function handleExample(text: string, index: number) {
    setSubmittingExample(index);
    setError('');
    try { await createDrop(text); }
    catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmittingExample(null);
    }
  }

  const busy = isSubmitting || submittingExample !== null;

  return (
    <div className="flex flex-col gap-5">
      {/* Main input */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          placeholder="> Write a prompt for your friends..."
          value={body}
          onChange={e => setBody(e.target.value)}
          maxLength={2000}
          rows={4}
          disabled={busy}
          className="input-retro resize-none text-sm"
        />

        {/* Hide results toggle */}
        <button
          type="button"
          onClick={() => setHideResults(!hideResults)}
          disabled={busy}
          className={`card flex items-center justify-between gap-3 px-4 py-3 text-left transition-all duration-100 cursor-pointer disabled:opacity-50 ${
            hideResults ? 'border-[var(--yellow)] card-sm' : 'hover:border-[var(--border-hard)]'
          }`}
        >
          <div className="flex flex-col gap-1">
            <span className={`text-xs font-bold uppercase tracking-wider font-mono ${hideResults ? 'text-[var(--yellow)]' : 'text-[var(--text-muted)]'}`}>
              🔒 Hide results until they try
            </span>
            <span className="text-[11px] text-[var(--text-muted)] font-mono">
              Shows only count — unlocks after they submit
            </span>
          </div>
          {/* Pixel toggle */}
          <div className={`relative h-5 w-9 shrink-0 border-2 transition-all duration-150 ${
            hideResults ? 'border-[var(--yellow)] bg-[var(--yellow)]' : 'border-[var(--border-hard)] bg-transparent'
          }`}>
            <div className={`absolute top-0.5 h-3 w-3 transition-all duration-150 ${
              hideResults ? 'left-[18px] bg-black' : 'left-0.5 bg-[var(--text-muted)]'
            }`} />
          </div>
        </button>

        {error && (
          <p className="border-2 border-[var(--pink)] px-3 py-2 text-xs text-[var(--pink)] font-mono uppercase tracking-wide">
            ✕ {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary btn-lg w-full"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 border-2 border-black border-t-transparent animate-spin" />
              Creating...
            </span>
          ) : 'Create Drop →'}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <hr className="retro-divider flex-1" />
        <span className="label">or try an example</span>
        <hr className="retro-divider flex-1" />
      </div>

      {/* Examples */}
      <div className="flex flex-col gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => handleExample(ex.text, i)}
            disabled={busy}
            className="card group flex items-center gap-3 px-4 py-3 text-left text-sm font-mono text-[var(--text-muted)] transition-all duration-100 cursor-pointer hover:border-[var(--yellow)] hover:text-[var(--text)] hover:card-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submittingExample === i ? (
              <span className="h-4 w-4 shrink-0 border-2 border-[var(--yellow)] border-t-transparent animate-spin" />
            ) : (
              <span className="shrink-0">{ex.emoji}</span>
            )}
            <span className="flex-1">&gt; {ex.text}</span>
            <span className="text-[var(--yellow)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-xs font-bold uppercase">
              Play →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
