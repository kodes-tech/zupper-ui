import { fireEvent, render, screen } from '@testing-library/react-native';
import { FloatButton } from './FloatButton';

describe('FloatButton', () => {
  it('renders collapsed with the Publicar button', () => {
    render(<FloatButton />);
    expect(screen.getByText('Publicar')).toBeOnTheScreen();
    expect(screen.queryByText('Dica')).not.toBeOnTheScreen();
  });

  it('expands to show the actions when Publicar is pressed', () => {
    render(<FloatButton />);
    fireEvent.press(screen.getByTestId('float-button-publish'));
    expect(screen.getByText('Dica')).toBeOnTheScreen();
    expect(screen.getByText('Foto')).toBeOnTheScreen();
    expect(screen.getByText('Roteiro')).toBeOnTheScreen();
  });

  it('calls onSelectDica/onSelectFoto/onSelectRoteiro when an action is pressed', () => {
    const onSelectDica = jest.fn();
    const onSelectFoto = jest.fn();
    const onSelectRoteiro = jest.fn();
    render(
      <FloatButton
        onSelectDica={onSelectDica}
        onSelectFoto={onSelectFoto}
        onSelectRoteiro={onSelectRoteiro}
      />,
    );
    fireEvent.press(screen.getByTestId('float-button-publish'));
    fireEvent.press(screen.getByText('Dica'));
    fireEvent.press(screen.getByText('Foto'));
    fireEvent.press(screen.getByText('Roteiro'));
    expect(onSelectDica).toHaveBeenCalledTimes(1);
    expect(onSelectFoto).toHaveBeenCalledTimes(1);
    expect(onSelectRoteiro).toHaveBeenCalledTimes(1);
  });

  it('collapses back when the close button is pressed', () => {
    render(<FloatButton />);
    fireEvent.press(screen.getByTestId('float-button-publish'));
    expect(screen.getByText('Dica')).toBeOnTheScreen();
    fireEvent.press(screen.getByTestId('float-button-close'));
    expect(screen.queryByText('Dica')).not.toBeOnTheScreen();
    expect(screen.getByText('Publicar')).toBeOnTheScreen();
  });
});
