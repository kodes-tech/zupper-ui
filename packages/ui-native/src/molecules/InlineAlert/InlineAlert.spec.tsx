import { render, screen } from '@testing-library/react-native';
import { InlineAlert } from './InlineAlert';

describe('InlineAlert', () => {
  it('renders the message', () => {
    render(<InlineAlert message="Lembre-se que o pagamento deverá ser efetuado em até 3h depois da compra." />);
    expect(
      screen.getByText('Lembre-se que o pagamento deverá ser efetuado em até 3h depois da compra.'),
    ).toBeOnTheScreen();
  });
});
