import { render, screen, fireEvent } from '@testing-library/react-native';
import { colors } from '@kodes-tech/tokens';
import { FareFamilyCard } from './FareFamilyCard';
import type { FareFamilyCardProps } from './FareFamilyCard';

const baseProps: FareFamilyCardProps = {
  title: 'standard',
  price: '+ R$ 200,95',
  headerColor: '#008d87',
  benefits: [
    { label: 'Bagagem (01 peça)', included: true },
    { label: 'Marcação de Assento', included: false },
    { label: 'Reembolso', included: false },
  ],
};

describe('FareFamilyCard', () => {
  it('renders the title in uppercase, price and benefits', async () => {
    await render(<FareFamilyCard {...baseProps} />);
    expect(screen.getByText('STANDARD')).toBeOnTheScreen();
    expect(screen.getByText('+ R$ 200,95')).toBeOnTheScreen();
    expect(screen.getByText('Bagagem (01 peça)')).toBeOnTheScreen();
    expect(screen.getByText('Marcação de Assento')).toBeOnTheScreen();
    expect(screen.getByText('Reembolso')).toBeOnTheScreen();
  });

  it('colors included benefits green and excluded ones red', async () => {
    await render(<FareFamilyCard {...baseProps} />);
    expect(screen.getByTestId('benefit-icon-0').props.color).toBe(colors.feedback.success);
    expect(screen.getByTestId('benefit-icon-1').props.color).toBe(colors.feedback.danger);
  });

  it('shows "Selecionar" when not selected and "Selecionado" when selected', async () => {
    const { rerender } = await render(<FareFamilyCard {...baseProps} />);
    expect(screen.getByText('Selecionar')).toBeOnTheScreen();

    await rerender(<FareFamilyCard {...baseProps} selected />);
    expect(screen.getByText('Selecionado')).toBeOnTheScreen();
  });

  it('fires onSelect when the select button is pressed', async () => {
    const onSelect = jest.fn();
    await render(<FareFamilyCard {...baseProps} onSelect={onSelect} />);
    await fireEvent.press(screen.getByLabelText('Selecionar'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
