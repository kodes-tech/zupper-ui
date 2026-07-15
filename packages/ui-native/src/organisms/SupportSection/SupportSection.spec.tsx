import { render, screen, fireEvent } from '@testing-library/react-native';
import { SupportSection } from './SupportSection';

const items = [
  { id: 'help', icon: 'support-help' as const, title: 'Central de ajuda', actionLabel: 'Acessar' },
  {
    id: 'whats',
    icon: 'support-whatsapp' as const,
    title: 'WhatsApp',
    description: 'Seg. a sex.',
    actionLabel: 'Ir agora',
  },
];

describe('SupportSection', () => {
  it('renders the default title and the items', async () => {
    await render(<SupportSection items={items} />);
    expect(screen.getByText('Atendimento Zupper')).toBeOnTheScreen();
    expect(screen.getByText('Central de ajuda')).toBeOnTheScreen();
    expect(screen.getByText('WhatsApp')).toBeOnTheScreen();
    expect(screen.getByText('Seg. a sex.')).toBeOnTheScreen();
  });

  it('fires onPressItem with the item id', async () => {
    const onPressItem = jest.fn();
    await render(<SupportSection items={items} onPressItem={onPressItem} />);
    await fireEvent.press(screen.getByRole('button', { name: 'Acessar Central de ajuda' }));
    expect(onPressItem).toHaveBeenCalledWith('help');
  });
});
