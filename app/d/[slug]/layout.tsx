import { Metadata } from 'next';
import { getSupabaseServer } from '@/lib/supabase/server';
import { buildOGTitle, buildOGDescription } from '@/lib/og';

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = getSupabaseServer();

  const { data: prompt } = await supabase
    .from('prompts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!prompt) {
    return { title: 'PromptDrop' };
  }

  const { count } = await supabase
    .from('results')
    .select('*', { count: 'exact', head: true })
    .eq('prompt_id', prompt.id);

  const ogTitle = buildOGTitle(prompt, count ?? 0);
  const ogDescription = buildOGDescription(prompt);

  return {
    title: `${prompt.title} | PromptDrop`,
    description: ogDescription,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
    },
  };
}

export default function SlugLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
