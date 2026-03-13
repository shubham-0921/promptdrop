import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card card-p p-10 text-center max-w-xs w-full fade-up">
        <p className="pixel text-4xl text-[var(--pink)] mb-2">404</p>
        <p className="pixel text-xs text-[var(--text-muted)] mb-6 leading-relaxed">GAME OVER</p>
        <p className="text-xs font-mono text-[var(--text-muted)] mb-6">This drop doesn&apos;t exist.</p>
        <Link href="/" className="btn btn-primary btn-md w-full">
          ← New Game
        </Link>
      </div>
    </div>
  );
}
