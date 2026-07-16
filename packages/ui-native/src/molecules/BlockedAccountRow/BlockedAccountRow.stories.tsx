import { action } from '@storybook/addon-actions';
import { BlockedAccountRow } from './BlockedAccountRow';

export default {
  title: 'Molecules/BlockedAccountRow',
  component: BlockedAccountRow,
  args: {
    name: 'Carlos Souza',
    handle: '@carlosviaja',
    avatar: { uri: 'https://i.pravatar.cc/88' },
    onPress: action('onPress'),
  },
};

export const Unblock = {};

export const Block = { args: { action: 'block' } };
