import { render, screen, fireEvent } from '@testing-library/react-native';
import { TripSummaryFooter } from './TripSummaryFooter';

describe('TripSummaryFooter', () => {
  it('renders the route, date and total price', async () => {
    await render(<TripSummaryFooter route="GRU - REC" dateLabel="15 de julho" totalPrice="R$ 2.434,67" />);
    expect(screen.getByText('GRU - REC')).toBeOnTheScreen();
    expect(screen.getByText('15 de julho')).toBeOnTheScreen();
    expect(screen.getByText('Detalhes da viagem')).toBeOnTheScreen();
    expect(screen.getByText('R$ 2.434,67')).toBeOnTheScreen();
  });

  it('fires onPressDetails when "Ver detalhes" is pressed', async () => {
    const onPressDetails = jest.fn();
    await render(
      <TripSummaryFooter
        route="GRU - REC"
        dateLabel="15 de julho"
        totalPrice="R$ 2.434,67"
        onPressDetails={onPressDetails}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Ver detalhes'));
    expect(onPressDetails).toHaveBeenCalledTimes(1);
  });
});
