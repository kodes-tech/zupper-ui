import { render, screen, fireEvent } from '@testing-library/react-native';
import { DeleteOwnPostSheet } from './DeleteOwnPostSheet';

describe('DeleteOwnPostSheet', () => {
  it('renders the title, body and actions', async () => {
    await render(<DeleteOwnPostSheet />);
    expect(screen.getAllByText('Excluir publicação')).toHaveLength(2);
    expect(screen.getByText(/tem certeza que deseja excluir/)).toBeOnTheScreen();
    expect(screen.getByText('Cancelar')).toBeOnTheScreen();
  });

  it('fires onDelete', async () => {
    const onDelete = jest.fn();
    await render(<DeleteOwnPostSheet onDelete={onDelete} />);
    const [, deleteButton] = screen.getAllByText('Excluir publicação');
    await fireEvent.press(deleteButton);
    expect(onDelete).toHaveBeenCalled();
  });

  it('fires onCancel', async () => {
    const onCancel = jest.fn();
    await render(<DeleteOwnPostSheet onCancel={onCancel} />);
    await fireEvent.press(screen.getByText('Cancelar'));
    expect(onCancel).toHaveBeenCalled();
  });
});
