import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { OwnPostActionsSheet } from './OwnPostActionsSheet';

export default {
  title: 'Organisms/OwnPostActionsSheet',
  component: OwnPostActionsSheet,
  args: {
    onEdit: action('onEdit'),
    onDelete: action('onDelete'),
    onCancel: action('onCancel'),
    onDismiss: action('onDismiss'),
  },
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
