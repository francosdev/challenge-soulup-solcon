<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111610,100:2d4a1e&height=180&section=header&text=EcoScore&fontSize=60&fontColor=8BAF6E&fontAlignY=38&desc=Sustainable%20Gamification%20System&descSize=16&descAlignY=58&descColor=B8D49A" />

**FIAP Challenge 2026 · SoulUp × SolCon · Turma 1TDSPH**

</div>

---

## Índice

[![Front-end](https://img.shields.io/badge/Front--end-007ACC?style=for-the-badge&logo=html5&logoColor=white)](../frontend/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](../python/)
[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](../java/)
[![IA & Chatbot](https://img.shields.io/badge/IA_%26_Chatbot-8E44AD?style=for-the-badge&logo=probot&logoColor=white)](../ia_chatbot/)
[![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-336791?style=for-the-badge&logo=postgresql&logoColor=white)](../banco_de_dados/)
[![Business Model](https://img.shields.io/badge/Business_Model-2C3E50?style=for-the-badge&logo=diagrams.net&logoColor=white)](../sebm/)

---

## Visão Geral

**EcoScore** é um MVP de **gamificação sustentável** desenvolvido para o **FIAP Challenge 2026**, em parceria com a **SoulUp** e a **SolCon**.

A proposta do projeto é transformar ações ecológicas cotidianas em pontos, conquistas, ranking e indicadores de impacto ambiental. Dessa forma, o EcoScore busca incentivar hábitos sustentáveis por meio de uma experiência mais interativa, motivadora e contínua.

Este repositório apresenta a entrega da disciplina de **Banco de Dados**, responsável por estruturar a base de dados do projeto. A modelagem foi criada para organizar as informações principais da solução, como usuários, ações sustentáveis, evidências, validações, temporadas, conquistas, ranking e impacto ambiental.

---

# 🗄️ Banco de Dados — EcoScore by SolCon

<div align="center">

[![Oracle](https://img.shields.io/badge/Oracle-Data_Modeler-111111?style=for-the-badge&logo=oracle&logoColor=8BAF6E)](https://www.oracle.com/database/technologies/appdev/datamodeler.html)
[![DDL](https://img.shields.io/badge/DDL-Modelo_F%C3%ADsico-111111?style=for-the-badge&logo=databricks&logoColor=8BAF6E)](#-arquivos-da-entrega)
[![Modelagem](https://img.shields.io/badge/Modelagem-L%C3%B3gica_%26_Relacional-111111?style=for-the-badge&logo=diagramsdotnet&logoColor=8BAF6E)](#-modelagem-relacional)
[![Sustentabilidade](https://img.shields.io/badge/Sustentabilidade-Gamificada-111111?style=for-the-badge&logo=leaflet&logoColor=8BAF6E)](#-sustentabilidade-no-banco-de-dados)

</div>

---

## 🎯 Objetivo da Entrega

O objetivo da entrega de **Banco de Dados** foi criar uma modelagem capaz de representar a jornada principal do usuário dentro do **EcoScore by SolCon**, passando da ideia do projeto para uma estrutura organizada em banco de dados.

A estrutura foi pensada para armazenar e relacionar informações essenciais da solução, como:

- usuários e administradores;
- categorias de ações sustentáveis;
- ações ecológicas registradas;
- evidências enviadas pelos usuários;
- validações das evidências;
- temporadas de gamificação;
- pontos e ranking;
- conquistas desbloqueadas;
- impacto ambiental consolidado.

Com isso, o banco de dados funciona como a base estrutural para transformar o EcoScore em uma solução mais organizada, escalável e próxima de um sistema real.

---

## 🌱 Conceito do Projeto

O **EcoScore by SolCon** incentiva o usuário a realizar ações sustentáveis no dia a dia, como:

- reciclar materiais;
- economizar água;
- reduzir o consumo de energia;
- realizar compostagem;
- plantar mudas;
- participar de ações ambientais.

Essas ações podem gerar **Soul Points**, melhorar a posição do usuário no ranking, desbloquear conquistas e contribuir para indicadores de impacto ambiental.

A modelagem de Banco de Dados foi criada para sustentar essa lógica, registrando a participação do usuário, validando suas ações e transformando esses dados em progresso dentro da experiência gamificada.

---

## 🧠 Ideia Central da Modelagem

A modelagem foi construída a partir da seguinte jornada:

```text
Usuário realiza uma ação sustentável
            ↓
Registra essa ação no EcoScore
            ↓
Envia uma evidência
            ↓
A evidência passa por validação
            ↓
A ação validada gera pontos
            ↓
O usuário participa do ranking
            ↓
Desbloqueia conquistas
            ↓
Acompanha seu impacto ambiental
```

Essa jornada conecta sustentabilidade, tecnologia e gamificação em uma única estrutura de dados.

---

## 🛠️ Tecnologias e Materiais Utilizados

| Recurso | Uso no projeto |
|--------|----------------|
| **Oracle Data Modeler** | Criação e organização das modelagens lógica e relacional |
| **Modelo Lógico** | Representação das entidades, atributos e relacionamentos do EcoScore |
| **Modelo Relacional** | Estruturação das tabelas, chaves e relações do banco |
| **DDL** | Arquivo gerado a partir da modelagem para representar o modelo físico |
| **PDF de Documentação** | Registro formal da entrega, com contextualização do projeto, requisitos funcionais e não funcionais, regras de negócio, imagens das modelagens e conclusão |
| **GitHub** | Organização, versionamento e apresentação dos arquivos da disciplina |

---

## 🧩 Modelagem Relacional

O banco foi organizado em tabelas que representam os principais elementos do **EcoScore by SolCon**.

| Tabela | Representa |
|-------|------------|
| `T_ECO_USUARIO` | Usuários comuns e administradores |
| `T_ECO_CATEGORIA` | Tipos de ações sustentáveis |
| `T_ECO_TEMPORADA` | Ciclos de gamificação |
| `T_ECO_CONQUISTA` | Conquistas e badges |
| `T_ECO_ACAO_SUSTENTAVEL` | Ações sustentáveis registradas pelos usuários |
| `T_ECO_EVIDENCIA` | Evidências enviadas para comprovação |
| `T_ECO_VALIDACAO` | Validação das evidências |
| `T_ECO_USUARIO_CONQUISTA` | Conquistas desbloqueadas por usuários |
| `T_ECO_RANKING_USUARIO` | Ranking por temporada |
| `T_ECO_IMPACTO` | Impacto ambiental consolidado |

---

## 🖼️ Arquivos da Entrega

A pasta de Banco de Dados contém os principais arquivos produzidos para representar a estrutura de dados do **EcoScore by SolCon**.

| Arquivo | Descrição |
|--------|-----------|
| `modelagem-logica.png` | Imagem da modelagem lógica criada no Oracle Data Modeler |
| `modelagem-relacional.png` | Imagem da modelagem relacional/física do banco |
| `eco_score_modelagem_solcon_.ddl` | Arquivo DDL gerado a partir da modelagem |
| `solcon-documentacao-banco-de-dados.pdf` | Documentação em PDF da entrega de Banco de Dados |

Esses arquivos permitem que professores, avaliadores, programadores e visitantes do repositório compreendam como a estrutura do banco foi planejada para sustentar o funcionamento do EcoScore by SolCon.

---

## 🔄 Fluxo Principal dos Dados

```text
T_ECO_USUARIO
      ↓
T_ECO_ACAO_SUSTENTAVEL
      ↓
T_ECO_EVIDENCIA
      ↓
T_ECO_VALIDACAO
      ↓
T_ECO_RANKING_USUARIO
      ↓
T_ECO_CONQUISTA / T_ECO_IMPACTO
```

Esse fluxo mostra como o banco acompanha a evolução do usuário dentro do EcoScore: desde o registro da ação sustentável até a validação, pontuação, ranking, conquistas e impacto ambiental.

---

## 🌿 Sustentabilidade no Banco de Dados

O banco não foi pensado apenas para armazenar informações técnicas. Ele também representa o propósito sustentável do projeto.

A modelagem permite registrar dados relacionados a:

- quantidade reciclada;
- economia de água;
- economia de energia;
- compostagem;
- plantio;
- ações ambientais;
- impacto acumulado por usuário;
- impacto por temporada.

Essas informações podem ser utilizadas futuramente em dashboards, relatórios ambientais e análises sobre o comportamento sustentável dos usuários.

---

## 🏆 Gamificação Representada no Banco

A gamificação é um dos pontos centrais do **EcoScore by SolCon**.

No banco de dados, ela aparece por meio de:

- **Soul Points** gerados por ações sustentáveis;
- ranking por temporada;
- conquistas desbloqueadas;
- histórico de ações;
- temporadas de participação;
- impacto ambiental acumulado.

Essa estrutura ajuda a manter o usuário engajado, incentivando a continuidade de hábitos sustentáveis e tornando a experiência mais motivadora.

---

## 🔐 Integridade e Organização

Para garantir consistência nos dados, a modelagem considera:

- chaves primárias;
- chaves estrangeiras;
- relacionamentos entre entidades;
- padronização de nomes;
- separação entre entidades principais, associativas e consolidadas;
- estrutura compatível com evolução futura para integração com backend, frontend e chatbot.

Também foi adotado o prefixo `T_ECO_` para identificar as tabelas do projeto.

Exemplos:

```text
T_ECO_USUARIO
T_ECO_CATEGORIA
T_ECO_ACAO_SUSTENTAVEL
T_ECO_IMPACTO
```

Essa organização torna o banco mais claro, legível e preparado para futuras integrações.

---

## 📁 Estrutura da Pasta

```text
banco_de_dados/
├── eco_score_modelagem_solcon_.ddl        # Arquivo DDL gerado pela modelagem
├── modelagem-logica.png                   # Imagem da modelagem lógica
├── modelagem-relacional.png               # Imagem da modelagem relacional
├── solcon-documentacao-banco-de-dados.pdf # Documentação da entrega
└── README.md                              # Apresentação da entrega de Banco de Dados
```

---

## 🚀 Como Visualizar a Entrega

Para analisar a entrega de Banco de Dados, acesse os arquivos disponíveis nesta pasta:

1. Abra `modelagem-logica.png` para visualizar a modelagem lógica.
2. Abra `modelagem-relacional.png` para visualizar a modelagem relacional/física.
3. Consulte `eco_score_modelagem_solcon_.ddl` para verificar o arquivo DDL gerado a partir da modelagem.
4. Abra `solcon-documentacao-banco-de-dados.pdf` para ler a documentação completa da entrega.

> A modelagem foi desenvolvida com foco acadêmico no **Oracle Data Modeler**, representando a estrutura de dados necessária para o funcionamento do EcoScore by SolCon.

---

## 📌 O que foi Entregue

Nesta etapa de **Banco de Dados**, foram desenvolvidos:

- modelagem lógica do banco;
- modelagem relacional do EcoScore by SolCon;
- criação das principais entidades do sistema;
- definição dos relacionamentos entre as tabelas;
- arquivo DDL gerado a partir da modelagem;
- documentação em PDF;
- estrutura para usuários, ações, evidências, validações, ranking, conquistas e impacto ambiental;
- apresentação organizada dos arquivos no GitHub.

---

## 🔮 Possíveis Evoluções

A modelagem criada permite futuras melhorias, como:

- integração com o backend em Python ou Java;
- conexão com o frontend;
- integração com o EcoBot SolCon;
- dashboard com dados reais;
- ranking em tempo real;
- relatórios de impacto ambiental;
- envio real de evidências;
- análise de participação por temporada;
- validação automatizada de ações sustentáveis.

---

## 👨‍💻 Autores e Créditos

**Turma 1TDSPH — Análise e Desenvolvimento de Sistemas · FIAP 2026**

| Integrante | RM | LinkedIn | GitHub |
|------------|----|----------|--------|
| Carlos Henrique De Melo Franco | 569868 | [carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) | [@francosdev](https://github.com/francosdev) |
| Murilo Almeida Rodrigues de Souza | 573977 | [murilo-a-souza](https://linkedin.com/in/murilo-a-souza) | [@murilo-a-souza](https://github.com/murilo-a-souza) |
| Henrique Bonachela de Carvalho Carabante | 573620 | [henrique-bonachela](https://linkedin.com/in/henrique-bonachela) | [@henriquebonachela](https://github.com/henriquebonachela) |

**Parceria acadêmica:** FIAP × SoulUp × SolCon  
**Professor:** Gustavo Molina

---

## 🔗 Link do Repositório

> 📦 **Código-fonte público no GitHub:**  
> [**github.com/francosdev/challenge-soulup-solcon**](https://github.com/francosdev/challenge-soulup-solcon)

```bash
git clone https://github.com/francosdev/challenge-soulup-solcon.git
cd challenge-soulup-solcon/banco_de_dados
```

---

<div align="center">

**FIAP Challenge 2026** — Parceria **SoulUp** × **SolCon**

_Conectamos hoje. Construímos o futuro._ 🌱

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d4a1e,100:111610&height=100&section=footer" />

</div>
