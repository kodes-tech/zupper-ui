import { render, screen, fireEvent } from '@testing-library/react-native';
import { HotelNearbyCard } from './HotelNearbyCard';

const points = [
  { name: 'Parque Ibirapuera', address: 'Av. Ibirapuera, 2927', distance: '5km do Centro', hasMap: true },
  { name: 'Av. Paulista', address: 'Av. Paulista, 1000', distance: '8km do Centro' },
];

describe('HotelNearbyCard', () => {
  it('renders the title and the points', async () => {
    await render(<HotelNearbyCard points={points} />);
    expect(screen.getByText('Interesses na proximidade')).toBeOnTheScreen();
    expect(screen.getByText('Parque Ibirapuera')).toBeOnTheScreen();
    expect(screen.getByText('Av. Ibirapuera, 2927')).toBeOnTheScreen();
    expect(screen.getByText('(5km do Centro)')).toBeOnTheScreen();
  });

  it('fires onSeeMap only for points with a map link', async () => {
    const onSeeMap = jest.fn();
    await render(<HotelNearbyCard points={points} onSeeMap={onSeeMap} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Ver Parque Ibirapuera no mapa' }));
    expect(onSeeMap).toHaveBeenCalledWith(0);
    // segundo ponto não tem hasMap → sem link
    expect(screen.queryByRole('button', { name: 'Ver Av. Paulista no mapa' })).toBeNull();
  });

  it('renders nothing when there are no points', async () => {
    const { toJSON } = await render(<HotelNearbyCard points={[]} />);
    expect(toJSON()).toBeNull();
  });
});
