import { useEffect, useRef } from 'react'

type Categoria = 'micro' | 'small' | 'medium'
type Forma = 'circle' | 'diamond'

interface Esporo {
  originX: number
  originY: number
  size: number
  category: Categoria
  maxOpacity: number
  shape: Forma
  wobbleFreq: number
  wobbleAmp: number
  wobblePhase: number
  speed: number
  colorStart: number
  colorEnd: number
  life: number
  totalLife: number
  fadeInEnd: number
  fadeOutStart: number
}

/**
 * Paradas de cor da SoulUp. O campo de esporos original interpolava entre
 * verdes e roxos; aqui percorre teal → teal claro → navy → âmbar → teal profundo.
 */
const STOPS: readonly (readonly [number, number, number])[] = [
  [41, 180, 183], // soul
  [164, 219, 222], // soul.light
  [22, 72, 107], // navy
  [200, 168, 75], // sun
  [15, 95, 97], // soul.deep
] as const

function corEm(t: number): readonly [number, number, number] {
  const seg = (STOPS.length - 1) * t
  const i = Math.min(Math.floor(seg), STOPS.length - 2)
  const f = seg - i
  const a = STOPS[i]
  const b = STOPS[i + 1]
  return [
    Math.round(a[0] + (b[0] - a[0]) * f),
    Math.round(a[1] + (b[1] - a[1]) * f),
    Math.round(a[2] + (b[2] - a[2]) * f),
  ]
}

function criarEsporo(w: number, h: number, vidaAleatoria: boolean): Esporo {
  const r = Math.random()
  let size: number
  let category: Categoria

  if (r < 0.6) {
    size = 0.5 + Math.random() * 0.7
    category = 'micro'
  } else if (r < 0.9) {
    size = 1.2 + Math.random() * 1.0
    category = 'small'
  } else {
    size = 2.2 + Math.random() * 1.3
    category = 'medium'
  }

  const maxOpacity = category === 'micro' ? 0.2 : category === 'small' ? 0.36 : 0.55
  const totalLife = 200 + Math.random() * 300

  return {
    originX: Math.random() * w,
    originY: h * 0.5 + Math.random() * h * 0.5,
    size,
    category,
    maxOpacity,
    shape: Math.random() < 0.8 ? 'circle' : 'diamond',
    wobbleFreq: 0.5 + Math.random() * 1.5,
    wobbleAmp: 3 + Math.random() * 5,
    wobblePhase: Math.random() * Math.PI * 2,
    speed: 0.18 + Math.random() * 0.42,
    colorStart: Math.random(),
    colorEnd: Math.random(),
    life: vidaAleatoria ? Math.random() * totalLife : 0,
    totalLife,
    fadeInEnd: totalLife * 0.15,
    fadeOutStart: totalLife * 0.82,
  }
}

export interface SporesProps {
  className?: string
}

/**
 * Campo de esporos que sobe devagar, portado do canvas do site anterior.
 * Puramente decorativo: fica atrás do conteúdo e sai do fluxo de acessibilidade.
 * Respeita `prefers-reduced-motion` desenhando um único quadro estático.
 */
export function Spores({ className = '' }: SporesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let esporos: Esporo[] = []
    let alvo = 0
    let raf = 0

    const redimensionar = (): void => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      if (w <= 0 || h <= 0) return
      canvas.width = w
      canvas.height = h
      alvo = Math.min(120, Math.max(35, Math.floor((w * h) / 7000)))
    }

    const desenhar = (): void => {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (let i = esporos.length - 1; i >= 0; i--) {
        const p = esporos[i]
        p.life++

        if (p.life >= p.totalLife) {
          esporos[i] = criarEsporo(W, H, false)
          continue
        }

        const t = p.life / p.totalLife
        const x = p.originX + Math.sin(p.wobblePhase + t * p.wobbleFreq * Math.PI * 2) * p.wobbleAmp
        const y = p.originY - p.speed * p.life

        if (y < -p.size * 3) {
          esporos[i] = criarEsporo(W, H, false)
          continue
        }

        let opacity: number
        if (p.life < p.fadeInEnd) {
          opacity = (p.life / p.fadeInEnd) * p.maxOpacity
        } else if (p.life < p.fadeOutStart) {
          opacity = p.maxOpacity
        } else {
          opacity = ((p.totalLife - p.life) / (p.totalLife - p.fadeOutStart)) * p.maxOpacity
        }

        const colorT = (((p.colorStart + (p.colorEnd - p.colorStart) * t) % 1) + 1) % 1
        const [r, g, b] = corEm(colorT)

        ctx.save()
        ctx.globalAlpha = Math.max(0, opacity)

        if (p.shape === 'circle') {
          if (p.category === 'medium') {
            const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3)
            grd.addColorStop(0, `rgba(${r},${g},${b},0.25)`)
            grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
            ctx.beginPath()
            ctx.arc(x, y, p.size * 3, 0, Math.PI * 2)
            ctx.fillStyle = grd
            ctx.fill()
          }
          ctx.beginPath()
          ctx.arc(x, y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fill()
        } else {
          ctx.translate(x, y)
          ctx.rotate(Math.PI / 4)
          if (p.category === 'medium') {
            const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 3)
            grd.addColorStop(0, `rgba(${r},${g},${b},0.25)`)
            grd.addColorStop(1, `rgba(${r},${g},${b},0)`)
            ctx.fillStyle = grd
            ctx.fillRect(-p.size * 2.5, -p.size * 2.5, p.size * 5, p.size * 5)
          }
          ctx.fillStyle = `rgb(${r},${g},${b})`
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2)
        }

        ctx.restore()
      }

      while (esporos.length < alvo) {
        esporos.push(criarEsporo(W, H, false))
      }
    }

    const loop = (): void => {
      desenhar()
      raf = requestAnimationFrame(loop)
    }

    const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const iniciar = (): void => {
      redimensionar()
      esporos = []
      for (let i = 0; i < alvo; i++) {
        esporos.push(criarEsporo(canvas.width, canvas.height, true))
      }
      if (semMovimento) {
        desenhar()
      } else {
        raf = requestAnimationFrame(loop)
      }
    }

    iniciar()

    const observer = new ResizeObserver(() => {
      if (raf) cancelAnimationFrame(raf)
      iniciar()
    })
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={`h-full w-full ${className}`} />
}
