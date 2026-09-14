<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111610,100:2d4a1e&height=180&section=header&text=EcoScore&fontSize=60&fontColor=8BAF6E&fontAlignY=38&desc=Sustainable%20Gamification%20System&descSize=16&descAlignY=58&descColor=B8D49A" />

**FIAP Challenge 2026 · SoulUp × SolCon · Turma 1TDSPH**

[![React](https://img.shields.io/badge/React-18-111111?style=for-the-badge&logo=react&logoColor=29B4B7)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-111111?style=for-the-badge&logo=typescript&logoColor=29B4B7)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-111111?style=for-the-badge&logo=vite&logoColor=29B4B7)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-111111?style=for-the-badge&logo=tailwindcss&logoColor=29B4B7)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Python-3.x-111111?style=for-the-badge&logo=python&logoColor=8BAF6E)](https://python.org)
[![Java](https://img.shields.io/badge/Java-OOP-111111?style=for-the-badge&logo=openjdk&logoColor=8BAF6E)](https://openjdk.org)

</div>

---

## Índice

Use os botões para abrir a entrega de cada disciplina:

[![Front-end](https://img.shields.io/badge/Front--end-007ACC?style=for-the-badge&logo=react&logoColor=white)](./frontend/)[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](./python/)[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](./java/)[![IA & Chatbot](https://img.shields.io/badge/IA_%26_Chatbot-8E44AD?style=for-the-badge&logo=probot&logoColor=white)](./ia_chatbot/)[![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-336791?style=for-the-badge&logo=postgresql&logoColor=white)](./banco_de_dados/)[![Software Engineering & Business Model](https://img.shields.io/badge/Business_Model-2C3E50?style=for-the-badge&logo=diagrams.net&logoColor=white)](./sebm/)

Nesta página:
[Visão geral](#visão-geral) ·
[Links](#links) ·
[Front-end](#front-end-web--react--vite--typescript) ·
[Python](#backend-cli--python) ·
[Java](#java) ·
[Banco de Dados](#banco-de-dados) ·
[IA & Chatbot](#ia--chatbot) ·
[Business Model](#software-engineering--business-model) ·
[Estrutura](#estrutura-do-repositório) ·
[Autores](#autores-e-créditos) ·
[Contato](#contato)

---

## Visão geral

O **EcoScore** é um MVP de gamificação sustentável feito para o FIAP Challenge 2026, em parceria
com a **SoulUp** (by Prospera) e a startup **SolCon**. O usuário registra ações ecológicas reais,
como reciclar, economizar água e energia ou plantar, e ganha **Soul Points**, conquistas e posição
no ranking mensal. Quem chega primeiro a **100 Soul Points** no mês fica com a conta de energia
subsidiada pela SoulUp, com limite de R$ 500.

O repositório reúne as entregas de todas as disciplinas:

| Módulo | Disciplina | O que entrega | Pasta |
|--------|------------|---------------|-------|
| Front-end Web | Front-End Design Engineering | SPA em React + Vite + TypeScript + Tailwind com as páginas institucionais e da solução | [`frontend/`](./frontend/) |
| Backend CLI | Computational Thinking Using Python | Sistema de terminal com cadastro, ações, ranking, conquistas e painel admin | [`python/`](./python/) |
| Java | Domain Driven Design Using Java | Classes de domínio para ações, pontuação e publicações no perfil | [`java/`](./java/) |
| Banco de Dados | Building Relational Database | Modelagem lógica e relacional e script DDL no Oracle Data Modeler | [`banco_de_dados/`](./banco_de_dados/) |
| IA & Chatbot | Artificial Intelligence & Chatbot | EcoBot SolCon no IBM Watson Assistant, com Node-RED e Telegram | [`ia_chatbot/`](./ia_chatbot/) |
| Business Model | Software Engineering and Business Model | Documentação do negócio, modelo de negócios e pitch | [`sebm/`](./sebm/) |

---

## Links

| O quê | Link |
|-------|------|
| Repositório no GitHub | [github.com/francosdev/challenge-soulup-solcon](https://github.com/francosdev/challenge-soulup-solcon) |
| Front-end no repositório | [github.com/francosdev/challenge-soulup-solcon/tree/main/frontend](https://github.com/francosdev/challenge-soulup-solcon/tree/main/frontend) |
| Documentação completa do front-end | [frontend/README.md](./frontend/README.md) |
| Vídeo do front-end no YouTube | _(inserir link do vídeo)_ |
| Vídeo do EcoBot (IA & Chatbot) | [youtu.be/Qr2LM5ZbyxA](https://youtu.be/Qr2LM5ZbyxA) |

---

## Front-end Web — React + Vite + TypeScript

Site do EcoScore em formato **SPA** (Single Page Application). As páginas do site estático das
sprints anteriores foram convertidas em componentes React, e nesta sprint entraram as páginas da
solução: **Solução**, **Detalhe da Habilidade** e **Trilha**.

<div align="center">

<img src="frontend/public/assets/imagens/logo-solcon.png" alt="Logo da SolCon" width="200" />
&nbsp;&nbsp;&nbsp;
<img src="frontend/public/favicon.svg" alt="Ícone do EcoScore" width="72" />

</div>

### Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Interface | React 18 |
| Linguagem | TypeScript (modo `strict`) |
| Build | Vite 5 |
| Estilo | TailwindCSS 3 — sem CSS próprio além das diretivas `@tailwind` |
| Navegação | react-router-dom (HashRouter) |
| Formulários | react-hook-form |
| Ícones | lucide-react (ícones SVG) |
| Versionamento | Git + GitHub |

Não há Bootstrap, Material UI, Chakra UI, Axios nem template pronto.

### Páginas e rotas

| Rota | Tipo | Página | O que mostra |
|------|------|--------|--------------|
| `/` | estática | Início | Apresentação, números, pilares e diferenciais |
| `/sobre` | estática | Sobre | Problema, pesquisa, filosofia e parceria SoulUp × SolCon |
| `/solucao` | estática | Solução | As 4 Habilidades: Reciclagem, Consumo Consciente, Água e Energia |
| `/solucao/:id` | **dinâmica** | Detalhe da Habilidade | Etapas, missão e pontos de uma Habilidade (`id` de 1 a 4) |
| `/ecoscore` | estática | EcoScore | Sistema, progressão, missões, ranking e monetização |
| `/como-funciona` | estática | Como Funciona | Fluxo da ação real até os Soul Points |
| `/dashboard` | estática | Dashboard | Protótipo interativo do Pet Planet, com o mascote Planetinha |
| `/trilha` | estática | Trilha | Jornada de uma Habilidade: aprender, validar, praticar e conquistar |
| `/faq` | estática | FAQ | Perguntas frequentes em acordeão |
| `/integrantes` | estática | Integrantes | Equipe com foto, RM, turma, GitHub e LinkedIn |
| `/contato` | estática | Contato | Formulário com validação |
| `*` | — | — | Redireciona para o Início |

### Recursos de React usados

| Recurso | Onde |
|---------|------|
| Componentes reutilizáveis | `Header`, `Footer`, `Layout`, `Button`, `Card`, `Badge`, `PageHero`, `Accordion`, `CardHabilidade` e outros |
| `useState` | Menu mobile do `Header`, `Accordion`, formulário de `Contato`, páginas `Solucao` e `SolucaoDetalhe` |
| `useEffect` | `Layout` (volta ao topo ao trocar de rota) e carregamento das Habilidades em `Solucao` e `SolucaoDetalhe` |
| `useParams` e `useNavigate` | `SolucaoDetalhe` lê o `id` da URL e volta para `/solucao` quando a Habilidade não existe |
| Props tipadas | Todos os componentes, com `interface` e `type` |
| Camada de dados | `services/habilidades.ts` busca `public/data/habilidades.json` com tratamento de carregando e erro |
| React Hook Form | Página `Contato`: nome, e-mail, assunto e mensagem obrigatórios, com mensagens de erro e campo destacado |

### Responsividade

Mobile-first com os breakpoints do Tailwind (`sm:` 640px, `lg:` 1024px, `xl:` 1280px), pensado para
celular (até 480px), tablet (768px) e desktop (992px ou mais). O menu vira hambúrguer abaixo de `lg`.

### Estrutura de pastas do front-end

```
frontend/
├── index.html                 # Entrada do Vite
├── package.json / package-lock.json
├── vite.config.ts · tailwind.config.ts · postcss.config.js · tsconfig*.json
├── public/
│   ├── favicon.svg
│   ├── assets/imagens/        # Fotos da equipe e logo da SolCon
│   └── data/habilidades.json  # Dados das 4 Habilidades
└── src/
    ├── main.tsx · App.tsx · index.css
    ├── pages/                 # Uma pasta por página (Home, Sobre, Solucao, SolucaoDetalhe, ...)
    ├── components/            # layout, ui, solucao, ecoscore, petplanet, visual
    ├── services/              # Acesso a dados (fetch)
    ├── types/                 # Tipos e interfaces TypeScript
    ├── data/                  # Conteúdo tipado das páginas
    └── lib/                   # Hook próprio useJourney
```

### Como usar

**Pré-requisito:** Node.js 18 ou superior.

```bash
git clone https://github.com/francosdev/challenge-soulup-solcon.git
cd challenge-soulup-solcon/frontend
npm install
npm run dev
```

Abra `http://localhost:5173` e navegue pelo menu. Outros comandos:

```bash
npm run build     # checagem de tipos + build de produção em dist/
npm run preview   # serve o build de produção
npm run lint      # checagem de tipos (tsc)
```

> Paleta, tokens e detalhes de cada pasta: [frontend/README.md](./frontend/README.md)

---

## Backend CLI — Python

Sistema de gamificação operado pelo terminal, com os dados salvos em JSON.

### Funcionalidades

- **Contas:** cadastro com validação de e-mail, login com senha em hash SHA-256, recuperação de senha
  por código de 6 dígitos, edição de perfil e exclusão de conta com confirmação.
- **Ações sustentáveis:** registro em 4 categorias, com pontuação por peso e limite de 25 pontos por ação.
- **Ranking e competição:** ranking mensal, perfis públicos e fim do ciclo quando alguém chega a 100 Soul Points.
- **Impacto ambiental:** mudas plantadas, composto produzido, material reciclado, água economizada e ações de energia.
- **Painel administrativo:** lista e consulta de usuários, exclusão de contas, reinício do ranking e log de auditoria.

| Categoria | Peso |
|-----------|------|
| Plantio e Jardinagem | 5.0 |
| Reciclagem de Resíduos | 3.0 |
| Redução de Energia | 2.0 |
| Economia de Água | 0.1 |

| Conquista | Critério |
|-----------|----------|
| 🌱 Primeiro Broto | Registrar a primeira ação |
| ♻️ Reciclador Ativo | Reciclar 10 kg de material |
| 💧 Água Consciente | Economizar 100 litros de água |
| ⚡ Energia Inteligente | Registrar 5 ações de energia |
| 🌿 Mão Verde | Registrar 5 ações de plantio |
| 🏆 Campeão EcoScore | Atingir 100 Soul Points |

### Menus

| Menu | Opções |
|------|--------|
| Inicial | Entrar · Cadastrar conta · Recuperar senha · Encerrar |
| Usuário | Registrar ação · Ranking · Meu perfil · Perfil de outro usuário · Conquistas · Editar perfil · Status da competição · Deletar conta |
| Admin | Ranking · Status da competição · Listar usuários · Consultar conta · Deletar conta · Reiniciar ranking |

### Persistência

Os dados ficam em `python/ecoscore_dados.json`. O ranking é montado em `dados.py` como uma
**matriz** (`[posicao, nome, email, pontos]`). Se o JSON estiver corrompido, o sistema avisa e
começa com a base vazia em vez de travar.

### Como executar

**Pré-requisito:** Python 3.x.

```bash
cd python
python main.py
```

No Windows também dá para abrir `python/executar_ecoscore.bat`. No primeiro acesso o sistema pede a
senha da conta admin (`admin@ecoscore.com`).

> Documentação do módulo: [python/README.md](./python/README.md)

---

## Java

Modelo orientado a objetos das regras do EcoScore: usuário, ações sustentáveis, cálculo de pontos e
publicações no perfil.

- **Classes:** `Usuario`, `Acao`, `AcaoQuiz`, `AcaoConquista`, `AcaoPost`, `CalculadoraPontos` e `Main`
- **Diagramas:** classes, relações entre classes e regras de negócio (`.drawio`)
- **Documentação:** [java/documentacao-java.pdf](./java/documentacao-java.pdf)

> Documentação do módulo: [java/README.md](./java/README.md)

---

## Banco de Dados

Modelagem da jornada do usuário: usuários, categorias, ações, evidências, validações, temporadas,
conquistas, ranking e impacto ambiental.

- **Ferramenta:** Oracle Data Modeler
- **Script DDL:** [eco_score_modelagem_solcon_.ddl](./banco_de_dados/eco_score_modelagem_solcon_.ddl)
- **Modelos:** [lógico](./banco_de_dados/modelagem-logica.png) e [relacional](./banco_de_dados/modelagem-relacional.png)
- **Documentação:** [solcon-documentacao-banco-de-dados.pdf](./banco_de_dados/solcon-documentacao-banco-de-dados.pdf)

> Documentação do módulo: [banco_de_dados/README.md](./banco_de_dados/README.md)

---

## IA & Chatbot

O **EcoBot SolCon** é o assistente virtual que tira dúvidas sobre ações sustentáveis, evidências,
Soul Points, ranking e conquistas.

- **IBM Watson Assistant:** skill do diálogo em `watson_assistant/`
- **Node-RED + Telegram:** fluxo com conversão de voz em texto e de texto em voz (IBM STT e TTS) em `node_red/`
- **WebChat:** código de incorporação em `codigo-embedder-webchat.txt`
- **Vídeo demonstrativo:** [youtu.be/Qr2LM5ZbyxA](https://youtu.be/Qr2LM5ZbyxA)

> Documentação do módulo: [ia_chatbot/README.md](./ia_chatbot/README.md)

---

## Software Engineering & Business Model

Documentação do negócio: objetivo, diferenciais, funcionalidades, modelo de negócios e pitch.

- **Documentação:** [sebm/documentacao-sebm.pdf](./sebm/documentacao-sebm.pdf)

> Documentação do módulo: [sebm/README.md](./sebm/README.md)

---

## Estrutura do repositório

```
challenge-soulup-solcon/
├── frontend/          # Front-end Web (React + Vite + TypeScript + Tailwind)
├── python/            # Backend CLI em Python
├── java/              # Projeto Java, diagramas e documentação
├── banco_de_dados/    # Modelagem, script DDL e documentação
├── ia_chatbot/        # EcoBot: Watson Assistant, Node-RED e WebChat
├── sebm/              # Software Engineering and Business Model
├── docs/              # Relatórios de apoio
├── netlify.toml       # Configuração de deploy do front-end
└── README.md
```

---

## Autores e créditos

**Análise e Desenvolvimento de Sistemas — FIAP 2026 · Turma 1TDSPH**

| Foto | Integrante | RM | Turma | LinkedIn | GitHub |
|:----:|------------|-----|-------|----------|--------|
| <img src="frontend/public/assets/imagens/carlos.jpg" alt="Foto de Carlos Franco" width="80" /> | Carlos Henrique De Melo Franco | 569868 | 1TDSPH | [carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) | [@francosdev](https://github.com/francosdev) |
| <img src="frontend/public/assets/imagens/murilo.jpg" alt="Foto de Murilo Souza" width="80" /> | Murilo Almeida Rodrigues de Souza | 573977 | 1TDSPH | [murilo-a-souza](https://linkedin.com/in/murilo-a-souza) | [@murilo-a-souza](https://github.com/murilo-a-souza) |
| <img src="frontend/public/assets/imagens/henrique.jpg" alt="Foto de Henrique Bonachela" width="80" /> | Henrique Bonachela de Carvalho Carabante | 573620 | 1TDSPH | [henrique-bonachela](https://linkedin.com/in/henrique-bonachela) | [@henriquebonachela](https://github.com/henriquebonachela) |

**Parceria:** FIAP × SoulUp × SolCon

---

## Contato

| Canal | Endereço |
|-------|----------|
| E-mail da equipe | [francosdevs@gmail.com](mailto:francosdevs@gmail.com) |
| Issues no GitHub | [Abrir uma issue](https://github.com/francosdev/challenge-soulup-solcon/issues) |
| Formulário no site | Rota `/contato` do front-end |

---

<div align="center">

**FIAP Challenge 2026** — Parceria **SoulUp** × **SolCon**

_Conectamos hoje. Construímos o futuro._ 🌱

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d4a1e,100:111610&height=100&section=footer" />

</div>
