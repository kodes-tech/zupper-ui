import { render, screen, fireEvent } from '@testing-library/react-native';
import { FareFamilySelection } from './FareFamilySelection';
import type { FareFamily } from './FareFamilySelection';

const families: FareFamily[] = [
  {
    id: 'light',
    title: 'LIGHT',
    price: 'R$ 2.259,98',
    headerColor: '#769d28',
    benefits: [{ label: 'Bagagem', included: false }],
  },
  {
    id: 'standard',
    title: 'STANDARD',
    price: '+ R$ 200,95',
    headerColor: '#008d87',
    benefits: [{ label: 'Bagagem (01 peça)', included: true }],
  },
];

describe('FareFamilySelection', () => {
  it('renders the section title and every family card', async () => {
    await render(<FareFamilySelection families={families} selectedFamilyId="light" />);
    expect(screen.getByText('Tarifa')).toBeOnTheScreen();
    expect(screen.getByText('LIGHT')).toBeOnTheScreen();
    expect(screen.getByText('R$ 2.259,98')).toBeOnTheScreen();
    expect(screen.getByText('STANDARD')).toBeOnTheScreen();
    expect(screen.getByText('+ R$ 200,95')).toBeOnTheScreen();
  });

  it('marks only the selected family as selected', async () => {
    await render(<FareFamilySelection families={families} selectedFamilyId="standard" />);
    expect(screen.getByText('Selecionado')).toBeOnTheScreen();
    expect(screen.getAllByText('Selecionar')).toHaveLength(1);
  });

  it('fires onSelectFamily with the pressed family id', async () => {
    const onSelectFamily = jest.fn();
    await render(
      <FareFamilySelection families={families} selectedFamilyId="light" onSelectFamily={onSelectFamily} />,
    );
    await fireEvent.press(screen.getAllByText('Selecionar')[0]);
    expect(onSelectFamily).toHaveBeenCalledWith('standard');
  });

  it('fires onPressDetails when "Ver tarifa" is pressed', async () => {
    const onPressDetails = jest.fn();
    await render(<FareFamilySelection families={families} onPressDetails={onPressDetails} />);
    await fireEvent.press(screen.getByLabelText('Ver tarifa'));
    expect(onPressDetails).toHaveBeenCalledTimes(1);
  });
});
