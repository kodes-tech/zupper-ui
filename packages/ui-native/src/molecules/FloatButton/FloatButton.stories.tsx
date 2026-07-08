import { Text } from 'react-native';
import { FloatButton } from './FloatButton';

export default {
  title: 'Molecules/FloatButton',
  component: FloatButton,
};

export const Default = {
  args: {
    iconOpen: <Text style={{ color: 'white' }}>+</Text>,
    iconClose: <Text style={{ color: 'white' }}>−</Text>,
    iconDica: <Text style={{ color: 'white' }}>📄</Text>,
    iconFoto: <Text style={{ color: 'white' }}>🖼️</Text>,
    iconRoteiro: <Text style={{ color: 'white' }}>🗺️</Text>,
  },
};
