import { useState } from 'react'
import type { ActionId, PetPalette, StickerKind, SubmittedAction } from '../../../types/petplanet'
import { Coin } from '../Coin'
import { PhoneFrame } from '../PhoneFrame'
import { Sparkle } from '../Sparkle'
import { Sticker } from '../Sticker'

interface ActionType {
  id: ActionId
  k: StickerKind
  /** Cor do desenho do selo, em SVG. */
  c: string
  /** Fundo do botão quando a ação está selecionada. */
  fundo: string
  l: string
  pts: number
  co2: number
}

const ACTION_TYPES: ActionType[] = [
  { id: 'recic', k: 'leaf', c: '#29B4B7', fundo: 'bg-soul', l: 'Reciclei', pts: 24, co2: 1.2 },
  { id: 'agua', k: 'drop', c: '#A4DBDE', fundo: 'bg-soul-light', l: 'Economizei água', pts: 15, co2: 0.4 },
  { id: 'energia', k: 'bolt', c: '#C8A84B', fundo: 'bg-sun', l: 'Poupei energia', pts: 18, co2: 0.7 },
  { id: 'verde', k: 'tree', c: '#EBD9A8', fundo: 'bg-sun-line', l: 'Plantei / verde', pts: 30, co2: 0.5 },
]

const QTY_CHIPS = ['1 item', '2 itens', '3-5', '+5', 'personalizado'] as const

type RegisterScreenProps = {
  pal: PetPalette
  onCancel: () => void
  onSubmit: (action: SubmittedAction) => void
}

export function RegisterScreen({ pal, onCancel, onSubmit }: RegisterScreenProps) {
  const [type, setType] = useState<ActionId>(ACTION_TYPES[0].id)
  const [qty, setQty] = useState<string>(QTY_CHIPS[1])
  const [photo, setPhoto] = useState<boolean>(false)
  const sel = ACTION_TYPES.find((a) => a.id === type) ?? ACTION_TYPES[0]

  return (
    <PhoneFrame>
      <div className="absolute inset-x-0 bottom-0 top-7 flex flex-col">
        <div className="flex items-center justify-between px-[14px] py-2">
          <button type="button" onClick={onCancel} className="cursor-pointer text-[14px] font-semibold text-white">
            ← voltar
          </button>
          <span className="font-mono text-[10px] tracking-[1px] text-[#8FA3B0]">NOVA AÇÃO</span>
          <span className="w-[60px]" />
        </div>

        <div className="flex-1 overflow-y-auto px-[14px] pb-3.5 pt-1">
          <div className="mb-1.5 text-[14px] font-bold">o que você fez?</div>
          <div className="grid grid-cols-[1fr_1fr] gap-2">
            {ACTION_TYPES.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setType(a.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-xl px-2 py-2.5 text-left text-[13px] font-bold ${
                  type === a.id ? `border-2 border-white text-navy-dark ${a.fundo}` : 'border-[1.5px] border-soul-deep bg-navy text-white'
                }`}
              >
                <Sticker pal={pal} kind={a.k} size={28} color={type === a.id ? pal.paper : a.c} tilt={-4} label={null} />
                <span>{a.l}</span>
              </button>
            ))}
          </div>

          <div className="mb-1.5 mt-3.5 text-[14px] font-bold">foto pra validar 📸</div>
          <button
            type="button"
            onClick={() => setPhoto(true)}
            className={`flex w-full cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 p-3.5 text-white ${
              photo ? 'border-solid border-soul bg-soul/[.14]' : 'border-dashed border-soul-deep bg-navy'
            }`}
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-soul-deep ${photo ? 'bg-soul' : 'bg-soul/[.14]'}`}
            >
              <svg width="22" height="18" viewBox="0 0 28 22">
                <rect x="1" y="5" width="26" height="16" rx="2" fill="none" stroke={pal.line} strokeWidth="2" />
                <circle cx="14" cy="13" r="5" fill={photo ? pal.bg : 'none'} stroke={pal.line} strokeWidth="2" />
                <rect x="9" y="2" width="10" height="4" rx="1" fill="none" stroke={pal.line} strokeWidth="2" />
              </svg>
            </div>
            <span className="text-[13px] font-semibold">
              {photo ? '✓ foto registrada · validada por IA' : 'tocar pra abrir câmera'}
            </span>
            <span className="font-mono text-[9px] text-[#8FA3B0]">captura direta · sem upload manual</span>
          </button>

          <div className="mb-1.5 mt-3.5 text-[13px] font-bold">quanto?</div>
          <div className="flex flex-wrap gap-1.5">
            {QTY_CHIPS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setQty(q)}
                className={`cursor-pointer rounded-full border-[1.5px] px-3 py-[5px] text-[12px] font-bold ${
                  qty === q ? 'border-soul bg-soul text-navy-dark' : 'border-soul-deep bg-navy text-white'
                }`}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="mt-3.5 flex items-center gap-2 rounded-xl border-[1.5px] border-soul-deep bg-soul/[.14] px-3 py-2.5">
            <Sparkle size={14} color={pal.sun} stroke={pal.line} />
            <span className="flex-1 text-[12px] font-semibold text-white">vai render</span>
            <Coin pal={pal} size={20} label={`+${sel.pts}`} />
            <span className="text-[13px] font-bold text-soul-light">+{sel.co2.toFixed(1)}kg CO₂</span>
          </div>
        </div>

        <div className="px-[14px] pb-3.5 pt-2">
          <button
            type="button"
            onClick={() => photo && onSubmit({ type, qty, points: sel.pts, co2: sel.co2 })}
            disabled={!photo}
            className={`w-full rounded-[14px] border-2 border-soul-deep px-3.5 py-3 text-[16px] font-bold ${
              photo ? 'cursor-pointer bg-soul text-navy-dark' : 'cursor-not-allowed bg-soul-deep text-[#8FA3B0] opacity-60'
            }`}
          >
            {photo ? 'alimentar planetinha →' : 'tira uma foto primeiro'}
          </button>
        </div>
      </div>
    </PhoneFrame>
  )
}
