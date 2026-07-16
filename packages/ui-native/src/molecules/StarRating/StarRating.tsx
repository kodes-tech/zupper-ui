import React from 'react';
import { View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type StarRatingProps = {
  /** Número de estrelas cheias a exibir (categoria do hotel). */
  rating: number;
  /** Tamanho de cada estrela em dp. Padrão 16 (como no app). */
  size?: number;
};

/**
 * StarRating — indicador de estrelas do hotel (categoria). Repete o ícone
 * `hotel-star` (que carrega o gradiente laranja→amarelo do app) `rating` vezes.
 * Extraído de HotelStarRatingIndicator do zupper-app.
 */
export const StarRating = ({ rating, size = 16 }: StarRatingProps): React.ReactElement => (
  <View accessibilityLabel={`${rating} estrelas`} className="flex-row items-center">
    {Array.from({ length: Math.max(0, Math.floor(rating)) }).map((_, i) => (
      <Icon key={i} name="hotel-star" size={size} />
    ))}
  </View>
);
