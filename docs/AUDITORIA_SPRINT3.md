# Auditoria Sprint 3 — Front-End Design Engineering (EcoScore)

- **Data da auditoria:** 13/09/2026
- **Branch auditada:** `frontend-react` (commit `ce8a886`, sincronizada com `origin/frontend-react`)
- **Pasta do projeto React:** `frontend/`
- **Escopo:** somente leitura. Nenhum arquivo de código foi alterado.

> ## ⚠️ PRAZO
> O cronograma do PDF do Challenge (página 4) marca **13/09/2026 — ENTREGA DA SPRINT 3**. É hoje.
> Tudo o que vem abaixo precisa ser lido com isso em mente: o plano da Fase 2 terá de ser cortado
> por pontos-por-hora, não por completude.

---

## 1. Fontes lidas

Os PDFs não estavam em `docs/aulas/`. Foram lidos direto de `C:\Users\Dell\Downloads\aulaqsfront\`
e `C:\Users\Dell\Downloads\`, com o texto extraído por script.

| Arquivo | Páginas | Relevância |
|---|---|---|
| B02_Types_para_React_2026 | 23 | Props tipadas, unions, Record, children, rotas estáticas/dinâmicas, useParams/useNavigate |
| B03_Vite_React_JSX_2026_REV01 | 14 | Criação do projeto, limpeza do boilerplate, JSX, scripts lint/build |
| B05_Tailwind_CSS_4_7_2026_REV01 | 16 | Instalação v4 por plugin, sem CSS autoral, mobile-first, classes estáticas |
| C01_React_Router_8_2026_REV01 | 20 | `createBrowserRouter` em `main.tsx`, `RouterProvider`, `Outlet`, `errorElement`, `Navigate` |
| C03_React_Hook_Form_TechStore_2026 | 170 | `useForm`, `register`, regras, `errors`, acessibilidade do formulário |
| H01_Hooks_React_Rotas_Dados_TechStore_2026 | 109 | Regras dos Hooks, useEffect com cleanup, fetch manual, useRef, useContext |
| P01_Projeto_Integrador_Hooks_Rotas_Dados_REV01 | 44 | Projeto-modelo: tipos, JSON em `public/data`, service, estados de tela, rota dinâmica |
| typescript-2026 | 91 | Introdutória (Node, npm, tsc, `strict: true`). Nenhuma regra específica de React |
| 1TDS Fevereiro - Challenge 2026 - 2º Semestre | 102 | Regras, critérios e penalidades (páginas 27–45 são Front-End Sprint 3) |

**Não commitar as apostilas.** Todas trazem "Copyright 2026 Alexandre Carlos de Jesus. Todos os
direitos reservados. Reprodução, distribuição [...] somente com autorização". O repositório é
público. Se criarem `docs/aulas/`, ela precisa entrar no `.gitignore`.

Há também `gerenciador-notas-node-express-ts.pdf` na mesma pasta de Downloads — fora da lista e
fora do escopo; não foi considerado.

---

## 2. Padrão cobrado pelas apostilas

### 2.1 Estrutura de pastas e nomes

| Tema | O que as apostilas mostram | Observação |
|---|---|---|
| Páginas | C01/P01: `src/routes/Home/index.tsx` com `export default`. B02/C03/H01: `src/pages/Home.tsx` com `export function Home` | **O Challenge exige `/src/pages`** (pág. 29). Usar `src/pages`. |
| Reutilizáveis | `src/components/NomeComponente.tsx`, PascalCase, um componente principal por arquivo | B02: "o componente principal exportado em um arquivo com o mesmo nome" |
| Contratos | `src/types/produto.ts` (só tipos, extensão `.ts`) | |
| Acesso a dados | `src/services/produtos.ts` com `buscarProdutos(signal?)` | |
| Actions de rota | `src/actions/editarProdutoAction.ts` | Só se usar `Form` de rota |
| Dados | `public/data/produtos.json`, lido por `fetch('/data/produtos.json')` | "public é servido a partir da raiz" |
| Imports de tipo | `import type { Produto } from '../types/produto'` | |

### 2.2 Rotas (C01, P01, H01)

```tsx
// src/main.tsx
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

const router = createBrowserRouter([{
  path: '/', element: <App />, errorElement: <Error />,
  children: [
    { index: true, element: <Home /> },
    { path: 'produtos', element: <Produtos /> },
    { path: 'produtos/:id', element: <ProdutoDetalhes /> },
  ],
}])

