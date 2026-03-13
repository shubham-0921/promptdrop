import { CreatePromptForm } from '@/components/prompt/CreatePromptForm';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <div className="mx-auto max-w-xl px-4 pt-6 flex items-center justify-between">
        <span className="pixel text-xs text-[var(--yellow)]">PROMPTDROP</span>
        <Link
          href="/my-drops"
          className="card px-3 py-1.5 text-[11px] font-bold font-mono uppercase tracking-widest text-[var(--yellow)] border-[var(--yellow)] hover:bg-[var(--yellow)] hover:text-black transition-colors duration-100"
        >
          My Drops →
        </Link>
      </div>

      <div className="mx-auto max-w-xl px-4 pt-10 pb-16">

        {/* Logo */}
        <div className="mb-10 text-center">
          <h1 className="pixel text-2xl text-[var(--yellow)] mb-4 leading-relaxed">
            PROMPT<br />DROP
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)]">
            Share a prompt<span className="blink">_</span> See what your friends become.
          </p>
        </div>

        {/* Main card */}
        <div className="card card-y p-6">
          <div className="flex items-center gap-2 mb-5 pb-4 border-b-2 border-dashed border-[var(--border)]">
            <span className="text-[var(--yellow)] font-mono text-sm font-bold">▶</span>
            <span className="label text-[var(--text)]">New Game</span>
          </div>
          <CreatePromptForm />
        </div>
      </div>
    </div>
  );
}
