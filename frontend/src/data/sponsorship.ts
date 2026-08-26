import type { PartnerReward, Sponsor, SponsoredChallenge } from '../types/ecoscore'

/**
 * Monetização do EcoScore: o parceiro não compra espaço, ele banca uma jornada.
 *
 * São três formatos, do mais leve ao mais profundo:
 *
 * 1. **Missão patrocinada** — uma missão dentro de uma habilidade existente.
 * 2. **Desafio sazonal** — um conjunto de missões com prazo, no topo da trilha.
 * 3. **Habilidade patrocinada** — o parceiro banca a trilha inteira, das quatro
 *    etapas ao selo.
 *
 * Em nenhum deles o parceiro interfere na correção do quiz, na validação da
 * evidência ou no ranking. E o benefício do parceiro nunca é moeda: os Soul
 * Points seguem sendo a única unidade do produto.
 *
 * Os nomes abaixo são MARCADORES. Não existe acordo com nenhuma empresa.
 */

export const PARCEIRO_AGUA: Sponsor = { name: 'Parceiro exemplo', segment: 'Saneamento' }
export const PARCEIRO_RECICLAGEM: Sponsor = { name: 'Parceiro exemplo', segment: 'Reciclagem' }
export const PARCEIRO_CONSUMO: Sponsor = { name: 'Parceiro exemplo', segment: 'Varejo' }

/** Benefício entregue ao concluir a missão de Reciclagem no protótipo. */
export const RECICLAGEM_PARTNER_REWARD: PartnerReward = {
  label: 'Cupom de R$ 20 em feira orgânica parceira',
  description:
    'Liberado ao concluir a jornada, não por saldo de pontos. Vale uma vez por ciclo.',
  sponsor: PARCEIRO_RECICLAGEM,
}

/** Desafio sazonal exibido no topo da trilha. */
export const DESAFIO_PATROCINADO: SponsoredChallenge = {
  id: 'consumo-7-dias',
  title: '7 dias de consumo consciente',
  description: 'Registre uma escolha de consumo por dia durante uma semana.',
  durationDays: 7,
  missionCount: 5,
  reward: 40,
  partnerReward: 'Cupom exclusivo do parceiro',
  sponsor: PARCEIRO_CONSUMO,
}

/** Os três formatos, para a página institucional. */
export interface FormatoPatrocinio {
  id: string
  titulo: string
  texto: string
  exemplo: string
}

export const FORMATOS_PATROCINIO: readonly FormatoPatrocinio[] = [
  {
    id: 'missao',
    titulo: 'Missão patrocinada',
    texto:
      'Uma missão dentro de uma habilidade que já existe. O parceiro entra na etapa de praticar, com um benefício ao final.',
    exemplo: 'Recicle 5 itens · recompensa em Soul Points e cupom do parceiro',
  },
  {
    id: 'desafio',
    titulo: 'Desafio sazonal',
    texto:
      'Um conjunto de missões com prazo, destacado no topo da trilha. Serve a campanhas com data marcada.',
    exemplo: '7 dias de consumo consciente · 5 missões · 40 Soul Points',
  },
  {
    id: 'habilidade',
    titulo: 'Habilidade patrocinada',
    texto:
      'O parceiro banca a trilha inteira: conteúdo, quiz, missão e selo. É o formato mais profundo — e o que exige mais responsabilidade editorial.',
    exemplo: 'Água, em parceria com uma empresa de saneamento',
  },
] as const

/** Limites que o modelo impõe a si mesmo, exibidos na página institucional. */
export const LIMITES_PATROCINIO: readonly string[] = [
  'O parceiro não corrige quiz, não valida evidência e não influencia o ranking.',
  'O benefício do parceiro nunca é moeda: Soul Points seguem sendo a única unidade.',
  'Todo conteúdo patrocinado é identificado como tal, sempre.',
  'Conteúdo educativo é revisado pelo time, não escrito pelo parceiro.',
] as const
