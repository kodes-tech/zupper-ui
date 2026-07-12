import { render, screen, fireEvent } from '@testing-library/react-native';
import { CommentInput } from './CommentInput';

describe('CommentInput', () => {
  it('shows the placeholder when empty', () => {
    render(<CommentInput />);
    expect(screen.getByText('Escreva um comentário...')).toBeOnTheScreen();
  });

  it('shows the typed value when provided', () => {
    render(<CommentInput value="Que viagem incrível!" />);
    expect(screen.getByText('Que viagem incrível!')).toBeOnTheScreen();
  });

  it('fires onSend when the send button is pressed', () => {
    const onSend = jest.fn();
    render(<CommentInput onSend={onSend} />);
    fireEvent.press(screen.getByLabelText('Enviar comentário'));
    expect(onSend).toHaveBeenCalledTimes(1);
  });
});
