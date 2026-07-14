import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label', async () => {
    await render(<Button label="Publicar" />);
    expect(screen.getByText('Publicar')).toBeOnTheScreen();
  });

  it('renders without a label when only an icon is provided', async () => {
    await render(<Button icon={<Text>+</Text>} />);
    expect(screen.getByText('+')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<Button label="Publicar" onPress={onPress} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the secondary (outline) variant', async () => {
    await render(<Button label="Iniciar sessão" variant="secondary" />);
    expect(screen.getByText('Iniciar sessão')).toBeOnTheScreen();
    expect(screen.getByTestId('button-container')).toBeOnTheScreen();
  });

  it('renders the ghost (text-only) variant', async () => {
    await render(<Button label="Sair da minha conta zupper" variant="ghost" />);
    expect(screen.getByText('Sair da minha conta zupper')).toBeOnTheScreen();
    expect(screen.getByTestId('button-container')).toBeOnTheScreen();
  });
});
