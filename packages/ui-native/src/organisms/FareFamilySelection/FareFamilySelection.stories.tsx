import { action } from '@storybook/addon-actions';
import { FareFamilySelection } from './FareFamilySelection';
import type { FareFamily } from './FareFamilySelection';

const families: FareFamily[] = [
  {
    id: 'light',
    title: 'LIGHT',
    price: 'R$ 2.259,98',
    headerColor: '#769d28',
    benefits: [
      { label: 'Bagagem', included: false },
      { label: 'Marcação de Assento', included: false },
      { label: 'Reembolso', included: false },
    ],
  },
  {
    id: 'standard',
    title: 'STANDARD',
    price: '+ R$ 200,95',
    headerColor: '#008d87',
    benefits: [
      { label: 'Bagagem (01 peça)', included: true },
      { label: 'Marcação de Assento', included: false },
      { label: 'Reembolso', included: false },
    ],
  },
  {
    id: 'full',
    title: 'FULL',
    price: '+ R$ 309,00',
    headerColor: '#ba19a1',
    benefits: [
      { label: 'Bagagem (01 peça)', included: true },
      { label: 'Marcação de Assento', included: true },
      { label: 'Reembolso Integral', included: true },
    ],
  },
  {
    id: 'premium-economy',
    title: 'PREMIUM ECONOMY',
    price: '+ R$ 337,92',
    headerColor: '#008d87',
    benefits: [
      { label: 'Bagagem (01 peça)', included: true },
      { label: 'Marcação de Assento', included: true },
      { label: 'Reembolso Integral', included: true },
    ],
  },
];

export default {
  title: 'Organisms/FareFamilySelection',
  component: FareFamilySelection,
  args: {
    families,
    selectedFamilyId: 'light',
    onSelectFamily: action('onSelectFamily'),
    onPressDetails: action('onPressDetails'),
  },
};

/** Estado do screenshot: LIGHT selecionada (grátis), demais mostram a diferença. */
export const Default = {};
