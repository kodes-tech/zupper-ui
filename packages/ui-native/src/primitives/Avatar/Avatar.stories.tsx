import { Avatar } from './Avatar';

export default {
  title: 'Primitives/Avatar',
  component: Avatar,
};

export const Small = { args: { size: 'sm', source: { uri: 'https://i.pravatar.cc/56' } } };
export const Medium = { args: { size: 'md', source: { uri: 'https://i.pravatar.cc/88' } } };
export const Large = { args: { size: 'lg', source: { uri: 'https://i.pravatar.cc/128' } } };
