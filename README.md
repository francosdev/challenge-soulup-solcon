# EcoScore - Gamificação Sustentável SoulUp

> Challenge FIAP 2026 em parceria com a SoulUp by Prospera
> Turma: 1TDSPH | SolCon

## Descrição

O **EcoScore** é um MVP funcional de gamificação sustentável criado para estimular hábitos ambientais positivos por meio de Soul Points, conquistas, ranking mensal e perfis públicos. O sistema foi desenvolvido como uma camada complementar à proposta da SoulUp, transformando ações sustentáveis em progresso, reconhecimento e competição saudável.

A versão atual roda em terminal Python, persiste dados em JSON e simula os principais fluxos de produto antes de uma futura integração web/mobile. O repositório também inclui uma interface web complementar com sete páginas HTML e uma animação generativa de micélio em canvas.

## Objetivo

Criar uma experiência simples, segura e demonstrável para:

- cadastrar e autenticar usuários com segurança;
- registrar ações sustentáveis em múltiplas categorias;
- calcular Soul Points e exibir progresso visual;
- acompanhar impacto ambiental detalhado;
- exibir ranking mensal competitivo;
- desbloquear conquistas com barra de progresso;
- visitar e comparar perfis sociais;
- permitir gestão administrativa completa;
- sustentar uma lógica escalável para evolução futura da SoulUp.

## Funcionalidades

### Autenticação

- Cadastro com revisão dos dados antes de confirmar (nome, e-mail e senha editáveis na tela de confirmação).
- Login com senha protegida por hash SHA-256.
- Leitura de senha oculta com eco em asteriscos (`*`) via `msvcrt` no Windows, com fallback para `getpass`.
- Sessão de usuário logado com menu personalizado exibindo nome, pontos e barra de progresso.
- Troca obrigatória de senha administrativa quando hash legado fraco é detectado no arquivo.
- Senhas nunca armazenadas em texto plano; apenas o hash SHA-256 é salvo.

### Registro de Ações Sustentáveis

- **Plantio e Jardinagem** com submenu de seis ações:
  - Plantar muda ou árvore (por unidade)
  - Cultivar horta doméstica (por vaso/canteiro)
  - Compostagem orgânica (por kg)
  - Cuidar de planta existente (múltiplas ações simultâneas: regar, adubar, podar)
  - Criar jardim para polinizadores (por flor/planta)
  - Reaproveitar resíduos orgânicos (por kg)
- **Reciclagem de Resíduos** (por kg reciclado)
- **Economia de Água** (por litro economizado)
- **Redução de Energia** com seleção múltipla simultânea de até cinco ações de economia
- Feedback imediato após cada registro: Soul Points somados, total atual e barra de progresso `[████░░░░░░]`
- Ações continuam sendo salvas após o encerramento do ranking, mas não somam Soul Points

### Perfil e Conta

- Perfil privado com nome, e-mail, Soul Points, posição no ranking, impacto ambiental completo e histórico recente
- Opção de expandir para ver o histórico completo dentro do perfil
- Edição de perfil: nome, e-mail e senha (troca de senha exige confirmação da senha atual)
- Exclusão de conta com senha e confirmação textual digitando `DELETAR`

### Perfil Público e Funcionalidades Sociais

- Busca de usuários por nome com desambiguação automática quando múltiplos resultados são encontrados
- Perfil público sem exposição de e-mail ou senha
- Comparação social em tempo real: "Você está X Soul Points à frente de Y" / "Y está X Soul Points à sua frente"
- Exibição de conquistas desbloqueadas do usuário visitado
- Impacto ambiental resumido visível no perfil público
- Últimas 3 ações sustentáveis exibidas no perfil público

### Gamificação e Ranking

- Barra de progresso textual exibida no cabeçalho do menu e após cada ação: `[████░░░░░░] 40/100`
- Ranking mensal ordenado por Soul Points com destaque para o líder
- Encerramento automático do ranking quando qualquer usuário atinge 100 Soul Points
- Recalculação automática do estado do ranking ao excluir usuários
- Status da competição: líder atual, pontos restantes para encerramento e total de participantes
- Conquistas com barra de progresso e status: BLOQUEADA, EM PROGRESSO ou DESBLOQUEADA

### Painel Administrativo

- Painel separado para o administrador, sem participação no ranking
- Ver ranking e status da competição
- Reiniciar ciclo mensal (zera pontos, histórico e conquistas de todos os usuários), protegido por senha
- Listar todos os usuários cadastrados com e-mail, pontos e posição
- Consultar conta completa de qualquer usuário (conquistas, histórico, impacto)
- Excluir conta de usuário com confirmação textual e senha administrativa

### Persistência e Migração

- Persistência local em `ecoscore_dados.json`
- Migração automática de dados antigos: usuários em listas para dicionários, ações em listas para dicionários, nomes de conquistas normalizados
- Suporte a arquivo legado na raiz do projeto e ao caminho atual em `python/`

