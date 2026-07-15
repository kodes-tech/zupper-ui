import { render, screen, fireEvent } from '@testing-library/react-native';
import { CheckoutTravelers } from './CheckoutTravelers';
import type { Passenger } from './CheckoutTravelers';

const passengers: Passenger[] = [
  { id: 'adt-1', title: 'Adulto 1' },
  { id: 'adt-2', title: 'Adulto 2' },
];

const baseProps = {
  passengers,
  route: 'GRU - REC',
  tripDate: '15 de julho',
  totalPrice: 'R$ 2.434,67',
};

describe('CheckoutTravelers', () => {
  it('renders the header, step title and one card per passenger', async () => {
    await render(<CheckoutTravelers {...baseProps} />);
    expect(screen.getByText('Checkout - 2 de 4')).toBeOnTheScreen();
    expect(screen.getByText('Quem vai viajar?')).toBeOnTheScreen();
    expect(screen.getByText('Adulto 1')).toBeOnTheScreen();
    expect(screen.getByText('Adulto 2')).toBeOnTheScreen();
  });

  it('expands every passenger by default', async () => {
    await render(<CheckoutTravelers {...baseProps} />);
    expect(screen.getAllByText('Primeiro Nome *')).toHaveLength(2);
  });

  it('collapses only the ids missing from expandedPassengerIds', async () => {
    await render(<CheckoutTravelers {...baseProps} expandedPassengerIds={['adt-1']} />);
    expect(screen.getAllByText('Primeiro Nome *')).toHaveLength(1);
  });

  it('fires onChangePassengerField with the passenger id and field', async () => {
    const onChangePassengerField = jest.fn();
    await render(<CheckoutTravelers {...baseProps} onChangePassengerField={onChangePassengerField} />);
    await fireEvent.changeText(screen.getAllByPlaceholderText('Insira seu nome')[1], 'Ana');
    expect(onChangePassengerField).toHaveBeenCalledWith('adt-2', 'firstName', 'Ana');
  });

  it('fires onPressNextStep and onPressTripDetails', async () => {
    const onPressNextStep = jest.fn();
    const onPressTripDetails = jest.fn();
    await render(
      <CheckoutTravelers {...baseProps} onPressNextStep={onPressNextStep} onPressTripDetails={onPressTripDetails} />,
    );
    await fireEvent.press(screen.getByText('Avançar para a próxima etapa'));
    await fireEvent.press(screen.getByLabelText('Ver detalhes'));
    expect(onPressNextStep).toHaveBeenCalledTimes(1);
    expect(onPressTripDetails).toHaveBeenCalledTimes(1);
  });
});
