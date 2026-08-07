import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';
import { SearchInput, type SearchInputOption, type SearchInputProps } from './SearchInput';

const DESTINATIONS: SearchInputOption[] = [
  { id: 'floripa', label: 'Florianópolis, SC' },
  { id: 'noronha', label: 'Fernando de Noronha, PE' },
  { id: 'recife', label: 'Recife, PE' },
  { id: 'gramado', label: 'Gramado, RS' },
];

export default {
  title: 'Primitives/SearchInput',
  component: SearchInput,
  args: {
    onChangeText: action('onChangeText'),
    onFocus: action('onFocus'),
    onBlur: action('onBlur'),
    onSelectOption: action('onSelectOption'),
    onPressSearch: action('onPressSearch'),
  },
  // minHeight dá espaço pro painel flutuante (top: 100%+) aparecer nas stories abertas.
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, minHeight: 320, padding: 16 }}>
        <Story />
      </View>
    ),
  ],
};

// `value` fica de estado local aqui pra digitar de verdade na story e ver o
// painel abrir — o componente é controlado (não guarda o próprio texto).
const SearchInputControlado = ({ value, onChangeText, ...rest }: SearchInputProps) => {
  const [text, setText] = React.useState(value ?? '');

  return (
    <SearchInput
      {...rest}
      value={text}
      onChangeText={(next) => {
        setText(next);
        onChangeText?.(next);
      }}
    />
  );
};

export const Fechado = {
  args: { options: DESTINATIONS },
  render: (args: SearchInputProps) => <SearchInputControlado {...args} />,
};

// O painel só aparece com o campo focado — sem o `play`, a story renderizaria
// fechada (só o pill), mesmo com `value`/`options` preenchidos.
export const DigitandoComSugestoes = {
  args: { value: 'Fl', options: DESTINATIONS },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await userEvent.click(within(canvasElement).getByPlaceholderText('Qual seu destino?'));
  },
};

export const Vazio = {
  args: { value: 'Atlantida perdida', options: [] },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    await userEvent.click(within(canvasElement).getByPlaceholderText('Qual seu destino?'));
  },
};

/**
 * KSA-352 [AC-4]: a play function exercita em navegador real o ciclo
 * foco→abre ([AC-2]) e toque numa opção sem perder a seleção ([AC-3]) —
 * pega a corrida que o jest não simula (blur chegando antes do toque
 * terminar de processar). Sem o atraso de 150ms no blur, `onSelectOption`
 * nunca dispara.
 */
export const FechaAoPerderFoco = {
  args: { value: 'Fl', options: DESTINATIONS, onSelectOption: fn(action('onSelectOption')) },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { onSelectOption: (id: string) => void } }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText('Qual seu destino?');

    await expect(canvas.queryByText('Florianópolis, SC')).not.toBeInTheDocument();

    await userEvent.click(input);
    await expect(canvas.getByText('Florianópolis, SC')).toBeInTheDocument();

    await userEvent.click(canvas.getByText('Florianópolis, SC'));
    await expect(args.onSelectOption).toHaveBeenCalledWith('floripa');

    await userEvent.click(canvasElement);
    await waitFor(async () => {
      await expect(canvas.queryByText('Florianópolis, SC')).not.toBeInTheDocument();
    });
  },
};
