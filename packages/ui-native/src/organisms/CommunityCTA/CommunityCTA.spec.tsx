import { render, screen, fireEvent } from '@testing-library/react-native';
import { CommunityCTA } from './CommunityCTA';

describe('CommunityCTA', () => {
  it('renders title and the three publish actions', async () => {
    await render(<CommunityCTA variant="traveler" title="Bem-vindo" description="Publique" />);
    expect(screen.getByText('Bem-vindo')).toBeOnTheScreen();
    expect(screen.getByText('Dica')).toBeOnTheScreen();
    expect(screen.getByText('Foto')).toBeOnTheScreen();
    expect(screen.getByText('Roteiro')).toBeOnTheScreen();
  });

  it('fires onFoto', async () => {
    const onFoto = jest.fn();
    await render(<CommunityCTA variant="partner" title="t" description="d" onFoto={onFoto} />);
    await fireEvent.press(screen.getByText('Foto'));
    expect(onFoto).toHaveBeenCalledTimes(1);
  });
});
