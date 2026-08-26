import type { JourneyProgress, ProofCapture, SkillId } from '../types/ecoscore';

/**
 * STUBS — o backend não existe ainda.
 * Cada função abaixo é um ponto de integração. Troque o corpo pela chamada
 * real mantendo a assinatura, e nenhum componente precisa mudar.
 */

export interface QuizSubmission {
  skillId: SkillId;
  /** Índice escolhido por pergunta, na ordem de `Quiz.questions`. */
  answers: number[];
}

export interface QuizResult {
  score: number;
  passed: boolean;
  /** Corretude por pergunta, para o feedback em tela. */
  perQuestion: boolean[];
}

/** TODO(api): POST /skills/:id/quiz — a correção deve ficar no servidor. */
export async function submitQuiz(_input: QuizSubmission): Promise<QuizResult> {
  throw new Error('submitQuiz: não implementado');
}

/** TODO(api): POST /missions/:id/proof — upload da foto + validação automática. */
export async function submitProof(_capture: ProofCapture): Promise<{ accepted: boolean }> {
  throw new Error('submitProof: não implementado');
}

/** TODO(api): POST /missions/:id/complete — credita os Soul Points. */
export async function completeMission(
  _skillId: SkillId,
): Promise<{ soulPoints: number; co2eKg: number }> {
  throw new Error('completeMission: não implementado');
}

/** TODO(api): GET /me/journey/:skillId */
export async function fetchProgress(_skillId: SkillId): Promise<JourneyProgress> {
  throw new Error('fetchProgress: não implementado');
}
