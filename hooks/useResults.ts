'use client';

import { useEffect, useState, useCallback } from 'react';
import { Result } from '@/types';
import { getSupabaseClient } from '@/lib/supabase/client';

export function useResults(promptId: string) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = useCallback(async () => {
    const res = await fetch(`/api/results?prompt_id=${promptId}`);
    if (res.ok) {
      const data: Result[] = await res.json();
      setResults(data);
    }
    setLoading(false);
  }, [promptId]);

  useEffect(() => {
    fetchResults();

    const supabase = getSupabaseClient();

    // Real-time subscription for new results
    const channel = supabase
      .channel(`results-${promptId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'results',
          filter: `prompt_id=eq.${promptId}`,
        },
        (payload) => {
          setResults(prev => {
            // Deduplicate in case REST fetch races with real-time event
            if (prev.some(r => r.id === payload.new.id)) return prev;
            return [payload.new as Result, ...prev];
          });
        }
      )
      .subscribe();

    // Re-fetch on tab becoming visible — real-time socket may have closed while backgrounded
    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') {
        fetchResults();
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [promptId, fetchResults]);

  return { results, loading };
}