createRoot(document.getElementById('root')!).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>,
)
```

- Pacote: `npm install react-router`. C01 diz textualmente: *"A fonte usa react-router-dom. Na linha 8,
  instalamos react-router"*. `Link`, `Outlet`, `Navigate`, `useParams`, `useNavigate`, `useNavigation`,
  `useLocation`, `useRouteError`, `isRouteErrorResponse` vêm de `react-router`; `RouterProvider` de
  `react-router/dom`. (C03 importa `RouterProvider` de `react-router` — divergência interna da coleção;
  seguir C01/P01.)
- `App` é o layout: `Menu` + `<Outlet />` + `Rodape`. P01 acrescenta barra de feedback com
  `useNavigation().state !== 'idle'`.
- Página `Error` com `useRouteError` + `isRouteErrorResponse` + `Link` para `/`.
- Redirecionamento de rota antiga: `{ path: '/catalogo', element: <Navigate to="/produtos" replace /> }`.
- Parâmetro: `const { id } = useParams<{ id: string }>()` e **`Number(id)`** antes de comparar.
- ID inexistente (`/produtos/999`) é tratado dentro da página; rota inexistente cai no `errorElement`.
- `useNavigate` para navegar por decisão do código (voltar, cancelar, após salvar);
  `useNavigation` para ler `idle` / `submitting` / `loading`.
- Links internos sempre com `Link`/`NavLink`; `<a>` só para externos (B02).

### 2.3 Tipagem (B02, P01, C03)

- Props: `type CardProdutoProps = { produto: Produto; destaque?: boolean }` e desestruturação no parâmetro.
- Opcional com `?` e valor padrão **só quando o componente funciona sem o dado** (B02 §7).
- Valores fechados com union de literais; mapas com `Record<StatusProduto, string>`.
- Tipos derivados com `Omit<Produto, 'id'>`; filtros com `'todos' | CategoriaProduto`.
- `useState<Produto[]>([])`, `useState<Produto | null>(null)`.
- `children: ReactNode`; callbacks `aoAdicionar: (produtoId: number) => void`.
- `type` e `interface` são aceitos para props; a regra é consistência (B02 §5). Entidade no P01 usa `interface Produto`.

### 2.4 Listas, estado e efeitos (P01, H01)

- `.map()` com `key={item.id}`. "Por que produto.id é key melhor que a posição?" é questão de revisão (B02).
- **Valor derivado calculado na renderização**, nunca em state nem em outro effect (P01 §16, H01 §3.4).
- Setter com função atualizadora quando depende do valor anterior; nunca mutar objeto/array.
- Hooks só no nível principal do componente.
- Effect de dados, exatamente assim:

```tsx
useEffect(() => {
  const controller = new AbortController()
  async function carregar() {
    try {
      setCarregando(true)
      setErro('')
      setProdutos(await buscarProdutos(controller.signal))
    } catch (erroDesconhecido) {
      if (erroDesconhecido instanceof DOMException && erroDesconhecido.name === 'AbortError') return
      setErro('Não foi possível carregar os produtos.')
    } finally {
      if (!controller.signal.aborted) setCarregando(false)
    }
  }
  carregar()
  return () => controller.abort()
}, [])            // [id] na página de detalhe
```

- "Não torne a função principal do Effect async" (P01 §15).
- Service: `fetch` → confere `resposta.ok` → `throw new Error(...)` → `return (await resposta.json()) as Produto[]`.
- Quatro estados sempre visíveis: carregando, erro com `role="alert"`, vazio, conteúdo (P01 §17).
- `document.title` sincronizado por effect com cleanup (P01 §24).

### 2.5 Formulários (C03)

```tsx
const { register, handleSubmit, formState: { errors, isSubmitting } } =
  useForm<DadosContato>({ defaultValues: valoresVazios, mode: 'onBlur' })

<form noValidate onSubmit={handleSubmit(enviar)}>
  <label htmlFor="nome">Nome</label>
  <input id="nome"
    {...register('nome', { required: 'Informe o nome.', minLength: { value: 3, message: 'Use pelo menos 3 caracteres.' } })}
    aria-invalid={Boolean(errors.nome)}
    aria-describedby={errors.nome ? 'erro-nome' : undefined} />
  {errors.nome && <small id="erro-nome" role="alert">{errors.nome.message}</small>}
  <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Salvando...' : 'Salvar'}</button>
