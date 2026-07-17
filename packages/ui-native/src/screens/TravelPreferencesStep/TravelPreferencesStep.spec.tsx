import { fireEvent, render, screen } from '@testing-library/react-native';
import { TravelPreferencesStep } from './TravelPreferencesStep';
import type { TravelPreferenceOption } from './TravelPreferencesStep';

const options: TravelPreferenceOption[] = [
  { id: 'economica', label: 'Econômica', image: { uri: 'https://example.com/a.jpg' } },
  { id: 'executiva', label: 'Executiva', image: { uri: 'https://example.com/b.jpg' } },
];

describe('TravelPreferencesStep', () => {
  it('renders the header, heading and options', async () => {
    await render(
      <TravelPreferencesStep
        step={1}
        totalSteps={9}
        heading="Como você gosta de viajar?"
        options={options}
      />,
    );
    expect(screen.getByText('Preferências de viagem')).toBeOnTheScreen();
    expect(screen.getByText('Como você gosta de viajar?')).toBeOnTheScreen();
    expect(screen.getByText('Econômica')).toBeOnTheScreen();
    expect(screen.getByText('Executiva')).toBeOnTheScreen();
  });

  it('disables the CTA until an option is selected', async () => {
    const onPressCta = jest.fn();
    await render(
      <TravelPreferencesStep
        step={1}
        totalSteps={9}
        heading="Como você gosta de viajar?"
        options={options}
        onPressCta={onPressCta}
      />,
    );
    await fireEvent.press(screen.getByText('Avançar'));
    expect(onPressCta).not.toHaveBeenCalled();
  });

  it('enables the CTA once an option is selected', async () => {
    const onPressCta = jest.fn();
    await render(
      <TravelPreferencesStep
        step={1}
        totalSteps={9}
        heading="Como você gosta de viajar?"
        options={options}
        selectedIds={['economica']}
        onPressCta={onPressCta}
      />,
    );
    await fireEvent.press(screen.getByText('Avançar'));
    expect(onPressCta).toHaveBeenCalledTimes(1);
  });

  it('calls onToggleOption with the pressed option id', async () => {
    const onToggleOption = jest.fn();
    await render(
      <TravelPreferencesStep
        step={1}
        totalSteps={9}
        heading="Como você gosta de viajar?"
        options={options}
        onToggleOption={onToggleOption}
      />,
    );
    await fireEvent.press(screen.getByText('Executiva'));
    expect(onToggleOption).toHaveBeenCalledWith('executiva');
  });

  it('uses a custom CTA label for the final step', async () => {
    await render(
      <TravelPreferencesStep
        step={9}
        totalSteps={9}
        heading="Chegando no destino"
        options={options}
        ctaLabel="Concluir"
      />,
    );
    expect(screen.getByText('Concluir')).toBeOnTheScreen();
  });

  it('calls onBack and onNavigate', async () => {
    const onBack = jest.fn();
    const onNavigate = jest.fn();
    await render(
      <TravelPreferencesStep
        step={1}
        totalSteps={9}
        heading="Como você gosta de viajar?"
        options={options}
        onBack={onBack}
        onNavigate={onNavigate}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Início'));
    expect(onNavigate).toHaveBeenCalledWith('inicio');
  });
});
