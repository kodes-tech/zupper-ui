import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { TravelPreferencesStep } from './TravelPreferencesStep';
import type { TravelPreferenceOption } from './TravelPreferencesStep';

const tileEconomica = require('../../_figma/assets/photos/preferencias-viagem/tile-economica.jpg');
const tileExecutiva = require('../../_figma/assets/photos/preferencias-viagem/tile-executiva.jpg');
const tileTrem = require('../../_figma/assets/photos/preferencias-viagem/tile-trem.jpg');
const tileCruzeiro = require('../../_figma/assets/photos/preferencias-viagem/tile-cruzeiro.jpg');
const tileCarro = require('../../_figma/assets/photos/preferencias-viagem/tile-carro.jpg');

const tilePraia = require('../../_figma/assets/photos/preferencias-viagem/tile-praia.jpg');
const tileCidade = require('../../_figma/assets/photos/preferencias-viagem/tile-cidade.jpg');
const tileMontanhas = require('../../_figma/assets/photos/preferencias-viagem/tile-montanhas.jpg');
const tileCultura = require('../../_figma/assets/photos/preferencias-viagem/tile-cultura.jpg');
const tileReligiao = require('../../_figma/assets/photos/preferencias-viagem/tile-religiao.jpg');
const tileAventura = require('../../_figma/assets/photos/preferencias-viagem/tile-aventura.jpg');

const tileHotel = require('../../_figma/assets/photos/preferencias-viagem/tile-hotel.jpg');
const tileResort = require('../../_figma/assets/photos/preferencias-viagem/tile-resort.jpg');
const tilePousada = require('../../_figma/assets/photos/preferencias-viagem/tile-pousada.jpg');
const tileHotelSpa = require('../../_figma/assets/photos/preferencias-viagem/tile-hotel-spa.jpg');
const tileAirbnb = require('../../_figma/assets/photos/preferencias-viagem/tile-airbnb.jpg');
const tileHostel = require('../../_figma/assets/photos/preferencias-viagem/tile-hostel.jpg');

const tileClassico = require('../../_figma/assets/photos/preferencias-viagem/tile-classico.jpg');
const tileBoutique = require('../../_figma/assets/photos/preferencias-viagem/tile-boutique.jpg');
const tileHistorico = require('../../_figma/assets/photos/preferencias-viagem/tile-historico.jpg');
const tileBudget = require('../../_figma/assets/photos/preferencias-viagem/tile-budget.jpg');
const tileComVista = require('../../_figma/assets/photos/preferencias-viagem/tile-com-vista.jpg');
const tileMaisEspaco = require('../../_figma/assets/photos/preferencias-viagem/tile-mais-espaco.jpg');
const tileVilas = require('../../_figma/assets/photos/preferencias-viagem/tile-vilas.jpg');

const tileSozinho = require('../../_figma/assets/photos/preferencias-viagem/tile-sozinho.jpg');
const tileFamilia = require('../../_figma/assets/photos/preferencias-viagem/tile-familia.jpg');
const tileEmCasal = require('../../_figma/assets/photos/preferencias-viagem/tile-em-casal.jpg');
const tileAmigos = require('../../_figma/assets/photos/preferencias-viagem/tile-amigos.jpg');
const tileNovasPessoas = require('../../_figma/assets/photos/preferencias-viagem/tile-novas-pessoas.jpg');
const tileMeuPet = require('../../_figma/assets/photos/preferencias-viagem/tile-meu-pet.jpg');
const tileMelhorIdade = require('../../_figma/assets/photos/preferencias-viagem/tile-melhor-idade.jpg');

const tileEstadosUnidos = require('../../_figma/assets/photos/preferencias-viagem/tile-estados-unidos.jpg');
const tileBrasil = require('../../_figma/assets/photos/preferencias-viagem/tile-brasil.jpg');
const tileEuropa = require('../../_figma/assets/photos/preferencias-viagem/tile-europa.jpg');
const tileAfrica = require('../../_figma/assets/photos/preferencias-viagem/tile-africa.jpg');
const tileAsia = require('../../_figma/assets/photos/preferencias-viagem/tile-asia.jpg');
const tileOceania = require('../../_figma/assets/photos/preferencias-viagem/tile-oceania.jpg');
const tileCaribe = require('../../_figma/assets/photos/preferencias-viagem/tile-caribe.jpg');
const tileMiddleEast = require('../../_figma/assets/photos/preferencias-viagem/tile-middle-east.jpg');
const tileAmericaLatina = require('../../_figma/assets/photos/preferencias-viagem/tile-america-latina.jpg');

