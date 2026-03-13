import { Category } from '@/types';

const CATEGORY_COLORS: Record<Category, string> = {
  personality: 'bg-pink-500/15 text-pink-300 border-pink-500/20',
  creative:    'bg-amber-500/15 text-amber-300 border-amber-500/20',
  trivia:      'bg-blue-500/15 text-blue-300 border-blue-500/20',
  wildcard:    'bg-violet-500/15 text-violet-300 border-violet-500/20',
};

interface PromptPreviewProps {
  title: string;
  body: string;
  category: Category | '';
}

export function PromptPreview({ title, body, category }: PromptPreviewProps) {
  const isEmpty = !title && !body;

  return (
    <div className="h-full rounded-2xl glass gradient-border p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-violet-400/60" />
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">Preview</p>
      </div>

      {isEmpty ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-sm text-[var(--text-muted)] italic">Start typing to see a preview...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3 fade-up">
          {category && (
            <span className={`self-start rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${CATEGORY_COLORS[category]}`}>
              {category}
            </span>
          )}
          {title && (
            <p className="text-base font-bold text-[var(--text-primary)] leading-snug">{title}</p>
          )}
          {body && (
            <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed">{body}</p>
          )}
        </div>
      )}
    </div>
  );
}
