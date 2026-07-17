import { fireEvent, render, screen } from '@testing-library/react-native';
import { PreferenceTile } from './PreferenceTile';

describe('PreferenceTile', () => {
  it('renders the label', async () => {
    await render(<PreferenceTile label="Econômica" image={{ uri: 'https://example.com/x.jpg' }} />);
    expect(screen.getByText('Econômica')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(
      <PreferenceTile label="Econômica" image={{ uri: 'https://example.com/x.jpg' }} onPress={onPress} />,
    );
    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('exposes the selected accessibility state', async () => {
    await render(
      <PreferenceTile label="Econômica" image={{ uri: 'https://example.com/x.jpg' }} selected />,
    );
    expect(screen.getByRole('button', { selected: true })).toBeOnTheScreen();
  });
});
