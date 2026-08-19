# PRD — Comunidade Zupper (MVP)
**Documento de continuidade · v4 · para alimentar novos chats**
_Atualização v4 (16/jul/2026): fluxo completo consolidado na página **"✅ Fluxo completo MVP"** (12 seções); lacunas HD revisadas (várias fechadas ou resolvidas por design); decisões de escopo novas fechadas (ver seção 8, itens 10–16); limpeza de tokens executada no fluxo (cores hardcoded vinculadas aos tokens locais e estilos de texto remotos do ZUKO remapeados para os locais — só ícones ZUKO mantidos)._
_Atualização v3 (10/jul/2026): Zupper App definido como fonte oficial de componentes e tokens; ZUKO descontinuado como fonte de verdade (vira base/referência). Seções 4, 6, 7 e 8 revisadas com tokens extraídos direto do Zupper App._

## 0. Como usar este documento
Contexto completo do projeto de design/produto da Comunidade Zupper. Recomendado: salvar como arquivo no conhecimento de um Projeto Claude (não só nas instruções). Claude não tem memória entre conversas — o trabalho vive nos arquivos Figma e neste resumo. Ao abrir novo chat, forneça também os links/fileKeys do Figma para releitura das telas.

---

## 1. Contexto e escopo da iniciativa

**Empresa:** Zupper — e-commerce de viagens (voos, hotéis, pacotes). Trabalho de produto/design conduzido por Caio Chagas (Kodes Tech).

**Decisão tomada:** a comunidade será implementada **dentro do app oficial da Zupper** (não é app separado). Como consequência, **o time passa a ser responsável pelo app completo**, não só pela comunidade.

**Foco atual:** o time está avaliando todas as melhorias necessárias no app como um todo, mas a **entrega de MVP é a implementação da comunidade**, prevista para **outubro** (data provisória).

**Tese central:** conteúdo de quem viajou vende viagem melhor do que anúncio. Loop virtuoso: vê conteúdo real → confia → compra → viaja → compartilha → recompra. Dados de apoio: 51% confiam mais em UGC que em conteúdo de marca; Airbnb com UGC teve ~3x engajamento e ~−60% custo de produção; TripAdvisor (80M+ contribuições) e Google Local Guides provam o modelo conteúdo→transação.

**Diferencial competitivo:** só publica quem comprovadamente viajou (compra verificada) — credibilidade estrutural que review anônimo/rede social genérica não têm.

**Estado técnico (assessment):** implementação real vs. Figma ~34% na média. Comunidades ~15% (backend scaffold vazio), Chat 0%, Rating 20%, Backoffice 10%. A comunidade é frente praticamente nova — por isso o épico Jira é "Discovery & Design antes de abrir implementação".

**Marca:** mascote pássaro teal "Brasileirando 2026". Todo conteúdo deve responder a pelo menos uma: ajuda a viajar melhor? entende o jeito brasileiro? reduz dúvida/medo/esforço? cria identificação?

**Métrica-âncora de sucesso:** taxa de recompra de usuários da comunidade vs. base geral. Métricas de validação: % de convidados que publicam, % de conteúdo curtido/útil, retenção D30 de quem contribui vs. não contribui.

---

## 2. Régua de permissão (3 perfis) — REGRA DE NEGÓCIO CENTRAL

| Perfil | Pode publicar sobre | Sinalização |
|---|---|---|
| **Sem viagem** | Apenas a **cidade de origem** | Todo usuário nasce produtor local; alimenta inventário de conteúdo desde o dia 1 |
| **Viajante** | Apenas **destinos comprados na Zupper** | Selo "✓ Viajante verificado" |
| **Zupper Parceiro (Influencer)** | **Sem barreira** | Creators ativados por marketing; garantem cadência (anti cold-start) |

**Deslogado:** navega todo o conteúdo, sem gatilho de publicação, badge "Visitante", CTA de login/conversão.

Essa régua responde de antemão a objeção clássica sobre UGC ("e a qualidade/veracidade?"): o conteúdo nasce da transação verificada.

---

## 3. Arquitetura de navegação (bottom nav)

Abas: **Início · Reservar · Pedidos · Conta**

