import { fireEvent, render, screen } from '@testing-library/react-native';
import { colors } from '@kodes-tech/tokens';
import { Input } from './Input';

describe('Input', () => {
  it('renders the label and the placeholder', async () => {
    await render(<Input label="Título do roteiro" placeholder="Digite o título da sua dica" />);
    expect(screen.getByText('Título do roteiro')).toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Digite o título da sua dica')).toBeOnTheScreen();
  });

  it('renders without a label', async () => {
    await render(<Input placeholder="Digite o título da sua dica" />);
    expect(screen.queryByText('Título do roteiro')).not.toBeOnTheScreen();
    expect(screen.getByPlaceholderText('Digite o título da sua dica')).toBeOnTheScreen();
  });

  it('shows the error message when error is set', async () => {
    await render(<Input label="Título do roteiro" error="O título é obrigatório" />);
    expect(screen.getByText('O título é obrigatório')).toBeOnTheScreen();
  });

  it('does not show an error message by default', async () => {
    await render(<Input label="Título do roteiro" />);
    expect(screen.queryByText('O título é obrigatório')).not.toBeOnTheScreen();
  });

  it('uses the selection token as selectionColor', async () => {
    await render(<Input placeholder="Digite o título da sua dica" />);
    const field = screen.getByPlaceholderText('Digite o título da sua dica');
    expect(field.props.selectionColor).toBe(colors.surface.selection);
  });

  it('supports the disabled state via the disabled prop', async () => {
    await render(<Input label="Título do roteiro" disabled />);
    const field = screen.getByLabelText('Título do roteiro');
    expect(field.props.editable).toBe(false);
    expect(field.props.accessibilityState).toEqual({ disabled: true });
  });

  it('is enabled by default', async () => {
    await render(<Input label="Título do roteiro" />);
    const field = screen.getByLabelText('Título do roteiro');
    expect(field.props.editable).toBe(true);
    expect(field.props.accessibilityState).toEqual({ disabled: false });
  });

  it('notifies typing via onChangeText', async () => {
    const onChangeText = jest.fn();
    await render(<Input label="Título do roteiro" onChangeText={onChangeText} />);
    await fireEvent.changeText(screen.getByLabelText('Título do roteiro'), 'Praia do Rosa');
    expect(onChangeText).toHaveBeenCalledWith('Praia do Rosa');
  });

  it('maps the semantic type to the native keyboard/capitalization', async () => {
    await render(<Input label="E-mail" type="email" />);
    const field = screen.getByLabelText('E-mail');
    expect(field.props.keyboardType).toBe('email-address');
    expect(field.props.autoCapitalize).toBe('none');
  });

  it('hides the value via type="password"', async () => {
    await render(<Input label="Senha" type="password" />);
    expect(screen.getByLabelText('Senha').props.secureTextEntry).toBe(true);
  });
});
