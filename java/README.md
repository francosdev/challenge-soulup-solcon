<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111610,100:2d4a1e&height=180&section=header&text=EcoScore&fontSize=60&fontColor=8BAF6E&fontAlignY=38&desc=Sustainable%20Gamification%20System&descSize=16&descAlignY=58&descColor=B8D49A" />

**FIAP Challenge 2026 · SoulUp × SolCon**

</div>

---
## Indíce
[![Front-end](https://img.shields.io/badge/Front--end-007ACC?style=for-the-badge&logo=html5&logoColor=white)](../)[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](../python/)[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](../java/)[![IA & Chatbot](https://img.shields.io/badge/IA_%26_Chatbot-8E44AD?style=for-the-badge&logo=probot&logoColor=white)](../ia_chatbot/)[![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-336791?style=for-the-badge&logo=postgresql&logoColor=white)](../banco_de_dados/)[![Software Engineering & Business Model](https://img.shields.io/badge/Software_Engineering_%26_Business_Model-2C3E50?style=for-the-badge&logo=diagrams.net&logoColor=white)](../sebm/)


## Visão Geral

**EcoScore** é um MVP de gamificação sustentável desenvolvido para o FIAP Challenge 2026, em parceria com a **SoulUp** e a **SolCon**. O sistema transforma ações ecológicas cotidianas em pontos, conquistas e ranking mensal — com o objetivo de criar engajamento duradouro em torno de hábitos sustentáveis.

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
| [CalculadoraPontos](./projeto-java/src/br/com/fiap/bean/CalculadoraPontos.java) |            |          |               |

---

# ⚙️ Regras de Negócio

* Usuários acumulam **SoulCoins** através de ações sustentáveis.
* Cada ação possui uma lógica própria de pontuação.
* Quizzes geram pontos por desempenho e sações atreladas a eles, ou só pelo desempenho
* Posts sustentáveis podem receber bonificações por engajamento e posição no ranking
* Usuários mais confiáveis possuem maior peso no sistema.

---

# 🛠️ Tecnologias

* Java (orientado por POO e DDD)
* Draw.io (UML)
