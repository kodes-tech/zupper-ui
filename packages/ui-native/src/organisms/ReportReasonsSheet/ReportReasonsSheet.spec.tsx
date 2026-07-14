import { render, screen, fireEvent } from '@testing-library/react-native';
import { ReportReasonsSheet } from './ReportReasonsSheet';

const reasons = [
  { id: 'spam', label: 'Spam ou propaganda enganosa' },
  { id: 'golpe', label: 'Golpe ou fraude' },
];

describe('ReportReasonsSheet', () => {
  it('renders the sheet title and every reason', async () => {
    await render(<ReportReasonsSheet reasons={reasons} />);
    expect(screen.getByText('Por que você está denunciando?')).toBeOnTheScreen();
    expect(screen.getByText('Spam ou propaganda enganosa')).toBeOnTheScreen();
    expect(screen.getByText('Golpe ou fraude')).toBeOnTheScreen();
  });

  it('fires onSelectReason with the reason id', async () => {
    const onSelectReason = jest.fn();
    await render(<ReportReasonsSheet reasons={reasons} onSelectReason={onSelectReason} />);
    await fireEvent.press(screen.getByText('Golpe ou fraude'));
    expect(onSelectReason).toHaveBeenCalledWith('golpe');
  });
});
