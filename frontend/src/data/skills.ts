import type { Skill } from '../types/ecoscore';
import { PARCEIRO_AGUA } from './sponsorship';

export const SKILLS: Skill[] = [
  {
    id: 'reciclagem',
    order: 1,
    name: 'Reciclagem',
    tagline: 'Separe sem contaminar o material.',
    pointsPerAction: 3,
    missionReward: 12,
  },
  {
    id: 'consumo',
    order: 2,
    name: 'Consumo Consciente',
    tagline: 'Compre menos, escolha melhor, descarte certo.',
    pointsPerAction: 3,
    missionReward: 12,
  },
  {
    id: 'agua',
    order: 3,
    name: 'Água',
    tagline: 'Reduza o consumo onde ele é invisível.',
    pointsPerAction: 3,
    missionReward: 12,
    sponsor: PARCEIRO_AGUA,
  },
  {
    id: 'energia',
    order: 4,
    name: 'Energia',
    tagline: 'Última habilidade da trilha.',
    pointsPerAction: 3,
    missionReward: 12,
    isFinal: true,
  },
];

export const POINTS_PER_REAL = 110;

export function pointsToReais(points: number): number {
  return Math.floor(points / POINTS_PER_REAL);
}
