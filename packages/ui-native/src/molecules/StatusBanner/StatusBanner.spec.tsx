import { render, screen, fireEvent } from '@testing-library/react-native';
import { StatusBanner } from './StatusBanner';

describe('StatusBanner', () => {
  it('renders the title and the description', async () => {
    await render(<StatusBanner tone="warning" title="Publicação em análise" description="Avaliando." />);
    expect(screen.getByText('Publicação em análise')).toBeOnTheScreen();
    expect(screen.getByText('Avaliando.')).toBeOnTheScreen();
  });

  it('fires onPressAction when the CTA is pressed', async () => {
    const onPressAction = jest.fn();
    await render(
      <StatusBanner
        tone="danger"
        title="Publicação removida"
        description="Violou as diretrizes."
        actionLabel="Contestar decisão"
        onPressAction={onPressAction}
      />,
    );
    await fireEvent.press(screen.getByText('Contestar decisão'));
    expect(onPressAction).toHaveBeenCalled();
  });

  it('omits the CTA when there is no actionLabel', async () => {
    await render(<StatusBanner tone="warning" title="Em análise" description="Avaliando." />);
    expect(screen.queryByRole('button')).toBeNull();
  });
});
