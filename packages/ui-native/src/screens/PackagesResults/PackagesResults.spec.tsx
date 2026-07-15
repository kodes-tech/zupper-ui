import { render, screen, fireEvent } from '@testing-library/react-native';
import { PackagesResults } from './PackagesResults';
import type { PackageResultCardData } from '../../organisms/PackageResultCard';

const segments = [
  {
    direction: 'ida' as const,
    originCode: 'FLN',
    destinationCode: 'CGH',
    airlineCode: 'G3',
    stopsLabel: '3 paradas',
    departureTime: '11:30',
    arrivalTime: '13:20',
    date: '20 Ago 2024',
  },
  {
    direction: 'volta' as const,
    originCode: 'CGH',
    destinationCode: 'FLN',
    airlineCode: 'G3',
    stopsLabel: 'Direto',
    departureTime: '11:30',
    arrivalTime: '13:20',
    date: '24 Ago 2024',
  },
];

const featured: PackageResultCardData = {
  hotelName: 'Hotel Bourbon São Paulo Convention',
  roomInfo: 'Quarto Basic (2 Adultos)',
  segments,
  priceLabel: 'Preço total do pacote',
  price: 'R$ 255,00',
  primaryCtaLabel: 'Gostei! Quero este pacote',
  secondaryCtaLabel: 'Montar meu pacote',
};

const others: PackageResultCardData[] = [
  { ...featured, primaryCtaLabel: 'Escolher pacote Zupper', secondaryCtaLabel: undefined },
];

describe('PackagesResults', () => {
  it('renders the header and results count', async () => {
    await render(
      <PackagesResults
        routeLabel="FLN - CGH"
        routeDetails="Florianópolis, SC - São Paulo, SP"
        searchSummary="24 de Maio - 26 de Maio - 1 viajante"
        totalResults={10}
        featured={featured}
        others={others}
      />,
    );
    expect(screen.getByText('FLN - CGH')).toBeOnTheScreen();
    expect(screen.getByText('Florianópolis, SC - São Paulo, SP')).toBeOnTheScreen();
    expect(screen.getByText('10 pacotes encontrados')).toBeOnTheScreen();
    expect(screen.getByText('Melhor pacote encontrado')).toBeOnTheScreen();
    expect(screen.getByText('Confira outros pacotes selecionados')).toBeOnTheScreen();
  });

  it('fires sort and selection callbacks', async () => {
    const onChangeSort = jest.fn();
    const onSelectFeatured = jest.fn();
    const onSelectPackage = jest.fn();
    await render(
      <PackagesResults
        routeLabel="FLN - CGH"
        routeDetails="Florianópolis, SC - São Paulo, SP"
        searchSummary="24 de Maio - 26 de Maio - 1 viajante"
        totalResults={10}
        featured={featured}
        others={others}
        onChangeSort={onChangeSort}
        onSelectFeatured={onSelectFeatured}
        onSelectPackage={onSelectPackage}
      />,
    );
    await fireEvent.press(screen.getByText('Recomendados'));
    expect(onChangeSort).toHaveBeenCalledWith('recomendados');
    await fireEvent.press(screen.getByText('Gostei! Quero este pacote'));
    expect(onSelectFeatured).toHaveBeenCalledTimes(1);
    await fireEvent.press(screen.getByText('Escolher pacote Zupper'));
    expect(onSelectPackage).toHaveBeenCalledWith(0);
  });

  it('hides the others section when empty', async () => {
    await render(
      <PackagesResults
        routeLabel="FLN - CGH"
        routeDetails="Florianópolis, SC - São Paulo, SP"
        searchSummary="24 de Maio - 26 de Maio - 1 viajante"
        totalResults={1}
        featured={featured}
        others={[]}
      />,
    );
    expect(screen.queryByText('Confira outros pacotes selecionados')).toBeNull();
  });
});
