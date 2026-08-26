import type { LearnContent, Mission, Quiz } from '../types/ecoscore';

export const RECYCLING_LEARN: LearnContent = {
  skillId: 'reciclagem',
  subtitle: 'Antes de colocar em prática, entenda como funciona.',
  objective:
    'Identificar corretamente o que pode e o que não pode ser reciclado, e separar resíduos sem contaminar o material.',
  estimatedMinutes: 4,
  format: 'Artigo + vídeo (2:10)',
  sections: [
    {
      title: 'O código de cores',
      paragraphs: [
        'A Resolução CONAMA 275/2001 padronizou as cores das lixeiras de coleta seletiva em todo o Brasil. Quatro delas resolvem a maior parte do resíduo doméstico:',
      ],
      rows: [
        { term: 'Azul', description: 'papel e papelão' },
        { term: 'Vermelho', description: 'plástico' },
        { term: 'Verde', description: 'vidro' },
        { term: 'Amarelo', description: 'metal' },
      ],
      closing:
        'Existem outras seis cores para resíduos específicos — perigosos, de saúde, madeira, orgânicos. No dia a dia, as quatro acima bastam.',
    },
    {
      title: 'Contaminação: o erro mais caro',
      paragraphs: [
        'Um material reciclável só continua reciclável se estiver limpo e seco. Resíduo de comida e gordura contaminam o lote inteiro e podem inviabilizar a reciclagem de tudo que estiver junto.',
        'Casos comuns que confundem:',
      ],
      rows: [
        {
          term: 'Caixa de pizza engordurada',
          description:
            'não recicla. A gordura impregna a fibra do papelão. A parte limpa da tampa pode ser separada e reciclada.',
        },
        { term: 'Guardanapo e papel-toalha', description: 'não reciclam.' },
        {
          term: 'Espelho e vidro temperado',
          description:
            'não vão no verde. Têm composição e ponto de fusão diferentes do vidro comum e quebram o processo.',
        },
        { term: 'Cerâmica e porcelana', description: 'não são vidro. Não reciclam junto.' },
      ],
      closing:
        'Um enxágue rápido com água corrente basta. Não é necessário lavar com sabão nem água quente — isso gasta mais recurso do que economiza. Tampas e rótulos podem seguir junto com a embalagem.',
    },
    {
      title: 'Por que isso importa',
      paragraphs: [
        'Reciclar não é só evitar aterro. É evitar a extração e o processamento de matéria-prima nova, que é onde está o gasto real de energia.',
      ],
      rows: [
        {
          term: 'Alumínio',
          description:
            'reciclar economiza cerca de 95% da energia necessária para produzir a mesma quantidade a partir da bauxita. O Brasil recicla mais de 95% das latas de alumínio que consome — um dos maiores índices do mundo.',
        },
        { term: 'Papel', description: 'economiza cerca de metade da energia da produção nova.' },
        { term: 'Vidro', description: 'pode ser reciclado infinitas vezes sem perder qualidade.' },
      ],
      closing:
        'A Política Nacional de Resíduos Sólidos (Lei 12.305/2010) define a separação na origem como responsabilidade compartilhada entre poder público, empresas e consumidor. A parte que cabe a você começa na sua pia.',
    },
  ],
};

export const RECYCLING_QUIZ: Quiz = {
  skillId: 'reciclagem',
  passingScore: 4,
  questions: [
    {
      id: 'q1',
      prompt: 'Segundo o padrão CONAMA, qual é a cor da lixeira destinada ao metal?',
      options: ['Verde', 'Amarelo', 'Vermelho', 'Azul'],
      correctIndex: 1,
      feedbackCorrect: 'Amarelo é metal. Verde é vidro, vermelho é plástico, azul é papel.',
      feedbackWrong: 'Ainda não. Amarelo é a cor do metal no padrão CONAMA.',
    },
    {
      id: 'q2',
      prompt:
        'Você terminou uma pizza. A caixa de papelão está com marcas de gordura no fundo. O que fazer?',
      options: [
        'Descartar como rejeito, e reciclar só a tampa se estiver limpa',
        'Jogar tudo na lixeira azul, papelão sempre recicla',
        'Lavar a caixa com água e sabão antes de reciclar',
        'Rasgar a caixa em pedaços pequenos e reciclar normalmente',
      ],
      correctIndex: 0,
      feedbackCorrect:
        'Isso. A gordura impregna a fibra e contamina o lote. A tampa limpa pode ser separada.',
      feedbackWrong:
        'Papelão engordurado não recicla — a gordura impregna a fibra. A tampa, se estiver limpa, pode ser separada.',
    },
    {
      id: 'q3',
      prompt: 'Um espelho quebrou em casa. Onde ele deve ser descartado?',
      options: [
        'Na lixeira verde, junto com o vidro',
        'Como rejeito, embalado com segurança',
        'Na lixeira amarela, por causa da camada metálica',
        'Em qualquer lixeira, desde que envolto em jornal',
      ],
      correctIndex: 1,
      feedbackCorrect:
        'Exato. Espelho e vidro temperado têm composição diferente do vidro comum e inviabilizam a fusão.',
      feedbackWrong:
        'Espelho não é vidro comum. A composição e o ponto de fusão são diferentes, e ele quebra o processo de reciclagem.',
    },
    {
      id: 'q4',
      prompt: 'Como preparar uma embalagem de iogurte para o descarte?',
      options: [
        'Lavar com sabão e água quente',
        'Enxaguar rápido com água corrente e deixar secar',
        'Descartar sem qualquer limpeza',
        'Remover o rótulo antes de qualquer coisa',
      ],
      correctIndex: 1,
      feedbackCorrect:
        'Enxágue rápido resolve. Lavar com sabão gasta mais recurso do que a reciclagem economiza.',
      feedbackWrong:
        'Um enxágue rápido basta. Lavar com sabão e água quente consome mais do que se ganha, e o rótulo pode seguir junto.',
    },
    {
      id: 'q5',
      prompt:
        'A reciclagem de qual material gera a maior economia de energia em relação à produção a partir de matéria-prima nova?',
      options: ['Vidro', 'Papel', 'Alumínio', 'Plástico PET'],
      correctIndex: 2,
      feedbackCorrect:
        'Alumínio, com cerca de 95% de economia. Por isso a lata é o material mais reciclado do país.',
      feedbackWrong:
        'É o alumínio — cerca de 95% de economia de energia frente à produção a partir da bauxita.',
    },
  ],
};

export const RECYCLING_MISSION: Mission = {
  skillId: 'reciclagem',
  title: 'Separe os recicláveis da sua casa',
  description:
    'Durante 3 dias, separe corretamente papel, plástico, metal e vidro do resíduo da sua casa. Registre cada separação no app.',
  objective:
    'Criar o hábito de separar na origem — o ponto onde a reciclagem realmente começa.',
  durationDays: 3,
  difficulty: 'Iniciante',
  reward: 12,
  estimatedCo2eKg: 1.8,
  checklist: [
    { id: 'papel', label: 'Papel' },
    { id: 'plastico', label: 'Plástico' },
    { id: 'metal', label: 'Metal' },
    { id: 'vidro', label: 'Vidro' },
  ],
};
