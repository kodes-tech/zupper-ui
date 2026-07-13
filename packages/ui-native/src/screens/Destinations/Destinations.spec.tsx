import { render, screen, fireEvent } from '@testing-library/react-native';
import { Destinations } from './Destinations';
import type { Destination } from './Destinations';

const destinations: Destination[] = [
  { id: '1', name: 'Recife', image: { uri: 'a' } },
  { id: '2', name: 'Noronha', image: { uri: 'b' } },
];

describe('Destinations', () => {
  it('renders the header and the destination cards', () => {
    render(<Destinations destinations={destinations} />);
    expect(screen.getByText('Destinos em alta')).toBeOnTheScreen();
    expect(screen.getByText('Recife')).toBeOnTheScreen();
    expect(screen.getByText('Noronha')).toBeOnTheScreen();
  });

  it('fires onPressDestination with the id', () => {
    const onPressDestination = jest.fn();
    render(<Destinations destinations={destinations} onPressDestination={onPressDestination} />);
    fireEvent.press(screen.getByText('Noronha'));
    expect(onPressDestination).toHaveBeenCalledWith('2');
  });
});
