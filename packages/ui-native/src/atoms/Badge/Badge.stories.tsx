import { Badge } from './Badge';

// CSF (Component Story Format) — compatível com Storybook.
// O Storybook ainda não está configurado neste pacote (próximo passo);
// as stories já ficam prontas para quando ele for ligado.
export default {
  title: 'Atoms/Badge',
  component: Badge,
};

export const Neutral = { args: { label: 'Novo' } };
export const Success = { args: { label: 'Ativo', tone: 'success' } };
export const Danger = { args: { label: 'Bloqueado', tone: 'danger' } };
