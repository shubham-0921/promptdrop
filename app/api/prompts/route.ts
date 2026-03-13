import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';
import { generateSlug } from '@/lib/slug';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, body: promptBody, category, hide_results } = body;

  if (!title || !promptBody || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (title.length > 100 || promptBody.length > 2000) {
    return NextResponse.json({ error: 'Content too long' }, { status: 400 });
  }
  if (!['personality', 'creative', 'trivia', 'wildcard'].includes(category)) {
    return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const creatorToken = crypto.randomUUID();

  // Generate slug with one collision retry
  for (let attempt = 0; attempt < 2; attempt++) {
    const slug = generateSlug();
    const { data, error } = await supabase
      .from('prompts')
      .insert({ slug, title, body: promptBody, category, hide_results: hide_results === true })
      .select('slug')
      .single();

    if (error) {
      // Postgres unique violation — retry with a new slug
      if (error.code === '23505' && attempt === 0) continue;
      return NextResponse.json({ error: 'Failed to create prompt' }, { status: 500 });
    }

    return NextResponse.json({ slug: data.slug, creatorToken });
  }

  return NextResponse.json({ error: 'Failed to generate unique slug' }, { status: 500 });
}
