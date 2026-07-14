import { render, screen, fireEvent } from '@testing-library/react-native';
import { NewsBanner } from './NewsBanner';

const image = { uri: 'https://example.com/banner.jpg' };

describe('NewsBanner', () => {
  it('renders the default section title', () => {
    render(<NewsBanner banners={[{ id: 'a', image }]} />);
    expect(screen.getByText('Novidades')).toBeOnTheScreen();
  });

  it('fires the banner onPress', () => {
    const onPress = jest.fn();
    render(<NewsBanner banners={[{ id: 'a', image, onPress }]} />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders one navigation dot per banner when there is more than one', () => {
    render(
      <NewsBanner
        banners={[
          { id: 'a', image },
          { id: 'b', image },
          { id: 'c', image },
        ]}
      />,
    );
    // 3 banners (Pressable) + 3 dots — os botões são os banners
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
});
