# EcoScore - Modulo Python

Este modulo implementa o backend em terminal do EcoScore, projeto academico do Challenge FIAP 2026 em parceria com SoulUp e SolCon.

O sistema permite cadastrar usuarios, registrar acoes sustentaveis, somar Soul Points, consultar ranking, acompanhar conquistas e acessar um painel administrativo.

## Como executar

Entre na pasta `python/` e rode:

```bash
python main.py
```

No Windows tambem e possivel usar o arquivo:

```bash
executar_ecoscore.bat
```

O projeto usa apenas bibliotecas padrao do Python: `json`, `os`, `datetime`, `hashlib`, `getpass` e `random`.

## Primeiro acesso

Ao iniciar o sistema pela primeira vez, o programa verifica se ja existe uma conta administradora.

Se nao existir, ele pede a criacao da senha do administrador padrao:

- E-mail: `admin@ecoscore.com`
- Senha: definida no primeiro uso

## Funcionalidades

- Cadastro de usuarios comuns.
- Login com e-mail e senha.
- Recuperacao de senha simulada por codigo no terminal.
- Registro de acoes sustentaveis.
- Calculo de Soul Points por categoria.
- Ranking mensal de participantes.
- Conquistas desbloqueadas por impacto.
- Consulta de perfil proprio e perfil publico de outros usuarios.
- Edicao de nome, e-mail e senha.
- Exclusao de conta com confirmacao.
- Painel administrativo para listar usuarios, consultar contas, deletar participantes e reiniciar ranking.
- Log de auditoria para eventos importantes.

## Estrutura dos arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `main.py` | Entrada do programa, login e menu inicial. |
| `config.py` | Constantes, categorias, acoes e conquistas. |
| `dados.py` | Lista de usuarios, JSON, log e ranking. |
| `autenticacao.py` | Hash de senha e leitura segura no terminal. |
| `usuarios.py` | Cadastro, recuperacao, perfil e exclusao da propria conta. |
| `gamificacao.py` | Pontos, registro de acoes, conquistas e status da competicao. |
| `impacto.py` | Calculo e exibicao do impacto ambiental. |
| `admin.py` | Funcoes exclusivas do administrador. |
| `interface.py` | Menus, cabecalhos, tabelas e mensagens no terminal. |
| `ecoscore_dados.json` | Banco local em JSON. |
| `fluxograma-ecoscore.drawio` | Fluxograma do sistema. |

## Modelo de dados

Os dados ficam em `ecoscore_dados.json`.

Exemplo simplificado:

```json
{
  "usuarios": [
    {
      "nome": "Franco",
      "email": "franco@email.com",
      "senha": "hash_sha256",
      "pontos": 0,
      "historico": [],
      "conquistas": [],
      "admin": false
    }
  ]
}
```

Cada acao registrada no historico guarda categoria, tipo, descricao, quantidade, unidade, pontos e data.

## Regras de pontuacao

A meta mensal e de `100 Soul Points`.

Cada categoria possui um peso:

| Categoria | Peso |
| --- | --- |
| Plantio e Jardinagem | `5.0` |
| Reciclagem de Residuos | `3.0` |
| Economia de Agua | `0.1` |
| Reducao de Energia | `2.0` |

O calculo respeita duas regras de equilibrio:

- cada registro vale pelo menos 1 ponto;
- cada registro vale no maximo 25 pontos.

Quando algum participante chega a 100 pontos, o ranking e considerado encerrado. O administrador pode reiniciar o ciclo mensal pelo painel.

## Conquistas

O sistema possui conquistas para incentivar diferentes tipos de acao:

- Primeiro Broto: registrar a primeira acao.
- Reciclador Ativo: reciclar 10 kg.
- Agua Consciente: economizar 100 litros.
- Energia Inteligente: registrar 5 acoes de energia.
- Mao Verde: registrar 5 acoes de plantio.
- Campeao EcoScore: atingir 100 Soul Points.

## Criterios academicos atendidos

| Criterio | Onde aparece |
| --- | --- |
| Variaveis e tipos | Todos os modulos. |
| `if`, `elif`, `else` | Menus, login, cadastro e validacoes. |
| `while` | Menus e leituras ate entrada valida. |
| `for` | Buscas, ranking, conquistas e tabelas. |
| Funcoes com parametros e retorno | Todos os modulos principais. |
| Listas | `dados.usuarios`, historico e conquistas. |
| Dicionarios | Usuarios, acoes, categorias e conquistas. |
| Tuplas | `OPCOES_MENU_INICIAL`. |
| Matrizes | Ranking, tabela de impacto e tabela de conquistas. |
| CRUD em lista | Cadastro, busca, edicao e exclusao de usuarios. |
| Arquivos | Leitura e escrita de JSON e log. |
| Tratamento de erro | JSON corrompido, falha ao salvar e entradas invalidas. |
| Modularizacao | Separacao por responsabilidade em varios arquivos. |

## Decisoes do projeto

- O JSON foi usado porque e simples de ler e suficiente para um projeto academico em terminal.
- A lista global de usuarios fica em `dados.py`, para evitar espalhar o estado do sistema por varios arquivos.
- O ranking e montado como matriz para atender ao criterio academico e facilitar a impressao em tabela.
- A ordenacao do ranking foi feita manualmente para demonstrar logica de algoritmo.
- A senha e salva com SHA-256 para nao ficar em texto puro. Para um sistema real, o ideal seria usar `bcrypt` ou `argon2`.

## Observacoes

- A recuperacao de senha e uma simulacao: o codigo aparece no proprio terminal.
- O projeto nao depende de banco de dados externo.
- Os arquivos `ecoscore_dados.json` e `ecoscore_auditoria.txt` podem mudar durante o uso do sistema.
