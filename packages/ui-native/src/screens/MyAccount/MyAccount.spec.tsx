import { render, screen, fireEvent } from '@testing-library/react-native';
import { MyAccount } from './MyAccount';

const user = { name: 'Olá, Carlos!', subtitle: '@carlosviaja', avatar: { uri: 'avatar' } };

describe('MyAccount', () => {
  it('renders the logged traveler state with greeting, sections and logout', async () => {
    await render(<MyAccount state="traveler" user={user} />);
    expect(screen.getByText('Olá, Carlos!')).toBeOnTheScreen();
    expect(screen.getByText('Viajante')).toBeOnTheScreen();
    expect(screen.getByText('Meu perfil')).toBeOnTheScreen();
    expect(screen.getByText('Comunidade')).toBeOnTheScreen();
    expect(screen.getByText('Sair da minha conta zupper')).toBeOnTheScreen();
  });

  it('shows the partner badge on the partner state', async () => {
    await render(<MyAccount state="partner" user={{ ...user, name: 'Olá, Ana!' }} />);
    expect(screen.getByText('Zupper Parceiro')).toBeOnTheScreen();
  });

  it('omits the badge on the no-trip state', async () => {
    await render(<MyAccount state="no-trip" user={user} />);
    expect(screen.queryByText('Viajante')).toBeNull();
    expect(screen.queryByText('Zupper Parceiro')).toBeNull();
  });

  it('reports row taps via onRowPress', async () => {
    const onRowPress = jest.fn();
    await render(<MyAccount state="traveler" user={user} onRowPress={onRowPress} />);
    await fireEvent.press(screen.getByText('Dados pessoais'));
    expect(onRowPress).toHaveBeenCalledWith('personal-data');
  });

  it('renders the logged-out state with the login CTA and only Ajuda/Privacidade', async () => {
    const onLogin = jest.fn();
    await render(<MyAccount state="logged-out" onLogin={onLogin} />);
    expect(screen.getByText('Iniciar sessão')).toBeOnTheScreen();
    expect(screen.queryByText('Meu perfil')).toBeNull();
    expect(screen.queryByText('Sair da minha conta zupper')).toBeNull();
    await fireEvent.press(screen.getByText('Iniciar sessão'));
    expect(onLogin).toHaveBeenCalledTimes(1);
  });
});
