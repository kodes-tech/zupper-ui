// Primitives — os blocos genéricos e agnósticos do design system (o "MUI do
// Zupper"). Sem hierarquia Atomic: o pacote publica só primitivos (ADR 0009), então
// tudo mora numa camada só. Produto e telas vivem no app consumidor, não aqui.
export * from './Avatar';
export * from './AvatarFallback';
export * from './Badge';
export * from './BottomNav';
export * from './BottomSheet';
export * from './Button';
export * from './ConfirmDialog';
export * from './Divider';
export * from './FilterChip';
// Icon mora no pacote @kodes-tech/icons (dual native/web); re-export para não
// quebrar quem já importava Icon/IconName de @kodes-tech/ui-native.
export * from '@kodes-tech/icons';
export * from './Input';
export * from './PasswordRequirementsList';
export * from './PhotoGrid';
export * from './RadioOption';
export * from './RoleBadge';
export * from './ScreenHeader';
export * from './SelectField';
export * from './SheetOption';
export * from './SocialLoginButton';
export * from './StatusBanner';
export * from './Text';
export * from './Textarea';
