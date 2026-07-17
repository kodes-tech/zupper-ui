import { render, screen, fireEvent } from '@testing-library/react-native';
import { OwnPostActionsSheet } from './OwnPostActionsSheet';

describe('OwnPostActionsSheet', () => {
  it('renders the title and actions', async () => {
    await render(<OwnPostActionsSheet />);
    expect(screen.getByText('Mais opções')).toBeOnTheScreen();
    expect(screen.getByText('Editar publicação')).toBeOnTheScreen();
    expect(screen.getByText('Excluir publicação')).toBeOnTheScreen();
    expect(screen.getByText('Cancelar')).toBeOnTheScreen();
  });

  it('fires onEdit', async () => {
    const onEdit = jest.fn();
    await render(<OwnPostActionsSheet onEdit={onEdit} />);
    await fireEvent.press(screen.getByText('Editar publicação'));
    expect(onEdit).toHaveBeenCalled();
  });

  it('fires onDelete', async () => {
    const onDelete = jest.fn();
    await render(<OwnPostActionsSheet onDelete={onDelete} />);
    await fireEvent.press(screen.getByText('Excluir publicação'));
    expect(onDelete).toHaveBeenCalled();
  });
});
