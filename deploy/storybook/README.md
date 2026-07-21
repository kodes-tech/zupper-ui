# Deploy do Storybook do DS (KSA-164) — GCP

Publica o Storybook da **assinatura** (`@kodes-tech` — tokens, ícones, primitivos)
no ar, com **gate de acesso**. Segue a [ADR 0009](../../docs/decisions/0009-design-system-boundary-and-storybook.md).

> **Nota:** esta branch traz a solução em **GCP (Cloud Run + IAP direto)**. Há uma
> branch irmã (`feat/ksa-164-storybook-cloudflare`) com a solução em **Cloudflare
> Pages + Access**. A decisão de qual seguir está pendente — ver comparação no fim.

## Arquitetura (GCP)

Gate via **IAP direto no Cloud Run** — sem Load Balancer (GA mar/2026), **custo zero**
(IAP grátis + Cloud Run escala a zero). Dispensa os ~US$18/mês do HTTPS LB.

```
Cliente → [IAP] → Cloud Run (nginx + storybook-static)
            ├─ Google SSO → @kodestech.com.br (domínio na allowlist do IAP)
            └─ clientes externos → e-mail Google-autenticável na allowlist do IAP
```

## Artefatos no repo

| Arquivo | Papel |
|---|---|
| `Dockerfile` | imagem nginx mínima servindo o bundle já buildado |
| `nginx.conf` | template servido pelo Cloud Run (porta via `${PORT}`, health em `/healthz`) |
| `../../.dockerignore` | contexto de build enxuto (só o bundle + nginx.conf) |
| `../../.github/workflows/deploy-storybook.yml` | build + push (Artifact Registry) + `gcloud run deploy` |

Build local do bundle: `npm run build-storybook -w @kodes-tech/ui-native`
(saída em `packages/ui-native/storybook-static/`).

## Provisionamento no GCP

**Projeto:** `jinboo-497618` (nome "Jinboo"), região `southamerica-east1`.
⚠️ Projeto **compartilhado/produção** — já roda `jinboo-core-rest-api`, `zupper-bff-*`.

Estado atual (feito):
- [x] APIs habilitadas: `run`, `iap`, `compute`, `artifactregistry`, `identitytoolkit`
- [x] Artifact Registry `storybook` (DOCKER, southamerica-east1)
- [x] Imagem real buildada e no registry (`storybook-ds:<git-sha>` + `latest`)
- [x] Cloud Run `storybook-ds` servindo a imagem real
- [x] **IAP direto habilitado** (sem LB); ingress `all`; service agent do IAP com `run.invoker`
- [x] Acesso liberado ao domínio `kodestech.com.br` (`roles/iap.httpsResourceAccessor`)
- [ ] Clientes externos: **bloqueado** pela org policy `iam.allowedPolicyMemberDomains`
      (`allowedValues: [C01krr9f5]`) — precisa do Org Policy Admin liberar o customer
      ID do cliente (opção restrita) antes de adicionar o e-mail/domínio
- [ ] Workload Identity Federation (GitHub → GCP) para o deploy automático

URL (gateada): https://storybook-ds-b25kglllsa-rj.a.run.app

Roteiro `gcloud` do que foi feito (reproduzir/derrubar):

