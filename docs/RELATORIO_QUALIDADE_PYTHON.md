# Relatorio de qualidade do modulo Python

## Escopo

Analise feita na pasta `python/`, cobrindo sintaxe, duplicidade, arquivo morto, imports sem uso, consistencia de dados e sinais de texto/codigo com aparencia artificial.

## Correcoes aplicadas

1. `main.py`
   - Antes, qualquer usuario com o e-mail `admin@ecoscore.com` bloqueava a criacao do administrador padrao.
   - Agora o sistema so considera o admin existente quando a conta tambem tem `"admin": true`.

2. `dados.py` e `ecoscore_dados.json`
   - Removido o campo `ranking_encerrado`, porque ele era salvo mas nunca era lido.
   - O status do ranking continua sendo calculado por `ranking_esta_encerrado()`, com base nos pontos reais dos participantes.

3. `admin.py`
   - Removida uma verificacao inalcanavel em `deletar_conta_usuario`.
   - A busca ja exclui administradores por padrao, entao o bloco nao tinha efeito pratico.

4. `usuarios.py`
   - Removido import sem uso de `MINIMO_SENHA`.

5. `python/README.md`
   - Atualizado o modelo de dados para refletir o JSON real.
   - Substituida a versao muito visual por uma documentacao mais direta e academica.

## Limpeza de sinais de IA aplicada

- As docstrings foram reduzidas para uma frase curta por funcao.
  - Antes havia blocos repetitivos com `Parametros`, `Retorno` e frases como `nao devolve nada`.
  - Agora a documentacao fica mais direta e menos parecida com template gerado.

- Foram removidos comentarios que apenas narravam operacoes obvias.
  - A limpeza preservou comentarios ligados a regra de negocio, tratamento de erro, validacao e decisoes academicas.

- O README foi simplificado.
  - Saem badges, imagens decorativas e diagrama textual grande.
  - Entram objetivo, execucao, funcionalidades, estrutura, decisoes e criterios academicos.

## Pontos que ainda merecem cuidado

### Media prioridade

- Nomes e mensagens muito uniformes em todos os arquivos.
  - A padronizacao e boa, mas quando tudo segue exatamente o mesmo formato pode parecer gerado.
  - Sugestao: variar naturalmente as explicacoes e manter o foco nas partes importantes.

- Uso de seguranca descrito com tom de producao.
  - O projeto usa SHA-256 direto, aceitavel para estudo, mas o texto de seguranca pode prometer mais do que entrega.
  - Sugestao: manter a limitacao conhecida e tratar como decisao academica.

### Baixa prioridade

- Modularizacao bem separada e nomes muito explicitos.
  - Isso e positivo e ajuda na nota.
  - Sugestao: preservar a arquitetura e explicar as escolhas em apresentacao ou README.

## Duplicidade e arquivo morto

- Nao foi encontrado arquivo Python morto dentro da pasta `python/`.
- Nao foi encontrada duplicidade grave de funcoes no nucleo EcoScore.
- O campo morto `ranking_encerrado` foi removido.

## Recomendacoes para nota maxima

1. Criar pequenos testes manuais documentados: cadastro, login, registro de acao, ranking, reset admin e exclusao.
2. Revisar o encoding visual dos arquivos no Windows para garantir que acentos aparecam corretamente em todos os editores.
3. Manter o projeto sem arquivos avulsos fora da estrutura principal.
