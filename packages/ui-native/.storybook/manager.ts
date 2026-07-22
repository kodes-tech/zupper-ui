import { addons } from '@storybook/manager-api';

/**
 * Carimba a versão de cada lib no rótulo do grupo correspondente da sidebar:
 * `Tokens (v0.5.1)`, `Primitives (v0.5.1)`, `Icons (v0.1.0)`. As versões são
 * lidas do package.json em build-time e injetadas no manager pelo main.ts
 * (managerHead → window.__DS_GROUP_VERSIONS__). Só os grupos mapeados recebem
 * o sufixo; os demais nós ficam intactos.
 */
const GROUP_VERSIONS: Record<string, string> =
  (typeof window !== 'undefined' && (window as unknown as { __DS_GROUP_VERSIONS__?: Record<string, string> }).__DS_GROUP_VERSIONS__) || {};

addons.setConfig({
  sidebar: {
    renderLabel: (item) => {
      const version = GROUP_VERSIONS[item.name];
      return version ? `${item.name} (v${version})` : item.name;
    },
  },
});
