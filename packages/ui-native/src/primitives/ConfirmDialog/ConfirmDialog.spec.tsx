import { Text } from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { ConfirmDialog } from './ConfirmDialog';

describe('ConfirmDialog', () => {
  it('renders the children', async () => {
    await render(
      <ConfirmDialog>
        <Text>Conteúdo</Text>
      </ConfirmDialog>,
    );
    expect(screen.getByText('Conteúdo')).toBeOnTheScreen();
  });

  it('fires onDismiss when the overlay is pressed', async () => {
    const onDismiss = jest.fn();
    await render(
      <ConfirmDialog onDismiss={onDismiss}>
        <Text>Conteúdo</Text>
      </ConfirmDialog>,
    );
    await fireEvent.press(screen.getByLabelText('Fechar'));
    expect(onDismiss).toHaveBeenCalled();
  });
});
