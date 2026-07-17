import { fireEvent, render, screen } from '@testing-library/react-native';
import { TravelPreferencesResultCard } from './TravelPreferencesResultCard';

describe('TravelPreferencesResultCard', () => {
  it('renders the title and description', async () => {
    await render(
      <TravelPreferencesResultCard
        tone="success"
        title="Preferências atualizadas"
        description="Vamos personalizar sua experiência."
      />,
    );
    expect(screen.getByText('Preferências atualizadas')).toBeOnTheScreen();
    expect(screen.getByText('Vamos personalizar sua experiência.')).toBeOnTheScreen();
  });

  it('calls onDismiss when the backdrop is pressed', async () => {
    const onDismiss = jest.fn();
    await render(
      <TravelPreferencesResultCard
        tone="success"
        title="Preferências atualizadas"
        description="Vamos personalizar sua experiência."
        onDismiss={onDismiss}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Fechar'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders each action and calls its onPress, including the link variant', async () => {
    const onContinue = jest.fn();
    const onSave = jest.fn();
    const onDiscard = jest.fn();
    await render(
      <TravelPreferencesResultCard
        tone="warning"
        title="Informações incompletas"
        description="Suas preferências ainda não estão completas."
        actions={[
          { label: 'Continuar respondendo', variant: 'primary', onPress: onContinue },
          { label: 'Salvar informações', variant: 'secondary', onPress: onSave },
          { label: 'Descartar informações', variant: 'link', onPress: onDiscard },
        ]}
      />,
    );

    await fireEvent.press(screen.getByText('Continuar respondendo'));
    expect(onContinue).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Salvar informações'));
    expect(onSave).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Descartar informações'));
    expect(onDiscard).toHaveBeenCalledTimes(1);
  });
});
