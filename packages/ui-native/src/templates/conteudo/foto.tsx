// Referência de código gerada pelo Figma Dev Mode (get_design_context) — NÃO É
// PARA RODAR. Guarda os valores exatos (px, cor, font) desta tela. Ver
// templates/README.md antes de usar.
//
// Figma: https://www.figma.com/design/CRJYlaF0ep3mKL5fwH3e31/Zupper-2.0?node-id=140-7928
// Node: 140:7928 — "5. Conteúdo - Foto"
// Capturado em: 2026-07-10
//
// Nota: o label da nav ("Foto") aparece hardcoded como "Foto" nas 3 variantes
// dessa tela (Foto/Dica/Roteiro) — parece um artefato de copiar-colar no
// próprio arquivo Figma, não algo que eu inventei na captura. Ver PR.

const imgIconografiaPadraoZupper = "https://www.figma.com/api/mcp/asset/e21c250c-64ee-40dc-afab-7a0d9c965e4b";
const imgIconografiaPadraoZupper1 = "https://www.figma.com/api/mcp/asset/f567582e-1493-48f7-b6b2-2bbd025dbfcc";
const imgGrupo8263 = "https://www.figma.com/api/mcp/asset/1629729f-a662-47ee-9fcf-9de2b2cb0224";
const imgGrupo8257 = "https://www.figma.com/api/mcp/asset/8ed3cc5f-987b-4fa4-bfdb-1e84b5df6944";
const imgCaminho5727 = "https://www.figma.com/api/mcp/asset/117b4a23-6cb2-4eb6-a39c-02e0245e391d";
const imgLinha112 = "https://www.figma.com/api/mcp/asset/e4c9d859-2544-473d-aa69-aebfbd699489";
const imgRetangulo528 = "https://www.figma.com/api/mcp/asset/8ab5e3db-f2c7-4ce3-89ae-e56b863a2722";
const imgCaminho5728 = "https://www.figma.com/api/mcp/asset/b3ab7711-fd4f-4b7e-bc3e-15227ec0a089";
const imgShape3077 = "https://www.figma.com/api/mcp/asset/c0b8cbec-5d6b-4bf0-ab96-bbd9fd538056";
const imgIconografiaPadraoZupper2 = "https://www.figma.com/api/mcp/asset/6fb61311-7f4b-45aa-a785-b8e315ab4766";
const imgGrupo10777 = "https://www.figma.com/api/mcp/asset/8780610e-7a77-4b75-aaba-ebddd600740a";
const imgCaminho22381 = "https://www.figma.com/api/mcp/asset/66a3a912-94ec-4eec-b531-6a01b178f4fd";
const imgElements = "https://www.figma.com/api/mcp/asset/155146e2-5eee-4dae-89f5-7034524ebaf4";
const imgElements1 = "https://www.figma.com/api/mcp/asset/5e93ae4d-fb19-4c19-b203-af40f2dab462";
const imgElements2 = "https://www.figma.com/api/mcp/asset/fd7a9170-a0da-4091-b830-f6f1bddd7930";
const imgGrupo11310 = "https://www.figma.com/api/mcp/asset/09b0e14c-2c11-41f6-86ab-182fe4d56039";
const imgProperty1ArrowBack = "https://www.figma.com/api/mcp/asset/c5b8a0a4-bae1-4a89-8e1b-a090878c5983";
const imgAvatar = "https://www.figma.com/api/mcp/asset/da80d9ec-46fe-42f4-8889-733fd3ea439a";
const imgRectangle469 = "https://www.figma.com/api/mcp/asset/5221c56a-5235-4b0f-8ec9-0f061261927b";
const imgIconografiaArrowZupper = "https://www.figma.com/api/mcp/asset/b6e2e395-929d-4a4f-a297-c9815b95cb56";
const imgEllipse = "https://www.figma.com/api/mcp/asset/e38c5866-3fac-4700-ac99-1df60d2ee107";
const imgElements3 = "https://www.figma.com/api/mcp/asset/084ee785-0688-4e0e-851a-c2e0db07c8d3";

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

