import { render, screen, fireEvent } from '@testing-library/react-native';
import { PassengerForm } from './PassengerForm';

describe('PassengerForm', () => {
  it('renders the title and every field when expanded', () => {
    render(<PassengerForm title="Adulto 1" />);
    expect(screen.getByText('Adulto 1')).toBeOnTheScreen();
    expect(screen.getByText('Primeiro Nome *')).toBeOnTheScreen();
    expect(screen.getByText('Último Sobrenome *')).toBeOnTheScreen();
    expect(screen.getByText('Data de Nascimento *')).toBeOnTheScreen();
    expect(screen.getByText('CPF *')).toBeOnTheScreen();
    expect(screen.getByText('Sexo *')).toBeOnTheScreen();
    expect(screen.getByText('Masculino')).toBeOnTheScreen();
    expect(screen.getByText('Feminino')).toBeOnTheScreen();
  });

  it('hides the fields when collapsed', () => {
    render(<PassengerForm title="Adulto 1" expanded={false} />);
    expect(screen.queryByText('Primeiro Nome *')).toBeNull();
  });

  it('fires onToggleExpanded when the header is pressed', () => {
    const onToggleExpanded = jest.fn();
    render(<PassengerForm title="Adulto 1" onToggleExpanded={onToggleExpanded} />);
    fireEvent.press(screen.getByText('Adulto 1'));
    expect(onToggleExpanded).toHaveBeenCalledTimes(1);
  });

  it('fires onChangeGender with the pressed option', () => {
    const onChangeGender = jest.fn();
    render(<PassengerForm title="Adulto 1" onChangeGender={onChangeGender} />);
    fireEvent.press(screen.getByText('Feminino'));
    expect(onChangeGender).toHaveBeenCalledWith('female');
  });

  it('shows field errors', () => {
    render(<PassengerForm title="Adulto 1" firstNameError="Campo obrigatório" genderError="Campo obrigatório" />);
    expect(screen.getAllByText('Campo obrigatório')).toHaveLength(2);
  });
});
