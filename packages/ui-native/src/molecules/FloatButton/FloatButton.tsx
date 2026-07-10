import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../atoms/Button';

export type FloatButtonProps = {
  /** Ícones fornecidos pelo consumidor (ainda não há um sistema de ícone no design system). */
  iconOpen?: React.ReactNode;
  iconClose?: React.ReactNode;
  iconDica?: React.ReactNode;
  iconFoto?: React.ReactNode;
  iconRoteiro?: React.ReactNode;
  onSelectDica?: () => void;
  onSelectFoto?: () => void;
  onSelectRoteiro?: () => void;
};

/**
 * FloatButton — FAB de "Publicar" da Comunidade (fluxo Publicar conteúdo).
 * Fechado: pill "Publicar" isolado. Aberto: pills Dica/Foto/Roteiro empilhados
 * + botão de fechar. Composto a partir do átomo `Button` (variant="primary",
 * padrão, já cobre o visual gradiente pill usado em todos os itens).
 *
 * Estado aberto/fechado é interno — é interação de UI, não dado de API, então
 * não fere a regra de "componente apresentacional". A posição na tela (FAB
 * ancorado no canto) é responsabilidade do consumidor, não deste componente.
 */
export const FloatButton = ({
  iconOpen,
  iconClose,
  iconDica,
  iconFoto,
  iconRoteiro,
  onSelectDica,
  onSelectFoto,
  onSelectRoteiro,
}: FloatButtonProps) => {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <View testID="float-button" className="items-end px-xxl">
        <Button
          testID="float-button-publish"
          label="Publicar"
          icon={iconOpen}
          iconPosition="right"
          onPress={() => setOpen(true)}
        />
      </View>
    );
  }

  return (
    <View testID="float-button" className="items-end gap-xl px-xxl">
      <View testID="float-button-actions" className="items-end gap-lg">
        <Button label="Dica" icon={iconDica} iconPosition="left" onPress={onSelectDica} />
        <Button label="Foto" icon={iconFoto} iconPosition="left" onPress={onSelectFoto} />
        <Button label="Roteiro" icon={iconRoteiro} iconPosition="left" onPress={onSelectRoteiro} />
      </View>
      <Button testID="float-button-close" icon={iconClose} onPress={() => setOpen(false)} />
    </View>
  );
};
