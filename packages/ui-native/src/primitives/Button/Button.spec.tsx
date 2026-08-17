import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { radii } from '@kodes-tech/tokens';
import { Button } from './Button';

describe('Button', () => {
  it('renders the label', async () => {
    await render(<Button label="Publicar" />);
    expect(screen.getByText('Publicar')).toBeOnTheScreen();
  });

  it('renders without a label when only an icon is provided', async () => {
    await render(<Button icon={<Text>+</Text>} />);
    expect(screen.getByText('+')).toBeOnTheScreen();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    await render(<Button label="Publicar" onPress={onPress} />);
    await fireEvent.press(screen.getByTestId('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders the secondary (outline) variant', async () => {
    await render(<Button label="Iniciar sessão" variant="secondary" />);
    expect(screen.getByText('Iniciar sessão')).toBeOnTheScreen();
    expect(screen.getByTestId('button-container')).toBeOnTheScreen();
  });

  it('renders the ghost (text-only) variant', async () => {
    await render(<Button label="Sair da minha conta zupper" variant="ghost" />);
    expect(screen.getByText('Sair da minha conta zupper')).toBeOnTheScreen();
    expect(screen.getByTestId('button-container')).toBeOnTheScreen();
  });

  it('renders the danger (solid) variant', async () => {
    await render(<Button label="Denunciar publicação" variant="danger" />);
    expect(screen.getByText('Denunciar publicação')).toBeOnTheScreen();
    expect(screen.getByTestId('button-container')).toBeOnTheScreen();
  });

  it('renders the highlight tone for secondary/ghost', async () => {
    await render(<Button label="Cancelar" variant="ghost" tone="highlight" />);
    expect(screen.getByText('Cancelar')).toBeOnTheScreen();
  });

  // Regressão (Android/New Architecture): com `overflow: 'hidden'` no container e
  // `borderRadius` muito maior que a altura do pill, o Android recortava todo o
  // conteúdo — gradiente e label sumiam e sobrava só a área tocável. O raio mora
  // no gradiente; o container não recorta.
  it('paints the primary gradient without clipping it in the container', async () => {
    await render(<Button label="Fazer login" fullWidth />);

    expect(screen.getByTestId('button-container').props.style).not.toHaveProperty('overflow');
    expect(screen.getByTestId('button-gradient').props.style).toMatchObject({
      borderRadius: radii.pill,
    });
    expect(screen.getByText('Fazer login')).toBeOnTheScreen();
  });

  it('renders the disabled state and blocks presses regardless of variant', async () => {
    const onPress = jest.fn();
    await render(<Button label="Avançar" variant="primary" disabled onPress={onPress} />);
    expect(screen.getByTestId('button-container')).toBeOnTheScreen();
    await fireEvent.press(screen.getByTestId('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  /**
   * Estado "Loading" do eixo State do Figma (KSA-448). O que estes casos protegem é a
   * DISTINÇÃO: carregando não pode virar mais um jeito de dizer "desabilitado", senão
   * "enviando" fica indistinguível de "faltou preencher" — que era o problema original.
   */
  describe('loading', () => {
    it('troca o conteúdo pelo indicador, no lugar do rótulo', async () => {
      await render(<Button label="Fazer login" loading />);

      expect(screen.getByTestId('button-spinner')).toBeOnTheScreen();
      expect(screen.queryByText('Fazer login')).toBeNull();
    });

    it('mantém o nome acessível e anuncia ocupado — o rótulo sai da tela, não da a11y', async () => {
      await render(<Button label="Fazer login" loading />);

      const button = screen.getByTestId('button');
      expect(button.props.accessibilityLabel).toBe('Fazer login');
      expect(button.props.accessibilityState).toMatchObject({ busy: true, disabled: true });
    });

    it('não envia duas vezes: o guard é do primitivo, não do chamador', async () => {
      const onPress = jest.fn();
      await render(<Button label="Fazer login" loading onPress={onPress} />);

      await fireEvent.press(screen.getByTestId('button'));
      await fireEvent.press(screen.getByTestId('button'));

      expect(onPress).not.toHaveBeenCalled();
    });

    it('preserva a aparência da variante — carregando NÃO é o cinza de desabilitado', async () => {
      // O primary carregando segue no caminho do gradiente. Se caísse no ramo de
      // `disabled`, o gradiente desapareceria e o botão viraria a pílula neutra.
      await render(<Button label="Fazer login" loading />);

      expect(screen.getByTestId('button-gradient')).toBeOnTheScreen();
    });

    it('o indicador acompanha a cor do rótulo que substituiu', async () => {
      await render(<Button label="Cancelar" variant="ghost" loading />);

      // ghost sem tone é o vermelho destrutivo — não o branco do primary.
      expect(screen.getByTestId('button-spinner').props.color).toBe('#EF4444');
    });

    it('volta ao normal quando o carregamento termina', async () => {
      const { rerender } = await render(<Button label="Fazer login" loading />);
      expect(screen.queryByText('Fazer login')).toBeNull();

      await rerender(<Button label="Fazer login" />);

      expect(screen.getByText('Fazer login')).toBeOnTheScreen();
      expect(screen.queryByTestId('button-spinner')).toBeNull();
    });
  });

  /**
   * Bug 🔴 do gradiente (`docs/known-issues.md`): na New Architecture o
   * `react-native-linear-gradient` mede errado quando o container troca de moldura
   * (outline do disabled) para gradiente NO MESMO MOUNT — e o botão desaparece. O
   * primitivo agora remonta o container na borda disabled↔habilitado, aposentando o
   * `key` que cada tela punha por fora.
   *
   * O que dá para afirmar aqui é a **remontagem** (container novo, gradiente presente).
   * Que o gradiente passa a MEDIR certo é comportamento nativo, e só o aparelho prova.
   */
  it('remonta o container ao sair de desabilitado para habilitado', async () => {
    const { rerender } = await render(<Button label="Avançar" disabled />);
    const disabledContainer = screen.getByTestId('button-container');
    expect(screen.queryByTestId('button-gradient')).toBeNull();

    await rerender(<Button label="Avançar" />);

    expect(screen.getByTestId('button-container')).not.toBe(disabledContainer);
    expect(screen.getByTestId('button-gradient')).toBeOnTheScreen();
  });
});
