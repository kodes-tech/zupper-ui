import { render, screen, fireEvent } from '@testing-library/react-native';
import { SocialAccountPickerSheet } from './SocialAccountPickerSheet';

const accounts = [
  { id: '1', name: 'Nome do usuário', email: 'usuario@gmail.com', initials: 'ZV' },
  { id: '2', name: 'Outro usuário', email: 'outro@gmail.com', initials: 'OU' },
];

describe('SocialAccountPickerSheet', () => {
  it('renders the title, subtitle and accounts', async () => {
    await render(<SocialAccountPickerSheet title="Fazer login com o Google" accounts={accounts} />);
    expect(screen.getByText('Fazer login com o Google')).toBeOnTheScreen();
    expect(screen.getByText('Escolha uma conta')).toBeOnTheScreen();
    expect(screen.getByText('Nome do usuário')).toBeOnTheScreen();
    expect(screen.getByText('usuario@gmail.com')).toBeOnTheScreen();
    expect(screen.getByText('Outro usuário')).toBeOnTheScreen();
  });

  it('fires onSelectAccount with the account id', async () => {
    const onSelectAccount = jest.fn();
    await render(
      <SocialAccountPickerSheet
        title="Fazer login com o Google"
        accounts={accounts}
        onSelectAccount={onSelectAccount}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Nome do usuário, usuario@gmail.com'));
    expect(onSelectAccount).toHaveBeenCalledWith('1');
  });

  it('fires onUseAnotherAccount', async () => {
    const onUseAnotherAccount = jest.fn();
    await render(
      <SocialAccountPickerSheet
        title="Fazer login com o Google"
        accounts={accounts}
        onUseAnotherAccount={onUseAnotherAccount}
      />,
    );
    await fireEvent.press(screen.getByText('Usar outra conta'));
    expect(onUseAnotherAccount).toHaveBeenCalledTimes(1);
  });

  it('fires onPressPrivacyPolicy and onPressTermsOfService', async () => {
    const onPressPrivacyPolicy = jest.fn();
    const onPressTermsOfService = jest.fn();
    await render(
      <SocialAccountPickerSheet
        title="Fazer login com o Google"
        accounts={accounts}
        onPressPrivacyPolicy={onPressPrivacyPolicy}
        onPressTermsOfService={onPressTermsOfService}
      />,
    );
    await fireEvent.press(screen.getByText('Política de Privacidade'));
    await fireEvent.press(screen.getByText('Termos de Serviços'));
    expect(onPressPrivacyPolicy).toHaveBeenCalledTimes(1);
    expect(onPressTermsOfService).toHaveBeenCalledTimes(1);
  });
});
