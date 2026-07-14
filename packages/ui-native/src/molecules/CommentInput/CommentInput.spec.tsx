import { render, screen, fireEvent } from '@testing-library/react-native';
import { CommentInput } from './CommentInput';

describe('CommentInput', () => {
  it('shows the placeholder when empty', async () => {
    await render(<CommentInput />);
    expect(screen.getByText('Escreva um comentário...')).toBeOnTheScreen();
  });

  it('shows the typed value when provided', async () => {
    await render(<CommentInput value="Que viagem incrível!" />);
    expect(screen.getByText('Que viagem incrível!')).toBeOnTheScreen();
  });

  it('fires onSend when the send button is pressed', async () => {
    const onSend = jest.fn();
    await render(<CommentInput onSend={onSend} />);
    await fireEvent.press(screen.getByLabelText('Enviar comentário'));
    expect(onSend).toHaveBeenCalledTimes(1);
  });
});
