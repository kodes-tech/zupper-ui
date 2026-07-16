import { action } from '@storybook/addon-actions';
import { NextStepFooter } from './NextStepFooter';

export default {
  title: 'Organisms/NextStepFooter',
  component: NextStepFooter,
  args: {
    onPressNext: action('onPressNext'),
  },
};

export const Default = {};

export const UltimaEtapa = {
  args: { buttonLabel: 'Finalizar compra' },
};
