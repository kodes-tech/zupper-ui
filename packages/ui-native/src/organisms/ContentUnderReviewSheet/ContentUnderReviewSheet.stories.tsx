import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { ContentUnderReviewSheet } from './ContentUnderReviewSheet';

export default {
  title: 'Organisms/ContentUnderReviewSheet',
  component: ContentUnderReviewSheet,
  args: { onLearnMore: action('onLearnMore'), onClose: action('onClose'), onDismiss: action('onDismiss') },
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
