import { render, screen, fireEvent } from '@testing-library/react-native';
import { GreetingHeader } from './GreetingHeader';

describe('GreetingHeader', () => {
  it('renders title, subtitle and cta', () => {
    render(<GreetingHeader title="Olá, Ana" subtitle="@ana" role="partner" ctaLabel="Meu perfil" />);
    expect(screen.getByText('Olá, Ana')).toBeOnTheScreen();
    expect(screen.getByText('@ana')).toBeOnTheScreen();
    expect(screen.getByText('Meu perfil')).toBeOnTheScreen();
  });

  it('fires onCtaPress', () => {
    const onCtaPress = jest.fn();
    render(<GreetingHeader title="Olá" subtitle="x" role="guest" initials="HN" ctaLabel="Fazer login" onCtaPress={onCtaPress} />);
    fireEvent.press(screen.getByText('Fazer login'));
    expect(onCtaPress).toHaveBeenCalledTimes(1);
  });
});
