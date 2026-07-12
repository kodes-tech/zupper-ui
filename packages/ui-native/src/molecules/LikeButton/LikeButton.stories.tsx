import { action } from '@storybook/addon-actions';
import { LikeButton } from './LikeButton';

export default {
  title: 'Molecules/LikeButton',
  component: LikeButton,
  args: { onPress: action('onPress') },
};

export const Default = { args: { count: 32 } };
export const Liked = { args: { count: 158, liked: true } };
