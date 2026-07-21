# Imagem de runtime do Storybook do design system (KSA-164).
#
# O bundle estático é buildado ANTES no CI (Node 20 + `--legacy-peer-deps`, o
# mesmo setup do ci.yml — react-native-web@0.19 ainda pede React 18) e só é
# COPIADO aqui. Assim a imagem fica mínima e não duplicamos o toolchain RN
# (frágil) dentro do Docker.
#
# Contexto de build = raiz do repo (precisa de `deploy/storybook/nginx.conf` e
# de `packages/ui-native/storybook-static/`). Ver `.dockerignore`.
FROM nginx:1.27-alpine

# Cloud Run injeta $PORT (default 8080) e espera o container escutando nela.
# O nginx default escuta 80; por isso a porta vem por template (ver nginx.conf).
ENV PORT=8080

# Removemos o default.conf de fábrica para não conflitar com o nosso template.
RUN rm -f /etc/nginx/conf.d/default.conf

COPY deploy/storybook/nginx.conf /etc/nginx/templates/default.conf.template
COPY packages/ui-native/storybook-static/ /usr/share/nginx/html/

EXPOSE 8080
