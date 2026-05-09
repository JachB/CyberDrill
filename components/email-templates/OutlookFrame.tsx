import { copy } from '@/lib/copy';

interface Props {
  senderName?: string;
  senderEmail?: string;
  subject?: string;
  recipient?: string;
  children: React.ReactNode;
}

export function OutlookFrame({ senderName, senderEmail, subject, recipient, children }: Props) {
  const fromValue = senderName
    ? `${senderName}${senderEmail ? ` <${senderEmail}>` : ''}`
    : '…';

  return (
    <div className="rounded-lg border border-[color:var(--color-border)] overflow-hidden bg-white text-zinc-900 shadow-2xl">
      <div className="bg-zinc-100 border-b border-zinc-300 px-5 py-3 space-y-1 text-sm">
        <Row dataFlag="sender" label={copy.emailFrame.fromLabel} value={fromValue} />
        <Row label={copy.emailFrame.toLabel} value={recipient ?? copy.emailFrame.placeholderRecipient} />
        <Row dataFlag="subject" label={copy.emailFrame.subjectLabel} value={subject ?? '…'} bold />
      </div>
      <div className="p-6 bg-white">{children}</div>
    </div>
  );
}

function Row({ label, value, bold, dataFlag }: { label: string; value: string; bold?: boolean; dataFlag?: string }) {
  return (
    <div className="flex gap-3" data-flag={dataFlag}>
      <span className="text-zinc-500 w-16 shrink-0">{label}</span>
      <span className={`flex-1 ${bold ? 'font-semibold text-zinc-900' : 'text-zinc-700'}`}>{value}</span>
    </div>
  );
}
