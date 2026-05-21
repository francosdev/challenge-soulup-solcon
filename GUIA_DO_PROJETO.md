# Guia do Projeto EcoScore

Este documento explica o que voce precisa saber sobre as partes de Python e HTML/CSS/JavaScript do projeto `challenge-soulup-solcon`.

O EcoScore e um MVP de gamificacao sustentavel para o Challenge FIAP 2026. A ideia central e transformar acoes ecologicas do dia a dia em pontos, conquistas, ranking e impacto ambiental mensuravel.

## Visao Geral

O projeto tem duas frentes principais:

1. **Sistema Python via terminal**
   - Fica na pasta `python/`.
   - E o sistema funcional: cadastro, login, registro de acoes, pontos, conquistas, ranking, perfis e painel admin.
   - Guarda os dados em `python/ecoscore_dados.json`.

2. **Site HTML/CSS/JS**
   - Fica na pasta `frontend/`, junto com `frontend/css/`, `frontend/js/` e `frontend/assets/`.
   - E a apresentacao visual do EcoScore: explica o problema, a solucao, o funcionamento, a equipe, FAQ, dashboard demonstrativo e contato.
   - Nao depende do Python para abrir; basta abrir os arquivos HTML da pasta `frontend/` no navegador.

Essas duas frentes sao independentes. O Python nao serve as paginas HTML em um servidor, e o HTML nao chama diretamente o sistema Python.

## Estrutura Importante

```text
challenge-soulup-solcon/
|-- frontend/
|   |-- index.html                  # Pagina inicial do site
|   |-- sobre.html                  # Explica o problema e a proposta
|   |-- ecoscore.html               # Explica o sistema EcoScore em detalhes
|   |-- como-funciona.html          # Mostra o fluxo de uso
|   |-- dashboard.html              # Demonstra visualmente o dashboard de impacto
|   |-- faq.html                    # Perguntas frequentes
|   |-- integrantes.html            # Equipe do projeto
|   |-- contato.html                # Formulario de contato
|   |-- petplanet-standalone.html   # Prototipo interativo independente
|   |-- ecoscore-card-snippet.html  # Trecho reutilizavel de card/dashboard
|   |-- css/
|   |   |-- style.css               # Tema global, header, footer, hero e tokens visuais
|   |   |-- componentes.css         # Cards, botoes, FAQ, ranking, forms e componentes
|   |   `-- responsivo.css          # Ajustes para telas menores
|   |-- js/
|   |   |-- menu.js                 # Menu mobile e link ativo
|   |   |-- main.js                 # FAQ, animacoes, icones e inicializacao geral
|   |   |-- contato.js              # Validacao do formulario de contato
|   |   |-- micelio.js              # Animacao canvas de esporos/micelio
|   |   |-- micelio-divider.js      # Divisores animados de micelio
|   |   |-- spores.js               # Campo de particulas/esporos
|   |   `-- particulas.js           # Particulas do hero
|   `-- assets/imagens/             # Fotos da equipe e logo
`-- python/
    |-- main.py                 # Entrada do sistema Python
    |-- config.py               # Constantes, categorias, acoes e conquistas
    |-- dados.py                # Persistencia JSON, ranking e migracao de dados
    |-- autenticacao.py         # Login, senha, hash e recuperacao
    |-- usuarios.py             # Cadastro, perfil, edicao e fluxo social
    |-- gamificacao.py          # Pontos, acoes, conquistas e ranking
    |-- impacto.py              # Calculo e exibicao de impacto ambiental
    |-- admin.py                # Painel administrativo
    |-- interface.py            # Menus e elementos visuais no terminal
    |-- ecoscore_dados.json     # Dados persistidos
    `-- executar_ecoscore.bat   # Atalho para rodar no Windows
```

## Parte Python

### Como Executar

Pelo terminal, na raiz do projeto:

```bash
python python/main.py
```

No Windows tambem existe o arquivo:

```bash
python/executar_ecoscore.bat
```

Ao iniciar, o programa carrega os dados salvos, garante que existe uma conta administradora e mostra o menu inicial.

### Fluxo Principal

O ponto de entrada e `python/main.py`.

Fluxo simplificado:

```text
main.py
|-- carregar_dados()
`-- menu_inicial()
    |-- Entrar
    |   `-- login()
    |       |-- menu_usuario_logado()
    |       `-- menu_admin()
    |-- Cadastrar conta
    |   `-- cadastrar_usuario()
    |-- Recuperar senha
    |   `-- recuperar_senha()
    `-- Encerrar programa
