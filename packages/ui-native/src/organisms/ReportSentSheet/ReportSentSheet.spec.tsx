import { render, screen, fireEvent } from '@testing-library/react-native';
import { ReportSentSheet } from './ReportSentSheet';

describe('ReportSentSheet', () => {
  it('renders the confirmation and both actions', async () => {
    await render(<ReportSentSheet />);
    expect(screen.getByText('Denunciar publicação')).toBeOnTheScreen();
    expect(screen.getByText('Concluir')).toBeOnTheScreen();
    expect(screen.getByText('Bloquear este autor')).toBeOnTheScreen();
  });

  it('fires onDone and onBlockAuthor', async () => {
    const onDone = jest.fn();
    const onBlockAuthor = jest.fn();
    await render(<ReportSentSheet onDone={onDone} onBlockAuthor={onBlockAuthor} />);
    await fireEvent.press(screen.getByText('Concluir'));
    await fireEvent.press(screen.getByText('Bloquear este autor'));
    expect(onDone).toHaveBeenCalled();
    expect(onBlockAuthor).toHaveBeenCalled();
  });
});
