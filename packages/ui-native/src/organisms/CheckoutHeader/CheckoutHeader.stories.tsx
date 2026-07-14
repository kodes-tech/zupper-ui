import { action } from '@storybook/addon-actions';
import { CheckoutHeader } from './CheckoutHeader';

export default {
  title: 'Organisms/CheckoutHeader',
  component: CheckoutHeader,
  args: {
    currentStep: 1,
    totalSteps: 4,
    onBack: action('onBack'),
  },
};

export const ComContagem = {
  args: { offerDuration: '14:38' },
};

export const SemContagem = {
  args: { offerDuration: undefined },
};

export const UltimaEtapa = {
  args: { currentStep: 4, totalSteps: 4, offerDuration: undefined },
};
