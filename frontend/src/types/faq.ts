export interface PerguntaFaq {
  id: string
  pergunta: string
  resposta: string
}

export interface CategoriaFaq {
  id: string
  titulo: string
  icone: 'circle-help' | 'star' | 'bot' | 'trophy' | 'settings'
  perguntas: readonly PerguntaFaq[]
}