</form>
```

- Callback entregue **sem parênteses** a `handleSubmit`.
- Números com `valueAsNumber: true`; `value` de `<option>` sem acento, igual à union.
- `Controller` só para componente controlado personalizado; nunca `register` + `Controller` na mesma chave.
- Botões auxiliares `type="button"`. Sucesso com `isSubmitSuccessful` + `role="status"`.
- Checklist de qualidade do formulário: C03 §12.24 (13 itens).

### 2.6 Tailwind (B05)

- `npm install tailwindcss @tailwindcss/vite`; em `vite.config.ts`: `plugins: [react(), tailwindcss()]`.
- `src/index.css` final = **uma linha**: `@import "tailwindcss";`
- **Proibido o fluxo v3**: `npx tailwindcss init -p`, `tailwind.config.js`.
- "TechStore estilizada sem CSS autoral"; "Nenhuma nova regra foi adicionada a index.css" é critério de conclusão.
- Mobile-first: classe sem prefixo é o celular; `sm:` 640, `md:` 768, `lg:` 1024, `xl:` 1280.
- **Nunca** montar nome parcial de classe (`bg-${cor}-500`); usar mapa com strings completas.
- `focus-visible:` em todo link e botão. Testar com Tab.
- Valores arbitrários "com critério — o excesso recria o problema dos números soltos".
- Limpar `App.css`, `assets` do template, favicon do Vite; `index.html` com `lang="pt-BR"`, título e description.
- Testes visuais: 375 px, acima de 768 px e navegação por Tab.

### 2.7 Vite e JSX (B03)

- `npm create vite@latest nome -- --template react-ts`; linter Oxlint.
- Scripts `dev`, `lint`, `build`, `preview`. **Lint e build sem erro** são condição de conclusão em todas as apostilas.
- Fluxo `index.html → main.tsx → App.tsx`; `className`, tags fechadas, um elemento raiz.
- B03 manda colocar `package-lock.json` no `.gitignore` — **conflita com o Challenge**, que exige "arquivo de lock" no zip (pág. 45). O Challenge vence: manter o lock.

### 2.8 Acessibilidade (P01 §35, C03 §5.6, B05)

`label` com texto visível; `alt` descritivo; `role="alert"` em erro; `aria-label` na `nav`;
`header`/`nav`/`main`/`section`/`article`/`footer`; `h1` único por página; foco visível; teste de teclado.

### 2.9 Versões adotadas pelas apostilas

create-vite 9.1 · Vite 8.2 · React 19.2 · TypeScript 7.0 · React Router 8.3 · React Hook Form 7.87 ·
Tailwind "4.7" · Node 24 LTS.

> **Tailwind 4.7 não existe no npm.** Em 13/09/2026, `npm view tailwindcss dist-tags` retorna
> `latest: 4.3.3`. O comando `npm install tailwindcss@4.7` do C03/H01 falharia. O B05 instala sem
> versão, o que resolve para 4.3.3. `react-router@8.3.1` exige `react >= 19.2.7`.

### 2.10 Proibições explícitas (apostilas + Challenge)

| Proibição | Fonte | Penalidade no Challenge |
|---|---|---|
| Bootstrap, Material UI, Chakra, jQuery ou similares | Challenge pág. 32 e 44 | −20 |
| Axios ou lib de requisição | Challenge pág. 32 e 44 | −10 |
| Template pronto da internet | Challenge pág. 44 | nota zero |
| Next.js, CRA, Vue, Angular, React sem Vite | Challenge pág. 44 | nota zero |
| Entrega sem React + Vite + TypeScript | Challenge pág. 44 | nota zero |
| Plágio / trabalho idêntico | Challenge pág. 44 | zero + ocorrência |
| `node_modules` no zip | Challenge pág. 32 e 42 | −10 |
| CSS autoral; fluxo Tailwind v3; classes interpoladas | B05 | afeta 4b (10 pts) |
| Função async direto no `useEffect`; derivado em state | P01, H01 | afeta 3b |
| `key` pelo índice | B02, C03 §10.3 | afeta 2c |
| `onClick={fn()}` / `handleSubmit(fn())` | B02 §8, C03 §4.4 | bug |
| Hook dentro de `if`/laço | H01 §1.2 | bug |
| `<a href>` para rota interna | B02 §14 | quebra SPA (1b) |

### 2.11 Checkpoints de conclusão por apostila

- **B02:** rotas estática, dinâmica e "não encontrada"; `Link`, `useParams`, `useNavigate` explicados; build e lint.
- **B03:** nenhum import/arquivo do template; `#root` e `main.tsx` mantidos; lint, build e preview.
- **B05:** nenhum CSS autoral novo; coluna única sem prefixo e colunas com `md:`; 375 px e >768 px; Tab; lint e build.
- **C01:** quatro páginas, rota dinâmica, 404 e navegação **só por Links**; `/produtos/999` tratado; `/catalogo` redireciona; lint e build.
- **C03:** checklist §12.24 — rótulo em todo campo, `name` = chave do tipo, números como `number`, mensagem perto do campo, erro não só por cor, `type="button"` nos auxiliares, `handleSubmit`, bloqueio durante `isSubmitting`, lint e build.
- **H01:** regras dos Hooks; filtro no render; cleanup de listener; tratamento de erro assíncrono.
- **P01:** tabela de testes (`/`, lista, detalhe, `/999`, rota inválida, recarregar rota interna), teclado, lint e build.

---

## 3. Critérios da Sprint 3 × estado atual

Fonte: Challenge págs. 34–41. **A soma dos blocos dá 95 pontos, não 100** (20+15+20+20+5+5+10); o PDF
numera "01/09" a "08/09" e não há página 09/09 no arquivo. Vale perguntar ao professor.

Legenda: **OK** atende · **Parcial** atende com falhas · **Ausente** não existe.
"Perda estimada" é leitura minha do rigor provável, não regra do PDF.

