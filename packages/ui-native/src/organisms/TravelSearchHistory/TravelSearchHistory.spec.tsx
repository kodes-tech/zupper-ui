import { render, screen, fireEvent } from '@testing-library/react-native';
import { TravelSearchHistory } from './TravelSearchHistory';

const items = [
  { id: 'rec', type: 'voo' as const, destination: 'Recife', dates: '10 set - 20 set' },
  { id: 'ssa', type: 'hospedagem' as const, destination: 'Salvador', dates: '02 out - 08 out' },
];

describe('TravelSearchHistory', () => {
  it('renders the section title and the items', async () => {
    await render(<TravelSearchHistory items={items} />);
    expect(screen.getByText('próxima viagem')).toBeOnTheScreen();
    expect(screen.getByText('Pesquisas recentes')).toBeOnTheScreen();
    expect(screen.getByText('Recife')).toBeOnTheScreen();
    expect(screen.getByText('Salvador')).toBeOnTheScreen();
    expect(screen.getByText('10 set - 20 set')).toBeOnTheScreen();
  });

  it('renders one action per item with the default label', async () => {
    await render(<TravelSearchHistory items={items} />);
    expect(screen.getAllByText('Pesquisar')).toHaveLength(2);
  });

  it('fires onPressItem with the item id', async () => {
    const onPressItem = jest.fn();
    await render(<TravelSearchHistory items={items} onPressItem={onPressItem} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Pesquisar Salvador' }));
    expect(onPressItem).toHaveBeenCalledWith('ssa');
  });
});
