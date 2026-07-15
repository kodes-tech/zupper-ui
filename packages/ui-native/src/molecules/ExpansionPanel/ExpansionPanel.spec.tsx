import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ExpansionPanel } from './ExpansionPanel';

describe('ExpansionPanel', () => {
  it('shows children only when expanded', () => {
    const { rerender } = render(
      <ExpansionPanel title="Comodidades"><Text>conteúdo</Text></ExpansionPanel>,
    );
    expect(screen.getByText('Comodidades')).toBeOnTheScreen();
    expect(screen.queryByText('conteúdo')).toBeNull();

    rerender(
      <ExpansionPanel title="Comodidades" expanded><Text>conteúdo</Text></ExpansionPanel>,
    );
    expect(screen.getByText('conteúdo')).toBeOnTheScreen();
  });

  it('fires onToggle', () => {
    const onToggle = jest.fn();
    render(<ExpansionPanel title="Preços" onToggle={onToggle}><Text>x</Text></ExpansionPanel>);
    fireEvent.press(screen.getByRole('button', { name: 'Preços' }));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });
});
