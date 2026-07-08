import { Badge } from './Badge';

// CSF (Component Story Format) — compatível com Storybook.
export default {
  title: 'Atoms/Badge',
  component: Badge,
};

export const Neutral = { args: { label: 'Novo' } };
export const Brand = { args: { label: 'Viajante', tone: 'brand' } };
export const Partner = { args: { label: 'Parceiro', tone: 'partner' } };