```bash
PROJECT=jinboo-497618; REGION=southamerica-east1; AR_REPO=storybook; SERVICE=storybook-ds
NUM=$(gcloud projects describe "$PROJECT" --format="value(projectNumber)")
IMAGE="$REGION-docker.pkg.dev/$PROJECT/$AR_REPO/storybook-ds"

# 1. APIs + Artifact Registry
gcloud services enable run.googleapis.com artifactregistry.googleapis.com \
  iap.googleapis.com compute.googleapis.com identitytoolkit.googleapis.com --project "$PROJECT"
gcloud artifacts repositories create "$AR_REPO" \
  --repository-format=docker --location="$REGION" --project "$PROJECT"

# 2. Build + push + deploy
gcloud auth configure-docker "$REGION-docker.pkg.dev" --quiet
docker build -f deploy/storybook/Dockerfile -t "$IMAGE:latest" .   # requer storybook-static/
docker push "$IMAGE:latest"
gcloud run deploy "$SERVICE" --region "$REGION" --project "$PROJECT" \
  --image "$IMAGE:latest" --ingress all --no-allow-unauthenticated --port 8080

# 3. IAP direto + acesso ao domínio interno
gcloud beta services identity create --service=iap.googleapis.com --project "$PROJECT"
gcloud run services add-iam-policy-binding "$SERVICE" --region "$REGION" --project "$PROJECT" \
  --member="serviceAccount:service-$NUM@gcp-sa-iap.iam.gserviceaccount.com" --role=roles/run.invoker
gcloud beta run services update "$SERVICE" --region "$REGION" --project "$PROJECT" --iap --ingress=all
gcloud beta iap web add-iam-policy-binding --resource-type=cloud-run --service="$SERVICE" \
  --region "$REGION" --project "$PROJECT" \
  --member="domain:kodestech.com.br" --role="roles/iap.httpsResourceAccessor"

# 3b. Cliente externo — PRÉ-REQUISITO: Org Policy Admin adiciona o customer ID do
#     cliente à allowlist (mantendo C01krr9f5 = Kodestech):
#   gcloud resource-manager org-policies allow iam.allowedPolicyMemberDomains \
#     C01krr9f5 <CUSTOMER_ID_CLIENTE> --project=jinboo-497618
#     Depois, liberar o domínio/e-mail do cliente no IAP:
#   gcloud beta iap web add-iam-policy-binding --resource-type=cloud-run --service="$SERVICE" \
#     --region "$REGION" --project "$PROJECT" \
#     --member="domain:empresacliente.com" --role="roles/iap.httpsResourceAccessor"

# 4. Workload Identity Federation (GitHub → GCP), sem chave JSON:
#    pool + provider OIDC do GitHub, service account de deploy com
#    roles/run.admin + roles/artifactregistry.writer + roles/iam.serviceAccountUser,
#    vinculada ao repo. Preencher secrets/vars do workflow (ver topo do yml).
```

## Adicionar a org da Zupper (`zupper.com.br`)

Passos verificados para liberar o domínio inteiro `zupper.com.br` (custo zero, sem
per-seat; reversível). O `zupper.com.br` é **outra organização Google**, então:

0. **Pré-req:** obter o **customer ID** do `zupper.com.br` (`C0xxxxxxxx`) — admin do
   Workspace da Zupper em `admin.google.com` → Conta → Configurações da conta.
1. **Org Policy Admin** (org `247826990084`) allowlista o customer ID **só no projeto**
   (o override substitui a herança, então listar os dois):
   ```bash
   gcloud resource-manager org-policies allow iam.allowedPolicyMemberDomains \
     C01krr9f5 <CUSTOMER_ID_ZUPPER> --project=jinboo-497618
   # validar: gcloud resource-manager org-policies describe \
   #   iam.allowedPolicyMemberDomains --project=jinboo-497618 --effective
   ```
2. Liberar o domínio no IAP:
   ```bash
   gcloud beta iap web add-iam-policy-binding --resource-type=cloud-run \
     --service=storybook-ds --region=southamerica-east1 --project=jinboo-497618 \
     --member="domain:zupper.com.br" --role="roles/iap.httpsResourceAccessor"
   ```
3. Validar com um login `@zupper.com.br`. O consent screen ("Jinboo") aparenta ser
   **External** (sem `orgInternalOnly`) → cross-org deve passar; se barrar no consent,
   ajustar o consent screen para *External* no console (APIs & Services → OAuth consent).

## Critérios de aceite

- [ ] Não-autenticado → barrado pelo **IAP**.
- [ ] `@kodestech.com.br` via Google → vê o DS.
- [ ] `@zupper.com.br` via Google → vê o DS (após os passos acima).
- [ ] Fora do domínio/allowlist → negado.

## GCP × Cloudflare (decisão pendente)

| | **GCP (esta branch)** | **Cloudflare (branch irmã)** |
|---|---|---|
| Gate | IAP direto no Cloud Run | Cloudflare Access (edge) |
| Custo | US$0 | US$0 (Free ≤50 users) |
| Cliente externo sem conta Google | ❌ (org policy + sem OTP) | ✅ **One-Time PIN por e-mail** |
| Depende de Org Policy Admin | ✅ sim | ❌ não |
| Host | Cloud Run (container) | Cloudflare Pages (estático) |
| Já provisionado | ✅ sim | ⬜ setup do zero |
