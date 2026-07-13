import { render, screen, fireEvent } from '@testing-library/react-native';
import { PostActionsSheet } from './PostActionsSheet';

describe('PostActionsSheet', () => {
  it('renders the four actions', () => {
    render(<PostActionsSheet />);
    ['Salvar publicação', 'Não tenho interesse', 'Compartilhar', 'Denunciar'].forEach((label) => {
      expect(screen.getByText(label)).toBeOnTheScreen();
    });
  });

  it('fires onReport when "Denunciar" is pressed', () => {
    const onReport = jest.fn();
    render(<PostActionsSheet onReport={onReport} />);
    fireEvent.press(screen.getByText('Denunciar'));
    expect(onReport).toHaveBeenCalled();
  });
});
