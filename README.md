<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111610,100:2d4a1e&height=180&section=header&text=EcoScore&fontSize=60&fontColor=8BAF6E&fontAlignY=38&desc=Sustainable%20Gamification%20System&descSize=16&descAlignY=58&descColor=B8D49A" />

**FIAP Challenge 2026 · SoulUp × SolCon**

[![Python](https://img.shields.io/badge/Python-3.x-111111?style=for-the-badge&logo=python&logoColor=8BAF6E)](https://python.org)
[![React](https://img.shields.io/badge/React-18-111111?style=for-the-badge&logo=react&logoColor=29B4B7)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-111111?style=for-the-badge&logo=typescript&logoColor=29B4B7)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-111111?style=for-the-badge&logo=tailwindcss&logoColor=29B4B7)](https://tailwindcss.com)

</div>

---
## Indíce

Use para navegar entre os projetos de cada matéria:

[![Front-end](https://img.shields.io/badge/Front--end-007ACC?style=for-the-badge&logo=html5&logoColor=white)](./frontend/)[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](./python/)[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](./java/)[![IA & Chatbot](https://img.shields.io/badge/IA_%26_Chatbot-8E44AD?style=for-the-badge&logo=probot&logoColor=white)](./ia_chatbot/)[![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-336791?style=for-the-badge&logo=postgresql&logoColor=white)](./banco_de_dados/)[![Software Engineering & Business Model](https://img.shields.io/badge/Business_Model-2C3E50?style=for-the-badge&logo=diagrams.net&logoColor=white)](./sebm/)

## 🌱 EcoScore — Frontend Web

O **EcoScore** é um MVP de **gamificação sustentável** desenvolvido para o **FIAP Challenge 2026** em parceria com a **SoulUp** e a startup **SolCon**. A plataforma transforma ações ecológicas cotidianas (plantio, reciclagem, economia de água e energia) em **Soul Points**, conquistas e ranking mensal — com o objetivo de criar engajamento duradouro em torno de hábitos sustentáveis.

Este módulo de **frontend** é o site institucional do EcoScore: apresenta o conceito, explica o funcionamento, mostra a equipe e oferece um dashboard simulado. Foi construído com **HTML semântico, CSS modular (BEM)** e **JavaScript vanilla**, sem nenhuma dependência de framework ou build tool — basta abrir no navegador.

### 🎯 Objetivo

<<<<<<< HEAD
- **Backend CLI (Python)** — sistema funcional de gamificação com autenticação, perfis, ranking e painel admin, operado via terminal
- **Frontend Web (React + Vite + TypeScript + TailwindCSS)** — SPA com a identidade visual da SoulUp, apresentando o produto e o dashboard da solução
=======
Ser a vitrine pública do EcoScore: explicar o sistema de pontuação, demonstrar o impacto ambiental gerado, apresentar a startup SolCon e dar contexto à banca avaliadora antes da experiência hands-on com o backend CLI.
>>>>>>> origin/main

---

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia | Uso |
|--------|-----------|-----|
| Estrutura | **HTML5 semântico** | Marcação acessível das 8 páginas do site |
| Estilo | **CSS3 (metodologia BEM)** | 5 folhas modulares: `style`, `componentes`, `dashboard`, `responsivo`, `utilitarios` |
| Interatividade | **JavaScript ES6+ vanilla** | Menu mobile, dashboard simulado, validação do formulário |
| Animações | **Canvas API** | Sistema de partículas estilo PS5 + rede de micélio orgânica |
| Tipografia | **Fraunces** (serif) + **Inter** (sans-serif) | Via Google Fonts |
| Ícones | **Lucide Icons** | SVG inline carregado por CDN |
| Imagens | JPG / PNG otimizados | Fotos da equipe e logo da SolCon |
| Performance | **IntersectionObserver** | Ativa animações Canvas só quando visíveis no viewport |

> Sem build, sem `npm install`, sem servidor — é só abrir o `index.html` no navegador.

---

## 📁 Estrutura de Pastas

```
<<<<<<< HEAD
challenge-soulup-solcon/
|-- frontend/                    # Frontend Web (React + Vite + TS + Tailwind)
|   |-- index.html               # Entrada Vite
|   |-- tailwind.config.ts       # Tokens da identidade SoulUp
|   |-- public/assets/imagens/   # Fotos da equipe + logo
|   `-- src/
|       |-- pages/               # Home, Sobre, EcoScore, ComoFunciona, Dashboard, Faq, Integrantes, Contato
|       |-- components/ui/       # Button, Card, CircleBadge, Badge, NextStep, ...
|       |-- components/layout/   # Header, Footer, Layout
|       |-- components/visual/   # Campo de esporos (canvas)
|       |-- components/petplanet/ # Protótipo do planetinha
|       `-- data/                # Mocks tipados
|
|-- python/                      # Backend CLI
|   |-- main.py                  # Ponto de entrada, login e menu inicial
|   |-- autenticacao.py          # Hash SHA-256 e leitura de senha
|   |-- usuarios.py              # Cadastro, perfis, edicao, recuperacao de senha
|   |-- dados.py                 # Persistencia JSON + matriz do ranking
|   |-- gamificacao.py           # Pontos, conquistas, acoes
|   |-- impacto.py               # Calculo de impacto ambiental
|   |-- admin.py                 # Painel administrativo
|   |-- interface.py             # Componentes de UI para terminal
|   |-- config.py                # Constantes, categorias, acoes
|   `-- ecoscore_dados.json      # Banco de dados (JSON)
|
|-- banco_de_dados/              # Documentacao de banco de dados
|-- ia_chatbot/                  # Notas sobre integracao IBM Watson
|-- java/                        # Projeto e diagramas Java
|-- README.md
`-- .gitignore
```

---

## Banco de Dados

Persistência local via JSON (`python/ecoscore_dados.json`):

```json
{
  "ranking_encerrado": false,
  "usuarios": [
    {
      "nome": "string",
      "email": "string",
      "senha": "string (SHA-256)",
      "pontos": 0,
      "historico": [
        {
          "categoria": "plantio | reciclagem | agua | energia",
          "tipo": "string",
          "descricao": "string",
          "quantidade": 0,
          "unidade": "string",
          "pontos": 0,
          "data": "DD/MM/YYYY HH:MM"
        }
      ],
      "conquistas": ["string"],
      "admin": false
    }
  ]
}
```

O ranking é montado em `dados.py` como uma **matriz** (`[posicao, nome, email, pontos]`), que alimenta o
ranking do usuário, a listagem do admin e o cálculo de posição. Se o JSON estiver corrompido, o sistema
avisa e começa vazio em vez de quebrar.
=======
frontend/
├── index.html                    # Página inicial (hero + visão geral)
├── sobre.html                    # Contexto, problema e solução
├── ecoscore.html                 # Detalhes do sistema de pontuação
├── como-funciona.html            # Fluxo em 5 etapas
├── dashboard.html                # Simulação visual do app
├── faq.html                      # Perguntas frequentes
├── integrantes.html              # Equipe + SolCon
├── contato.html                  # Formulário de contato
├── ecoscore-card-snippet.html    # Componente isolado de card (referência)
├── petplanet-standalone.html     # Protótipo extra (referência)
│
├── css/
│   ├── style.css                 # Tokens, layout base e tipografia
│   ├── componentes.css           # Botões, cards, navbar, formulários
│   ├── dashboard.css             # Estilos exclusivos do dashboard simulado
│   ├── responsivo.css            # Breakpoints e ajustes mobile
│   └── utilitarios.css           # Helpers e classes utilitárias
│
├── js/
│   ├── main.js                   # Inicialização geral (Lucide, scroll, etc.)
│   ├── menu.js                   # Menu hambúrguer mobile
│   ├── dashboard.js              # Lógica do dashboard simulado
│   ├── contato.js                # Validação do formulário de contato
│   ├── particulas.js             # Sistema de partículas (Canvas)
│   ├── micelio.js                # Rede de micélio do hero
│   ├── micelio-divider.js        # Divisores animados entre seções
│   └── spores.js                 # Esporos flutuantes (camada de fundo)
│
└── assets/
    └── imagens/
        ├── carlos.jpg            # Foto — Carlos
        ├── henrique.jpg          # Foto — Henrique
        ├── murilo.jpg            # Foto — Murilo
        └── logo-solcon.png       # Logo da startup
```

> 💡 Todas as folhas de estilo agora vivem dentro de `frontend/css/` — o projeto é autocontido e pode ser movido/distribuído sem dependências externas.
>>>>>>> origin/main

---

## 🖼️ Imagens e Representação do Projeto

### Páginas principais

| Página | O que mostra | Link |
|--------|--------------|------|
| 🏠 Início | Hero com canvas de micélio e CTA principal | [index.html](index.html) |
| 📖 Sobre | Problema, solução e parceria SoulUp × SolCon | [sobre.html](sobre.html) |
| 🌿 EcoScore | Sistema de pontos, categorias e pesos | [ecoscore.html](ecoscore.html) |
| 🔄 Como Funciona | Fluxo em 5 etapas, do cadastro à recompensa | [como-funciona.html](como-funciona.html) |
| 📊 Dashboard | Simulação visual do app do usuário | [dashboard.html](dashboard.html) |
| ❓ FAQ | Perguntas frequentes | [faq.html](faq.html) |
| 👥 Equipe | Integrantes do grupo + SolCon | [integrantes.html](integrantes.html) |
| ✉️ Contato | Formulário com validação | [contato.html](contato.html) |

<<<<<<< HEAD
```bash
# Linux / macOS / Windows
cd python
python main.py

# Windows: também dá para clicar duas vezes em
python/executar_ecoscore.bat
```

A saída é toda ASCII e a leitura de senha usa `getpass`, então o CLI roda igual nos três sistemas.

**Conta admin padrão:**
- Email: `admin@ecoscore.com`
- Senha: definida no primeiro acesso
=======
### Identidade Visual

<div align="center">

<img src="frontend/assets/imagens/logo-solcon.png" alt="Logo SolCon — Conectamos hoje. Construímos o futuro." width="220" />
>>>>>>> origin/main

</div>

<<<<<<< HEAD
**Pré-requisito:** Node.js 18+.

```bash
cd frontend
npm install
npm run dev       # desenvolvimento
npm run build     # checagem de tipos + build em dist/
```

O build usa `base: './'` e `HashRouter`, então `frontend/dist/index.html` também abre direto do disco.
=======
### Equipe — fotos do site
>>>>>>> origin/main

<div align="center">

| <img src="frontend/assets/imagens/carlos.jpg" alt="Carlos Franco" width="140" /> | <img src="frontend/assets/imagens/murilo.jpg" alt="Murilo Souza" width="140" /> | <img src="frontend/assets/imagens/henrique.jpg" alt="Henrique Bonachela" width="140" /> |
|:--:|:--:|:--:|
| **Carlos Franco** | **Murilo Souza** | **Henrique Bonachela** |

<<<<<<< HEAD
| Camada | Tecnologia |
|--------|-----------|
| Backend | Python 3.x (CLI) |
| Autenticação | SHA-256 (hashlib) |
| Persistência | JSON (file-based) |
| Frontend | React 18 + TypeScript + Vite |
| Estilo | TailwindCSS 3 (sem CSS externo) |
| Rotas / Formulários | react-router-dom · react-hook-form |
| Tipografia | Poppins (display) + Inter (sans-serif) |
| Ícones | lucide-react |

---

## Design System

Identidade visual da **SoulUp**, com tokens declarados em `frontend/tailwind.config.ts`.

| Token | Cor | Uso |
|-------|-----|-----|
| `soul.DEFAULT` | `#29B4B7` | Marca, CTAs primários, links |
| `soul.light` | `#A4DBDE` | Fills secundários, fundo de progresso |
| `soul.wash` | `#E8F6F6` | Superfície clara de apoio |
| `soul.deep` | `#0F5F61` | Hover de CTA |
| `navy.DEFAULT` | `#16486B` | Títulos e cards escuros de destaque |
| `navy.dark` | `#0E3550` | Trilho de progresso, cards do dashboard |
| `sun.*` | `#C8A84B` e derivados | **Exclusivo** de mascote, conquistas e streaks |
| `ink.DEFAULT` | `#000000` | Fundo das telas da Solução |
| `line` / `surf` | `#E3E7EA` / `#F5F5F5` | Hairlines de 1px e superfícies alternadas |

**Duas superfícies:** páginas institucionais em fundo claro alternando `bg-white`/`bg-surf`;
telas da Solução em `bg-ink` com cards `bg-navy-dark`.

**Device circular:** o selo redondo com "UP" da marca SoulUp aparece em badges de pontuação,
ícones de ação, iniciais de perfil e conquistas, via o componente `CircleBadge`.

**Mascote:** o Planetinha vive dentro do protótipo Pet Planet, com expressões que reagem ao tempo sem
ação e olhos que seguem o cursor. Atrás dos heros roda um campo de esporos em canvas, portado do
site anterior e recolorido. Todas as animações respeitam `prefers-reduced-motion`.

> Detalhes completos da paleta e da estrutura de pastas: [frontend/README.md](frontend/README.md)
=======
</div>

### Paleta de Cores (tema dark)

| Token | Cor | Uso |
|-------|-----|-----|
| Primary | `#8BAF6E` 🟢 | Verde sálvia — ações e destaques |
| Secondary | `#6B8F47` 🟢 | Verde escuro — hover e bordas |
| Tertiary | `#B8D49A` 🟢 | Verde claro — textos secundários |
| Accent | `#C8A84B` 🟡 | Dourado — conquistas e CTA |
| Background | `#111610` ⚫ | Quase preto — fundo base |
>>>>>>> origin/main

---

## 🚀 Como Executar

<<<<<<< HEAD
- Senhas armazenadas exclusivamente como hash SHA-256
- Nenhum dado sensível em texto plano
- Login com mensagem única para e-mail inexistente e senha errada
- Exclusão de conta protegida por confirmação textual (`DELETAR`) e senha
- Log de auditoria para ações críticas (criação/exclusão de contas, reinício de ranking)

> SHA-256 sem *salt* atende ao requisito acadêmico de não guardar senha em texto plano, mas um sistema
> em produção usaria `bcrypt` ou `argon2`.
=======
**Pré-requisito:** apenas um navegador moderno (Chrome, Edge, Firefox, Safari).

```bash
# Opção 1 — abrir direto
Clique duas vezes em frontend/index.html

# Opção 2 — servidor local simples (opcional, recomendado)
cd frontend
python -m http.server 8000
# Acesse http://localhost:8000
```

> As animações Canvas inicializam automaticamente via `IntersectionObserver`, garantindo performance mesmo em páginas longas.
>>>>>>> origin/main

---

## 👨‍💻 Autores e Créditos

**Turma 1TDSPH — Análise e Desenvolvimento de Sistemas · FIAP 2026**

| Integrante | RM | LinkedIn | GitHub |
|------------|-----|----------|--------|
| Carlos Henrique De Melo Franco | 569868 | [carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) | [@francosdev](https://github.com/francosdev) |
| Murilo Almeida Rodrigues de Souza | 573977 | [murilo-a-souza](https://linkedin.com/in/murilo-a-souza) | [@murilo-a-souza](https://github.com/murilo-a-souza) |
| Henrique Bonachela de Carvalho Carabante | 573620 | [henrique-bonachela](https://linkedin.com/in/henrique-bonachela) | [@henriquebonachela](https://github.com/henriquebonachela) |

<<<<<<< HEAD
> Consulte a rota `/integrantes` do front-end, ou o [README do módulo](frontend/README.md), para ver a equipe completa.
=======
**Parceria acadêmica:** FIAP × SoulUp × SolCon
**Coordenação:** Prof. Fernando — FIAP

---

## 🔗 Link do Repositório

> 📦 **Código-fonte público no GitHub:**
> [**github.com/francosdev/challenge-soulup-solcon**](https://github.com/francosdev/challenge-soulup-solcon)

```bash
git clone https://github.com/francosdev/challenge-soulup-solcon.git
cd challenge-soulup-solcon/frontend
```

---

## 📬 Contato

Dúvidas, sugestões ou interesse em colaborar? Fale com a equipe:

| Canal | Endereço |
|-------|----------|
| 📧 **E-mail principal** | [francosdevs@gmail.com](mailto:francosdevs@gmail.com) |
| 💬 **Formulário no site** | [contato.html](contato.html) |
| 🐙 **Issues no GitHub** | [Abrir uma issue](https://github.com/francosdev/challenge-soulup-solcon/issues) |
| 🔗 **LinkedIn (Carlos)** | [linkedin.com/in/carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) |
| 🔗 **LinkedIn (Murilo)** | [linkedin.com/in/murilo-a-souza](https://linkedin.com/in/murilo-a-souza) |
| 🔗 **LinkedIn (Henrique)** | [linkedin.com/in/henrique-bonachela](https://linkedin.com/in/henrique-bonachela) |
>>>>>>> origin/main

---

<div align="center">

**FIAP Challenge 2026** — Parceria **SoulUp** × **SolCon**

_Conectamos hoje. Construímos o futuro._ 🌱

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d4a1e,100:111610&height=100&section=footer" />

</div>
