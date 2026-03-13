import { Prompt } from '@/types';

export function buildOGTitle(prompt: Prompt, resultCount: number): string {
  if (resultCount === 0) return prompt.title;
  return `${prompt.title} — ${resultCount} ${resultCount === 1 ? 'person' : 'people'} dropped their result`;
}

export function buildOGDescription(prompt: Prompt): string {
  const preview = prompt.body.length > 120
    ? prompt.body.slice(0, 120) + '...'
    : prompt.body;
  return `Try this prompt on your AI and compare results. "${preview}"`;
}
