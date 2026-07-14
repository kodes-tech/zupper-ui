// Referência de código gerada pelo Figma Dev Mode (get_design_context) — NÃO É
// PARA RODAR. Guarda os valores exatos (px, cor, font) desta tela. Ver
// templates/README.md antes de usar.
//
// Figma: https://www.figma.com/design/CRJYlaF0ep3mKL5fwH3e31/Zupper-2.0?node-id=60-7229
// Node: 60:7229 — "Minha conta - Deslogado". Sem seção "Meu perfil" nem
// "Comunidade" (não há usuário logado) — só CTA "Iniciar sessão", Ajuda e
// Privacidade. Bottom nav é uma variante diferente da instância "Tabs"
// (property1="Bottom Nav Principal - Conta"): Buscar/Promoções/Meus
// Pedidos/Conta, com "Conta" ativo (teal). O ícone de "Promoções" veio vazio
// no Figma (placeholder de instance-swap não resolvido — mesmo padrão de
// gaps já documentado em outras telas deste projeto).
// Capturado em: 2026-07-10

const imgIconografiaPadraoZupper = "https://www.figma.com/api/mcp/asset/82523558-b241-4a83-973a-3a5fe7f567ba";
const imgIconografiaPadraoZupper1 = "https://www.figma.com/api/mcp/asset/7a259fd1-4423-4479-a008-269bc949f5a2"; // "Promoções" — vazio no Figma
const imgGrupo8263 = "https://www.figma.com/api/mcp/asset/b9578160-dd1d-4f0e-9861-aa3f488d54fe";
const imgGrupo8257 = "https://www.figma.com/api/mcp/asset/e91dd340-6cdf-4b8e-bf09-2788c1551d19";
const imgCaminho5727 = "https://www.figma.com/api/mcp/asset/d2ed7d57-b4ca-4517-8752-85e0405a9610";
const imgLinha112 = "https://www.figma.com/api/mcp/asset/90b0bc32-b38a-4eff-967d-961a10350625";
const imgRetangulo528 = "https://www.figma.com/api/mcp/asset/93813c56-292d-48db-951d-f3744327686a";
const imgCaminho5728 = "https://www.figma.com/api/mcp/asset/b1327bd7-30c0-450b-985e-ceaf3ed0bf17";
const imgShape3078 = "https://www.figma.com/api/mcp/asset/abb74c0f-4ff3-459f-abd6-2fc937d31655";
const imgIconografiaPadraoZupper2 = "https://www.figma.com/api/mcp/asset/1339a830-e13d-4b14-becd-932e660ceb5e"; // "Conta" ativo, teal #009DAF
const imgGrupo11138 = "https://www.figma.com/api/mcp/asset/9d8622ff-1618-47ab-9491-d9d57d78ce34";
const imgGrupo8280 = "https://www.figma.com/api/mcp/asset/04c86df9-8449-4f53-b7a3-a69f4772c7a3";
const imgIconografiaArrowZupper = "https://www.figma.com/api/mcp/asset/91deec9b-362e-4b5e-bb2c-ec4ea8916605";
const imgCaminho22442 = "https://www.figma.com/api/mcp/asset/ffdb51e5-312d-41f0-8324-61ee65b2ba5c";
const imgRetangulo534 = "https://www.figma.com/api/mcp/asset/71fe07d1-18ef-4ce6-bfa8-c892ea0bf103";
const imgCaminho22443 = "https://www.figma.com/api/mcp/asset/2b805cb4-fdc9-44d8-a8ab-e95bce35e418";
const imgIconografiaPadraoZupper6 = "https://www.figma.com/api/mcp/asset/ba53791e-9f08-4daa-b72c-4c68d50e241c";
const imgIconografiaPadraoZupper8 = "https://www.figma.com/api/mcp/asset/0544a2df-dca1-407d-aee1-9274601fcb0c";
const imgIconografiaPadraoZupper9 = "https://www.figma.com/api/mcp/asset/b606ba36-efa4-458e-8725-7e850997dd77";
const imgIconografiaAppZupper = "https://www.figma.com/api/mcp/asset/ebd08118-de62-4cdd-88d0-a7012c94cc7e";

type TabsProps = {
  className?: string;
  property1?: "Tab Principal - Voos" | "Bottom Nav Principal - Conta";
};

