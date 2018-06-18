import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables, colors } = themeConfig;

export const title = css({
  background: colors.background,
  padding: `${variables.gap.big}px`,
  fontWeight: 500,
}).toString();
