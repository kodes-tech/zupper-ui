import { render, screen, fireEvent } from '@testing-library/react-native';
import { AddressForm } from './AddressForm';

describe('AddressForm', () => {
  it('renders the title and every field', () => {
    render(<AddressForm title="Endereço da fatura do cartão" />);
    expect(screen.getByText('Endereço da fatura do cartão')).toBeOnTheScreen();
    expect(screen.getByText('CEP')).toBeOnTheScreen();
    expect(screen.getByText('Endereço da fatura')).toBeOnTheScreen();
    expect(screen.getByText('Bairro')).toBeOnTheScreen();
    expect(screen.getByText('Número')).toBeOnTheScreen();
    expect(screen.getByText('Complemento')).toBeOnTheScreen();
    expect(screen.getByText('Estado *')).toBeOnTheScreen();
    expect(screen.getByText('Cidade *')).toBeOnTheScreen();
  });

  it('shows field errors', () => {
    render(<AddressForm zipCodeError="Campo obrigatório" />);
    expect(screen.getAllByText('Campo obrigatório').length).toBeGreaterThan(0);
  });

  it('shows the "same as profile" checkbox only when enabled', () => {
    const { rerender } = render(<AddressForm />);
    expect(screen.queryByText('O Endereço é o mesmo do cadastro Zupper')).toBeNull();

    rerender(<AddressForm showSameAsProfileOption />);
    expect(screen.getByText('O Endereço é o mesmo do cadastro Zupper')).toBeOnTheScreen();
  });

  it('fires onPressZipCodeHelp and onPressState', () => {
    const onPressZipCodeHelp = jest.fn();
    const onPressState = jest.fn();
    render(<AddressForm onPressZipCodeHelp={onPressZipCodeHelp} onPressState={onPressState} />);
    fireEvent.press(screen.getByLabelText('Não sei meu CEP'));
    fireEvent.press(screen.getByText('Selecione o estado'));
    expect(onPressZipCodeHelp).toHaveBeenCalledTimes(1);
    expect(onPressState).toHaveBeenCalledTimes(1);
  });
});
