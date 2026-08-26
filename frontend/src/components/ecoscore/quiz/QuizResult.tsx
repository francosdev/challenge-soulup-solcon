import { Check } from 'lucide-react';
import { Button } from '../../ui/Button';

interface QuizResultProps {
  passed: boolean;
  score: number;
  total: number;
  onRetry: () => void;
  onReview: () => void;
  onContinue: () => void;
}

export function QuizResult({
  passed,
  score,
  total,
  onRetry,
  onReview,
  onContinue,
}: QuizResultProps) {
  return (
    <div className="flex h-full flex-col px-5 pb-5 pt-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        {passed ? (
          <div className="flex h-28 w-28 items-center justify-center rounded-full border border-soul bg-soul-wash">
            <Check size={40} strokeWidth={1.5} className="text-soul" />
          </div>
        ) : (
          <div className="flex h-28 w-28 flex-col items-center justify-center rounded-full border border-line bg-surf">
            <span className="font-display text-3xl font-semibold text-ink-muted">
              {score}/{total}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-ink-muted">
              acertos
            </span>
          </div>
        )}

        <div>
          <h1 className="mx-auto max-w-[26ch] font-display text-2xl font-semibold leading-snug text-navy">
            {passed ? 'Conhecimento validado.' : 'Você ainda precisa revisar esse conteúdo.'}
          </h1>
          <p className="mx-auto mt-2.5 max-w-[30ch] text-base leading-relaxed text-ink-muted">
            {passed
              ? `Você acertou ${score} de ${total}. Agora é hora de aplicar.`
              : `Você acertou ${score} de ${total}. Volte ao conteúdo e tente de novo — não há limite de tentativas.`}
          </p>
        </div>
      </div>

      <div className="flex flex-none flex-col gap-2.5">
        {passed ? (
          <Button className="w-full" onClick={onContinue}>Ver missão</Button>
        ) : (
          <>
            <Button className="w-full" onClick={onRetry}>Tentar novamente</Button>
            <Button className="w-full" variant="secondary" onClick={onReview}>
              Revisar conteúdo
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
