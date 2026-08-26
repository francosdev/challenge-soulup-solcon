import { useCallback, useMemo, useState } from 'react';
import type { JourneyProgress, Mission, Quiz, SkillId, SkillState } from '../types/ecoscore';

export type Screen =
  | 'trail'
  | 'skill'
  | 'learn'
  | 'quiz'
  | 'quizFail'
  | 'quizPass'
  | 'missionOffer'
  | 'missionProgress'
  | 'missionProof'
  | 'achievement'
  | 'cycle';

interface UseJourneyArgs {
  quiz: Quiz;
  mission: Mission;
  sectionCount: number;
  initialSoulPoints: number;
}

export interface JourneyApi {
  screen: Screen;
  go: (next: Screen) => void;
  back: () => void;
  canGoBack: boolean;
  progress: JourneyProgress;
  soulPoints: number;
  activeSkillId: SkillId;
  setActiveSkillId: (id: SkillId) => void;
  markSectionSeen: (index: number) => void;
  finishLearn: () => void;
  /** Registra a resposta e devolve se ela estava correta. */
  answer: (questionIndex: number, optionIndex: number) => boolean;
  /** Fecha o quiz e devolve o resultado; navegue conforme `passed`. */
  gradeQuiz: (answers: number[]) => { score: number; passed: boolean };
  resetQuiz: () => void;
  acceptMission: () => void;
  registerCheckItem: (id: string) => void;
  completeMission: () => void;
  reset: () => void;
  skillStateFor: (skillOrder: number) => SkillState;
}

/**
 * Máquina de estado da jornada, isolada da UI.
 * Substitua o estado local por dados do servidor quando a API existir —
 * a interface pública deste hook não precisa mudar.
 */
export function useJourney({
  quiz,
  mission,
  sectionCount,
  initialSoulPoints,
}: UseJourneyArgs): JourneyApi {
  const blank = useMemo<JourneyProgress>(
    () => ({
      skillId: quiz.skillId,
      learnDone: false,
      sectionsSeen: Array.from({ length: sectionCount }, () => false),
      quizPassed: false,
      lastQuizScore: null,
      missionAccepted: false,
      registeredIds: [],
      missionDone: false,
    }),
    [quiz.skillId, sectionCount],
  );

  const [screen, setScreen] = useState<Screen>('trail');
  // A pilha só é lida dentro do updater de `back`, nunca no render.
  const [, setHistory] = useState<Screen[]>([]);
  const [progress, setProgress] = useState<JourneyProgress>(blank);
  const [soulPoints, setSoulPoints] = useState(initialSoulPoints);
  const [activeSkillId, setActiveSkillId] = useState<SkillId>(quiz.skillId);

  const go = useCallback((next: Screen) => {
    setHistory((h) => [...h, screen]);
    setScreen(next);
  }, [screen]);

  const back = useCallback(() => {
    setHistory((h) => {
      setScreen(h.length ? h[h.length - 1] : 'trail');
      return h.slice(0, -1);
    });
  }, []);

  const markSectionSeen = useCallback((index: number) => {
    setProgress((p) => {
      if (p.sectionsSeen[index]) return p;
      const sectionsSeen = [...p.sectionsSeen];
      sectionsSeen[index] = true;
      return { ...p, sectionsSeen };
    });
  }, []);

  const finishLearn = useCallback(() => {
    setProgress((p) => ({ ...p, learnDone: true, sectionsSeen: p.sectionsSeen.map(() => true) }));
  }, []);

  const answer = useCallback(
    (questionIndex: number, optionIndex: number) =>
      quiz.questions[questionIndex].correctIndex === optionIndex,
    [quiz.questions],
  );

  const gradeQuiz = useCallback(
    (answers: number[]) => {
      const score = answers.filter((a, i) => a === quiz.questions[i].correctIndex).length;
      const passed = score >= quiz.passingScore;
      setProgress((p) => ({ ...p, lastQuizScore: score, quizPassed: passed }));
      return { score, passed };
    },
    [quiz.passingScore, quiz.questions],
  );

  const resetQuiz = useCallback(() => {
    setProgress((p) => ({ ...p, lastQuizScore: null, quizPassed: false }));
  }, []);

  const acceptMission = useCallback(() => {
    setProgress((p) => ({ ...p, missionAccepted: true }));
  }, []);

  const registerCheckItem = useCallback((id: string) => {
    setProgress((p) =>
      p.registeredIds.includes(id) ? p : { ...p, registeredIds: [...p.registeredIds, id] },
    );
  }, []);

  const complete = useCallback(() => {
    setProgress((p) => ({
      ...p,
      missionDone: true,
      registeredIds: mission.checklist.map((c) => c.id),
    }));
    setSoulPoints((v) => v + mission.reward);
  }, [mission.checklist, mission.reward]);

  const reset = useCallback(() => {
    setProgress(blank);
    setSoulPoints(initialSoulPoints);
    setActiveSkillId(quiz.skillId);
    setHistory([]);
    setScreen('trail');
  }, [blank, initialSoulPoints, quiz.skillId]);

  const skillStateFor = useCallback(
    (order: number): SkillState => {
      if (order === 1) {
        if (progress.missionDone) return 'completed';
        const started =
          progress.learnDone || progress.quizPassed || progress.missionAccepted;
        return started ? 'in_progress' : 'available';
      }
      if (order === 2) return progress.missionDone ? 'available' : 'locked';
      return 'locked';
    },
    [progress.learnDone, progress.missionAccepted, progress.missionDone, progress.quizPassed],
  );

  return {
    screen,
    go,
    back,
    canGoBack: screen !== 'trail',
    progress,
    soulPoints,
    activeSkillId,
    setActiveSkillId,
    markSectionSeen,
    finishLearn,
    answer,
    gradeQuiz,
    resetQuiz,
    acceptMission,
    registerCheckItem,
    completeMission: complete,
    reset,
    skillStateFor,
  };
}
