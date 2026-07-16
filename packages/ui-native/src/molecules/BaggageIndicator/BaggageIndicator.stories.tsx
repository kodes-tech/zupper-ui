import { BaggageIndicator } from './BaggageIndicator';

export default {
  title: 'Molecules/BaggageIndicator',
  component: BaggageIndicator,
};

/** Padrão do voo: item pessoal e bagagem de mão incluídos, despachada à parte. */
export const Default = {};

export const TudoIncluido = {
  args: { personalItem: true, checkedBaggage: true, carryOn: true },
};

export const ApenasItemPessoal = {
  args: { personalItem: true, checkedBaggage: false, carryOn: false },
};
