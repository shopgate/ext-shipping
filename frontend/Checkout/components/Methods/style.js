import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

export const method = css({
  padding: `${variables.gap.small}px ${variables.gap.big}px`,
  marginBottom: '1px',
  background: colors.light,
}).toString();

export const description = css({
  color: colors.shade3,
  fontSize: '14px',
}).toString();

export const icon = css({
  textAlign: 'right',
  color: colors.primary,
}).toString();

export const name = css({
  fontSize: '14px',
  fontWeight: 500,
}).toString();

export const price = css({
  paddingRight: `${variables.gap.small}px`,
}).toString();
