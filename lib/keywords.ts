import { Result } from '@/types';

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'was', 'i', 'my', 'your', 'their', 'our',
  'and', 'or', 'but', 'to', 'of', 'in', 'on', 'at', 'for', 'with',
  'it', 'its', 'this', 'that', 'they', 'we', 'you', 'he', 'she',
  'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'would', 'could', 'should', 'will', 'can', 'may', 'might', 'am',
  'are', 'were', 'so', 'if', 'as', 'by', 'from', 'not', 'no', 'very',
  'just', 'like', 'also', 'more', 'about', 'me', 'him', 'her', 'us',
  'which', 'who', 'what', 'when', 'where', 'how', 'all', 'any', 'both',
]);

export function extractTopKeyword(results: Result[]): string | null {
  if (results.length === 0) return null;

  const freq: Record<string, number> = {};

  for (const r of results) {
    const words = r.result_text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !STOP_WORDS.has(w));

    for (const word of words) {
      freq[word] = (freq[word] ?? 0) + 1;
    }
  }

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  if (sorted.length === 0) return null;

  // Capitalize first letter
  const top = sorted[0][0];
  return top.charAt(0).toUpperCase() + top.slice(1);
}
