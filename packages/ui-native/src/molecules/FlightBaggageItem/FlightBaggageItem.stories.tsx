import { FlightBaggageItem } from './FlightBaggageItem';

export default {
  title: 'Molecules/FlightBaggageItem',
  component: FlightBaggageItem,
};

export const Incluido = {
  args: {
    icon: 'baggage-carryon',
    title: 'Inclui bagagem de mão',
    subtitle: 'Tamanho limitado a caber no compartimento superior do avião. Até 10kg.',
    included: true,
  },
};

export const NaoIncluido = {
  args: {
    icon: 'baggage-checked',
    title: 'Não inclui bagagem para despachar',
    subtitle: 'É possível incluir bagagem despachada alterando a opção de tarifa no comparativo de tarifas.',
    included: false,
  },
};