| # | Critério | Pts | Status | Evidência / o que falta | Perda estimada |
|---|---|---|---|---|---|
| **1a** | Páginas obrigatórias convertidas (Home, Sobre, FAQ, Contato, Integrantes, Solução) | 5,0 | OK | Todas em `src/pages`: Home, Sobre, Faq, Contato, Integrantes + solução em EcoScore, ComoFunciona, Dashboard, Trilha | 0 |
| **1b** | SPA e navegação com React Router | 5,0 | Parcial | Funciona com `react-router-dom` 6 + `HashRouter` (URLs `/#/sobre`). Sem Data Router, sem `errorElement`, rota inexistente redireciona calada para Home | 0 a −1 |
| **1c** | Estrutura `/src/components` e `/src/pages` | 5,0 | Parcial | Pastas certas. Mas: `src/api/ecoscore.ts` é código morto (4 stubs que lançam erro, nenhum import); tipos espalhados em `data/*.ts`; sem `services/` | −1 |
| **1d** | TypeScript em componentes e props | 5,0 | OK | `strict`, `noImplicitAny`, props tipadas, `Record`, unions. Props usam `interface` (padrão aceito, mas sua regra pede `type`) | 0 a −0,5 |
| **2a** | Componentes reutilizáveis (Header, Footer, Layout, Cards, Botões) | 8,0 | OK | `layout/Header`, `Footer`, `Layout` com `Outlet`; `ui/Card`, `Button`, `Badge` + 9 outros. Várias páginas repetem "card" à mão em vez de `<Card>` (ex.: `Contato.tsx:207-247`) | −0,5 a −1 |
| **2b** | Modularidade | 4,0 | Parcial | `petplanet/PetPlanetApp.tsx` tem **54 KB** com dezenas de componentes no mesmo arquivo | −1 |
| **2c** | Nomeação e padrões React | 3,0 | Parcial | Mistura inglês (`TrailScreen`, `QuizOption`, `useJourney`) e português; `components/ecoscore/**` usa `;`, o resto não; helper genérico de `lazy` em `App.tsx` foge do padrão ensinado | −1 |
| **3a** | `useState` em ≥ 2 componentes | 2,0 | OK | Header, Contato, Accordion, EcoScore, QuizScreen, LearnScreen e outros | 0 |
| **3b** | `useEffect` — controle de efeitos | 4,0 | Parcial | Existe (`Layout.tsx:20` scroll por rota; `Spores.tsx` canvas com cleanup; PetPlanet). Nenhum effect de dados com `AbortController`/estados, que é o padrão do P01 | −1 |
| **3c** | `useNavigate` e `useParams` | 4,0 | **Ausente** | Zero ocorrências dos dois no projeto | **−4** |
| **3d** | Props entre componentes | 1,0 | OK | Amplo uso | 0 |
| **3e** | Rotas estáticas | 4,0 | OK | 8 rotas estáticas + index | 0 |
| **3f** | Rotas dinâmicas com parâmetro | 5,0 | **Ausente** | Nenhuma rota com `:param` | **−5** |
| **4a** | Layout profissional | 5,0 | OK | Identidade consistente | 0 |
| **4b** | Tailwind aplicado corretamente, sem CSS externo | 10,0 | Parcial | Fluxo **v3** (`tailwind.config.ts`, `postcss.config.js`, `@tailwind` ×3); **172 `style={}`** (169 no PetPlanet + `ProgressBar.tsx:25`, `NodeCircle.tsx:24`, `MediaPlaceholder.tsx:12`); **12 `@keyframes` autorais** no config; `focus-visible:` só em `Button` e `Accordion` | **−3 a −5** |
| **4c** | Responsividade mobile (≤ 480 px) | 3,0 | Não verificado | Classes mobile-first presentes. Precisa teste no navegador (não fiz) | 0 a −1 |
| **4d** | Responsividade tablet (768 px) | 3,0 | Não verificado | Idem | 0 a −0,5 |
| **4e** | Responsividade desktop (≥ 992 px) | 4,0 | Não verificado | Menu desktop só aparece em `lg:` (1024 px): de 992 a 1023 px fica o hambúrguer | 0 a −0,5 |
| **5a** | `useForm()` com validação | 1,0 | OK | `Contato.tsx:40-47` | 0 |
| **5b** | Campos obrigatórios validados | 1,5 | OK | nome, e-mail (pattern), assunto, mensagem (minLength 20) | 0 |
| **5c** | Mensagens de erro claras | 1,0 | OK | Mensagens abaixo de cada campo, `aria-describedby` | 0 |
| **5d** | Tipagem dos dados do formulário | 1,0 | OK | `ContatoFormData` | 0 |
| **5e** | Destaque visual do erro | 0,5 | OK | `border-red-600` + texto vermelho. Falta `role="alert"` (padrão C03, não pontua) | 0 |
| **6a** | Repositório no GitHub | 1,5 | OK | `francosdev/challenge-soulup-solcon`, **público**, default `main` | 0 |
| **6b** | Link do repositório no README | 1,5 | **Ausente** | Nenhum README contém a URL do repositório | **−1,5** |
| **6c** | ≥ 5 commits por integrante | 1,0 | **Parcial** | Carlos 71, Murilo 45, **Henrique 1** (no repositório inteiro; 0 em `frontend/`) | **−1** |
| **6d** | Participação visível de todos | 1,0 | Parcial | Henrique praticamente ausente do histórico | −0,5 a −1 |
| **7a** | Título e descrição | 1,4 | OK | `frontend/README.md` | 0 |
| **7b** | Tecnologias | 1,4 | OK (desatualizará) | Lista React 18, Tailwind 3, HashRouter | 0 |
| **7c** | Estrutura de pastas | 1,4 | OK (desatualizará) | Árvore presente; cita "Skill tree" | 0 |
| **7d** | Autores: nome, RM, **turma, foto**, LinkedIn, GitHub | 1,4 | Parcial | Tabela sem turma por integrante e **sem foto** | −0,7 |
| **7e** | Imagens e ícones do projeto | 1,4 | Parcial/Ausente | Nenhuma captura de tela do sistema; só badges shields | −0,7 a −1,4 |
| **7f-i** | Link do repositório em "Como usar" | 0,8 | **Ausente** | | **−0,8** |
| **7f-ii** | Link do vídeo no YouTube | 0,8 | **Ausente** | Não há vídeo | **−0,8** |
| **7g** | Contato | 1,4 | OK | `francosdevs@gmail.com` no `frontend/README.md` | 0 |

