-- PromptDrop Schema — Phase 1 MVP
-- Run this in your Supabase project's SQL Editor

create extension if not exists "pgcrypto";

-- PROMPTS TABLE
create table public.prompts (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null check (char_length(title) <= 100),
  body        text not null check (char_length(body) <= 2000),
  category    text not null check (category in ('personality', 'creative', 'trivia', 'wildcard')),
  created_at   timestamptz not null default now(),
  view_count   integer not null default 0,
  hide_results boolean not null default false
);

-- Migration (run this if you already created the table without hide_results):
-- alter table public.prompts add column if not exists hide_results boolean not null default false;

-- RESULTS TABLE
create table public.results (
  id            uuid primary key default gen_random_uuid(),
  prompt_id     uuid not null references public.prompts(id) on delete cascade,
  display_name  text check (char_length(display_name) <= 60),
  ai_used       text not null check (ai_used in ('chatgpt', 'claude', 'gemini', 'perplexity')),
  result_text   text not null check (char_length(result_text) <= 1500),
  created_at    timestamptz not null default now()
);

-- INDEXES
create index idx_prompts_slug on public.prompts(slug);
create index idx_results_prompt_id on public.results(prompt_id);
create index idx_results_created_at on public.results(prompt_id, created_at desc);

-- Required for Supabase real-time INSERT events to propagate
alter table public.results replica identity full;

-- ROW LEVEL SECURITY
alter table public.prompts enable row level security;
alter table public.results enable row level security;

-- Public read + anonymous insert (no auth in Phase 1)
create policy "prompts_select_public" on public.prompts for select using (true);
create policy "prompts_insert_public" on public.prompts for insert with check (true);
create policy "results_select_public" on public.results for select using (true);
create policy "results_insert_public" on public.results for insert with check (true);

-- Atomic view count increment — avoids read-modify-write race condition
create or replace function public.increment_view_count(p_slug text)
returns void
language sql
security definer
as $$
  update public.prompts
  set view_count = view_count + 1
  where slug = p_slug;
$$;
