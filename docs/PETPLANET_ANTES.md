# PetPlanet (página Dashboard) — estado antes da conversão para Tailwind

- **Data:** 13/09/2026, antes da Tarefa 1
- **Base:** código da Tarefa 0 (páginas já em `src/routes`), build de produção servido por `npm run preview`
- **Capturas:** [`docs/petplanet-antes/`](./petplanet-antes/) — 36 PNGs
- **Como foram tiradas:** Edge headless via `puppeteer-core`, `prefers-reduced-motion: reduce` (desliga
  as animações `motion-safe:`), mouse parado em (5, 5), perfil novo (sem `localStorage`).
  Duas execuções seguidas deram **0 px de diferença** nas telas do telefone e menos de 0,03% nas
  páginas inteiras (o canvas de esporos do topo varia). Qualquer diferença depois da conversão é
  regressão real, não ruído.

## Onde estão os estilos inline

A página `src/routes/Dashboard/index.tsx` **já é 100% Tailwind**. Os estilos inline estão só no
protótipo que ela embute:

| Arquivo | `style={}` | Observação |
|---|---|---|
| `components/petplanet/PetPlanetApp.tsx` | 151 | Telas, mascote, contadores, confete |
| `components/petplanet/primitives.tsx` | 18 | Cartão, barra, selo, moeda, balão |
| `components/ui/ProgressBar.tsx` | 1 | Largura em % (usado em EcoScore e Sobre) |
| `components/ecoscore/ui/NodeCircle.tsx` | 1 | Tamanho 64 px (Trilha) |
| `components/ecoscore/ui/MediaPlaceholder.tsx` | 1 | Altura 170/280 px (Trilha) |

Não existe arquivo `.css` do PetPlanet: as cores vinham de um objeto TypeScript (`palette.ts`).

## Estrutura da página

1. **Hero** (`PageHero`): fundo `surf` com canvas de esporos, selo "Protótipo interativo", `h1`
   "Visualize seu impacto real" (destaque em `soul`), parágrafo `max-w-2xl`.
2. **Demonstração** (fundo branco): selo, `h2` "Experimente o Dashboard", descrição; moldura de
   navegador (`rounded-card`, borda `line`, fundo `surf`) com barra de 3 pontos + URL
   `ecoscore.soulup.app/impacto` + rótulo "EcoScore"; dentro, o telefone do PetPlanet
   centralizado com 20 px de respiro; abaixo, caixa "Dica" com ícone.
3. **O que esperar** (fundo `surf`, borda superior): selo, `h2` "Cada detalhe foi pensado", 4 cards
   (Mascote vivo, Estado persistente, Métricas reais, Loop de recompensa — este com selo âmbar).
4. **CTA** (fundo branco): caixa `surf` centralizada, "Quer entender a engenharia por trás?",
   botões "Ver o EcoScore completo" (primário) e "Como funciona →" (secundário).
5. **NextStep** "Ainda tem dúvidas?" com botão "Ver o FAQ →".
6. Header e Footer do Layout.

## Por largura

### 375 px — [`dashboard-pagina-375.png`](./petplanet-antes/dashboard-pagina-375.png)

- Header com logo e botão hambúrguer.
- Hero: `h1` em `text-3xl` (30 px), quebra em 2 linhas; `px-4`, `py-14`.
- Moldura do navegador com 343 px de largura; o rótulo "EcoScore" da barra fica oculto (`hidden sm:inline`).
- **Defeito existente:** o telefone tem 360 px fixos e a moldura só 343 px. Ele começa em x = 8 px
  (a moldura em x = 16 px) e o `overflow-hidden` da moldura corta cerca de 8 px de cada lado,
  incluindo a borda e os cantos arredondados. Mantido nesta tarefa; entra na lista da Tarefa 5.
- Cards "O que esperar" em 1 coluna; botões da CTA empilhados (quebra do `flex-wrap`).
- Altura total da página: 4.998 px.

### 768 px — [`dashboard-pagina-768.png`](./petplanet-antes/dashboard-pagina-768.png)

- Header ainda com hambúrguer (o menu completo só aparece em `lg:`, 1024 px).
- Hero: `h1` em `text-4xl` (36 px); container `px-6`.
- Moldura com 720 px; telefone centralizado (x = 204 px), inteiro, sem corte.
- Cards em 2 colunas (`sm:grid-cols-2`); botões da CTA lado a lado.
- Altura total: 3.895 px.

### 1280 px — [`dashboard-pagina-1280.png`](./petplanet-antes/dashboard-pagina-1280.png)

- Header com menu completo e botão "Contato" em pílula; "Dashboard" destacado em `soul`.
- Hero: `h1` em `text-5xl` (48 px), uma linha; `py-20`.
- Container `max-w-6xl` (conteúdo com 1.104 px); telefone centralizado (x = 460 px).
- Cards em 4 colunas (`lg:grid-cols-4`).
- Altura total: 3.636 px.

## O telefone (igual nas três larguras, exceto o corte em 375 px)

**Moldura:** 360 × 760 px, raio 28 px, borda 2 px `#0F5F61`, fundo `#0E3550`, sombra
`0 6px 0 #0F5F61, 0 20px 60px rgba(0,0,0,.6)` + `drop-shadow(0 18px 40px rgba(14,53,80,.22))` no
invólucro. Barra de status de 28 px ("9:41" e "● ● ●", JetBrains Mono 10 px `#8FA3B0`).
Área rolável de 28 px a 56 px da base; barra de abas fixa embaixo (fundo `#16486B`, borda superior 1,5 px).

**Tipografia:** Fredoka (títulos e interface), JetBrains Mono (rótulos em caixa alta, 8–11 px),
Caveat (balão de fala manuscrito, 16–18 px).

