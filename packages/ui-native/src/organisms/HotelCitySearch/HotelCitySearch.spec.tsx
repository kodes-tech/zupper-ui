import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelCitySearch } from './HotelCitySearch';

const cities = [
  { id: '1', label: 'Recife, PE - Brasil' },
  { id: '2', label: 'Recife Antigo, PE - Brasil' },
];

describe('HotelCitySearch', () => {
  it('renders the query and the city list', async () => {
    await render(<HotelCitySearch query="Recife" cities={cities} />);
    expect(screen.getByDisplayValue('Recife')).toBeOnTheScreen();
    expect(screen.getByText('Recife, PE - Brasil')).toBeOnTheScreen();
    expect(screen.getByText('Recife Antigo, PE - Brasil')).toBeOnTheScreen();
  });

  it('fires onChangeQuery and onSelectCity', async () => {
    const onChangeQuery = jest.fn();
    const onSelectCity = jest.fn();
    await render(
      <HotelCitySearch
        query=""
        cities={cities}
        onChangeQuery={onChangeQuery}
        onSelectCity={onSelectCity}
      />,
    );
    await fireEvent.changeText(screen.getByPlaceholderText('Qual seu destino ?'), 'Rec');
    expect(onChangeQuery).toHaveBeenCalledWith('Rec');
    await fireEvent.press(screen.getByText('Recife, PE - Brasil'));
    expect(onSelectCity).toHaveBeenCalledWith('1');
  });
});
