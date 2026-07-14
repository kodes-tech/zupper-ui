import { render, screen, fireEvent } from '@testing-library/react-native';
import { ReportSentSheet } from './ReportSentSheet';

describe('ReportSentSheet', () => {
  it('renders the confirmation and both actions', () => {
    render(<ReportSentSheet />);
    expect(screen.getByText('Denúncia enviada')).toBeOnTheScreen();
    expect(screen.getByText('Concluir')).toBeOnTheScreen();
    expect(screen.getByText('Bloquear este autor')).toBeOnTheScreen();
  });

  it('fires onDone and onBlockAuthor', () => {
    const onDone = jest.fn();
    const onBlockAuthor = jest.fn();
    render(<ReportSentSheet onDone={onDone} onBlockAuthor={onBlockAuthor} />);
    fireEvent.press(screen.getByText('Concluir'));
    fireEvent.press(screen.getByText('Bloquear este autor'));
    expect(onDone).toHaveBeenCalled();
    expect(onBlockAuthor).toHaveBeenCalled();
  });
});
