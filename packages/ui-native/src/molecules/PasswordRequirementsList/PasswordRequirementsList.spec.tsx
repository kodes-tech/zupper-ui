import { render, screen } from '@testing-library/react-native';
import { PasswordRequirementsList } from './PasswordRequirementsList';

describe('PasswordRequirementsList', () => {
  it('renders every requirement label', async () => {
    await render(
      <PasswordRequirementsList
        requirements={[
          { label: 'Letra maiúscula', met: true },
          { label: '8 caracteres', met: false },
        ]}
      />,
    );
    expect(screen.getByText('Letra maiúscula')).toBeOnTheScreen();
    expect(screen.getByText('8 caracteres')).toBeOnTheScreen();
  });
});
