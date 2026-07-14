import { render, screen, fireEvent } from '@testing-library/react-native';
import { AccountRow } from './AccountRow';

describe('AccountRow', () => {
  it('renders the boxed row with subtitle, cta and status', async () => {
    await render(
      <AccountRow
        icon="account-personal-data"
        title="Dados pessoais"
        cta="Editar"
        subtitle="Nome, e-mail, data nasc..."
        status={{ label: 'Completo', tone: 'success' }}
      />,
    );
    expect(screen.getByText('Dados pessoais')).toBeOnTheScreen();
    expect(screen.getByText('Editar')).toBeOnTheScreen();
    expect(screen.getByText('Completo')).toBeOnTheScreen();
    expect(screen.getByText('Nome, e-mail, data nasc...')).toBeOnTheScreen();
  });

  it('renders the inline variant', async () => {
    await render(<AccountRow icon="account-help" title="Central de ajuda" cta="Ir agora" boxed={false} />);
    expect(screen.getByText('Central de ajuda')).toBeOnTheScreen();
    expect(screen.getByText('Ir agora')).toBeOnTheScreen();
  });

  it('fires onPress when tapped', async () => {
    const onPress = jest.fn();
    await render(<AccountRow icon="account-password" title="Senha" onPress={onPress} />);
    await fireEvent.press(screen.getByText('Senha'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