const tileDestinoUnico = require('../../_figma/assets/photos/preferencias-viagem/tile-destino-unico.jpg');
const tileVariosDestinos = require('../../_figma/assets/photos/preferencias-viagem/tile-varios-destinos.jpg');

const tileOrganizado = require('../../_figma/assets/photos/preferencias-viagem/tile-organizado.jpg');
const tileTranquilo = require('../../_figma/assets/photos/preferencias-viagem/tile-tranquilo.jpg');
const tileAnimado = require('../../_figma/assets/photos/preferencias-viagem/tile-animado.jpg');
const tileExplorador = require('../../_figma/assets/photos/preferencias-viagem/tile-explorador.jpg');
const tileDeUltimaHora = require('../../_figma/assets/photos/preferencias-viagem/tile-de-ultima-hora.jpg');
const tileEsportista = require('../../_figma/assets/photos/preferencias-viagem/tile-esportista.jpg');

const tilePontosTuristicos = require('../../_figma/assets/photos/preferencias-viagem/tile-pontos-turisticos.jpg');
const tileTirarSelfies = require('../../_figma/assets/photos/preferencias-viagem/tile-tirar-selfies.jpg');
const tileFazerCompras = require('../../_figma/assets/photos/preferencias-viagem/tile-fazer-compras.jpg');
const tilePasseiosAoArLivre = require('../../_figma/assets/photos/preferencias-viagem/tile-passeios-ao-ar-livre.jpg');
const tileShowsEMusica = require('../../_figma/assets/photos/preferencias-viagem/tile-shows-e-musica.jpg');
const tileAssistirEsportes = require('../../_figma/assets/photos/preferencias-viagem/tile-assistir-esportes.jpg');
const tileBarERestaurante = require('../../_figma/assets/photos/preferencias-viagem/tile-bar-e-restaurante.jpg');
const tilePegarEstrada = require('../../_figma/assets/photos/preferencias-viagem/tile-pegar-estrada.jpg');
const tileNovasExperiencias = require('../../_figma/assets/photos/preferencias-viagem/tile-novas-experiencias.jpg');

const comoViajaOptions: TravelPreferenceOption[] = [
  { id: 'economica', label: 'Econômica', image: tileEconomica },
  { id: 'executiva', label: 'Executiva', image: tileExecutiva },
  { id: 'trem', label: 'Trem', image: tileTrem },
  { id: 'cruzeiro', label: 'Cruzeiro', image: tileCruzeiro },
  { id: 'carro', label: 'Carro', image: tileCarro },
];

const destinosFavoritosOptions: TravelPreferenceOption[] = [
  { id: 'praia', label: 'Praia', image: tilePraia },
  { id: 'cidade', label: 'Cidade', image: tileCidade },
  { id: 'montanhas', label: 'Montanhas', image: tileMontanhas },
  { id: 'cultura', label: 'Cultura', image: tileCultura },
  { id: 'religiao', label: 'Religião', image: tileReligiao },
  { id: 'aventura', label: 'Aventura', image: tileAventura },
];

const ondeSeHospedaOptions: TravelPreferenceOption[] = [
  { id: 'hotel', label: 'Hotel', image: tileHotel },
  { id: 'resort', label: 'Resort', image: tileResort },
  { id: 'pousada', label: 'Pousada', image: tilePousada },
  { id: 'hotel-spa', label: 'Hotel Spa', image: tileHotelSpa },
  { id: 'airbnb', label: 'Airbnb', image: tileAirbnb },
  { id: 'hostel', label: 'Hostel', image: tileHostel },
];

const estiloDeHospedagemOptions: TravelPreferenceOption[] = [
  { id: 'classico', label: 'Clássico', image: tileClassico },
  { id: 'boutique', label: 'Boutique', image: tileBoutique },
  { id: 'historico', label: 'Histórico', image: tileHistorico },
  { id: 'budget', label: 'Budget', image: tileBudget },
  { id: 'com-vista', label: 'Com vista', image: tileComVista },
  { id: 'mais-espaco', label: 'Mais espaço', image: tileMaisEspaco },
  { id: 'vilas', label: 'Vilas', image: tileVilas },
];

const comQuemVoceViajaOptions: TravelPreferenceOption[] = [
  { id: 'sozinho', label: 'Sozinho', image: tileSozinho },
  { id: 'familia', label: 'Família', image: tileFamilia },
  { id: 'em-casal', label: 'Em casal', image: tileEmCasal },
  { id: 'amigos', label: 'Amigos', image: tileAmigos },
  { id: 'novas-pessoas', label: 'Novas pessoas', image: tileNovasPessoas },
  { id: 'meu-pet', label: 'Meu pet', image: tileMeuPet },
  { id: 'melhor-idade', label: 'Melhor idade', image: tileMelhorIdade },
];

