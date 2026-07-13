import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { PostActionsSheet } from './PostActionsSheet';

export default {
  title: 'Organisms/PostActionsSheet',
  component: PostActionsSheet,
  args: {
    onSave: action('onSave'),
    onNotInterested: action('onNotInterested'),
    onShare: action('onShare'),
    onReport: action('onReport'),
    onDismiss: action('onDismiss'),
  },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 500, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