### Penalidades (págs. 42–44)

| Infração | Pena | Situação hoje |
|---|---|---|
| Zip > 50 MB | −10 | Controlável: `.git` = 21 MB, código sem `node_modules` = 3,6 MB. **Não incluir** `frontend.zip` (6,7 MB, solto na raiz) nem `node_modules` |
| Só link, sem zip no portal | −15 | Pendente de você |
| `node_modules` no zip | −10 | Pendente de você |
| Falta `package.json`, `src`, config Vite | −15 | OK hoje |
| Não executa após `npm install` | −20 | **OK hoje** (lint e build passam). **Risco alto** ao atualizar React/Router/Tailwind: validar com instalação limpa |
| Zip corrompido/vazio | −20 | Pendente de você |
| Entrega fora do portal | −10 | Pendente de você |
| Repositório privado/inacessível | −10 | OK (público) |
| Sem histórico Git verificável | −10 | Zip precisa levar `.git` |
| UI framework proibido | −20 | Nenhum. `lucide-react` é biblioteca de **ícones SVG** — ver risco R6 |
| Axios / lib HTTP | −10 | Nenhum |
| Template pronto / outro framework | zero | Nenhum |

---

## 4. Estado atual do repositório

### 4.1 Dependências instaladas (`npm ls --depth=0`)

| Pacote | Instalado | Apostila |
|---|---|---|
| react / react-dom | 18.3.1 | 19.2 |
| react-router-dom | **6.30.6** | `react-router` 8.3 |
| react-hook-form | 7.86.0 | 7.87 |
| tailwindcss | **3.4.19** (PostCSS + autoprefixer) | v4 via `@tailwindcss/vite` |
| vite | 5.4.21 | 8.2 |
| @vitejs/plugin-react | 4.7.0 | — |
| typescript | 5.9.3 | 7.0 |
| lucide-react | 0.454.0 | não citado |

Node local: v25.9.0. `netlify.toml` fixa Node 20.

Scripts: `dev` = vite · `build` = `tsc -b && vite build` · `lint` = `tsc -b --force` (só checagem de
tipos; o template atual usa Oxlint) · `preview`.

**Resultado hoje:** `npm run lint` passa; `npm run build` passa (20,7 s).

### 4.2 Estrutura

```
frontend/
├── index.html            favicon ./favicon.svg, Google Fonts (Poppins, Inter + Fredoka, JetBrains Mono, Caveat só p/ PetPlanet)
├── tailwind.config.ts    tokens (soul, navy, sun, ink, line, surf), rounded card/pill, 12 keyframes pp-*
├── postcss.config.js
├── vite.config.ts        base: './'
├── public/               favicon.svg, assets/imagens/{carlos,murilo,henrique}.jpg, logo-solcon.png
└── src/
    ├── main.tsx          createRoot → <App />
    ├── App.tsx           HashRouter + Routes, lazy + Suspense
    ├── index.css         @tailwind base/components/utilities
    ├── api/ecoscore.ts   stubs que lançam erro — sem uso
    ├── components/
    │   ├── layout/       Header (useState, useLocation, NavLink), Footer, Layout (Outlet, useEffect), Logo
    │   ├── ui/           Accordion, Badge, Button, Card, CircleBadge, FeatureList, MetricRow,
    │   │                 NextStep, PageHero, ProgressBar, PullQuote, SectionHeading
    │   ├── visual/       Spores (canvas animado)
    │   ├── ecoscore/     21 arquivos da jornada da Trilha (trail, skill, learn, quiz, mission, achievement, ui)
    │   └── petplanet/    PetPlanetApp.tsx (54 KB, 151 style inline), primitives.tsx (18 style inline), palette.ts
    ├── data/             como-funciona, ecoscore, faq, home, integrantes, recycling, skills, sobre, sponsorship
    ├── lib/useJourney.ts hook próprio (useState, useCallback, useMemo)
    ├── pages/            Home, Sobre, EcoScore, ComoFunciona, Dashboard, Trilha, Faq, Integrantes, Contato
    └── types/ecoscore.ts
```