function Tabs({ className, property1 = "Bottom Nav Principal - Conta" }: TabsProps) {
  return (
    <div className={className || "h-[78px] w-[376px]"} id="node-18_35">
      <div className="absolute bg-white content-stretch flex gap-[8px] inset-0 items-start justify-center py-[16px]" data-node-id="18:36" data-name="Bottom Nav Principal - Buscar">
        <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[80px]" data-node-id="18:37" data-name="Buscar">
          <div className="relative shrink-0 size-[24px]" data-node-id="18:38" data-name="Iconografia Padrão - Zupper">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center w-[37px]" data-node-id="18:39">
            <p className="leading-[16px]">Buscar</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[80px]" data-node-id="18:40" data-name="Promos">
          <div className="relative shrink-0 size-[24px]" data-node-id="18:41" data-name="Iconografia Padrão - Zupper">
            {/* base "Retângulo 531" vazia no Figma (instance-swap não resolvido) — ../assets/icon-fire.svg
                usado no preview.html como substituto visual de "Promoções" */}
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper1} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center w-[62px]" data-node-id="18:42">
            <p className="leading-[16px]">Promoções</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[80px]" data-node-id="18:43" data-name="Pedidos">
          <div className="relative shrink-0 size-[24px]" data-node-id="18:44" data-name="Iconografia Padrão - Zupper">
            <div className="absolute contents inset-0" data-node-id="I18:44;578:3667" data-name="Grupo 8263">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo8263} />
              <div className="absolute contents inset-[8.33%_16.67%]" data-node-id="I18:44;578:3669" data-name="Grupo 8262">
                <div className="absolute contents inset-[62.96%_39.58%_33.33%_52.08%]" data-node-id="I18:44;578:3670" data-name="Grupo 8258">
                  <div className="absolute inset-[62.96%_39.58%_33.33%_52.08%]" data-node-id="I18:44;578:3671" data-name="Grupo 8257">
                    <div className="absolute inset-[-56.17%_-25%]">
                      <img alt="" className="block max-w-none size-full" src={imgGrupo8257} />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-[47.97%_31.25%_41.67%_43.75%]" data-node-id="I18:44;578:3673" data-name="Caminho 5727">
                  <div className="absolute inset-[-20.11%_-8.33%]">
                    <img alt="" className="block max-w-none size-full" src={imgCaminho5727} />
                  </div>
                </div>
                <div className="absolute inset-[37.5%_43.64%_37.04%_56.25%]" data-node-id="I18:44;578:3674" data-name="Linha 112">
                  <div className="absolute inset-[-8.18%_-1923.08%]">
                    <img alt="" className="block max-w-none size-full" src={imgLinha112} />
                  </div>
                </div>
                <div className="absolute inset-[8.33%_16.67%_20.83%_29.17%]" data-node-id="I18:44;578:3675" data-name="Retângulo 528">
                  <div className="absolute inset-[-2.94%_-3.85%]">
                    <img alt="" className="block max-w-none size-full" src={imgRetangulo528} />
                  </div>
                </div>
                <div className="absolute bottom-[8.33%] left-[16.67%] right-[29.17%] top-1/4" data-node-id="I18:44;578:3676" data-name="Caminho 5728">
                  <div className="absolute inset-[-3.13%_-3.85%]">
                    <img alt="" className="block max-w-none size-full" src={imgCaminho5728} />
                  </div>
                </div>
                <div className="absolute inset-[25.02%_60.94%_74.98%_39.02%]" data-node-id="I18:44;578:3677" data-name="Shape 3077">
                  <div className="absolute inset-[-0.5px_-4995.12%]">
                    <img alt="" className="block max-w-none size-full" src={imgShape3078} />
                  </div>
                </div>
                <div className="absolute inset-[25.02%_49.48%_74.98%_50.48%]" data-node-id="I18:44;578:3678" data-name="Shape 3077">
                  <div className="absolute inset-[-0.5px_-4995.12%]">
                    <img alt="" className="block max-w-none size-full" src={imgShape3078} />
                  </div>
                </div>
                <div className="absolute inset-[25.02%_38%_74.98%_61.96%]" data-node-id="I18:44;578:3679" data-name="Shape 3077">
                  <div className="absolute inset-[-0.5px_-4995.12%]">
                    <img alt="" className="block max-w-none size-full" src={imgShape3078} />
                  </div>
                </div>
                <div className="absolute inset-[25.02%_26.52%_74.98%_73.44%]" data-node-id="I18:44;578:3680" data-name="Shape 3077">
                  <div className="absolute inset-[-0.5px_-4995.12%]">
                    <img alt="" className="block max-w-none size-full" src={imgShape3078} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#737373] text-[12px] text-center w-[76px]" data-node-id="18:45">
            <p className="leading-[16px]">Meus Pedidos</p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[80px]" data-node-id="18:46" data-name="Conta">
          <div className="relative shrink-0 size-[24px]" data-node-id="18:47" data-name="Iconografia Padrão - Zupper">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper2} />
          </div>
          <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[#009daf] text-[12px] text-center w-[33px]" data-node-id="18:48">
            <p className="leading-[16px]">Conta</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MinhaContaDeslogado() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-start relative size-full" data-node-id="60:7229" data-name="Minha conta - Deslogado">
      <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0" data-node-id="60:7230" data-name="Componentes">
        <div className="bg-white content-stretch flex flex-col h-[104px] items-start relative shrink-0" data-node-id="60:7231">
          <div className="content-stretch flex gap-[120px] items-center justify-center pb-[4px] pt-[52px] px-[24px] relative shrink-0 w-[375px]" data-node-id="60:7232" data-name="Título">
            <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[24px] not-italic relative shrink-0 text-[#404040] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="60:7234">
              Minha conta
            </p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0 w-[375px]" data-node-id="60:7235" data-name="Título">
          <div className="[word-break:break-word] content-stretch flex flex-col items-start not-italic relative shrink-0" data-node-id="60:7236">
            <div className="flex flex-col font-['Satoshi:Bold'] justify-center leading-[0] relative shrink-0 text-[#404040] text-[22px] text-center tracking-[0.44px] whitespace-nowrap" data-node-id="60:7237">
              <p className="leading-[32px]">Minha conta</p>
            </div>
            <p className="font-['Satoshi:Medium'] leading-[24px] relative shrink-0 text-[#737373] text-[16px] tracking-[0.32px] w-[324.541px]" data-node-id="60:7238">
              Faça o login ou crie uma conta para gerenciar suas reservas e aproveitar as vantagens.
            </p>
          </div>
          <div className="border border-[#009daf] border-solid content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[20px] py-[8px] relative rounded-[40px] shrink-0 w-full" data-node-id="60:7239" data-name="Secundary button - App">
            <div className="relative shrink-0 size-[24px]" data-node-id="I60:7239;2328:44459" data-name="Iconografia APP - Zupper">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaAppZupper} />
            </div>
            <div className="[word-break:break-word] flex flex-col font-['Satoshi:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#009daf] text-[16px] text-center tracking-[0.32px] whitespace-nowrap" data-node-id="I60:7239;2328:44460">
              <p className="leading-[24px]">Iniciar sessão</p>
            </div>
          </div>
        </div>
        <div className="h-px relative shrink-0 w-[376px]" data-node-id="60:7240" data-name="Caminho 22442">
          <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
            <img alt="" className="block max-w-none size-full" src={imgCaminho22442} />
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0 w-full" data-node-id="60:7538" data-name="SAC">
          <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[24px] not-italic relative shrink-0 text-[#404040] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="60:7539">
            Ajuda
          </p>
          <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-node-id="60:7540" data-name="Lista Padrão (Com Ícone)">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="60:7541" data-name="Inputs Atendimento">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="I60:7541;1110:20722">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I60:7541;1110:20723" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I60:7541;1110:20724" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I60:7541;1110:20725" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="I60:7541;1110:20725;578:4019" data-name="Grupo 11138">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo11138} />
                      <div className="absolute inset-[16.67%_16.68%]" data-node-id="I60:7541;1110:20725;578:4022" data-name="Grupo 8280">
                        <div className="absolute inset-[-3.13%_-3.12%_-3.13%_-3.13%]">
                          <img alt="" className="block max-w-none size-full" src={imgGrupo8280} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I60:7541;1110:20726">
                  Central de ajuda
                </p>
              </div>
              <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I60:7541;1110:20727" data-name="CTA">
                <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I60:7541;1110:20728">
                  Ir agora
                </p>
                <div className="relative shrink-0 size-[12px]" data-node-id="I60:7541;1110:20729" data-name="Iconografia Arrow - Zupper">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper} />
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="60:7542" data-name="Caminho 22442">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="60:7543" data-name="Inputs Atendimento">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="I60:7543;1110:20722">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I60:7543;1110:20723" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I60:7543;1110:20724" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I60:7543;1110:20725" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="I60:7543;1110:20725;578:4019" data-name="Grupo 11138">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo11138} />
                      <div className="absolute inset-[16.67%_16.68%]" data-node-id="I60:7543;1110:20725;578:4022" data-name="Grupo 8280">
                        <div className="absolute inset-[-3.13%_-3.13%_-3.12%_-3.13%]">
                          <img alt="" className="block max-w-none size-full" src={imgIconografiaPadraoZupper6} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I60:7543;1110:20726">
                  Sobre o Zupper
                </p>
              </div>
              <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I60:7543;1110:20727" data-name="CTA">
                <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I60:7543;1110:20728">
                  Ir agora
                </p>
                <div className="relative shrink-0 size-[12px]" data-node-id="I60:7543;1110:20729" data-name="Iconografia Arrow - Zupper">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[16px] items-start px-[24px] relative shrink-0 w-full" data-node-id="60:7545" data-name="SAC">
          <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[24px] not-italic relative shrink-0 text-[#404040] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="60:7546">
            Privacidade
          </p>
          <div className="content-stretch flex flex-col gap-[12px] items-center relative shrink-0 w-full" data-node-id="60:7547" data-name="Lista Padrão (Com Ícone)">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="60:7548" data-name="Inputs Atendimento">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="I60:7548;1110:20688">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I60:7548;1110:20689" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I60:7548;1110:20690" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I60:7548;1110:20691" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="I60:7548;1110:20691;578:3768" data-name="Grupo 10815">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo8263} />
                      <div className="absolute contents inset-[16.67%]" data-node-id="I60:7548;1110:20691;578:3770" data-name="Grupo 10814">
                        <div className="absolute inset-[16.67%]" data-node-id="I60:7548;1110:20691;578:3771" data-name="Grupo 10813">
                          <div className="absolute inset-[-3.13%]">
                            <img alt="" className="block max-w-none size-full" src={imgIconografiaPadraoZupper8} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I60:7548;1110:20692">
                  Política de privacidade
                </p>
              </div>
              <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I60:7548;1110:20693" data-name="CTA">
                <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I60:7548;1110:20694">
                  Ir agora
                </p>
                <div className="relative shrink-0 size-[12px]" data-node-id="I60:7548;1110:20695" data-name="Iconografia Arrow - Zupper">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper} />
                </div>
              </div>
            </div>
            <div className="h-px relative shrink-0 w-full" data-node-id="60:7549" data-name="Caminho 22442">
              <div className="absolute bottom-1/2 left-0 right-0 top-[-50%]">
                <img alt="" className="block max-w-none size-full" src={imgCaminho22443} />
              </div>
            </div>
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="60:7551" data-name="Inputs Atendimento">
              <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-node-id="I60:7551;1110:20705">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="I60:7551;1110:20706" data-name="Grupo 10961">
                  <div className="col-1 ml-0 mt-0 relative row-1 size-[43px]" data-node-id="I60:7551;1110:20707" data-name="Retângulo 534">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgRetangulo534} />
                  </div>
                  <div className="col-1 ml-[9.5px] mt-[9.5px] relative row-1 size-[24px]" data-node-id="I60:7551;1110:20708" data-name="Iconografia Padrão - Zupper">
                    <div className="absolute contents inset-0" data-node-id="I60:7551;1110:20708;578:3754" data-name="Grupo 10811">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo8263} />
                      <div className="absolute contents inset-[13.37%_13.55%_13.36%_13.51%]" data-node-id="I60:7551;1110:20708;578:3756" data-name="Grupo 10810">
                        <div className="absolute contents inset-[13.37%_13.55%_13.36%_13.51%]" data-node-id="I60:7551;1110:20708;578:3757" data-name="Grupo 10807">
                          <div className="absolute inset-[13.37%_13.55%_13.36%_13.51%]" data-node-id="I60:7551;1110:20708;578:3758" data-name="Grupo 10806">
                            <div className="absolute inset-[-2.84%_-2.86%]">
                              <img alt="" className="block max-w-none size-full" src={imgIconografiaPadraoZupper8} />
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-[31.25%]" data-node-id="I60:7551;1110:20708;578:3760" data-name="Grupo 10809">
                          <div className="absolute inset-[-5.56%_-5.56%_-5.55%_-5.55%]">
                            <img alt="" className="block max-w-none size-full" src={imgIconografiaPadraoZupper9} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[20px] not-italic relative shrink-0 text-[#404040] text-[14px] tracking-[0.28px] whitespace-nowrap" data-node-id="I60:7551;1110:20709">
                  Termos e condições
                </p>
              </div>
              <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[80px]" data-node-id="I60:7551;1110:20710" data-name="CTA">
                <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[#404040] text-[12px] text-right w-[42.545px]" data-node-id="I60:7551;1110:20711">
                  Ir agora
                </p>
                <div className="relative shrink-0 size-[12px]" data-node-id="I60:7551;1110:20712" data-name="Iconografia Arrow - Zupper">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tabs className="h-[78px] relative shrink-0 w-[376px]" property1="Bottom Nav Principal - Conta" />
      </div>
    </div>
  );
}
