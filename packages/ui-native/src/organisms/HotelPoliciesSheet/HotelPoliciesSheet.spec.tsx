import { render, screen } from '@testing-library/react-native';
import { HotelPoliciesSheet } from './HotelPoliciesSheet';

describe('HotelPoliciesSheet', () => {
  it('renders the title and description', async () => {
    await render(
      <HotelPoliciesSheet
        title="Regras da tarifa do adulto"
        description="Cancelamento gratuito até 48 horas antes do check-in. Após esse prazo, será cobrada a primeira diária."
      />,
    );
    expect(screen.getByText('Regras da tarifa do adulto')).toBeOnTheScreen();
    expect(
      screen.getByText(
        'Cancelamento gratuito até 48 horas antes do check-in. Após esse prazo, será cobrada a primeira diária.',
      ),
    ).toBeOnTheScreen();
  });
});
