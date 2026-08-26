interface QuizOptionProps {
  letter: string;
  text: string;
  /** Nulo enquanto a pergunta não foi respondida. */
  picked: boolean;
  isCorrect: boolean;
  revealed: boolean;
  onPick: () => void;
}

export function QuizOption({ letter, text, picked, isCorrect, revealed, onPick }: QuizOptionProps) {
  let box = 'border-line bg-white';
  let dot = 'border-line bg-white text-ink-muted';
  let label = 'text-navy';

  if (revealed) {
    if (isCorrect) {
      box = 'border-soul bg-soul-wash';
      dot = 'border-soul bg-soul text-white';
    } else if (picked) {
      box = 'border-ink-muted bg-surf';
      dot = 'border-ink-muted bg-white text-ink-muted';
      label = 'text-ink-muted';
    } else {
      label = 'text-ink-muted';
    }
  }

  return (
    <button
      type="button"
      onClick={onPick}
      disabled={revealed}
      className={`flex items-start gap-3 rounded-card border px-4 py-[15px] text-left ${box} ${revealed ? 'cursor-default' : ''}`}
    >
      <span
        className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border text-[11px] font-medium ${dot}`}
      >
        {letter}
      </span>
      <span className={`flex-1 text-[15px] leading-relaxed ${label}`}>{text}</span>
    </button>
  );
}
