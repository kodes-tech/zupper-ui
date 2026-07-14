import { render, screen, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { HotelModalSheet } from './HotelModalSheet';

describe('HotelModalSheet', () => {
  it('renders the title and children', () => {
    render(
      <HotelModalSheet title="Busca de cidades">
        <Text>Conteúdo</Text>
      </HotelModalSheet>,
    );
    expect(screen.getByText('Busca de cidades')).toBeOnTheScreen();
    expect(screen.getByText('Conteúdo')).toBeOnTheScreen();
  });

  it('fires onClose from the close button', () => {
    const onClose = jest.fn();
    render(
      <HotelModalSheet title="Busca de cidades" onClose={onClose}>
        <Text>Conteúdo</Text>
      </HotelModalSheet>,
    );
    fireEvent.press(screen.getAllByRole('button', { name: 'Fechar' })[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders the optional footer', () => {
    render(
      <HotelModalSheet title="Título" footer={<Text>Rodapé</Text>}>
        <Text>Conteúdo</Text>
      </HotelModalSheet>,
    );
    expect(screen.getByText('Rodapé')).toBeOnTheScreen();
  });
});
