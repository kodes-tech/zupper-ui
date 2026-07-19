// Atoms — blocos mais básicos (leaf components): Badge, Text, Icon, Button...
export * from './Avatar';
export * from './AvatarFallback';
export * from './Badge';
export * from './Button';
export * from './Divider';
export * from './FilterChip';
// Icon mora no pacote @kodes-tech/icons (dual native/web); re-export para não
// quebrar quem já importava Icon/IconName de @kodes-tech/ui-native.
export * from '@kodes-tech/icons';
export * from './Input';
export * from './RoleBadge';
export * from './Text';
export * from './Textarea';
