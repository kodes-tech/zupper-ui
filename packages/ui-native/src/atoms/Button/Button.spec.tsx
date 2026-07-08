import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label', () => {
    render(<Button label="Publicar" />);
    expect(screen.getByText('Publicar')).toBeOnTheScreen();
  });

  it('renders without a label when only an icon is provided', () => {
    render(<Button icon={<Text>+</Text>} />);
    expect(screen.getByText('+')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(<Button label="Publicar" onPress={onPress} />);
    fireEvent.press(screen.getByTestId('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
