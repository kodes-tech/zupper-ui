import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { getTheme } from '@kodes-tech/tokens';
import { ThemeProvider, useTheme } from './ThemeProvider';

// Sonda: expõe o tema ativo e uma cor JS (via useTheme) como texto, p/ asserção.
const Probe = (): React.ReactElement => {
  const { theme, colors } = useTheme();
  return <Text>{`${theme}|${colors.text.primary}`}</Text>;
};

describe('ThemeProvider / useTheme', () => {
  it('cai no tema default fora de um provider', async () => {
    await render(<Probe />);
    expect(screen.getByText(`default|${getTheme('default').text.primary}`)).toBeOnTheScreen();
  });

  it('expõe o tema ativo e suas cores JS', async () => {
    await render(
      <ThemeProvider theme="dark">
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByText(`dark|${getTheme('dark').text.primary}`)).toBeOnTheScreen();
  });

  it('provider aninhado sobrescreve o pai (ilha de tema)', async () => {
    await render(
      <ThemeProvider theme="dark">
        <ThemeProvider theme="default">
          <Probe />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(screen.getByText(`default|${getTheme('default').text.primary}`)).toBeOnTheScreen();
  });
});
