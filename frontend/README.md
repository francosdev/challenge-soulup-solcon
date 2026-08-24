<div align="center">

# EcoScore — front-end

**FIAP Challenge 2026 · SoulUp × SolCon · Turma 1TDSPH**

React · TypeScript · Vite · TailwindCSS

</div>

---

## Índice

[![Front-end](https://img.shields.io/badge/Front--end-007ACC?style=for-the-badge&logo=react&logoColor=white)](../frontend/)[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](../python/)[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](../java/)[![IA & Chatbot](https://img.shields.io/badge/IA_%26_Chatbot-8E44AD?style=for-the-badge&logo=probot&logoColor=white)](../ia_chatbot/)[![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-336791?style=for-the-badge&logo=postgresql&logoColor=white)](../banco_de_dados/)[![Business Model](https://img.shields.io/badge/Business_Model-2C3E50?style=for-the-badge&logo=diagrams.net&logoColor=white)](../sebm/)

---

## Sobre

Front-end do **EcoScore**, a camada de gamificação sustentável construída sobre a plataforma
**SoulUp** (by Prospera). O usuário registra ações ecológicas reais, ganha **Soul Points** e, ao
fechar o ciclo com 100 pontos, concorre a ter a conta de energia subsidiada (limite de R$ 500/mês).

Esta versão substitui o site estático anterior (HTML/CSS/JS) por uma SPA em React com a identidade
visual da SoulUp. O site estático continua recuperável no histórico do Git, no commit
`chore(frontend): snapshot do site estático antes do redesign`.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| UI | React 18 + TypeScript (strict) |
| Build | Vite 5 |
| Estilo | TailwindCSS 3 — utilitários e tokens, **sem CSS externo** |
| Rotas | react-router-dom (HashRouter) |
| Formulários | react-hook-form |
| Ícones | lucide-react |
| Tipografia | Poppins (500/600) + Inter (400/500), via Google Fonts |

> Não há Bootstrap, Material UI, Chakra, Axios ou template pronto. O único arquivo `.css` do
> projeto é `src/index.css`, contendo apenas as três diretivas `@tailwind`.

---

## Paleta

Tokens extraídos dos materiais oficiais da SoulUp e declarados em `tailwind.config.ts`.

### Marca

| Token | Hex | Uso |
|-------|-----|-----|
| `soul.DEFAULT` | `#29B4B7` | Marca, CTAs primários, links, séries de dados principais |
| `soul.light` | `#A4DBDE` | Fills secundários, fundo de barra de progresso, borda de chip |
| `soul.wash` | `#E8F6F6` | Superfície clara de apoio, selos circulares |
| `soul.deep` | `#0F5F61` | Hover de CTA, texto sobre `soul.wash` |

### Estrutura

| Token | Hex | Uso |
|-------|-----|-----|
| `navy.DEFAULT` | `#16486B` | Títulos e cards escuros de destaque |
| `navy.dark` | `#0E3550` | Trilho de progresso e cards do dashboard |
| `ink.DEFAULT` | `#000000` | Fundo das telas da Solução |
| `ink.muted` | `#6B7A85` | Texto secundário |
| `line` | `#E3E7EA` | Hairlines — sempre 1px, nunca 2px |
| `surf` | `#F5F5F5` | Superfície alternada das seções institucionais |

### Gamificação — uso exclusivo

`sun.*` aparece **apenas** em mascote, conquistas e streaks. Nunca em UI comum.

| Token | Hex | Uso |
|-------|-----|-----|
| `sun.DEFAULT` | `#C8A84B` | Halo do Solzinho, texto de conquista |
| `sun.wash` | `#FBF6E8` | Fundo de selo conquistado |
| `sun.line` | `#EBD9A8` | Borda de selo conquistado |
| `sun.text` | `#7A6320` | Texto sobre `sun.wash` |

### Duas superfícies

- **Institucional** (Home, Sobre, Integrantes, FAQ, Contato) — fundo branco, seções alternando
  `bg-white` e `bg-surf`, texto `text-navy`.
- **Solução** (dashboard) — fundo `bg-ink`, cards `bg-navy-dark`, texto branco, acentos em `soul`.

### Outros tokens

- `fontFamily`: `display` = Poppins · `sans` = Inter
- `borderRadius`: `card` = 12px · `pill` = 9999px
- `keyframes`: `breathe` (4s, escala 1 → 1.03) e `orbit` (24s, 360°), ambos sob `motion-safe:`

---

## Estrutura de pastas

```
frontend/
├── index.html                     # Entrada Vite + Google Fonts (Poppins/Inter)
├── package.json
├── vite.config.ts
├── tailwind.config.ts             # Tokens da identidade SoulUp
├── postcss.config.js
├── tsconfig.json / .app.json / .node.json
│
├── public/
│   ├── favicon.svg
│   └── assets/imagens/            # Fotos da equipe + logo SolCon
│
└── src/
    ├── main.tsx                   # Bootstrap do React
    ├── App.tsx                    # Rotas (HashRouter)
    ├── index.css                  # Apenas @tailwind base/components/utilities
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx         # Nav + menu mobile (useState)
    │   │   ├── Footer.tsx         # Rodapé em colunas
    │   │   ├── Layout.tsx         # Shell com <Outlet />
    │   │   └── Logo.tsx           # Palavra + selo circular "UP"
    │   ├── mascot/
    │   │   └── Solzinho.tsx       # Mascote em SVG inline, animável
    │   └── ui/
    │       ├── Accordion.tsx      # Acordeão controlado
    │       ├── ActionChip.tsx     # Chip de registro de ação
    │       ├── Button.tsx         # primary | secondary | ghost
    │       ├── Card.tsx           # light | dark | wash
    │       ├── CircleBadge.tsx    # outline | solid | wash | sun · sm | md | lg
    │       ├── IconeAcao.tsx      # Resolve ícone lucide por categoria
    │       ├── ProgressBar.tsx    # Trilho light/dark
    │       ├── SectionHeading.tsx # Tag + título + descrição
    │       └── StatCard.tsx       # Métrica com selo circular
    │
    ├── data/                      # Mocks tipados (sem consumo de API)
    │   ├── acoes.ts               # Categorias e pesos de pontuação
    │   ├── dashboard.ts           # Resumo, ranking, histórico, conquistas
    │   ├── faq.ts                 # Perguntas por categoria
    │   ├── impacto.ts             # Métricas agregadas e pilares
    │   └── integrantes.ts         # Equipe 1TDSPH
    │
    └── pages/
        ├── Home.tsx               # Hero + pontuação + pilares + impacto
        ├── Sobre.tsx              # Problema, fluxo em 5 passos, diferenciais
        ├── Solucao.tsx            # Dashboard escuro
        ├── Integrantes.tsx        # Equipe + SolCon + contexto acadêmico
        ├── Faq.tsx                # Acordeão por categoria
        └── Contato.tsx            # Formulário com react-hook-form
```

---

## Rotas

| Rota | Página | Origem no site antigo |
|------|--------|----------------------|
| `/` | Home | `index.html` |
| `/sobre` | Sobre | `sobre.html` |
| `/solucao` | Solução | `ecoscore.html` + `dashboard.html` |
| `/integrantes` | Integrantes | `integrantes.html` |
| `/faq` | FAQ | `faq.html` |
| `/contato` | Contato | `contato.html` |

`/ecoscore` e `/dashboard` redirecionam para `/solucao`; `/como-funciona` redireciona para `/sobre`.

---

## Sistema de pontuação

| Categoria | Soul Points | Unidade |
|-----------|-------------|---------|
| Plantio | 5 | por muda |
| Reciclagem | 3 | por kg |
| Energia | 2 | por ação |
| Água | 0,1 | por litro |

Meta do ciclo: **100 Soul Points**. Terminologia oficial: *Soul Points* e *Pontos Soul* — o
projeto não tem economia dupla.

---

## Como executar

**Pré-requisito:** Node.js 18+.

```bash
cd frontend
npm install

npm run dev       # servidor de desenvolvimento
npm run build     # checagem de tipos + build de produção em dist/
npm run preview   # serve o build de produção
npm run lint      # tsc --noEmit
```

O build usa `base: './'` e `HashRouter`, então `dist/index.html` também abre direto do disco,
sem servidor.

---

## Responsividade

Mobile-first, validado em **480px**, **768px** e **1280px**. Nenhum grid passa de 2 colunas até
768px (colunas extras só em `lg:`, 1024px). Menu vira hambúrguer abaixo de `md`, e o shell aplica
`overflow-x-hidden` para garantir zero scroll horizontal.

---

## Equipe

| Integrante | RM | LinkedIn | GitHub |
|------------|-----|----------|--------|
| Carlos Henrique De Melo Franco | 569868 | [carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) | [@francosdev](https://github.com/francosdev) |
| Murilo Almeida Rodrigues de Souza | 573977 | [murilo-a-souza](https://linkedin.com/in/murilo-a-souza) | [@murilo-a-souza](https://github.com/murilo-a-souza) |
| Henrique Bonachela de Carvalho Carabante | 573620 | [henrique-bonachela](https://linkedin.com/in/henrique-bonachela) | [@henriquebonachela](https://github.com/henriquebonachela) |

**Contato:** [francosdevs@gmail.com](mailto:francosdevs@gmail.com)

---

<div align="center">

**FIAP Challenge 2026** — Parceria **SoulUp** × **SolCon**

_Conectamos hoje. Construímos o futuro._

</div>
