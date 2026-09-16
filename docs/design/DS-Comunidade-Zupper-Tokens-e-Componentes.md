# Design System — Comunidade Zupper
**Tokens e Componentes · v3 · extraído do Figma "Zupper App"**
_Atualização v3 (16/jul/2026): (a) **componente `input` ganhou propriedades de label superior + texto de apoio inferior** (toggles boolean + texto) — ver 4.2; (b) **`search-field` ganhou variante "nenhum resultado encontrado"** — ver 4.2; (c) **limpeza de tokens no fluxo completo**: cores hardcoded vinculadas aos tokens locais (957 vínculos: 180 nos componentes + 777 nas telas) e **estilos de texto remotos do ZUKO ("App/…") remapeados para os locais** (210 nós) — só ícones ZUKO permanecem. Ver 2 e 5._
_Atualização v2 (10/jul/2026): gradientes de botão e de destaque padronizados e movidos para paint styles compartilhados (`Gradients/Button`, `Gradients/Destaques`); dívida 5.3 resolvida. Ver seção 3.4._
_Atualização v4 (20/jul/2026): iniciado o **módulo transacional / Pedidos** — criados `status-badge`, `notification` e `order-card`, e montada a tela de referência "Meus pedidos - 2.0". Ver **seção 8** (inclui backlog do que falta criar)._

> **Fonte oficial:** arquivo **Zupper App** (`CRJYlaF0ep3mKL5fwH3e31`). Componentes-mestre + coleções de variáveis (Primitives/Semantics) e text styles vivem na página **"⚙️ Componentes"** (`0:1`); o fluxo consome tudo por instância na página **"✅ Fluxo completo MVP"** (`377:24625`).
> Todos os valores abaixo foram lidos diretamente dos componentes-mestre do arquivo em 10/jul/2026. Em divergência com qualquer outro material (inclusive o PRD ou o ZUKO), **este documento e o Figma mandam**.
> O **ZUKO está descontinuado como fonte de verdade** — usar só como base para criar componentes novos, reconciliando com os tokens daqui.

---

## 0. Como ler este documento
- **Seção 1–3:** tokens (cores, tipografia, espaçamento/raio/sombra, gradientes/paint styles).
- **Seção 4:** inventário dos 20 componentes-mestre, com variantes, anatomia e tokens usados.
- **Seção 5:** dívida técnica de tokenização (o que está hardcoded e precisa virar token).
- **Seção 6:** divergências encontradas vs. PRD.
- Notação de token: uso o namespace tal como aparece no arquivo, ex. `text/primary`, `background/surface`, `color/mexico/50`. O valor entre parênteses é o **fallback literal** que está no componente.

---

## 1. Tokens de cor

### 1.1 Semânticos (em uso real nos componentes)
| Token | Valor | Onde aparece |
|---|---|---|
| `text/primary` | **#262626** | Nomes, títulos, rótulos primários |
| `text/secondary` | **#404040** | Corpo de texto, legendas, contadores |
| `text/muted` | **#a3a3a3** | Placeholders, estados inativos, metadados |
| `text/inverse` | **#ffffff** | Texto sobre botões/gradientes |
| `text/link` | **#0c4a6e** | "Fazer login" |
| `text/highlight` | **#008c99** | Aba/nav ativa, selo de oferta, CTA secundário, categoria selecionada |
| `background/surface` | **#ffffff** | Fundo de cards, inputs, tags |
| `border/default` | **#d4d4d4** | Borda padrão de cards/inputs/atalhos |
| `border/selected` | **#737373** | Input em foco (estado "typing") |
| `border/highlight` | **#78c8ce** | Estado selecionado (categoria, CTA secundário, community-cta viajante) |

### 1.2 Cores de marca / acento (primitives referenciados)
| Token | Valor | Nota |
|---|---|---|
| `color/brand/zupper` | **#008c99** | Teal principal da marca |
| `color/brand/kontrip` | **#25314d** | Azul-marinho (título community-cta) |
| `color/mexico/900` | **#4cbac7** | Teal claro — início dos gradientes |
| `color/mexico/50` | **#e5f5f7** | Teal muito claro — selo de oferta, fundo community-cta viajante |
| `color/accent/dubai/800` | **#2e2e2e** | Texto escuro (subtítulo community-cta) |
| `color/accent/dubai/100` | **#f5f5f5** | Fundo de tags de tipo (Dica/Foto/Roteiro) |
| `color/accent/dubai/50` | **#ffffff** | Branco nominal |
| `color/accent/madrid/400` | **#ffce00** | Amarelo — início gradiente Parceiro/Creator |
| `color/accent/madrid/50` | **#fefce8** | Amarelo claro — fundo community-cta parceiro |
| `color/accent/albania/600` | **#ea580c** | Laranja — fim gradiente Parceiro/Creator |
| `color/accent/albania/200` | **#fed7aa** | Laranja claro — borda community-cta parceiro |

