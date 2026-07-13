import { action } from '@storybook/addon-actions';
import { RoteiroDayForm } from './RoteiroDayForm';

const periods = [
  { id: 'manha', label: 'Manhã' },
  { id: 'tarde', label: 'Tarde' },
  { id: 'noite', label: 'Noite' },
];

export default {
  title: 'Molecules/RoteiroDayForm',
  component: RoteiroDayForm,
  args: {
    day: 'Dia 1',
    periods,
    selectedPeriodId: 'manha',
    onChangeTitle: action('onChangeTitle'),
    onSelectPeriod: action('onSelectPeriod'),
    onChangeLocal: action('onChangeLocal'),
    onChangeTip: action('onChangeTip'),
    onPrev: action('onPrev'),
    onNext: action('onNext'),
  },
  parameters: { layout: 'padded' },
};

/** Vazio: campos com placeholder, "Próximo" ainda outline (desabilitado). */
export const Vazio = { args: { canGoNext: false } };

/** Preenchido: campos com valor e "Próximo" habilitado (pill sólido). */
export const Preenchido = {
  args: {
    title: 'Recife Antigo',
    local: 'Marco Zero',
    tip: 'Comece cedo, tem sombra e é plano pra carrinho.',
    canGoNext: true,
  },
};
