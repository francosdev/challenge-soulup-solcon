# EcoScore — Sistema de Gamificação Sustentável

> Projeto desenvolvido para o **Challenge FIAP 2026** em parceria com a **SoulUp (by Prospera)**  
> Turma: **1TDSPH** — 1º Semestre 2026

---

## Sobre o Projeto

O **EcoScore** é um sistema de gamificação sustentável desenvolvido como uma camada de amplificação da plataforma SoulUp. O objetivo é transformar o engajamento esporádico dos usuários em hábitos sustentáveis duradouros.

A SoulUp é uma plataforma digital brasileira que transforma interações online em benefícios reais e impacto ambiental positivo. O EcoScore potencializa essa experiência por meio de três pilares:

### Pilares

**Pertencimento**
- Avatar com itens base gratuitos desde o início
- Itens especiais desbloqueados por missão — não comprados com pontos
- Feed social com up/down ponderado por reputação acumulada

**Progressão**
- Árvore de Habilidades com 3 classes no MVP: ♻️ Reciclagem | 🌱 Jardinagem | 💧 Água
- Cada classe tem 3 camadas: Quiz → Evidência (foto no app) → Selo automático
- Progressão por comprometimento, não por complexidade técnica

**Recompensa com propósito**
- EcoPoints usando o sistema de pontos da SoulUp — sem moeda adicional
- Selos no perfil como status conquistado pela trilha percorrida
- Recompensa máxima: conta de energia elétrica 100% subsidiada para o top do ranking

---

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 puro — Flexbox, Grid, variáveis CSS, media queries
- JavaScript ES6+ vanilla
- [Lucide Icons](https://lucide.dev) via CDN — biblioteca de ícones SVG

> Nenhum framework CSS ou JS foi utilizado — projeto desenvolvido com tecnologias puras conforme requisitos da disciplina.

---

## Estrutura de Pastas

```
challenge-soulup-solcon/
├── index.html              ← Página inicial
├── sobre.html              ← Contexto e solução
├── integrantes.html        ← Equipe do projeto
├── faq.html                ← Perguntas frequentes
├── contato.html            ← Formulário de contato
├── ecoscore.html           ← Skill tree, ranking e avatar
├── como-funciona.html      ← Fluxo: ação → foto → evidência → selo
│
├── /css
│   ├── style.css           ← Estilos globais e variáveis CSS
│   ├── responsivo.css      ← Media queries
│   └── componentes.css     ← Componentes reutilizáveis
│
├── /js
│   ├── main.js             ← Animações e FAQ acordeon
│   ├── menu.js             ← Menu hambúrguer mobile
│   └── contato.js          ← Validação do formulário
│
└── /assets
    ├── /imagens
    └── /icons
```

---

## Páginas

| Página | Descrição |
|--------|-----------|
| `index.html` | Apresentação do projeto EcoScore |
| `sobre.html` | Contexto do problema e solução proposta |
| `integrantes.html` | Equipe com foto, RM, LinkedIn, GitHub e startup SolCon |
| `faq.html` | Perguntas e respostas sobre o projeto |
| `contato.html` | Formulário com validação JavaScript |
| `ecoscore.html` | Skill tree, trilhas das 3 classes, ranking e reputação social |
| `como-funciona.html` | Fluxo completo: quiz → evidência → selo → recompensa |

---

## Equipe

| Nome | RM | LinkedIn | GitHub |
|------|----|----------|--------|
| Carlos Henrique De Melo Franco | 569868 | [carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) | [francosdev](https://github.com/francosdev) |
| Murilo de Souza | 573977 | [murilo-a-souza](https://linkedin.com/in/murilo-a-souza) | [murilo-a-souza](https://github.com/murilo-a-souza) |
| Henrique Bonachela de Carvalho Carabante | 573620 | [henrique-bonachela](https://linkedin.com/in/henrique-bonachela-de-carvalho-carabante-260b86338) | [henriquebonachela](https://github.com/henriquebonachela) |

---

## Java

[☕ Diagramas de classe](./java/diagrama-classes.drawio)

---

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/francosdev/challenge-soulup-solcon.git
   ```
2. Abra o arquivo `index.html` no navegador — nenhuma instalação necessária.

---

## Responsividade

O projeto foi desenvolvido para três breakpoints:

- **Mobile:** até 480px — layout coluna única, menu hambúrguer
- **Tablet:** a partir de 768px — grid 2 colunas
- **Desktop:** a partir de 992px — layout completo

---

*Challenge FIAP 2026 — Turma 1TDSPH | Parceria SoulUp (by Prospera) | SolCon*
