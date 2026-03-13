import { CreatePromptForm } from '@/components/prompt/CreatePromptForm';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-xl px-4 pt-16 pb-16">

        {/* Logo */}
        <div className="mb-10 text-center">
          <Link href="/">
            <h1 className="pixel text-2xl text-[var(--yellow)] mb-4 leading-relaxed">
              PROMPT<br />DROP
            </h1>
          </Link>
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

        {/* Footer */}
        <p className="mt-5 text-center text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
          played before?{' '}
          <Link href="/my-drops" className="text-[var(--yellow)] hover:underline">
            see your drops →
          </Link>
        </p>
      </div>
    </div>
  );
}
