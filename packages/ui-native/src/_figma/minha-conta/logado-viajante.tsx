// Referência de código gerada pelo Figma Dev Mode (get_design_context) — NÃO É
// PARA RODAR. Guarda os valores exatos (px, cor, font) desta tela. Ver
// templates/README.md antes de usar.
//
// Figma: https://www.figma.com/design/CRJYlaF0ep3mKL5fwH3e31/Zupper-2.0?node-id=18-4193
// Node: 18:4193 — "Minha conta - Logado viajante". A seção "Comunidade"
// (Minhas publicações / Posts curtidos / Preferências de viagem / Contas
// bloqueadas — escopo do ticket KSA-46) tem data-development-annotations no
// Figma: só "Minhas publicações" redireciona pra uma tela existente (o
// perfil, ver ../comunidade/); as outras 3 linhas ainda não têm tela de
// destino ("criar a tela de...", "atualizar o fluxo de...", "criar tela
// de..." — ver anotações originais na variante Parceiro). É esperado: KSA-13
// (discovery/design da Comunidade) ainda está pendente.
// Capturado em: 2026-07-10

const imgProperty1ArrowBack = "https://www.figma.com/api/mcp/asset/1cc7f817-42f7-4b88-8cf9-f7883d7e5450";
const imgAvatar = "https://www.figma.com/api/mcp/asset/182aada6-2c44-474e-bdbb-de9958fc6893";
const imgIconografiaArrowZupper = "https://www.figma.com/api/mcp/asset/1945a821-2c74-4cd8-a55c-1c7c93cc881f";
const imgCaminho22442 = "https://www.figma.com/api/mcp/asset/768e86fd-9d3d-43c2-a85c-7b18017c1d4a";
const imgRetangulo534 = "https://www.figma.com/api/mcp/asset/c47c5fd6-3d6a-4afe-be08-5d0fa359baff";
const imgIconografiaPadraoZupper = "https://www.figma.com/api/mcp/asset/6995703e-2ed9-48bc-babf-f9cccdea1e93";
const imgIconografiaArrowZupper1 = "https://www.figma.com/api/mcp/asset/3fcecab0-a3fa-45a5-8cf1-ef876a2866f3";
const imgCaminho22443 = "https://www.figma.com/api/mcp/asset/930f4833-1cd9-425b-b606-91866866ce5d";
const imgIconografiaPadraoZupper1 = "https://www.figma.com/api/mcp/asset/be53ab91-29d3-40dd-9d2c-63aad60706b6";
const imgIconSenha02 = "https://www.figma.com/api/mcp/asset/da91fd1e-beef-490b-82b7-df1d0b268b5a";
const imgElements = "https://www.figma.com/api/mcp/asset/3ab716ce-20d5-4880-be76-4f1c8506742a";
// "Posts curtidos": Grupo10781 (base) vem vazio no Figma — placeholder de hit-area.
// O ícone visível é a composição de Grupo10777 + Caminho22381 (ver ../assets/icon-account-liked.svg).
const imgGrupo10777 = "https://www.figma.com/api/mcp/asset/56cae7df-5043-46fe-87cc-a6195fc28127";
const imgCaminho22381 = "https://www.figma.com/api/mcp/asset/36cfb2eb-6418-476e-80b9-fe799806e1b3";
const imgGrupo10781 = "https://www.figma.com/api/mcp/asset/46038ed5-e140-4f4e-98ad-10cba2ee5b9b";
const imgElements1 = "https://www.figma.com/api/mcp/asset/ddcab4a6-0b3d-4f7b-a9da-b97e5dec5f41";
const imgElements2 = "https://www.figma.com/api/mcp/asset/72e2739e-0acd-4cb4-a847-9eb0e4459866";
// "Central de ajuda": Grupo11138 (base) também vazio; ícone visível é Grupo8280.
const imgGrupo11138 = "https://www.figma.com/api/mcp/asset/28e75120-20d4-405e-b786-e06e0b1c6f5a";
const imgGrupo8280 = "https://www.figma.com/api/mcp/asset/09534de0-07ce-47ed-9828-3c8ab964f37b";
// CUIDADO: este asset (ícone de "Sobre o Zupper") fica atrás de instance-swap no Figma — o
// export vetorial direto deste node único vem com o path errado (idêntico ao de "Central de
// ajuda", Grupo8280). O ícone real ("Z" estilizado) só aparece via export flatten da linha
// inteira (get_metadata/download_assets no node 37:3335) — ver ../assets/icon-account-about-zupper.svg.
const imgIconografiaPadraoZupper2 = "https://www.figma.com/api/mcp/asset/fd02f7b3-41a0-48f9-968f-8bb4aba258d1";
const imgIconografiaPadraoZupper3 = "https://www.figma.com/api/mcp/asset/a1983097-0b6c-4a09-8b6a-6f274dbc6c86";
const imgIconografiaPadraoZupper4 = "https://www.figma.com/api/mcp/asset/1d02ea3f-be59-4871-9011-40c91a4c03e8";
const imgIconografiaPadraoZupper5 = "https://www.figma.com/api/mcp/asset/2af499b4-78cf-4d60-a406-a8638973bf67";
const imgIconografiaPadraoZupper6 = "https://www.figma.com/api/mcp/asset/f4298951-b5cb-493f-94b0-27d871d3aa27";
const imgIconografiaPadraoZupper7 = "https://www.figma.com/api/mcp/asset/a0c6ccbd-fddd-4457-9d8e-e97eb4e4ada4";
const imgGrupo8257 = "https://www.figma.com/api/mcp/asset/b7748301-e0d7-4fde-8cb4-a7d97c2471e7";
const imgCaminho5727 = "https://www.figma.com/api/mcp/asset/496b5498-801b-47a5-8e0e-bdf7edb176b6";
const imgLinha112 = "https://www.figma.com/api/mcp/asset/608357e6-1eb3-43de-8c89-026823cac552";
const imgRetangulo528 = "https://www.figma.com/api/mcp/asset/4906eb3d-0ffb-4a22-8ec6-ef518a860bbf";
const imgCaminho5728 = "https://www.figma.com/api/mcp/asset/1e394e93-44b7-4e7a-8d9e-bc1611aad7c2";
const imgShape3077 = "https://www.figma.com/api/mcp/asset/32132ff1-1eb4-4808-98c8-4e0835fda3a8";

