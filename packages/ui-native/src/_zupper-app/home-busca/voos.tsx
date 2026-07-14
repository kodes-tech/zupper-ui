/**
 * Home do Zupper App — aba Voos (busca de passagens), Ida e Volta.
 *
 * Extraído do código do app em 2026-07-14 (repo ../zupper-app):
 *  - Tela:        apps/zupper-app/src/app/src/ui/screens/Dashboard/Home/{index.tsx,styles.ts}
 *  - Motor busca: libs/aerial/src/search-engine/components/{AerialSearchEngine,SearchEngineRoundTrip,FlightTypeSelector,FlightConfigButton}
 *  - Base UI:     libs/app-ui/src/lib/{molecules/pressableInput,organisms/{homeGreeting,SearchEngineFooter},molecules/tabBar}
 *  - Tokens:      libs/app-ui/src/lib/atoms/{spacing,colors,fonts,borders} — resolvidos p/ literal
 *
 * Estado inicial real do app (flightSearchModel): 1 adulto, classe econômica,
 * origem/destino/datas vazios → o campo "Viajantes" já nasce preenchido
 * ("1 Viajante, econômica"), os demais nascem placeholder.
 *
 * JSX de consulta — não roda. Formato igual aos exports da _figma/: classes com
 * valor literal + comentário com o token do app + data-source com o arquivo real.
 */
