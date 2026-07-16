import { render, screen, fireEvent } from '@testing-library/react-native';
import { PersonalData } from './PersonalData';

const avatar = { uri: 'https://example.com/avatar.png' };

describe('PersonalData', () => {
  it('renders the header and form fields', async () => {
    await render(<PersonalData avatar={avatar} />);
    expect(screen.getByText('Minha conta')).toBeOnTheScreen();
    expect(screen.getByText('Apelido da comunidade')).toBeOnTheScreen();
  });

  it('fires onBack', async () => {
    const onBack = jest.fn();
    await render(<PersonalData avatar={avatar} onBack={onBack} />);
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalled();
  });

  it('fires onNavigate from the bottom nav', async () => {
    const onNavigate = jest.fn();
    await render(<PersonalData avatar={avatar} onNavigate={onNavigate} />);
    await fireEvent.press(screen.getByText('Início'));
    expect(onNavigate).toHaveBeenCalledWith('inicio');
  });

  it('shows the nickname error state', async () => {
    await render(<PersonalData avatar={avatar} nicknameError="Este nome está indisponível" />);
    expect(screen.getByText('Este nome está indisponível')).toBeOnTheScreen();
  });
});
