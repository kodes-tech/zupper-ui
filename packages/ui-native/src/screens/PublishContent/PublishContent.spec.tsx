import { render, screen, fireEvent } from '@testing-library/react-native';
import { PublishContent } from './PublishContent';
import type { PublishCategory, PublishDay } from './PublishContent';

const categories: PublishCategory[] = [
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'passeios', label: 'Passeios' },
];

const days: PublishDay[] = [
  {
    id: 'dia-1',
    day: 'Dia 1.',
    title: 'Recife Antigo',
    stops: [{ id: 'm', period: 'MANHÃ', title: 'Marco Zero', description: 'Cedo.' }],
  },
];

describe('PublishContent', () => {
  it('renders the photo variant with caption and location fields', async () => {
    await render(
      <PublishContent
        type="foto"
        destination="Recife, PE"
        categories={categories}
        selectedCategoryId="gastronomia"
        media={{ uri: 'media' }}
        canPublish
      />,
    );
    expect(screen.getByText('Publicar uma foto')).toBeOnTheScreen();
    expect(screen.getByText('Selecione a mídia que deseja publicar')).toBeOnTheScreen();
    expect(screen.getByText('Legenda')).toBeOnTheScreen();
    expect(screen.getByText('Localização (opcional)')).toBeOnTheScreen();
  });

  it('fires onSelectCategory with the chip id', async () => {
    const onSelectCategory = jest.fn();
    await render(
      <PublishContent
        type="dica"
        categories={categories}
        onSelectCategory={onSelectCategory}
      />,
    );
    await fireEvent.press(screen.getByText('Passeios'));
    expect(onSelectCategory).toHaveBeenCalledWith('passeios');
  });

  it('shows the disabled publish button on the roteiro variant by default', async () => {
    const onPublish = jest.fn();
    await render(<PublishContent type="roteiro" categories={categories} days={days} onPublish={onPublish} />);
    // Não há botão acionável de publicar quando desabilitado.
    expect(screen.getByText('Publicar roteiro')).toBeOnTheScreen();
    expect(screen.getByText('Dia 1.')).toBeOnTheScreen();
    expect(screen.queryByText('Localização (opcional)')).toBeNull();
  });

  it('enables publishing on the roteiro variant when canPublish is set', async () => {
    const onPublish = jest.fn();
    await render(
      <PublishContent type="roteiro" categories={categories} days={days} canPublish onPublish={onPublish} />,
    );
    await fireEvent.press(screen.getByText('Publicar roteiro'));
    expect(onPublish).toHaveBeenCalledTimes(1);
  });

  it('fires onAddDay from the roteiro variant', async () => {
    const onAddDay = jest.fn();
    await render(<PublishContent type="roteiro" categories={categories} days={days} onAddDay={onAddDay} />);
    await fireEvent.press(screen.getByText('Adicionar novo dia no roteiro'));
    expect(onAddDay).toHaveBeenCalledTimes(1);
  });
});
