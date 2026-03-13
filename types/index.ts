export type AIProvider = 'chatgpt' | 'claude' | 'gemini' | 'perplexity';

export type Category = 'personality' | 'creative' | 'trivia' | 'wildcard';

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  body: string;
  category: Category;
  created_at: string;
  view_count: number;
  hide_results: boolean;
}

export interface Result {
  id: string;
  prompt_id: string;
  display_name: string | null;
  ai_used: AIProvider;
  result_text: string;
  created_at: string;
}
