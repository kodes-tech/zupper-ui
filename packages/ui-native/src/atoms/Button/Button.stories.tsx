import { Text } from 'react-native';
import { Button } from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
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
