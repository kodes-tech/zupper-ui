import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { DeleteOwnPostSheet } from './DeleteOwnPostSheet';

export default {
  title: 'Organisms/DeleteOwnPostSheet',
  component: DeleteOwnPostSheet,
  args: { onDelete: action('onDelete'), onCancel: action('onCancel'), onDismiss: action('onDismiss') },
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
