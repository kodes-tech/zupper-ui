import { action } from '@storybook/addon-actions';
import { TermsAcceptance } from './TermsAcceptance';

export default {
  title: 'Organisms/TermsAcceptance',
  component: TermsAcceptance,
  args: {
    onToggleReceiveNews: action('onToggleReceiveNews'),
    onToggleTerms: action('onToggleTerms'),
    onPressTermsOfUse: action('onPressTermsOfUse'),
    onPressFareRules: action('onPressFareRules'),
  },
};

export const Default = {};

export const Aceito = {
  args: { receiveNews: true, termsAccepted: true },
};

export const ComErro = {
  args: { termsError: 'Você precisa aceitar os termos e condições' },
};
