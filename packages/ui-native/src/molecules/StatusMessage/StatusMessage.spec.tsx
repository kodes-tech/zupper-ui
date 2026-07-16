import { render, screen } from '@testing-library/react-native';
import { StatusMessage } from './StatusMessage';

describe('StatusMessage', () => {
  it('renders the title and description for the success tone', async () => {
    await render(
      <StatusMessage tone="success" title="Conta criada com sucesso" description="Seja bem-vindo ao Zupper." />,
    );
    expect(screen.getByText('Conta criada com sucesso')).toBeOnTheScreen();
    expect(screen.getByText('Seja bem-vindo ao Zupper.')).toBeOnTheScreen();
  });

  it('renders the warning tone without a description', async () => {
    await render(<StatusMessage tone="warning" title="Não foi possível fazer o login" />);
    expect(screen.getByText('Não foi possível fazer o login')).toBeOnTheScreen();
  });
});