**Paleta usada:** `#0E3550` fundo · `#16486B` cartão · `#FFFFFF` texto · `#A4DBDE` texto claro/destaque ·
`#8FA3B0` texto de apoio · `#0F5F61` contornos · `#29B4B7` acento · `#C8A84B` âmbar ·
`#EBD9A8` âmbar claro · `rgba(41,180,183,.14)` painel · `rgba(255,255,255,.12)` bloqueado.

| Tela | Captura | Conteúdo e medidas |
|---|---|---|
| Onboarding 1–3 | `onboarding-{1,2,3}-*.png` | "BEM-VINDO AO ECOSCORE" (mono 10 px, espaçamento 2 px); mascote 200 px; título Fredoka 22 px; texto 14 px `#A4DBDE`; 3 indicadores (ativo 24×8, inativo 8×8); botão largura total, 16 px, raio 14; link "pular" 12 px |
| Painel | `painel-*.png`, `painel-fim-*.png` | Topo: iniciais "MR" 32 px, "OI," + "Mariana", moedas 1.842, streak 14d, NV 12. Painel `rgba(41,180,183,.14)` raio 18 com faixa de confete, mascote 170 px e balão Caveat inclinado 4°; "CO₂ EVITADO · ACUMULADO"; 47,3 em Fredoka 46 px; "≈ 8 chuveiros quentes a menos" Caveat 16 px; barra "saúde do planeta" 74%. "seus poderes ✦": grade 2×2 com selos 32 px e barras de 5 px. Botão "+ registrar nova ação" com borda 2 px `#29B4B7`. Cartão "PRÓXIMA RECOMPENSA" com baú 48 px e moeda +50 |
| Registrar | `registrar-*.png`, `registrar-foto-*.png` | "← voltar" / "NOVA AÇÃO"; grade 2×2 de ações (selecionada com fundo da cor e borda branca 2 px); área de foto tracejada → sólida após o clique; chips de quantidade; "vai render" com moeda +24 e "+1.2kg CO₂"; botão final desabilitado (opacidade 0,6) até a foto |
| Sucesso | `sucesso-*.png` | "AÇÃO REGISTRADA!" mono 11 px âmbar espaçamento 3; "uhuuu! ✦" 28 px; mascote comemorando 200 px com 3 brilhos; balão âmbar "obrigada!"; cartões Soul Points 24 pts e CO₂ 1.2 kg (borda âmbar); botão "continuar →". Com animação desligada o confete fica empilhado no centro (ponto visível acima dos cartões) |
| Painel pós-ação | `painel-pos-acao-*.png` | Mesmo painel com 48,5 kg, mascote comemorando e botão pulsante "alimentar planetinha →" |
| Histórico | `historico-*.png` | "HISTÓRICO DE AÇÕES", "sua trajetória ✦" 24 px; 3 cartões (7 AÇÕES, 151 PTS, 14 STREAK); chips de filtro com rolagem horizontal; lista com selo 32 px, título, "qtd · data", kgCO₂ e pontos em âmbar |
| Perfil | `perfil-*.png` | "PERFIL"; painel com mascote 92 px, "Mariana Reis", "@mari.reis · São Paulo", NV 12 e 14d; barra de xp âmbar; 3 cartões (48,5 CO₂ kg, 7 AÇÕES, 1.866 MOEDAS); "vitrine 🏆" com 4 selos 44 px inclinados; botão tracejado "↻ resetar progresso (demo)" |

## Valores que mudam em tempo de execução

Não dá para virar classe estática diretamente. Tratamento previsto na conversão:

| Valor | Hoje | Conversão |
|---|---|---|
| Olhos seguindo o mouse | Atributos `cx`/`cy` de SVG | Nenhuma mudança: atributo de SVG não é CSS |
| Largura das barras (saúde, xp, métricas) | `width: N%` | Elemento `<progress>` com `value`/`max` estilizado por Tailwind |
| Posição de cada confete (36 peças) | variáveis `--tx`/`--ty` inline | Lista estática de 36 classes completas |
| Atraso da animação da lista do histórico (até 30 linhas) | `animationDelay` inline | Lista estática de 30 classes completas |
| Brilho ocioso do painel | posição aleatória contínua | Sorteio entre posições pré-definidas em classes estáticas (única mudança de comportamento; imperceptível) |
| Tamanhos dependentes de prop (mascote 200/170/92, selo 28/32/44, moeda 14/18/20/26) | cálculo inline | Mapas `Record<Tamanho, string>` |

## Comparação depois da conversão (Tarefa 1)

Mesmo script, mesmas condições, build novo. Resultado pixel a pixel contra as capturas acima:

| Captura | Diferença | Onde |
|---|---|---|
| Onboarding 1–3, Registrar, Registrar com foto, Sucesso, Histórico (× 3 larguras) | **0 px** | — |
| Painel, Painel fim, Painel pós-ação (× 3 larguras) | 10–12 px (0,004%) | Ponta do preenchimento das barras de progresso: 1 px de antialiasing |
| Perfil (× 3 larguras) | 2 px (0,001%) | Ponta da barra de xp |
| Página Dashboard inteira (375/768/1280) | 0,008–0,016% | Canvas de esporos do topo, mesmo nível do ruído medido entre duas capturas do "antes" |
| Páginas EcoScore, Sobre e Trilha (usam ProgressBar, NodeCircle, MediaPlaceholder) | 0,003–0,014% | Só nos canvas de esporos; barras, nós e áreas de mídia sem diferença |

`style={}` no projeto: 172 → 0. Arquivos `.css` autorais: nenhum (`src/index.css` só com as três
diretivas `@tailwind`). O corte de 8 px do telefone em 375 px continua, como estava antes.
