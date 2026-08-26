import { useState } from 'react';
import { AppShell } from './ui/AppShell';
import { Button } from '../ui/Button';
import { TrailScreen } from './trail/TrailScreen';
import { SkillOverview } from './skill/SkillOverview';
import { LearnScreen } from './learn/LearnScreen';
import { QuizScreen } from './quiz/QuizScreen';
import { QuizResult } from './quiz/QuizResult';
import { MissionOffer } from './mission/MissionOffer';
import { MissionProgress } from './mission/MissionProgress';
import { MissionProof } from './mission/MissionProof';
import { AchievementScreen } from './achievement/AchievementScreen';
import { useJourney } from '../../lib/useJourney';
import { SKILLS } from '../../data/skills';
import { RECYCLING_LEARN, RECYCLING_MISSION, RECYCLING_QUIZ } from '../../data/recycling';
import type { ProofCapture, SkillId } from '../../types/ecoscore';

interface EcoScoreJourneyProps {
  /** Saldo inicial em Soul Points. */
  initialSoulPoints?: number;
}

/**
 * Composição das telas. É o único componente com conhecimento de navegação —
 * troque por rotas quando integrar ao router do projeto.
 */
export function EcoScoreJourney({ initialSoulPoints = 1198 }: EcoScoreJourneyProps) {
  const journey = useJourney({
    quiz: RECYCLING_QUIZ,
    mission: RECYCLING_MISSION,
    sectionCount: RECYCLING_LEARN.sections.length,
    initialSoulPoints,
  });

  const [capture, setCapture] = useState<ProofCapture | null>(null);
  const { screen, progress } = journey;

  const recycling = SKILLS[0];
  const activeSkill = SKILLS.find((s) => s.id === journey.activeSkillId) ?? recycling;
  const pendingSkill = activeSkill.id !== 'reciclagem';

  const currentStage =
    (progress.learnDone ? 1 : 0) + (progress.quizPassed ? 1 : 0) + (progress.missionAccepted ? 1 : 0) + 1;

  const openSkill = (id: SkillId) => {
    journey.setActiveSkillId(id);
    journey.go('skill');
  };

  const footerFor = () => {
    switch (screen) {
      case 'learn':
        return (
          <Button className="w-full"
            muted={progress.sectionsSeen.some((seen) => !seen)}
            onClick={() => {
              journey.finishLearn();
              journey.go('quiz');
            }}
          >
            Concluir conteúdo
          </Button>
        );
      case 'missionOffer':
        return (
          <Button className="w-full"
            onClick={() => {
              journey.acceptMission();
              journey.go('missionProgress');
            }}
          >
            Aceitar missão
          </Button>
        );
      case 'missionProgress':
        return (
          <Button className="w-full"
            onClick={() => {
              setCapture(null);
              journey.go('missionProof');
            }}
          >
            Registrar separação
          </Button>
        );
      case 'missionProof':
        return (
          <Button className="w-full"
            muted={!capture}
            onClick={() => {
              if (!capture) return;
              // TODO(api): submitProof(capture) antes de creditar.
              journey.completeMission();
              journey.go('achievement');
            }}
          >
            Concluir missão
          </Button>
        );
      case 'achievement':
        return <Button className="w-full" onClick={journey.reset}>Voltar para a trilha</Button>;
      default:
        return null;
    }
  };

  return (
    <AppShell
      soulPoints={journey.soulPoints}
      onBack={journey.canGoBack ? journey.back : undefined}
      footer={footerFor()}
    >
      {screen === 'trail' ? (
        <TrailScreen
          skills={SKILLS}
          stateFor={journey.skillStateFor}
          currentStage={currentStage}
          completedSummary={
            progress.missionDone ? { skill: recycling, mission: RECYCLING_MISSION } : null
          }
          onOpenSkill={openSkill}
        />
      ) : null}

      {screen === 'skill' ? (
        <SkillOverview
          skill={activeSkill}
          mission={RECYCLING_MISSION}
          progress={progress}
          pending={pendingSkill}
          onOpenLearn={() => journey.go('learn')}
          onOpenQuiz={() => journey.go('quiz')}
          onOpenMission={() =>
            journey.go(progress.missionAccepted ? 'missionProgress' : 'missionOffer')
          }
          onOpenAchievement={() => journey.go('achievement')}
        />
      ) : null}

      {screen === 'learn' ? (
        <LearnScreen
          skill={activeSkill}
          content={RECYCLING_LEARN}
          sectionsSeen={progress.sectionsSeen}
          onSectionOpen={journey.markSectionSeen}
        />
      ) : null}

      {screen === 'quiz' ? (
        <QuizScreen
          quiz={RECYCLING_QUIZ}
          onFinish={(answers) => {
            // TODO(api): submitQuiz — a correção deve migrar para o servidor.
            const { passed } = journey.gradeQuiz(answers);
            journey.go(passed ? 'quizPass' : 'quizFail');
          }}
        />
      ) : null}

      {screen === 'quizPass' || screen === 'quizFail' ? (
        <QuizResult
          passed={screen === 'quizPass'}
          score={progress.lastQuizScore ?? 0}
          total={RECYCLING_QUIZ.questions.length}
          onRetry={() => {
            journey.resetQuiz();
            journey.go('quiz');
          }}
          onReview={() => {
            journey.resetQuiz();
            journey.go('learn');
          }}
          onContinue={() => journey.go('missionOffer')}
        />
      ) : null}

      {screen === 'missionOffer' ? <MissionOffer mission={RECYCLING_MISSION} /> : null}

      {screen === 'missionProgress' ? (
        <MissionProgress
          mission={RECYCLING_MISSION}
          registeredIds={progress.registeredIds}
          daysLeft={2}
          registeredAtLabels={{ papel: 'registrado ontem', plastico: 'registrado hoje' }}
        />
      ) : null}

      {screen === 'missionProof' ? (
        <MissionProof
          mission={RECYCLING_MISSION}
          itemIndex={progress.registeredIds.length}
          capture={capture}
          onCapture={() =>
            setCapture({
              checkItemId: RECYCLING_MISSION.checklist[progress.registeredIds.length]?.id ?? 'metal',
              photo: '',
              capturedAt: new Date().toISOString(),
              coords: { lat: -23.5614, lng: -46.6559 },
            })
          }
        />
      ) : null}

      {screen === 'achievement' ? (
        <AchievementScreen
          skill={recycling}
          mission={RECYCLING_MISSION}
          balanceBefore={journey.soulPoints - RECYCLING_MISSION.reward}
          nextSkill={SKILLS[1]}
        />
      ) : null}
    </AppShell>
  );
}
