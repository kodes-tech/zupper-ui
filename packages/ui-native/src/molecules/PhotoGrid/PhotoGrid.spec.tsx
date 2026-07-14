import { render, screen, fireEvent } from '@testing-library/react-native';
import { PhotoGrid } from './PhotoGrid';

describe('PhotoGrid', () => {
  const photos = [{ uri: 'a' }, { uri: 'b' }, { uri: 'c' }];

  it('renders one pressable per photo', async () => {
    await render(<PhotoGrid photos={photos} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('fires onPressPhoto with the index', async () => {
    const onPressPhoto = jest.fn();
    await render(<PhotoGrid photos={photos} onPressPhoto={onPressPhoto} />);
    await fireEvent.press(screen.getAllByRole('button')[1]);
    expect(onPressPhoto).toHaveBeenCalledWith(1);
  });
});