### 4.3 Rotas (`App.tsx`)

`/` Home · `/sobre` · `/ecoscore` · `/como-funciona` · `/dashboard` · `/trilha` · `/faq` · `/integrantes` ·
`/contato` · `*` → `<Navigate to="/" replace />`. Nenhuma rota dinâmica, nenhum `errorElement`.

### 4.4 Hooks

| Hook | Onde |
|---|---|
| useState | Header, Contato, Accordion, EcoScore (VotoGrupo), QuizScreen, LearnScreen, EcoScoreJourney, useJourney, PetPlanetApp |
| useEffect | Layout (scroll ao trocar rota), Spores (canvas + cleanup), PetPlanetApp (4) |
| useLocation | Layout, Header |
| useRef | Spores, PetPlanetApp |
| useCallback / useMemo | useJourney |
| **useNavigate / useParams / useNavigation** | **nenhum** |
| fetch / AbortController | nenhum |

### 4.5 Formulários

Um formulário (`Contato.tsx`), já em React Hook Form com tipagem, `noValidate`, `aria-invalid`,
`aria-describedby`, borda vermelha e botão bloqueado em `isSubmitting`. É o ponto mais sólido do projeto.

### 4.6 Git

- Branch atual `frontend-react`, 31 commits à frente de `main`.
- **`main` não contém o React**: em `main`, `frontend/` ainda é o site HTML/CSS.
- **`origin/main` divergiu**: tem 27 commits que não estão em `frontend-react` (nem no `main` local). O merge
  para `main` pode ter conflito.
- Commits por autor (repositório inteiro): Carlos 71 · Murilo 45 · Henrique 1.
- Commits em `frontend/`: Carlos 37 · Murilo 5 · Henrique 0.
- Não commitado (trabalho seu, não mexi): `README.md` raiz e 11 arquivos em `python/`.
- Não rastreado: `#Função para calcular nota FIAP.py` e `frontend.zip` (6,7 MB).

---

## 5. Divergências entre o código e o padrão das apostilas

