import { fireEvent, render, screen } from '@testing-library/react-native';
import { TravelPreferencesResult } from './TravelPreferencesResult';

describe('TravelPreferencesResult', () => {
  const base = { name: 'Carlos Souza', subtitle: '@carlosviaja', role: 'traveler' as const };

  it('renders the result card over the community profile', async () => {
    await render(
      <TravelPreferencesResult
        {...base}
        photos={[{ uri: 'a' }]}
        tone="success"
        title="Preferências atualizadas"
        description="Vamos personalizar sua experiência."
      />,
    );
    expect(screen.getByText('Meu Perfil - Comunidade')).toBeOnTheScreen();
    expect(screen.getByText('Preferências atualizadas')).toBeOnTheScreen();
  });

  it('renders the exit-flow actions and calls their onPress', async () => {
    const onDiscard = jest.fn();
    await render(
      <TravelPreferencesResult
        {...base}
        photos={[{ uri: 'a' }]}
        tone="warning"
        title="Informações incompletas"
        description="Suas preferências ainda não estão completas."
        actions={[{ label: 'Descartar informações', variant: 'link', onPress: onDiscard }]}
      />,
    );
    await fireEvent.press(screen.getByText('Descartar informações'));
    expect(onDiscard).toHaveBeenCalledTimes(1);
  });
});
