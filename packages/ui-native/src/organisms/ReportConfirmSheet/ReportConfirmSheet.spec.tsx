import { render, screen, fireEvent } from '@testing-library/react-native';
import { ReportConfirmSheet } from './ReportConfirmSheet';

describe('ReportConfirmSheet', () => {
  it('renders the title and actions', async () => {
    await render(<ReportConfirmSheet />);
    expect(screen.getByText('Mais opções')).toBeOnTheScreen();
    expect(screen.getByText('Denunciar publicação')).toBeOnTheScreen();
    expect(screen.getByText('Cancelar')).toBeOnTheScreen();
  });

  it('fires onReport', async () => {
    const onReport = jest.fn();
    await render(<ReportConfirmSheet onReport={onReport} />);
    await fireEvent.press(screen.getByText('Denunciar publicação'));
    expect(onReport).toHaveBeenCalled();
  });

  it('fires onCancel', async () => {
    const onCancel = jest.fn();
    await render(<ReportConfirmSheet onCancel={onCancel} />);
    await fireEvent.press(screen.getByText('Cancelar'));
    expect(onCancel).toHaveBeenCalled();
  });
});
