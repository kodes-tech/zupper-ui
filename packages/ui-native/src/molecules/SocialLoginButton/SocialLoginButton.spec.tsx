import { render, screen, fireEvent } from '@testing-library/react-native';
import { SocialLoginButton } from './SocialLoginButton';

describe('SocialLoginButton', () => {
  it('renders the Facebook label', async () => {
    await render(<SocialLoginButton provider="facebook" label="Acessar com Facebook" />);
    expect(screen.getByText('Acessar com Facebook')).toBeOnTheScreen();
  });

  it('renders the Google label without a leading icon', async () => {
    await render(<SocialLoginButton provider="google" label="Acessar com Google" />);
    expect(screen.getByText('Acessar com Google')).toBeOnTheScreen();
  });

  it('renders the Apple label', async () => {
    await render(<SocialLoginButton provider="apple" label="Acessar com AppleID" />);
    expect(screen.getByText('Acessar com AppleID')).toBeOnTheScreen();
  });

  it('fires onPress', async () => {
    const onPress = jest.fn();
    await render(<SocialLoginButton provider="facebook" label="Acessar com Facebook" onPress={onPress} />);
    await fireEvent.press(screen.getByText('Acessar com Facebook'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
