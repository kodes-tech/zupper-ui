import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  // Instrumenta o callback: tocar no botão loga no painel "Actions".
  // (SB8 removeu o auto-actions por argTypesRegex; declaramos explicitamente.)
  args: { onPress: action('onPress') },
};

export const Label = { args: { label: 'Publicar' } };
export const WithIconRight = {
  args: {
    label: 'Publicar',
    icon: <Text style={{ color: 'white' }}>+</Text>,
    iconPosition: 'right',
  },
};
export const WithIconLeft = {
  args: { label: 'Dica', icon: <Text style={{ color: 'white' }}>i</Text>, iconPosition: 'left' },
};
export const IconOnly = { args: { icon: <Text style={{ color: 'white' }}>−</Text> } };

export const Secondary = { args: { label: 'Iniciar sessão', variant: 'secondary' } };
export const SecondaryWithIcon = {
  args: {
    label: 'Iniciar sessão',
    variant: 'secondary',
    icon: <Text>👤</Text>,
    iconPosition: 'left',
  },
};

export const Ghost = { args: { label: 'Sair da minha conta zupper', variant: 'ghost' } };
