import { useState } from 'react';
import type { Quiz } from '../../../types/ecoscore';
import { Label } from '../ui/Label';
import { StagePips } from '../ui/StagePips';
import { QuizOption } from './QuizOption';

interface QuizScreenProps {
  quiz: Quiz;
  /** Chamado no fim das perguntas com as respostas na ordem original. */
  onFinish: (answers: number[]) => void;
}

export function QuizScreen({ quiz, onFinish }: QuizScreenProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [picked, setPicked] = useState<number | null>(null);

  const question = quiz.questions[index];
  const revealed = picked !== null;
  const correct = revealed && picked === question.correctIndex;
  const isLast = index === quiz.questions.length - 1;

  const advance = () => {
    if (picked === null) return;
    const next = [...answers, picked];
    if (isLast) {
      onFinish(next);
      return;
    }
    setAnswers(next);
    setPicked(null);
    setIndex(index + 1);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 px-5 pb-6 pt-6">
        <div className="mb-2">
          <Label>Etapa 2 de 4</Label>
        </div>
        <h1 className="mb-1.5 font-display text-[28px] font-semibold leading-tight text-navy">
          Valide seu conhecimento
        </h1>
        <p className="mb-[18px] text-base leading-relaxed text-ink-muted">
          {quiz.questions.length} perguntas. Acerte {quiz.passingScore} para avançar.
        </p>

        <div className="mb-6">
          <StagePips total={quiz.questions.length} current={index} answeredCount={answers.length} />
        </div>

        <div className="mb-2.5 text-xs font-medium uppercase tracking-[0.06em] text-ink-muted">
          Pergunta {index + 1} de {quiz.questions.length}
        </div>
        <p className="mb-5 font-display text-xl font-medium leading-tight text-navy">
          {question.prompt}
        </p>

        <div className="flex flex-col gap-2.5">
          {question.options.map((option, i) => (
            <QuizOption
              key={option}
              letter={'ABCD'[i]}
              text={option}
              picked={picked === i}
              isCorrect={i === question.correctIndex}
              revealed={revealed}
              onPick={() => setPicked(i)}
            />
          ))}
        </div>

        {revealed ? (
          <div
            className={`mt-[18px] rounded-card border px-[18px] py-4 ${correct ? 'border-soul bg-soul-wash' : 'border-line bg-surf'}`}
          >
            <div
              className={`mb-1.5 text-[11px] font-medium uppercase tracking-[0.06em] ${correct ? 'text-soul-deep' : 'text-ink-muted'}`}
            >
              {correct ? 'Correto' : 'Reveja'}
            </div>
            <div className="text-[15px] leading-relaxed text-navy">
              {correct ? question.feedbackCorrect : question.feedbackWrong}
            </div>
          </div>
        ) : null}
      </div>

      {revealed ? (
        <div className="flex-none border-t border-line p-5">
          <button
            type="button"
            onClick={advance}
            className="w-full rounded-full bg-soul py-[15px] font-display text-base font-medium text-white hover:bg-soul-deep"
          >
            {isLast ? 'Ver resultado' : 'Próxima pergunta'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
