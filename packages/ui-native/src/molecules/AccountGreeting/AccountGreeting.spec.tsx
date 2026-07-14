import { render, screen } from '@testing-library/react-native';
import { AccountGreeting } from './AccountGreeting';

const avatar = { uri: 'avatar' };

describe('AccountGreeting', () => {
  it('renders the name and subtitle', () => {
    render(<AccountGreeting name="Olá, Carlos!" subtitle="@carlosviaja" avatar={avatar} />);
    expect(screen.getByText('Olá, Carlos!')).toBeOnTheScreen();
    expect(screen.getByText('@carlosviaja')).toBeOnTheScreen();
  });

  it('renders no badge when role is omitted', () => {
    render(<AccountGreeting name="Olá, Carlos!" subtitle="contato@dominio.com.br" avatar={avatar} />);
    expect(screen.queryByText('Viajante')).toBeNull();
  });

  it('renders the partner badge with a custom label', () => {
    render(
      <AccountGreeting
        name="Olá, Ana!"
        subtitle="@anasilvatrip"
        avatar={avatar}
        role="partner"
        badgeLabel="Zupper Parceiro"
      />,
    );
    expect(screen.getByText('Zupper Parceiro')).toBeOnTheScreen();
  });
});
