import { action } from '@storybook/addon-actions';
import { FilterChip } from './FilterChip';

export default {
  title: 'Primitives/FilterChip',
  component: FilterChip,
  // Instrumenta o callback de interação p/ o painel "Actions".
  args: { onPress: action('onPress') },
};

export const Default = { args: { label: 'Gastronomia' } };
export const Selected = { args: { label: 'Passeios', selected: true } };
