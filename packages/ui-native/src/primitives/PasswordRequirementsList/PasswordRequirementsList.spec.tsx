import { render, screen } from '@testing-library/react-native';
import { PasswordRequirementsList } from './PasswordRequirementsList';

describe('PasswordRequirementsList', () => {
  const requirements = [
    { label: 'Letra maiúscula', met: true },
    { label: '8 caracteres', met: false },
  ];

  it('renders every requirement label', async () => {
    await render(<PasswordRequirementsList requirements={requirements} />);
    expect(screen.getByText('Letra maiúscula')).toBeOnTheScreen();
    expect(screen.getByText('8 caracteres')).toBeOnTheScreen();
  });

  it('renders an empty list without crashing', async () => {
    await render(<PasswordRequirementsList requirements={[]} />);
    expect(screen.queryByText('Letra maiúscula')).not.toBeOnTheScreen();
  });
});
