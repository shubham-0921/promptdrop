'use client';

import { useEffect, useState } from 'react';
import { getCreatorSlugs } from '@/lib/storage';

export function useCreatorSlugs() {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    setSlugs(getCreatorSlugs());
  }, []);

  return slugs;
}
