<div align="center">

<img 
  src="https://capsule-render.vercel.app/api?type=waving&color=0:111610,100:2d4a1e&height=180&section=header&text=EcoScore&fontSize=60&fontColor=8BAF6E&fontAlignY=38&desc=IA%20%26%20Chatbot&descSize=16&descAlignY=58&descColor=B8D49A" 
  alt="EcoScore - IA & Chatbot"
/>

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

A proposta do projeto é incentivar ações ecológicas cotidianas por meio de uma experiência gamificada, na qual o usuário pode registrar atitudes sustentáveis, enviar evidências, conquistar pontos, acompanhar seu ranking e visualizar seu impacto ambiental.

Este módulo apresenta a entrega da disciplina de **Inteligência Artificial & Chatbot**, responsável pela criação do **EcoBot SolCon**, um assistente virtual desenvolvido para orientar o usuário final sobre o funcionamento do **EcoScore by SolCon**.

O chatbot foi planejado para atuar como um canal inteligente de suporte, explicando temas como ações sustentáveis, evidências, validação, pontuação, ranking, conquistas, temporadas e impacto ambiental.

---

# 🤖 Inteligência Artificial & Chatbot — EcoBot SolCon

<div align="center">

[![IBM Watson Assistant](https://img.shields.io/badge/IBM-Watson_Assistant-111111?style=for-the-badge&logo=ibm&logoColor=8BAF6E)](https://www.ibm.com/products/watsonx-assistant)
[![Node-RED](https://img.shields.io/badge/Node--RED-Integra%C3%A7%C3%A3o-111111?style=for-the-badge&logo=nodered&logoColor=8BAF6E)](https://nodered.org/)
[![Telegram](https://img.shields.io/badge/Telegram-Bot-111111?style=for-the-badge&logo=telegram&logoColor=8BAF6E)](https://telegram.org/)
[![IBM Cloud](https://img.shields.io/badge/IBM_Cloud-STT_%26_TTS-111111?style=for-the-badge&logo=ibmcloud&logoColor=8BAF6E)](https://www.ibm.com/cloud)
[![WebChat](https://img.shields.io/badge/WebChat-Embedder-111111?style=for-the-badge&logo=chatbot&logoColor=8BAF6E)](#-webchat-do-watson-assistant)

</div>

---

## 🎯 Objetivo da Entrega

O objetivo da entrega de **Inteligência Artificial & Chatbot** foi desenvolver um assistente virtual capaz de apoiar o usuário final na compreensão e utilização do **EcoScore by SolCon**.

O **EcoBot SolCon** foi criado para responder dúvidas, orientar interações e demonstrar como a inteligência artificial pode ser aplicada ao projeto de sustentabilidade gamificada.

O chatbot foi pensado para ajudar o usuário a entender:

- o que é o EcoScore by SolCon;
- quais ações sustentáveis podem ser registradas;
- como enviar evidências;
- como funciona a validação das ações;
- como são gerados os Soul Points;
- como funciona o ranking;
- como desbloquear conquistas;
- como acompanhar o impacto ambiental;
- como interagir com o assistente pelo WebChat;
- como a solução pode ser integrada ao Telegram com Node-RED.

---

## 🌱 Conceito do EcoBot SolCon

O **EcoBot SolCon** é o assistente virtual do projeto **EcoScore by SolCon**.

Ele atua como um guia para o usuário, explicando de maneira simples como participar da plataforma e como transformar ações sustentáveis em progresso dentro de uma experiência gamificada.

A ideia principal é aproximar o usuário da proposta do EcoScore, tornando o uso da solução mais intuitivo, acessível e interativo.

Exemplos de perguntas que o chatbot pode responder:

```text
O que é o EcoScore?
Como registro uma ação sustentável?
Como envio uma evidência?
Como funciona a pontuação?
O que são Soul Points?
Como entro no ranking?
Como desbloqueio conquistas?
Como acompanho meu impacto ambiental?
```

---

## 🧠 Inteligência Artificial no Projeto

A inteligência artificial foi aplicada por meio do **IBM Watson Assistant**, utilizado para estruturar o comportamento conversacional do EcoBot SolCon.

Foram trabalhados elementos como:

- intenções do usuário;
- respostas orientativas;
- diálogos guiados;
- mensagens de fallback;
- orientação sobre ações sustentáveis;
- explicação da gamificação;
- suporte ao uso da plataforma;
- integração com WebChat;
- integração planejada com Telegram por meio do Node-RED;
- estrutura para uso de Speech to Text e Text to Speech.

A proposta não foi apenas criar respostas automáticas, mas sim desenvolver um assistente alinhado ao propósito do projeto: incentivar hábitos sustentáveis e facilitar a jornada do usuário dentro do EcoScore.

---

## 🛠️ Tecnologias e Materiais Utilizados

| Recurso | Uso no projeto |
|--------|----------------|
| **IBM Watson Assistant** | Criação do chatbot, diálogos, intenções, respostas e fluxo conversacional |
| **Node-RED** | Integração entre Telegram, Watson Assistant e serviços da IBM Cloud |
| **Telegram Bot** | Canal de comunicação para interação do usuário com o EcoBot SolCon |
| **IBM Speech to Text** | Estrutura planejada para converter áudio enviado pelo usuário em texto |
| **IBM Text to Speech** | Estrutura planejada para converter respostas textuais do chatbot em áudio |
| **Watson Assistant WebChat** | Integração do chatbot em ambiente web por meio de código embedder |
| **JSON** | Exportação do workspace do Watson Assistant e do fluxo Node-RED |
| **GitHub** | Organização, versionamento e apresentação dos arquivos da disciplina |
| **Vídeo demonstrativo** | Registro da explicação e funcionamento da entrega |

---

## 🔄 Fluxo Geral da Solução

A entrega foi organizada em dois principais ambientes de interação:

1. **WebChat do Watson Assistant**
2. **Telegram integrado ao Node-RED**

O fluxo geral da solução pode ser representado assim:

```text
Usuário
  ↓
WebChat ou Telegram
  ↓
EcoBot SolCon
  ↓
Watson Assistant
  ↓
Resposta orientativa sobre o EcoScore
```

No caso da integração com Telegram e Node-RED, o fluxo foi planejado para permitir tanto mensagens de texto quanto mensagens de áudio:

```text
Usuário envia texto ou áudio no Telegram
              ↓
Node-RED identifica o tipo da mensagem
              ↓
Texto segue diretamente para o Watson Assistant
              ↓
Áudio passa pela estrutura de Speech to Text
              ↓
Watson Assistant gera a resposta
              ↓
Resposta retorna ao Telegram
              ↓
Text to Speech pode gerar resposta em áudio
```

---

## 💬 Watson Assistant

O **Watson Assistant** foi utilizado para construir o núcleo conversacional do EcoBot SolCon.

Nele foram organizadas as respostas relacionadas ao projeto, com foco em orientar o usuário sobre a experiência do EcoScore by SolCon.

A skill exportada contém a estrutura do chatbot criada para responder perguntas relacionadas a:

- apresentação do EcoScore;
- ações sustentáveis;
- reciclagem;
- economia de água;
- economia de energia;
- evidências;
- validação;
- pontuação;
- ranking;
- conquistas;
- temporadas;
- impacto ambiental;
- mensagens de fallback.

Arquivo entregue:

```text
ia_chatbot/watson_assistant/EcoBot-SolCon-dialog_projeto_final.json
```

---

## 🧩 Node-RED

O **Node-RED** foi utilizado como ferramenta de integração entre os serviços do projeto.

O fluxo criado conecta o Telegram ao Watson Assistant e organiza a comunicação entre os componentes do sistema.

O fluxo contempla:

- recebimento de mensagens pelo Telegram;
- identificação de mensagens de texto;
- identificação de mensagens de áudio;
- preparação de chamadas para o Watson Assistant;
- gerenciamento de sessão;
- envio da resposta ao Telegram;
- estrutura planejada para uso de Speech to Text;
- estrutura planejada para uso de Text to Speech.

Arquivo entregue:

```text
ia_chatbot/node_red/EcoBot_SolCon_NodeRED_Telegram_STT_TTS.json.json
```

> Observação: o arquivo foi mantido com o nome exportado no projeto. Caso seja padronizado futuramente, recomenda-se renomeá-lo para `EcoBot_SolCon_NodeRED_Telegram_STT_TTS.json`.

---

## 🎙️ Speech to Text e Text to Speech

A entrega também considerou recursos de voz com serviços da IBM Cloud.

| Serviço | Finalidade |
|--------|------------|
| **IBM Speech to Text** | Converter áudio enviado pelo usuário em texto |
| **IBM Text to Speech** | Converter a resposta textual do chatbot em áudio |

Esses serviços foram planejados para permitir uma experiência mais acessível, possibilitando interação não apenas por texto, mas também por áudio.

Durante os testes, a interação por texto foi priorizada para garantir estabilidade na apresentação. A estrutura de integração com STT e TTS foi mantida no fluxo Node-RED como parte da proposta técnica da solução.

---

## 📲 Telegram Bot

O Telegram foi utilizado como canal de interação externa com o EcoBot SolCon.

Por meio dele, o usuário pode enviar mensagens para o chatbot e receber orientações relacionadas ao EcoScore.

A integração foi estruturada para funcionar com:

- mensagens de texto;
- mensagens de áudio;
- respostas automáticas;
- comunicação entre Telegram e Watson Assistant via Node-RED.

Essa abordagem demonstra como o EcoBot SolCon poderia ser expandido para canais reais de atendimento e suporte ao usuário.

---

## 🌐 WebChat do Watson Assistant

Além do Telegram, o chatbot também foi preparado para uso via **WebChat do Watson Assistant**.

O código embedder permite inserir o EcoBot SolCon em uma página web, como o frontend do projeto.

Arquivo entregue:

```text
ia_chatbot/codigo-embedder-webchat.txt
```

Esse arquivo contém o código necessário para carregar o WebChat no ambiente web do projeto, sem incluir API Keys, tokens ou senhas privadas.

---

## 🖼️ Imagens e Evidências da Entrega

Foram adicionadas imagens para documentar visualmente o desenvolvimento, a configuração e os testes do chatbot.

### Imagens do Node-RED

```text
ia_chatbot/node_red/imagens_node_red/
```

Essa pasta contém capturas do fluxo de integração criado no Node-RED, demonstrando a organização dos nós e a comunicação entre os serviços.

### Imagens do Watson Assistant

```text
ia_chatbot/watson_assistant/imagens_watson_assistant/
```

Essa pasta contém capturas relacionadas ao Watson Assistant, WebChat, testes e configurações do EcoBot SolCon.

Essas imagens ajudam professores, avaliadores e visitantes do repositório a compreenderem visualmente como a solução foi construída.

---

## 📁 Estrutura da Pasta

```text
ia_chatbot/
├── README.md
├── codigo-embedder-webchat.txt
├── video_demonstrativo_e_servicos-utilizados-ia-chatbot.txt
│
├── node_red/
│   ├── EcoBot_SolCon_NodeRED_Telegram_STT_TTS.json.json
│   └── imagens_node_red/
│       ├── imagem1.png
│       ├── imagem2.png
│       ├── imagem3.png
│       ├── imagem4.png
│       ├── imagem5.png
│       └── imagem6.png
│
└── watson_assistant/
    ├── EcoBot-SolCon-dialog_projeto_final.json
    └── imagens_watson_assistant/
        ├── imagem1.png
        ├── imagem2.png
        ├── imagem3.png
        └── ...
```

---

## 📄 Arquivos da Entrega

| Arquivo/Pasta | Descrição |
|--------------|-----------|
| `README.md` | Apresentação da entrega de Inteligência Artificial & Chatbot |
| `node_red/` | Pasta com o fluxo Node-RED e imagens da integração |
| `EcoBot_SolCon_NodeRED_Telegram_STT_TTS.json.json` | Fluxo exportado do Node-RED |
| `imagens_node_red/` | Capturas do fluxo Node-RED |
| `watson_assistant/` | Pasta com a skill do Watson Assistant e imagens |
| `EcoBot-SolCon-dialog_projeto_final.json` | Skill exportada do Watson Assistant |
| `imagens_watson_assistant/` | Capturas do Watson Assistant, WebChat e testes |
| `codigo-embedder-webchat.txt` | Código embedder do Watson Assistant WebChat |
| `video_demonstrativo_e_servicos-utilizados-ia-chatbot.txt` | Arquivo com serviços utilizados e link do vídeo demonstrativo |

---

## 🔐 Segurança e Credenciais

Por boas práticas de segurança, **credenciais privadas não devem ser versionadas no GitHub**.

Foram removidas informações sensíveis como:

- API Keys;
- tokens de bot;
- senhas;
- chaves privadas;
- credenciais de serviços;
- dados de autenticação.

O repositório contém apenas arquivos adequados para apresentação acadêmica e documentação pública da entrega.

Essa decisão torna o projeto mais seguro, profissional e alinhado às boas práticas de versionamento.

---

## 🚀 Como Visualizar a Entrega

Para analisar a entrega de Inteligência Artificial & Chatbot:

1. Abra o arquivo `README.md` para entender a proposta geral.
2. Consulte o JSON do Watson Assistant em `watson_assistant/`.
3. Consulte o fluxo Node-RED em `node_red/`.
4. Veja as imagens das configurações e testes nas pastas de imagens.
5. Abra o arquivo `codigo-embedder-webchat.txt` para visualizar o código de integração do WebChat.
6. Consulte o arquivo `video_demonstrativo_e_servicos-utilizados-ia-chatbot.txt` para acessar o link do vídeo demonstrativo e os serviços utilizados.

---

## 📌 O que foi Entregue

Nesta etapa de **Inteligência Artificial & Chatbot**, foram desenvolvidos e entregues:

- chatbot EcoBot SolCon no Watson Assistant;
- skill JSON exportada do Watson Assistant;
- fluxo Node-RED exportado em JSON;
- integração planejada com Telegram;
- estrutura de integração com Speech to Text;
- estrutura de integração com Text to Speech;
- código embedder do Watson Assistant WebChat;
- imagens do fluxo Node-RED;
- imagens do Watson Assistant e WebChat;
- arquivo com serviços utilizados;
- link do vídeo demonstrativo;
- documentação organizada no GitHub.

---

## 🔮 Possíveis Evoluções

A solução pode evoluir futuramente com:

- integração definitiva com o frontend do EcoScore;
- conexão com banco de dados real;
- personalização das respostas com dados do usuário;
- validação automatizada de evidências;
- uso completo de áudio com STT e TTS em produção;
- integração com ranking e pontuação reais;
- recomendações sustentáveis personalizadas;
- análise de impacto ambiental com base no histórico do usuário;
- painel administrativo para análise das interações;
- melhorias no fluxo conversacional com mais intenções e entidades.

---

## 👨‍💻 Autores e Créditos

**Turma 1TDSPH — Análise e Desenvolvimento de Sistemas · FIAP 2026**

| Integrante | RM | LinkedIn | GitHub |
|------------|----|----------|--------|
| Carlos Henrique De Melo Franco | 569868 | [carlos-franco-devs](https://linkedin.com/in/carlos-franco-devs) | [@francosdev](https://github.com/francosdev) |
| Murilo Almeida Rodrigues de Souza | 573977 | [murilo-a-souza](https://linkedin.com/in/murilo-a-souza) | [@murilo-a-souza](https://github.com/murilo-a-souza) |
| Henrique Bonachela de Carvalho Carabante | 573620 | [henrique-bonachela](https://linkedin.com/in/henrique-bonachela) | [@henriquebonachela](https://github.com/henriquebonachela) |

**Parceria acadêmica:** FIAP × SoulUp × SolCon  
**Disciplina:** Inteligência Artificial & Chatbot

---

## 🔗 Link do Repositório

> 📦 **Código-fonte público no GitHub:**  
> [**github.com/francosdev/challenge-soulup-solcon**](https://github.com/francosdev/challenge-soulup-solcon)

```bash
git clone https://github.com/francosdev/challenge-soulup-solcon.git
cd challenge-soulup-solcon/ia_chatbot
```

---

<div align="center">

**FIAP Challenge 2026** — Parceria **SoulUp** × **SolCon**

_Conectamos hoje. Construímos o futuro._ 🌱

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d4a1e,100:111610&height=100&section=footer" />

</div>