- **Início (NOVA aba):** ponto de entrada da descoberta. Feed de comunidade + ofertas de aquisição mescladas. Campo de busca de **destino** no topo que mescla resultados de conteúdo E aquisição. 3 estados por perfil (ver telas).
- **Reservar (renomeada de "Buscar"):** leva à tela atual "Voos - Home" (formulário com seletor Voos/Hotéis/Pacotes + origem/destino/datas + "Pesquisas recentes"). 
  - Motivo da renomeação: com comunidade no app, "Buscar" ficava ambíguo (buscar conteúdo vs. buscar passagem). A aba é para o ato transacional de fechar viagem.
  - Termo escolhido: **Reservar** (verbo de aquisição, não colide com Pedidos).
  - Ícone recomendado: **mala de viagem** (não lupa — recriaria ambiguidade; não pin — pin = destino, conceito do Início).
- **Pedidos:** mantém função atual (histórico de pedidos/viagens).
- **Conta:** mantém função atual + ganha bloco Comunidade (ver seção 5, Bloco 6).

Decisão de arquitetura ainda validável: existe uma tela "Alt - Comunidade no navbar" explorando comunidade acessada pela Conta em vez de aba própria. A aba Início é a hipótese principal.

---

## 4. Arquivos Figma

**DECISÃO DE GOVERNANÇA (oficial):** o arquivo **Zupper App é a fonte única e oficial** de componentes e tokens da comunidade. Todos os componentes e tokens presentes nele são os canônicos. O **ZUKO deixa de ser fonte de verdade e passa a ser apenas base/referência** para criar novos componentes e telas — seus tokens e componentes antigos estão **descontinuados** para efeito da comunidade (não copiar valores do ZUKO para o PRD; extrair sempre do Zupper App). Em qualquer divergência, **Zupper App manda**.

| Arquivo | fileKey | Uso |
|---|---|---|
| **Zupper App** | `CRJYlaF0ep3mKL5fwH3e31` | **FONTE OFICIAL.** Organizado em páginas: **"⚙️ Componentes"** (`0:1`) = componentes-mestre + coleções de variáveis (Primitives/Semantics) e text styles canônicos; **"✅ Fluxo completo MVP"** (`377:24625`) = **jornada completa atual da comunidade, 12 seções** (ver seção 5); **"✅ Protótipo MVP"** = versão navegável/protótipo. Satoshi carrega. Telas reais do app (Voos-Home, Meus pedidos) e o "Canvas" de referência convivem no arquivo. **Nota:** telas marcadas com prefixo **🟡** são telas **novas** no fluxo (sinalização para os devs). |
| **ZUKO Design System** | `ksSnDFmzMuiDIzw8IcPPD2` | **BASE/REFERÊNCIA apenas.** Tokens e componentes antigos DESCONTINUADOS para a comunidade. Usar somente como ponto de partida para criar novos componentes/telas, sempre reconciliando com os tokens oficiais do Zupper App. Coleções ZUKO/Primitives (137) e ZUKO/Semantic (43), 111 paint styles, 28 text styles, 40 component sets. Guia de cores node 279:3300. |
| **Zupper Comunidades** | `5h8H67sRnLlCHstZM9VGBl` | Legado Jinboo + página "V1 Comunidade — Fluxo" (4 telas base + component set card-bem-vindo). Legado; não é fonte oficial. |
| **App Zupper - Tech (cópia)** | `ulLB4mWdaCSzCiQMlhLQtV` | Telas reais do app atual por fluxo (Voos 88, Hospedagem 51, Pacotes 44, Checkout 38, etc.). "Voos - Home" = node 695:2644. Consome ZUKO como biblioteca. |

**Fontes:** Satoshi (Bold/Medium/Regular) carrega via `loadFontAsync` só em Zupper App e Zupper Comunidades. No ZUKO, Satoshi é fonte privada e NÃO carrega via API → usar Inter ao operar no ZUKO.

**Técnicas de automação Figma (para quem for operar via API/plugin):** objeto global `figma` permite ler e escrever. Top-level await funciona; estado não persiste entre chamadas (fazer tudo numa chamada). Auto Layout: frame HORIZONTAL → primaryAxis=largura, counterAxis=altura; bug comum de altura travada em 10px se resolve com primaryAxisSizingMode='AUTO' (hug). combineAsVariants para component sets. addComponentProperty só funciona no component set pai, não em variantes. Arquivos grandes travam no load — recarregar a aba destrava.

---

## 5. Telas da Jornada MVP (Zupper App → página "✅ Fluxo completo MVP", `377:24625`)

