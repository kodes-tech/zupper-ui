import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { SearchField } from './SearchField';

export default {
  title: 'Molecules/SearchField',
  component: SearchField,
  args: { onPress: action('onPress') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 358 }}><Story /></View>],
};

export const Default = { args: {} };
