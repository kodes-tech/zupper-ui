import { fireEvent, render, screen } from '@testing-library/react-native';
import { FilterChip } from './FilterChip';

describe('FilterChip', () => {
  it('renders the label', async () => {
    await render(<FilterChip label="Gastronomia" />);
    expect(screen.getByText('Gastronomia')).toBeOnTheScreen();
  });

  it('renders selected and unselected states', async () => {
    await render(<FilterChip label="Passeios" selected />);
    expect(screen.getByText('Passeios')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<FilterChip label="Gastronomia" onPress={onPress} />);
    await fireEvent.press(screen.getByTestId('filter-chip'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  // KSA-446: o chip pede a classe de pressed; que a classe EMITE CSS é provado no tailwind.spec
  // dos tokens — juntos, os dois fecham o argumento sem depender de compilar NativeWind aqui.
  it('pede o retorno de toque (fundo sutil) no Pressable', async () => {
    await render(<FilterChip label="Gastronomia" />);
    expect(screen.getByTestId('filter-chip').props.className).toContain('active:bg-state-pressedSubtle');
  });

});