```

### Arquivos Python e Responsabilidades

#### `main.py`

E o arquivo inicial.

Responsabilidades:

- Configura a saida do terminal como UTF-8.
- Chama `carregar_dados()`.
- Exibe o menu inicial.
- Direciona para login, cadastro, recuperacao de senha ou saida.

#### `config.py`

Guarda constantes e regras fixas do sistema.

Principais itens:

- `ARQUIVO_DADOS`: caminho de `python/ecoscore_dados.json`.
- `ARQUIVO_LOG`: caminho de `python/ecoscore_auditoria.txt`.
- `ADMIN_EMAIL`: e-mail padrao do administrador.
- `META_PONTOS`: meta mensal de 100 pontos.
- `CATEGORIAS`: categorias principais e pesos.
- `ACOES_PLANTIO`, `ACOES_CUIDADO`, `ACOES_ENERGIA`: acoes disponiveis.
- `CONQUISTAS`: badges desbloqueaveis.

Categorias principais:

| Opcao | Categoria | Peso |
|---|---|---:|
| 1 | Plantio e Jardinagem | 5.0 |
| 2 | Reciclagem de Residuos | 3.0 |
| 3 | Economia de Agua | 0.1 |
| 4 | Reducao de Energia | 2.0 |

#### `dados.py`

E uma das partes mais importantes. Controla os dados globais e a persistencia.

Responsabilidades:

- Manter a lista global `usuarios`.
- Manter o estado `ranking_encerrado`.
- Carregar dados do JSON.
- Salvar dados no JSON.
- Criar usuario e acao no formato correto.
- Normalizar/migrar dados antigos.
- Buscar usuarios por e-mail ou nome.
- Calcular ranking.
- Registrar logs de auditoria.
- Garantir a existencia do admin padrao.

Modelo de usuario:

```json
{
  "nome": "Nome",
  "email": "email@exemplo.com",
  "senha": "hash_sha256",
  "pontos": 0,
  "historico": [],
  "conquistas": [],
  "admin": false
}
```

Modelo de acao no historico:

```json
{
  "categoria": "Plantio",
  "descricao": "Plantar muda ou arvore",
  "quantidade": 1,
  "pontos": 5,
  "data": "21/05/2026 10:30"
}
```

Ponto importante: o arquivo `ecoscore_dados.json` contem dados reais do sistema. Evite expor e-mails e hashes de senha em apresentacoes publicas.

#### `autenticacao.py`

Cuida de login, senha e recuperacao.

Responsabilidades:

- Gerar hash SHA-256 com `criptografar_senha()`.
- Verificar se uma senha ja esta criptografada.
- Normalizar senhas antigas.
- Ler senha escondida no terminal.
- Validar senha minima de 6 caracteres.
- Fazer login.
- Recuperar senha com codigo de 6 digitos simulado no terminal.
- Forcar troca de senha do admin se detectar credencial legada.

Importante: o sistema nao salva senha em texto puro. Ele salva hash SHA-256.

#### `usuarios.py`

Controla as funcionalidades de usuarios comuns.

Responsabilidades:

- Validar e-mail.
- Cadastrar usuario.
- Consultar o proprio perfil.
- Editar nome, e-mail e senha.
- Excluir a propria conta com confirmacao.
- Visitar perfil publico de outro usuario.
- Mostrar menu do usuario logado.

Menu do usuario:

```text
1. Registrar acao sustentavel
2. Ver ranking
3. Consultar perfil
4. Visitar perfil de outro usuario
5. Editar perfil
6. Deletar minha conta
7. Ver conquistas
8. Status da competicao
0. Sair
```

#### `gamificacao.py`

Contem a regra de pontuacao, conquistas e ranking.

Responsabilidades:

- Ler quantidades informadas pelo usuario.
- Calcular pontos por categoria.
- Registrar acoes sustentaveis.
- Somar pontos do usuario.
- Encerrar o ranking quando alguem chega a 100 Soul Points.
- Verificar e desbloquear conquistas.
- Exibir ranking.
- Exibir status da competicao.

Regra geral de pontuacao:

```text
pontos = quantidade * peso_da_categoria
```

Com limite maximo de 100 pontos.

Exemplo:

- 2 kg reciclados
- Peso de reciclagem: 3.0
- Resultado: 6 Soul Points

Conquistas:

| Conquista | Criterio |
|---|---|
| Primeiro Broto | Registrar a primeira acao |
| Reciclador Ativo | Reciclar 10 kg |
| Agua Consciente | Economizar 100 litros de agua |
| Energia Inteligente | Registrar 5 acoes de energia |
| Mao Verde | Registrar 5 acoes de plantio |
| Campeao EcoScore | Chegar a 100 Soul Points |

#### `impacto.py`

Transforma o historico de acoes em metricas ambientais.

Responsabilidades:

- Calcular impacto acumulado.
- Exibir historico.
- Exibir impacto completo.
- Exibir impacto resumido para perfil publico.
- Gerar resumo de acoes publicas.

Metricas calculadas:

- Mudas/arvores plantadas.
- Hortas cultivadas.
- Acoes de plantio/jardinagem.
- Residuos organicos compostados.
- Plantas para polinizadores.
- Residuos reaproveitados.
- Material reciclado.
- Agua economizada.
- Acoes de energia.

#### `admin.py`

Controla o painel administrativo.

Responsabilidades:

- Ver ranking.
- Ver status da competicao.
- Reiniciar ranking mensal.
- Listar usuarios cadastrados.
- Consultar conta de usuario.
- Deletar conta de usuario.

Menu admin:

```text
1. Ver ranking
2. Status da competicao
3. Reiniciar ranking mensal
4. Listar usuarios cadastrados
5. Consultar conta de usuario
6. Deletar conta de usuario
0. Sair
```

O admin nao participa da competicao e nao deve pontuar.

#### `interface.py`

Centraliza elementos visuais do terminal.

Responsabilidades:

- Criar cabecalhos.
- Criar linhas divisorias.
- Pausar a tela.
- Mostrar barra de progresso.
- Exibir menus.
- Mostrar feedback depois de registrar uma acao.

### Persistencia de Dados

O projeto usa JSON como banco local:

```text
python/ecoscore_dados.json
```

Quando o programa roda:

1. `carregar_dados()` le o JSON.
2. Os dados sao normalizados.
3. O admin padrao e garantido.
4. O estado do ranking e recalculado.
5. O arquivo e salvo novamente.

Quando alguma mudanca acontece, como cadastro, acao registrada, edicao de perfil ou reset de ranking, o sistema chama `salvar_dados()`.

### Auditoria

O sistema registra eventos importantes em:

```text
python/ecoscore_auditoria.txt
```

Exemplos de eventos:

- Login.
- Login falho.
- Acao registrada.
- Recuperacao de senha.
- Exclusao de conta.
- Reset do ranking.

Esse arquivo esta no `.gitignore`, entao nao deve ir para o Git.

### Pontos de Atencao no Python

- O projeto usa `match/case`, entao precisa de Python 3.10 ou superior.
- `autenticacao.py` importa `msvcrt`, que e especifico do Windows, mas existe fallback com `getpass`.
- O sistema usa variaveis globais em `dados.py`, principalmente `usuarios` e `ranking_encerrado`.
- O JSON atual contem dados de usuarios. Cuidado ao compartilhar.
- O arquivo `ListaRankingDeJogos.py` parece ser um exercicio separado de lista/ranking de jogos. Ele nao faz parte do fluxo principal do EcoScore.

## Parte HTML/CSS/JavaScript

### Como Abrir

Voce pode abrir diretamente qualquer arquivo HTML no navegador, por exemplo:

```text
frontend/index.html
```

Nao ha build, servidor local obrigatorio ou framework principal para o site institucional.

### Paginas HTML

Todas as paginas desta secao ficam dentro de `frontend/`. Os caminhos de CSS, JS e imagens citados abaixo sao relativos a essa pasta.

#### `index.html`

Pagina inicial.

Mostra:

- Hero principal do EcoScore.
- Proposta geral.
- Quatro dimensoes da plataforma.
- Diferenciais.
- Chamada para conhecer o projeto.

Scripts usados:

- `js/menu.js`
- `js/main.js`
- `js/micelio.js`
- Lucide via CDN

#### `sobre.html`

Explica o contexto do projeto.

Mostra:

- Problema que o EcoScore resolve.
- Aprendizados de conversas reais.
- Ideia de gamificacao com proposito.
- Quem e a SoulUp.
- Chamada para entender o funcionamento.

#### `ecoscore.html`

E a pagina mais detalhada sobre o sistema.

Mostra:

- Arvore de habilidades sustentaveis.
- Trilhas/classes.
- Card para testar o dashboard.
- Ranking de Soul Points.
- Avatar e trajetoria.
- Reputacao social.
- Caminho para a pagina de funcionamento.

#### `como-funciona.html`

Explica o passo a passo de uso.

Mostra:

- Fluxo em 5 etapas.
- Como a evidencia e validada.
- O que conta como evidencia.
- Chamada para dashboard.

#### `dashboard.html`

Demonstra a ideia de dashboard de impacto.

Mostra:

- Visualizacao de impacto real.
- Componentes de dashboard.
- Detalhes pensados para o usuario.
- Script inline para alguma interacao especifica da propria pagina.

#### `faq.html`

Pagina de perguntas frequentes.

Categorias:

- Geral.
- Soul Points.
- Validacao por IA.
- Ranking e recompensas.
- Tecnico.

O abre/fecha das perguntas e controlado por `js/main.js`.

#### `integrantes.html`

Apresenta a equipe.

Usa imagens de:

```text
assets/imagens/
```

Tem fallback no JavaScript: se a foto nao carregar, `main.js` mostra as iniciais do integrante.

#### `contato.html`

Pagina com formulario de contato.

Usa `js/contato.js` para validar:

- Nome.
- E-mail.
- Assunto.
- Mensagem.

Se tudo estiver valido, o formulario e escondido e uma mensagem de sucesso aparece. Nao ha envio real para backend.

#### `petplanet-standalone.html`

Arquivo grande e independente. Parece um prototipo interativo empacotado em um unico HTML, com React/Babel e recursos embutidos. Ele nao segue a mesma estrutura simples das outras paginas.

Use como demonstracao/prototipo separado, nao como base principal do site.

### CSS

#### `css/style.css`

Define o tema global.

Responsabilidades:

- Variaveis de cor.
- Fontes.
- Reset/base.
- Header e navegacao.
- Hero principal.
- Secoes.
- Footer.
- Classes auxiliares como `texto-gradiente` e `texto-destaque`.

Principais tokens visuais:

```css
--cor-fundo: #111610;
--cor-fundo-card: #0D1209;
--cor-primaria: #8BAF6E;
--cor-terciaria: #B8D49A;
--cor-destaque: #C8A84B;
--cor-roxo: #9B7FE8;
--cor-texto: #9BA88E;
--cor-texto-claro: #E8EDE0;
```

#### `css/componentes.css`

Define os componentes reutilizaveis.

Inclui:

- Cards.
- Botoes.
- Pilares.
- Skill tree.
- Ranking.
- Steps.
- FAQ acordeon.
- Formularios.
- Cards de integrantes.
- Badges.
- Hero interno.
- Barras de progresso.
- Blocos de destaque.

#### `css/responsivo.css`

Contem ajustes para telas menores.

Responsabilidades:

- Adaptar grids.
- Ajustar menus.
- Melhorar leitura em celular.
- Reorganizar secoes em telas pequenas.

### JavaScript

#### `js/menu.js`

Responsavel pelo menu de navegacao.

Faz:

- Abre e fecha menu mobile.
- Bloqueia scroll quando o menu esta aberto.
- Fecha menu ao clicar em um link.
- Marca o link da pagina atual com a classe `ativo`.

#### `js/main.js`

Script geral do site.

Faz:

- Fallback de foto dos integrantes.
- FAQ acordeon.
- Animacao de entrada com `IntersectionObserver`.
- Inicializacao de icones Lucide.
- Animacao de barras de progresso.
- Inicializacao de `SporeField`.
- Inicializacao de `MyceliumDivider`.

#### `js/contato.js`

Valida o formulario de contato.

Regras:

- Nome obrigatorio com minimo de 3 caracteres.
- E-mail obrigatorio e com formato valido.
- Assunto obrigatorio.
- Mensagem obrigatoria com minimo de 20 caracteres.

Nao envia os dados para servidor. Apenas valida e mostra sucesso na tela.

#### `js/micelio.js`, `js/micelio-divider.js`, `js/spores.js`, `js/particulas.js`

Scripts visuais com Canvas.

Eles criam:

- Particulas.
- Esporos.
- Redes de micelio.
- Divisores animados.
- Efeitos organicos no fundo e entre secoes.

Esses scripts tornam o site mais vivo visualmente, mas nao sao regra de negocio.

### Dependencias Externas no Frontend

As paginas usam Lucide Icons via CDN:

```html
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
```

Ou seja, os icones dependem da internet para carregar quando a pagina e aberta.

## Relacao entre Python e HTML

Atualmente, Python e HTML nao estao integrados.

O que isso significa:

- O Python tem o sistema funcional de dados e regras.
- O HTML tem a apresentacao visual e institucional.
- O site nao le `ecoscore_dados.json`.
- O formulario de contato nao salva dados no Python.
- O dashboard do HTML e demonstrativo, nao conectado ao backend Python.

Se no futuro quiser integrar, seria necessario criar uma API ou servidor web em Python, por exemplo com Flask ou FastAPI.

## O Que Falar em uma Apresentacao

Resumo de negocio:

- O EcoScore combate o baixo engajamento em habitos sustentaveis.
- Ele transforma acoes ambientais em progresso visivel.
- Usa pontos, conquistas, ranking e impacto ambiental para manter motivacao.

Resumo tecnico:

- Backend em Python via terminal.
- Persistencia local em JSON.
- Autenticacao com hash SHA-256.
- Ranking mensal com meta de 100 Soul Points.
- Painel admin com auditoria.
- Frontend em HTML, CSS e JavaScript puro.
- Animacoes com Canvas e IntersectionObserver.

Resumo do fluxo do usuario:

1. Usuario cria conta.
2. Faz login.
3. Registra uma acao sustentavel.
4. Recebe Soul Points.
5. Desbloqueia conquistas.
6. Acompanha ranking e impacto.
7. Pode visitar perfis publicos de outros usuarios.

Resumo do admin:

1. Admin faz login.
2. Consulta ranking e status.
3. Lista usuarios.
4. Consulta ou deleta contas.
5. Reinicia o ciclo mensal.

## Melhorias Futuras Possiveis

- Integrar HTML com Python por API.
- Trocar JSON por banco de dados real.
- Implementar envio real do formulario de contato.
- Criar tela web de login/cadastro.
- Criar dashboard conectado aos dados reais.
- Melhorar seguranca de senhas com salt e algoritmo como bcrypt.
- Adicionar testes automatizados.
- Separar dados sensiveis de dados de exemplo.
- Corrigir possiveis textos com problema de acentuacao causados por encoding.

## Arquivos Mais Importantes para Estudar Primeiro

Para entender o Python:

1. `python/main.py`
2. `python/dados.py`
3. `python/gamificacao.py`
4. `python/usuarios.py`
5. `python/autenticacao.py`
6. `python/admin.py`
7. `python/impacto.py`

Para entender o site:

1. `frontend/index.html`
2. `frontend/ecoscore.html`
3. `frontend/como-funciona.html`
4. `frontend/css/style.css`
5. `frontend/css/componentes.css`
6. `frontend/js/main.js`
7. `frontend/js/menu.js`
8. `frontend/js/contato.js`

## Glossario Rapido

- **Soul Points**: pontos ganhos por acoes sustentaveis.
- **Ranking mensal**: competicao entre usuarios comuns.
- **Meta mensal**: 100 pontos.
- **Conquistas**: badges desbloqueaveis por marcos.
- **Historico**: lista de acoes sustentaveis registradas.
- **Impacto ambiental**: metricas calculadas com base no historico.
- **Admin**: usuario especial que gerencia contas e ranking.
- **JSON**: arquivo usado como banco de dados local.
- **Canvas**: recurso do HTML usado para animacoes visuais.
- **IntersectionObserver**: API do JavaScript usada para animar elementos quando aparecem na tela.
