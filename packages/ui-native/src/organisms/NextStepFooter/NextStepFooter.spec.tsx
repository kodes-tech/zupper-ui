import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { NextStepFooter } from './NextStepFooter';

describe('NextStepFooter', () => {
  it('renders the default CTA label and the security notice', () => {
    render(<NextStepFooter />);
    expect(screen.getByText('Avançar para a próxima etapa')).toBeOnTheScreen();
    expect(screen.getByText('Este é um site seguro')).toBeOnTheScreen();
  });

  it('accepts a custom CTA label', () => {
    render(<NextStepFooter buttonLabel="Finalizar compra" />);
    expect(screen.getByText('Finalizar compra')).toBeOnTheScreen();
  });

  it('fires onPressNext when the CTA is pressed', () => {
    const onPressNext = jest.fn();
    render(<NextStepFooter onPressNext={onPressNext} />);
    fireEvent.press(screen.getByText('Avançar para a próxima etapa'));
    expect(onPressNext).toHaveBeenCalledTimes(1);
  });

  it('renders the security badge slot when provided', () => {
    render(<NextStepFooter securityBadge={<Text>Site Blindado</Text>} />);
    expect(screen.getByText('Site Blindado')).toBeOnTheScreen();
  });
});
