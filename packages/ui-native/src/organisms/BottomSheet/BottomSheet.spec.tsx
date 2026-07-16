import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { BottomSheet } from './BottomSheet';

describe('BottomSheet', () => {
  it('renders the header and the children', async () => {
    await render(
      <BottomSheet title="Título" description="Apoio">
        <Text>Conteúdo</Text>
      </BottomSheet>,
    );
    expect(screen.getByText('Título')).toBeOnTheScreen();
    expect(screen.getByText('Apoio')).toBeOnTheScreen();
    expect(screen.getByText('Conteúdo')).toBeOnTheScreen();
  });

  it('fires onDismiss when the overlay is pressed', async () => {
    const onDismiss = jest.fn();
    await render(
      <BottomSheet onDismiss={onDismiss}>
        <Text>Conteúdo</Text>
      </BottomSheet>,
    );
    await fireEvent.press(screen.getByLabelText('Fechar'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('renders the close button only when onClose is provided', async () => {
    const onClose = jest.fn();
    await render(
      <BottomSheet title="Título" onClose={onClose}>
        <Text>Conteúdo</Text>
      </BottomSheet>,
    );
    await fireEvent.press(screen.getByLabelText('Fechar sheet'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('omits the close button when onClose is not provided', async () => {
    await render(
      <BottomSheet title="Título">
        <Text>Conteúdo</Text>
      </BottomSheet>,
    );
    expect(screen.queryByLabelText('Fechar sheet')).not.toBeOnTheScreen();
  });
});
