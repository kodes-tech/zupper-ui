# Deploy do Storybook do DS (gate) — runbook

> Como o Storybook da **assinatura** (`@kodes-tech` — tokens/ícones/primitivos) vai
> ao ar com **gate de acesso** (KSA-164). Solução adotada: **GCP — Cloud Run + IAP
> direto** (sem Load Balancer). Escrito para quem **assume o repo**.

## Em uma frase

Build estático do Storybook → imagem nginx → **Cloud Run** no projeto `jinboo-497618`,
trancado pelo **IAP direto** (grátis, sem LB). Quem entra é decidido por **IAM**:
domínios/e-mails com o papel `roles/iap.httpsResourceAccessor`.

```
tag vX.Y.Z  (tokens+ui-native) ┐
                               ├─▶ deploy-storybook.yml ─▶ build Storybook ─▶ AR ─▶ Cloud Run [IAP]
tag icons-vX.Y.Z  (icons)      ┘                                                     ├─ @kodestech.com.br
                                                                                     └─ @zupper.com.br (ver abaixo)
```

O CD dispara no release de **qualquer** um dos três pacotes (a vitrine mostra os
três). O Storybook é buildado do **source** do monorepo na tag — então **builda
primeiro**, depois empacota e deploya; não depende do publish no registry.

- Detalhe de infra, Dockerfile/nginx e roteiro `gcloud` completo: **[`deploy/storybook/README.md`](../deploy/storybook/README.md)**.
- Alternativa avaliada (Cloudflare Pages + Access) fica na branch `feat/ksa-164-storybook-cloudflare` — revisitar se o público externo crescer com muitos e-mails avulsos **sem** conta Google (ver "Custo" abaixo).

## O que já está provisionado

Projeto **`jinboo-497618`** (nome "Jinboo"), região `southamerica-east1`.
⚠️ Projeto **compartilhado/produção** (roda `jinboo-core-rest-api`, `zupper-bff-*`).

- Artifact Registry `storybook` + imagem `storybook-ds`.
- Cloud Run `storybook-ds` com **IAP direto** (ingress `all`, service agent do IAP com `run.invoker`).
- Acesso liberado ao domínio **`kodestech.com.br`**.
- URL (gateada): `https://storybook-ds-b25kglllsa-rj.a.run.app`

## Liberar acesso a um domínio/org (ex.: `zupper.com.br`)

A org da Kodestech impõe a org policy `iam.allowedPolicyMemberDomains`
(`allowedValues: [C01krr9f5]`), que **bloqueia qualquer membro de fora da Kodestech**
na allowlist do IAP. Para liberar **outra org Google** (ex.: `zupper.com.br`), a
granularidade não importa (domínio ou e-mail avulso caem no mesmo bloqueio) — é
preciso a exceção da org policy. Passo a passo (custo zero, reversível):

**0. Pré-requisito — customer ID da org alvo** (`C0xxxxxxxx`)
   Admin do Google Workspace **da org alvo** em `admin.google.com` →
   *Conta → Configurações da conta → ID da conta/cliente*.
   (Não dá para descobrir via `gcloud` — é outra organização.)

**1. Org Policy Admin** (org `247826990084`) allowlista o customer ID **no projeto**
   `jinboo-497618`. O override **substitui** a herança para o projeto, então liste
   **todos** os customers necessários (Kodestech + o novo):
   ```bash
   gcloud resource-manager org-policies allow iam.allowedPolicyMemberDomains \
     C01krr9f5 <CUSTOMER_ID_ALVO> --project=jinboo-497618
   # validar:
   gcloud resource-manager org-policies describe iam.allowedPolicyMemberDomains \
     --project=jinboo-497618 --effective
   ```
   > `roles/owner` **não** basta — precisa de `roles/orgpolicy.policyAdmin` no nível
   > da org (super admin do GCP/Workspace da Kodestech).

**2. Liberar o domínio no IAP** (depois do passo 1):
   ```bash
   gcloud beta iap web add-iam-policy-binding --resource-type=cloud-run \
     --service=storybook-ds --region=southamerica-east1 --project=jinboo-497618 \
     --member="domain:zupper.com.br" --role="roles/iap.httpsResourceAccessor"
   ```
   (para um e-mail avulso, trocar por `--member="user:fulano@zupper.com.br"`)

**3. Validar** com um login `@zupper.com.br` na URL. Como é **outra org**, o consent
   screen do OAuth precisa ser **External** (o brand atual "Jinboo" aparenta estar;
   se barrar no consent, ajustar em *APIs & Services → OAuth consent screen*).

**Reverter:** `gcloud beta iap web remove-iam-policy-binding ... --member="domain:zupper.com.br" ...`
e/ou refazer o passo 1 só com `C01krr9f5`.

## Custo (por que GCP em escala)

- **IAP não cobra por usuário.** Liberar um **domínio inteiro** cobre todos os
  usuários dele por **US$0**. O custo é só o uso do Cloud Run (estático → escala a
  zero → centavos) + egress (poucos GB → poucos dólares).
- **Cloudflare Access** cobra **US$7/usuário/mês** acima de 50 usuários — a ~100
  usuários já seriam ~US$700/mês. Por isso o GCP é preferível quando o público cresce.
- Trade-off: o Cloudflare só compensa se houver **muitos e-mails externos avulsos sem
  conta Google** (ele faz OTP por e-mail nativo, o IAP não).

## Deploy

- **Automático:** as tags `vX.Y.Z` (tokens+ui-native) **ou** `icons-vX.Y.Z` (icons)
  disparam [`deploy-storybook.yml`](../.github/workflows/deploy-storybook.yml)
  (build dos pacotes → **build do Storybook** → push no Artifact Registry →
  `gcloud run deploy`). Requer os `vars`/`secrets` do workflow (Workload Identity
  Federation) configurados — ver topo do arquivo.
- **Manual/local:** ver o roteiro `gcloud` em [`deploy/storybook/README.md`](../deploy/storybook/README.md).