### Auditoria

- Log de eventos críticos em `ecoscore_auditoria.txt`:
  - login bem-sucedido
  - tentativa de login inválida
  - ação sustentável registrada
  - exclusão de conta pelo próprio usuário
  - exclusão feita pelo administrador
  - reset do ranking mensal

## Tecnologias Utilizadas

- Python 3.10+
- JSON para persistência local
- `hashlib` para hash SHA-256 de senhas
- `msvcrt` para leitura de senha sem eco (Windows), com fallback `getpass`
- HTML5, CSS3 e JavaScript vanilla na interface web complementar
- Canvas API para animações generativas (micélio, partículas, esporos)

## Estrutura de Pastas

```text
challenge-soulup-solcon/
├── README.md
├── executar_ecoscore.bat       ← atalho para Windows
├── index.html
├── sobre.html
├── integrantes.html
├── faq.html
├── contato.html
├── ecoscore.html
├── como-funciona.html
├── assets/
│   └── imagens/
├── css/
│   ├── style.css
│   ├── componentes.css
│   └── responsivo.css
├── js/
│   ├── main.js
│   ├── menu.js
│   ├── micelio.js              ← animação generativa de micélio
│   ├── micelio-divider.js
│   ├── particulas.js
│   ├── spores.js
│   └── contato.js
├── java/
│   └── diagrama-classes_incompleto.drawio
├── .vscode/
│   └── launch.json             ← configuração de debug no VS Code
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
    ├── ecoscore_dados.json
    └── ecoscore_auditoria.txt
```

## Responsabilidade dos Módulos Python

| Arquivo | Responsabilidade |
|--------|-------------------|
| `main.py` | Ponto de entrada e menu inicial |
| `config.py` | Constantes, categorias, conquistas e caminhos de arquivo |
| `dados.py` | Persistência, migração automática, estado global e ranking |
| `autenticacao.py` | Hash de senha, leitura oculta, login e migração de hash legado |
| `usuarios.py` | Cadastro, perfil privado/público, edição, exclusão e comparação social |
| `gamificacao.py` | Registro de ações, Soul Points, conquistas, ranking e status da competição |
| `impacto.py` | Cálculo e exibição do impacto ambiental completo e resumido |
| `admin.py` | Painel administrativo e gestão de usuários |
| `interface.py` | Cabeçalhos, menus, barra de progresso e feedback visual |

## Como Executar

### Opção 1 — Atalho Windows

Clique duas vezes em `executar_ecoscore.bat`. O script detecta automaticamente `py` ou `python` no PATH.

### Opção 2 — Terminal

```bash
git clone https://github.com/francosdev/challenge-soulup-solcon.git
cd challenge-soulup-solcon/python
python main.py
```

### Opção 3 — VS Code

Abra o repositório no VS Code e pressione `F5`. Selecione a configuração **EcoScore - terminal externo** definida em `.vscode/launch.json`.

## Persistência JSON

O sistema utiliza `python/ecoscore_dados.json` como armazenamento local. O arquivo guarda usuários, histórico, conquistas, pontuação e estado do ranking mensal.

O JSON de entrega fica limpo por padrão:

```json
{
  "ranking_encerrado": false,
  "usuarios": []
}
```

No primeiro uso, o sistema solicita a criação segura da senha do administrador padrão. Na próxima inicialização, se o sistema detectar o hash administrativo legado fraco salvo em versões antigas, força a troca imediata da senha antes de liberar o painel.

## Regras da Gamificação

| Categoria | Ação | Pontuação |
|----------|------|-----------|
| Plantio e Jardinagem | Plantar muda ou árvore | 5 pts por muda |
| Plantio e Jardinagem | Cultivar horta doméstica | 4 pts por vaso/canteiro |
| Plantio e Jardinagem | Compostagem orgânica | 3 pts por kg |
| Plantio e Jardinagem | Cuidar de planta existente | 2 pts por ação selecionada |
| Plantio e Jardinagem | Jardim para polinizadores | 6 pts por flor/planta |
| Plantio e Jardinagem | Reaproveitar resíduos orgânicos | 2 pts por kg |
| Reciclagem de Resíduos | Reciclagem | 3 pts por kg |
| Economia de Água | Economia de água | 0,1 pt por litro |
| Redução de Energia | Ações de economia | 2 pts por ação selecionada |

O ciclo mensal encerra quando qualquer usuário comum atinge 100 Soul Points. O vencedor recebe subsídio na conta de energia do mês pela SoulUp.

## Conquistas