function Location({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex gap-[4px] h-[18px] items-center overflow-clip relative"} data-node-id="116:6259" data-name="location">
      <div className="relative shrink-0 size-[16px]" data-node-id="116:6164" data-name="Grupo 11310">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGrupo11310} />
      </div>
      <p className="[word-break:break-word] font-['Satoshi:Medium'] leading-[normal] not-italic relative shrink-0 text-[#404040] text-[12px] whitespace-nowrap" data-node-id="116:6169">
        Fernando de Noronha
      </p>
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

export default function Component5ConteudoFoto() {
  return (
    <div className="bg-[var(--background\/background,#f5f5f5)] relative size-full" data-node-id="140:7928" data-name="5. Conteúdo - Foto">
      <div className="absolute content-stretch flex flex-col items-start left-0 right-0 top-0" data-node-id="140:7929" data-name="content">
        <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="140:7930" data-name="head">
          <div className="content-stretch flex items-center justify-between pb-[4px] pt-[40px] px-[24px] relative shrink-0 w-full" data-node-id="140:7931" data-name="nav">
            <IconografiaArrowZupper className="relative shrink-0 size-[24px]" />
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="140:7933">
              <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[1.5] not-italic relative shrink-0 text-[#1c1c1a] text-[16px] tracking-[0.32px] whitespace-nowrap" data-node-id="140:7934">
                Foto
              </p>
            </div>
            <div className="relative shrink-0 size-[24px]" data-node-id="140:7935" data-name="Iconografia Arrow - Zupper">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgIconografiaArrowZupper} />
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[var(--spacing\/4,0px)] items-start overflow-clip pt-[var(--spacing\/16,16px)] relative shrink-0" data-node-id="140:7936" data-name="head">
            <div className="content-stretch flex flex-col gap-[var(--spacing\/8,8px)] items-end px-[var(--spacing\/16,16px)] py-[var(--spacing\/8,8px)] relative shrink-0 w-[390px]" data-node-id="140:7937" data-name="greeting">
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-node-id="I140:7937;140:8451" data-name="title">
                <div className="content-stretch flex flex-col items-start overflow-clip p-[8px] relative rounded-[100px] shrink-0 size-[44px]" data-node-id="I140:7937;140:8452" data-name="Avatar">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[100px]">
                    <img alt="" className="absolute left-[-53.75%] max-w-none size-[199.08%] top-[-16.31%]" src={imgAvatar} />
                  </div>
                </div>
                <div className="flex flex-[1_0_0] flex-row items-center self-stretch" data-node-id="I140:7937;140:8454">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col font-['Satoshi:Medium'] h-full items-start justify-between min-w-px not-italic p-[var(--spacing\/4,4px)] relative" data-name="body">
                    <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-[0px] text-[color:var(--text\/primary,#262626)] tracking-[0.32px] w-full" data-node-id="I140:7937;140:8455">
                      <p className="font-['Satoshi:Bold'] leading-[1.5] text-[16px]">Carlos Souza</p>
                    </div>
                    <p className="leading-[16px] relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--spacing\/16,12px)] w-full" data-node-id="I140:7937;143:8628">
                      @carlosviaja
                    </p>
                  </div>
                </div>
                <div className="flex flex-row items-center self-stretch" data-node-id="I140:7937;140:8457">
                  <div className="content-stretch flex flex-col h-full items-end justify-between px-[4px] py-[2px] relative shrink-0" data-name="tags">
                    <div className="bg-[var(--color\/mexico\/200,#d8fcfe)] content-stretch flex items-start overflow-clip px-[var(--spacing\/8,8px)] py-[var(--spacing\/4,4px)] relative rounded-[2px] shrink-0" data-node-id="I140:7937;140:8458" data-name="tag comunidade">
                      <p className="[word-break:break-word] font-['Satoshi:Bold'] leading-[16px] not-italic relative shrink-0 text-[12px] text-[color:var(--text\/highlight,#008c99)] whitespace-nowrap" data-node-id="I140:7937;140:8458;110:5904">
                        Viajante
                      </p>
                    </div>
                    <div className="content-stretch flex gap-[8px] h-[16px] items-center justify-end relative shrink-0 w-[91px]" data-node-id="I140:7937;140:8459" data-name="CTA" />
                  </div>
                </div>
              </div>
              <Location className="content-stretch flex gap-[4px] h-[18px] items-center overflow-clip relative shrink-0" />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[390px]" data-node-id="140:7939" data-name="sec-destinos">
          <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-[390px]" data-node-id="140:8312" data-name="body">
            <div className="h-[404px] relative shrink-0 w-full" data-node-id="140:8313">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img alt="" className="absolute h-full left-[-38.58%] max-w-none top-0 w-[155.38%]" src={imgRectangle469} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[10px] items-start pb-[var(--spacing\/16,16px)] px-[var(--spacing\/16,16px)] relative shrink-0 w-full" data-node-id="140:8443">
          <SocialBar className="content-stretch flex h-[52px] items-center justify-between overflow-clip py-[8px] relative shrink-0 w-full" />
          <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="140:8444" data-name="item-comentario">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--spacing\/4,4px)] items-start not-italic overflow-clip relative shrink-0 w-[358px]" data-node-id="140:8446" data-name="col">
              <p className="font-['Satoshi:Bold'] leading-[1.5] relative shrink-0 text-[16px] text-[color:var(--text\/primary,#262626)] tracking-[0.32px] whitespace-nowrap" data-node-id="140:8447">
                Carlos Souza
              </p>
              <p className="font-['Satoshi:Regular'] leading-[1.2] min-w-full relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--font-size\/body-sm,14px)] tracking-[0.28px] w-[min-content]" data-node-id="140:8448">
                Passei pelo Cais do Sertão e fiquei encantado com a cultura e a arte local. Vale muito a visita!
              </p>
            </div>
          </div>
          <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-node-id="140:8507">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Satoshi:Bold'] leading-[1.5] min-w-px not-italic relative text-[16px] text-[color:var(--text\/primary,#262626)] tracking-[0.32px]" data-node-id="140:8508">
              Comentários (2)
            </p>
          </div>
          <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="140:8514" data-name="item-comentario">
            <div className="relative shrink-0 size-[28px]" data-node-id="140:8515" data-name="Ellipse">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.2] not-italic overflow-clip relative shrink-0 tracking-[0.28px] w-[312px]" data-node-id="140:8516" data-name="col">
              <p className="font-['Satoshi:Bold'] relative shrink-0 text-[14px] text-[color:var(--text\/primary,#262626)] whitespace-nowrap" data-node-id="140:8517">
                Marina
              </p>
              <p className="font-['Satoshi:Regular'] relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--font-size\/body-sm,14px)] w-[312px]" data-node-id="140:8518">
                Anotado! Vou nessa semana.
              </p>
            </div>
          </div>
          <div className="content-stretch flex gap-[10px] items-start overflow-clip relative shrink-0" data-node-id="140:8519" data-name="item-comentario">
            <div className="relative shrink-0 size-[28px]" data-node-id="140:8520" data-name="Ellipse">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgEllipse} />
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-start leading-[1.2] not-italic overflow-clip relative shrink-0 tracking-[0.28px] w-[312px]" data-node-id="140:8521" data-name="col">
              <p className="font-['Satoshi:Bold'] relative shrink-0 text-[14px] text-[color:var(--text\/primary,#262626)] whitespace-nowrap" data-node-id="140:8522">
                Pedro
              </p>
              <p className="font-['Satoshi:Regular'] relative shrink-0 text-[color:var(--text\/secondary,#404040)] text-[length:var(--font-size\/body-sm,14px)] w-[312px]" data-node-id="140:8523">
                O Cais é incrível mesmo
              </p>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col items-start p-[var(--spacing\/16,16px)] relative shrink-0 w-full" data-node-id="140:8557">
          <div className="bg-[var(--background\/surface,white)] border border-[var(--border\/default,#d4d4d4)] border-solid content-stretch flex gap-[12px] h-[56px] items-center pl-[20px] pr-[8px] relative rounded-[28px] shrink-0 w-[350px]" data-node-id="140:8605" data-name="comment-input">
            <p className="[word-break:break-word] flex-[1_0_0] font-['Satoshi:Regular'] leading-[normal] min-w-px not-italic relative text-[16px] text-[color:var(--text\/muted,#a3a3a3)]" data-node-id="I140:8605;140:8526">
              Escreva um comentário...
            </p>
            <div className="bg-gradient-to-r content-stretch flex flex-col from-[#4cbac7] items-center justify-center relative rounded-[20px] shrink-0 size-[40px] to-[#008c99]" data-node-id="I140:8605;140:8527" data-name="search-btn">
              <div className="relative shrink-0 size-[20px]" data-node-id="I140:8605;140:8528" data-name="Iconografia">
                <div className="absolute inset-[15%_15.83%_5.83%_5%]" data-node-id="I140:8605;140:8529" data-name="elements">
                  <div className="absolute inset-[-4.74%]">
                    <img alt="" className="block max-w-none size-full" src={imgElements3} />
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
