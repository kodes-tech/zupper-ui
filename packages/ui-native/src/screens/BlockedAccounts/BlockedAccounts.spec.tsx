import { render, screen, fireEvent } from '@testing-library/react-native';
import { BlockedAccounts } from './BlockedAccounts';

const avatar = { uri: 'https://example.com/avatar.png' };
const accounts = [
  { id: '1', name: 'Carlos Souza', handle: '@carlosviaja', avatar },
  { id: '2', name: 'Ana Silva', handle: '@anasilvatrip', avatar, action: 'block' as const },
];

describe('BlockedAccounts', () => {
  it('renders the header and every account', async () => {
    await render(<BlockedAccounts accounts={accounts} />);
    expect(screen.getByText('Contas bloqueadas')).toBeOnTheScreen();
    expect(screen.getByText('Carlos Souza')).toBeOnTheScreen();
    expect(screen.getByText('Ana Silva')).toBeOnTheScreen();
  });

  it('fires onPressAccount with the account id', async () => {
    const onPressAccount = jest.fn();
    await render(<BlockedAccounts accounts={accounts} onPressAccount={onPressAccount} />);
    await fireEvent.press(screen.getByLabelText('Desbloquear Carlos Souza'));
    expect(onPressAccount).toHaveBeenCalledWith('1');
  });

  it('fires onBack', async () => {
    const onBack = jest.fn();
    await render(<BlockedAccounts accounts={accounts} onBack={onBack} />);
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalled();
  });

  it('renders with no accounts', async () => {
    await render(<BlockedAccounts accounts={[]} />);
    expect(screen.getByText('Contas bloqueadas')).toBeOnTheScreen();
  });
});
