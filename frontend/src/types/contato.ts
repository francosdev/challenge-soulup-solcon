/** Valores aceitos no campo "Assunto" (value das opções do select). */
export type AssuntoContato = 'duvida' | 'sugestao' | 'parceria' | 'imprensa' | 'outro'

/** Campos do formulário de contato. */
export interface ContatoFormData {
  nome: string
  email: string
  /** Vazio enquanto nenhuma opção foi escolhida. */
  assunto: AssuntoContato | ''
  mensagem: string
}
