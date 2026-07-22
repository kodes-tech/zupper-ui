import { fireEvent, render, screen } from '@testing-library/react-native';
import { SocialLoginButton } from './SocialLoginButton';

describe('SocialLoginButton', () => {
  it('renders the label and fires onPress', async () => {
    const onPress = jest.fn();
    await render(
      <SocialLoginButton provider="facebook" label="Acessar com Facebook" onPress={onPress} />,
    );
    expect(screen.getByText('Acessar com Facebook')).toBeOnTheScreen();
    await fireEvent.press(screen.getByLabelText('Acessar com Facebook'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', async () => {
    const onPress = jest.fn();
    await render(
      <SocialLoginButton
        provider="google"
        label="Acessar com Google"
        onPress={onPress}
        disabled
      />,
    );
    await fireEvent.press(screen.getByLabelText('Acessar com Google'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