### 1.3 Também usado no teal-brand secundário
- `#009daf` — teal "brand light". **Nos gradientes foi eliminado** (padronizado em #008c99, ver 3.4). Ainda aparece **cru como fill de texto** no "Dia N" do roteiro-card (ver dívida 5.5).

---

## 2. Tipografia

**Fonte:** Satoshi (Bold 700 / Medium 500 / Regular 400). Carrega via `loadFontAsync` no Zupper App.

### Text styles oficiais
| Style | Peso | Tamanho | Line-height | Uso |
|---|---|---|---|---|
| `heading` | Bold | 24px (`font-size/heading`) | 1.0 | Saudação do header |
| `body lg` | Bold | 18px | (100/normal) | Título de dia no roteiro-card |
| `body md` | Medium | 16px | 1.5 | Subtítulos, corpo, campos de busca |
| `body sm` | Regular | 14px (`font-size/body-sm`) | 1.2 | Corpo de card, inputs, abas |
| `caption` | Medium | 12px | 16px | Tags, metadados, contadores, timeline |

**Estilos de texto são 100% locais (16/jul/2026).** Os estilos remotos do ZUKO (`App/H1`, `App/H2`, `App/H4`, `App/Paragrafo LG`, `App/Botão LG/MD/SM`, `App/Links SM`) que apareciam no fluxo foram **remapeados para os locais** (210 nós, componentes + telas). Mapa aplicado:

| Estilo remoto ZUKO | Spec | → Local |
|---|---|---|
| `App/H1` (Bold 28) · `App/H2` (Bold 22) | heading grande | → `heading` (Bold 24) |
| `App/H4` (Bold 16) · `App/Botão LG` (Bold 16) | — | → `body lg` (Bold 18) |
| `App/Botão MD` (Bold 14) · `App/Paragrafo LG` (Medium 16) | rótulo de botão / parágrafo | → `body md` (Medium 16) |
| `App/Botão SM` (Medium 12) · `App/Links SM` (Medium 12) | — | → `caption` (Medium 12) |

Observações:
- **Escala local não tem Bold 28/22/16/14 nem Regular 12** — por isso o remap aproxima peso/tamanho (decisão do Caio: remapear para os existentes em vez de criar estilos novos). Se no futuro quiser fidelidade 1:1, criar esses estilos e re-remapear.
- **Restam estilos remotos** presos **dentro de componentes externos do ZUKO** que não dá para editar sem detachar; seguem a regra "só ícones/componentes ZUKO mantidos". _(O avatar do ZUKO — iniciais "HN" — deixou de ser exceção: foi substituído pelo componente local **avatar**, cujas iniciais usam Satoshi Bold 16 + `text/muted`.)_
- Título de card (nome do autor) usa Satoshi **Bold 14** com tracking 0.28px — não é um style nomeado, é aplicado direto.
- Preço em offer-card mistura Medium ("Voos a partir de") + Bold ("R$ 1.086") no mesmo parágrafo.
- **`input` label/apoio** usam fonte aplicada direto (label Satoshi **Bold 14**, apoio **Regular 12**) por não haver style local nesses pesos/tamanhos — ver 4.2.

---

## 3. Espaçamento, raio, sombra, gradientes

### 3.1 Espaçamento (tokens `spacing/*`)
Escala em uso: `spacing/4` (4), `spacing/8` (8), `spacing/12` (12), `spacing/16` (16), `spacing/24` (24). Escala completa herdada: 4/8/12/16/24/32/48/64/80/96.
Padding de card = 12px (post-card) ou 16px (roteiro-card, greeting-header, community-cta). **Inconsistente — ver dívida 5.**

### 3.2 Raio de canto (NÃO tokenizado — valores crus)
| Valor | Onde |
|---|---|
| 2px | Tags (tag-content, role-badge) |
| 4px | Cards de feed (post-card, destination-card) |
| 8px | Input, select-field, filter-chip, preview-rota |
| 12px | roteiro-card, scrollbar do select-field |
| 20px | Botão de busca (search-btn 40×40) |
| 24px | quick-action, offer-card |
| 28px | comment-input |
| 30px | Selo de oferta |
| 40px | Botões primários (button, float-button) |
| 100px | Avatar (pill) |
| `var(--spacing/96)` = 96px | search-field (pill) — **usa token de spacing como raio** |
| `var(--spacing/16)` = 16px | painel de respostas do search-field — idem |

### 3.3 Sombra
- **Float button / botões flutuantes:** `drop-shadow(0px 4px 2px rgba(23,23,23,0.2))`. Único uso de sombra no set; não tokenizado.

### 3.4 Gradientes / paint styles

**Paint styles compartilhados (OFICIAIS, criados no Zupper App em 10/jul/2026):**
| Style | Definição | Nós vinculados | Uso |
|---|---|---|---|
| `Gradients/Button` | linear `mexico/900 #4cbac7 → brand/zupper #008c99` | 50 | Botões primários (button), search-btn, comment-btn, float-button, botões do community-cta viajante, botão do offer-card |
| `Gradients/Destaques` | linear ~157° `madrid/400 #ffce00 → albania/600 #ea580c` | 19 | Tag "Parceiro", botões do community-cta parceiro, selo "Zupper Parceiro" (Minha conta) |

Ambos seguem a convenção de nomenclatura `Gradients/*` do ZUKO (descontinuado como fonte), com os **valores padronizados em uso no Zupper App** — não os valores legados do ZUKO. Qualquer ajuste futuro é feito no style, num lugar só, e propaga.

**Gradientes locais remanescentes (não são styles):**
| Nome | Definição | Uso |
|---|---|---|
| Overlay destination-card | linear preto 0% → `rgba(0,0,0,0.4)` (de 50%) | Legibilidade do nome sobre a foto — específico de cada card |
| Ilustração empty state | linear teal invertido `#008c99 → #4cbac7` | Detalhe decorativo da ilustração "Reservas vazias" — arte, não UI (normalizado de #009daf para #008c99) |

> **Resolvido (era dívida 5.3):** a duplicação do gradiente teal (`#009daf` vs `#008c99`) foi eliminada. Todo o teal de botão foi padronizado em `brand/zupper #008c99` e movido para o style `Gradients/Button`. Zero ocorrências de `#009daf` em gradiente no arquivo.

---

## 4. Inventário de componentes (21 componentes-mestre)

Todos residem na região de componentes do Zupper App (coords y ≈ -2032 a -1057). IDs são do arquivo `CRJYlaF0ep3mKL5fwH3e31`.

**Convenção de propriedades de variante (padronizada 17/jul/2026):** a propriedade genérica "Propriedade 1" foi renomeada em todos os sets para um nome semântico, com valores em kebab-case minúsculo. Padrão: **`tipo`** para tipo de conteúdo/perfil (post-card, tag-content, offer-card, community-cta, avatar, role-badge) · **`estado`** para estados de interação (input, like-button, social-bar, filter-chip, float-button, select-field, search-field, roteiro-card) · **`aba`** para barras de abas (bottom-nav, content-tabs) · **`tipo` por contexto** no greeting-header. Renomear propriedade/valor **não quebra instâncias** (validado nas telas do Fluxo). Exceção mantida: **`button`** segue com `Hierarchy` / `State` / `Size` (kit-base em inglês, coerente internamente).

### 4.1 Átomos / tags

**avatar** · `505:6004` — component set (17/jul/2026)
Avatar circular do usuário, `raio 100`, imagem `CROP`. Variantes `tipo`: **viajante** (foto masculina de exemplo) · **parceiro** (foto feminina de exemplo) · **placeholder** (sem foto: fundo `background/surface` + iniciais `text/muted`, Satoshi Bold 16; propriedade de texto `iniciais`, default "HN"). Redimensionável por instância — usado a 28px em post-card e 44/64px em greeting-header. **Substituiu os avatares soltos** (ellipse/frame com imagens empilhadas por visibilidade) desses dois componentes; a instância de `Avatar` externa do ZUKO que restava no greeting-header foi removida.

**role-badge** · `110:5902` — component set
Selo de perfil = sinal visual da **régua de permissão** ("só publica quem viajou"), ao lado do nome do autor. Variantes `tipo`: **default** ("Visitante", fundo `background/surface`, texto `text/primary` — deslogado/sem viagem, só navega) · **viajante** ("Viajante", fundo `color/mexico/200`, texto `text/highlight` — compra verificada) · **parceiro** ("Parceiro", gradiente `Gradients/Destaques` madrid/400→albania/600, texto `text/inverse` — creator sem barreira). Padding 8×4, raio 2px, `caption`.

**tag-content** · `116:6210` — component set
Pílula de tipo de conteúdo. Variantes: **dica** (ícone lâmpada) · **foto** (ícone imagem) · **roteiro** (ícone mapa). Fundo `color/accent/dubai/100` (#f5f5f5), texto `text/primary`, ícone 14px, padding 8×4, raio 2px, `caption`.

**like-button** · `116:6284` — component
Ícone de curtida 16px + contador ("00") em `text/secondary`, `caption`. Gap 4px.

**location** · `116:6259` — symbol/set
Pin 16px + nome do local em `text/secondary`, `caption`, altura 18px, gap 4px.

**filter-chip** · `148:9919` — component set
Chip de categoria do composer. Variantes: **default** (borda `border/default`, texto `text/muted`, Regular) · **selected** (borda `border/highlight` #78c8ce, texto `text/highlight` #008c99, Bold). Raio 8px, `body sm`.

### 4.2 Botões e campos

**button** · `168:6165` — component set
Botão. **Sincronizado com o código** (props em inglês): `Hierarchy` (Primary/Secondary/Ghost/Danger) × `State` (Default/Loading/Disabled) × `Size` (Large/Small) + booleans `iconLeading`/`iconTrailing`. Primary = gradiente `#4cbac7→#009daf` + `text/inverse`; Disabled = `background/surface` + borda `border/default` + `text/muted` (✅ idêntico ao código); Danger = `feedback/danger` + branco; Secondary = borda + texto teal. Padding 12px, raio 40px (código usa `pill`/999 — visualmente equivalente nessas alturas). ⚠️ verificar cor real do Secondary (código usa #009daf; este doc antes citava #78c8ce/#008c99) e alinhar raio. Ver §9 para a comparação completa com o Storybook.

**float-button** · `118:8134` — component set
FAB de publicação. Variantes: **default** (botão único "Publicar" + ícone) · **open** (leque: Dica / Foto / Roteiro + botão de fechar). Gradiente `#4cbac7→#009daf`, raio 40px, `drop-shadow 0px 4px 2px rgba(23,23,23,.2)`, gap 16px, padding lateral 24px.

**input** · `154:10587` — component set
Campo de texto. Variantes (`estado`): **default** (borda `border/default`, placeholder `text/muted`) · **typing** (borda `border/selected` #737373) · **filled** (texto `text/secondary`) · **error** (borda/fundo `feedback/danger`/`feedback/danger-bg`, texto vermelho). Padding 8×12, raio 8px, `body sm`.
**Label superior + texto de apoio inferior (16/jul/2026).** Cada variante virou um container **vertical** `[label] + [campo] + [apoio]` (gap `spacing/4`), com 4 propriedades de componente:
- **`Mostrar label`** (boolean, default **false**) — controla a visibilidade do label superior.
- **`Mostrar apoio`** (boolean, default **false**) — controla a visibilidade do texto de apoio inferior.
- **`Label`** (texto, default "Rótulo") — Satoshi **Bold 14**, `text/primary`.
- **`Texto de apoio`** (texto, default "Texto de apoio") — Satoshi **Regular 12**, `text/muted`; na variante **Error** o apoio é `feedback/danger-text` (mensagem de erro).
- Defaults desligados = **as instâncias existentes não mudam** (só o campo, 41px). As propriedades de texto são condicionais (aparecem no painel quando o boolean está ligado). Fonte aplicada direta (não há style local Bold 14 / Regular 12).

**select-field** · `148:10003` — component set
Seletor de cidade. Variantes: **default** ("Selecione a cidade", `text/muted` + seta) · **open** (h 218px, lista com divisórias + scrollbar `#d4d4d4` raio 12px; primeiro item "cidade de residência") · **selected** ("Recife, PE", `text/secondary` Bold). Borda `border/default`, raio 8px.

**search-field** · `110:6141` — component set
Busca de destino. Variantes (`estado`): **padrao** ("Qual seu destino?") · **procurando** (com painel de sugestões abaixo) · **sem-resultado** (16/jul/2026 — feedback para termo sem destino correspondente; a busca só aceita destinos existentes, decisão PRD 8.12). Input h 56px, pill (`var(--spacing/96)` = 96px), ícone global 24px + search-btn 40×40 (gradiente `#4cbac7→#009daf`, raio 20px). Texto `text/secondary`, `body md`. Painel de respostas: raio `var(--spacing/16)`.

**comment-input** · `140:8532` — component
Campo de comentário. Placeholder "Escreva um comentário…" (`text/muted`, 16px) + botão de envio 40×40 (gradiente `#4cbac7→#009daf`, raio 20px). Borda `border/default`, h 56px, raio 28px.

### 4.3 Navegação e barras

**bottom-nav** · `118:10994` — component set
4 abas: **Início · Reservar · Pedidos · Conta**. Ativo = `text/highlight` (#008c99) + Satoshi Bold; inativos = `text/primary` Medium. Ícones 24px, `caption`, fundo branco, padding 20×16.
Propriedade **`aba`** (renomeada de "Propriedade 1", 17/jul/2026) = aba ativa: `inicio` · `reservar` · `pedidos` (era "Variante 4") · `conta` (era "Variante 5") + `default`.
Anotações de dev: "Reservar" = mesmo fluxo de Buscar (só nome+ícone); Pedidos/Conta = fluxos atuais.
⚠️ **Dívida:** (1) `default` é redundante com `inicio` (ambos = Início ativo) — considerar unificar. (2) O label **"Início" está sempre `text/highlight`** em todas as variantes (deveria ser `text/primary` quando a aba ativa não é Início) — corrigir a cor por variante.

**social-bar** · `140:8379` — component set
Barra de interação do conteúdo. Variantes: **default** · **curtido**. Curtir (ícone + "00") · Comentar (ícone + "00") · Compartilhar · overflow (more-horizontal). Contadores em `text/secondary` Bold 14, ícones 24px, gap 24px, h 52px.

**content-tabs** · `118:8193` — component set (7 variantes)
Abas de filtro de conteúdo (formatos: Ver tudo / Fotos / Dicas / Roteiros). Dois eixos: `aba` (Fotos/Dicas/Roteiros/VerTudo) × `verTudo` (false/true). Uso: **Detalhe do destino** → verTudo=true; **Perfil** → verTudo=false. Ativo = teal (#008c99) Bold + underline ~1.95px; inativo = cinza (#a3a3a3) Regular. Borda superior `border/default`, h 48px.
⚠️ **Nome no código diverge:** no Storybook este componente está como **`ProfileTabs`** (organisms). Como ele são as abas de conteúdo (usadas no Detalhe do destino e no Perfil), recomenda-se renomear no código para **`ContentTabs`** para casar com o Figma (`content-tabs`).
⚠️ Cor ativa e underline estão **hardcoded** (#008c99), não tokenizados.
⚠️ **Não padronizado (pendente):** os valores de `aba` estão capitalizados (Fotos/Dicas/Roteiros/**VerTudo**) e há redundância entre o valor `aba=VerTudo` e o boolean `verTudo` — a estrutura de 2 eixos precisa ser revista antes de renomear (risco de quebrar a lógica de matriz). Não tocado na padronização de 17/jul/2026.

### 4.4 Cards de conteúdo

**post-card** · `116:6315` — component set (card central do feed)
Estrutura: `autor/header` (instância de **avatar** 28px + nome Bold 14 + ícone verificado + tag de perfil) · texto/título · mídia opcional · `footer` (tag-content + location + like-button). Fundo `background/surface`, borda `border/default`, raio 4px, padding 12px, gap 12px.
- Formato **Foto:** imagem grande no corpo.
- Formato **Dica:** só texto.
- Formato **Roteiro:** título Bold + `preview-rota` (borda `border/default`, raio 8px, bolinhas teal + paradas "Marco Zero → Boa Viagem → Olinda", última "+12 paradas" em `text/muted`).
- Subcomponentes internos: `TagComunidade` (default/parceiro), `TagContent` (dica/foto/roteiro), `Likes`.
⚠️ Título do roteiro usa `#404040` **cru**; raio 4px cru.

**destination-card** · `116:6131` — symbol
Card 130×150 com foto de fundo + overlay gradiente preto (0→0.4) + nome do destino (branco, Bold 16, `body md`) no rodapé. Raio 4px. Usado em "Destinos em alta".

**offer-card** · `123:12490` — component set (3 variantes)
Card de aquisição no hub do destino. Variantes: **passagens** ("Voos a partir de R$ 1.086") · **hospedagens** ("Diárias a partir de R$ 390") · **pacotes** ("Pacotes a partir de R$ 3.626"). Selo teal (`color/mexico/50` fundo + `text/highlight` texto, raio 30px) · preço (`body md`) · data (`text/muted` + ícone calendário) · botão (gradiente `mexico/900→brand/zupper`, raio 40px). Card w 173px, borda `border/default`, raio 24px.

**roteiro-card** · `168:7309` (component set, 2 variantes) · **roteiro-card-edit** · `155:5998` (standalone da versão editável)
Timeline de um dia do roteiro. Variantes do set: **default** · **editar** (adiciona ícone de edição no cabeçalho do dia). Cabeçalho "Dia N. [título]" (Dia em `#009daf` cru + título `text/primary`, `body lg` Bold 18, divisória inferior `#e5e7eb` cru). Paradas em sequência: período (MANHÃ/TARDE/NOITE em `text/muted` `caption`) + lugar (Bold 14 `text/primary`) + nota (`text/secondary` `caption`), conector vertical à esquerda. Fundo `background/surface`, borda `border/default`, raio 12px, padding 16px, gap 16px.
⚠️ "Dia N" #009daf e divisória #e5e7eb estão **crus** (o #e5e7eb sequer pertence à paleta dubai).

**community-cta** · `22:7677` — component set (versão OFICIAL, atualizada)
CTA contextual no topo do feed. Variantes `tipo`: **viajante** (fundo `color/mexico/50` #e5f5f7, borda `border/highlight` #78c8ce, título "Bem-vindo de volta do Recife!" em `color/brand/kontrip` #25314d) · **parceiro** (fundo `madrid/50` #fefce8, borda `albania/200` #fed7aa, título "Sua audiência quer te ver viajando"). Subtítulo em `dubai/800`, `body sm`. **Três botões** (Dica / Foto / Roteiro) com gradiente por tipo (viajante = teal `mexico/900→brand/zupper`; parceiro = `madrid/400→albania/600`), raio 40px. Card w 350px, raio 4px, padding 16px, gap 24px.
⚠️ Diverge do PRD (ver seção 6): esta versão usa "Zupper Parceiro", 3 botões por formato (não um só "Compartilhar experiência"), textos diferentes, e vive no Zupper App (não no arquivo legado).

### 4.5 Blocos de layout auxiliares (não component set, mas recorrentes)
- **quick-action** · `116:5998` (symbol): atalho quadrado 111×100 (Buscar Voos / Hospedagens / Pacotes), ícone 48px + rótulo Bold 12, borda `border/default`, raio 24px.
- **greeting-header** · `110:5883`: header de saudação/identificação — instância de **avatar** 64px na Home (44px em publicacao/conta; `placeholder`/iniciais em home-deslogado) + saudação (`heading` + `body md`) + coluna de tag/CTA/ação. Propriedade **`tipo`** (renomeada de "Propriedade 1", 17/jul/2026) com valores por contexto: `home-deslogado` · `home-viajante` · `home-parceiro` (headers da Home) · `publicacao` (topo das publicações) · `conta-bloquear` · `conta-desbloquear` (lista de contas bloqueadas em Minha conta).

---

## 5. Dívida de tokenização (a resolver no próprio Zupper App)

> **Limpeza executada (16/jul/2026):** varredura + binding de cores no fluxo completo e nos componentes — **957 vínculos** (180 componentes + 777 telas). Cores hardcoded que batiam (exato ou próximo) com um token local foram vinculadas de forma role-aware (`text/*`, `icon/*`, `background|action|feedback/*`, `border/*`). Estilos de texto remotos do ZUKO remapeados para locais (210 nós — ver seção 2). Isso **fecha em grande parte os itens 4 e 5 abaixo** no fluxo. **Restam sem token** (fora da paleta, deixados como estavam para avaliação): `#e5e7eb`, `#ebebeb`, `#d6d8e0`, `#d9d9d9` (cinzas — skeletons/placeholder de imagem), `#000000` (glifo "+"), `#8a38f5` (roxo — marcação de component set), `#444444` (fundo de seção). Candidatos a virar tokens neutros novos, se o time quiser padronizar.

Prioridade alta (impactam consistência visual e futura publicação de tokens):
1. **Raio sem token:** 12 valores distintos crus (2/4/8/12/20/24/28/30/40/100 + spacing-as-radius). Definir régua oficial (ex. `radius/tag` 2, `radius/card` 4, `radius/field` 8, `radius/pill` 40/100) e aplicar.
2. **search-field e painel usam `spacing/96` e `spacing/16` como raio.** Semântica errada — criar token de raio próprio.
3. ~~**Gradiente teal duplicado**~~ ✅ **RESOLVIDO (10/jul/2026):** padronizado em `mexico/900 #4cbac7 → brand/zupper #008c99` e movido para o paint style compartilhado `Gradients/Button` (50 nós). O gradiente Parceiro/Creator também virou style `Gradients/Destaques` (19 nós). Zero `#009daf` em gradiente restante.
4. ~~**Teal ativo hardcoded**~~ ✅ **RESOLVIDO (21/jul/2026):** o underline do content-tabs (6 vetores `#009daf` crus) foi vinculado a `text/highlight`; os labels ativos do bottom-nav já usavam `text/highlight`.
5. **Hex fora de paleta:** roteiro-card usa `#e5e7eb` (divisória) e `#009daf` ("Dia N", fill de **texto** — não é gradiente, segue cru) ainda por tokenizar; post-card usa `#404040` cru no título do roteiro. Trocar por tokens (ex. "Dia N" → `text/highlight` #008c99).
6. **Padding de card inconsistente:** 12px (post-card) vs 16px (roteiro-card, community-cta, greeting-header). Definir `card-padding` oficial.
7. **Namespace:** confirmar padronização `background/surface` / `border/*` / `text/*` / `color/*` — não misturar com nomenclatura antiga do ZUKO (`bg/surface`).
8. **Iconografia:** "Iconografia Padrão - Zupper" aparece achatada como paths SVG nas telas; confirmar se está publicada como biblioteca de componentes para permitir troca centralizada.

Prioridade média:
9. **Sombra sem token:** `drop-shadow 0px 4px 2px rgba(23,23,23,.2)` só no float-button — criar `shadow/float` se for reutilizar.
10. **Feedback (success/danger/warning/info):** não encontrei tokens de feedback aplicados nos 20 componentes; as telas de moderação (banner amber/vermelho) provavelmente usam cor crua. Verificar e tokenizar ao desenhar HD.5/HD.6.

---

## 6. Divergências vs. PRD (para o Caio atualizar o PRD)

1. **community-cta:** o PRD (seção 6) descreve versão legada no arquivo "Zupper Comunidades" com **um** botão "Compartilhar experiência", cores #e0f5f7/#00aeb1 (viajante) e #fef3dc/#fbbc00 (parceiro), e usa "Creator Zupper". A versão **oficial no Zupper App** tem: **três** botões (Dica/Foto/Roteiro), cores `mexico/50`+`border/highlight` (viajante) e `madrid/50`+`albania/200` (parceiro), título em `kontrip`, e nomenclatura "Zupper Parceiro". → Atualizar PRD para a versão do Zupper App.
2. **Tokens de texto:** confirmado que `text/primary`=#262626 e `text/secondary`=#404040 (não os valores dubai-600/500 do ZUKO que o PRD antigo citava). Já corrigido na v3 do PRD.
3. **Tokens novos não documentados no PRD:** `border/selected` (#737373), `border/highlight` (#78c8ce), `color/mexico/50` (#e5f5f7), `color/mexico/900` (#4cbac7), `color/accent/madrid/50`, `color/accent/albania/200`, `color/brand/kontrip`. Incorporados aqui.
4. **offer-card** tem 3 variantes reais (passagens/hospedagens/pacotes) com preços e gradiente teal próprios — o PRD só menciona "as melhores ofertas" genericamente.
5. **roteiro-card** tem variante **editar** (não só default) — relevante para as histórias HD.1 (editar publicação) e H4.3 (publicar roteiro).

---

## 7. Índice rápido de IDs (Zupper App)
```
role-badge         110:5902     post-card           116:6315
tag-content        116:6210     destination-card    116:6131
like-button        116:6284     offer-card          123:12490
location           116:6259     roteiro-card        168:7309
filter-chip        148:9919     roteiro-card-edit   155:5998
button             168:6165     community-cta       22:7677
float-button       118:8134     bottom-nav          118:10994
input              154:10587    social-bar          140:8379
select-field       148:10003    content-tabs        118:8193
search-field       110:6141     quick-action        116:5998
comment-input      140:8532     greeting-header     110:5883
avatar             505:6004
--- módulo transacional / pedidos (novos, 20/jul/2026) ---
status-badge       548:5998     notification        549:6012
order-card         554:6084
--- fluxo de reserva / voos (novos, 21/jul/2026) ---
product-tabs       894:814      recent-search-item  914:782
--- ícones locais de formulário (novos, 04/ago/2026, de ZUKO via SVG) ---
mail 989:795  phone 988:794  credit-card 988:800  building 988:807  document 990:794
(todos na SECTION "Ícones - Zupper" 694:624)
--- primitivos (novos, 05/ago/2026, para aposentar legados App) ---
toggle 1219:914   list-item 1220:910
--- ícone novo (05/ago/2026, de ZUKO Variant85 via SVG) ---
biometria 1242:7583  (escudo+cadeado; na SECTION "Ícones - Zupper" 694:624)
```

---

## 8. Módulo transacional / Pedidos (iniciado 20/jul/2026)

Ao aplicar o DS às telas **"Meus pedidos - Logado"** (`538:735`) e **"Detalhes Pedido"** (`538:757`) descobrimos que **elas estavam 100% construídas sobre a biblioteca legada (App/ZUKO)** — todos os instances `remote:true`, cores em `Accents/Dubai`, `Primary/Brand Zupper`, `Secundary/Mexico`, `Greyscale/Black Key` e estilos `App/… - App`. Nenhum token semântico do 2.0. Além disso, o DS 2.0 é inteiramente de **comunidade** e **não cobria o domínio de pedidos**.

### 8.1 O que foi criado no DS (fonte: página ⚙️ Componentes)
- **status-badge** · `548:5998` — selo de status de pedido. Variantes `status=emitido` (feedback/success), `andamento` (feedback/warning), `cancelado` (feedback/danger). Texto `caption` CAPS, bg `feedback/*-bg` + texto `feedback/*-text`. Primeiro componente do arquivo a **aplicar de fato os tokens de feedback** (fecha parte da dívida 5.10). Código sugerido: `StatusBadge`.
- **notification** · `549:6012` — faixa de alerta. Variantes `tipo=danger|warning|info|success` (bg `feedback/{tipo}`, texto/ícone `text-inverse`; warning usa `feedback/warning-text` p/ contraste). Propriedade `mensagem` (TEXT). **Ícone é placeholder** (círculo + "!") — trocar pelo ícone ZUKO correspondente. Código sugerido: `Notification`.
- **order-card** · `554:6084` — card de pedido da lista. Variantes `status=emitido|andamento|cancelado` (define cor do accent lateral, o `status-badge` e a presença do `notification`). Compõe `status-badge` + `notification`. **Placeholders:** ícone de voo (triângulo) e thumb (retângulo cinza) — trocar por ícone ZUKO "Icon voo ida" e imagem real. Código sugerido: `OrderCard`.

### 8.2 Tela de referência
- **"Meus pedidos - 2.0"** montada na página **"Ajustes"** (ao lado da original `538:735`), 100% com componentes locais + tokens: header (`heading` + `button` Secondary/Small "Filtrar"), `filter-chip` ×3, `search-field`, contador `body sm`, `order-card` ×3 e `bottom-nav` (`aba=pedidos`). Serve de gabarito para portar a original.

### 8.3 Backlog — o que o DS ainda NÃO cobre (a criar antes de portar as telas)
1. **app-bar / page-header** — cabeçalho com back + título + ação (o `greeting-header` é de comunidade, não serve). Usado nas duas telas.
2. **filter-chip com checkbox** — o filtro Emitidos/Em andamento/Cancelados no legado é chip **com caixa de seleção**; o `filter-chip` atual não tem essa variante. Criar variante `com-checkbox` ou componente próprio.
3. **Tela Detalhes Pedido (`538:757`, 4749px) — nenhum componente existe:**
   - **flight-leg / itinerary-row** (IDA/VOLTA: horários, aeroportos, duração, escalas, cia aérea)
   - **baggage-row** (bagagem incluída/adicional)
   - **price-summary-row / payment-breakdown** (subtotal, taxas, total)
   - **traveler-row** (lista de viajantes)
   - **divider** (separador tokenizado — hoje linhas cruas)
   - blocos de "Informações importantes" / políticas (texto `body sm`)
4. **Ícones do domínio de pedidos** (voo ida/volta, danger, info, checkbox) — hoje ZUKO remoto; manter os ícones ZUKO (governança) mas garantir instância local/publicada.
5. **Tokens de raio** (dívida 5.1/5.2) — os novos componentes usaram raio cru (6/8/12) por falta de régua oficial.
6. **Lacunas de tipografia:** as telas legadas usam `App/H2` (22px) e `App/Botão LG` (16px bold) sem par exato local (`heading` 24 / `body lg` 18). Avaliar se criam-se degraus intermediários.

---

## 9. Reconciliação com o código — Storybook `@kodes-tech` (auditoria 21/jul/2026)

Comparação do Storybook (`storybook-ds-…run.app`, pacotes `@kodes-tech/tokens` · `ui-native` · `icons`) contra o Zupper App. **Leitura macro:** o **código é um kit de primitivos/fundação**; o **Figma 2.0 é o catálogo de componentes de feature/comunidade**. Eles se sobrepõem na camada de primitivos, mas cada lado tem um conjunto exclusivo grande.

### 9.1 Cobertura de componentes
- **Em ambos (7):** `avatar`, `button` (o mais alinhado — mesma API Hierarchy/State/Size/icon), `input`, `select-field`, `filter-chip`, `role-badge`↔RoleBadge, `bottom-nav`.
- **Só no código (13):** `AvatarFallback` (iniciais separadas do avatar), `Badge` (pill genérico Neutral/Brand/Partner), `Divider`, `PhotoGrid`, `RadioOption`, `Textarea`, `StatusBanner`, `SheetOption`, `ConfirmDialog`, `BottomSheet`, `ScreenHeader`, `Text`, `Icon` (68 ícones do pacote próprio). São primitivos utilitários + padrões de moderação/overlay que no Figma só existem como composições de tela.
- **Só no Figma (~15):** `post-card`, `offer-card`, `destination-card`, `roteiro-card`/`-edit`, `community-cta`, `like-button`, `social-bar`, `location`, `content-tabs`, `quick-action`, `comment-input`, `search-field`, `float-button`, `greeting-header`, `tag-content` + módulo pedidos (`order-card`, `status-badge`, `notification`). São os componentes de feature da comunidade/transacional.

### 9.2 Tokens — valores muito próximos, nomenclatura divergente
- **Cores:** ~95% dos hexadecimais são idênticos, mas o código usa **nomes por papel** (`brand.*`, `partner.*`, `text.*`, `surface.*`, `border.*`, `feedback.*`) e o Figma usa `text/背景/border` **+ primitivas por cidade** (`mexico/madrid/albania/dubai/kontrip`, herança ZUKO). Handoff exige mapa de tradução. Ex. de equivalência: `brand.base`=`mexico/900` #4CBAC7 · `brand.strong`=`text/highlight`=`brand/zupper` #008C99 · `surface.tag`=`dubai/100` #F5F5F5 · `text.heading`=`kontrip` #25314D.
- **Tokens só-código** (candidatos a criar no Figma): `brand.chipSurface` #D8FCFE (fundo do role-badge viajante), `brand.connectorLine` #BAF2F5 (conector do roteiro), `border.subtle` #EFEFEF, `text.label` #1C1C1A.
- **Feedback: alinhado** ✅ — `danger` #EF4444 / `dangerSurface` #FEE2E2 / `dangerStrong` #B91C1C confirmados nos dois (StatusBanner ↔ `status-badge`/`notification`). Fecha a antiga dívida 5.10.
- **Spacing:** código = t-shirt (`xxs`2…`xxxl`32 + `screenMargin`20); Figma = por valor (`spacing/4…96`). Compartilham 4/8/12/16/24/32. Código tem 2/6/20; Figma tem 48/64/80/96.
- **Radii:** código **tokenizado** (`none`0/`xs`2/`sm`4/`md`8/`lg`12/`xl`16/`xxl`24/`pill`999); Figma **cru** (2/4/8/12/20/28/30/40/100). Os raios 20/28/30/40 do Figma não existem na escala do código. `pill`999 ↔ avatar 100. → reforça a dívida 5.1 (tokenizar raio) e sugere adotar a escala do código.
- **Elevation:** código tem escala de 4 níveis (`none/low/medium/high` = shadows 0/1/3/6); Figma tem 1 sombra ad-hoc (float-button). → adotar a escala do código (dívida 5.9).
- **Tipografia:** fonte Satoshi nos dois ✅. `heading`(24/700), `caption`(12/500) e `body sm`≈`bodyText`(14/400) batem. Código tem **~15 variants semânticos** (authorName, cardTitle, inputLabel, buttonLabel, avatarFallback…) contra **5 text styles** no Figma. Divergências: **line-height do body md** (Figma 1.5 vs código lh16) e **título de roteiro** (Figma `body lg` 18 vs código `roteiroTitle` 14). Tamanhos **13px** e **15px** (SheetOption) do código não existem na escala do Figma; **18px** do Figma não existe no código.

### 9.3 Divergências de componente a decidir (qual lado é a fonte)
1. **Borda default de campos/chips:** código **#EFEFEF** (`border.subtle`) × Figma **#D4D4D4** (`border/default`) — aparece em input, filter-chip, etc.
2. **Input erro:** código só borda vermelha (fundo branco) × Figma preenche com `feedback/danger-bg`.
3. **Label do input:** código #1C1C1A (`text.label`) × Figma #262626 (`text/primary`).
4. **FilterChip:** peso Medium (código) × Bold/Regular (Figma); borda selected #008C99 (código) × #78C8CE (Figma).
5. **Button:** raio `pill`(999) × Figma 40; Secondary teal #009DAF (código) × doc do Figma cita #78C8CE/#008C99 — **verificar valor real no `button` do Figma** (que já parece sincronizado com o código).
6. **Avatar:** código separa `Avatar`(imagem)+`AvatarFallback`(iniciais, fonte escala com o tamanho: 64→16/44→~11/28→7) × Figma junta num set `tipo` com iniciais fixas 16px. Tamanhos 28/44/64 batem (Small/Medium/Large).
7. **BottomNav:** código suporta 4 **ou 5** abas + "sem ativo"; Figma fixo em 4 (e com bug do "Início" sempre destacado).

### 9.4 Bugs no build do Storybook (bloqueiam comparação e são defeito real do repo)
- **`Icon Size`, `SelectField`, `BottomNav`, `BottomSheet`** — falham com `Cannot read properties of undefined (reading 'lg'|'xs')` (acesso a chave de token ausente no build publicado).
- **`ScreenHeader`** — falha por faltar `<SafeAreaProvider>` (decorator ausente na config do Storybook).

### 9.5 Ações de reconciliação sugeridas
1. Definir um **mapa de tradução de cores** código↔Figma (role names ↔ city primitives) — pré-requisito para Code Connect.
2. **Tokenizar radii e elevation no Figma** adotando a escala do código (fecha dívidas 5.1/5.9).
3. Decidir a fonte das **7 divergências de componente** (9.3) e alinhar.
4. Corrigir os **5 stories quebrados** no Storybook.
5. Avaliar criar no Figma os primitivos só-código relevantes (`Divider` tokenizado, `Textarea`, `StatusBanner`, `SheetOption`, `ConfirmDialog`, `BottomSheet`, `ScreenHeader`) e no código os componentes de feature só-Figma quando forem implementados.
6. Reconciliar **nomes de variante**: código usa inglês (Guest/Traveler/Partner, Hierarchy/State/Size) e Figma pt (`tipo`, `estado`, `aba`) — alinhar para o Code Connect bater 1:1.

### 9.6 Execução — 1ª rodada aditiva (21/jul/2026)
Aplicado no Figma de forma **100% aditiva** (nada sobrescrito; baseline preservado na versão nomeada do histórico + changelog na página "🚧 Atualizações", frame `621:6509`):
- **Raio** — criados em `Primitives`: `radius/none|xs|sm|md|lg|xl|xxl|pill` = 0/2/4/8/12/16/24/999 (escopo corner radius).
- **Elevação** — criados os effect styles `Elevation/Low|Medium|High` (0·1·2/14% · 0·3·6/18% · 0·6·12/24%).
- **Cor semântica** — criados em `Semantics` 15 tokens como **alias** de primitivas existentes: `brand/base|strong|border-highlight|chip-surface|card-surface|connector-line`, `partner/surface|strong|card-surface|card-border`, `surface/tag`, `border/subtle`, ~~`text/heading|body|label`~~.
  - **Revertido (05/ago/2026):** `text/heading`, `text/body` e `text/label` foram **removidos** — eram definição legada; heading e body são sempre **`text/primary`**. Os 15 nós que os usavam (todos na página V0.2.0) foram rebindados para `text/primary` antes da exclusão (heading #25314D→#262626, body #2E2E2E→#262626, label já era #262626). Nenhum outro consumidor no arquivo.
  - **Consolidação de redundantes (05/ago/2026):** removidos `surface/tag` (= `background/background` #F5F5F5) e `brand/border-highlight` (= `border/highlight` #78C8CE) — eram aliases duplicados **sem nenhum consumidor** (criados e nunca aplicados). `icon/Danger` **renomeado para `icon/danger`** (padronização de caixa; mantido como token de papel de ícone). `brand/strong` (#008C99, sobrepõe action/primary) foi **mantido** por decisão. Demais brand/partner (hex único) permanecem. (Descoberta: os "só-código" já existiam como primitiva — chipSurface=`mexico/200`, connectorLine=`mexico/500`, border.subtle=`dubai/200`. Só #009DAF e #1C1C1A ficaram de fora — são os que o alinhamento substitui por #008C99 e #262626.)
- **2ª rodada (21/jul/2026) — vínculo de raio:** os raios crus dos componentes foram vinculados aos `radius/*` (73 nós). Mapa: 2→xs · 4→sm · 8→md · 12→lg · 24→xxl · 20/28/30/40/100→pill. Validado por screenshot (button/avatar sem distorção). **Fecha a dívida 5.1** (radii tokenizados) no nível dos componentes.
  - `status-badge` usava **6px** (off-scale) → snap para **`radius/md`** (8) nos 3 variants. Resta **1 nó com raio misto** (por-canto) não vinculado.
- **2ª rodada — hexes crus → token (polimento):**
  - `#404040` (título) e `#009daf` "Dia N" do roteiro **já estavam tokenizados** (`text/secondary` / `text/highlight`) — a dívida 5.5 estava desatualizada nesse ponto.
  - Divisória **`#e5e7eb`** → `border/subtle` no roteiro-card/-edit e no like-button/social-bar (2+2 nós).
  - Underline de aba ativa do **content-tabs**: 6 vetores `#009daf` crus → **`text/highlight`** (fecha a dívida 5.4). Validado por screenshot.
- **3ª rodada (21/jul/2026) — elevation + brand/partner:**
  - **Elevation:** float-button trocou a sombra bespoke (`0 4 2 .2`) pelo effect style **`Elevation/Medium`** (5 nós de sombra). Validado por screenshot. (Mudança visual leve, aprovada.)
  - **brand/partner:** 33 fills/strokes que usavam as primitivas foram reapontados para a camada semântica — `brand/strong` (22, era `brand/zupper`), `brand/card-surface` (4, `mexico/50`), `brand/connector-line` (4, `mexico/500`), `brand/chip-surface` (1, `mexico/200`), `partner/card-surface` (1), `partner/card-border` (1). **Value-preserving** (aliases resolvem para a mesma primitiva → zero mudança de pixel). `brand/base`, `partner/surface`, `partner/strong` seguem só em gradientes (paint styles), fora do alcance de SOLID.
  - **"Nó de raio misto"**: era um VECTOR (falso positivo — vetores reportam cornerRadius misto). Não havia retângulo real a corrigir.
- **Pendente (próximas rodadas):** resolver as 7 divergências de componente (§9.3) e corrigir as 5 stories quebradas no Storybook. Opcional: bind de `brand/base`/`partner/*` nos gradientes (stops de gradiente aceitam variável na API).

---

## 10. Fluxo de reserva / Voos (avaliação + componentização — 21/jul/2026)

Avaliação das telas do fluxo de reserva de passagens (página **"🚧 Atualizações"**, 17 telas; link base `686:11637`).

### 10.1 Estado geral
**Boa trajetória.** As telas mais novas (Buscar aeroporto, Resultado Loading/Sem resultados/Filtros/Comparativo, Escolha destino) nascem **100% tokenizadas** (0 `App/*`, 0 teal cru). A dívida se concentra nas **primeiras telas** e em blocos ainda não componentizados. Tokens novos já em uso: `radius/*` e `Elevation/*` (§9.6). Ícones começando a ser componentizados localmente (`pinmap`, `voo-ida`, `calendar-02`, `users`, `filter-vertical`).

### 10.2 Resíduos legados (por tela)
Dois resíduos recorrentes: estilos `App/Botão MD|SM - App` e o **teal errado `#009DAF`** (correto = `#008C99` = `action/primary`/`text/highlight`).

| Tela | `App/*` | `#009DAF` |
|---|---|---|
| Ida e volta / Preenchido | 23 cada | 8 cada |
| Selecione data (calendário) | 74 | 0 |
| Buscar aeroporto (791, 2529px) | 43 | 10 |
| Resultado – Detalhes (×2) | 2–4 | 3–4 |
| demais (aeroporto 771, resultados, comparativo) | 0 | 0 ✅ |

### 10.3 Item 1 — RESOLVIDO: `product-tabs` local
- **product-tabs** · `894:814` — abas de produto (Voos/Hotéis/Pacotes) do header. Variantes `aba=voos|hospedagens|pacotes`. 3 itens iguais (FILL): ícone ZUKO 20 (mantido, importado por key + tingido `icon/highlight`/`icon/muted`) + label `body sm` + underline. Ativo: `text/highlight` + `action/primary`; inativo: `text/secondary` + `icon/muted`. Substitui o header **raw** (que usava `App/Botão MD` + underline `#009DAF` cru). Código sugerido: `ProductTabs`.
- **Swap aplicado** nas 2 telas onde as abas aparecem: **Ida e volta** (`686:11637`) e **Preenchido** (`771:20315`) — validado por screenshot. Elimina os 23 `App/*` + 8 `#009DAF` do header em cada.
- **Descoberta:** nas outras 12 telas a instância `Tabs` remota (`Tab Produto Oneway`) estava **oculta** — herdava `visible:false` do frame-pai `Top Nav Buscar Expandida` (estado alternativo de header, mantido escondido). Não é o header visível.
- **Limpeza aplicada (21/jul/2026):** as **12 instâncias `Tabs` legadas foram removidas** (remoção mínima com trava: só instância `Tabs` com pai oculto). Os frames `Top Nav Buscar Expandida` foram **preservados** (podem conter outro conteúdo daquele estado). Sem mudança visual (eram ocultas). Se esse estado alternativo voltar a ser usado, deve receber o `product-tabs` local, não o header legado.

### 10.4 Backlog do fluxo (itens 2–5 da avaliação)
2. ✅ **RESOLVIDO (21/jul/2026) — `recent-search-item`** · `914:782`. Card de "Pesquisas recentes": thumb 44 (`radius/md`, image fill) + `pinmap` (local) + local (`body md`, text/primary) + datas (`caption`, text/muted) + link "Pesquisar" (`caption`, text/link) + `arrow-right` (local). Props TEXT: `local`, `datas`. **Usa ícones locais** (pinmap/arrow-right), alinhado à direção de componentizar ícones. Os 3 cards visíveis (lista "produtos" `771:18568`) foram trocados por instâncias — validado. **Após o swap, a tela Ida e volta ficou com 0 teal `#009DAF` e só 2 `App/*` visíveis** (ambos no bloco SAC = item 3). **Pendente:** as 2 listas "Voo" **ocultas** (`771:18486`, `771:18512`) são duplicatas legadas com 18 `App/*` + 6 teal — candidatas a remoção (como as `Tabs` ocultas do §10.3).
3. **list-item (com ícone)** — hoje o legado remoto **`Inputs Atendimento`** (SAC "Central de ajuda"). No código já existe padrão equivalente → ver `SheetOption`/lista.
4. **Selecione data** — calendário 100% raw + 74 `App/*`. Retokenizar ou componentizar `date-picker`.
5. **flight-result-card** (oferta de voo, tela 791 com 304 nós default-named) e **airport-list-item** (linhas do Buscar aeroporto) — componentizar.
6. **Higiene:** o text style **`body md` está com font-size vinculado a `spacing/16`** (deveria ser `font size/body-md`). Nomenclatura de nós default (`Frame 76467`, `Grupo 11065`, `Retângulo 532`) e seções duplicadas (`sec-destinos` para "Top Ofertas" e "Novidades"). Régua de ícones (ZUKO publicado × locais) a decidir.

### 10.5 Ícones de formulário no `input` (04/ago/2026)
O componente **`input` (`154:10587`) já expõe um slot de ícone**: props `Mostrar ícone` (BOOLEAN) + `Ícone` (INSTANCE_SWAP, default `pinmap`). No form do fluxo (`981:5675`, 74 inputs) os campos pessoais/pagamento estavam usando **`pinmap` como placeholder** por falta dos ícones certos (e "Número do cartão" sem ícone).

**Criados 5 ícones locais** (importados do ZUKO `1587:7220` — HugeIcons, **UNPUBLISHED**, então transferidos via **export SVG → `createNodeFromSvg` → `createComponentFromNode`**, com stroke/fill vinculados a **`icon/muted`**, o mesmo token que o `pinmap` usa): `mail` `989:795` · `phone` `988:794` · `credit-card` `988:800` · `building` `988:807` · `document` `990:794`.

**Mapa campo → ícone** (reusa `user` `696:16769` e `calendar-02` `696:799` locais):
| Campo | Ícone | Campo | Ícone |
|---|---|---|---|
| Nome completo | user | Número do cartão | credit-card |
| E-mail | mail | Nome impresso no cartão | user |
| Contato | phone | Validade | calendar-02 |
| Primeiro nome | user | Razão social | building |
| Último sobrenome | user | CNPJ | document |
| Data de nascimento | calendar-02 | Inscrição municipal | document |
| CPF | document | | |

Showcase dos 13 campos montado na página ⚙️ Componentes (`991:790`) — cada campo é uma instância do `input` com o `Ícone` correto via INSTANCE_SWAP, validado por screenshot. Nota: `document` é reutilizado para CPF/CNPJ/Inscrição (são todos documentos); dá para diferenciar depois (ex.: `id-card` p/ CPF) se o time quiser.

**✅ Aplicado no form real (`981:5675`, 04/ago/2026):** dos 74 inputs, **39 casaram por label** e receberam o ícone certo + `Mostrar ícone`=true (verificado: 39 ok / 0 divergência). Casamento por label normalizado (sem acento), regras específicas antes de genéricas (`impresso`→user antes de `cartão`→credit-card). Os 35 restantes não foram tocados de propósito: endereço (CEP/Endereço/Número/Complemento/Cidade/Estado) e os inputs de busca com label "Rótulo" (que já usam pinmap/voo-ida/calendar/users). Validado por screenshot nas telas "Dados de contato" e "Dados do viajante".

### 10.7 Telas de estado criadas (04/ago/2026)
Criadas 5 variantes de estado que faltavam no fluxo, por **clone da tela mais próxima + adaptação** (tokens/componentes do DS preservados). **Já encaixadas na sequência** da section "Reservas - Passagem aérea" (`981:5675`): a fileira foi reordenada em 4 grupos (Busca → Resultados → Checkout → Confirmação, com respiro entre grupos) e a tela de destino, que estava fora de fileira, foi trazida para a linha. As 5 novas:
- **Voos - Só ida** `1012:5434` (de `686:11637`): chip `Só ida` selecionado + input "Data de ida".
- **Voos - Escolha seu destino - Buscar aeroporto - Resultados** `1012:5562` (de `771:20066`): título "Escolha sua cidade de destino".
- **Voos - Checkout - Oferta expirada** `1012:5743` (de `930:47499`): banner "Oferta expirada" + CTA "Refazer busca".
- **Voos - Checkout - Pagamento - Cartão recusado** `1012:5829` (de `930:63524`): `notification` danger no topo do body.
- **Voos - Confirmação de reserva - Pix - Pago** `1012:5950` (de `954:4984`): mensagem de sucesso "Pagamento confirmado".

**Ainda faltam** (UX nova, precisam de definição): Multidestinos, seleção de assento/bagagem extra, login/identificação, e o estado de destino "digitando" (só criei o de resultados).

### 10.9 Fluxo Hospedagens — migração legado → 2.0 (05/ago/2026)
Migração da section **"Hospedagens"** (`1355:24218`, 11 telas). Estava parcialmente no legado (App/ZUKO). Feito:
- **Tokens:** estilos `App/*` → locais (`heading`/`body lg`/`body md`/`body sm`/`caption`) — **~397 nós**; cores cruas → tokens atuais role-aware (migração de paleta: `#009DAF`→`#008C99`, cinzas Dubai → `text/secondary`·`text/muted`·`border/*`, `#44BA68`→`feedback/success`, etc.) — **~930 nós**. Validado (Home sem quebra).
- **Cinzas por contexto (06/ago/2026):** passe de "cinza cru → token mais próximo por papel" (texto→`text/*`, ícone→`icon/*`, stroke→`border/*`, fundo→`background/*`, por distância de cor) — **197 nós**. Cores não-cinza fora da paleta (`#0284C7`, `#141B34`) mantidas.
- **Componentes:** `Primary button - App` → `button` (**7**); `Inputs Atendimento` → `list-item` (**2**); `Pill filter icon button - App` → `filter-chip` (**5**, chips de avaliação) + `button` (**1**, "Filtrar"); `Inputs Origem - Default` → `input` (**1**, filled + ícone pinmap). Header de abas era frame **raw** (retokenizado, não precisou swap).
- **Limpeza:** **57 nós ocultos legados** removidos (Top Nav Buscar Expandida, inputs/atendimento ocultos, seções de passageiros copiadas do Voos, teclados, "Lista Pesquisa Recente (Voo)", etc.). Modais visíveis preservados.
- **Validado** por screenshot: Home, Filtro hotel (chips 1–5 + Aplicar filtro), Resultados (Filtrar + cards de hotel) — sem quebra. **Fluxo migrado.**

### 10.8 Fluxo Biometria — dívida atacada na raiz (05/ago/2026)
Revisão de tokens do fluxo **"🔒 Biometria — HI-FI (KSA-267)"** (`1197:6640`, 11 telas). Diagnóstico: a maior parte da cor crua **não era token faltando — era componente legado do app antigo**. Caminho escolhido: **criar os componentes 2.0 que faltavam e trocar os legados** (não só bindar).
- **85 binds seguros** de cor (exato + mesmo papel, zero mudança visual) em nós soltos.
- **`button` (existente):** trocados **16** `Primary button - App` → `button` Primary/Large (Default/Disabled), preservando label/estado/posição.
- **`toggle` (novo, `1219:914`):** criado (estado=off/on; off=`border/default`, on=`action/primary`, knob `background/surface`). Trocados **5** `Toggle button - App`.
- **`list-item` (novo, `1220:910`):** criado (ícone + título + subtítulo + status + ação + chevron; props TEXT/BOOLEAN; ícone swappável). Trocadas **8** linhas `Inputs Atendimento` do menu de conta, com **ícone local por linha** e **cor de status** (`feedback/success-text`=Completo, `warning-text`=Pendente). Aposenta o maior ofensor (era 192 paints crus).
- **Resultado:** os 3 grandes legados (`Inputs Atendimento`, `Primary button - App`, `Toggle button - App`) saíram do fluxo.

**Limpeza de legado oculto (05/ago/2026):** excluídos **42 nós ocultos de topo** (fora de instâncias) nas 11 telas — leftovers de telas copiadas (teclado iOS "Keyboard Alphabetic", seção de passageiros "Viajantes"/"Bebês", "Pesquisar"), "Top Nav Buscar Expandida", `Inputs Atendimento` ocultas, `Notification Alert` legada, "SAC" antigo e textos soltos. Isso **resolveu** os 5 buttons em branco (viviam nos "Pesquisar [hidden]") e as 4 `Inputs Atendimento` ocultas. Modais das telas 9/11 preservados (estavam visíveis). Zero mudança visual (validado).

**Pendências (follow-up):**
- **6 `Inputs Atendimento` visíveis** com variantes SAC (`Input Chat`/`WhatsApp`/`Ajuda`) sem texto extraível — provável lista de ajuda/contato; trocar por `list-item` quando o conteúdo estiver definido.
- **`list-item`**: a propriedade formal INSTANCE_SWAP do ícone falhou (key de componente local) — ícone fica swappável direto; dá pra formalizar depois. Ícones locais têm **fill branco no frame** (herança da biblioteca de ícones) — limpeza ampla separada.
- **Decisões ainda abertas** (não fazem parte do swap): `#000000` puro (395 nós) → `text/primary`/`icon/primary`; chrome iOS mantido cru.

### 10.6 Padronização da biblioteca de ícones (04/ago/2026)
A SECTION **"Ícones - Zupper" (`694:624`)** reúne agora **54 ícones locais** (24×24) — inclusos os 5 novos, movidos para o grid. Padronização aplicada **nos masters**:
- **Cor → `icon/muted`** por padrão em todos (antes ~48 tinham cor **hardcoded** sem token; `global` estava em `icon/highlight`). Vínculo role-aware em fills e strokes.
- **Traço → 1pt** em todos (antes havia 1.5, 2, 2.5 e 1.6 misturados).
- **Regra de segurança:** ajuste feito **só nos masters**. Instâncias nas telas com **cor sobrescrita (override) permanecem** (ex.: estados ativos teal de `product-tabs`/`bottom-nav`); instâncias que **herdavam** a cor passam a `icon/muted` (é a padronização desejada). Validado na tela Voos (`686:11637`): ativos seguem teal, demais ficaram muted. **Atenção:** `global` deixou de ser teal por padrão — se algum uso dependia disso por herança, aplicar override na tela.

> Nota: vários "gaps" do §8.3/§10.4 **já existem no código** (§9.1): `ScreenHeader` (↔ app-bar), `StatusBanner` (↔ notification), `Divider`, `Badge`. Ao componentizar no Figma, alinhar API/nome com esses para o Code Connect bater 1:1.
