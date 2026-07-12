import React from 'react';
import { View } from 'react-native';
import { Divider } from './Divider';

export default {
  title: 'Atoms/Divider',
  component: Divider,
  decorators: [(Story: React.ComponentType) => <View style={{ width: 300, padding: 16 }}><Story /></View>],
};

export const Default = { args: {} };
