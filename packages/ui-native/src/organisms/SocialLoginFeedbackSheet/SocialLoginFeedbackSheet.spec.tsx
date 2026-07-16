import { render, screen, fireEvent } from '@testing-library/react-native';
import { SocialLoginFeedbackSheet } from './SocialLoginFeedbackSheet';

describe('SocialLoginFeedbackSheet', () => {
  it('renders the header, status message and CTA', async () => {
    await render(
      <SocialLoginFeedbackSheet
        headerTitle="Fazer login com o Google"
        tone="success"
        title="Conta criada com sucesso"
        description="Seja bem-vindo ao Zupper."
        ctaLabel="Entrar na minha conta"
      />,
    );
    expect(screen.getByText('Fazer login com o Google')).toBeOnTheScreen();
    expect(screen.getByText('Conta criada com sucesso')).toBeOnTheScreen();
    expect(screen.getByText('Entrar na minha conta')).toBeOnTheScreen();
    expect(screen.getByTestId('button-gradient')).toBeOnTheScreen();
  });

  it('renders the CTA as outline (secondary) when tone is warning', async () => {
    await render(
      <SocialLoginFeedbackSheet
        headerTitle="Fazer login com o Google"
        tone="warning"
        title="Não foi possível fazer o login"
        ctaLabel="Voltar e tentar novamente"
      />,
    );
    expect(screen.queryByTestId('button-gradient')).toBeNull();
  });

  it('fires onPressCta', async () => {
    const onPressCta = jest.fn();
    await render(
      <SocialLoginFeedbackSheet
        headerTitle="Fazer login com o Google"
        tone="warning"
        title="Não foi possível fazer o login"
        ctaLabel="Voltar e tentar novamente"
        onPressCta={onPressCta}
      />,
    );
    await fireEvent.press(screen.getByText('Voltar e tentar novamente'));
    expect(onPressCta).toHaveBeenCalledTimes(1);
  });
});
