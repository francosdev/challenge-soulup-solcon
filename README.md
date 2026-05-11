# EcoScore - Gamificação Sustentável SoulUp

> Challenge FIAP 2026 em parceria com a SoulUp by Prospera
> Turma: 1TDSPH | SolCon

## Descrição

O **EcoScore** é um MVP funcional de gamificação sustentável criado para estimular hábitos ambientais positivos por meio de EcoPoints, conquistas, ranking mensal e perfis públicos. O sistema foi desenvolvido como uma camada complementar à proposta da SoulUp, transformando ações sustentáveis em progresso, reconhecimento e competição saudável.

Este projeto representa um MVP funcional da lógica de gamificação sustentável da SoulUp. A versão atual roda em terminal Python, persiste dados em JSON e simula os principais fluxos de produto antes de uma futura integração web/mobile.

## Objetivo

Criar uma experiência simples, segura e demonstrável para:

- cadastrar usuários;
- registrar ações sustentáveis;
- calcular EcoPoints;
- acompanhar impacto ambiental;
- exibir ranking mensal;
- desbloquear conquistas;
- permitir gestão administrativa;
- sustentar uma lógica escalável para evolução futura da SoulUp.

## Funcionalidades

- Cadastro e login com senha protegida por hash SHA-256.
- Leitura de senha oculta com `getpass`, compatível com Windows, Mac e Linux.
- Sessão de usuário logado.
- Painel administrativo separado.
- Persistência local em `ecoscore_dados.json`.
- Migração automática de dados antigos em listas para dicionários.
- Registro de ações sustentáveis nas categorias:
  - Plantio e Jardinagem;
  - Reciclagem de Resíduos;
  - Economia de Água;
  - Redução de Energia.
- Ranking mensal com encerramento automático ao atingir 100 EcoPoints.
- Ações continuam sendo salvas após o encerramento, mas não somam pontos.
- Sistema de conquistas com progresso.
- Perfil privado com histórico e impacto ambiental.
- Perfil público para visita social.
- Exclusão de conta com senha e confirmação textual.
- Auditoria simples em arquivo texto para ações críticas.

## Tecnologias Utilizadas

- Python 3.10+
- JSON para persistência local
- `hashlib` para hash de senha
- `getpass` para entrada segura de senha
- HTML5, CSS3 e JavaScript vanilla na interface web complementar do repositório

## Estrutura de Pastas

```text
challenge-soulup-solcon/
├── README.md
├── index.html
├── sobre.html
├── integrantes.html
├── faq.html
├── contato.html
├── ecoscore.html
├── como-funciona.html
├── assets/
├── css/
├── js/
├── java/
└── python/
    ├── main.py
    ├── config.py
    ├── dados.py
    ├── autenticacao.py
    ├── usuarios.py
    ├── gamificacao.py
    ├── impacto.py
    ├── admin.py
    ├── interface.py
    └── ecoscore_dados.json
```

## Responsabilidade dos Módulos Python

| Arquivo | Responsabilidade |
|--------|-------------------|
| `main.py` | Ponto de entrada e menu inicial |
| `config.py` | Constantes, categorias, conquistas e caminhos |
| `dados.py` | Persistência, migração, usuários globais e ranking |
| `autenticacao.py` | Hash de senha, login e leitura segura |
| `usuarios.py` | Cadastro, perfil, edição, exclusão e perfil público |
| `gamificacao.py` | Registro de ações, EcoPoints, conquistas e ranking |
| `impacto.py` | Cálculo e exibição do impacto ambiental |
| `admin.py` | Painel administrativo e gestão de usuários |
| `interface.py` | Cabeçalhos, menus e feedback visual |

## Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/francosdev/challenge-soulup-solcon.git
```

2. Acesse a pasta Python:

```bash
cd challenge-soulup-solcon/python
```

3. Execute o sistema:

```bash
python main.py
```

## Regras da Gamificação

| Categoria | Regra | Pontuação |
|----------|-------|-----------|
| Plantar muda ou árvore | quantidade de mudas | 5 pts por unidade |
| Cultivar horta doméstica | vasos/canteiros | 4 pts por unidade |
| Compostagem orgânica | kg compostados | 3 pts por kg |
| Cuidar de planta existente | ações selecionadas | 2 pts por ação |
| Jardim para polinizadores | flores/plantas | 6 pts por unidade |
| Reaproveitar resíduos orgânicos | kg reaproveitados | 2 pts por kg |
| Reciclagem de resíduos | kg reciclados | 3 pts por kg |
| Economia de água | litros economizados | 0,1 pt por litro |
| Redução de energia | ações selecionadas | 2 pts por ação |

O ciclo mensal encerra quando um usuário comum atinge 100 EcoPoints.

## Conquistas

- 🌱 Primeiro Broto: registrar a primeira ação sustentável.
- ♻️ Reciclador Ativo: reciclar 10kg de material.
- 💧 Água Consciente: economizar 100 litros de água.
- ⚡ Energia Inteligente: registrar 5 ações de energia.
- 🌿 Mão Verde: registrar 5 ações de plantio.
- 🏆 Campeão EcoScore: atingir 100 EcoPoints.

## Segurança e Validações

- Senhas são salvas apenas como hash SHA-256.
- O administrador não participa do ranking.
- O administrador possui painel separado.
- Exclusões exigem senha e confirmação digitando `DELETAR`.
- Entradas numéricas, e-mail, nome e senha são validados.
- Dados antigos são migrados automaticamente para o formato atual.

## Auditoria

O sistema registra eventos críticos em `python/ecoscore_auditoria.txt` quando eles acontecem:

- login bem-sucedido;
- tentativa de login inválida;
- ação sustentável registrada;
- exclusão de conta;
- exclusão feita pelo administrador;
- reset do ranking mensal.

A proposta é manter uma auditoria simples e acadêmica, suficiente para demonstrar rastreabilidade sem adicionar banco de dados externo.

## Diferenciais do Sistema

- Arquitetura modular, com responsabilidades separadas.
- Persistência local sem dependências externas.
- Compatibilidade com dados antigos.
- Gamificação com feedback visual e barra de progresso.
- Perfil público para experiência social.
- Painel administrativo para gestão real do MVP.
- Impacto ambiental calculado automaticamente pelo histórico.

## Compatibilidade com o Challenge

O EcoScore demonstra escalabilidade, organização, validação, segurança e gamificação sustentável em um MVP funcional. A estrutura atual permite evoluir para uma integração maior com a SoulUp, preservando regras de negócio claras e uma separação técnica adequada entre autenticação, dados, gamificação, impacto e administração.

## Futuras Melhorias

- Validação por vídeo, foto ou bot para confirmar ações sustentáveis.
- Integração com React/Web como próxima etapa de produto.
- API para conectar o motor de gamificação à plataforma SoulUp.
- Banco de dados relacional ou NoSQL para ambiente real.
- Recuperação de senha e autenticação multifator.
- Dashboard administrativo com métricas agregadas.
- Moderação social e feed de ações sustentáveis.

## Integrantes

| Nome | RM | GitHub |
|------|----|--------|
| Carlos Henrique De Melo Franco | 569868 | [francosdev](https://github.com/francosdev) |
| Murilo de Souza | 573977 | [murilo-a-souza](https://github.com/murilo-a-souza) |
| Henrique Bonachela de Carvalho Carabante | 573620 | [henriquebonachela](https://github.com/henriquebonachela) |

## GitHub

Repositório: <https://github.com/francosdev/challenge-soulup-solcon>

---

Challenge FIAP 2026 | SoulUp by Prospera | SolCon
