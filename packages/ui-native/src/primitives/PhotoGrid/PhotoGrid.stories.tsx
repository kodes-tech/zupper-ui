import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PhotoGrid } from './PhotoGrid';

const photos = [
  require('../../_figma/assets/photos/comunidade-grid-01.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-02.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-03.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-04.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-05.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-06.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-07.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-08.jpg'),
  require('../../_figma/assets/photos/comunidade-grid-09.jpg'),
];

export default {
  title: 'Primitives/PhotoGrid',
  component: PhotoGrid,
  args: { onPressPhoto: action('onPressPhoto') },
  decorators: [(Story: React.ComponentType) => <View style={{ width: 360 }}><Story /></View>],
};

export const Default = { args: { photos } };
