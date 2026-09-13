import type { Mood, PetState } from '../types/petplanet'

/** Estado do protótipo Pet Planet guardado no navegador (localStorage). */

const STATE_KEY = 'ecoscore.petplanet.v2'

export const NOW = (): number => Date.now()

export const DEFAULT_STATE: PetState = {
  onboarded: false,
  level: 12,
  xp: 1842,
  xpToNext: 2500,
  co2: 47.3,
  coins: 1842,
  streak: 14,
  metrics: { trees: 3.2, water: 184, waste: 12.4, energy: 9.1 },
  history: [
    { id: 1, type: 'recic', qty: '6 itens', points: 24, co2: 1.2, ts: NOW() - 86400000 * 0.6 },
    { id: 2, type: 'agua', qty: 'rega', points: 8, co2: 0, ts: NOW() - 86400000 * 1.3 },
    { id: 3, type: 'agua', qty: '3 banhos curtos', points: 15, co2: 0.4, ts: NOW() - 86400000 * 2.2 },
    { id: 4, type: 'trilha', qty: 'trilha água cap. 1', points: 50, co2: 0, ts: NOW() - 86400000 * 3.1 },
    { id: 5, type: 'compost', qty: 'compostagem', points: 12, co2: 0.3, ts: NOW() - 86400000 * 4.0 },
    { id: 6, type: 'energia', qty: 'lâmpada LED ×2', points: 18, co2: 0.7, ts: NOW() - 86400000 * 5.4 },
  ],
  redeemed: [],
  lastActionAt: NOW() - 3600000 * 2,
}

export function loadState(): PetState {
  try {
    const raw = localStorage.getItem(STATE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    return { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<PetState>) }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

export function saveState(s: PetState): void {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(s))
  } catch {
    // localStorage indisponível (modo privado): o protótipo segue em memória.
  }
}

export function clearState(): void {
  localStorage.removeItem(STATE_KEY)
}

export function moodFromState(s: PetState): Mood {
  const hoursSince = (NOW() - s.lastActionAt) / 3600000
  if (hoursSince < 0.05) return 'celebrating'
  if (hoursSince < 24) return 'happy'
  if (hoursSince < 48) return 'sleepy'
  return 'sad'
}

export function healthFromState(s: PetState): number {
  const days = (NOW() - s.lastActionAt) / 86400000
  const decay = Math.min(0.6, Math.max(0, days * 0.05))
  return Math.max(0.08, 0.74 - decay)
}
