import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';

export type HotelTestimonial = {
  id: string;
  /** Nome do hóspede (ex.: "Jéssica M."). */
  name: string;
  /** Iniciais no avatar quando não há foto (ex.: "JM"). */
  initials: string;
  /** Bandeira do país como emoji (ex.: "🇧🇷"). */
  flag?: string;
  /** Texto do depoimento. */
  quote: string;
};

export type HotelTestimonialsCardProps = {
  testimonials: HotelTestimonial[];
  seeAllLabel?: string;
  onSeeAll?: () => void;
};

/** Avatar circular com gradiente da marca e as iniciais do hóspede. */
const TestimonialAvatar = ({ initials }: { initials: string }) => (
  <LinearGradient
    colors={[...colors.gradient.button]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{ width: 32, height: 32, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}
  >
    <Text className="font-sans text-xs font-medium text-fg-inverse">{initials}</Text>
  </LinearGradient>
);

/**
 * HotelTestimonialsCard — bloco "O que os hóspedes dizem": depoimentos com
 * avatar (iniciais), nome, bandeira do país e a citação, com o link "Ver
 * todas as avaliações". Apresentacional: depoimentos já vêm por props.
 * Reproduz a Sessão Depoimentos do fluxo de pacotes (Figma).
 */
export const HotelTestimonialsCard = ({
  testimonials,
  seeAllLabel = 'Ver todas as avaliações',
  onSeeAll,
}: HotelTestimonialsCardProps): React.ReactElement => (
  <View className="gap-lg bg-surface-default px-xxl py-xl">
    <Text className="font-sans text-xl font-bold text-fg-secondary">O que os hóspedes dizem</Text>
    <View className="gap-md">
      {testimonials.map((testimonial, index) => (
        <View key={testimonial.id} className="gap-md">
          <View className="gap-md">
            <View className="flex-row items-center gap-md">
              <TestimonialAvatar initials={testimonial.initials} />
              <Text className="font-sans text-md font-bold text-fg-secondary">{testimonial.name}</Text>
              {testimonial.flag ? <Text className="text-md">{testimonial.flag}</Text> : null}
            </View>
            <Text numberOfLines={3} className="font-sans text-md font-medium text-fg-subtle">
              {testimonial.quote}
            </Text>
          </View>
          {index < testimonials.length - 1 ? (
            <View className="border-b border-border-subtle" />
          ) : null}
        </View>
      ))}
    </View>
    <Pressable accessibilityRole="button" onPress={onSeeAll}>
      <Text className="font-sans text-xs font-medium text-fg-link underline">{seeAllLabel}</Text>
    </Pressable>
  </View>
);