export default function HomeBuscaVoos() {
  return (
    // SafeAreaContainer — Home/styles.ts
    <div className="flex-1 bg-[#FFFFFF]" data-source="apps/.../Dashboard/Home/styles.ts (SafeAreaContainer)">
      {/* ScrollView: contentContainerStyle bg neutral[100] */}
      <div className="flex-1 bg-[#F5F5F5]" data-source="apps/.../Dashboard/Home/index.tsx (ScrollView)">
        {/*
         * SearchBoxWrapper — o "cartão" branco que engloba header + tabs + busca.
         * radius borderRadius[300]=8px · border-bottom 1px neutral[200]
         * sombra: 0 4px(spacing100) 16px(spacing400) rgba(0,0,0,0.26), elevation 8
         */}
        <div
          className="overflow-hidden rounded-[8px] border-b border-[#EFEFEF] bg-[#FFFFFF] shadow-[0_4px_16px_rgba(0,0,0,0.26)]"
          data-source="apps/.../Dashboard/Home/styles.ts (SearchBoxWrapper)"
        >
          {/* HomeGreeting — padding spacing300=12, paddingBottom spacing100=4 */}
          <header
            className="flex flex-row items-center justify-between p-[12px] pb-[4px]"
            data-source="libs/app-ui/src/lib/organisms/homeGreeting/homeGreeting.tsx"
          >
            <div className="flex flex-1 flex-col gap-[4px]">
              {/* Typography md2x size=fontSize500(27) weight=bold color=neutral[700] */}
              <h1 className="text-[27px] font-bold text-[#404040]">Olá, viajante</h1>
              {/* Typography md size=fontSize80(16) weight=normal color=neutral[500] */}
              <p className="text-[16px] font-normal text-[#737373]">O que você deseja buscar?</p>
            </div>
            <div className="min-w-[24px]" /> {/* sem rightIconName no app hoje */}
          </header>

          {/*
           * Tabs de produto (Voos / Hospedagens / Pacotes) — inline no Home/index.tsx
           * (TabNavigation). bg neutral[50] · border-bottom 1px neutral[200] · margin-bottom 8
           */}
          <nav
            className="mb-[8px] flex flex-row border-b border-[#EFEFEF] bg-[#FFFFFF]"
            data-source="apps/.../Dashboard/Home/index.tsx (TabNavigation) + styles.ts (TabButton)"
          >
            {/* TabButton ativa — flex1, coluna, centro, padV spacing100=4, gap 4 */}
            <button className="relative flex flex-1 flex-col items-center justify-center gap-[4px] py-[4px]">
              <div className="flex flex-col items-center gap-[4px]">
                {/* Icon VooIda 25px — ativa: primary[950] #009DAF */}
                <span className="h-[25px] w-[25px] text-[#009DAF]" data-icon="VooIda" />
                {/* Typography md(14) bold — ativa #009DAF */}
                <span className="text-[14px] font-bold text-[#009DAF]">Voos</span>
              </div>
              {/* TabActiveBorder — width 100px, 2px(spacing50), bottom -4px(spacing100), primary[950] */}
              <span className="absolute bottom-[-4px] w-[100px] border-b-[2px] border-[#009DAF]" />
            </button>
            {/* Inativas: ícone + label neutral[500] #737373, sem underline */}
            <button className="flex flex-1 flex-col items-center justify-center gap-[4px] py-[4px]">
              <span className="h-[25px] w-[25px] text-[#737373]" data-icon="Hotel" />
              <span className="text-[14px] font-bold text-[#737373]">Hospedagens</span>
            </button>
            <button className="flex flex-1 flex-col items-center justify-center gap-[4px] py-[4px]">
              <span className="h-[25px] w-[25px] text-[#737373]" data-icon="Packages" />
              <span className="text-[14px] font-bold text-[#737373]">Pacotes</span>
            </button>
          </nav>

          {/* Scene — padV spacing300=12, bg neutral[50] */}
          <section className="bg-[#FFFFFF] py-[12px]" data-source="apps/.../Dashboard/Home/styles.ts (Scene)">
            {/*
             * FlightTypeSelector — wrapper margin-bottom spacing500=20;
             * container centro padH 10; linha space-between padH 55.
             */}
            <div
              className="mb-[20px] w-full items-center px-[10px]"
              data-source="libs/aerial/src/search-engine/components/FlightTypeSelector"
            >
              <div className="flex flex-row justify-between px-[55px]">
                {/*
                 * Checkbox variant="rounded" marcado (Ida e Volta):
                 * anel 20px r9.5 stroke 1 secondary[950] #008C99 + miolo r6 #009DAF (hardcoded);
                 * gap 8 · label fontSize75=15px, bold quando marcado, cor primary[500] #009DAF
                 */}
                <label className="flex flex-row items-center gap-[8px]" data-source="libs/app-ui/.../molecules/checkbox + inputSelectionWrapper">
                  <span className="h-[20px] w-[20px] rounded-full border border-[#008C99]">
                    <span className="m-[3px] block h-[12px] w-[12px] rounded-full bg-[#009DAF]" />
                  </span>
                  <span className="text-[15px] font-bold text-[#009DAF]">Ida e Volta</span>
                </label>
                {/* desmarcado: anel neutral[300] #D4D4D4, label 400 neutral[500] #737373 */}
                <label className="flex flex-row items-center gap-[8px]">
                  <span className="h-[20px] w-[20px] rounded-full border border-[#D4D4D4]" />
                  <span className="text-[15px] font-normal text-[#737373]">Só Ida</span>
                </label>
              </div>
            </div>

            {/*
             * AerialSearchEngineWrapper — o cartão do formulário:
             * radius 8 · padding-top spacing350=14 · margin 0 spacing250=10
             * sombra 0 4px 10px rgba(0,0,0,0.15), elevation 5
             */}
            <div
              className="mx-[10px] rounded-[8px] bg-[#FFFFFF] pt-[14px] shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
              data-source="apps/.../Dashboard/Home/styles.ts (AerialSearchEngineWrapper)"
            >
              {/* SearchEngineRoundTrip: Stack px=10 gap=12 */}
              <div className="flex flex-col gap-[12px] px-[10px]" data-source="libs/aerial/.../SearchEngineRoundTrip/index.tsx">
                {/* bloco origem/destino: coluna, alignItems flex-end, gap 12, swap absoluto */}
                <div className="relative flex flex-col items-end gap-[12px]">
                  {/*
                   * PressableInput VAZIO (origem) — h spacing1300=56 · border 1px neutral[300]
                   * radius borderRadius[300]=8 · bg neutral[50] · padding spacing300=12 spacing200=8
                   * linha gap spacing100=4 · ícone Pinmap 25px neutral[600] #57534E
                   * texto md(14) medium(500) neutral[500] #737373
                   */}
                  <button
                    className="flex h-[56px] w-full flex-row items-center gap-[4px] rounded-[8px] border border-[#D4D4D4] bg-[#FFFFFF] px-[8px] py-[12px]"
                    data-source="libs/app-ui/src/lib/molecules/pressableInput/styles.ts"
                  >
                    <span className="h-[25px] w-[25px] text-[#57534E]" data-icon="Pinmap" />
                    <span className="text-[14px] font-medium text-[#737373]">Qual sua origem ?</span>
                  </button>

                  {/*
                   * PREENCHIDO (p/ referência): vira coluna com label flutuante —
                   * label: pad 4px 12px 0, minH 20, buttonSm 12px medium neutral[500]
                   * linha: pad 2px 8px ($compact), gap 4; ícone primary[100] #009DAF;
                   * valor md(14) medium neutral[700] #404040; borda continua neutral[300] (isNeutral)
                   * Ex.: label "Recife, PE" · valor "REC - Aeroporto Internacional do Recife, PE"
                   */}

                  {/*
                   * IconButton (inverter origem/destino) — 30×30 · radius 6 · border 1px neutral[300]
                   * bg neutral[50] · absolute right 0 / top 37% · margin-right 8
                   * ícone RepeatUp 18px (viewBox 16×15) neutral[500] #737373
                   */}
                  <span
                    className="absolute right-0 top-[37%] z-[1] mr-[8px] flex h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-[#D4D4D4] bg-[#FFFFFF]"
                    data-source="libs/aerial/.../SearchEngineOneWay/styles.ts (IconButton)"
                  >
                    <span className="h-[18px] w-[18px] text-[#737373]" data-icon="RepeatUp" />
                  </span>

                  {/* destino — igual à origem, ícone VooIda */}
                  <button className="flex h-[56px] w-full flex-row items-center gap-[4px] rounded-[8px] border border-[#D4D4D4] bg-[#FFFFFF] px-[8px] py-[12px]">
                    <span className="h-[25px] w-[25px] text-[#57534E]" data-icon="VooIda" />
                    <span className="text-[14px] font-medium text-[#737373]">Qual seu destino ?</span>
                  </button>
                </div>

                {/* datas — mesmo PressableInput, ícone Calendar; preenchido exibe "D MMM YY - D MMM YY" */}
                <button className="flex h-[56px] w-full flex-row items-center gap-[4px] rounded-[8px] border border-[#D4D4D4] bg-[#FFFFFF] px-[8px] py-[12px]">
                  <span className="h-[25px] w-[25px] text-[#57534E]" data-icon="Calendar" />
                  <span className="text-[14px] font-medium text-[#737373]">Data de ida e volta</span>
                </button>

                {/*
                 * FlightConfigButton — estado inicial já preenchido (1 adulto, econômica):
                 * coluna com label "Viajantes" (12px medium neutral[500], pad 4 12 0, minH 20)
                 * linha: pad spacing100=4 spacing200=8, gap 4 · ícone NewUser primary[950] #009DAF
                 * valor 14px(fontSize60) medium, line-height 100%, neutral[700] #404040
                 */}
                <button
                  className="flex h-[56px] w-full flex-col items-stretch rounded-[8px] border border-[#D4D4D4] bg-[#FFFFFF]"
                  data-source="libs/aerial/.../FlightConfigButton/styles.ts"
                >
                  <span className="flex min-h-[20px] items-center pl-[12px] pr-[12px] pt-[4px] text-[12px] font-medium text-[#737373]">
                    Viajantes
                  </span>
                  <span className="flex flex-1 flex-row items-center gap-[4px] px-[8px] py-[4px]">
                    <span className="h-[25px] w-[25px] text-[#009DAF]" data-icon="NewUser" />
                    <span className="text-[14px] font-medium leading-[14px] text-[#404040]">1 Viajante, econômica</span>
                  </span>
                </button>
              </div>

              {/*
               * SearchEngineFooter — padding spacing300=12, gap spacingStackSmall=16.
               * Button variant="primary-gradient": gradiente 90° #FB923C → #FFCE00 (hardcoded
               * na Home), radius spacing200=8 (miolo 6), min-height 52, padding interno 12 20,
               * linha centro gap spacing50=2 · ícone NewSearch 24px(spacing600) neutral[950] #171717
               * label 14px(fontSize60) medium line-height 18 #171717.
               * Desabilitado: bg neutral[200] #EFEFEF, texto/ícone neutral[500] #737373.
               */}
              <footer className="flex flex-col gap-[16px] p-[12px]" data-source="libs/app-ui/.../SearchEngineFooter + molecules/button">
                <button className="min-h-[52px] w-full rounded-[8px] bg-[linear-gradient(90deg,#FB923C_0%,#FFCE00_100%)] p-[1px]">
                  <span className="flex h-[52px] flex-row items-center justify-center gap-[2px] rounded-[6px] px-[20px] py-[12px]">
                    <span className="h-[24px] w-[24px] text-[#171717]" data-icon="NewSearch" />
                    <span className="text-[14px] font-medium leading-[18px] text-[#171717]">Pesquisar</span>
                  </span>
                </button>
              </footer>
            </div>
          </section>
        </div>

        {/*
         * Abaixo da dobra — HomeContentWrapper: bg neutral[100] #F5F5F5,
         * marginH -20(spacing500), padL 24(spacing600), padR 22(spacing550), padV 16(spacing400).
         * Conteúdo: DealItem (ofertas), "Novidades" (h3 19px bold neutral[800] #2E2E2E,
         * margin-bottom 8, padH 20) + Banner, "Atendimento Zupper" (20px/28 bold neutral[700])
         * + ActionList. Internos de DealItem/Banner/ActionList ficam pra extração das
         * próximas telas — aqui só o esqueleto da seção.
         */}
        <section
          className="bg-[#F5F5F5] py-[16px] pl-[24px] pr-[22px]"
          data-source="apps/.../Dashboard/Home/styles.ts (HomeContentWrapper)"
        />
      </div>

      {/*
       * TabBar inferior (navegação do app): bg neutral[50] · row space-evenly ·
       * padding-bottom max(inset, 13). Item focado: border-top 2px primary[950] #009DAF.
       * Item: margin-top 8, coluna, gap 5; ícone 28px (marginTop 12) primary[950] focado /
       * neutral[300] #D4D4D4; label md(14) primary[950] focado / neutral[400] #A3A3A3.
       * Rotas ativas: Buscar (Search) · Meus Pedidos (Tickets) · Minha Conta (User01).
       */}
      <nav
        className="flex flex-row justify-evenly bg-[#FFFFFF] pb-[13px]"
        data-source="libs/app-ui/src/lib/molecules/tabBar + apps/.../navigation/TabNavigator.tsx"
      />
    </div>
  );
}
