import { render, screen, fireEvent } from '@testing-library/react-native';
import { ContentDetail } from './ContentDetail';
import type { ContentOffer } from './ContentDetail';

const author = {
  name: 'Carlos Souza',
  handle: '@carlosviaja',
  avatar: { uri: 'avatar' },
  role: 'traveler' as const,
};

const offers: ContentOffer[] = [
  {
    id: 'passagens',
    title: 'Passagens aéreas',
    icon: 'oferta-passagens',
    priceLabel: 'Voos a partir',
    price: 'R$ 1.086',
    dateRange: 'Jul 12 – Jul 19',
    ctaLabel: 'Ver passagens',
  },
];

describe('ContentDetail', () => {
  it('renders the photo variant with the author and social bar', () => {
    render(
      <ContentDetail
        type="foto"
        title="Foto"
        author={{ ...author, location: 'Fernando de Noronha' }}
        photo={{ uri: 'photo' }}
        likes={0}
        commentCount={0}
        comments={[]}
      />,
    );
    expect(screen.getByText('Carlos Souza')).toBeOnTheScreen();
    expect(screen.getByText('Fernando de Noronha')).toBeOnTheScreen();
    expect(screen.getByText('Comentários (0)')).toBeOnTheScreen();
  });

  it('renders roteiro days, metadata and offers', () => {
    const onPressOffer = jest.fn();
    render(
      <ContentDetail
        type="roteiro"
        title="Roteiro"
        author={author}
        contentTitle="3 dias em Recife com crianças"
        metadata={['3 dias', '8 paradas', 'Família']}
        days={[
          {
            day: 'Dia 1.',
            title: 'Recife Antigo',
            stops: [{ id: 'm', period: 'MANHÃ', title: 'Marco Zero', description: 'Cedo.' }],
          },
        ]}
        offersTitle="Gostou do roteiro? Aproveite as ofertas"
        offers={offers}
        likes={0}
        commentCount={0}
        onPressOffer={onPressOffer}
      />,
    );
    expect(screen.getByText('3 dias em Recife com crianças')).toBeOnTheScreen();
    expect(screen.getByText('8 paradas')).toBeOnTheScreen();
    expect(screen.getByText('Dia 1.')).toBeOnTheScreen();
    fireEvent.press(screen.getByText('Ver passagens'));
    expect(onPressOffer).toHaveBeenCalledWith('passagens');
  });

  it('does not render the roteiro body on the photo variant', () => {
    render(
      <ContentDetail
        type="foto"
        title="Foto"
        author={author}
        photo={{ uri: 'photo' }}
        offersTitle="Gostou do roteiro?"
        offers={offers}
        likes={0}
        commentCount={0}
      />,
    );
    expect(screen.queryByText('Ver passagens')).toBeNull();
  });
});
