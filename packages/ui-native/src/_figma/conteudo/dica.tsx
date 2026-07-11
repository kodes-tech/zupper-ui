// Referência de código gerada pelo Figma Dev Mode (get_design_context) — NÃO É
// PARA RODAR. Guarda os valores exatos (px, cor, font) desta tela. Ver
// templates/README.md antes de usar.
//
// Figma: https://www.figma.com/design/CRJYlaF0ep3mKL5fwH3e31/Zupper-2.0?node-id=143-8671
// Node: 143:8671 — "5. Conteúdo - Dica"
// Capturado em: 2026-07-10
//
// Nota: o label da nav ("Foto") aparece hardcoded como "Foto" nas 3 variantes
// dessa tela (Foto/Dica/Roteiro) — parece um artefato de copiar-colar no
// próprio arquivo Figma, não algo que eu inventei na captura. Ver PR.

const imgIconografiaPadraoZupper = "https://www.figma.com/api/mcp/asset/f87023e1-8317-4ea2-8ab9-7d4cb4455350";
const imgIconografiaPadraoZupper1 = "https://www.figma.com/api/mcp/asset/6f727e93-fb26-4caf-8fb1-14218c3f6103";
const imgGrupo8263 = "https://www.figma.com/api/mcp/asset/e4b2afc6-5258-42ad-a338-7c6ea23c0b8d";
const imgGrupo8257 = "https://www.figma.com/api/mcp/asset/704433b5-ec29-4e3e-a188-21b377473c98";
const imgCaminho5727 = "https://www.figma.com/api/mcp/asset/3624b761-94a2-4396-95e7-a2af03f848d0";
const imgLinha112 = "https://www.figma.com/api/mcp/asset/e25290db-ff79-4d34-8178-a2342418ac14";
const imgRetangulo528 = "https://www.figma.com/api/mcp/asset/2dbfdfd5-065d-455d-b63e-e9620a7717dc";
const imgCaminho5728 = "https://www.figma.com/api/mcp/asset/694ba93d-2e39-426d-a487-620ec6047309";
const imgShape3077 = "https://www.figma.com/api/mcp/asset/7a532982-4b82-46f2-a31e-8f89982e6b2d";
const imgIconografiaPadraoZupper2 = "https://www.figma.com/api/mcp/asset/595c0b8f-8ba9-4f39-bd89-fcd018197c17";
const imgGrupo10777 = "https://www.figma.com/api/mcp/asset/d752c77b-bae6-43ab-a056-475aeaaef237";
const imgCaminho22381 = "https://www.figma.com/api/mcp/asset/c5180153-9435-4ab5-b36a-07005e7b2559";
const imgElements = "https://www.figma.com/api/mcp/asset/9d722126-5115-4541-a7dc-40130530a6e6";
const imgElements1 = "https://www.figma.com/api/mcp/asset/4e98ce7a-63b2-4b42-81e6-eb3024f72388";
const imgElements2 = "https://www.figma.com/api/mcp/asset/76a78439-a82f-4126-a9bf-8eac029439eb";
const imgProperty1ArrowBack = "https://www.figma.com/api/mcp/asset/cad33c5e-c6e2-4012-9e2f-ea033d4cff30";
const imgAvatar = "https://www.figma.com/api/mcp/asset/8890327c-6db3-40e1-83ca-3c0415dbb5a8";
const imgIconografiaArrowZupper = "https://www.figma.com/api/mcp/asset/30680b06-3b92-460f-85bf-368e331c1556";
const imgElements3 = "https://www.figma.com/api/mcp/asset/2adedec5-698f-4d37-9641-b5cf1b39ad8c";
const imgElements4 = "https://www.figma.com/api/mcp/asset/f2e44c62-e2d3-4d65-b0e3-2aeb0b11d7b8";
const imgEllipse = "https://www.figma.com/api/mcp/asset/e31d51a2-8f6f-4477-8a45-23f7b1ffe181";
const imgElements5 = "https://www.figma.com/api/mcp/asset/053ca40e-6230-4ec2-8e8c-d05becae2f3f";

type BottomNavProps = {
  className?: string;
  propriedade1?: "default";
};