| # | Divergência | Onde | Padrão esperado |
|---|---|---|---|
| D1 | `react-router-dom` 6 com `HashRouter` e `<Routes>` declarativas em `App.tsx` | `App.tsx:2,27-43` | `react-router` 8, `createBrowserRouter` em `main.tsx`, `RouterProvider` de `react-router/dom`, `children` + `index: true` + `errorElement` |
| D2 | Sem página de erro; rota inválida volta para Home sem aviso | `App.tsx:40` | `errorElement: <Error />` com `useRouteError` e Link para Home |
| D3 | Sem rota dinâmica, `useParams`, `useNavigate` | projeto todo | C01/B02/P01 inteiros giram em torno disso |
| D4 | Tailwind 3 (config JS/TS + PostCSS + 3 diretivas) | `tailwind.config.ts`, `postcss.config.js`, `index.css` | Plugin `@tailwindcss/vite`, `index.css` só com `@import "tailwindcss";` |
| D5 | 172 `style={}` e 12 keyframes autorais | `petplanet/*`, `ProgressBar.tsx:25`, `NodeCircle.tsx:24`, `MediaPlaceholder.tsx:12`, `tailwind.config.ts:27-99` | Só `className` com utilitárias |
| D6 | Sem camada de dados: nada em `public/data`, sem `services/`, sem effect com `AbortController`, sem os 4 estados de tela | — | P01 §8–17 |
| D7 | `src/api/ecoscore.ts` morto (stubs que lançam `Error`) | `api/ecoscore.ts` | Remover |
| D8 | Contratos dentro de `data/*.ts` (`Integrante`, `CategoriaFaq`…) | `data/integrantes.ts:1`, `data/faq.ts` | `src/types/*.ts` |
| D9 | Props com `interface XxxProps` | `ui/*`, `layout/*` | Aceito pelo B02; sua regra pede `type XxxProps` |
| D10 | `focus-visible:` só em 2 componentes | Header, Footer, Integrantes, Contato, ecoscore/* | Todo link e botão |
| D11 | Vários `h1` na página Trilha (PageHero + telas da jornada) | `PageHero.tsx:22` + 9 telas em `components/ecoscore/**` | `h1` único |
| D12 | `alt={integrante.nome}` | `Integrantes.tsx:44` | Descritivo: "Foto de …" |
| D13 | Mensagens de erro do formulário sem `role="alert"`; `console.info` no envio | `Contato.tsx:51,111,139,166,190` | C03 §5.6 |
| D14 | Âmbar fora de gamificação | `Sobre.tsx:224` (`Badge tone="laranja"` numa camada técnica de ML) | Âmbar só em gamificação |
| D15 | Caminhos relativos `./assets/...` e `base: './'` | `data/integrantes.ts:23,35,47`, `Integrantes.tsx:94`, `vite.config.ts:6`, `index.html:11,22` | Com `BrowserRouter` e rota `/solucao/1`, `./assets` vira `/solucao/assets` e a foto quebra. Usar `/assets/...` |
| D16 | Nomenclatura mista inglês/português e `;` só em `components/ecoscore/**` | — | Um padrão só |
| D17 | Construções fora do que as apostilas ensinam: helper genérico `carregar<T extends Record<...>>` + `lazy`/`Suspense`, `useCallback`/`useMemo`, `CSSProperties` espalhado, canvas animado | `App.tsx:11-14`, `lib/useJourney.ts`, `petplanet/*`, `visual/Spores.tsx` | Não tira ponto por si, mas o professor corrige comparando com o padrão ensinado |
| D18 | Versões abaixo das apostilas (React 18, Vite 5, TS 5.9) | `package.json` | Rubrica não pontua versão; mas Router 8 **exige** React ≥ 19.2.7 |
| D19 | `lint` = `tsc`, sem Oxlint | `package.json:10` | Template atual traz Oxlint |

---

## 6. Divergências de conteúdo (terminologia e regras do produto)

Não pontuam diretamente na rubrica de Front-End, mas contradizem o que você definiu como obrigatório e
o que as outras disciplinas entregam. O site hoje descreve **dois produtos diferentes**: as páginas
institucionais contam o modelo antigo; a Trilha conta o novo.

| Problema | Onde | Correto |
|---|---|---|
| "Árvore de Habilidades (Sustentáveis)" | `EcoScore.tsx:75,83` · `Sobre.tsx:286` · `Dashboard.tsx:127` · `Trilha.tsx:46` | "Trilha" |
| "3 classes: Reciclagem, **Jardinagem** e Água" e "3 camadas Quiz → Evidência → Selo" | `data/home.ts:42` · `data/faq.ts:49,74` · `data/como-funciona.ts:16,32,48` · `data/ecoscore.ts:39,112` · `EcoScore.tsx:84,183` · `ComoFunciona.tsx:98-143` · `Sobre.tsx:110` | 4 Habilidades: Reciclagem, Consumo Consciente, Água, Energia. Plantio é categoria de ação |
| "CO₂ evitado" sem kgCO₂e | `EcoScore.tsx:244,250` · `Home.tsx:116` · `Dashboard.tsx:20,98` · `PetPlanetApp.tsx:699,1007,1114,1289` | "kgCO₂e" |
| "moedas" | `Dashboard.tsx:108` · `PetPlanetApp.tsx:509` (+ primitivo `Coin`) | Só Soul Points |
| `pointsPerAction: 3` em todas as Habilidades | `data/skills.ts:10,18,26,34` | Reciclagem 3 · Água 0,1 · Energia 2 (Plantio 5) |
| Recompensa "conta 100% subsidiada, limitada a R$ 500, para o topo do ranking" | `data/faq.ts:24` · `data/como-funciona.ts:48` · `frontend/README.md:23` | 110 Soul Points = R$ 1 de desconto; meta mensal 100 Soul Points |
| E-mail `ecoscore@fiap.com.br` (provavelmente não existe) | `Contato.tsx:214,217` | Um contato real do grupo |
| FAQ afirma a stack atual (React 18, `tailwind.config.ts`, react-router-dom) | `data/faq.ts:124` | Vai ficar falso após a migração |

---

## 7. Riscos de nota zero ou penalidade pesada

| # | Risco | Impacto | Como neutralizar |
|---|---|---|---|
| R1 | **Prazo é hoje** | Entrega perdida | Cortar escopo; entregar antes do fechamento do portal |
| R2 | **`main` sem o React** e `origin/main` divergente | "Branch principal main" é requisito (pág. 33); quem clonar `main` vê o site HTML | Merge de `origin/main` + `frontend-react` em `main`, resolvendo conflitos, antes de gerar o zip |
| R3 | Atualizar React 19 + Router 8 + Tailwind 4 e o projeto não instalar/rodar | −20 ("não executa localmente") | Validar com instalação limpa (apagar `node_modules`, `npm ci`, `npm run build`, `npm run dev`) |
| R4 | Zip com `node_modules`, sem `.git`, com `frontend.zip` dentro ou > 50 MB | −10 cada | Gerar o zip a partir de um clone limpo |
| R5 | 172 estilos inline + keyframes autorais | Até −10 no 4b | Converter ou retirar o PetPlanet desta entrega |
| R6 | `lucide-react` lido como "biblioteca de UI" | −20 se o professor interpretar assim | Baixa probabilidade (é ícone SVG, não componente). Declarar no README o que ela é, ou trocar por SVG inline |
| R7 | Henrique com 1 commit | −1 a −2 (6c, 6d) | Ele precisa de ≥ 4 commits **na conta dele** hoje |
| R8 | Apostilas commitadas em repositório público | Violação de direitos autorais | Não versionar `docs/aulas/` |
| R9 | Google Fonts via `<link>` lido como "CSS externo" | Baixa | Manter; justificar no README como fonte, não folha de estilo do projeto |
| R10 | Fotos quebradas após trocar para `BrowserRouter` (D15) | Visual quebrado no vídeo e na correção | Trocar para caminhos absolutos na mesma tarefa da migração |

Nenhum risco de **nota zero** está ativo hoje: há React + Vite + TypeScript, nenhum framework de UI
proibido, nenhum Axios, nenhum template.

---

## 8. Estimativa se entregasse hoje

| Bloco | Máx. | Perda estimada | Nota estimada |
|---|---|---|---|
| 1 — React + Vite + TS | 20 | −1 a −2,5 | 17,5 a 19 |
| 2 — Componentização | 15 | −2,5 a −3 | 12 a 12,5 |
| 3 — Hooks, props, rotas | 20 | −10 | 10 |
| 4 — Tailwind e responsividade | 20 | −3 a −7 | 13 a 17 |
| 5 — Formulário | 5 | 0 | 5 |
| 6 — GitHub | 5 | −3 a −3,5 | 1,5 a 2 |
| 7 — README | 10 | −3 a −3,7 | 6,3 a 7 |
| **Total** | **95** | **−22,5 a −29,7** | **≈ 65 a 72 de 95** |

Supondo zip correto e `main` atualizada. Sem o merge em `main` e com zip errado, soma-se −10 a −20.

**Onde estão os pontos mais baratos de recuperar**

1. Rota dinâmica + `useParams` + `useNavigate` + effect de dados: **até +10** (3c, 3f, parte de 3b).
2. README (link do repo, vídeo, fotos, turma, capturas): **até +5,2** (6b, 7d, 7e, 7f).
3. Commits do Henrique: **até +2** (depende dele).
4. Tailwind v4 + remover estilos inline: **até +5**, porém é o item mais caro e o de maior risco técnico.
5. Migração para `react-router` 8 com `createBrowserRouter`: **0 a +1** direto, mas é pré-requisito
   natural de D2/D3 no padrão do professor.

---

## 9. Decisões que preciso de você antes do plano

1. **Router.** Instalado hoje: `react-router-dom` 6.30.6 com `HashRouter`. O PDF do Challenge escreve
   "react-router-dom"; C01/P01/H01 usam `react-router` 8, que é o pacote sucessor.
   **Proposta:** migrar para `react-router` 8 (`createBrowserRouter` em `main.tsx`, `RouterProvider` de
   `react-router/dom`) e registrar no README que `react-router` é o sucessor de `react-router-dom`.
   Custo: sobe React e React DOM para 19.2.7+, e `@types/react` junto.

2. **Tokens de cor e fonte no Tailwind 4.** Suas regras dizem "`@import "tailwindcss";` como ÚNICA
   linha" e também "valores arbitrários ou `@theme`". `@theme` quebra a regra da linha única.
   **Proposta:** valores arbitrários (`bg-[#29B4B7]`, `text-[#16486B]`, `rounded-xl`, `rounded-full`),
   substituídos por script a partir de uma tabela fixa (hoje são **854** usos de token). `index.css`
   fica com uma linha, igual ao B05.

3. **Protótipo PetPlanet (página Dashboard).** Concentra 169 dos 172 estilos inline, os 12 keyframes e
   três fontes extras. Opções:
   a) retirar da entrega da Sprint 3 (fica numa branch) — **recomendo, pelo prazo**;
   b) reescrever em Tailwind (várias horas, risco de regressão);
   c) manter e aceitar a perda no 4b.

4. **Rota dinâmica.** Confirmo a estrutura sugerida por você:
   `/solucao` (4 Habilidades em Cards) e `/solucao/:id` com **id numérico 1–4** e `Number(id)`, dados em
   `public/data/habilidades.json`, `src/services/habilidades.ts`, `src/types/habilidade.ts`, effect com
   `AbortController` e os quatro estados. Falta decidir **o que fazer com EcoScore, Como Funciona e
   Trilha**: manter como páginas estáticas da solução ou consolidar tudo em `/solucao`.

5. **Conteúdo antigo** (3 classes com Jardinagem, 3 camadas, R$ 500 para o topo do ranking). Reescrever
   para o modelo das 4 Habilidades nesta entrega, ou deixar para depois e só trocar a terminologia
   proibida (Árvore de Habilidades, CO₂, moedas)?

6. **`lucide-react`.** Manter e declarar no README como biblioteca de ícones, ou trocar por SVG inline?

7. **Qual README o professor lê.** O zip precisa do `.git`, que está na raiz do monorepo, então o zip
   sai da raiz. **Proposta:** `frontend/README.md` completo no formato do Bloco 7 e o `README.md` raiz
   com seção Front-End apontando para ele e repetindo links de repositório e vídeo. O `README.md` raiz
   tem alterações suas não commitadas — preciso que você commite ou guarde antes de eu mexer.

8. **Versões.** **Proposta:** subir só o necessário (React 19, `react-router` 8, Tailwind 4 por plugin) e
   manter Vite 5 e TypeScript 5.9, que `@tailwindcss/vite` suporta. Subir para Vite 8 / TS 7 como nas
   apostilas aumenta o risco R3 sem ganhar ponto.