| Ícone | Nome | Objetivo |
|-------|------|----------|
| 🌱 | Primeiro Broto | Registrar a primeira ação sustentável |
| ♻️ | Reciclador Ativo | Reciclar 10 kg de material |
| 💧 | Água Consciente | Economizar 100 litros de água |
| ⚡ | Energia Inteligente | Registrar 5 ações de economia de energia |
| 🌿 | Mão Verde | Registrar 5 ações de plantio e jardinagem |
| 🏆 | Campeão EcoScore | Atingir 100 Soul Points |

Cada conquista exibe status (BLOQUEADA, EM PROGRESSO ou DESBLOQUEADA) e progresso numérico atual em relação à meta.

## Segurança e Validações

- Senhas salvas apenas como hash SHA-256; nunca em texto plano.
- Hash administrativo legado fraco é detectado e forçado a troca na próxima entrada.
- O administrador não participa do ranking e não pode ser excluído pelo painel normal.
- Exclusões exigem senha e confirmação digitando `DELETAR`.
- Troca de senha exige validação da senha atual.
- Entradas numéricas, e-mail, nome e senha são validados antes de aceitar.
- E-mail é tratado sem diferenciação de maiúsculas e minúsculas.
- Dados antigos são migrados automaticamente para o formato atual sem perda de informação.

## Interface Web Complementar

O repositório inclui sete páginas HTML que compõem a landing page do EcoScore:

| Página | Conteúdo |
|--------|----------|
| `index.html` | Hero, proposta de valor e chamada para ação |
| `sobre.html` | Contexto do challenge e parceria com a SoulUp |
| `ecoscore.html` | Apresentação do motor de gamificação |
| `como-funciona.html` | Fluxo passo a passo para o usuário |
| `faq.html` | Perguntas frequentes |
| `integrantes.html` | Equipe do projeto |
| `contato.html` | Formulário de contato |

A interface utiliza animações generativas em canvas (micélio, partículas e esporos), paleta visual em tons de musgo e pedra, menu hamburguer responsivo e divisores animados entre seções.

## Material de Demo

### Roteiro curto de apresentação

1. Apresentar o problema: transformar ações sustentáveis em hábito, progresso e reconhecimento.
2. Explicar que o EcoScore é o motor de gamificação sustentável da SoulUp em formato MVP.
3. Mostrar a tela inicial com login e cadastro.
4. Criar uma conta de usuário e demonstrar o fluxo de revisão antes de confirmar.
5. Registrar uma ação sustentável e destacar Soul Points, barra de progresso e histórico.
6. Abrir a tela de conquistas e mostrar o progresso gamificado.
7. Visitar o perfil de outro usuário e exibir a comparação social.
8. Consultar o perfil privado para exibir impacto ambiental acumulado e posição no ranking.
9. Entrar no painel admin para mostrar separação entre usuário comum e gestão.
10. Encerrar explicando evolução futura: React, API, validação por vídeo/foto, IA e banco de dados.

### Sequência ideal de demonstração

1. `python main.py` (ou clique em `executar_ecoscore.bat`)
2. Configurar a senha do administrador se o JSON estiver limpo.
3. Cadastrar um usuário comum e passar pela tela de revisão de dados.
4. Registrar "Plantio e Jardinagem" ou "Reciclagem de Resíduos".
5. Mostrar o feedback com Soul Points e barra `[████░░░░░░]`.
6. Consultar o perfil para exibir histórico, posição e impacto ambiental.
7. Ver conquistas para explicar objetivos e progresso.
8. Visitar o perfil de outro usuário e mostrar a comparação de Soul Points.
9. Sair e entrar como admin.
10. Mostrar ranking, status da competição e listagem de usuários.

### Como explicar o diferencial

O diferencial do EcoScore é transformar sustentabilidade em experiência recorrente: o usuário vê progresso, desbloqueia conquistas, compara evolução social e acompanha impacto ambiental realista. A gamificação não é decorativa; ela organiza comportamento, incentivo e mensuração.

### Como defender as escolhas técnicas

- **Python terminal:** permite validar a regra de negócio sem depender da interface final.
- **JSON:** suficiente para MVP acadêmico, simples de auditar e fácil de migrar.
- **Módulos separados:** tornam o projeto mais claro para manutenção e apresentação.
- **Hash de senha + detecção de hash legado:** demonstra preocupação com segurança mesmo em ambiente acadêmico.
- **Painel admin:** separa operação da competição e aproxima o MVP de um produto real.
- **Migração automática:** garante compatibilidade com versões anteriores sem quebrar a demo.

## Futuras Melhorias

- Validação por vídeo, foto ou bot para confirmar ações sustentáveis.
- Integração com React/Web como próxima etapa de produto.
- API para conectar o motor de gamificação à plataforma SoulUp.
- Banco de dados relacional ou NoSQL para ambiente real.
- Recuperação de senha e autenticação multifator.
- Dashboard administrativo com métricas agregadas.
- Moderação social e feed de ações sustentáveis.
- Notificações de conquistas e lembretes de ciclo mensal.

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
