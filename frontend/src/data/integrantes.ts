export interface Integrante {
  id: string
  nome: string
  rm: string
  turma: string
  curso: string
  foto: string
  github: string
  githubUser: string
  linkedin: string
  linkedinUser: string
}

export const TURMA = '1TDSPH'

export const INTEGRANTES: readonly Integrante[] = [
  {
    id: 'carlos',
    nome: 'Carlos Henrique De Melo Franco',
    rm: '569868',
    turma: TURMA,
    curso: 'Análise e Desenvolvimento de Sistemas · FIAP',
    foto: './assets/imagens/carlos.jpg',
    github: 'https://github.com/francosdev',
    githubUser: 'francosdev',
    linkedin: 'https://linkedin.com/in/carlos-franco-devs',
    linkedinUser: 'carlos-franco-devs',
  },
  {
    id: 'murilo',
    nome: 'Murilo Almeida Rodrigues de Souza',
    rm: '573977',
    turma: TURMA,
    curso: 'Análise e Desenvolvimento de Sistemas · FIAP',
    foto: './assets/imagens/murilo.jpg',
    github: 'https://github.com/murilo-a-souza',
    githubUser: 'murilo-a-souza',
    linkedin: 'https://linkedin.com/in/murilo-a-souza',
    linkedinUser: 'murilo-a-souza',
  },
  {
    id: 'henrique',
    nome: 'Henrique Bonachela de Carvalho Carabante',
    rm: '573620',
    turma: TURMA,
    curso: 'Análise e Desenvolvimento de Sistemas · FIAP',
    foto: './assets/imagens/henrique.jpg',
    github: 'https://github.com/henriquebonachela',
    githubUser: 'henriquebonachela',
    linkedin: 'https://linkedin.com/in/henrique-bonachela',
    linkedinUser: 'henrique-bonachela',
  },
] as const
