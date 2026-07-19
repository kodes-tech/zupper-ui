import { RoleBadge } from './RoleBadge';

export default {
  title: 'Primitives/RoleBadge',
  component: RoleBadge,
};

export const Guest = { args: { variant: 'guest' } };
export const Traveler = { args: { variant: 'traveler' } };
export const Partner = { args: { variant: 'partner' } };
