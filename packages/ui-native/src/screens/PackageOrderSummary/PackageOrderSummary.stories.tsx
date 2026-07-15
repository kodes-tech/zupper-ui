import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PackageOrderSummary } from './PackageOrderSummary';

const cardDestino = require('../../_figma/assets/photos/card-destino.jpg');

const idaItinerary = {
  direction: 'ida' as const,
  headerDate: 'Qua, 24 de maio 2024',
  airline: 'Gol airlines',
  airlineCode: 'G3',
  airlineIcon: 'airline-gol',
  operatedBy: 'Latam Airlines',
  flightNumber: 'LA522',
  travelClass: 'Econômica',
  aircraft: 'Boeing 747',
  departureTime: '11:30',
  departureCity: 'Florianópolis, SC',
  departureDate: 'Qua, 24 maio',
  arrivalTime: '12:55',
  arrivalCity: 'Congonhas, SP',
  arrivalDate: 'Qua, 24 maio',
  stopsLabel: 'Direto',
  duration: '1h50',
  originCode: 'FLN',
  originAirport: 'Aeroporto Internacional Hercílio Luz',
  destinationCode: 'CGH',
  destinationAirport: 'Aeroporto Internacional de Congonhas',
};

const voltaItinerary = {
  ...idaItinerary,
  direction: 'volta' as const,
  headerDate: 'Dom, 28 de maio 2024',
  departureCity: 'Congonhas, SP',
  arrivalCity: 'Florianópolis, SC',
  originCode: 'CGH',
  originAirport: 'Aeroporto Internacional de Congonhas',
  destinationCode: 'FLN',
  destinationAirport: 'Aeroporto Internacional Hercílio Luz',
};

const baggage = [
  {
    icon: 'baggage-backpack',
    label: 'Inclui uma mochila ou bolsa',
    description: 'Tamanho limitado a caber abaixo do assento dianteiro.',
    included: true,
  },
  {
    icon: 'baggage-carry-on',
    label: 'Inclui bagagem de mão',
    description: 'Tamanho limitado a caber no compartimento superior do avião. Até 10kg.',
    included: true,
  },
  {
    icon: 'baggage-checked',
    label: 'Não inclui bagagem para despachar',
    description: 'É possível incluir bagagem despachada alterando a opção de tarifa.',
    included: false,
  },
];

export default {
  title: 'Screens/PackageOrderSummary',
  component: PackageOrderSummary,
  args: {
    purchase: {
      items: [
        { label: 'Tarifa por adulto', value: 'R$ 654,51' },
        { label: '1 Adulto', value: 'R$ 654,51' },
        { label: 'Taxas e impostos', value: 'R$ 39,00' },
        { label: 'Pagar direto na hospedagem', value: 'R$ 514,00' },
      ],
      total: 'R$ 1.255,12',
    },
    travelers: [
      { role: 'Adulto 1 (Quarto 1)', details: 'Maria Joaquina Silva, 30/11/1991' },
      { role: 'Adulto 2 (Quarto 2)', details: 'Maria Joaquina Silva, 30/11/1991' },
      { role: 'Criança (Quarto 1)', details: 'Maria Joaquina Silva, 30/11/1991' },
    ],
    hotel: {
      name: 'Bourbon São Paulo Ibirapuera Convention Hotel',
      image: cardDestino,
      starRating: 3,
      address: 'Av. Ibirapuera, 2927 - Ibirapuera - São Paulo',
      distance: '5km do Centro',
      benefits: [
        { icon: 'hotel-circle-check', text: 'Cancelamento grátis', tone: 'success' },
        { icon: 'amenity-coffee', text: 'Café da manhã grátis', tone: 'success' },
      ],
      amenities: [
        { label: 'Conectividade', icon: 'amenity-wifi' },
        { label: 'Alimentação', icon: 'amenity-restaurant' },
        { label: 'Lazer', icon: 'amenity-pool' },
        { label: 'Bem-estar', icon: 'amenity-gym' },
        { label: 'Conforto', icon: 'amenity-ac' },
        { label: 'Serviços', icon: 'amenity-laundry' },
      ],
      checkIn: 'Qua, 28 Dez 2024 - 00h00',
      checkOut: 'Qua, 02 Jan 2024 - 00h00',
      guestsSummary: '1 quarto, 2 adultos',
    },
    rooms: [
      {
        title: 'Quarto 1',
        image: cardDestino,
        cancellation: 'Cancelamento grátis até 00/00/0000',
        amenities: ['Tamanho 41m²', 'Televisão', 'Wi-Fi Grátis', 'Secador de cabelo'],
      },
      {
        title: 'Quarto 2',
        image: cardDestino,
        cancellation: 'Cancelamento grátis até 00/00/0000',
        amenities: ['Tamanho 41m²', 'Televisão', 'Wi-Fi Grátis', 'Secador de cabelo'],
      },
    ],
    flights: [
      {
        itinerary: idaItinerary,
        baggage,
        disclaimer:
          'O Zupper se preocupa com a transparência e, cumprindo a Resolução ANAC 218, disponibiliza os relatórios da ANAC sobre cancelamentos de voos no Brasil.',
      },
      { itinerary: voltaItinerary, baggage },
    ],
    footer: {
      roomInfo: 'Quarto Basic (2 Adultos)',
      priceLabel: 'Pacote - 2 adultos (3 dias)',
      price: 'R$ 2.550',
      expanded: false,
    },
    onBack: action('onBack'),
    onSeeDescription: action('onSeeDescription'),
    onSeeAllAmenities: action('onSeeAllAmenities'),
    onSeeRoomAmenities: action('onSeeRoomAmenities'),
    onPressRelevantInfo: action('onPressRelevantInfo'),
    onPressPolicies: action('onPressPolicies'),
    onToggleFooter: action('onToggleFooter'),
    onEditPackage: action('onEditPackage'),
    onContinue: action('onContinue'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{ width: 390, height: 844, borderRadius: 24, overflow: 'hidden', borderWidth: 8, borderColor: '#1a1a1a' }}
      >
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
