import { render, screen, fireEvent } from '@testing-library/react-native';
import { BlockedAccountRow } from './BlockedAccountRow';

const avatar = { uri: 'https://example.com/avatar.png' };

describe('BlockedAccountRow', () => {
  it('renders the name and handle', async () => {
    await render(<BlockedAccountRow name="Carlos Souza" handle="@carlosviaja" avatar={avatar} />);
    expect(screen.getByText('Carlos Souza')).toBeOnTheScreen();
    expect(screen.getByText('@carlosviaja')).toBeOnTheScreen();
  });

  it('defaults to the unblock action', async () => {
    await render(<BlockedAccountRow name="Carlos Souza" handle="@carlosviaja" avatar={avatar} />);
    expect(screen.getByLabelText('Desbloquear Carlos Souza')).toBeOnTheScreen();
  });

  it('fires onPress for the block action', async () => {
    const onPress = jest.fn();
    await render(
      <BlockedAccountRow
        name="Carlos Souza"
        handle="@carlosviaja"
        avatar={avatar}
        action="block"
        onPress={onPress}
      />,
    );
    await fireEvent.press(screen.getByLabelText('Bloquear Carlos Souza'));
    expect(onPress).toHaveBeenCalled();
  });
});
