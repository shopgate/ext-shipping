import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const { variables } = themeConfig;

export const container = css({
  margin: `0 0 ${variables.gap.xsmall}px`,
}).toString();
