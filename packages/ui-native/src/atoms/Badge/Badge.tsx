import React from 'react';
import styled from 'styled-components/native';
import { colors, radii, spacing, typography } from '@kodes-tech/tokens';

export type BadgeTone = 'neutral' | 'success' | 'danger';

export type BadgeProps = {
  label: string;
  tone?: BadgeTone;
};

const backgroundByTone: Record<BadgeTone, string> = {
  neutral: colors.surface.card,
  success: colors.feedback.success,
  danger: colors.feedback.danger,
};

const textByTone: Record<BadgeTone, string> = {
  neutral: colors.text.strong,
  success: colors.text.inverse,
  danger: colors.text.inverse,
};

const Container = styled.View<{ tone: BadgeTone }>`
  align-self: flex-start;
  background-color: ${({ tone }) => backgroundByTone[tone]};
  padding: ${spacing.xs}px ${spacing.sm}px;
  border-radius: ${radii.pill}px;
`;

const Label = styled.Text<{ tone: BadgeTone }>`
  font-family: ${typography.family};
  font-size: ${typography.size.caption}px;
  font-weight: ${typography.weight.medium};
  color: ${({ tone }) => textByTone[tone]};
`;

/**
 * Badge — exemplo de referência (componente apresentacional, sem chamada de API).
 * Serve de molde para os componentes do Community: styled-components/native + tokens.
 */
export const Badge = ({ label, tone = 'neutral' }: BadgeProps): React.ReactElement => (
  <Container tone={tone}>
    <Label tone={tone}>{label}</Label>
  </Container>
);
