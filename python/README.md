# EcoScore — Módulo Python

Sistema em terminal do **EcoScore**, projeto da equipe SolCon para o Challenge FIAP 2026 em parceria com a SoulUp.
Esta pasta é a entrega de **Computational Thinking Using Python** da Sprint 3.

O programa transforma ações sustentáveis do dia a dia em **Soul Points**. A pessoa se cadastra, registra o que fez
(plantio, reciclagem, economia de água e de energia), ganha pontos, desbloqueia conquistas e disputa um ranking mensal.
Um administrador acompanha a competição e gerencia as contas.

## Integrantes

Equipe **SolCon** · Turma **1TDSPH** · Análise e Desenvolvimento de Sistemas · FIAP 2026

| Nome | RM |
| --- | --- |
| Carlos Henrique De Melo Franco | 569868 |
| Murilo Almeida Rodrigues de Souza | 573977 |
| Henrique Bonachela de Carvalho Carabante | 573620 |

## Links

- **Vídeo de apresentação (YouTube):** COLE_AQUI_O_LINK_DO_YOUTUBE
- **Repositório:** [github.com/francosdev/challenge-soulup-solcon](https://github.com/francosdev/challenge-soulup-solcon) (código em `python/`)

## Sumário

1. [Tema e aderência ao desafio](#tema-e-aderência-ao-desafio)
2. [Como executar](#como-executar)
3. [Menus e submenus](#menus-e-submenus)
4. [CRUD](#crud)
5. [Estruturas de dados](#estruturas-de-dados)
6. [Funções](#funções)
7. [Tratamento de erros](#tratamento-de-erros)
8. [Validação de dados](#validação-de-dados)
9. [Regras de pontuação e conquistas](#regras-de-pontuação-e-conquistas)
10. [Arquivos de dados](#arquivos-de-dados)
11. [Estrutura do módulo](#estrutura-do-módulo)
12. [Uso de Inteligência Artificial](#uso-de-inteligência-artificial)
13. [Critérios da Sprint 3](#critérios-da-sprint-3)
14. [Decisões e limitações](#decisões-e-limitações)

## Tema e aderência ao desafio

O desafio da SoulUp é criar engajamento duradouro em hábitos sustentáveis. O problema que atacamos é que uma ação
sustentável quase nunca dá retorno visível, então as pessoas começam e desistem.

O módulo Python implementa a regra de negócio do EcoScore:

- cada ação registrada vira Soul Points, com uma pontuação diferente por categoria;
- a meta do mês é 100 Soul Points, e o primeiro participante a chegar nela encerra o ranking;
- conquistas marcam marcos de impacto, como reciclar 10 kg ou economizar 100 litros de água;
- o histórico vira indicadores de impacto ambiental: mudas plantadas, kg reciclados, litros economizados.

## Como executar

Requisito: **Python 3**. O módulo usa só bibliotecas padrão (`json`, `os`, `datetime`, `hashlib`, `getpass` e
`random`), então não há nada para instalar.

```bash
cd python
python main.py
```

No Windows também dá para abrir o `executar_ecoscore.bat` com dois cliques.

Testado com Python 3.14. Em versões anteriores o sistema funciona igual; a única diferença é que a senha fica
invisível enquanto é digitada, em vez de aparecer como `*`.

**Primeiro acesso.** Se não existir conta de administrador no arquivo de dados, o programa pede a senha do admin antes
de abrir o menu:

- E-mail: `admin@ecoscore.com`
- Senha: definida nesse primeiro acesso, com no mínimo 6 caracteres

## Menus e submenus

```text
Menu inicial
|-- 1. Entrar -> abre o Menu do usuário ou o Painel administrativo
|-- 2. Cadastrar conta
|   `-- Confirmar cadastro: 1 confirmar | 2 corrigir nome | 3 corrigir e-mail | 4 corrigir senha | 0 cancelar
|-- 3. Recuperar senha
`-- 0. Encerrar programa

Menu do usuário
|-- 1. Registrar ação sustentável
|   |-- 1. Plantio e Jardinagem
|   |   |-- 1 a 5. Plantar muda, horta, compostagem, jardim para polinizadores, reaproveitar resíduos
|   |   `-- 6. Cuidar de planta existente (marca várias: regar, adubar, podar)
|   |-- 2. Reciclagem de Resíduos (quantidade em kg)
|   |-- 3. Economia de Água (quantidade em litros)
|   `-- 4. Redução de Energia (marca várias ações)
|-- 2. Ver ranking
|-- 3. Consultar meu perfil
|-- 4. Visitar perfil de outro usuário
|-- 5. Ver minhas conquistas
|-- 6. Editar perfil
|   `-- 1 alterar nome | 2 alterar e-mail | 3 alterar senha | 0 voltar
|-- 7. Status da competição
|-- 8. Deletar minha conta
`-- 0. Sair da conta

Painel administrativo
|-- 1. Ver ranking
|-- 2. Status da competição
|-- 3. Listar usuários cadastrados
|-- 4. Consultar conta de usuário
|-- 5. Deletar conta de usuário
|-- 6. Reiniciar ranking mensal
`-- 0. Sair do painel
```

Cada menu roda dentro de um `while True` e só sai pela opção `0` ou quando a ação termina. Nos campos de digitação,
`0` cancela e volta para o menu anterior.

## CRUD

| Operação | Pelo menu | Função |
| --- | --- | --- |
| **Create** | Cadastrar conta | `usuarios.cadastrar_usuario` |
| **Create** | Registrar ação sustentável | `gamificacao.registrar_acao` |
| **Read** | Ver ranking, consultar perfil, visitar perfil, ver conquistas | `gamificacao.ver_ranking`, `usuarios.consultar_perfil`, `usuarios.visitar_perfil`, `gamificacao.ver_conquistas` |
| **Read** | Admin: listar e consultar contas | `admin.listar_usuarios`, `admin.consultar_conta` |
| **Update** | Editar perfil (nome, e-mail, senha) e recuperar senha | `usuarios.editar_perfil`, `usuarios.alterar_senha`, `usuarios.recuperar_senha` |
| **Update** | Admin: reiniciar ranking mensal | `admin.reiniciar_ranking` |
| **Delete** | Deletar minha conta | `usuarios.deletar_minha_conta` |
| **Delete** | Admin: deletar conta de usuário | `admin.deletar_conta_usuario` |

Toda operação que muda dados termina em `dados.salvar_dados`, que grava a lista inteira no `ecoscore_dados.json`.

## Estruturas de dados

| Estrutura | Onde | Por quê |
| --- | --- | --- |
| Lista de dicionários | `dados.usuarios`, `config.CATEGORIAS`, `config.ACOES_PLANTIO`, `config.ACOES_ENERGIA`, `config.CONQUISTAS` | Cada item tem vários campos com nome |
| Dicionário | usuário (`dados.criar_usuario`), ação do histórico (`dados.criar_acao`), totais de impacto (`impacto.calcular_impacto`) | Acessar cada informação pela chave |
| Lista | `historico` e `conquistas` de cada usuário | Crescem a cada ação registrada |
| Tupla | `config.OPCOES_MENU_INICIAL` e o retorno `(salvou, somou_pontos)` de `gamificacao.registrar_acao` | Valores fixos e dois resultados devolvidos de uma vez |
| Matriz (lista de listas) | `dados.montar_matriz_ranking`, `gamificacao.montar_matriz_conquistas`, `impacto.montar_matriz_impacto` | Dados em linhas e colunas, impressos como tabela por `interface.mostrar_matriz` |

Na matriz do ranking cada linha é `[posição, nome, e-mail, pontos]`. Os índices das colunas ficam nas constantes
`COL_POSICAO`, `COL_NOME`, `COL_EMAIL` e `COL_PONTOS`, para o código não depender de números soltos.

Exemplo de um usuário salvo no arquivo:

```json
{
    "usuarios": [
        {
            "nome": "Carlos",
            "email": "carlos@email.com",
            "senha": "hash SHA-256 da senha",
            "pontos": 6,
            "historico": [
                {
                    "categoria": "reciclagem",
                    "tipo": "",
                    "descricao": "Reciclagem de Resíduos",
                    "quantidade": 2.0,
                    "unidade": "kg",
                    "pontos": 6,
                    "data": "13/09/2026 21:40"
                }
            ],
            "conquistas": ["Primeiro Broto"],
            "admin": false
        }
    ]
}
```

## Funções

Cada função tem uma linha de documentação dizendo o que faz. As tabelas abaixo mostram as principais, com o que
recebem e o que devolvem.

**Armazenar**

| Função | Recebe | Devolve |
| --- | --- | --- |
| `dados.criar_usuario` | `nome`, `email`, `senha`, `admin` (padrão `False`) | dicionário do usuário, com a senha em hash |
| `dados.criar_acao` | `categoria`, `tipo`, `descricao`, `quantidade`, `unidade`, `pontos` | dicionário da ação, com a data atual |
| `dados.carregar_dados` | nada | nada; preenche `dados.usuarios` com o conteúdo do JSON |
| `dados.salvar_dados` | nada | `True` se gravou, `False` se deu erro |
| `dados.registrar_log` | `evento`, `detalhe` | nada; acrescenta uma linha na auditoria |

**Filtrar e buscar**

| Função | Recebe | Devolve |
| --- | --- | --- |
| `dados.buscar_por_email` | `email` | usuário encontrado ou `None` |
| `dados.buscar_por_nome` | `nome`, `incluir_admin` (padrão `False`) | lista com quem tem o texto no nome |
| `dados.email_disponivel` | `email`, `dono_atual` (padrão `None`) | `True` se nenhuma outra conta usa o e-mail |
| `dados.usuarios_comuns` | nada | lista de usuários sem os administradores |
| `gamificacao.calcular_conquistas_novas` | `usuario` | lista com as conquistas recém-atingidas |

**Organizar e calcular**

| Função | Recebe | Devolve |
| --- | --- | --- |
| `dados.ordenar_matriz_por_pontos` | `matriz` | a mesma matriz, do maior para o menor número de pontos |
| `dados.montar_matriz_ranking` | nada | matriz do ranking já numerada |
| `dados.posicao_no_ranking` | `usuario` | posição no ranking (`0` para administrador) |
| `gamificacao.calcular_pontos` | `quantidade`, `peso` | pontos inteiros entre 1 e 25 |
| `gamificacao.ler_selecao_multipla` | `entrada` (ex.: `"1 3 5"`), `lista` | posições escolhidas, ou lista vazia se algo for inválido |
| `gamificacao.registrar_acao` | `usuario`, `categoria`, `tipo`, `descricao`, `quantidade`, `unidade`, `pontos` | tupla `(salvou, somou_pontos)` |
| `impacto.calcular_impacto` | `usuario` | dicionário com os totais por categoria |
| `impacto.montar_matriz_impacto` | `usuario`, `resumido` (padrão `False`) | matriz de indicadores de impacto |

A ordenação do ranking foi feita à mão, com dois `for` que comparam cada linha com a seguinte e trocam as duas de lugar
quando estão fora de ordem.

**Entrada de dados**

| Função | Recebe | Devolve |
| --- | --- | --- |
| `usuarios.validar_email` | `email` | `True` ou `False` |
| `gamificacao.ler_quantidade` | `mensagem` | número digitado, ou `None` se a pessoa digitar 0 |
| `autenticacao.ler_senha_nova` | `mensagem` | senha válida e confirmada, ou `None` se a pessoa digitar 0 |
| `autenticacao.criptografar_senha` | `senha` | texto do hash SHA-256 |

## Tratamento de erros

As operações que mudam dados seguem o mesmo padrão. Este trecho é da alteração de nome, em `usuarios.editar_perfil`:

```python
try:
    usuario["nome"] = novo_nome
    if not dados.salvar_dados():
        raise OSError("o arquivo de dados não foi salvo")
except OSError:
    usuario["nome"] = nome_antigo
    erro("O nome não foi alterado.")
else:
    dados.registrar_log("EDICAO_NOME", "email=" + usuario["email"])
    print("  Nome atualizado com sucesso!")
finally:
    linha()
```

- `try`: faz a mudança na lista e tenta gravar. Se `salvar_dados` devolve `False`, o `raise` leva para o `except`.
- `except`: desfaz a mudança, para a lista em memória continuar igual ao arquivo.
- `else`: só roda quando deu certo; grava a auditoria e mostra a mensagem de sucesso.
- `finally`: roda sempre; fecha a tela com uma linha ou uma pausa.

| Operação | Função | O que acontece no erro |
| --- | --- | --- |
| Inserir conta | `usuarios.cadastrar_usuario` | tira da lista o usuário que acabou de entrar |
| Inserir ação | `gamificacao.registrar_acao` | remove a ação do histórico e devolve pontos e conquistas ao que eram |
| Criar administrador | `main.criar_admin_padrao` | mantém o admin na lista e avisa que ele será gravado na próxima vez |
| Alterar nome e e-mail | `usuarios.editar_perfil` | volta o valor antigo |
| Alterar senha | `usuarios.alterar_senha`, `usuarios.recuperar_senha` | volta o hash antigo |
| Reiniciar ranking | `admin.reiniciar_ranking` | restaura pontos, histórico e conquistas de uma cópia guardada em matriz |
| Excluir conta | `usuarios.deletar_minha_conta`, `admin.deletar_conta_usuario` | `dados.remover_usuario` recoloca o usuário na mesma posição da lista |
| Ler o arquivo | `dados.carregar_dados` | JSON quebrado: avisa, começa vazio e guarda o arquivo em `ecoscore_dados_corrompido.json`; o `finally` fecha o arquivo |
| Gravar o arquivo | `dados.salvar_dados` | devolve `False`; o `finally` fecha o arquivo |
| Ler número | `gamificacao.ler_quantidade` | `ValueError` na conversão pede o número de novo |

Se a auditoria não puder ser gravada, `dados.registrar_log` ignora o erro e o sistema continua funcionando.

## Validação de dados

| Dado | Regra | Função |
| --- | --- | --- |
| Opção de menu | só aceita as opções listadas; nas listas numeradas confere se é número e se está na faixa | `main.menu_inicial`, `gamificacao.registrar_acao_sustentavel` |
| Nome | não pode ficar vazio | `usuarios.ler_nome` |
| E-mail | um `@`, sem espaços, domínio com ponto que não começa nem termina com ponto | `usuarios.validar_email` |
| E-mail repetido | não aceita e-mail já usado por outra conta, sem diferenciar maiúsculas | `dados.email_disponivel` |
| Senha | mínimo de 6 caracteres e confirmação igual | `autenticacao.ler_senha_nova` |
| Quantidade | só algarismos (aceita vírgula), maior que 0 e até 1000 | `gamificacao.ler_quantidade` |
| Várias opções | só números da lista, sem repetição | `gamificacao.ler_selecao_multipla` |
| Pontos | cada registro vale de 1 a 25; o total do usuário para em 100 | `gamificacao.calcular_pontos`, `gamificacao.somar_pontos` |
| Administrador | não registra ação nem entra no ranking | `gamificacao.registrar_acao_sustentavel`, `dados.usuarios_comuns` |
| Login | mesma mensagem para e-mail inexistente e senha errada | `main.fazer_login` |
| Recuperar senha | código de 6 dígitos com 3 tentativas; a senha do admin não é recuperada por aqui | `usuarios.recuperar_senha` |
| Excluir conta | opção 1, palavra `DELETAR` e senha | `usuarios.deletar_minha_conta`, `admin.deletar_conta_usuario` |
| Arquivo editado à mão | campo que falta ou com tipo errado volta ao valor padrão | `dados.arrumar_usuario` |

## Regras de pontuação e conquistas

| Categoria | Como os pontos são calculados |
| --- | --- |
| Plantio e Jardinagem | quantidade × pontos da ação: muda ou árvore 5, horta 4, compostagem 3, jardim para polinizadores 6, reaproveitar resíduos orgânicos 2 |
| Cuidar de planta existente | 2 pontos por cuidado marcado (regar, adubar, podar) |
| Reciclagem de Resíduos | kg × 3 |
| Economia de Água | litros × 0,1 |
| Redução de Energia | 2 pontos por ação marcada |

- Os pontos são arredondados para baixo: 2,5 kg reciclados dão 7 pontos.
- A meta do mês é **100 Soul Points**. Quando alguém chega nela, o ranking fecha: as ações continuam indo para o
  histórico, mas não somam mais pontos.
- O administrador começa um novo ciclo pelo painel, em "Reiniciar ranking mensal".

| Conquista | Como desbloquear |
| --- | --- |
| Primeiro Broto | Registrar a primeira ação sustentável |
| Reciclador Ativo | Reciclar 10 kg de material |
| Água Consciente | Economizar 100 litros de água |
| Energia Inteligente | Registrar 5 ações de energia |
| Mão Verde | Registrar 5 ações de plantio |
| Campeão EcoScore | Atingir 100 Soul Points |

## Arquivos de dados

| Arquivo | O que guarda |
| --- | --- |
| `ecoscore_dados.json` | lista de usuários, com histórico e conquistas |
| `ecoscore_auditoria.txt` | uma linha por evento, com data, evento e detalhe (fica fora do Git) |
| `ecoscore_dados_corrompido.json` | criado só se o JSON principal estiver quebrado |

Eventos gravados na auditoria: `ADMIN_CRIADO`, `LOGIN`, `LOGIN_FALHO`, `CADASTRO`, `ACAO_REGISTRADA`,
`EDICAO_NOME`, `EDICAO_EMAIL`, `TROCA_SENHA`, `RECUPERACAO_SENHA`, `RECUPERACAO_FALHA`, `EXCLUSAO_CONTA`,
`EXCLUSAO_ADMIN` e `RESET_RANKING`.

## Estrutura do módulo

| Arquivo | Responsabilidade |
| --- | --- |
| `main.py` | Entrada do programa, criação do admin, login e menu inicial |
| `config.py` | Constantes, categorias, ações e conquistas |
| `dados.py` | Lista de usuários, leitura e gravação do JSON, auditoria e matriz do ranking |
| `autenticacao.py` | Hash e leitura de senha |
| `usuarios.py` | Cadastro, recuperação de senha, perfis, edição e exclusão da própria conta |
| `gamificacao.py` | Registro de ações, pontos, conquistas, ranking e status da competição |
| `impacto.py` | Cálculo e exibição do impacto ambiental e do histórico |
| `admin.py` | Painel e funções exclusivas do administrador |
| `interface.py` | Menus, cabeçalhos, barra de progresso e impressão de matrizes |
| `ecoscore_dados.json` | Banco local em JSON |
| `executar_ecoscore.bat` | Atalho para rodar no Windows |
| `fluxograma-ecoscore.drawio` | Fluxograma do sistema |

## Uso de Inteligência Artificial

**Ferramenta:** Claude Code (Anthropic), usado como extensão do VS Code.

Usamos IA em quatro frentes do módulo Python. A regra do grupo foi a mesma em todas: **só fica no código o que a gente
consegue explicar**. Por isso, quando o assunto era novo, como hash de senha, a IA ajudou a escrever as funções e também
a entender o conceito por trás delas.

| Frente | Por que usamos IA | Resultado no projeto |
| --- | --- | --- |
| 1. Segurança das senhas | Hash nunca foi visto em aula, e guardar senha como texto seria uma falha grave | `autenticacao.py`: senha salva como hash SHA-256, digitação escondida e confirmação da senha nova |
| 2. Documentação | Explicar o sistema no formato dos critérios da Sprint 3 | Este README, com menus, CRUD, funções com entrada e saída, tratamento de erros e validações |
| 3. Revisão de qualidade | Encontrar bug, código morto e import sem uso | 4 correções, registradas em [`docs/RELATORIO_QUALIDADE_PYTHON.md`](../docs/RELATORIO_QUALIDADE_PYTHON.md) |
| 4. Adequação ao conteúdo da aula | Manter o código dentro do que a disciplina ensinou | `match/case` virou `if/elif/else`, `msvcrt` virou `getpass`, e ranking, conquistas e impacto viraram matrizes |

### 1. Segurança das senhas com hash

**O problema.** Se o `ecoscore_dados.json` guardasse a senha como texto, qualquer pessoa que abrisse o arquivo veria a
senha de todos os usuários. A gente precisava proteger isso, mas hash não fazia parte do conteúdo da disciplina.

**O que é hash, do jeito que entendemos:**

- **É um caminho só de ida.** A função transforma a senha num código de 64 caracteres, e não existe uma função que faça o
  caminho de volta.
- **A mesma senha gera sempre o mesmo hash.** É isso que faz o login funcionar: o sistema calcula o hash do que a pessoa
  digitou e compara com o hash salvo, sem nunca precisar da senha original.
- **Um caractere a mais muda o hash inteiro.** Não dá para descobrir a senha olhando para hashes parecidos.

| Senha digitada | O que fica salvo no arquivo |
| --- | --- |
| `123456` | `8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92` |
| `1234567` | `8bb0cf6eb9b17d0f7d22b456f121257dc1254e1f01665370476383ea776df414` |

**No código**, as duas funções centrais são curtas:

```python
def criptografar_senha(senha):
    """Transforma a senha em hash SHA-256, para ela nunca ficar salva como texto."""
    return hashlib.sha256(senha.encode("utf-8")).hexdigest()


def senha_confere(usuario, senha_digitada):
    """Confere se a senha digitada é a senha do usuário."""
    if senha_digitada == "":
        return False
    return criptografar_senha(senha_digitada) == usuario["senha"]
```

- `senha.encode("utf-8")` transforma o texto em bytes, que é o formato que o `sha256` recebe.
- `hexdigest()` devolve o resultado como texto de 64 caracteres, que dá para salvar no JSON.
- `senha_confere` não "descriptografa" nada: ela gera o hash de novo e compara dois textos.

| Função | O que faz |
| --- | --- |
| `autenticacao.criptografar_senha` | Gera o hash SHA-256 da senha |
| `autenticacao.senha_confere` | Compara o hash da senha digitada com o hash salvo |
| `autenticacao.ler_senha` | Lê a senha com `getpass`, sem mostrar o que foi digitado (no Python 3.14 aparece `*`) |
| `autenticacao.senha_valida` | Exige no mínimo 6 caracteres |
| `autenticacao.ler_senha_nova` | Pede a senha duas vezes e só aceita se as duas forem iguais e válidas |

Essas funções protegem o cadastro, o login, a troca e a recuperação de senha, e as confirmações antes de excluir uma
conta ou reiniciar o ranking. Nenhum dos usuários do `ecoscore_dados.json` tem senha legível: todos os campos `senha`
são hashes.

**O limite que conhecemos.** SHA-256 puro não usa *salt*, então duas pessoas com a mesma senha ficam com o mesmo hash, e
o hash de senhas muito comuns, como `123456`, já é conhecido. Um sistema de verdade usaria `bcrypt` ou `argon2`, que
misturam um valor aleatório em cada senha e são lentos de propósito para dificultar tentativas em massa. Ficamos com
SHA-256 porque o `hashlib` já vem com o Python e o objetivo do projeto é nunca guardar senha como texto.

**Ligação com a aula.** O conceito é novo, mas as funções usam o que vimos em sala: função com parâmetro e retorno, `if`
para validar, `while` para repetir a pergunta até a senha ser válida e comparação de strings.

### 2. Documentação

A IA ajudou a transformar o código em um README que desse para corrigir sem abrir arquivo por arquivo:

- cada critério da Sprint 3 aponta para a seção que o atende, em [Critérios da Sprint 3](#critérios-da-sprint-3);
- as funções principais aparecem com o que recebem e o que devolvem, completando as docstrings de uma frase do código;
- os menus viraram uma árvore, e as regras de pontuação e as validações viraram tabelas.

Cada função citada foi conferida no código antes de entrar aqui. Nessa conferência apareceu um erro da versão anterior do
README, que dizia que plantio tinha "peso 5": na verdade cada ação de plantio tem seus próprios pontos, e isso foi
corrigido.

### 3. Revisão de qualidade

- Qualquer conta com o e-mail `admin@ecoscore.com` impedia criar o administrador de verdade. Agora
  `main.criar_admin_padrao` também confere se a conta tem `"admin": true`.
- O campo `ranking_encerrado` era salvo no JSON e nunca lido. Ele saiu, e o status passou a ser calculado por
  `dados.ranking_esta_encerrado` a partir dos pontos.
- `admin.deletar_conta_usuario` tinha uma verificação que nunca executava, porque a busca já deixa os administradores de fora.
- `usuarios.py` importava `MINIMO_SENHA` sem usar.

### 4. Adequação ao conteúdo da aula

- Definimos o limite do que podia entrar no código: o conteúdo das aulas. A exceção foi `hashlib` e `getpass`, porque
  deixar senha em texto puro não era aceitável.
- `match/case` virou `if/elif/else`.
- `msvcrt`, que só existe no Windows, virou `getpass`, e o sistema passou a rodar também em Linux e macOS.
- Ranking, conquistas e impacto ambiental passaram a ser montados como matrizes.
- Saiu o que tinha formato de template, como docstrings com blocos de "Parâmetros" e "Retorno" e comentários que só
  descreviam o óbvio. O relatório de qualidade chama essa etapa de "limpeza de sinais de IA". As entradas e saídas
  continuam documentadas na seção [Funções](#funções).

### Principais prompts (resumidos)

1. > Nunca vimos hash em aula. Me ajuda a criar as funções de senha do EcoScore com hash, usando só biblioteca padrão do Python, e explica como funciona.
2. > Como o login confere a senha se o arquivo só guarda o hash?
3. > Monta o README do módulo Python seguindo os critérios da Sprint 3: menus, CRUD, funções com entrada e saída, tratamento de erros e validação.
4. > Revise a pasta `python/` procurando bug, código morto e import sem uso. Explique cada problema antes de corrigir.
5. > Reescreva usando só o que vimos em aula: funções, listas, tuplas, matrizes, dicionários e CRUD. Tire `match/case` e o que só roda no Windows.

### Discussão do resultado

- **Segurança:** o maior ganho foi num assunto que a disciplina ainda não tinha coberto. Sem apoio, a saída mais
  provável seria guardar a senha como texto no JSON.
- **Qualidade:** a revisão achou problemas reais. O mais grave era o do administrador, que travava o primeiro acesso
  quando uma conta comum usava aquele e-mail.
- **Nível do código:** parte do código usava construções acima do conteúdo da disciplina. Funcionava, mas a gente não
  conseguiria explicar cada linha, então foi refeito com `if/elif/else`, listas, dicionários e matrizes.
- **Limite da ferramenta:** a IA aponta problemas lendo o código, mas o comportamento só se confirma rodando o programa.
  Os casos de cadastro, login, registro de ação, edição e exclusão aparecem executados no vídeo.

## Critérios da Sprint 3

| Critério do enunciado | Pontos | Onde está |
| --- | --- | --- |
| Menu com submenus para uso do sistema e acesso ao CRUD | 10 | [Menus e submenus](#menus-e-submenus) e [CRUD](#crud) |
| Funções para organizar, filtrar e armazenar os dados em sequências | 30 | [Estruturas de dados](#estruturas-de-dados) e [Funções](#funções) |
| Tratamento de erros na inserção, alteração e exclusão (`try`, `except`, `else`, `finally`) | 20 | [Tratamento de erros](#tratamento-de-erros) |
| Validação de dados na entrada e no processamento | 10 | [Validação de dados](#validação-de-dados) |
| Vídeo explicativo de até 5 minutos | 30 | [Links](#links) |
| Explicação do uso de IA em documento e vídeo | penalidade se faltar | [Uso de Inteligência Artificial](#uso-de-inteligência-artificial) |

| Conteúdo da aula | Onde aparece no código |
| --- | --- |
| Funções com parâmetro e retorno | `gamificacao.calcular_pontos`, `dados.buscar_por_email` e os demais módulos |
| `if`, `elif`, `else` | Todos os menus e validações |
| `while` | Menus e leituras que repetem até a entrada ser válida |
| `for` | Buscas, ordenação do ranking, conquistas e impressão de tabelas |
| Listas e dicionários | `dados.usuarios` e o histórico de cada usuário |
| Tuplas | `config.OPCOES_MENU_INICIAL` e o retorno de `gamificacao.registrar_acao` |
| Matrizes | Ranking, conquistas e impacto ambiental |
| CRUD em lista | `append`, busca, alteração de campo e `pop` em `dados.usuarios` |
| Arquivos | `json.load` e `json.dump` no JSON, escrita da auditoria em `.txt` |
| Tratamento de erros | `try`, `except`, `else` e `finally` na inserção, alteração e exclusão |
| Modularização | Um arquivo por responsabilidade |
| Além da aula, com apoio de IA | `hashlib` (hash SHA-256) e `getpass` em `autenticacao.py`, explicados em [Segurança das senhas com hash](#1-segurança-das-senhas-com-hash) |

## Decisões e limitações

- O JSON foi usado porque é simples de ler e suficiente para um sistema em terminal. A integração com banco de dados
  fica para a Sprint 4, como pede o enunciado.
- A lista de usuários fica só em `dados.py`, para o estado do sistema não se espalhar pelos arquivos. `carregar_dados`
  esvazia a lista com `clear()` em vez de criar outra, por isso não precisa de `global`.
- O ranking é montado como matriz e ordenado à mão, para mostrar a lógica do algoritmo.
- A senha é salva como hash SHA-256 para nunca ficar em texto puro. Um sistema real usaria `bcrypt` ou `argon2`.
- A recuperação de senha é uma simulação: o código aparece no próprio terminal, porque o projeto não envia e-mail.
