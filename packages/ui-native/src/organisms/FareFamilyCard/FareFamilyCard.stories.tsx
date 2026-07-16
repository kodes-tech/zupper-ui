import { action } from '@storybook/addon-actions';
import { FareFamilyCard } from './FareFamilyCard';

export default {
  title: 'Organisms/FareFamilyCard',
  component: FareFamilyCard,
  args: {
    onSelect: action('onSelect'),
  },
};

export const Light = {
  args: {
    title: 'LIGHT',
    price: 'R$ 2.259,98',
    headerColor: '#769d28',
    selected: true,
    benefits: [
      { label: 'Bagagem', included: false },
      { label: 'Marcação de Assento', included: false },
      { label: 'Reembolso', included: false },
    ],
  },
};

export const Standard = {
  args: {
    title: 'STANDARD',
    price: '+ R$ 200,95',
    headerColor: '#008d87',
    selected: false,
    benefits: [
      { label: 'Bagagem (01 peça)', included: true },
      { label: 'Marcação de Assento', included: false },
      { label: 'Reembolso', included: false },
    ],
  },
};

export const Full = {
  args: {
    title: 'FULL',
    price: '+ R$ 309,00',
    headerColor: '#ba19a1',
    selected: false,
    benefits: [
      { label: 'Bagagem (01 peça)', included: true },
      { label: 'Marcação de Assento', included: true },
      { label: 'Reembolso Integral', included: true },
    ],
  },
};
