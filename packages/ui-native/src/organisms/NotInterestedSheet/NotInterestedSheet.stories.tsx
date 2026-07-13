import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { NotInterestedSheet } from './NotInterestedSheet';

export default {
  title: 'Organisms/NotInterestedSheet',
  component: NotInterestedSheet,
  args: {
    destination: 'Recife',
    onSeeLessDestination: action('onSeeLessDestination'),
    onSeeLessAuthor: action('onSeeLessAuthor'),
    onSeeLessPhotos: action('onSeeLessPhotos'),
    onUndo: action('onUndo'),
    onDismiss: action('onDismiss'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 560, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
