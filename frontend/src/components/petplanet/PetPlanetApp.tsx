import { useEffect, useState, type ReactNode } from 'react'
import { clearState, DEFAULT_STATE, loadState, NOW, saveState } from '../../services/petplanet'
import type { HistoryEntry, PetState, Screen, SubmittedAction } from '../../types/petplanet'
import { PET_PALETTE } from './palette'
import { DashboardScreen } from './telas/DashboardScreen'
import { HistoryScreen } from './telas/HistoryScreen'
import { OnboardingScreen } from './telas/OnboardingScreen'
import { ProfileScreen } from './telas/ProfileScreen'
import { RegisterScreen } from './telas/RegisterScreen'
import { SuccessScreen } from './telas/SuccessScreen'

/** Protótipo Pet Planet: guarda o estado e decide qual tela mostrar. */
export function PetPlanetApp() {
  const pal = PET_PALETTE
  const [state, setState] = useState<PetState>(loadState)
  const [screen, setScreen] = useState<Screen>(state.onboarded ? 'dashboard' : 'onboarding')
  const [lastGained, setLastGained] = useState<{ points: number; co2: number } | null>(null)

  useEffect(() => {
    saveState(state)
  }, [state])

  const finishOnboarding = (): void => {
    setState((s) => ({ ...s, onboarded: true }))
    setScreen('dashboard')
  }

  const submitAction = (action: SubmittedAction): void => {
    const entry: HistoryEntry = {
      id: NOW(),
      type: action.type,
      qty: action.qty,
      points: action.points,
      co2: action.co2,
      ts: NOW(),
    }
    setState((s) => ({
      ...s,
      co2: +(s.co2 + action.co2).toFixed(1),
      coins: s.coins + action.points,
      xp: Math.min(s.xpToNext, s.xp + action.points),
      lastActionAt: NOW(),
      history: [entry, ...s.history].slice(0, 30),
      metrics: {
        ...s.metrics,
        waste: action.type === 'recic' ? +(s.metrics.waste + 0.6).toFixed(1) : s.metrics.waste,
      },
    }))
    setLastGained({ points: action.points, co2: action.co2 })
    setScreen('success')
  }

  const resetAll = (): void => {
    if (!window.confirm('Resetar todo o progresso da demo?')) return
    clearState()
    setState(DEFAULT_STATE)
    setScreen('onboarding')
  }

  let body: ReactNode
  if (screen === 'onboarding') {
    body = <OnboardingScreen pal={pal} onDone={finishOnboarding} />
  } else if (screen === 'register') {
    body = <RegisterScreen pal={pal} onCancel={() => setScreen('dashboard')} onSubmit={submitAction} />
  } else if (screen === 'success') {
    body = <SuccessScreen pal={pal} gained={lastGained ?? { points: 0, co2: 0 }} onContinue={() => setScreen('dashboard')} />
  } else if (screen === 'history') {
    body = <HistoryScreen pal={pal} state={state} onNavigate={setScreen} />
  } else if (screen === 'profile') {
    body = <ProfileScreen pal={pal} state={state} onNavigate={setScreen} onReset={resetAll} />
  } else {
    body = <DashboardScreen pal={pal} state={state} onNavigate={setScreen} />
  }

  // O fundo fica a cargo da página que hospeda o protótipo.
  return (
    <div className="flex w-full items-center justify-center p-5">
      <div key={screen} className="drop-shadow-[0_18px_40px_rgba(14,53,80,0.22)] motion-safe:animate-pp-screen-in">
        {body}
      </div>
    </div>
  )
}
