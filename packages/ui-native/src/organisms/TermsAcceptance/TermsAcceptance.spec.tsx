import { render, screen, fireEvent } from '@testing-library/react-native';
import { TermsAcceptance } from './TermsAcceptance';

describe('TermsAcceptance', () => {
  it('renders the newsletter checkbox and the terms sentence', () => {
    render(<TermsAcceptance />);
    expect(
      screen.getByText('Quero receber novidades, promoções e ofertas especiais por e-mail.'),
    ).toBeOnTheScreen();
    expect(screen.getByText('Termos de uso')).toBeOnTheScreen();
    expect(screen.getByText('Regras da Tarifa.')).toBeOnTheScreen();
  });

  it('fires onToggleTerms when the checkbox is pressed', () => {
    const onToggleTerms = jest.fn();
    render(<TermsAcceptance onToggleTerms={onToggleTerms} />);
    fireEvent.press(screen.getByLabelText('Aceito os termos e condições'));
    expect(onToggleTerms).toHaveBeenCalledTimes(1);
  });

  it('fires onPressTermsOfUse and onPressFareRules independently', () => {
    const onPressTermsOfUse = jest.fn();
    const onPressFareRules = jest.fn();
    render(<TermsAcceptance onPressTermsOfUse={onPressTermsOfUse} onPressFareRules={onPressFareRules} />);
    fireEvent.press(screen.getByText('Termos de uso'));
    fireEvent.press(screen.getByText('Regras da Tarifa.'));
    expect(onPressTermsOfUse).toHaveBeenCalledTimes(1);
    expect(onPressFareRules).toHaveBeenCalledTimes(1);
  });

  it('shows the terms error message', () => {
    render(<TermsAcceptance termsError="Você precisa aceitar os termos e condições" />);
    expect(screen.getByText('Você precisa aceitar os termos e condições')).toBeOnTheScreen();
  });
});
