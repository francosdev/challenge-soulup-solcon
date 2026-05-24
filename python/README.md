<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111610,100:2d4a1e&height=180&section=header&text=EcoScore&fontSize=60&fontColor=8BAF6E&fontAlignY=38&desc=Backend%20CLI%20em%20Python&descSize=16&descAlignY=58&descColor=B8D49A" />

**FIAP Challenge 2026 · SoulUp × SolCon**

[![Python](https://img.shields.io/badge/Python-3.x-111111?style=for-the-badge&logo=python&logoColor=8BAF6E)](https://python.org)
[![JSON](https://img.shields.io/badge/JSON-Persistência-111111?style=for-the-badge&logo=json&logoColor=8BAF6E)](https://www.json.org)
[![SHA--256](https://img.shields.io/badge/SHA--256-Autenticação-111111?style=for-the-badge&logo=letsencrypt&logoColor=8BAF6E)](https://docs.python.org/3/library/hashlib.html)
[![CLI](https://img.shields.io/badge/CLI-Terminal-111111?style=for-the-badge&logo=windowsterminal&logoColor=8BAF6E)](#como-executar)

</div>

---

## Índice
[![Front-end](https://img.shields.io/badge/Front--end-007ACC?style=for-the-badge&logo=html5&logoColor=white)](../)[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](../python/)[![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)](../java/)[![IA & Chatbot](https://img.shields.io/badge/IA_%26_Chatbot-8E44AD?style=for-the-badge&logo=probot&logoColor=white)](../ia_chatbot/)[![Banco de Dados](https://img.shields.io/badge/Banco_de_Dados-336791?style=for-the-badge&logo=postgresql&logoColor=white)](../banco_de_dados/)[![Software Engineering & Business Model](https://img.shields.io/badge/Software_Engineering_%26_Business_Model-2C3E50?style=for-the-badge&logo=diagrams.net&logoColor=white)](../sebm/)

---

## Visão Geral

Backend CLI do **EcoScore**: um sistema de gamificação sustentável, totalmente em terminal, escrito em **Python 3** com persistência em arquivo JSON. Os usuários registram ações ecológicas, ganham **Soul Points**, desbloqueiam conquistas e competem em um ranking mensal — tudo isso sem dependências externas além da biblioteca padrão.

O código foi modularizado por responsabilidade para facilitar manutenção, testes manuais e leitura por outros integrantes do time.

---

## Estrutura do Módulo

```
python/
├── main.py                   # Ponto de entrada / menu inicial
├── autenticacao.py           # Login, hash SHA-256, recuperação de senha
├── usuarios.py               # Cadastro, edição e perfis públicos
├── gamificacao.py            # Pontos, conquistas, ranking
├── impacto.py                # Cálculo de impacto ambiental
├── admin.py                  # Painel administrativo
├── dados.py                  # Persistência JSON + migração automática
├── interface.py              # Componentes de UI (cabeçalhos, menus, barras)
├── config.py                 # Constantes, categorias, ações e conquistas
│
├── ecoscore_dados.json       # Banco de dados local (gerado em runtime)
├── ecoscore_auditoria.txt    # Log de auditoria (gerado em runtime)
├── fluxograma-ecoscore.drawio # Fluxograma do sistema
└── executar_ecoscore.bat     # Atalho de execução no Windows
```

---

## Responsabilidades de Cada Módulo

| Módulo | Função principal |
|--------|------------------|
| [`main.py`](main.py) | Ponto de entrada — carrega dados e exibe o menu inicial (entrar / cadastrar / recuperar senha). |
| [`config.py`](config.py) | Centraliza constantes: caminhos de arquivo, meta de pontos, categorias, ações e conquistas. |
| [`dados.py`](dados.py) | Estado global, leitura/escrita do JSON, migração de formatos legados, log de auditoria e ranking. |
| [`autenticacao.py`](autenticacao.py) | Hash SHA-256, leitura de senha oculta (`msvcrt`/`getpass`), login e recuperação por código de 6 dígitos. |
| [`usuarios.py`](usuarios.py) | Cadastro, edição de perfil, exclusão de conta e perfis públicos de outros participantes. |
| [`gamificacao.py`](gamificacao.py) | Registro de ações, cálculo de pontuação por peso, desbloqueio de conquistas e ranking. |
| [`impacto.py`](impacto.py) | Agrega o histórico para calcular impacto real (kg reciclados, litros economizados etc.). |
| [`admin.py`](admin.py) | Painel exclusivo do administrador — listar/consultar/deletar contas e reiniciar o ciclo. |
| [`interface.py`](interface.py) | Cabeçalhos, menus, divisores, barra de progresso e feedback visual no terminal. |

---

## Fluxo do Sistema

```
                    ┌──────────────────────┐
                    │    main.menu_inicial │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
           Cadastro          Login          Recuperação
              │                │                │
              └────────┬───────┴────────┬───────┘
                       │                │
              ┌────────▼──────┐   ┌─────▼──────┐
              │ menu_usuario  │   │ menu_admin │
              └────────┬──────┘   └─────┬──────┘
                       │                │
        ┌──────────────┼──────────┐     │
        │              │          │     │
    Registrar       Ranking    Perfil  Painel
     ação              │       público admin
        │              │          │     │
        ▼              ▼          ▼     ▼
     pontos +     posição +   conquistas+ações
     conquistas   barra de    e histórico   sobre
                  progresso                 contas
```

Veja o diagrama completo em [`fluxograma-ecoscore.drawio`](fluxograma-ecoscore.drawio).

---

## Modelo de Dados

A persistência é feita em [`ecoscore_dados.json`](ecoscore_dados.json), gerado automaticamente no primeiro uso:

```json
{
  "ranking_encerrado": false,
  "usuarios": [
    {
      "nome": "string",
      "email": "string",
      "senha": "string (SHA-256 hash)",
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

O módulo `dados.py` aplica **migração automática** ao carregar o arquivo — registros antigos em formato de lista ou tupla são convertidos para o dicionário atual sem precisar de intervenção manual.

---

## Regras de Pontuação

Cada ação é pontuada pelo peso da categoria, com teto de **100 pontos por registro** (`config.py` + `gamificacao.calcular_pontuacao`):

| Categoria | Peso | Exemplo |
|-----------|------|---------|
| 🌱 Plantio e Jardinagem | `5.0` | Plantar muda → 5 pts/unidade |
| ♻️ Reciclagem de Resíduos | `3.0` | Reciclar 1 kg → 3 pts |
| ⚡ Redução de Energia | `2.0` | Desligar aparelhos em standby → 2 pts |
| 💧 Economia de Água | `0.1` | Economizar 10 L → 1 pt |

A **meta mensal** é de `100 Soul Points`. Quando qualquer usuário comum atinge a meta, o ranking é marcado como encerrado e o admin pode reiniciar o ciclo.

---

## Conquistas

| Badge | Critério |
|-------|----------|
| 🌱 Primeiro Broto | Registrar a primeira ação |
| ♻️ Reciclador Ativo | Reciclar 10 kg de materiais |
| 💧 Água Consciente | Economizar 100 L de água |
| ⚡ Energia Inteligente | 5 ações de redução de energia |
| 🌿 Mão Verde | 5 ações de plantio |
| 🏆 Campeão EcoScore | Atingir 100 Soul Points |

---

## Como Executar

**Pré-requisito:** Python 3.x no PATH. Nenhuma biblioteca externa é necessária — o projeto usa apenas `json`, `hashlib`, `os`, `datetime`, `math`, `random`, `getpass` e `msvcrt`.

```bash
# A partir da raiz do projeto
python python/main.py

# Ou, no Windows, com atalho
python\executar_ecoscore.bat
```

No primeiro acesso, o sistema pede a criação da senha do administrador padrão:

- **E-mail admin:** `admin@ecoscore.com`
- **Senha:** definida no primeiro boot (mínimo 6 caracteres)

---

## Segurança

- Senhas nunca são salvas em texto plano — apenas como **hash SHA-256** (`autenticacao.criptografar_senha`).
- Leitura de senha no terminal sem eco usando `msvcrt` (Windows) com fallback para `getpass`.
- Recuperação de senha por **código de 6 dígitos** simulado no terminal, com limite de 3 tentativas.
- **Log de auditoria** em [`ecoscore_auditoria.txt`](ecoscore_auditoria.txt) para eventos críticos: login, falhas de login, recuperação de senha, criação e exclusão de contas, reinício de ranking.
- Mensagens de recuperação **não revelam** se o e-mail está cadastrado (proteção contra enumeração).
- Migração automática de credenciais administrativas legadas no boot, forçando a troca por uma senha forte.

---

## Critérios Acadêmicos Atendidos

| Critério FIAP | Onde aparece |
|---------------|--------------|
| Variáveis e tipos | Todos os módulos |
| Estruturas de decisão (`if`, `match`) | `main.menu_inicial`, `gamificacao.registrar_acao` |
| Laços (`while`, `for`) | `dados.normalizar_usuarios`, `autenticacao.recuperar_senha` |
| Funções com parâmetros e retorno | Todos os módulos |
| Listas e dicionários | `dados.usuarios`, `config.CATEGORIAS`, `config.CONQUISTAS` |
| Tuplas | `config.OPCOES_MENU_INICIAL`, `config.SLUGS_CATEGORIAS` |
| Manipulação de arquivos | `dados.carregar_dados`, `salvar_dados`, `registrar_log` |
| Manipulação de JSON | `dados.carregar_dados` / `salvar_dados` |
| Datas | `dados.data_atual` (via `datetime`) |
| Validação de entrada | `dados.eh_numero_positivo`, `autenticacao.senha_valida` |
| Modularização em arquivos | 9 módulos com responsabilidades isoladas |
| Tratamento de erros | `autenticacao.ler_senha_oculta`, `dados.normalizar_*` |

---

## Equipe

- Carlos Henrique De Melo Franco — RM 569868
- Murilo Almeida Rodrigues de Souza — RM 573977
- Henrique Bonachela de Carvalho Carabante — RM 573620

---

<div align="center">

**FIAP Challenge 2026** — Parceria **SoulUp** × **SolCon**

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d4a1e,100:111610&height=100&section=footer" />

</div>
