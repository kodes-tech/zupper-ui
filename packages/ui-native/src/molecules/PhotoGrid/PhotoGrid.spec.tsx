import { render, screen, fireEvent } from '@testing-library/react-native';
import { PhotoGrid } from './PhotoGrid';

describe('PhotoGrid', () => {
  const photos = [{ uri: 'a' }, { uri: 'b' }, { uri: 'c' }];

  it('renders one pressable per photo', () => {
    render(<PhotoGrid photos={photos} />);
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  it('fires onPressPhoto with the index', () => {
    const onPressPhoto = jest.fn();
    render(<PhotoGrid photos={photos} onPressPhoto={onPressPhoto} />);
    fireEvent.press(screen.getAllByRole('button')[1]);
    expect(onPressPhoto).toHaveBeenCalledWith(1);
  });
});
