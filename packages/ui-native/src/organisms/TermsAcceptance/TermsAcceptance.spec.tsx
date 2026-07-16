import { render, screen, fireEvent } from '@testing-library/react-native';
import { TermsAcceptance } from './TermsAcceptance';

describe('TermsAcceptance', () => {
  it('renders the newsletter checkbox and the terms sentence', async () => {
    await render(<TermsAcceptance />);
    expect(
      screen.getByText('Quero receber novidades, promoções e ofertas especiais por e-mail.'),
    ).toBeOnTheScreen();
    expect(screen.getByText('Termos de uso')).toBeOnTheScreen();
    expect(screen.getByText('Regras da Tarifa.')).toBeOnTheScreen();
  });

  it('fires onToggleTerms when the checkbox is pressed', async () => {
    const onToggleTerms = jest.fn();
    await render(<TermsAcceptance onToggleTerms={onToggleTerms} />);
    await fireEvent.press(screen.getByLabelText('Aceito os termos e condições'));
    expect(onToggleTerms).toHaveBeenCalledTimes(1);
  });

  it('fires onPressTermsOfUse and onPressFareRules independently', async () => {
    const onPressTermsOfUse = jest.fn();
    const onPressFareRules = jest.fn();
    await render(<TermsAcceptance onPressTermsOfUse={onPressTermsOfUse} onPressFareRules={onPressFareRules} />);
    await fireEvent.press(screen.getByText('Termos de uso'));
    await fireEvent.press(screen.getByText('Regras da Tarifa.'));
    expect(onPressTermsOfUse).toHaveBeenCalledTimes(1);
    expect(onPressFareRules).toHaveBeenCalledTimes(1);
  });

  it('shows the terms error message', async () => {
    await render(<TermsAcceptance termsError="Você precisa aceitar os termos e condições" />);
    expect(screen.getByText('Você precisa aceitar os termos e condições')).toBeOnTheScreen();
  });
});
