import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ReportConfirmSheet } from './ReportConfirmSheet';

export default {
  title: 'Organisms/ReportConfirmSheet',
  component: ReportConfirmSheet,
  args: { onReport: action('onReport'), onCancel: action('onCancel'), onDismiss: action('onDismiss') },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 700, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export const Padrao = {};
