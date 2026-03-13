'use client';

import { useState } from 'react';

interface CopyLinkButtonProps { url?: string; label?: string; }

export function CopyLinkButton({ url, label = 'Copy Link' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(url ?? window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button onClick={handleCopy} className="btn btn-secondary btn-sm">
      {copied ? '✓ Copied!' : label}
    </button>
  );
}