function BottomNav({ className, propriedade1 = "default" }: BottomNavProps) {
  return (
    <div className={className || "bg-white content-stretch flex gap-[8px] items-start justify-center px-[20px] py-[16px] relative w-[390px]"} data-node-id="116:6700">
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-node-id="116:6662" data-name="Promos">
        <div className="relative shrink-0 size-[24px]" data-node-id="116:6663" data-name="Iconografia Padrão - Zupper">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper} />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-[color:var(--text\/highlight,#008c99)] text-center w-[62px]" data-node-id="116:6664">
          <p className="leading-[16px] text-[#262626] text-[12px]">Início</p>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-node-id="116:6665" data-name="Buscar">
        <div className="relative shrink-0 size-[24px]" data-node-id="116:6666" data-name="Iconografia Padrão - Zupper">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper1} />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--text\/primary,#262626)] text-center whitespace-nowrap" data-node-id="116:6667">
          <p className="leading-[16px]">Reservar</p>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-node-id="116:6668" data-name="Pedidos">
        <div className="relative shrink-0 size-[24px]" data-node-id="116:6669" data-name="Iconografia Padrão - Zupper">
          <div className="absolute contents inset-0" data-node-id="I116:6669;578:3667" data-name="Grupo 8263">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo8263} />
            <div className="absolute contents inset-[8.33%_16.67%]" data-node-id="I116:6669;578:3669" data-name="Grupo 8262">
              <div className="absolute contents inset-[62.96%_39.58%_33.33%_52.08%]" data-node-id="I116:6669;578:3670" data-name="Grupo 8258">
                <div className="absolute inset-[62.96%_39.58%_33.33%_52.08%]" data-node-id="I116:6669;578:3671" data-name="Grupo 8257">
                  <div className="absolute inset-[-56.17%_-25%]">
                    <img alt="" className="block max-w-none size-full" src={imgGrupo8257} />
                  </div>
                </div>
              </div>
              <div className="absolute inset-[47.97%_31.25%_41.67%_43.75%]" data-node-id="I116:6669;578:3673" data-name="Caminho 5727">
                <div className="absolute inset-[-20.11%_-8.33%]">
                  <img alt="" className="block max-w-none size-full" src={imgCaminho5727} />
                </div>
              </div>
              <div className="absolute inset-[37.5%_43.64%_37.04%_56.25%]" data-node-id="I116:6669;578:3674" data-name="Linha 112">
                <div className="absolute inset-[-8.18%_-1923.08%]">
                  <img alt="" className="block max-w-none size-full" src={imgLinha112} />
                </div>
              </div>
              <div className="absolute inset-[8.33%_16.67%_20.83%_29.17%]" data-node-id="I116:6669;578:3675" data-name="Retângulo 528">
                <div className="absolute inset-[-2.94%_-3.85%]">
                  <img alt="" className="block max-w-none size-full" src={imgRetangulo528} />
                </div>
              </div>
              <div className="absolute bottom-[8.33%] left-[16.67%] right-[29.17%] top-1/4" data-node-id="I116:6669;578:3676" data-name="Caminho 5728">
                <div className="absolute inset-[-3.13%_-3.85%]">
                  <img alt="" className="block max-w-none size-full" src={imgCaminho5728} />
                </div>
              </div>
              <div className="absolute inset-[25.02%_60.94%_74.98%_39.02%]" data-node-id="I116:6669;578:3677" data-name="Shape 3077">
                <div className="absolute inset-[-0.5px_-4995.12%]">
                  <img alt="" className="block max-w-none size-full" src={imgShape3077} />
                </div>
              </div>
              <div className="absolute inset-[25.02%_49.48%_74.98%_50.48%]" data-node-id="I116:6669;578:3678" data-name="Shape 3077">
                <div className="absolute inset-[-0.5px_-4995.12%]">
                  <img alt="" className="block max-w-none size-full" src={imgShape3077} />
                </div>
              </div>
              <div className="absolute inset-[25.02%_38%_74.98%_61.96%]" data-node-id="I116:6669;578:3679" data-name="Shape 3077">
                <div className="absolute inset-[-0.5px_-4995.12%]">
                  <img alt="" className="block max-w-none size-full" src={imgShape3077} />
                </div>
              </div>
              <div className="absolute inset-[25.02%_26.52%_74.98%_73.44%]" data-node-id="I116:6669;578:3680" data-name="Shape 3077">
                <div className="absolute inset-[-0.5px_-4995.12%]">
                  <img alt="" className="block max-w-none size-full" src={imgShape3077} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--text\/primary,#262626)] text-center w-[76px]" data-node-id="116:6670">
          <p className="leading-[16px]">Pedidos</p>
        </div>
      </div>
      <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] items-center min-w-px relative" data-node-id="116:6671" data-name="Conta">
        <div className="relative shrink-0 size-[24px]" data-node-id="116:6672" data-name="Iconografia Padrão - Zupper">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaPadraoZupper2} />
        </div>
        <div className="[word-break:break-word] flex flex-col font-['Satoshi:Medium'] h-[14px] justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-[color:var(--text\/primary,#262626)] text-center w-[33px]" data-node-id="116:6673">
          <p className="leading-[16px]">Conta</p>
        </div>
      </div>
    </div>
  );
}

