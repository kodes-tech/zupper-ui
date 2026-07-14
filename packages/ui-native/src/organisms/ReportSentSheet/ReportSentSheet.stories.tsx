import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ReportSentSheet } from './ReportSentSheet';

export default {
  title: 'Organisms/ReportSentSheet',
  component: ReportSentSheet,
  args: {
    onDone: action('onDone'),
    onBlockAuthor: action('onBlockAuthor'),
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
