import React, { createContext, useContext, useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { vars } from 'nativewind';
import { getTheme, themeVars, type ThemeName, type ThemeColors } from '@kodes-tech/tokens';

/**
 * Contexto do tema ativo. `colors` são os valores hex (via `getTheme`) para os poucos
 * pontos que leem cor em JS (gradientes do LinearGradient, `selectionColor`) — que NÃO
 * acompanham a cascata das classes NativeWind.
 */
type ThemeContextValue = { theme: ThemeName; colors: ThemeColors };

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'default',
  colors: getTheme('default'),
});

/** Lê o tema ativo. Fora de um `ThemeProvider`, cai no `default` (sem quebrar). */
export const useTheme = (): ThemeContextValue => useContext(ThemeContext);

export type ThemeProviderProps = {
  /** Nome do tema a aplicar na subárvore. Default: `'default'` (light). */
  theme?: ThemeName;
  children: React.ReactNode;
  /** Classes NativeWind para o View wrapper (ex.: fundo de tela). */
  className?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * ThemeProvider — aplica um tema a toda a subárvore.
 *
 * Cross-platform por design: injeta as variáveis CSS do tema (`vars(themeVars[theme])`)
 * no `style` de um `View` wrapper — no web (react-native-web) viram custom properties
 * inline que as classes `rgb(var(--color-…))` resolvem; no React Native o `vars()` do
 * NativeWind faz o mesmo em runtime. Trocar `theme` re-skinna tudo abaixo, e provedores
 * aninhados criam "ilhas" (ex.: um diálogo claro dentro de uma tela escura).
 *
 * A ATIVAÇÃO (qual tema passar, ex.: via flag remota — ADR 0005) é do app consumidor.
 */
export const ThemeProvider = ({
  theme = 'default',
  children,
  className,
  style,
}: ThemeProviderProps): React.ReactElement => {
  const value = useMemo<ThemeContextValue>(() => ({ theme, colors: getTheme(theme) }), [theme]);
  return (
    <ThemeContext.Provider value={value}>
      <View className={className} style={[vars(themeVars[theme]), style]}>
        {children}
      </View>
    </ThemeContext.Provider>
  );
};
