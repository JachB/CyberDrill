'use client';

import { useState } from 'react';
import { Flag, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { copy } from '@/lib/copy';

interface Props {
  token: string;
  alreadyReported: boolean;
}

export function ReportButton({ token, alreadyReported }: Props) {
  const [reported, setReported] = useState(alreadyReported);
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    setPending(true);
    try {
      await fetch(`/api/track?token=${token}&action=report`);
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!reduced) {
        confetti({
          particleCount: 200,
          spread: 80,
          origin: { y: 0.7 },
          colors: ['#00D4AA', '#2EA043', '#E6EDF3'],
          disableForReducedMotion: true,
        });
      }
      setReported(true);
    } finally {
      setPending(false);
    }
  };

  if (reported) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[color:var(--color-success)]/15 border border-[color:var(--color-success)] text-[color:var(--color-success)] font-medium cursor-default"
      >
        <Check className="w-4 h-4" />
        {copy.phished.reportButton.done}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[color:var(--color-success)] text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
    >
      <Flag className="w-4 h-4" />
      {pending ? copy.phished.reportButton.pending : copy.phished.reportButton.idle}
    </button>
  );
}
