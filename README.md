<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111610,100:2d4a1e&height=180&section=header&text=EcoScore&fontSize=60&fontColor=8BAF6E&fontAlignY=38&desc=Sustainable%20Gamification%20System&descSize=16&descAlignY=58&descColor=B8D49A" />

**FIAP Challenge 2026 · SoulUp × SolCon**

[![Python](https://img.shields.io/badge/Python-3.x-111111?style=for-the-badge&logo=python&logoColor=8BAF6E)](https://python.org)
[![React](https://img.shields.io/badge/React-18-111111?style=for-the-badge&logo=react&logoColor=29B4B7)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-111111?style=for-the-badge&logo=typescript&logoColor=29B4B7)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-111111?style=for-the-badge&logo=tailwindcss&logoColor=29B4B7)](https://tailwindcss.com)

</div>

---

## Índice

[![Front-end](https://img.shields.io/badge/Front--end-007ACC?style=for-the-badge&logo=react&logoColor=white)](./frontend/)[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](./python/)[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](./java/)[![IA & Chatbot](https://img.shields.io/badge/IA_%26_Chatbot-8E44AD?style=for-the-badge&logo=probot&logoColor=white)](./ia_chatbot/)[![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-336791?style=for-the-badge&logo=postgresql&logoColor=white)](./banco_de_dados/)[![Software Engineering & Business Model](https://img.shields.io/badge/Business_Model-2C3E50?style=for-the-badge&logo=diagrams.net&logoColor=white)](./sebm/)


## Visão Geral

**EcoScore** é um MVP de gamificação sustentável desenvolvido para o FIAP Challenge 2026, em parceria com a **SoulUp** e a **SolCon**. O sistema transforma ações ecológicas cotidianas em pontos, conquistas e ranking mensal — com o objetivo de criar engajamento duradouro em torno de hábitos sustentáveis.

O projeto é composto por dois módulos independentes:

- **Backend CLI (Python)** — sistema funcional de gamificação com autenticação, perfis, ranking e painel admin, operado via terminal
- **Frontend Web (React + Vite + TypeScript + TailwindCSS)** — SPA com a identidade visual da SoulUp, apresentando o produto e o dashboard da solução

---

## Funcionalidades

### Sistema de Pontuação
- **Soul Points** como moeda de progresso (meta: 100 pontos por ciclo mensal)
- 4 categorias de ações sustentáveis com pesos diferentes:
  | Categoria | Peso |
  |-----------|------|
  | Plantio e Jardinagem | 5.0 |
  | Reciclagem de Resíduos | 3.0 |
  | Redução de Energia | 2.0 |
  | Economia de Água | 0.1 |

### Conquistas
6 badges desbloqueáveis por marcos específicos:

| Badge | Critério |
|-------|---------|
| 🌱 Primeiro Broto | Registrar a primeira ação |
| ♻️ Reciclador Ativo | Reciclar 10 kg de resíduos |
| 💧 Água Consciente | Economizar 100 L de água |
| ⚡ Energia Inteligente | 5 ações de redução de energia |
| 🌿 Mão Verde | 5 ações de plantio |
| 🏆 Campeão EcoScore | Atingir 100 Soul Points |

### Gerenciamento de Usuários
- Cadastro com validação de e-mail
- Autenticação com hash SHA-256
- Recuperação de senha via código de 6 dígitos
- Edição de perfil (nome, e-mail, senha)
- Exclusão de conta com confirmação

### Social e Ranking
- Ranking mensal com posições em tempo real
- Perfis públicos (nome, pontos, conquistas, últimas 3 ações)
- Reinício de competição pelo admin
- Status de competição (ativa / encerrada ao atingir 100 pontos)

### Impacto Ambiental
Cálculo acumulado de métricas reais:
- Mudas plantadas e jardins criados
- Composto produzido (kg)
- Jardins de polinizadores
- Material reciclado (kg)
- Água economizada (L)
- Ações de eficiência energética

### Painel Administrativo
- Listagem de todos os usuários com posição no ranking
- Consulta e exclusão de contas
- Reinício da competição mensal
- Log de auditoria em arquivo de texto

---

## Estrutura do Projeto

```
challenge-soulup-solcon/
|-- frontend/                    # Frontend Web (React + Vite + TS + Tailwind)
|   |-- index.html               # Entrada Vite
|   |-- tailwind.config.ts       # Tokens da identidade SoulUp
|   |-- public/                  # Fotos da equipe, logo e data/habilidades.json
|   `-- src/
|       |-- pages/               # Home, Sobre, Solucao, SolucaoDetalhe, EcoScore, ComoFunciona,
|       |                        # Dashboard, Trilha, Faq, Integrantes, Contato
|       |-- components/          # layout, ui, solucao, ecoscore, petplanet, visual
|       |-- services/            # Acesso a dados (fetch)
|       |-- types/               # Tipos e interfaces TypeScript
|       `-- data/                # Conteúdo tipado das páginas
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

---

## Como Executar

### Backend CLI (Python)

**Pré-requisito:** Python 3.x instalado.

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

### Frontend Web

**Pré-requisito:** Node.js 18+.

```bash
cd frontend
npm install
npm run dev       # desenvolvimento
npm run build     # checagem de tipos + build em dist/
```

---

## Stack Técnica

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
| `ink.DEFAULT` | `#000000` | Fundo do protótipo Pet Planet |
| `line` / `surf` | `#E3E7EA` / `#F5F5F5` | Hairlines de 1px e superfícies alternadas |

**Duas superfícies:** páginas institucionais em fundo claro alternando `bg-white`/`bg-surf`;
o protótipo Pet Planet, na página Dashboard, é a única superfície escura.

**Device circular:** o selo redondo com "UP" da marca SoulUp aparece em badges de pontuação,
ícones de ação, iniciais de perfil e conquistas, via o componente `CircleBadge`.

**Mascote:** o Planetinha vive dentro do protótipo Pet Planet, com expressões que reagem ao tempo sem
ação e olhos que seguem o cursor. Atrás dos heros roda um campo de esporos em canvas, portado do
site anterior e recolorido. Todas as animações respeitam `prefers-reduced-motion`.

> Detalhes completos da paleta e da estrutura de pastas: [frontend/README.md](frontend/README.md)

---

## Segurança

- Senhas armazenadas exclusivamente como hash SHA-256
- Nenhum dado sensível em texto plano
- Login com mensagem única para e-mail inexistente e senha errada
- Exclusão de conta protegida por confirmação textual (`DELETAR`) e senha
- Log de auditoria para ações críticas (criação/exclusão de contas, reinício de ranking)

> SHA-256 sem *salt* atende ao requisito acadêmico de não guardar senha em texto plano, mas um sistema
> em produção usaria `bcrypt` ou `argon2`.

---

## Links

- **Repositório no GitHub:** [github.com/francosdev/challenge-soulup-solcon](https://github.com/francosdev/challenge-soulup-solcon)
- **Front-end no repositório:** [github.com/francosdev/challenge-soulup-solcon/tree/main/frontend](https://github.com/francosdev/challenge-soulup-solcon/tree/main/frontend)
- **Vídeo do front-end no YouTube:** _(inserir link do vídeo)_
- **Documentação do front-end (Sprint 3):** [frontend/README.md](frontend/README.md)
- **Contato:** [francosdevs@gmail.com](mailto:francosdevs@gmail.com)

---

## Equipe

Projeto desenvolvido por estudantes de **Análise e Desenvolvimento de Sistemas — FIAP 2026**.

- Carlos Henrique De Melo Franco — RM 569868
- Murilo Almeida Rodrigues de Souza — RM 573977
- Henrique Bonachela de Carvalho Carabante — RM 573620

> Consulte a rota `/integrantes` do front-end, ou o [README do módulo](frontend/README.md), para ver a equipe completa.

---

<div align="center">

**FIAP Challenge 2026**

Parceria: **SoulUp** × **SolCon**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d4a1e,100:111610&height=100&section=footer" />

</div>