const seusDestinosFavoritosOptions: TravelPreferenceOption[] = [
  { id: 'estados-unidos', label: 'Estados Unidos', image: tileEstadosUnidos },
  { id: 'brasil', label: 'Brasil', image: tileBrasil },
  { id: 'europa', label: 'Europa', image: tileEuropa },
  { id: 'africa', label: 'África', image: tileAfrica },
  { id: 'asia', label: 'Ásia', image: tileAsia },
  { id: 'oceania', label: 'Oceania', image: tileOceania },
  { id: 'caribe', label: 'Caribe', image: tileCaribe },
  { id: 'middle-east', label: 'Middle East', image: tileMiddleEast },
  { id: 'america-latina', label: 'América Latina', image: tileAmericaLatina },
];

const suaViagemCostumaSerOptions: TravelPreferenceOption[] = [
  { id: 'destino-unico', label: 'Destino único', image: tileDestinoUnico },
  { id: 'varios-destinos', label: 'Vários destinos', image: tileVariosDestinos },
];

const qualTipoDeViajanteOptions: TravelPreferenceOption[] = [
  { id: 'organizado', label: 'Organizado', image: tileOrganizado },
  { id: 'tranquilo', label: 'Tranquilo', image: tileTranquilo },
  { id: 'animado', label: 'Animado', image: tileAnimado },
  { id: 'explorador', label: 'Explorador', image: tileExplorador },
  { id: 'de-ultima-hora', label: 'De última hora', image: tileDeUltimaHora },
  { id: 'esportista', label: 'Esportista', image: tileEsportista },
];

const chegandoNoDestinoOptions: TravelPreferenceOption[] = [
  { id: 'pontos-turisticos', label: 'Pontos turísticos', image: tilePontosTuristicos },
  { id: 'tirar-selfies', label: 'Tirar selfies', image: tileTirarSelfies },
  { id: 'fazer-compras', label: 'Fazer compras', image: tileFazerCompras },
  { id: 'passeios-ao-ar-livre', label: 'Passeios ao ar livre', image: tilePasseiosAoArLivre },
  { id: 'shows-e-musica', label: 'Shows e música', image: tileShowsEMusica },
  { id: 'assistir-esportes', label: 'Assistir esportes', image: tileAssistirEsportes },
  { id: 'bar-e-restaurante', label: 'Bar e restaurante', image: tileBarERestaurante },
  { id: 'pegar-estrada', label: 'Pegar estrada', image: tilePegarEstrada },
  { id: 'novas-experiencias', label: 'Novas experiências', image: tileNovasExperiencias },
];

export default {
  title: 'Screens/TravelPreferencesStep',
  component: TravelPreferencesStep,
  args: {
    totalSteps: 9,
    onToggleOption: action('onToggleOption'),
    onPressCta: action('onPressCta'),
    onBack: action('onBack'),
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

export const Inicial = {
  args: { step: 1, heading: 'Como você gosta de viajar?', options: comoViajaOptions },
};

/** Uma opção marcada: tile em destaque, demais esmaecidos, CTA habilitado. */
export const CardSelecionado = {
  args: {
    step: 1,
    heading: 'Como você gosta de viajar?',
    options: comoViajaOptions,
    selectedIds: ['economica'],
  },
};

export const DestinosFavoritos = {
  args: { step: 2, heading: 'Seus destinos favoritos', options: destinosFavoritosOptions },
};

export const OndeSeHospeda = {
  args: { step: 3, heading: 'Onde você se hospeda', options: ondeSeHospedaOptions },
};

export const EstiloDeHospedagem = {
  args: { step: 4, heading: 'Estilos de hospedagem', options: estiloDeHospedagemOptions },
};

export const ComQuemVoceViaja = {
  args: { step: 5, heading: 'Com quem você viaja', options: comQuemVoceViajaOptions },
};

export const SeusDestinosFavoritos = {
  args: { step: 6, heading: 'Seus destinos favoritos', options: seusDestinosFavoritosOptions },
};

export const SuaViagemCostumaSer = {
  args: { step: 7, heading: 'Sua viagem costuma ser', options: suaViagemCostumaSerOptions },
};

export const QualTipoDeViajanteVoceE = {
  args: { step: 8, heading: 'Qual tipo de viajante você é', options: qualTipoDeViajanteOptions },
};

export const ChegandoNoDestino = {
  args: {
    step: 9,
    heading: 'Chegando no destino',
    options: chegandoNoDestinoOptions,
    ctaLabel: 'Concluir',
  },
};
