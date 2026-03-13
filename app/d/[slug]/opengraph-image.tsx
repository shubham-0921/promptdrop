import { ImageResponse } from 'next/og';
import { getSupabaseServer } from '@/lib/supabase/server';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CATEGORY_COLORS: Record<string, string> = {
  personality: '#FF2D78',
  creative:    '#FFE600',
  trivia:      '#00CFFF',
  wildcard:    '#39FF14',
};

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = getSupabaseServer();

  const { data: prompt } = await supabase
    .from('prompts').select('*').eq('slug', slug).single();

  const { count } = prompt
    ? await supabase.from('results').select('*', { count: 'exact', head: true }).eq('prompt_id', prompt.id)
    : { count: 0 };

  const resultCount = count ?? 0;
  const accent = prompt ? (CATEGORY_COLORS[prompt.category] ?? '#FFE600') : '#FFE600';
  const bodyPreview = prompt
    ? (prompt.body.length > 200 ? prompt.body.slice(0, 200) + '…' : prompt.body)
    : '';
  const showBody = prompt && bodyPreview && bodyPreview !== prompt.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0c0c0c',
          display: 'flex',
          flexDirection: 'column',
          padding: '56px 64px',
          fontFamily: '"Courier New", monospace',
          color: '#f0f0f0',
        }}
      >
        {/* Dot grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, #1c1c1c 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', position: 'relative' }}>
          <span style={{ color: '#FFE600', fontSize: '22px', fontWeight: 'bold', letterSpacing: '5px' }}>
            PROMPTDROP
          </span>
          {resultCount > 0 && (
            <span style={{ color: '#666', fontSize: '15px' }}>
              {resultCount} {resultCount === 1 ? 'person has' : 'people have'} dropped their result
            </span>
          )}
        </div>

        {/* Card */}
        <div
          style={{
            background: '#141414',
            border: '2px solid #3a3a3a',
            boxShadow: `6px 6px 0 ${accent}`,
            padding: '40px 44px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Category badge */}
          {prompt && (
            <div style={{ display: 'flex', marginBottom: '22px' }}>
              <span
                style={{
                  border: `2px solid ${accent}`,
                  color: accent,
                  padding: '4px 12px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                }}
              >
                {prompt.category}
              </span>
            </div>
          )}

          {/* Title */}
          <div
            style={{
              fontSize: prompt?.title && prompt.title.length > 80 ? '28px' : '34px',
              fontWeight: 'bold',
              lineHeight: 1.35,
              marginBottom: showBody ? '20px' : 0,
              color: '#f0f0f0',
            }}
          >
            {prompt?.title ?? 'PromptDrop'}
          </div>

          {/* Body preview */}
          {showBody && (
            <div
              style={{
                fontSize: '17px',
                color: '#888',
                lineHeight: 1.65,
                borderLeft: '3px solid #3a3a3a',
                paddingLeft: '18px',
              }}
            >
              {bodyPreview}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '22px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <span style={{ color: '#555', fontSize: '14px' }}>
            Run this prompt on your AI → compare your result with others
          </span>
        </div>
      </div>
    ),
    size,
  );
}
