import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

export const method = css({
  padding: variables.gap.big,
  background: colors.light,
  borderBottom: `${variables.gap.xsmall / 2}px solid ${colors.background}`,
}).toString();

export const description = css({
  color: colors.shade3,
  fontSize: '14px',
}).toString();

export const icon = css({
  color: colors.primary,
}).toString();

export const name = css({
  fontSize: '0.875rem',
  fontWeight: 500,
}).toString();

export const price = css({
  paddingRight: `${variables.gap.small}px`,
}).toString();
