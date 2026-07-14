import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PublishContent } from './PublishContent';
import type { PublishCategory, PublishDay } from './PublishContent';

const media = require('../../_figma/assets/photos/publicar-foto-praia.jpg');

const categories: PublishCategory[] = [
  { id: 'gastronomia', label: 'Gastronomia' },
  { id: 'passeios', label: 'Passeios' },
  { id: 'hospedagem', label: 'Hospedagem' },
  { id: 'transporte', label: 'Transporte' },
  { id: 'compras', label: 'Compras' },
];

const days: PublishDay[] = [
  {
    id: 'dia-1',
    day: 'Dia 1.',
    title: 'Recife Antigo',
    stops: [
      {
        id: 'manha',
        period: 'MANHÃ',
        title: 'Marco Zero e Rua do Bom Jesus',
        description: 'Comece cedo, tem sombra e é plano pra carrinho.',
      },
      {
        id: 'tarde',
        period: 'TARDE',
        title: 'Embaixada dos Bonecos Gigantes',
        description: 'As crianças amam. Ingresso barato.',
      },
      {
        id: 'noite',
        period: 'NOITE',
        title: 'Jantar na Rua da Moeda',
        description: 'Opções pra todos os gostos.',
      },
    ],
  },
];

export default {
  title: 'Screens/PublishContent',
  component: PublishContent,
  args: {
    destination: 'Recife, PE',
    categories,
    onBack: action('onBack'),
    onSelectDestination: action('onSelectDestination'),
    onChangeMedia: action('onChangeMedia'),
    onPickGallery: action('onPickGallery'),
    onPickCamera: action('onPickCamera'),
    onChangeCaption: action('onChangeCaption'),
    onChangeTitle: action('onChangeTitle'),
    onChangeTip: action('onChangeTip'),
    onChangeSummary: action('onChangeSummary'),
    onChangeLocation: action('onChangeLocation'),
    onSelectCategory: action('onSelectCategory'),
    onEditDay: action('onEditDay'),
    onAddDay: action('onAddDay'),
    onPublish: action('onPublish'),
    onNavigate: action('onNavigate'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const Foto = {
  args: {
    type: 'foto',
    media,
    caption: 'Curtindo o sol radiante e a vibe incrível da praia de Recife!',
    selectedCategoryId: 'gastronomia',
    location: 'Praia de Boa Viagem - Recife, PE',
    canPublish: true,
  },
};

/** Foto — estado vazio: sem mídia selecionada, mostra o picker Galeria / Tirar Foto. */
export const FotoVazio = {
  args: {
    type: 'foto',
    destination: undefined,
    canPublish: false,
  },
};

export const Dica = {
  args: {
    type: 'dica',
    contentTitle: 'Explorando os encantos do Recife Antigo',
    selectedCategoryId: 'passeios',
    tipText:
      'O centro histórico de Recife, conhecido como Recife Antigo, vale um dia inteirinho de visita. A região é cheia de atrações históricas e culturais, todas próximas umas das outras e tudo pode ser percorrido a pé.',
    location: 'Centro Histórico de Recife',
    canPublish: true,
  },
};

export const Roteiro = {
  args: {
    type: 'roteiro',
    contentTitle: 'Explorando os encantos do Recife Antigo',
    selectedCategoryId: 'gastronomia',
    summary:
      'Descubra Recife em 7 dias explorando seu centro histórico vibrante e suas praias deslumbrantes.',
    days,
    canPublish: false,
  },
};

const periods = [
  { id: 'manha', label: 'Manhã' },
  { id: 'tarde', label: 'Tarde' },
  { id: 'noite', label: 'Noite' },
];

/** Roteiro — wizard "adicionar dia": abre o formulário de edição do Dia 1 (vazio). */
export const RoteiroAdicionarDia = {
  args: {
    type: 'roteiro',
    contentTitle: 'Explorando os encantos do Recife Antigo',
    selectedCategoryId: 'gastronomia',
    summary:
      'Descubra Recife em 7 dias explorando seu centro histórico vibrante e suas praias deslumbrantes.',
    days: [],
    editingDay: {
      day: 'Dia 1',
      periods,
      selectedPeriodId: 'manha',
      canGoNext: false,
      onChangeTitle: action('onChangeTitle'),
      onSelectPeriod: action('onSelectPeriod'),
      onChangeLocal: action('onChangeLocal'),
      onChangeTip: action('onChangeTip'),
      onPrev: action('onPrev'),
      onNext: action('onNext'),
    },
  },
};
