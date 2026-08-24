export interface Etapa {
  numero: string
  tag: string
  icone: 'globe' | 'smartphone' | 'camera' | 'star' | 'award'
  titulo: string
  texto: string
}

export const ETAPAS: readonly Etapa[] = [
  {
    numero: '1',
    tag: 'Mundo real',
    icone: 'globe',
    titulo: 'Realize uma ação sustentável',
    texto:
      'Recicle, plante em qualquer recipiente (garrafa PET, copo, lata), ou reduza o consumo de água. As 3 classes do MVP foram escolhidas por acessibilidade urbana — qualquer pessoa em apartamento consegue percorrer as três.',
  },
  {
    numero: '2',
    tag: 'No app',
    icone: 'smartphone',
    titulo: 'Faça o quiz ou registre a evidência',
    texto:
      'Cada trilha começa com um quiz de baixo atrito. Quando avança para a camada de evidência, você fotografa a ação direto pelo app — sem upload de arquivo externo. Isso elimina o principal vetor de fraude sem adicionar fricção para quem está sendo honesto.',
  },
  {
    numero: '3',
    tag: 'Evidência',
    icone: 'camera',
    titulo: 'A foto é validada automaticamente',
    texto:
      'A foto capturada no app carrega metadados de localização e timestamp. O sistema verifica a consistência da evidência. Para Jardinagem, a intermediária 2 exige uma segunda foto 14 dias após o plantio — o único ponto do sistema com tempo real obrigatório.',
  },
  {
    numero: '4',
    tag: 'Progressão',
    icone: 'star',
    titulo: 'Avance na trilha e ganhe pontos',
    texto:
      'Cada camada concluída credita Soul Points usando o sistema de pontos da SoulUp — sem moeda adicional, sem conversão, sem escolha desnecessária. Os pontos vão direto para o ranking e para os benefícios reais.',
  },
  {
    numero: '5',
    tag: 'Selo',
    icone: 'award',
    titulo: 'Complete a trilha e conquiste o selo',
    texto:
      'Ao concluir as 3 camadas de uma classe, o selo é concedido automaticamente e aparece no seu perfil. Quem tem um selo raro percorreu um caminho específico — e tem o que mostrar por isso. No topo do ranking ao fim do mês: conta de energia subsidiada em 100%, limitada a R$ 500.',
  },
] as const
