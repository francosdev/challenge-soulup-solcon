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

Use para navegar entre os projetos de cada matéria:

[![Front-end](https://img.shields.io/badge/Front--end-007ACC?style=for-the-badge&logo=html5&logoColor=white)](./frontend/)[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](./python/)[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](./java/)[![IA & Chatbot](https://img.shields.io/badge/IA_%26_Chatbot-8E44AD?style=for-the-badge&logo=probot&logoColor=white)](./ia_chatbot/)[![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-336791?style=for-the-badge&logo=postgresql&logoColor=white)](./banco_de_dados/)[![Software Engineering & Business Model](https://img.shields.io/badge/Business_Model-2C3E50?style=for-the-badge&logo=diagrams.net&logoColor=white)](./sebm/)

## 🌱 EcoScore — Frontend Web

O **EcoScore** é um MVP de **gamificação sustentável** desenvolvido para o **FIAP Challenge 2026** em parceria com a **SoulUp** e a startup **SolCon**. A plataforma transforma ações ecológicas cotidianas (plantio, reciclagem, economia de água e energia) em **Soul Points**, conquistas e ranking mensal — com o objetivo de criar engajamento duradouro em torno de hábitos sustentáveis.

Este módulo de **frontend** é o site institucional do EcoScore: apresenta o conceito, explica o funcionamento, mostra a equipe e oferece um dashboard simulado. Foi construído com **HTML semântico, CSS modular (BEM)** e **JavaScript vanilla**, sem nenhuma dependência de framework ou build tool — basta abrir no navegador.

### 🎯 Objetivo

Ser a vitrine pública do EcoScore: explicar o sistema de pontuação, demonstrar o impacto ambiental gerado, apresentar a startup SolCon e dar contexto à banca avaliadora antes da experiência hands-on com o backend CLI.

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

### Identidade Visual

<div align="center">

<img src="frontend/assets/imagens/logo-solcon.png" alt="Logo SolCon — Conectamos hoje. Construímos o futuro." width="220" />

</div>

### Equipe — fotos do site

<div align="center">

| <img src="frontend/assets/imagens/carlos.jpg" alt="Carlos Franco" width="140" /> | <img src="frontend/assets/imagens/murilo.jpg" alt="Murilo Souza" width="140" /> | <img src="frontend/assets/imagens/henrique.jpg" alt="Henrique Bonachela" width="140" /> |
|:--:|:--:|:--:|
| **Carlos Franco** | **Murilo Souza** | **Henrique Bonachela** |

</div>

### Paleta de Cores (tema dark)

| Token | Cor | Uso |
|-------|-----|-----|
| Primary | `#8BAF6E` 🟢 | Verde sálvia — ações e destaques |
| Secondary | `#6B8F47` 🟢 | Verde escuro — hover e bordas |
| Tertiary | `#B8D49A` 🟢 | Verde claro — textos secundários |
| Accent | `#C8A84B` 🟡 | Dourado — conquistas e CTA |
| Background | `#111610` ⚫ | Quase preto — fundo base |

---

## 🚀 Como Executar

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

---

## 👨‍💻 Autores e Créditos

**Turma 1TDSPH — Análise e Desenvolvimento de Sistemas · FIAP 2026**

| Integrante | RM | LinkedIn | GitHub |
|------------|-----|----------|--------|
| Carlos Henrique De Melo Franco | 569868 | [carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) | [@francosdev](https://github.com/francosdev) |
| Murilo Almeida Rodrigues de Souza | 573977 | [murilo-a-souza](https://linkedin.com/in/murilo-a-souza) | [@murilo-a-souza](https://github.com/murilo-a-souza) |
| Henrique Bonachela de Carvalho Carabante | 573620 | [henrique-bonachela](https://linkedin.com/in/henrique-bonachela) | [@henriquebonachela](https://github.com/henriquebonachela) |

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

---

<div align="center">

**FIAP Challenge 2026** — Parceria **SoulUp** × **SolCon**

_Conectamos hoje. Construímos o futuro._ 🌱

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d4a1e,100:111610&height=100&section=footer" />

</div>
