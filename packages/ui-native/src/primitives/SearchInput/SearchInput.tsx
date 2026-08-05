import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { iconSize, radii, sizes, spacing } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import { useTheme } from '../../theme/ThemeProvider';

export type SearchInputOption = { id: string; label: string };

export type SearchInputProps = {
  /** Termo digitado (controlado pelo app). */
  value?: string;
  placeholder?: string;
  /** Notifica digitação (assinatura neutra: recebe a string, não o evento do RN). */
  onChangeText?: (value: string) => void;
  /**
   * Sugestões pro termo digitado — fetch/filtro fica por conta do app. Painel
   * some sem `value`; com `value` e lista vazia, mostra "Nenhum resultado
   * encontrado".
   */
  options?: SearchInputOption[];
  onSelectOption?: (id: string) => void;
  /** Toque no botão de busca (lupa) à direita. */
  onPressSearch?: () => void;
  testID?: string;
};

/** Campo + gap até o painel (ver `h-controlLg`) — offset do overlay flutuante. */
const PANEL_TOP = sizes.controlLg + spacing.xl;
/** Recuo esquerdo do painel: alinha o texto das opções com o texto digitado no
 * campo (depois do ícone) — `pl-xl` + ícone + `gap-lg` da linha do input, menos
 * o `px-md` que o próprio painel já aplica no conteúdo, menos 4px pra dar mais
 * largura ao painel (a pedido do design — desalinha levemente o texto). */
const PANEL_LEFT = spacing.xl + iconSize.lg + spacing.lg - spacing.md - 4;
/** Altura máx. do painel: mostra ~4–5 sugestões e rola o resto (mesmo critério do `SelectField`). */
const PANEL_MAX_HEIGHT = 260;

// Fundo do botão redondo: absoluto, preenchendo o círculo (mesma ressalva do
// Button — em Android/New Architecture, `overflow:hidden` num container com
// borderRadius bem maior que a própria altura recorta o conteúdo).
const searchButtonGradientStyle = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: radii.pill,
};

/**
 * SearchInput — campo pill de busca com sugestões (typeahead): ícone de globo
 * fixo à esquerda, botão de busca (lupa) redondo com gradiente à direita, e
 * painel de sugestões flutuando abaixo do campo. Três estados: sem `value` →
 * fechado (sem painel); `value` + `options` → painel com a lista; `value` sem
 * `options` → painel "Nenhum resultado encontrado". Apresentacional/controlado:
 * o app decide `value`/`options` (fetch/filtro) e trata a escolha via
 * `onSelectOption` — mesma filosofia do `SelectField`.
 */
export const SearchInput = ({
  value,
  placeholder = 'Qual seu destino?',
  onChangeText,
  options = [],
  onSelectOption,
  onPressSearch,
  testID,
}: SearchInputProps): React.ReactElement => {
  const { colors } = useTheme();
  const showPanel = Boolean(value);

  return (
    <View className="relative w-full">
      <View className="h-controlLg w-full flex-row items-center gap-lg rounded-pill border border-border-default bg-surface-default pl-xl pr-md">
        <Icon name="globe" size={iconSize.lg} />
        <TextInput
          testID={testID}
          accessibilityLabel={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          className="flex-1 font-sans text-bodyMd text-fg-primary placeholder:text-fg-muted web:selection:bg-surface-selection web:outline-none"
          selectionColor={colors.surface.selection}
        />
        <Pressable accessibilityRole="button" accessibilityLabel="Buscar" onPress={onPressSearch}>
          <View className="h-[40px] w-[40px] items-center justify-center rounded-pill">
            <LinearGradient
              colors={[...colors.gradient.button]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={searchButtonGradientStyle}
            />
            {/* web: um <svg> `position: static` pinta ANTES de um irmão
                posicionado (o fundo `absolute` do gradiente), sumindo atrás
                dele mesmo vindo depois no DOM — precisa virar `relative`
                pra entrar na mesma camada de pintura e ficar por cima. */}
            <Icon name="search" size={iconSize.lg} style={{ position: 'relative' }} />
          </View>
        </Pressable>
      </View>

      {showPanel ? (
        <View
          className="absolute right-0 z-10 rounded-xl border border-border-default bg-surface-default"
          style={{ top: PANEL_TOP, left: PANEL_LEFT, maxHeight: PANEL_MAX_HEIGHT }}
        >
          {options.length > 0 ? (
            <ScrollView showsVerticalScrollIndicator keyboardShouldPersistTaps="handled">
              {options.map((option, index) => (
                <React.Fragment key={option.id}>
                  {index > 0 ? <View className="mx-md h-px bg-border-default" /> : null}
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={option.label}
                    onPress={() => onSelectOption?.(option.id)}
                    className="px-md py-lg"
                  >
                    <Text numberOfLines={1} className="font-sans text-bodyMd text-fg-secondary">
                      {option.label}
                    </Text>
                  </Pressable>
                </React.Fragment>
              ))}
            </ScrollView>
          ) : (
            <Text className="px-md py-lg text-center font-sans text-bodyText text-fg-muted">
              Nenhum resultado encontrado
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
};
