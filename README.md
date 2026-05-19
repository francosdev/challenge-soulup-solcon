<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111610,100:2d4a1e&height=180&section=header&text=EcoScore&fontSize=60&fontColor=8BAF6E&fontAlignY=38&desc=Sustainable%20Gamification%20System&descSize=16&descAlignY=58&descColor=B8D49A" />

**FIAP Challenge 2026 · SoulUp × SolCon**

[![Python](https://img.shields.io/badge/Python-3.x-111111?style=for-the-badge&logo=python&logoColor=8BAF6E)](https://python.org)
[![HTML5](https://img.shields.io/badge/HTML5-Frontend-111111?style=for-the-badge&logo=html5&logoColor=8BAF6E)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-111111?style=for-the-badge&logo=javascript&logoColor=8BAF6E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Canvas API](https://img.shields.io/badge/Canvas_API-Animations-111111?style=for-the-badge&logo=html5&logoColor=8BAF6E)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

</div>

---
## Indíce

- 🌐 [Front-end](./)
- 🐍 [Python](./python/)
- ☕ [Java](./java/)
- 🤖 [IA & Chatbot](./ia_chatbot/)


## Visão Geral

**EcoScore** é um MVP de gamificação sustentável desenvolvido para o FIAP Challenge 2026, em parceria com a **SoulUp** e a **SolCon**. O sistema transforma ações ecológicas cotidianas em pontos, conquistas e ranking mensal — com o objetivo de criar engajamento duradouro em torno de hábitos sustentáveis.

O projeto é composto por dois módulos independentes:

- **Backend CLI (Python)** — sistema funcional de gamificação com autenticação, perfis, ranking e painel admin, operado via terminal
- **Frontend Web (HTML/CSS/JS)** — site de apresentação com animações generativas em Canvas, explicando o sistema para novos usuários

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
├── python/                      # Backend CLI
│   ├── main.py                  # Ponto de entrada
│   ├── autenticacao.py          # Login, recuperação de senha, hash
│   ├── usuarios.py              # Perfis, edição, perfis públicos
│   ├── dados.py                 # Persistência JSON + migração automática
│   ├── gamificacao.py           # Pontos, conquistas, ações
│   ├── impacto.py               # Cálculo de impacto ambiental
│   ├── admin.py                 # Painel administrativo
│   ├── interface.py             # Componentes de UI para terminal
│   ├── config.py                # Constantes, categorias, ações
│   └── ecoscore_dados.json      # Banco de dados (JSON)
│
├── HTML Pages/                  # Frontend Web
│   ├── index.html               # Página inicial
│   ├── ecoscore.html            # Detalhes do sistema
│   ├── como-funciona.html       # Fluxo em 5 etapas
│   ├── sobre.html               # Contexto e solução
│   ├── faq.html                 # Perguntas frequentes
│   ├── integrantes.html         # Equipe
│   └── contato.html             # Formulário de contato
│
├── js/                          # Scripts do frontend
│   ├── main.js                  # Inicialização e observers
│   ├── micelio.js               # Sistema de partículas (Canvas)
│   ├── micelio-divider.js       # Animações de divisores
│   ├── spores.js                # Geração de esporos
│   ├── particulas.js            # Efeitos de partículas
│   ├── contato.js               # Lógica do formulário
│   └── menu.js                  # Toggle de navegação
│
├── css/
│   ├── style.css                # Estilos globais + tema dark
│   ├── componentes.css          # Estilos de componentes
│   └── responsivo.css           # Design responsivo
│
├── assets/imagens/              # Fotos da equipe + logo
├── banco_de_dados/              # Documentação de banco de dados
├── ia_chatbot/                  # Notas sobre integração IBM Watson
├── executar_ecoscore.bat        # Runner para Windows
└── .gitignore
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
          "categoria": "string",
          "descricao": "string",
          "quantidade": 0,
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

O módulo `dados.py` inclui migração automática para normalizar formatos legados ao carregar o arquivo.

---

## Como Executar

### Backend CLI (Python)

**Pré-requisito:** Python 3.x instalado.

```bash
# Linux / macOS
python python/main.py

# Windows
executar_ecoscore.bat
```

**Conta admin padrão:**
- Email: `admin@ecoscore.com`
- Senha: definida no primeiro acesso

### Frontend Web

Abra qualquer arquivo `.html` da pasta `HTML Pages/` diretamente no navegador. Nenhum servidor ou build é necessário — as animações Canvas inicializam automaticamente.

---

## Stack Técnica

| Camada | Tecnologia |
|--------|-----------|
| Backend | Python 3.x (CLI) |
| Autenticação | SHA-256 (hashlib) |
| Persistência | JSON (file-based) |
| Frontend | HTML5, CSS3, JavaScript ES6+ |
| Animações | Canvas API (partículas e micélio) |
| Tipografia | Fraunces (serif) + Inter (sans-serif) |
| Ícones | Lucide SVG |

---

## Design System

**Paleta (tema dark):**

| Token | Cor | Uso |
|-------|-----|-----|
| Primary | `#8BAF6E` | Verde sálvia — ações, destaques |
| Secondary | `#6B8F47` | Verde escuro — hover, bordas |
| Tertiary | `#B8D49A` | Verde claro — textos secundários |
| Accent | `#C8A84B` | Dourado — conquistas, CTA |
| Background | `#111610` | Quase preto — fundo base |

**Animações:** sistema de partículas estilo PS5 com rede de micélio nos divisores de seção, controlado por IntersectionObserver para ativar conforme o scroll.

---

## Segurança

- Senhas armazenadas exclusivamente como hash SHA-256
- Nenhum dado sensível em texto plano
- Log de auditoria para ações críticas (criação/exclusão de contas, reinício de ranking)
- Migração automática de credenciais legadas ao iniciar

---

## Equipe

Projeto desenvolvido por estudantes de **Análise e Desenvolvimento de Sistemas — FIAP 2026**.

> Consulte a página [integrantes.html](HTML%20Pages/integrantes.html) para ver a equipe completa.

---

<div align="center">

**FIAP Challenge 2026**

Parceria: **SoulUp** × **SolCon**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d4a1e,100:111610&height=100&section=footer" />

</div>
