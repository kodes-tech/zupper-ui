import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelSearchSummary } from './HotelSearchSummary';

describe('HotelSearchSummary', () => {
  it('renders destination and details and fires onEdit', () => {
    const onEdit = jest.fn();
    render(
      <HotelSearchSummary
        destination="Recife - PE"
        details="10 set - 20 set · 2 hóspedes"
        onEdit={onEdit}
      />,
    );
    expect(screen.getByText('Recife - PE')).toBeOnTheScreen();
    expect(screen.getByText('10 set - 20 set · 2 hóspedes')).toBeOnTheScreen();
    fireEvent.press(screen.getByRole('button', { name: 'Editar busca' }));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });
});
