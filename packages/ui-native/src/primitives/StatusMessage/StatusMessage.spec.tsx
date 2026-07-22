import { render, screen } from '@testing-library/react-native';
import { StatusMessage } from './StatusMessage';

describe('StatusMessage', () => {
  it('renders the title and description', async () => {
    await render(
      <StatusMessage
        tone="success"
        title="Conta criada com sucesso"
        description="Seja bem-vindo ao Zupper."
      />,
    );
    expect(screen.getByText('Conta criada com sucesso')).toBeOnTheScreen();
    expect(screen.getByText('Seja bem-vindo ao Zupper.')).toBeOnTheScreen();
  });

  it('omits the description when not provided', async () => {
    await render(<StatusMessage tone="success" title="Senha redefinida" />);
    expect(screen.getByText('Senha redefinida')).toBeOnTheScreen();
    expect(screen.queryByText('Seja bem-vindo ao Zupper.')).not.toBeOnTheScreen();
  });
});
