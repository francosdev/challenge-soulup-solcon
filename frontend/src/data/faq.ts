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

export const FAQ: readonly CategoriaFaq[] = [
  {
    id: 'geral',
    titulo: 'Geral',
    icone: 'circle-help',
    perguntas: [
      {
        id: 'geral-1',
        pergunta: 'O que é o EcoScore?',
        resposta:
          'O EcoScore é um sistema de gamificação sustentável desenvolvido como uma camada sobre a plataforma SoulUp (by Prospera). Ele transforma ações sustentáveis reais em Soul Points, que podem ser trocados por recompensas concretas — incluindo ter sua conta de energia elétrica 100% subsidiada se você chegar ao topo do ranking mensal.',
      },
      {
        id: 'geral-2',
        pergunta: 'O EcoScore já está disponível para uso?',
        resposta:
          'O EcoScore foi desenvolvido como proposta para o Challenge FIAP 2026, em parceria com a SoulUp. Este site é a apresentação do conceito e solução. O produto final seria integrado à plataforma SoulUp após desenvolvimento e testes com usuários reais.',
      },
      {
        id: 'geral-3',
        pergunta: 'Quem pode participar do EcoScore?',
        resposta:
          'Qualquer usuário cadastrado na plataforma SoulUp pode acessar o EcoScore. O sistema é voltado para pessoas físicas maiores de 16 anos, residentes no Brasil, interessadas em adotar e registrar hábitos sustentáveis no dia a dia.',
      },
    ],
  },
  {
    id: 'soul-points',
    titulo: 'Soul Points',
    icone: 'star',
    perguntas: [
      {
        id: 'pontos-1',
        pergunta: 'Como eu ganho Soul Points?',
        resposta:
          'Você ganha Soul Points avançando nas trilhas das 3 classes: Reciclagem, Jardinagem e Água. Cada camada concluída — quiz, evidência (foto no app) ou selo — credita pontos usando o sistema da SoulUp. Sem moeda adicional, sem conversão, sem escolha desnecessária.',
      },
      {
        id: 'pontos-2',
        pergunta: 'Os Soul Points têm prazo de validade?',
        resposta:
          'Para fins do ranking mensal, os pontos são zerados no início de cada mês — um ranking novo começa. Porém, os pontos acumulados no perfil (para desbloqueio de itens do avatar, skill tree e jardim) são permanentes e não expiram.',
      },
      {
        id: 'pontos-3',
        pergunta: 'Posso perder Soul Points?',
        resposta:
          'Sim. Se uma ação que foi aprovada provisoriamente for posteriormente reprovada em revisão humana por suspeita de fraude, os pontos correspondentes são removidos. Tentativas de fraude comprovadas resultam em perda de todos os pontos e banimento da conta.',
      },
    ],
  },
  {
    id: 'validacao',
    titulo: 'Validação por IA',
    icone: 'bot',
    perguntas: [
      {
        id: 'validacao-1',
        pergunta: 'Como funciona a validação por IA?',
        resposta:
          'Você fotografa a ação direto pelo app — sem upload externo. A foto carrega metadados de GPS e timestamp automaticamente. Para Jardinagem, a intermediária 2 exige uma segunda foto 14 dias após o plantio. Essa estrutura elimina o principal vetor de fraude sem adicionar fricção para quem está sendo honesto.',
      },
      {
        id: 'validacao-2',
        pergunta: 'E se minha ação for reprovada injustamente?',
        resposta:
          'Você pode solicitar revisão humana em até 48 horas após a reprovação. O processo é simples: abra um chamado pelo app com sua justificativa. Uma equipe especializada reavalia a evidência e dá uma resposta definitiva em até 5 dias úteis.',
      },
      {
        id: 'validacao-3',
        pergunta: 'A IA tem acesso à câmera do meu celular?',
        resposta:
          'A câmera é acessada apenas no momento em que você abre a função de captura dentro do app. A foto é enviada para os servidores da SoulUp com os metadados de localização e timestamp. Não há gravação em background.',
      },
    ],
  },
  {
    id: 'recompensas',
    titulo: 'Ranking e recompensas',
    icone: 'trophy',
    perguntas: [
      {
        id: 'recompensa-1',
        pergunta: 'Como funciona a conta de energia subsidiada?',
        resposta:
          'O primeiro colocado do ranking mensal recebe um crédito equivalente ao valor da sua conta de energia elétrica do mês seguinte, creditado diretamente na plataforma SoulUp. O valor é calculado com base na fatura comprovada, com limite de R$ 500 por mês.',
      },
      {
        id: 'recompensa-2',
        pergunta: 'Quais outras recompensas existem além do top 1?',
        resposta:
          'O top 10 recebe itens exclusivos para o avatar, desbloqueio antecipado de quests sazonais e badges especiais no perfil. Todos os usuários acumulam Soul Points que servem para desbloquear roupas, acessórios, pets e novos espaços no jardim virtual.',
      },
      {
        id: 'recompensa-3',
        pergunta: 'O ranking é nacional ou regional?',
        resposta:
          'Existe um ranking nacional e rankings regionais (por estado). A recompensa principal de energia subsidiada vale para o top 1 nacional. Os rankings regionais têm recompensas próprias, menores, mas acessíveis para mais participantes.',
      },
    ],
  },
  {
    id: 'tecnico',
    titulo: 'Técnico',
    icone: 'settings',
    perguntas: [
      {
        id: 'tecnico-1',
        pergunta: 'Este site usa algum framework ou biblioteca?',
        resposta:
          'Sim. Nesta etapa o site foi reconstruído em React 18 com TypeScript, Vite como bundler e TailwindCSS para estilização — usando apenas classes utilitárias e os tokens do tailwind.config.ts, sem nenhum arquivo CSS externo. A navegação usa react-router-dom, o formulário de contato usa react-hook-form e os ícones vêm do lucide-react. Nenhuma biblioteca de componentes prontos (Bootstrap, Material UI, Chakra) foi utilizada.',
      },
      {
        id: 'tecnico-2',
        pergunta: 'O site é responsivo?',
        resposta:
          'Sim. O layout foi desenvolvido mobile-first e validado em três breakpoints: mobile (até 480px) com layout em coluna única e menu hambúrguer, tablet (a partir de 768px) com grid de no máximo 2 colunas, e desktop (a partir de 1024px) com layout completo. Testado nos principais navegadores modernos.',
      },
    ],
  },
] as const
