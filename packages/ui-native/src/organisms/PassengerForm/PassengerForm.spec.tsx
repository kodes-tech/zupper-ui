import { render, screen, fireEvent } from '@testing-library/react-native';
import { PassengerForm } from './PassengerForm';

describe('PassengerForm', () => {
  it('renders the title and every field when expanded', async () => {
    await render(<PassengerForm title="Adulto 1" />);
    expect(screen.getByText('Adulto 1')).toBeOnTheScreen();
    expect(screen.getByText('Primeiro Nome *')).toBeOnTheScreen();
    expect(screen.getByText('Último Sobrenome *')).toBeOnTheScreen();
    expect(screen.getByText('Data de Nascimento *')).toBeOnTheScreen();
    expect(screen.getByText('CPF *')).toBeOnTheScreen();
    expect(screen.getByText('Sexo *')).toBeOnTheScreen();
    expect(screen.getByText('Masculino')).toBeOnTheScreen();
    expect(screen.getByText('Feminino')).toBeOnTheScreen();
  });

  it('hides the fields when collapsed', async () => {
    await render(<PassengerForm title="Adulto 1" expanded={false} />);
    expect(screen.queryByText('Primeiro Nome *')).toBeNull();
  });

  it('fires onToggleExpanded when the header is pressed', async () => {
    const onToggleExpanded = jest.fn();
    await render(<PassengerForm title="Adulto 1" onToggleExpanded={onToggleExpanded} />);
    await fireEvent.press(screen.getByText('Adulto 1'));
    expect(onToggleExpanded).toHaveBeenCalledTimes(1);
  });

  it('fires onChangeGender with the pressed option', async () => {
    const onChangeGender = jest.fn();
    await render(<PassengerForm title="Adulto 1" onChangeGender={onChangeGender} />);
    await fireEvent.press(screen.getByText('Feminino'));
    expect(onChangeGender).toHaveBeenCalledWith('female');
  });

  it('shows field errors', async () => {
    await render(<PassengerForm title="Adulto 1" firstNameError="Campo obrigatório" genderError="Campo obrigatório" />);
    expect(screen.getAllByText('Campo obrigatório')).toHaveLength(2);
  });
});