type IconografiaArrowZupperProps = {
  className?: string;
  property1?: "Arrow back";
};

function IconografiaArrowZupper({ className, property1 = "Arrow back" }: IconografiaArrowZupperProps) {
  return (
    <div className={className || "relative size-[24px]"} data-node-id="18:325">
      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgProperty1ArrowBack} />
    </div>
  );
}

export default function MinhaContaLogadoViajante() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-start relative size-full" data-node-id="18:4193" data-name="Minha conta - Logado viajante">
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-[390px]" data-node-id="18:4194" data-name="Componentes">
        <div className="bg-white content-stretch flex flex-col h-[88px] items-start relative shrink-0 w-full" data-node-id="60:5885">
          <div className="content-stretch flex items-center justify-between pb-[4px] pt-[40px] px-[24px] relative shrink-0 w-full" data-node-id="60:5886" data-name="Título">
            <IconografiaArrowZupper className="relative shrink-0 size-[24px]" />
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="60:5888">
              <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[normal] not-italic relative shrink-0 text-[#1c1c1a] text-[17px] whitespace-nowrap" data-node-id="60:5889">
                Minha conta
              </p>
            </div>
            <div className="relative shrink-0 size-[24px]" data-node-id="60:5890" data-name="Iconografia Arrow - Zupper">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[8px] items-center px-[24px] relative shrink-0 w-full" data-node-id="18:4199" data-name="Título">
          <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[100px] shrink-0 size-[56px]" data-node-id="18:4200" data-name="Avatar">
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[100px]">
              <div className="absolute bg-[#d4d4d4] inset-0 rounded-[100px]" />
              <div className="absolute inset-0 overflow-hidden rounded-[100px]">
                <img alt="" className="absolute left-[-53.75%] max-w-none size-[199.08%] top-[-16.31%]" src={imgAvatar} />
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col h-[56px] items-start justify-between min-w-px not-italic relative" data-node-id="18:4201">
            <div className="flex flex-col font-['Satoshi:Bold'] justify-center leading-[0] relative shrink-0 text-[#404040] text-[22px] tracking-[0.44px] w-full" data-node-id="18:4202">
              <p className="leading-[32px]">Olá, Carlos!</p>
            </div>
            <p className="font-['Satoshi:Medium'] leading-[24px] relative shrink-0 text-[#737373] text-[16px] tracking-[0.32px] w-full" data-node-id="18:4203">
              @carlosviaja
            </p>
          </div>
          <div className="content-stretch flex flex-col h-[48px] items-end pt-[2px] relative shrink-0" data-node-id="36:1897">
            <div className="bg-[rgba(0,157,175,0.13)] content-stretch flex items-start overflow-clip px-[8px] py-[3px] relative rounded-[2px] shrink-0" data-node-id="36:1906" data-name="selo">
              <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[normal] not-italic relative shrink-0 text-[#009daf] text-[12px] whitespace-nowrap" data-node-id="36:1907">
                Viajante
              </p>
            </div>
          </div>
        </div>
        <div className="h-px relative shrink-0 w-[376px]" data-node-id="18:4204" data-name="Caminho 22442">
          <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
            <img alt="" className="block max-w-none size-full" src={imgCaminho22442} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0 w-full" data-node-id="37:3319" data-name="SAC">
          <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[24px] not-italic relative shrink-0 text-[#404040] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="37:3320">
            Meu perfil
          </p>
          <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-node-id="37:3321" data-name="Lista Padrão (Com Ícone)">
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="37:3322" data-name="Inputs Atendimento">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="I37:3322;4349:125023">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I37:3322;4349:125024" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I37:3322;4349:125025" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I37:3322;4349:125026" data-name="Iconografia Padrão - Zupper">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="I37:3322;4349:125040">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I37:3322;4349:125041" data-name="Linha 1">
                  <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I37:3322;4349:125027">
                    Dados pessoais
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I37:3322;4349:125028" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I37:3322;4349:125029">
                      Editar
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="I37:3322;4349:125030" data-name="Iconografia Arrow - Zupper">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I37:3322;4349:125042" data-name="Linha 2">
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px] w-[148px]" data-node-id="I37:3322;4349:125043">
                    Nome, e-mail, data nasc...
                  </p>
                  <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[120px]" data-node-id="I37:3322;4349:125044" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#44ba68] text-[12px] text-right w-[119.034px]" data-node-id="I37:3322;4349:125045">
                      Completo
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="37:3323" data-name="Caminho 22442">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="37:3324" data-name="Inputs Atendimento">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="I37:3324;4349:125023">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I37:3324;4349:125024" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I37:3324;4349:125025" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I37:3324;4349:125026" data-name="Iconografia Padrão - Zupper">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper1} />
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="I37:3324;4349:125040">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I37:3324;4349:125041" data-name="Linha 1">
                  <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I37:3324;4349:125027">
                    Endereço
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I37:3324;4349:125028" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I37:3324;4349:125029">
                      Editar
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="I37:3324;4349:125030" data-name="Iconografia Arrow - Zupper">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I37:3324;4349:125042" data-name="Linha 2">
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px] w-[148px]" data-node-id="I37:3324;4349:125043">
                    CEP, Rua, Cidade, UF
                  </p>
                  <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[120px]" data-node-id="I37:3324;4349:125044" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#eab308] text-[12px] text-right w-[119.034px]" data-node-id="I37:3324;4349:125045">
                      Pendente
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="37:3325" data-name="Caminho 22443">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="37:3326" data-name="Inputs Atendimento">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="I37:3326;4349:125023">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I37:3326;4349:125024" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I37:3326;4349:125025" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I37:3326;4349:125026" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute inset-[16.34%]" data-node-id="I37:3326;4349:125026;1184:787" data-name="Icon senha 02">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconSenha02} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="I37:3326;4349:125040">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I37:3326;4349:125041" data-name="Linha 1">
                  <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I37:3326;4349:125027">
                    Senha
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I37:3326;4349:125028" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I37:3326;4349:125029">
                      Editar
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="I37:3326;4349:125030" data-name="Iconografia Arrow - Zupper">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="I37:3326;4349:125042" data-name="Linha 2">
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px] w-[148px]" data-node-id="I37:3326;4349:125043">
                    Redefinir senha
                  </p>
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="37:3327" data-name="Caminho 22446">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0 w-full" data-node-id="76:4922" data-name="SAC">
          <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[24px] not-italic relative shrink-0 text-[#404040] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="76:4923">
            Comunidade
          </p>
          <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-node-id="76:4924" data-name="Lista Padrão (Com Ícone)">
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="76:4925" data-name="Inputs Atendimento">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="76:4926">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="76:4927" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="76:4928" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[10px] mt-[10px] overflow-clip relative row-1 size-[24px]" data-node-id="76:4929" data-name="file-01">
                    <div className="absolute inset-[8.33%_14.58%]" data-node-id="I76:4929;2:9299" data-name="elements">
                      <div className="absolute inset-[-2.5%_-2.94%]">
                        <img alt="" className="block max-w-none size-full" src={imgElements} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="76:4930">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="76:4931" data-name="Linha 1">
                  <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="76:4932">
                    Minhas publicações
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="76:4933" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="76:4934">
                      Ver
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="76:4935" data-name="Iconografia Arrow - Zupper">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="76:4936" data-name="Linha 2">
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px] w-[148px]" data-node-id="76:4937">
                    Suas dicas, fotos e roteiros
                  </p>
                  <div className="content-stretch flex gap-[12px] h-[16px] items-center justify-end relative shrink-0 w-[120px]" data-node-id="76:4938" data-name="CTA" />
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="76:4941" data-name="Caminho 22446">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="76:4942" data-name="Inputs Atendimento">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="76:4943">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="76:4944" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="76:4945" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[10px] mt-[10px] relative row-1 size-[24px]" data-node-id="76:4946" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="76:4947" data-name="Grupo 10781">
                      <div className="absolute contents inset-[8.33%_3.58%]" data-node-id="76:4948" data-name="Grupo 10780">
                        <div className="absolute contents inset-[33.46%_3.59%_8.33%_34.1%]" data-node-id="76:4949" data-name="Grupo 10779">
                          <div className="absolute contents inset-[33.46%_3.59%_8.33%_34.1%]" data-node-id="76:4950" data-name="Grupo 10778">
                            <div className="absolute inset-[33.46%_3.59%_8.33%_34.1%]" data-node-id="76:4951" data-name="Grupo 10777">
                              <div className="absolute inset-[-3.58%_-3.34%]">
                                <img alt="" className="block max-w-none size-full" src={imgGrupo10777} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-[8.33%_38.88%_41.36%_3.58%]" data-node-id="76:4956" data-name="Caminho 22381">
                          <div className="absolute inset-[-4.14%_-3.62%]">
                            <img alt="" className="block max-w-none size-full" src={imgCaminho22381} />
                          </div>
                        </div>
                      </div>
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo10781} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="76:4958">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="76:4959" data-name="Linha 1">
                  <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="76:4960">
                    Posts curtidos
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="76:4961" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="76:4962">
                      Ver
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="76:4963" data-name="Iconografia Arrow - Zupper">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="76:4964" data-name="Linha 2">
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px] w-[148px]" data-node-id="76:4965">
                    Conteúdos que você curtiu
                  </p>
                  <div className="content-stretch flex gap-[12px] h-[16px] items-center justify-end relative shrink-0 w-[120px]" data-node-id="76:4966" data-name="CTA" />
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="76:4969" data-name="Caminho 22442">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="76:4970" data-name="Inputs Atendimento">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="76:4971">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="76:4972" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="76:4973" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[10px] mt-[10px] overflow-clip relative row-1 size-[24px]" data-node-id="76:4974" data-name="compass">
                    <div className="absolute inset-[8.33%_12.5%]" data-node-id="I76:4974;2:14585" data-name="elements">
                      <div className="absolute inset-[-2.5%_-2.78%]">
                        <img alt="" className="block max-w-none size-full" src={imgElements1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="76:4975">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="76:4976" data-name="Linha 1">
                  <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="76:4977">
                    Preferências de viagem
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="76:4978" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="76:4979">
                      Editar
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="76:4980" data-name="Iconografia Arrow - Zupper">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="76:4981" data-name="Linha 2">
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] mr-[-11px] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap" data-node-id="76:4982">
                    Estilos e destinos que você gosta
                  </p>
                  <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[120px]" data-node-id="76:4983" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#eab308] text-[12px] text-right w-[119.034px]" data-node-id="76:4984">
                      Pendente
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="76:4986" data-name="Caminho 22443">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full" data-node-id="76:4987" data-name="Inputs Atendimento">
              <div className="content-stretch flex items-center relative shrink-0" data-node-id="76:4988">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="76:4989" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="76:4990" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[10px] mt-[10px] overflow-clip relative row-1 size-[24px]" data-node-id="76:4991" data-name="user-block-01">
                    <div className="absolute inset-[8.33%]" data-node-id="I76:4991;2:8253" data-name="elements">
                      <div className="absolute inset-[-2.5%]">
                        <img alt="" className="block max-w-none size-full" src={imgElements2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-node-id="76:4992">
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="76:4993" data-name="Linha 1">
                  <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="76:4994">
                    Contas bloqueadas
                  </p>
                  <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="76:4995" data-name="CTA">
                    <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right whitespace-nowrap" data-node-id="76:4996">
                      Gerenciar
                    </p>
                    <div className="relative shrink-0 size-[12px]" data-node-id="76:4997" data-name="Iconografia Arrow - Zupper">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-center relative shrink-0 w-full" data-node-id="76:4998" data-name="Linha 2">
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#737373] text-[12px] whitespace-nowrap" data-node-id="76:4999">
                    Perfis que você não quer ver
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0 w-full" data-node-id="37:3330" data-name="SAC">
          <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[24px] not-italic relative shrink-0 text-[#404040] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="37:3331">
            Ajuda
          </p>
          <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-node-id="37:3332" data-name="Lista Padrão (Com Ícone)">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="37:3333" data-name="Inputs Atendimento">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="I37:3333;1110:20722">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I37:3333;1110:20723" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I37:3333;1110:20724" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I37:3333;1110:20725" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="I37:3333;1110:20725;578:4019" data-name="Grupo 11138">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo11138} />
                      <div className="absolute inset-[16.67%_16.68%]" data-node-id="I37:3333;1110:20725;578:4022" data-name="Grupo 8280">
                        <div className="absolute inset-[-3.12%_-3.12%_-3.12%_-3.13%]">
                          <img alt="" className="block max-w-none size-full" src={imgGrupo8280} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I37:3333;1110:20726">
                  Central de ajuda
                </p>
              </div>
              <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I37:3333;1110:20727" data-name="CTA">
                <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I37:3333;1110:20728">
                  Ir agora
                </p>
                <div className="relative shrink-0 size-[12px]" data-node-id="I37:3333;1110:20729" data-name="Iconografia Arrow - Zupper">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="37:2942" data-name="Caminho 22442">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="37:3335" data-name="Inputs Atendimento">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="I37:3335;1110:20722">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I37:3335;1110:20723" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I37:3335;1110:20724" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I37:3335;1110:20725" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="I37:3335;1110:20725;578:4019" data-name="Grupo 11138">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo11138} />
                      <div className="absolute inset-[16.67%_16.68%]" data-node-id="I37:3335;1110:20725;578:4022" data-name="Grupo 8280">
                        <div className="absolute inset-[-3.13%_-3.13%_-3.12%_-3.13%]">
                          <img alt="" className="block max-w-none size-full" src={imgIconografiaPadraoZupper2} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I37:3335;1110:20726">
                  Sobre o Zupper
                </p>
              </div>
              <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I37:3335;1110:20727" data-name="CTA">
                <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I37:3335;1110:20728">
                  Ir agora
                </p>
                <div className="relative shrink-0 size-[12px]" data-node-id="I37:3335;1110:20729" data-name="Iconografia Arrow - Zupper">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0 w-full" data-node-id="37:3067" data-name="SAC">
          <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[24px] not-italic relative shrink-0 text-[#404040] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="37:3068">
            Privacidade
          </p>
          <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-node-id="37:3069" data-name="Lista Padrão (Com Ícone)">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="37:3104" data-name="Inputs Atendimento">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="I37:3104;1110:20688">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I37:3104;1110:20689" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I37:3104;1110:20690" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I37:3104;1110:20691" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="I37:3104;1110:20691;578:3768" data-name="Grupo 10815">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo10781} />
                      <div className="absolute contents inset-[16.67%]" data-node-id="I37:3104;1110:20691;578:3770" data-name="Grupo 10814">
                        <div className="absolute inset-[16.67%]" data-node-id="I37:3104;1110:20691;578:3771" data-name="Grupo 10813">
                          <div className="absolute inset-[-3.13%]">
                            <img alt="" className="block max-w-none size-full" src={imgIconografiaPadraoZupper3} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I37:3104;1110:20692">
                  Política de privacidade
                </p>
              </div>
              <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I37:3104;1110:20693" data-name="CTA">
                <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I37:3104;1110:20694">
                  Ir agora
                </p>
                <div className="relative shrink-0 size-[12px]" data-node-id="I37:3104;1110:20695" data-name="Iconografia Arrow - Zupper">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="37:3071" data-name="Caminho 22442">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="37:3105" data-name="Inputs Atendimento">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="I37:3105;1110:20705">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I37:3105;1110:20706" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I37:3105;1110:20707" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I37:3105;1110:20708" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="I37:3105;1110:20708;578:3754" data-name="Grupo 10811">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo10781} />
                      <div className="absolute contents inset-[13.37%_13.55%_13.36%_13.51%]" data-node-id="I37:3105;1110:20708;578:3756" data-name="Grupo 10810">
                        <div className="absolute contents inset-[13.37%_13.55%_13.36%_13.51%]" data-node-id="I37:3105;1110:20708;578:3757" data-name="Grupo 10807">
                          <div className="absolute inset-[13.37%_13.55%_13.36%_13.51%]" data-node-id="I37:3105;1110:20708;578:3758" data-name="Grupo 10806">
                            <div className="absolute inset-[-2.84%_-2.86%]">
                              <img alt="" className="block max-w-none size-full" src={imgIconografiaPadraoZupper4} />
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-[31.25%]" data-node-id="I37:3105;1110:20708;578:3760" data-name="Grupo 10809">
                          <div className="absolute inset-[-5.56%_-5.56%_-5.55%_-5.55%]">
                            <img alt="" className="block max-w-none size-full" src={imgIconografiaPadraoZupper5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I37:3105;1110:20709">
                  Termos e condições
                </p>
              </div>
              <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I37:3105;1110:20710" data-name="CTA">
                <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I37:3105;1110:20711">
                  Ir agora
                </p>
                <div className="relative shrink-0 size-[12px]" data-node-id="I37:3105;1110:20712" data-name="Iconografia Arrow - Zupper">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper1} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-node-id="37:3344" data-name="Logout">
          <div className="content-stretch flex items-center justify-center overflow-clip px-[20px] py-[12px] relative rounded-[40px] shrink-0 w-[330px]" data-node-id="37:3345" data-name="Primary button - App">
            <div className="[word-break:break-word] flex flex-col font-['Satoshi:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#ef4444] text-[14px] text-center tracking-[0.28px] whitespace-nowrap" data-node-id="I37:3345;2124:66692">
              <p className="leading-[20px]">Sair da minha conta zupper</p>
            </div>
          </div>
        </div>
        <div className="bg-white content-stretch flex gap-[8px] items-start justify-center px-[20px] py-[16px] relative shrink-0 w-full" data-node-id="60:6594" data-name="Bottom Nav Principal - Buscar">
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-node-id="60:6595" data-name="Promos">
            <div className="relative shrink-0 size-[24px]" data-node-id="60:6596" data-name="Iconografia Padrão - Zupper">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper6} />
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center w-[62px]" data-node-id="60:6597">
              <p className="leading-[16px]">Início</p>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-node-id="60:6598" data-name="Buscar">
            <div className="relative shrink-0 size-[24px]" data-node-id="60:6599" data-name="Iconografia Padrão - Zupper">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper7} />
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center w-[37px]" data-node-id="60:6600">
              <p className="leading-[16px]">Buscar</p>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-node-id="60:6601" data-name="Pedidos">
            <div className="relative shrink-0 size-[24px]" data-node-id="60:6602" data-name="Iconografia Padrão - Zupper">
              <div className="absolute contents inset-0" data-node-id="I60:6602;578:3667" data-name="Grupo 8263">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo10781} />
                <div className="absolute contents inset-[8.33%_16.67%]" data-node-id="I60:6602;578:3669" data-name="Grupo 8262">
                  <div className="absolute contents inset-[62.96%_39.58%_33.33%_52.08%]" data-node-id="I60:6602;578:3670" data-name="Grupo 8258">
                    <div className="absolute inset-[62.96%_39.58%_33.33%_52.08%]" data-node-id="I60:6602;578:3671" data-name="Grupo 8257">
                      <div className="absolute inset-[-56.17%_-25%]">
                        <img alt="" className="block max-w-none size-full" src={imgGrupo8257} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-[47.97%_31.25%_41.67%_43.75%]" data-node-id="I60:6602;578:3673" data-name="Caminho 5727">
                    <div className="absolute inset-[-20.11%_-8.33%]">
                      <img alt="" className="block max-w-none size-full" src={imgCaminho5727} />
                    </div>
                  </div>
                  <div className="absolute inset-[37.5%_43.64%_37.04%_56.25%]" data-node-id="I60:6602;578:3674" data-name="Linha 112">
                    <div className="absolute inset-[-8.18%_-1923.08%]">
                      <img alt="" className="block max-w-none size-full" src={imgLinha112} />
                    </div>
                  </div>
                  <div className="absolute inset-[8.33%_16.67%_20.83%_29.17%]" data-node-id="I60:6602;578:3675" data-name="Retângulo 528">
                    <div className="absolute inset-[-2.94%_-3.85%]">
                      <img alt="" className="block max-w-none size-full" src={imgRetangulo528} />
                    </div>
                  </div>
                  <div className="absolute bottom-[8.33%] left-[16.67%] right-[29.17%] top-1/4" data-node-id="I60:6602;578:3676" data-name="Caminho 5728">
                    <div className="absolute inset-[-3.13%_-3.85%]">
                      <img alt="" className="block max-w-none size-full" src={imgCaminho5728} />
                    </div>
                  </div>
                  <div className="absolute inset-[25.02%_60.94%_74.98%_39.02%]" data-node-id="I60:6602;578:3677" data-name="Shape 3077">
                    <div className="absolute inset-[-0.5px_-4995.12%]">
                      <img alt="" className="block max-w-none size-full" src={imgShape3077} />
                    </div>
                  </div>
                  <div className="absolute inset-[25.02%_49.48%_74.98%_50.48%]" data-node-id="I60:6602;578:3678" data-name="Shape 3077">
                    <div className="absolute inset-[-0.5px_-4995.12%]">
                      <img alt="" className="block max-w-none size-full" src={imgShape3077} />
                    </div>
                  </div>
                  <div className="absolute inset-[25.02%_38%_74.98%_61.96%]" data-node-id="I60:6602;578:3679" data-name="Shape 3077">
                    <div className="absolute inset-[-0.5px_-4995.12%]">
                      <img alt="" className="block max-w-none size-full" src={imgShape3077} />
                    </div>
                  </div>
                  <div className="absolute inset-[25.02%_26.52%_74.98%_73.44%]" data-node-id="I60:6602;578:3680" data-name="Shape 3077">
                    <div className="absolute inset-[-0.5px_-4995.12%]">
                      <img alt="" className="block max-w-none size-full" src={imgShape3077} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center w-[76px]" data-node-id="60:6603">
              <p className="leading-[16px]">Pedidos</p>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-node-id="60:6604" data-name="Conta">
            <div className="relative shrink-0 size-[24px]" data-node-id="60:6605" data-name="Iconografia Padrão - Zupper">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper} />
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center w-[33px]" data-node-id="60:6606">
              <p className="leading-[16px]">Conta</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
