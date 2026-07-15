import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackageRoomCard } from './PackageRoomCard';

const room = {
  title: 'Quarto 1',
  cancellation: 'Cancelamento grátis até 00/00/0000',
  amenities: ['Tamanho 41m²', 'Televisão', 'Wi-Fi Grátis', 'Secador de cabelo'],
};

describe('PackageRoomCard', () => {
  it('renders title, cancellation and amenities', async () => {
    await render(<PackageRoomCard room={room} />);
    expect(screen.getByText('Quarto 1')).toBeOnTheScreen();
    expect(screen.getByText('Cancelamento grátis até 00/00/0000')).toBeOnTheScreen();
    expect(screen.getByText('O que possui no quarto?')).toBeOnTheScreen();
    expect(screen.getByText('Tamanho 41m²')).toBeOnTheScreen();
    expect(screen.getByText('Secador de cabelo')).toBeOnTheScreen();
  });

  it('fires onSeeAll', async () => {
    const onSeeAll = jest.fn();
    await render(<PackageRoomCard room={room} onSeeAll={onSeeAll} />);
    await fireEvent.press(screen.getByText('Ver todas as comodidades'));
    expect(onSeeAll).toHaveBeenCalledTimes(1);
  });
});
