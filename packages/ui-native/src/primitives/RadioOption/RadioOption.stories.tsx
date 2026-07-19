import { action } from '@storybook/addon-actions';
import { View } from 'react-native';
import { RadioOption } from './RadioOption';

export default {
  title: 'Primitives/RadioOption',
  component: RadioOption,
  args: { onPress: action('onPress') },
};

export const Selecionado = {
  args: { label: 'Celular', selected: true },
};

export const NaoSelecionado = {
  args: { label: 'Telefone', selected: false },
};

/** Par "Contato" do Checkout: Celular / Telefone lado a lado. */
export const Par = {
  render: () => (
    <View style={{ flexDirection: 'row', gap: 16 }}>
      <RadioOption label="Celular" selected />
      <RadioOption label="Telefone" selected={false} />
    </View>
  ),
};
