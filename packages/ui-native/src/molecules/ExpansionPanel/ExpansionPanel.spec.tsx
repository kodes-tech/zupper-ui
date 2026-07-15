import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ExpansionPanel } from './ExpansionPanel';

describe('ExpansionPanel', () => {
  it('shows children only when expanded', async () => {
    const { rerender } = await render(
      <ExpansionPanel title="Comodidades"><Text>conteúdo</Text></ExpansionPanel>,
    );
    expect(screen.getByText('Comodidades')).toBeOnTheScreen();
    expect(screen.queryByText('conteúdo')).toBeNull();

    await rerender(
      <ExpansionPanel title="Comodidades" expanded><Text>conteúdo</Text></ExpansionPanel>,
    );
    expect(screen.getByText('conteúdo')).toBeOnTheScreen();
  });

  it('fires onToggle', async () => {
    const onToggle = jest.fn();
    await render(<ExpansionPanel title="Preços" onToggle={onToggle}><Text>x</Text></ExpansionPanel>);
    await fireEvent.press(screen.getByRole('button', { name: 'Preços' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
