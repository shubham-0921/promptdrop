import { AIProvider } from '@/types';

const DEEPLINK_BASES: Record<AIProvider, string> = {
  chatgpt:    process.env.NEXT_PUBLIC_DEEPLINK_CHATGPT    ?? 'https://chat.openai.com/?q=',
  claude:     process.env.NEXT_PUBLIC_DEEPLINK_CLAUDE     ?? 'https://claude.ai/new?q=',
  gemini:     process.env.NEXT_PUBLIC_DEEPLINK_GEMINI     ?? 'https://gemini.google.com/?q=',
  perplexity: process.env.NEXT_PUBLIC_DEEPLINK_PERPLEXITY ?? 'https://perplexity.ai/?q=',
};

export function buildDeeplink(ai: AIProvider, promptBody: string): string {
  return DEEPLINK_BASES[ai] + encodeURIComponent(promptBody);
}

export const AI_LABELS: Record<AIProvider, string> = {
  chatgpt:    'ChatGPT',
  claude:     'Claude',
  gemini:     'Gemini',
  perplexity: 'Perplexity',
};

// Retro badge colors: border + text
export const AI_COLORS: Record<AIProvider, string> = {
  chatgpt:    'border-[var(--green)]  text-[var(--green)]',
  claude:     'border-[var(--yellow)] text-[var(--yellow)]',
  gemini:     'border-[var(--cyan)]   text-[var(--cyan)]',
  perplexity: 'border-[var(--pink)]   text-[var(--pink)]',
};

// Button accent colors for AI selector
export const AI_ACCENT: Record<AIProvider, string> = {
  chatgpt:    'var(--green)',
  claude:     'var(--yellow)',
  gemini:     'var(--cyan)',
  perplexity: 'var(--pink)',
};

export const AI_ICONS: Record<AIProvider, string> = {
  chatgpt:    '◉',
  claude:     '◆',
  gemini:     '◈',
  perplexity: '◎',
};
