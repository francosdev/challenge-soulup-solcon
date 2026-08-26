import { useState } from 'react';
import type { LearnContent, Skill } from '../../../types/ecoscore';
import { Label } from '../ui/Label';
import { Pill } from '../ui/Pill';
import { MediaPlaceholder } from '../ui/MediaPlaceholder';
import { LearnSection } from './LearnSection';

interface LearnScreenProps {
  skill: Skill;
  content: LearnContent;
  sectionsSeen: boolean[];
  onSectionOpen: (index: number) => void;
}

export function LearnScreen({ skill, content, sectionsSeen, onSectionOpen }: LearnScreenProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const seenCount = sectionsSeen.filter(Boolean).length;

  return (
    <div className="px-5 pb-6 pt-6">
      <div className="mb-2">
        <Label>Habilidade 0{skill.order} · etapa 1 de 4</Label>
      </div>
      <h1 className="mb-1.5 font-display text-[28px] font-semibold leading-tight text-navy">
        {skill.name}
      </h1>
      <p className="mb-5 max-w-[36ch] text-base leading-relaxed text-ink-muted">
        {content.subtitle}
      </p>

      <div className="mb-5 rounded-card border border-soul bg-soul-wash px-[18px] py-4">
        <div className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-soul-deep">
          Objetivo de aprendizagem
        </div>
        <div className="text-[15px] leading-relaxed text-navy">{content.objective}</div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <Pill>{content.estimatedMinutes} min</Pill>
        <Pill>{content.format}</Pill>
        <Pill active>
          {seenCount} / {content.sections.length} seções
        </Pill>
      </div>

      <div className="mb-5">
        <MediaPlaceholder label="Vídeo · separação na origem" hint="2:10" height={170} />
      </div>

      {content.sections.map((section, i) => (
        <LearnSection
          key={section.title}
          section={section}
          index={i}
          open={openIndex === i}
          seen={sectionsSeen[i]}
          onToggle={() => {
            const next = openIndex === i ? null : i;
            setOpenIndex(next);
            if (next === i) onSectionOpen(i);
          }}
        />
      ))}
    </div>
  );
}
