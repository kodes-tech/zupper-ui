import { render, screen, fireEvent } from '@testing-library/react-native';
import { PaymentMethodSelector } from './PaymentMethodSelector';

describe('PaymentMethodSelector', () => {
  it('renders both options', () => {
    render(<PaymentMethodSelector />);
    expect(screen.getByText('Cartão de Crédito')).toBeOnTheScreen();
    expect(screen.getByText('PIX')).toBeOnTheScreen();
  });

  it('marks the selected option', () => {
    render(<PaymentMethodSelector selected="pix" />);
    expect(screen.getByRole('radio', { name: 'PIX' })).toHaveProperty('props.accessibilityState.selected', true);
  });

  it('fires onChange with the pressed method', () => {
    const onChange = jest.fn();
    render(<PaymentMethodSelector onChange={onChange} />);
    fireEvent.press(screen.getByText('Cartão de Crédito'));
    expect(onChange).toHaveBeenCalledWith('creditCard');
  });

  it('shows the error message', () => {
    render(<PaymentMethodSelector error="Selecione o tipo de pagamento" />);
    expect(screen.getByText('Selecione o tipo de pagamento')).toBeOnTheScreen();
  });
});
