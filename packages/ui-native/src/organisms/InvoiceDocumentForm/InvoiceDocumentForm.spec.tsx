import { render, screen, fireEvent } from '@testing-library/react-native';
import { InvoiceDocumentForm } from './InvoiceDocumentForm';

describe('InvoiceDocumentForm', () => {
  it('renders the PF fields by default', () => {
    render(<InvoiceDocumentForm />);
    expect(screen.getByText('Nome Completo *')).toBeOnTheScreen();
    expect(screen.getByText('CPF *')).toBeOnTheScreen();
    expect(screen.queryByText('Informar a inscrição municipal')).toBeNull();
  });

  it('shows PJ fields and the municipal registration checkbox', () => {
    render(<InvoiceDocumentForm personType="CNPJ" />);
    expect(screen.getByText('Razão Social *')).toBeOnTheScreen();
    expect(screen.getByText('CNPJ *')).toBeOnTheScreen();
    expect(screen.getByText('Informar a inscrição municipal')).toBeOnTheScreen();
    expect(screen.queryByText('Inscrição Municipal')).toBeNull();
  });

  it('shows the municipal registration field only when checked', () => {
    render(<InvoiceDocumentForm personType="CNPJ" hasMunicipalRegistration />);
    expect(screen.getByText('Inscrição Municipal')).toBeOnTheScreen();
  });

  it('fires onChangePersonType when a tab is pressed', () => {
    const onChangePersonType = jest.fn();
    render(<InvoiceDocumentForm onChangePersonType={onChangePersonType} />);
    fireEvent.press(screen.getByText('Pessoa Jurídica'));
    expect(onChangePersonType).toHaveBeenCalledWith('CNPJ');
  });
});
