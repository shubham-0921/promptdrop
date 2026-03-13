import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const promptId = req.nextUrl.searchParams.get('prompt_id');
  if (!promptId) {
    return NextResponse.json({ error: 'prompt_id required' }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('results')
    .select('*')
    .eq('prompt_id', promptId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt_id, display_name, ai_used, result_text } = body;

  if (!prompt_id || !ai_used || !result_text) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }
  if (result_text.length < 10 || result_text.length > 1500) {
    return NextResponse.json({ error: 'Result must be 10–1500 characters' }, { status: 400 });
  }
  if (!['chatgpt', 'claude', 'gemini', 'perplexity'].includes(ai_used)) {
    return NextResponse.json({ error: 'Invalid AI provider' }, { status: 400 });
  }

  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from('results')
    .insert({
      prompt_id,
      display_name: display_name?.trim() || null,
      ai_used,
      result_text: result_text.trim(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: 'Failed to submit result' }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