### Bloco 1 — Aba Início
- **Início (feed) — viajante:** header saudação, busca de destino, "Destinos em alta" (cards horizontais com contador "X compartilhando"), feed "Inspire-se" (cards com autor, selo verificado, texto, destino, curtidas), card "Bem-vindo de volta". Tab bar Início ativo.
- **Início — influencer:** mesmo feed + card "Creator Zupper".
- **Início — deslogado:** navega, badge Visitante, sem gatilho, CTA login.
- **Destinos em alta - Ver todos:** grade completa de destinos.

### Bloco 2 — Descoberta por destino
- **Busca de destino (decisão 8.12):** o campo de busca do feed é **autocomplete de destinos existentes** — o usuário só consegue buscar destinos válidos e **cai direto no Detalhe do destino** (não há tela intermediária de "resultados de busca"). Quando o termo não casa com nenhum destino, a busca não conclui: o `search-field` tem uma variante de **"nenhum resultado encontrado"** para dar esse feedback.
- **Detalhe do destino:** hero do destino, abas **Ver tudo / Dicas locais / Fotos / Roteiros**, seção "As melhores ofertas" (voos a partir de R$1.048 / hotéis a partir de R$390 com CTA) — inspiração e compra na MESMA tela. Feed misto de conteúdo por baixo.
- **Detalhe do destino — Sem conteúdo:** cenário de destino que **tem oferta (hospedagem e/ou passagem) mas ainda sem conteúdo da comunidade** — mostra as ofertas e um estado vazio de conteúdo (cobre parte de HD.4).
- **Detalhe do destino — Dicas locais / Fotos / Roteiros:** feed filtrado por formato.
- **Comunidade - Viajante - Dicas / Fotos / Roteiros:** listas por formato com perfil do autor no topo (ex: Carlos @carlosviaja, badge Viajante). Header "Comunidade Zupper".

### Bloco 3 — Consumo de conteúdo
- **Detalhe do conteúdo - Foto:** imagem + autor/selo + legenda + local + barra social + comentários + input.
- **Detalhe do conteúdo - Dica local:** texto + mesma estrutura social.
- **Detalhe do conteúdo - Roteiro:** título + metadados (X dias · Y paradas · estilo) + intro do autor + **timeline por dia** (cards Dia 1/2/3, paradas em sequência vertical com bolinha teal + linha conectora, período MANHÃ/TARDE/NOITE + lugar + nota) + **CTA cruzado** "Gostou do roteiro? Voos para Recife R$1.048 → Buscar passagens" + social.
- **Barra social** (todos): Curtir · Comentar · Compartilhar. Lista de comentários + campo de novo comentário no rodapé.
- **card-roteiro-reduzido:** card compacto no feed do destino. Título bold + metadados teal ("7 dias · 15 paradas · Completo") + **preview-rota** (pílula cinza "● Marco Zero → Boa Viagem → Olinda +12 paradas") + footer (destino + curtidas). Convive com cards de Foto/Dica no feed misto, cada um com selo de tipo.

### Bloco 4 — Publicação (viajante) — 6 telas + estados
Fluxo por tipo: **Composer → Revisão** (Dica, Foto, Roteiro).
- **Destino = 1º campo, em chips** (Recife selecionado em teal; Fernando de Noronha e Porto Alegre disponíveis) — materializa a trava "só destinos que visitou".
- **Dropdown/seleção de destino filtrável (decisão 8.16):** o seletor de destino permite **digitar para filtrar** os destinos disponíveis. A régua de permissão define a lista: **Parceiro** → todos os destinos aparecem (sem trava); **Viajante** → apenas a cidade de residência + destinos com **compra verificada**. Com poucas opções, elas já vêm listadas no dropdown sem precisar digitar (mas a digitação segue disponível).
- **Composer Dica:** destino (chips) · categoria (chips) · título · texto · local. → botão "Avançar para revisão".
- **Composer Foto:** destino · grid de upload (3 slots + botão "+") · legenda · local.
- **Composer Roteiro:** destino · título · estilo (dropdown) · resumo · **estrutura de dias/paradas** (card Dia com paradas MANHÃ/TARDE em campos, "+ Adicionar parada", "+ Adicionar dia").
- **Revisão (todos):** nota de contexto ("Assim seu conteúdo vai aparecer para a comunidade") + preview do card com selo "✓ Viajante verificado" + link "Editar informações" + botão publicar fixo no rodapé.
- **Estados presentes no arquivo:** Dropdown aberto / Preenchido / Feedback (numerados 6/7/8 no arquivo).

