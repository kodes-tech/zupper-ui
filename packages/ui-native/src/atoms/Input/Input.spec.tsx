import { fireEvent, render, screen } from '@testing-library/react-native';
import { colors } from '@kodes-tech/tokens';
import { Input } from './Input';

describe('Input', () => {
  it('renders the label and the placeholder', () => {
    render(<Input label="Título do roteiro" placeholder="Digite o título da sua dica" />);
    expect(screen.getByText('Título do roteiro')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Digite o título da sua dica')).toBeOnTheScreen();
  });

  it('renders without a label', () => {
    render(<Input placeholder="Digite o título da sua dica" />);
    expect(screen.queryByText('Título do roteiro')).not.toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Digite o título da sua dica')).toBeOnTheScreen();
  });

  it('shows the error message when error is set', () => {
    render(<Input label="Título do roteiro" error="O título é obrigatório" />);
    expect(screen.getByText('O título é obrigatório')).toBeOnTheScreen();
  });

  it('does not show an error message by default', () => {
    render(<Input label="Título do roteiro" />);
    expect(screen.queryByText('O título é obrigatório')).not.toBeOnTheScreen();
  });

  it('uses the selection token as selectionColor', () => {
    render(<Input placeholder="Digite o título da sua dica" />);
    const field = screen.getByPlaceholderText('Digite o título da sua dica');
    expect(field.props.selectionColor).toBe(colors.surface.selection);
  });

  it('supports the disabled state via editable={false}', () => {
    render(<Input label="Título do roteiro" editable={false} />);
    const field = screen.getByLabelText('Título do roteiro');
    expect(field.props.editable).toBe(false);
    expect(field.props.accessibilityState).toEqual({ disabled: true });
  });

  it('is enabled by default', () => {
    render(<Input label="Título do roteiro" />);
    const field = screen.getByLabelText('Título do roteiro');
    expect(field.props.editable).toBe(true);
    expect(field.props.accessibilityState).toEqual({ disabled: false });
  });

  it('notifies typing via onChangeText', () => {
    const onChangeText = jest.fn();
    render(<Input label="Título do roteiro" onChangeText={onChangeText} />);
    fireEvent.changeText(screen.getByLabelText('Título do roteiro'), 'Praia do Rosa');
    expect(onChangeText).toHaveBeenCalledWith('Praia do Rosa');
  });
});
