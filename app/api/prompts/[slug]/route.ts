import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
  }

  // Increment view count atomically via RPC
  await supabase.rpc('increment_view_count', { p_slug: slug });

  return NextResponse.json(data);
}
