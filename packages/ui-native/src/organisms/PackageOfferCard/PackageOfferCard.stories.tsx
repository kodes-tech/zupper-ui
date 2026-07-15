import { action } from '@storybook/addon-actions';
import { PackageOfferCard } from './PackageOfferCard';

const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');

export default {
  title: 'Organisms/PackageOfferCard',
  component: PackageOfferCard,
  args: {
    onSeeOffer: action('onSeeOffer'),
  },
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    offer: {
      id: '1',
      image: cardDestino,
      tag: 'Com café da manhã',
      title: 'Pacote exclusivo para Salvador - Bahia',
      originInfo: 'De Rio de Janeiro (01-05 Set)',
      hotelName: 'Salvador Express Praia Hotel',
      priceLabel: 'Preço por pessoa',
      price: 'R$ 155',
    },
  },
};

export const SemFoto = {
  args: {
    offer: {
      id: '2',
      title: 'Pacote exclusivo para Brasília - Feriadão',
      originInfo: 'De São Paulo (01-05 Set)',
      hotelName: 'Mercure Brasília Líder Hotel',
      priceLabel: 'Preço por pessoa',
      price: 'R$ 155',
    },
  },
};
