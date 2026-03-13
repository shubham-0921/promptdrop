import { customAlphabet } from 'nanoid';

// Alphanumeric only — avoids URL-ambiguous chars (0, O, I, l)
const nanoid = customAlphabet('abcdefghjkmnpqrstuvwxyz23456789', 8);

export function generateSlug(): string {
  return nanoid();
}
