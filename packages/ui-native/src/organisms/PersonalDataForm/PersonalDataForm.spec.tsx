import { render, screen, fireEvent } from '@testing-library/react-native';
import { PersonalDataForm } from './PersonalDataForm';

const avatar = { uri: 'https://example.com/avatar.png' };

describe('PersonalDataForm', () => {
  it('renders every field label', async () => {
    await render(<PersonalDataForm avatar={avatar} />);
    [
      'Primeiro nome',
      'Último nome',
      'Apelido da comunidade',
      'E-mail',
      'Data de Nascimento',
      'CPF',
      'Contato',
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeOnTheScreen();
    });
    expect(screen.getByText('Celular')).toBeOnTheScreen();
    expect(screen.getByText('Telefone')).toBeOnTheScreen();
  });

  it('fires onChangeFirstName when typing', async () => {
    const onChangeFirstName = jest.fn();
    await render(<PersonalDataForm avatar={avatar} onChangeFirstName={onChangeFirstName} />);
    await fireEvent.changeText(screen.getByPlaceholderText('Nome'), 'Henrique');
    expect(onChangeFirstName).toHaveBeenCalledWith('Henrique');
  });

  it('fires onChangeContactType when selecting Telefone', async () => {
    const onChangeContactType = jest.fn();
    await render(<PersonalDataForm avatar={avatar} onChangeContactType={onChangeContactType} />);
    await fireEvent.press(screen.getByText('Telefone'));
    expect(onChangeContactType).toHaveBeenCalledWith('telefone');
  });

  it('shows the nickname error message', async () => {
    await render(<PersonalDataForm avatar={avatar} nicknameError="Este nome está indisponível" />);
    expect(screen.getByText('Este nome está indisponível')).toBeOnTheScreen();
  });

  it('fires onChangePhoto', async () => {
    const onChangePhoto = jest.fn();
    await render(<PersonalDataForm avatar={avatar} onChangePhoto={onChangePhoto} />);
    await fireEvent.press(screen.getByLabelText('Alterar foto'));
    expect(onChangePhoto).toHaveBeenCalled();
  });
});
