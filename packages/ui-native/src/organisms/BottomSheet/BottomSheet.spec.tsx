import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { BottomSheet } from './BottomSheet';

describe('BottomSheet', () => {
  it('renders the header and the children', () => {
    render(
      <BottomSheet title="Título" description="Apoio">
        <Text>Conteúdo</Text>
      </BottomSheet>,
    );
    expect(screen.getByText('Título')).toBeOnTheScreen();
    expect(screen.getByText('Apoio')).toBeOnTheScreen();
    expect(screen.getByText('Conteúdo')).toBeOnTheScreen();
  });

  it('fires onDismiss when the overlay is pressed', () => {
    const onDismiss = jest.fn();
    render(
      <BottomSheet onDismiss={onDismiss}>
        <Text>Conteúdo</Text>
      </BottomSheet>,
    );
    fireEvent.press(screen.getByLabelText('Fechar'));
    expect(onDismiss).toHaveBeenCalled();
  });
});
