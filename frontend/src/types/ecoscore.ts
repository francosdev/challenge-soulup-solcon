export type SkillId = 'reciclagem' | 'consumo' | 'agua' | 'energia';

export type SkillState = 'locked' | 'available' | 'in_progress' | 'completed';

/** As quatro etapas da jornada de uma habilidade. */
export type StageId = 'learn' | 'validate' | 'practice' | 'conquer';

/**
 * Parceiro comercial. No protótipo os nomes são marcadores — não existe
 * acordo firmado com nenhuma empresa.
 */
export interface Sponsor {
  name: string;
  /** Segmento do parceiro, ex. 'Energia'. */
  segment: string;
}

/**
 * Benefício entregue pelo parceiro ao concluir uma jornada.
 * Não é moeda e não entra no saldo: a única moeda é Soul Points.
 */
export interface PartnerReward {
  /** Nome curto do benefício, ex. 'Cupom de 20% na conta de luz'. */
  label: string;
  description: string;
  sponsor: Sponsor;
}

/** Desafio sazonal de um parceiro, exibido no topo da trilha. */
export interface SponsoredChallenge {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  /** Quantas missões precisam ser concluídas. */
  missionCount: number;
  /** Recompensa em Soul Points — soma à mesma moeda de sempre. */
  reward: number;
  partnerReward: string;
  sponsor: Sponsor;
}

export interface Skill {
  id: SkillId;
  /** Posição na trilha, 1-indexada. */
  order: number;
  name: string;
  /** Chamada curta exibida no card da trilha. */
  tagline: string;
  /** Soul Points por ação registrada nesta habilidade. */
  pointsPerAction: number;
  /** Recompensa da missão, em Soul Points. */
  missionReward: number;
  /** O nó final da trilha é destacado em sun. */
  isFinal?: boolean;
  /** Habilidade inteira bancada por um parceiro. */
  sponsor?: Sponsor;
}

export interface ContentRow {
  term: string;
  description: string;
}

export interface ContentSection {
  title: string;
  paragraphs: string[];
  rows?: ContentRow[];
  /** Fecha a seção depois das linhas. */
  closing?: string;
}

export interface LearnContent {
  skillId: SkillId;
  subtitle: string;
  objective: string;
  estimatedMinutes: number;
  /** Rótulo do formato, ex. 'Artigo + vídeo (2:10)'. */
  format: string;
  sections: ContentSection[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  /** Índice da alternativa correta em `options`. */
  correctIndex: number;
  feedbackCorrect: string;
  feedbackWrong: string;
}

export interface Quiz {
  skillId: SkillId;
  questions: QuizQuestion[];
  /** Acertos necessários para aprovar. */
  passingScore: number;
}

export type MissionDifficulty = 'Iniciante' | 'Intermediário' | 'Avançado';

export interface MissionCheckItem {
  id: string;
  /** Tipo de resíduo ou ação a registrar. */
  label: string;
}

export interface Mission {
  skillId: SkillId;
  title: string;
  description: string;
  objective: string;
  durationDays: number;
  difficulty: MissionDifficulty;
  reward: number;
  checklist: MissionCheckItem[];
  /** Impacto estimado ao concluir, em kg de CO2e evitado. */
  estimatedCo2eKg: number;
  /** Presente quando a missão é bancada por um parceiro. */
  partnerReward?: PartnerReward;
}

export interface JourneyProgress {
  skillId: SkillId;
  learnDone: boolean;
  sectionsSeen: boolean[];
  quizPassed: boolean;
  lastQuizScore: number | null;
  missionAccepted: boolean;
  /** Ids de `Mission.checklist` já registrados. */
  registeredIds: string[];
  missionDone: boolean;
}

export interface Wallet {
  /** Saldo em Soul Points — moeda única do produto. */
  soulPoints: number;
  /** Taxa de conversão: 110 SP = R$ 1. */
  pointsPerReal: number;
}

export interface ProofCapture {
  checkItemId: string;
  /** Data URL ou id do upload. */
  photo: string;
  capturedAt: string;
  coords: { lat: number; lng: number };
}
