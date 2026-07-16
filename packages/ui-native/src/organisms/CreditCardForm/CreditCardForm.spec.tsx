import { render, screen, fireEvent } from '@testing-library/react-native';
import { CreditCardForm } from './CreditCardForm';

describe('CreditCardForm', () => {
  it('renders every field of the card and holder blocks', async () => {
    await render(<CreditCardForm />);
    expect(screen.getByText('Cartão de Crédito')).toBeOnTheScreen();
    expect(screen.getByText('Número do cartão *')).toBeOnTheScreen();
    expect(screen.getByText('Nome impresso no cartão *')).toBeOnTheScreen();
    expect(screen.getByText('Validade *')).toBeOnTheScreen();
    expect(screen.getByText('CVV *')).toBeOnTheScreen();
    expect(screen.getByText('Parcelamento *')).toBeOnTheScreen();
    expect(screen.getByText('Contato do titular do cartão')).toBeOnTheScreen();
    expect(screen.getByText('Eu sou o titular do cartão')).toBeOnTheScreen();
    expect(screen.getByText('Endereço da fatura do cartão')).toBeOnTheScreen();
  });

  it('fires onToggleIsCardOwner and onChangeHolderContactMethod', async () => {
    const onToggleIsCardOwner = jest.fn();
    const onChangeHolderContactMethod = jest.fn();
    await render(
      <CreditCardForm
        onToggleIsCardOwner={onToggleIsCardOwner}
        onChangeHolderContactMethod={onChangeHolderContactMethod}
      />,
    );
    await fireEvent.press(screen.getByText('Eu sou o titular do cartão'));
    await fireEvent.press(screen.getByText('Telefone'));
    expect(onToggleIsCardOwner).toHaveBeenCalledTimes(1);
    expect(onChangeHolderContactMethod).toHaveBeenCalledWith('phone');
  });

  it('fires onPressInstallments', async () => {
    const onPressInstallments = jest.fn();
    await render(<CreditCardForm onPressInstallments={onPressInstallments} />);
    await fireEvent.press(screen.getByText('Selecione o número de parcelas'));
    expect(onPressInstallments).toHaveBeenCalledTimes(1);
  });
});