### Bloco 5 — Moderação e segurança (seção "🟡Denunciar publicação" — 7 telas)
Ações em bottom sheet (fundo = tela de conteúdo com overlay + grabber); feedbacks de status ao autor em **card central com overlay** (scrim escurecido, card com ícone + título + texto + botão).
- **Denúncia — Menu de ações:** Compartilhar · Denunciar (vermelho). "Salvar publicação" removido (decisão 8.4). "Não tenho interesse" **removido do MVP** (decisão 8.11).
- **Denúncia — Menu de ações - Publicação própria:** quando o post é do próprio usuário, o menu "..." oferece **Editar** e **Excluir** (cobre HD.1/HD.2).
- **Denúncia — Menu de ações - Confirmar exclusão:** confirmação de exclusão da publicação própria.
- **Denúncia — Motivos:** "Por que você está denunciando?" (nota de anonimato) → Spam · Conteúdo impróprio · **Informação falsa sobre o destino** · Discurso de ódio/bullying · Golpe/fraude · **Não é sobre viagem/fora de contexto** (motivos "destino" e "fora de contexto" são próprios da Zupper).
- **Denúncia — Feedback (enviada):** check verde + "análise pela equipe" + botão Concluir + "Bloquear este autor".
- **Autor — Conteúdo em análise:** card central "Publicação em análise" (ícone relógio, conteúdo segue visível ao fundo esmaecido) + botão "Entenda as regras da comunidade".
- **Autor — Publicação removida:** card central "Publicação removida" (ícone danger + motivo) + botão **"Contestar decisão"**; conteúdo original esmaecido pelo scrim.
- **Contestar decisão (mecanismo — em validação, decisão 8.13):** no MVP provavelmente abre um **e-mail de contato**; evolução futura = mensagem direta para a moderação. Ainda validando.
- Requisito App Store para UGC: denunciar + bloquear + **ver/desbloquear** + agir em 24h. Denunciar e bloquear cobertos; **gerenciar contas bloqueadas** agora existe (Minha conta, Bloco 6). "Agir em 24h" é backend/operação (análise no backoffice web, não no app).

### Bloco 6 — Minha Conta
- **Estados (decisão 8.14):** a diferença visual real entre estados logados é **apenas a tag de perfil**. **Logado viajante** é o estado-base; **Logado sem viagem** também é viajante (só muda a régua: publica apenas sobre a cidade de residência); **Logado parceiro** difere pela **tag "Zupper Parceiro"**; **Deslogado** tem seu próprio estado. Por isso o arquivo mantém frames de **Parceiro** e **Deslogado** (o viajante = parceiro sem a tag).
- **Telas na seção "Minha conta":** Logado parceiro · Deslogado · **Conta - Dados pessoais** · **Conta - Dados pessoais - apelido indisponível** · **Contas bloqueadas**.
- **Bloco "Comunidade"** (bloco próprio, separado de Perfil/Ajuda/Privacidade atuais):
  - **Minhas publicações** — "Suas dicas, fotos e roteiros" · Ver → seção "Perfil - Comunidade" (listas por formato Fotos/Dicas/Roteiros + estado sem conteúdo). Editar/excluir pelo menu "..." do próprio post (Bloco 5).
  - **Posts curtidos** — "Conteúdos que você curtiu" · Ver → seção "Posts curtidos" (mesmo layout por formato + estado sem conteúdo).
  - **Preferências de viagem** — "Estilos e destinos que você curte" · Editar. **Quiz opcional** acessado pela aba Conta; incorpora o **onboarding de experiências** (decisão 8.15). Fluxo completo (12 telas): inicial → destinos favoritos → onde se hospeda → tipo de viajante → chegando no destino → estilo de hospedagem → com quem viaja → seus destinos favoritos → sua viagem costuma ser → feedback de conclusão + tela de desistência do fluxo. Status Pendente/Completo.
  - **Contas bloqueadas** — "Perfis que você não quer ver" · Gerenciar (requisito App Store: ver e desbloquear). **Tela desenhada.**
- Perfil próprio ("Container") tem Zupper Coins + conteúdo criado. Perfil público de terceiro tem seguidores/seguindo/seguir — MAS follow está fora do MVP (ver seção 9), então esse perfil social completo é backlog.

---

## 6. Componentes-chave (detalhado)

**Governança (oficial):** os componentes canônicos da comunidade vivem no **Zupper App** (fileKey `CRJYlaF0ep3mKL5fwH3e31`). Componentes de outros arquivos (ex.: card-bem-vindo em Zupper Comunidades) são legado a migrar para o Zupper App.

