'use client';

import { useState } from 'react';
import { FileDown, Loader2, Check } from 'lucide-react';
import { copy } from '@/lib/copy';

export function NIS2ExportButton() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  const handleClick = async () => {
    setPending(true);
    try {
      const { generateNIS2Report } = await import('@/lib/pdf-report');
      const blob = await generateNIS2Report();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const date = new Date().toISOString().slice(0, 10);
      a.download = `cyberdrill-nis2-${date}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('Nie udało się wygenerować raportu. Szczegóły w konsoli.');
    } finally {
      setPending(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[color:var(--color-accent)] text-[color:var(--color-bg)] font-medium hover:bg-[color:var(--color-accent-hover)] transition-colors disabled:opacity-50"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          {copy.dashboard.nis2Button.pending}
        </>
      ) : done ? (
        <>
          <Check className="w-4 h-4" />
          {copy.toast.reportDownloaded}
        </>
      ) : (
        <>
          <FileDown className="w-4 h-4" />
          {copy.dashboard.nis2Button.idle}
        </>
      )}
    </button>
  );
}
