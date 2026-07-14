import { render, screen, fireEvent } from '@testing-library/react-native';
import { PostActionsSheet } from './PostActionsSheet';

describe('PostActionsSheet', () => {
  it('renders the four actions', async () => {
    await render(<PostActionsSheet />);
    ['Salvar publicação', 'Não tenho interesse', 'Compartilhar', 'Denunciar'].forEach((label) => {
      expect(screen.getByText(label)).toBeOnTheScreen();
    });
  });

  it('fires onReport when "Denunciar" is pressed', async () => {
    const onReport = jest.fn();
    await render(<PostActionsSheet onReport={onReport} />);
    await fireEvent.press(screen.getByText('Denunciar'));
    expect(onReport).toHaveBeenCalled();
  });
});
