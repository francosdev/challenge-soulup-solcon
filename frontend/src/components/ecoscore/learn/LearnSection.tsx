import { Check, Minus, Plus } from 'lucide-react';
import type { ContentSection } from '../../../types/ecoscore';

interface LearnSectionProps {
  section: ContentSection;
  index: number;
  open: boolean;
  seen: boolean;
  onToggle: () => void;
}

export function LearnSection({ section, index, open, seen, onToggle }: LearnSectionProps) {
  return (
    <div
      className={`mb-3 overflow-hidden rounded-card border bg-white ${open ? 'border-soul' : 'border-line'}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`flex w-full items-center gap-3 px-[18px] py-4 text-left ${open ? 'bg-soul-wash' : 'bg-white'}`}
      >
        <span
          className={`flex h-7 w-7 flex-none items-center justify-center rounded-full border text-xs font-medium ${seen ? 'border-soul bg-soul text-white' : 'border-line bg-white text-ink-muted'}`}
        >
          {seen ? <Check size={14} strokeWidth={1.5} /> : index + 1}
        </span>
        <span className="flex-1 font-display text-base font-medium text-navy">{section.title}</span>
        {open ? (
          <Minus size={18} strokeWidth={1.5} className="text-ink-muted" />
        ) : (
          <Plus size={18} strokeWidth={1.5} className="text-ink-muted" />
        )}
      </button>

      {open ? (
        <div className="px-[18px] pb-[18px]">
          {section.paragraphs.map((p) => (
            <p key={p} className="mb-3 max-w-[60ch] text-[15px] leading-relaxed text-navy">
              {p}
            </p>
          ))}
          {section.rows?.length ? (
            <dl className="flex flex-col gap-2.5 border-t border-line pt-3">
              {section.rows.map((row) => (
                <div key={row.term} className="flex items-start gap-3">
                  <span className="mt-[7px] h-2 w-2 flex-none rounded-full bg-soul-light" />
                  <div className="flex-1">
                    <dt className="text-sm font-medium text-navy">{row.term}</dt>
                    <dd className="text-sm leading-relaxed text-ink-muted">{row.description}</dd>
                  </div>
                </div>
              ))}
            </dl>
          ) : null}
          {section.closing ? (
            <p className="mt-3.5 max-w-[60ch] text-[15px] leading-relaxed text-navy">
              {section.closing}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