type SocialBarProps = {
  className?: string;
  propriedade1?: "default";
};

function SocialBar({ className, propriedade1 = "default" }: SocialBarProps) {
  return (
    <div className={className || "content-stretch flex h-[52px] items-center justify-between overflow-clip py-[8px] relative w-[358px]"} data-node-id="140:8346">
      <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-node-id="140:8316">
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="140:8317">
          <div className="relative shrink-0 size-[24px]" data-node-id="140:8318" data-name="Iconografia Padrão - Zupper">
            <div className="absolute contents inset-0" data-node-id="140:8319" data-name="Grupo 10781">
              <div className="absolute contents inset-[8.33%_3.58%]" data-node-id="140:8320" data-name="Grupo 10780">
                <div className="absolute contents inset-[33.46%_3.59%_8.33%_34.1%]" data-node-id="140:8321" data-name="Grupo 10779">
                  <div className="absolute contents inset-[33.46%_3.59%_8.33%_34.1%]" data-node-id="140:8322" data-name="Grupo 10778">
                    <div className="absolute inset-[33.46%_3.59%_8.33%_34.1%]" data-node-id="140:8323" data-name="Grupo 10777">
                      <div className="absolute inset-[-5.37%_-5.02%_-5.37%_-5.01%]">
                        <img alt="" className="block max-w-none size-full" src={imgGrupo10777} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-[8.33%_38.88%_41.36%_3.58%]" data-node-id="140:8328" data-name="Caminho 22381">
                  <div className="absolute inset-[-6.21%_-5.43%]">
                    <img alt="" className="block max-w-none size-full" src={imgCaminho22381} />
                  </div>
                </div>
              </div>
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo8263} />
            </div>
          </div>
          <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[1.2] not-italic relative shrink-0 text-[14px] text-[color:var(--text\/secondary,#404040)] tracking-[0.28px] whitespace-nowrap" data-node-id="140:8330">
            00
          </p>
        </div>
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-node-id="140:8331">
          <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="140:8332" data-name="comment-01">
            <div className="absolute inset-[10.42%_8.33%]" data-node-id="I140:8332;629:10190" data-name="elements">
              <div className="absolute inset-[-3.95%_-3.75%]">
                <img alt="" className="block max-w-none size-full" src={imgElements} />
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[1.2] not-italic relative shrink-0 text-[14px] text-[color:var(--text\/secondary,#404040)] tracking-[0.28px] whitespace-nowrap" data-node-id="140:8333">
            00
          </p>
        </div>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="140:8334" data-name="share-01">
          <div className="absolute inset-[12.5%_8.33%_8.33%_8.33%]" data-node-id="I140:8334;2:2733" data-name="elements">
            <div className="absolute inset-[-3.95%_-3.75%]">
              <img alt="" className="block max-w-none size-full" src={imgElements1} />
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-node-id="140:8335" data-name="more-horizontal">
        <div className="absolute bottom-[45.83%] left-1/4 right-[24.96%] top-1/2" data-node-id="I140:8335;2:10209" data-name="elements">
          <div className="absolute inset-[-125%_-10.41%_-25%_-10.41%]">
            <img alt="" className="block max-w-none size-full" src={imgElements2} />
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default function Component5ConteudoDica() {
  return (
    <div className="bg-[var(--background\/background,#f5f5f5)] relative size-full" data-node-id="143:8671" data-name="5. Conteúdo - Dica">
      <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-node-id="143:8672" data-name="content">
        <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="143:8673" data-name="head">
          <div className="content-stretch flex items-center justify-between pb-[4px] pt-[40px] px-[24px] relative shrink-0 w-full" data-node-id="143:8674" data-name="nav">
            <IconografiaArrowZupper className="relative shrink-0 size-[24px]" />
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="143:8676">
              <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[1.5] not-italic relative shrink-0 text-[#1c1c1a] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="143:8677">
                Foto
              </p>
            </div>
            <div className="relative shrink-0 size-[24px]" data-node-id="143:8678" data-name="Iconografia Arrow - Zupper">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper} />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--spacing\/4,0px)] items-start overflow-clip pt-[var(--spacing\/16,16px)] relative shrink-0" data-node-id="143:8679" data-name="head">
            <div className="content-stretch flex flex-col gap-[var(--spacing\/8,8px)] items-end px-[var(--spacing\/16,16px)] py-[var(--spacing\/8,8px)] relative shrink-0 w-[390px]" data-node-id="143:8680" data-name="greeting">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="I143:8680;140:8451" data-name="title">
                <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[100px] shrink-0 size-[44px]" data-node-id="I143:8680;140:8452" data-name="Avatar">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[100px]">
                    <img alt="" className="absolute left-[-53.75%] max-w-none size-[199.08%] top-[-16.31%]" src={imgAvatar} />
                  </div>
                </div>
                <div className="flex flex-[1_0_0] flex-row items-center self-stretch" data-node-id="I143:8680;140:8454">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Satoshi:Medium'] h-full items-start justify-between min-w-px not-italic p-[var(--spacing\/4,4px)] relative" data-name="body">
                    <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--text\/primary,#262626)] tracking-[0.32px] w-full" data-node-id="I143:8680;140:8455">
                      <p className="font-['Satoshi:Bold'] leading-[1.5] text-[16px]">Carlos Souza</p>
                    </div>
                    <p className="leading-[16px] relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--spacing\/16,12px)] w-full" data-node-id="I143:8680;143:8628">
                      @carlosviaja
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center self-stretch" data-node-id="I143:8680;140:8457">
                  <div className="content-stretch flex flex-col h-full items-end justify-between px-[4px] py-[2px] relative shrink-0" data-name="tags">
                    <div className="bg-[var(--color\/mexico\/200,#d8fcfe)] content-stretch flex items-start overflow-clip px-[var(--spacing\/8,8px)] py-[var(--spacing\/4,4px)] relative rounded-[2px] shrink-0" data-node-id="I143:8680;140:8458" data-name="tag comunidade">
                      <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text\/highlight,#008c99)] whitespace-nowrap" data-node-id="I143:8680;140:8458;110:5904">
                        Viajante
                      </p>
                    </div>
                    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end relative shrink-0 w-[91px]" data-node-id="I143:8680;140:8459" data-name="CTA" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[390px]" data-node-id="143:8681" data-name="sec-destinos">
          <div className="content-stretch flex flex-col gap-[16px] items-center px-[24px] py-[20px] relative shrink-0 w-full" data-node-id="143:8805" data-name="Sessão 01 - Mudança de data">
            <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-node-id="143:8806">
              <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--text\/primary,#262626)] w-full" data-node-id="143:8807">
                Dicas essenciais para aproveitar Noronha sem gastar uma fortuna...
              </p>
              <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="143:8808">
                <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-node-id="143:8809">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="143:8810" data-name="calendar-03">
                    <div className="absolute inset-[8.33%_10.42%]" data-node-id="I143:8810;2:860" data-name="elements">
                      <div className="absolute inset-[-3.75%_-3.95%]">
                        <img alt="" className="block max-w-none size-full" src={imgElements3} />
                      </div>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text\/muted,#a3a3a3)] whitespace-nowrap" data-node-id="143:8811">
                    02/07/2026
                  </p>
                </div>
                <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-node-id="143:8812">
                  <div className="overflow-clip relative shrink-0 size-[16px]" data-node-id="143:8813" data-name="clock-01">
                    <div className="absolute inset-[8.33%]" data-node-id="I143:8813;2:738" data-name="elements">
                      <div className="absolute inset-[-3.75%]">
                        <img alt="" className="block max-w-none size-full" src={imgElements4} />
                      </div>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text\/muted,#a3a3a3)] w-[88px]" data-node-id="143:8814">
                    2 min de leitura
                  </p>
                </div>
              </div>
            </div>
            <p className="[word-break:break-word] font-['Satoshi:Regular'] leading-[1.2] not-italic relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--font-size\/body-sm,14px)] tracking-[0.28px] w-full" data-node-id="143:8815">
              Fernando de Noronha é um paraíso que pode ser aproveitado sem gastar muito. Para economizar, prefira visitar durante a baixa temporada, quando os preços de hospedagem e passeios são mais acessíveis. Opte por pousadas familiares ou hostels, que oferecem conforto a preços justos. Aproveite as praias públicas e faça trilhas autoguiadas para explorar a natureza sem custos extras. Leve lanches e água para evitar gastos com alimentação dentro do parque. Alugue bicicletas para se locomover de forma econômica e sustentável. Reserve passeios com antecedência e busque pacotes promocionais. Por fim, respeite as regras ambientais para garantir que esse paraíso continue acessível e preservado para todos.
            </p>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[10px] items-start pb-[var(--spacing\/16,16px)] px-[var(--spacing\/16,16px)] relative shrink-0 w-full" data-node-id="143:9562">
          <SocialBar className="content-stretch flex h-[52px] items-center justify-between overflow-clip py-[8px] relative shrink-0 w-full" />
          <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="143:9564" data-name="item-comentario">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--spacing\/4,4px)] items-start not-italic overflow-clip relative shrink-0 w-[358px]" data-node-id="143:9565" data-name="col">
              <p className="font-['Satoshi:Bold'] leading-[1.5] relative shrink-0 text-[16px] text-[color:var(--text\/primary,#262626)] tracking-[0.32px] whitespace-nowrap" data-node-id="143:9566">
                Carlos Souza
              </p>
              <p className="font-['Satoshi:Regular'] leading-[1.2] min-w-full relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--font-size\/body-sm,14px)] tracking-[0.28px] w-[min-content]" data-node-id="143:9567">
                Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local. Vale muito a visita!
              </p>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-node-id="143:9568">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Satoshi:Bold'] leading-[1.5] min-w-px not-italic relative text-[16px] text-[color:var(--text\/primary,#262626)] tracking-[0.32px]" data-node-id="143:9569">
              Comentários (2)
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="143:9570" data-name="item-comentario">
            <div className="relative shrink-0 size-[28px]" data-node-id="143:9571" data-name="Ellipse">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.2] not-italic overflow-clip relative shrink-0 tracking-[0.28px] w-[312px]" data-node-id="143:9572" data-name="col">
              <p className="font-['Satoshi:Bold'] relative shrink-0 text-[14px] text-[color:var(--text\/primary,#262626)] whitespace-nowrap" data-node-id="143:9573">
                Marina
              </p>
              <p className="font-['Satoshi:Regular'] relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--font-size\/body-sm,14px)] w-[312px]" data-node-id="143:9574">
                Anotado! Vou nessa semana.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="143:9575" data-name="item-comentario">
            <div className="relative shrink-0 size-[28px]" data-node-id="143:9576" data-name="Ellipse">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.2] not-italic overflow-clip relative shrink-0 tracking-[0.28px] w-[312px]" data-node-id="143:9577" data-name="col">
              <p className="font-['Satoshi:Bold'] relative shrink-0 text-[14px] text-[color:var(--text\/primary,#262626)] whitespace-nowrap" data-node-id="143:9578">
                Pedro
              </p>
              <p className="font-['Satoshi:Regular'] relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--font-size\/body-sm,14px)] w-[312px]" data-node-id="143:9579">
                O Cais é incrível mesmo
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start p-[var(--spacing\/16,16px)] relative shrink-0 w-full" data-node-id="143:8702">
          <div className="bg-[var(--background\/surface,white)] border border-[var(--border\/default,#d4d4d4)] border-solid content-stretch flex gap-[12px] h-[56px] items-center pl-[20px] pr-[8px] relative rounded-[28px] shrink-0 w-[350px]" data-node-id="143:8703" data-name="comment-input">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Satoshi:Regular'] leading-[normal] min-w-px not-italic relative text-[16px] text-[color:var(--text\/muted,#a3a3a3)]" data-node-id="I143:8703;140:8526">
              Escreva um comentário...
            </p>
            <div className="bg-gradient-to-r content-stretch flex flex-col from-[#4cbac7] items-center justify-center relative rounded-[20px] shrink-0 size-[40px] to-[#008c99]" data-node-id="I143:8703;140:8527" data-name="search-btn">
              <div className="relative shrink-0 size-[20px]" data-node-id="I143:8703;140:8528" data-name="Iconografia">
                <div className="absolute inset-[15%_15.83%_5.83%_5%]" data-node-id="I143:8703;140:8529" data-name="elements">
                  <div className="absolute inset-[-4.74%]">
                    <img alt="" className="block max-w-none size-full" src={imgElements5} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <BottomNav className="bg-white content-stretch flex gap-[8px] items-start justify-center px-[20px] py-[16px] relative shrink-0 w-[390px]" />
      </div>
    </div>
  );
}
