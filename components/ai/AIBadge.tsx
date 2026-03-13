import { AIProvider } from '@/types';
import { AI_LABELS, AI_COLORS } from '@/lib/deeplinks';

interface AIBadgeProps { ai: AIProvider }

export function AIBadge({ ai }: AIBadgeProps) {
  return (
    <span className={`inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide font-mono ${AI_COLORS[ai]}`}>
      {AI_LABELS[ai]}
    </span>
  );
}
