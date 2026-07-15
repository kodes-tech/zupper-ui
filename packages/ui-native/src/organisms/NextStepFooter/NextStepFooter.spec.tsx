import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { NextStepFooter } from './NextStepFooter';

describe('NextStepFooter', () => {
  it('renders the default CTA label and the security notice', async () => {
    await render(<NextStepFooter />);
    expect(screen.getByText('Avançar para a próxima etapa')).toBeOnTheScreen();
    expect(screen.getByText('Este é um site seguro')).toBeOnTheScreen();
  });

  it('accepts a custom CTA label', async () => {
    await render(<NextStepFooter buttonLabel="Finalizar compra" />);
    expect(screen.getByText('Finalizar compra')).toBeOnTheScreen();
  });

  it('fires onPressNext when the CTA is pressed', async () => {
    const onPressNext = jest.fn();
    await render(<NextStepFooter onPressNext={onPressNext} />);
    await fireEvent.press(screen.getByText('Avançar para a próxima etapa'));
    expect(onPressNext).toHaveBeenCalledTimes(1);
  });

  it('renders the security badge slot when provided', async () => {
    await render(<NextStepFooter securityBadge={<Text>Site Blindado</Text>} />);
    expect(screen.getByText('Site Blindado')).toBeOnTheScreen();
  });
});
