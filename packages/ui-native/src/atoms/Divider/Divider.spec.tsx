import { render } from '@testing-library/react-native';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a 1px line', () => {
    const { toJSON } = render(<Divider />);
    expect(toJSON()).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(<Divider testID="my-divider" />);
    expect(getByTestId('my-divider')).toBeTruthy();
  });
});
