import { useId } from 'react'

/** Origem das transformações: centro da esfera em unidades do viewBox. */
const ORIGEM = '[transform-box:view-box] origin-[60px_54px]'
const ANIM_ESFERA = `motion-safe:animate-breathe ${ORIGEM}`
const ANIM_ANEL = `motion-safe:animate-orbit ${ORIGEM}`

export interface SolzinhoProps {
  /** Lado do SVG em pixels. Padrão: 120. */
  size?: number
  /** Ativa respiração da esfera e rotação do anel, sempre sob motion-safe. */
  animated?: boolean
  className?: string
}

/**
 * Solzinho — mascote do EcoScore.
 *
 * Construção: esfera com gradiente radial (volume de planeta), anel orbital
 * elíptico dividido em duas metades para atravessar a esfera, halo âmbar,
 * duas folhas assimétricas e sombra de contato dupla. Sem rosto: a
 * personalidade vem da forma e do movimento.
 */
export function Solzinho({ size = 120, animated = false, className = '' }: SolzinhoProps) {
  const uid = useId().replace(/:/g, '')
  const esferaId = `solzinho-esfera-${uid}`

  // Classes literais: o scanner do Tailwind não resolve nomes montados em runtime.
  const animEsfera = animated ? ANIM_ESFERA : ''
  const animAnel = animated ? ANIM_ANEL : ''

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Solzinho, mascote do EcoScore"
      className={className}
    >
      <defs>
        <radialGradient id={esferaId} cx="34%" cy="28%" r="78%">
          <stop offset="0%" stopColor="#3FC9CC" />
          <stop offset="100%" stopColor="#0F5F61" />
        </radialGradient>
      </defs>

      {/* Sombra de contato dupla */}
      <ellipse cx="60" cy="105" rx="34" ry="6.5" fill="#0F5F61" opacity="0.08" />
      <ellipse cx="60" cy="105" rx="17" ry="3.5" fill="#0F5F61" opacity="0.15" />

      {/* Halo âmbar — único uso de sun.* fora da gamificação de UI */}
      <circle cx="60" cy="54" r="41" fill="none" stroke="#C8A84B" strokeWidth="1.5" opacity="0.35" />

      {/* Anel orbital — metade de trás (passa POR TRÁS da esfera) */}
      <g className={animAnel}>
        <g transform="rotate(-20 60 54)">
          <path
            d="M 16 54 A 44 16.5 0 0 1 104 54"
            fill="none"
            stroke="#A4DBDE"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      </g>

      {/* Folhas assimétricas — atrás da esfera, brotando do topo */}
      <g fill="#8BAF6E">
        <g transform="translate(57 32) rotate(-58) scale(0.85)">
          <path d="M 0 0 C 2 -8 9 -14 17 -15 C 16 -6 9 0 0 0 Z" />
          <path
            d="M 1 -1 C 5 -5 10 -9 15 -13"
            fill="none"
            stroke="#0F5F61"
            strokeWidth="1"
            opacity="0.18"
          />
        </g>
        <g transform="translate(64 30) rotate(-12) scale(0.7)">
          <path d="M 0 0 C 2 -8 9 -14 17 -15 C 16 -6 9 0 0 0 Z" />
          <path
            d="M 1 -1 C 5 -5 10 -9 15 -13"
            fill="none"
            stroke="#0F5F61"
            strokeWidth="1"
            opacity="0.18"
          />
        </g>
      </g>

      {/* Esfera central */}
      <g className={animEsfera}>
        <circle cx="60" cy="54" r="30" fill={`url(#${esferaId})`} />
      </g>

      {/* Anel orbital — metade da frente (passa POR CIMA da esfera) */}
      <g className={animAnel}>
        <g transform="rotate(-20 60 54)">
          <path
            d="M 16 54 A 44 16.5 0 0 0 104 54"
            fill="none"
            stroke="#A4DBDE"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.7"
          />
        </g>
      </g>
    </svg>
  )
}
