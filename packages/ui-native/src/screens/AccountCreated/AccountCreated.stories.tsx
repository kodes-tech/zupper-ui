import React from 'react';
import { View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { AccountCreated } from './AccountCreated';

export default {
  title: 'Screens/AccountCreated',
  component: AccountCreated,
  args: { onPressEnter: action('onPressEnter') },
  parameters: { layout: 'centered' },
  decorators: [
    (Story: React.ComponentType) => (
      <View
        style={{
          width: 390,
          height: 844,
          borderRadius: 24,
          overflow: 'hidden',
          borderWidth: 8,
          borderColor: '#1a1a1a',
        }}
      >
        <Story />
      </View>
    ),
  ],
};

export const Default = {};
