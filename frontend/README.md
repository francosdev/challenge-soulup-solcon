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

Esta versão leva para React as 8 páginas do site estático anterior (HTML/CSS/JS), com o mesmo
conteúdo e a identidade visual da SoulUp. Nesta sprint entraram também as páginas da solução:
**Solução**, **Detalhe da Habilidade** (rota dinâmica) e **Trilha**.

O protótipo interativo do **Pet Planet** (o "planetinha") veio junto: antes era um bundle de 1,8 MB
carregado num iframe, agora é um conjunto de componentes React tipados dentro do próprio app.

O site estático continua recuperável no histórico do Git, no commit
`chore(frontend): snapshot do site estático antes do redesign` da branch `redesign/soulup-visual`.

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
| `ink.DEFAULT` | `#000000` | Fundo da tela do protótipo Pet Planet |
| `ink.muted` | `#6B7A85` | Texto secundário |
| `line` | `#E3E7EA` | Hairlines — sempre 1px, nunca 2px |
| `surf` | `#F5F5F5` | Superfície alternada das seções institucionais |

### Gamificação — uso exclusivo

`sun.*` aparece **apenas** em mascote, conquistas e streaks. Nunca em UI comum.

| Token | Hex | Uso |
|-------|-----|-----|
| `sun.DEFAULT` | `#C8A84B` | Streak, moedas e selos do protótipo |
| `sun.wash` | `#FBF6E8` | Fundo de selo conquistado |
| `sun.line` | `#EBD9A8` | Borda de selo conquistado |
| `sun.text` | `#7A6320` | Texto sobre `sun.wash` |

### Duas superfícies

- **Institucional** (todas as páginas) — fundo claro, seções alternando `bg-white` e `bg-surf`,
  texto `text-navy`, com um campo de esporos em canvas atrás dos heros.
- **Protótipo Pet Planet** — a única superfície escura, apresentada como um aparelho dentro de uma
  moldura clara na página Dashboard: `ink` no corpo, painéis `navy` e `navy.dark`, acentos em
  `soul` e `sun`.

### Outros tokens

- `fontFamily`: `display` = Poppins · `sans` = Inter
- `borderRadius`: `card` = 12px · `pill` = 9999px
- `keyframes`: as 12 animações do protótipo Pet Planet (`pp-bob`, `pp-celebrate`, `pp-confetti-fly`, …), todas sob `motion-safe:`

---

## Estrutura de pastas

```
frontend/
├── index.html                     # Entrada Vite + Google Fonts (Poppins/Inter)
├── package.json / package-lock.json
├── vite.config.ts
├── tailwind.config.ts             # Tokens da identidade SoulUp
├── postcss.config.js
├── tsconfig.json / .app.json / .node.json
│
├── public/
│   ├── favicon.svg
│   ├── assets/imagens/            # Fotos da equipe + logo SolCon
│   └── data/habilidades.json      # Dados das 4 Habilidades (lidos por fetch)
│
└── src/
    ├── main.tsx                   # Bootstrap do React
    ├── App.tsx                    # Rotas estáticas e dinâmicas (HashRouter)
    ├── index.css                  # Apenas @tailwind base/components/utilities
    │
    ├── pages/                     # Uma pasta por página (index.tsx)
    │   ├── Home/                  # Hero, números, pilares, diferenciais
    │   ├── Sobre/                 # Problema, escuta, filosofia, solução, SoulUp
    │   ├── Solucao/               # Lista das 4 Habilidades em cards
    │   ├── SolucaoDetalhe/        # /solucao/:id — useParams, useNavigate, useEffect
    │   ├── EcoScore/              # Trilhas, ranking e feed social
    │   ├── ComoFunciona/          # Fluxo em 5 etapas
    │   ├── Dashboard/             # Protótipo do planetinha
    │   ├── Trilha/                # Jornada da Trilha (quiz, missão, conquista)
    │   ├── Faq/                   # Acordeão por categoria
    │   ├── Integrantes/           # Equipe + SolCon + contexto acadêmico
    │   └── Contato/               # Formulário com react-hook-form
    │
    ├── components/
    │   ├── layout/                # Header, Footer, Layout (<Outlet />), Logo, Carregando
    │   ├── ui/                    # Button, Card, Badge, CircleBadge, Accordion, PageHero, NextStep, ...
    │   ├── solucao/               # CardHabilidade
    │   ├── ecoscore/              # Telas da Trilha: trail, skill, learn, quiz, mission, achievement
    │   ├── petplanet/             # Protótipo interativo do planetinha e suas telas
    │   └── visual/                # Spores — campo de esporos em canvas
    │
    ├── services/                  # Acesso a dados (fetch) separado dos componentes
    ├── types/                     # Tipos e interfaces TypeScript
    ├── data/                      # Conteúdo tipado das páginas
    └── lib/                       # Hook próprio useJourney
```

