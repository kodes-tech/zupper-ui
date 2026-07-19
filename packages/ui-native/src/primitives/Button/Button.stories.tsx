import { Text } from 'react-native';
import { action } from '@storybook/addon-actions';
import { Button } from './Button';

export default {
  title: 'Primitives/Button',
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

// tone="highlight" — CTAs de baixa ênfase dos sheets de denúncia.
export const SecondaryHighlight = {
  args: { label: 'Entenda as regras da comunidade', variant: 'secondary', tone: 'highlight' },
};
export const GhostHighlight = {
  args: { label: 'Cancelar', variant: 'ghost', tone: 'highlight' },
};

export const Danger = { args: { label: 'Denunciar publicação', variant: 'danger', fullWidth: true } };

// Botão de largura total, usado no CTA "Publicar" dos formulários.
export const FullWidth = { args: { label: 'Publicar', fullWidth: true } };

// Estado "Disabled" — mesma aparência neutra (borda/texto cinza) em qualquer
// variante, ex.: CTA "Avançar" do quiz de preferências antes de uma seleção.
export const Disabled = { args: { label: 'Avançar', fullWidth: true, disabled: true } };
