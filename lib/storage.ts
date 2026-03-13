const CREATOR_TOKENS_KEY = 'promptdrop_creator_tokens';

// Map of slug → creatorToken stored in localStorage
function getTokenMap(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(CREATOR_TOKENS_KEY) || '{}');
  } catch {
    return {};
  }
}

export function saveCreatorToken(slug: string, token: string): void {
  if (typeof window === 'undefined') return;
  const map = getTokenMap();
  map[slug] = token;
  localStorage.setItem(CREATOR_TOKENS_KEY, JSON.stringify(map));
}

export function getCreatorSlugs(): string[] {
  return Object.keys(getTokenMap());
}

export function isCreator(slug: string): boolean {
  return slug in getTokenMap();
}
