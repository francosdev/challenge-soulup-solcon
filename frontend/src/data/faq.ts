export interface PerguntaFaq {
  id: string
  pergunta: string
  resposta: string
}

export interface CategoriaFaq {
  id: string
  titulo: string
  perguntas: readonly PerguntaFaq[]
}

export const FAQ: readonly CategoriaFaq[] = [
  {
    id: 'geral',
    titulo: 'Geral',
    perguntas: [
      {
        id: 'geral-1',
        pergunta: 'O que é o EcoScore?',
        resposta:
          'O EcoScore é uma camada de gamificação sustentável sobre a plataforma SoulUp (by Prospera). Ele transforma ações sustentáveis reais em Soul Points, que se convertem em recompensas concretas — incluindo ter a conta de energia elétrica subsidiada ao liderar o ranking mensal.',
      },
      {
        id: 'geral-2',
        pergunta: 'O EcoScore já está disponível para uso?',
        resposta:
          'O EcoScore foi desenvolvido como proposta para o Challenge FIAP 2026, em parceria com a SoulUp. Este site apresenta o conceito e a solução. O produto final seria integrado à plataforma SoulUp após desenvolvimento e testes com usuários reais.',
      },
      {
        id: 'geral-3',
        pergunta: 'Quem pode participar?',
        resposta:
          'Qualquer usuário cadastrado na plataforma SoulUp. O sistema é voltado para pessoas físicas maiores de 16 anos, residentes no Brasil, interessadas em adotar e registrar hábitos sustentáveis no dia a dia.',
      },
    ],
  },
  {
    id: 'soul-points',
    titulo: 'Soul Points',
    perguntas: [
      {
        id: 'pontos-1',
        pergunta: 'Como eu ganho Soul Points?',
        resposta:
          'Registrando ações nas quatro categorias do MVP. Plantio credita 5 Soul Points, reciclagem 3, energia 2 e água 0,1 por unidade registrada. Cada camada concluída — quiz, evidência por foto no app ou selo — credita pontos usando o sistema da SoulUp. Sem moeda adicional e sem conversão.',
      },
      {
        id: 'pontos-2',
        pergunta: 'Os Soul Points têm prazo de validade?',
        resposta:
          'Para o ranking mensal, os pontos são zerados no início de cada mês e um novo ciclo começa. Os Pontos Soul acumulados no perfil, usados para desbloquear itens do avatar, skill tree e jardim, são permanentes e não expiram.',
      },
      {
        id: 'pontos-3',
        pergunta: 'Posso perder Soul Points?',
        resposta:
          'Sim. Se uma ação aprovada provisoriamente for reprovada em revisão humana por suspeita de fraude, os pontos correspondentes são removidos. Fraude comprovada resulta em perda total dos pontos e banimento da conta.',
      },
    ],
  },
  {
    id: 'validacao',
    titulo: 'Validação por IA',
    perguntas: [
      {
        id: 'validacao-1',
        pergunta: 'Como funciona a validação por IA?',
        resposta:
          'Você fotografa a ação direto pelo app, sem upload externo. A foto carrega metadados de GPS e timestamp automaticamente. Para plantio, uma segunda foto é exigida 14 dias depois. Essa estrutura elimina o principal vetor de fraude sem adicionar fricção para quem age de boa-fé.',
      },
      {
        id: 'validacao-2',
        pergunta: 'E se minha ação for reprovada injustamente?',
        resposta:
          'Você pode solicitar revisão humana em até 48 horas após a reprovação. Abra um chamado pelo app com sua justificativa: uma equipe especializada reavalia a evidência e responde em até 5 dias úteis.',
      },
      {
        id: 'validacao-3',
        pergunta: 'A IA tem acesso à câmera do meu celular?',
        resposta:
          'A câmera é acessada apenas no momento em que você abre a função de captura dentro do app. A foto é enviada aos servidores da SoulUp com localização e timestamp. Não há gravação em background.',
      },
    ],
  },
  {
    id: 'recompensas',
    titulo: 'Ranking e recompensas',
    perguntas: [
      {
        id: 'recompensa-1',
        pergunta: 'Como funciona a conta de energia subsidiada?',
        resposta:
          'Quem lidera o ranking mensal recebe crédito equivalente à conta de energia elétrica do mês seguinte, creditado na plataforma SoulUp. O valor é calculado sobre a fatura comprovada, com limite de R$ 500 por mês.',
      },
      {
        id: 'recompensa-2',
        pergunta: 'Quais outras recompensas existem além do primeiro lugar?',
        resposta:
          'O top 10 recebe itens exclusivos de avatar, desbloqueio antecipado de quests sazonais e badges no perfil. Todos os usuários acumulam Pontos Soul para desbloquear roupas, acessórios, pets e novos espaços no jardim virtual.',
      },
      {
        id: 'recompensa-3',
        pergunta: 'O ranking é nacional ou regional?',
        resposta:
          'Existem os dois. A recompensa de energia subsidiada vale para o primeiro lugar nacional; os rankings estaduais têm recompensas próprias, menores, porém acessíveis a mais participantes.',
      },
    ],
  },
  {
    id: 'tecnico',
    titulo: 'Técnico',
    perguntas: [
      {
        id: 'tecnico-1',
        pergunta: 'Qual é a stack deste front-end?',
        resposta:
          'React 18 com TypeScript, Vite como bundler e TailwindCSS para estilização. A navegação usa react-router-dom, o formulário de contato usa react-hook-form e os ícones vêm do lucide-react. Não há CSS externo: toda a estilização está em classes utilitárias e nos tokens do tailwind.config.ts.',
      },
      {
        id: 'tecnico-2',
        pergunta: 'O site é responsivo?',
        resposta:
          'Sim, com abordagem mobile-first validada em 480px, 768px e 1280px. Até 768px os grids ficam em no máximo 2 colunas, o menu vira hambúrguer e não há scroll horizontal em nenhum breakpoint.',
      },
    ],
  },
] as const
