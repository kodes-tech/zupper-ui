import { action } from '@storybook/addon-actions';
import { TripSummaryFooter } from './TripSummaryFooter';

export default {
  title: 'Organisms/TripSummaryFooter',
  component: TripSummaryFooter,
  args: {
    route: 'GRU - REC',
    dateLabel: '15 de julho',
    totalPrice: 'R$ 2.434,67',
    onPressDetails: action('onPressDetails'),
  },
};

export const Default = {};
