import { render } from '@testing-library/react-native';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a 1px line', async () => {
    const { toJSON } = await render(<Divider />);
    expect(toJSON()).toBeTruthy();
  });

  it('forwards testID', async () => {
    const { getByTestId } = await render(<Divider testID="my-divider" />);
    expect(getByTestId('my-divider')).toBeTruthy();
  });
});
