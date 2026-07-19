import { fireEvent, render, screen } from '@testing-library/react-native';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders the label and placeholder as a multiline field', async () => {
    await render(<Textarea label="Sua dica" placeholder="Escreva sua dica..." />);
    expect(screen.getByText('Sua dica')).toBeOnTheScreen();
    const field = screen.getByPlaceholderText('Escreva sua dica...');
    expect(field.props.multiline).toBe(true);
  });

  it('shows the error message when error is set', async () => {
    await render(<Textarea label="Sua dica" error="A dica é obrigatória" />);
    expect(screen.getByText('A dica é obrigatória')).toBeOnTheScreen();
  });

  it('notifies typing via onChangeText', async () => {
    const onChangeText = jest.fn();
    await render(<Textarea label="Sua dica" onChangeText={onChangeText} />);
    await fireEvent.changeText(screen.getByLabelText('Sua dica'), 'Visite o Marco Zero');
    expect(onChangeText).toHaveBeenCalledWith('Visite o Marco Zero');
  });

  it('supports the disabled state via editable={false}', async () => {
    await render(<Textarea label="Sua dica" editable={false} />);
    const field = screen.getByLabelText('Sua dica');
    expect(field.props.editable).toBe(false);
  });
});
