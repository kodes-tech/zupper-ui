import { render, screen } from '@testing-library/react-native';
import { PixForm } from './PixForm';

describe('PixForm', () => {
  it('renders the PF fields by default', () => {
    render(<PixForm />);
    expect(screen.getByText('Transferência via PIX')).toBeOnTheScreen();
    expect(screen.getByText('Nome Completo *')).toBeOnTheScreen();
    expect(screen.getByText('CPF *')).toBeOnTheScreen();
    expect(screen.getByText('O pagamento será feito com os meus dados')).toBeOnTheScreen();
    expect(screen.queryByText('Inscrição Municipal')).toBeNull();
    expect(
      screen.getByText('Lembre-se que o pagamento deverá ser efetuado em até 3h depois da compra.'),
    ).toBeOnTheScreen();
  });

  it('switches to PJ fields', () => {
    render(<PixForm personType="CNPJ" />);
    expect(screen.getByText('Razão Social *')).toBeOnTheScreen();
    expect(screen.getByText('CNPJ *')).toBeOnTheScreen();
    expect(screen.getByText('Inscrição Municipal')).toBeOnTheScreen();
    expect(screen.queryByText('O pagamento será feito com os meus dados')).toBeNull();
  });
});