---

## Rotas

| Rota | Tipo | Página |
|------|------|--------|
| `/` | estática | Início |
| `/sobre` | estática | Sobre |
| `/solucao` | estática | Solução — as 4 Habilidades |
| `/solucao/:id` | **dinâmica** | Detalhe de uma Habilidade (`id` de 1 a 4) |
| `/ecoscore` | estática | EcoScore |
| `/como-funciona` | estática | Como Funciona |
| `/dashboard` | estática | Dashboard — protótipo do planetinha |
| `/trilha` | estática | Trilha |
| `/faq` | estática | FAQ |
| `/integrantes` | estática | Integrantes |
| `/contato` | estática | Contato |
| `*` | — | Redireciona para o Início |

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

## Como usar

- **Repositório no GitHub:** [github.com/francosdev/challenge-soulup-solcon](https://github.com/francosdev/challenge-soulup-solcon)
- **Front-end no repositório:** [github.com/francosdev/challenge-soulup-solcon/tree/main/frontend](https://github.com/francosdev/challenge-soulup-solcon/tree/main/frontend)
- **Vídeo no YouTube:** _(inserir link do vídeo)_

**Pré-requisito:** Node.js 18+.

```bash
git clone https://github.com/francosdev/challenge-soulup-solcon.git
cd challenge-soulup-solcon/frontend
npm install

npm run dev       # servidor de desenvolvimento (http://localhost:5173)
npm run build     # checagem de tipos + build de produção em dist/
npm run preview   # serve o build de produção
npm run lint      # checagem de tipos (tsc)
```

---

## Responsividade

Mobile-first, com os breakpoints do Tailwind (`sm:` 640px, `lg:` 1024px, `xl:` 1280px), pensado
para celular (até 480px), tablet (768px) e desktop (992px ou mais). O menu vira hambúrguer abaixo
de `lg`.

---

## Imagens e ícones

<div align="center">

<img src="public/assets/imagens/logo-solcon.png" alt="Logo da SolCon" width="200" />
&nbsp;&nbsp;&nbsp;
<img src="public/favicon.svg" alt="Ícone do EcoScore" width="72" />

</div>

Os ícones da interface vêm do `lucide-react`, uma biblioteca de ícones SVG. Ela não traz
componentes de UI prontos.

---

## Autores e créditos

| Foto | Integrante | RM | Turma | LinkedIn | GitHub |
|:----:|------------|-----|-------|----------|--------|
| <img src="public/assets/imagens/carlos.jpg" alt="Foto de Carlos Franco" width="80" /> | Carlos Henrique De Melo Franco | 569868 | 1TDSPH | [carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) | [@francosdev](https://github.com/francosdev) |
| <img src="public/assets/imagens/murilo.jpg" alt="Foto de Murilo Souza" width="80" /> | Murilo Almeida Rodrigues de Souza | 573977 | 1TDSPH | [murilo-a-souza](https://linkedin.com/in/murilo-a-souza) | [@murilo-a-souza](https://github.com/murilo-a-souza) |
| <img src="public/assets/imagens/henrique.jpg" alt="Foto de Henrique Bonachela" width="80" /> | Henrique Bonachela de Carvalho Carabante | 573620 | 1TDSPH | [henrique-bonachela](https://linkedin.com/in/henrique-bonachela) | [@henriquebonachela](https://github.com/henriquebonachela) |

---

## Contato

- **E-mail da equipe:** [francosdevs@gmail.com](mailto:francosdevs@gmail.com)
- **Issues no GitHub:** [abrir uma issue](https://github.com/francosdev/challenge-soulup-solcon/issues)
- **Formulário no site:** rota `/contato`

---

<div align="center">

**FIAP Challenge 2026** — Parceria **SoulUp** × **SolCon**

_Conectamos hoje. Construímos o futuro._

</div>