### post-card (component set) — Zupper App · card central do feed
Card de conteúdo do feed "Comunidade Zupper". Modela os 3 formatos + selo de perfil via subcomponentes de variante:
- **`tag-content`** (`propriedade1`: dica / foto / roteiro): pílula com ícone + rótulo, fundo `accent/dubai/100` (#f5f5f5), texto `text/primary`. É o selo de tipo no footer.
- **`role-badge`** (`propriedade1`: default / parceiro): "Visitante" (fundo `background/surface`, texto `text/primary`) vs "Parceiro" (gradiente madrid/400→albania/600, texto `text/inverse`). Anotação de dev: parceiro também ganha ícone verificado ao lado do nome.
- Estrutura: `autor/header` (avatar 28px + nome Satoshi Bold 14 + ícone verificado + tag de perfil) · texto/título · mídia opcional (imagem para Foto; `preview-rota` para Roteiro) · `footer` (tag-content + location com pin + `Likes`).
- **Variante Roteiro:** título Bold + `preview-rota` (borda `border/default`, raio 8px, bolinhas teal + paradas "Marco Zero → Boa Viagem → Olinda", última parada "+12 paradas" em `text/muted`).
- Tokens: `background/surface`, `border/default` (#d4d4d4), `text/primary|secondary|muted|inverse`, `spacing/4|8`, `caption`/`body sm`. **Dívida:** card usa `rounded-[4px]` cru e o título do roteiro usa `#404040` cru (ver 7.4).

### greeting-header (component) — Zupper App, header do feed
Avatar iniciais (pill 64px, `background/surface`, iniciais em `text/muted`) + saudação (título `heading` 24 Bold `text/primary` + subtítulo `body md` `text/secondary`) + coluna de tags (role-badge + CTA "Fazer login" em `text/link` #0c4a6e).

### bottom-nav (component) — Zupper App
4 abas: Início · Reservar · Pedidos · Conta. Item ativo em `text/highlight` (#008c99) + Satoshi Bold; inativos `text/primary` Medium. Anotações de dev confirmam: "Reservar" = mesmo fluxo de Buscar (só nome+ícone mudam); Pedidos/Conta = fluxos atuais.

### card-bem-vindo (component set) — LEGADO em Zupper Comunidades (migrar p/ Zupper App)
CTA contextual de publicação, inserido no topo do feed Início. Propriedade `tipo`:
- **tipo=Viajante:** fundo teal claro (#e0f5f7), borda teal (#00aeb1), tag pílula "✈ Viagem concluída" (teal), título "Bem-vindo de volta do Recife!" (brandDark #007884), subtítulo "Sua experiência pode ajudar outros viajantes. Conte como foi." (body), botão teal "Compartilhar experiência".
- **tipo=Influencer:** fundo amber claro (#fef3dc), borda amber (#fbbc00), tag "★ Creator Zupper" (amber, texto escuro), título "Sua audiência quer te ver viajando", subtítulo "Como creator, você publica experiências sem limites e inspira a comunidade Zupper." (não cita destino, pois o gatilho é o status de creator), mesmo botão teal "Compartilhar experiência".
- Botão → onboarding de experiências (tela ainda NÃO desenhada; depende de viabilidade técnica).
- Camadas nomeadas: titulo, subtitulo, btn-compartilhar, pin (tag), topo, textos.
- **Ação:** este component set está em arquivo legado; migrar para o Zupper App como componente oficial.

### content-tabs (component set) — Zupper App, node 118:8193
Barra de abas de conteúdo. Reorganizado para 2 eixos de variante independentes:
- **`aba`:** Fotos / Dicas / Roteiros / VerTudo (qual aba está ativa)
- **`verTudo`:** false / true (presença da aba "Ver tudo")
- 7 variantes. Uso: **Perfil** → verTudo=false (só Dicas/Fotos/Roteiros); **Detalhe do destino** → verTudo=true (com Ver tudo). Estilo: ativo = teal (#008c99) + Bold + underline 2px; inativo = cinza (#a3a3a3) + Regular + underline transparente. Anatomia de cada aba: Frame vertical [ícone + texto] + retângulo underline.
- A diferença de comportamento (Perfil navega seções; Destino filtra conteúdo) é lógica de aplicação, não expressa no componente — as abas são visualmente clicáveis nos dois casos.
- PENDENTE opcional: trocar instâncias nas telas Perfil/Destino para apontar ao set reorganizado.

### card-roteiro-reduzido — dentro do Detalhe do destino
Título bold + linha de metadados teal + preview-rota (pílula com bolinha + trajeto resumido). É o que diferencia visualmente roteiro de dica/foto no feed misto.

---

## 7. Design tokens — OFICIAIS (extraídos do Zupper App)

**Fonte:** valores lidos diretamente dos componentes do Zupper App (fileKey `CRJYlaF0ep3mKL5fwH3e31`). Estes são os tokens **canônicos** da comunidade. Os tokens do ZUKO (versão anterior desta seção) estão **descontinuados** — mantidos abaixo só como referência histórica para criação de novos componentes.

### 7.1 Tokens semânticos em uso real (namespace do Zupper App)

**Texto**
- `text/primary` → **#262626**
- `text/secondary` → **#404040**
- `text/muted` → **#a3a3a3**
- `text/inverse` → **#ffffff** (white)
- `text/link` → **#0c4a6e**
- `text/highlight` → **#008c99** (usado no item ativo da bottom-nav e em destaques teal)

**Fundo / borda**
- `background/surface` → **#ffffff** (white)
- `border/default` → **#d4d4d4**

**Espaçamento** (confirmados em uso): `spacing/4` (4px), `spacing/8` (8px), `spacing/16` (16px). Escala completa herdada dos primitives: 4/8/12/16/24/32/48/64/80/96.

**Raios em uso** (ver pendência 7.4 — ainda não tokenizados de forma consistente): tags `2px`, cards de conteúdo `4px`, `preview-rota` `8px`, avatar/pill `100px`.

### 7.2 Text styles oficiais (Satoshi)
- **heading** — Satoshi Bold, `font-size/heading` = 24px, line-height 1.0
- **body md** — Satoshi Medium, 16px, line-height 1.5
- **body sm** — Satoshi Regular, `font-size/body-sm` = 14px, line-height 1.2
- **caption** — Satoshi Medium, 12px, line-height 16px

### 7.3 Cores de marca / acento observadas nos componentes
- Gradiente **tag Parceiro/Creator**: `accent/madrid/400` (#ffce00) → `accent/albania/600` (#ea580c), diagonal ~159°.
- `accent/dubai/100` → **#f5f5f5** (fundo de tags de conteúdo tipo Dica/Foto/Roteiro).
- Teal da marca em uso: **#008c99** (highlight/ativo) e **#009daf** (brand).

### 7.4 Pendências de tokenização (dívida a resolver no próprio Zupper App)
1. **Namespace duplo:** componentes usam `--background/surface`, `--text/primary` etc.; conferir se há resquício de nomenclatura antiga (`bg/surface`) e unificar tudo no namespace do Zupper App.
2. **Hex crus escapando de token:** título do roteiro-card usa `#404040` cru (deveria ser `text/secondary`). Varrer e tokenizar.
3. **Raios sem régua:** 2px / 4px / 8px / 100px soltos. Definir tokens de raio oficiais (ex.: `radius/tag`, `radius/card`, `radius/pill`) e aplicar.
4. **Gradiente da tag Parceiro** repetido inline — candidato a virar paint style único (`tag/creator`).
5. **Iconografia:** confirmar se "Iconografia Padrão - Zupper" está publicada como biblioteca de componentes (hoje aparece achatada como paths SVG nas telas).

> **Nota histórica — tokens ZUKO (DESCONTINUADOS, só referência):** ZUKO/Primitives (137 vars) e ZUKO/Semantic (43 vars) definiam, entre outros, `text/primary→dubai-600 (#57534e)`, `text/secondary→dubai-500 (#737373)`, `bg/page→dubai-50`, `bg/surface→dubai-100 (#f5f5f5)`, `radius/card→lg (12px)`, além de escalas de feedback (success/amazon, danger/amsterdam, warning/madrid, info/greece). **Esses valores NÃO são mais oficiais** — o Zupper App diverge deles (ex.: text/primary é #262626, não #57534e; card usa surface branco e raio 4px). Consultar o ZUKO apenas ao criar componente novo que ainda não exista no Zupper App, e então reconciliar com os valores oficiais acima.

---

## 8. Decisões de produto fechadas

1. Destino como 1º campo do composer (chips), não tela separada.
2. Fluxo de publicação: composer → revisão → feedback.
3. Categorias de dica: chips, palavra única, 5–6 no MVP. Recomendado: **Gastronomia · Passeios · Hospedagem · Transporte · Dicas** (+ Compras ou Natureza conforme destinos). SEM "Outro" (vira ralo de dados; alternativa = publicar sem categoria).
4. **Curtir e salvar unificados no MVP:** só curtir ("Posts curtidos" na Conta). Salvar → backlog. Consequência pendente: remover "Salvar publicação" do bottom sheet de ações.
5. Aba "Buscar" → **"Reservar"** + ícone de mala de viagem.
6. Roteiro = formato-assinatura (timeline + CTA cruzado; maior intenção de compra).
7. Moderação (análise) no backoffice web; app cobre só denunciar/bloquear/feedback ao autor.
8. Comunidade dentro do app oficial; time responsável pelo app completo; MVP = comunidade, previsto outubro.
9. **Governança de Design System (10/jul/2026):** o **Zupper App é a fonte oficial** de componentes e tokens da comunidade. O **ZUKO é descontinuado como fonte de verdade** e vira apenas base/referência para criar novos componentes e telas. Em divergência, Zupper App manda. Tokens oficiais consolidados na seção 7 (extraídos direto do Zupper App); valores antigos do ZUKO viram nota histórica.
10. **Editar/Excluir publicação (16/jul/2026):** ficam no **menu "..." do próprio post** (variante "Publicação própria" do menu de ações), com confirmação de exclusão. Editar reaproveita o composer preenchido. Cobre HD.1/HD.2.
11. **"Não tenho interesse" fora do MVP inicial (16/jul/2026):** removido do primeiro release. No começo é importante **todo o conteúdo fluir para todos** — não vale esforço técnico para segmentar "ver menos" enquanto o conteúdo não está populado. As relações são majoritariamente por **destino** ou **categoria**; outros contextos entram depois. Reintroduzir quando houver volume de conteúdo.
12. **Busca = autocomplete de destinos existentes (16/jul/2026):** só se busca destino válido, caindo direto no Detalhe do destino (sem tela de resultados). Termo sem correspondência → variante "nenhum resultado encontrado" do `search-field`. Novo cenário "Detalhe do destino - Sem conteúdo" (destino com oferta mas sem conteúdo). Resolve H1.4/HD.3 por design.
13. **Contestar decisão — mecanismo em validação (16/jul/2026):** no MVP provavelmente **abre e-mail de contato**; evolução futura = mensagem direta para a moderação. HD.7 fica com solução interina.
14. **Estados de Minha conta simplificados (16/jul/2026):** a única diferença visual entre logados é a **tag de perfil**. Viajante = base; Sem viagem = viajante com régua de cidade de residência; Parceiro = tag "Zupper Parceiro"; Deslogado = próprio estado. Não é preciso frame separado para cada régua.
15. **Onboarding de experiências → Preferências de viagem (16/jul/2026):** o onboarding (HD.9) foi incorporado à seção **Preferências de viagem**, acessada pela aba **Conta**. É **opcional**; o usuário segue a jornada para refinar preferências.
16. **Seleção de destino no composer é dropdown filtrável (16/jul/2026):** permite digitar para filtrar; Parceiro vê todos os destinos, Viajante vê cidade de residência + destinos com compra verificada. Resolve HD.8 (composer parceiro) por lógica de dados, sem tela separada.

---

## 9. Lacunas / histórias a desenhar (design, resp. Caio)

**Status revisado em 16/jul/2026 — a maioria fechada ou resolvida por design:**
- **HD.1 Editar publicação** — ✅ desenhada (menu "..." do próprio post; edita via composer preenchido; decisão 8.10).
- **HD.2 Excluir publicação** — ✅ desenhada (menu "..." + confirmar exclusão; decisão 8.10).
- **HD.3 Resultados da busca de conteúdo** — ✅ resolvida por design: busca é autocomplete → cai no Detalhe do destino; sem tela de resultados (decisão 8.12).
- **HD.4 Estados vazios** — ✅ em grande parte: "Perfil - Comunidade / Posts curtidos - Sem conteúdo" e "Detalhe do destino - Sem conteúdo". (Conferir se falta estado vazio do feed Início.)
- **HD.5 Estados de erro e conexão** — ✅ desenhados: "Publicação - Erro de carregamento" e "Publicar - {Foto/Dica/Roteiro} - Erro de publicação".
- **HD.6 Sucesso pós-publicação** — ✅ telas de Feedback em cada composer.
- **HD.7 Contestação de remoção** — 🟡 botão existe; **mecanismo em validação** (e-mail interino → mensagem à moderação depois; decisão 8.13).
- **HD.8 Composer do parceiro (sem trava)** — ✅ resolvida por lógica do dropdown filtrável (parceiro vê todos os destinos; decisão 8.16).
- **HD.9 Onboarding de experiências** — ✅ incorporado à seção Preferências de viagem, acessada pela Conta (decisão 8.15).
- **HD.10 Gerenciar contas bloqueadas** — ✅ desenhada (Minha conta - Contas bloqueadas).
- **HD.11 Minhas publicações (listagem)** — ✅ seção "Perfil - Comunidade" (por formato + sem conteúdo).
- **HD.12 Posts curtidos (listagem)** — ✅ seção "Posts curtidos".

**Diferido do MVP inicial (decisão 8.11):** "Não tenho interesse" / ver menos conteúdo — volta quando houver conteúdo populado.

**Fora do MVP (backlog):** seguir/seguidores, salvar publicação, busca de pessoas, chat, stories, gamificação completa (Zupper Coins existe no perfil mas não é foco do MVP).

---

## 10. User stories do MVP (6 épicos)

**Épico 1 — Aba Início:** H1.1 Feed viajante · H1.2 Feed parceiro · H1.3 Feed deslogado/sem viagem · H1.4 Busca de destino (conteúdo+aquisição).
**Épico 2 — Descoberta por destino:** H2.1 Ver todos destinos em alta · H2.2 Hub do destino (Ver tudo + ofertas) · H2.3 Filtrar por formato.
**Épico 3 — Consumo:** H3.1 Ver detalhe Dica/Foto/Roteiro · H3.2 Interagir (curtir/comentar/compartilhar).
**Épico 4 — Publicação viajante:** H4.1 Publicar Dica · H4.2 Publicar Foto · H4.3 Publicar Roteiro · H4.4 Trava de permissão por perfil.
**Épico 5 — Moderação:** H5.1 Denunciar · H5.2 Não tenho interesse · H5.3 Bloquear autor · H5.4 Feedback ao autor (análise/removido).
**Épico 6 — Minha Conta:** H6.1 Conta por estado de perfil · H6.2 Bloco Comunidade · H6.3 Preferências (quiz).

Formato de cada história: **Como** [perfil], **quero** [ação], **para** [benefício]. **+ Aceite:** [critérios]. (Textos completos de cada uma foram escritos; regenerar sob demanda.)

---

## 11. Jira (projeto KSA "KODES - Super App")

- Board: `kodestech-jinboo.atlassian.net/jira/software/projects/KSA/boards/4`
- Colunas: TO DO / IN PROGRESS / IN REVIEW / DONE.
- Épicos KSA-1 a KSA-13. **Épico de comunidade = KSA-13 "[community] Community — Discovery & Design"** (categoria "frente"; "rede social construída do zero, discovery e design antes de abrir implementação"). Relator dos épicos: Marcos Vinicius.
- Padrão de história: título curto + descrição "Como/quero/para + Aceite:", tipo "História".
- Já criadas: KSA-14 (ficou sob KSA-4 Design System, épico errado) e **KSA-15 "Feed inicial para viajante"** (exemplo, sob KSA-13, correto).
- **PENDENTE:** criar ~24 histórias restantes (H1.2–H6.3 + HD.1–HD.12) sob KSA-13; considerar mover KSA-14 para KSA-13.
- **Integração:** conector Atlassian Rovo do Claude hoje só lê. Para escrita direta via API, falta: (a) admin da org autorizar domínio `claude.ai` em Atlassian Administration → Rovo → Rovo MCP server → Add domain; (b) reconectar no Claude aceitando escopos de escrita (OAuth 2.1). Endpoint atual: mcp.atlassian.com/v1/mcp (o /sse legado foi descontinuado após 30/jun/2026). Enquanto não configurado: criar via Claude in Chrome (funciona, KSA-15 criada assim) ou CSV de importação (colunas Issue Type / Summary / Description / Epic).

---

## 12. Fontes de conhecimento do projeto (arquivos originais)
benchmark_engajamento (Polarsteps, TripAdvisor, Google Local Guides, Strava, Airbnb) · proposta_estrategica_zupper_comunidades (loop, Zupper Coins, cold start 3 ondas, MVP out/2026, métrica recompra) · base_conhecimento (assessment técnico) · Brandbook Brasileirando 2026 · survey base de usuários.