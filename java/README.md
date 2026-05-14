# EcoScore - Gamificação Sustentável SoulUp

> Challenge FIAP 2026 em parceria com a SoulUp by Prospera
> Turma: 1TDSPH | SolCon

## Descrição

O **EcoScore** é um MVP funcional de gamificação sustentável criado para estimular hábitos ambientais positivos por meio de EcoPoints, conquistas, ranking mensal e perfis públicos. O sistema foi desenvolvido como uma camada complementar à proposta da SoulUp, transformando ações sustentáveis em progresso, reconhecimento e competição saudável.

Este projeto representa um MVP funcional da lógica de gamificação sustentável da SoulUp. A versão atual roda em terminal Python, persiste dados em JSON e simula os principais fluxos de produto antes de uma futura integração web/mobile.

## Indíce

- 🌐 [Front-end](../)
- 🐍 [Python](../python/)
- ☕ [Java](../java/)

---

# ☕ Java

## 📌 Objetivo

Desenvolver um sistema orientado a objetos em Java para representar ações sustentáveis dentro da plataforma SoulUp, utilizando gamificação, pontuação e engajamento social.

O sistema permite:

* registrar ações sustentáveis;
* calcular SoulCoins;
* publicar conquistas e ações no perfil do usuário.

---

# 📊 Diagramas

**Referências:**

* [Diagramas de classe](./diagramas-java/diagrama-classes_pronta.drawio)
* [Diagrama de relacionamento](./diagramas-java/diagrama-relacoes-classes.drawio)
* [Diagrama de regras de negócio](./diagramas-java/diagrama-regras-negocio.drawio)

---

# 🧩 Estrutura das Classes

## Classes Java.bean

|      Classes      | Subclasses |          |               |
| :---------------: | :--------: | :------: | :-----------: |
|      [Usuario](./projeto-java/src/br/com/fiap/bean/Usuario.java)      |            |          |               |
|        [Acao](./projeto-java/src/br/com/fiap/bean/Acao.java)       |  [AcaoQuiz](./projeto-java/src/br/com/fiap/bean/AcaoQuiz.java)  | [AcaoPost](./projeto-java/src/br/com/fiap/bean/AcaoPost.java) | [AcaoConquista](./projeto-java/src/br/com/fiap/bean/AcaoConquista.java) |
| [CalcularPontos](./projeto-java/src/br/com/fiap/bean/CalcularPontos.java) |            |          |               |

---

# ⚙️ Regras de Negócio

* Usuários acumulam **SoulCoins** através de ações sustentáveis.
* Cada ação possui uma lógica própria de pontuação.
* Quizzes geram pontos por desempenho.
* Posts sustentáveis podem receber bonificações por engajamento.
* Usuários mais confiáveis possuem maior peso no sistema.

---

# 🛠️ Tecnologias

* Java (orientado por POO e DDD)
* Draw.io (UML)
