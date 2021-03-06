import React from 'react';
import I18n from '@shopgate/pwa-common/components/I18n';
import * as style from './style';

/**
 * @return {*}
 */
const Title = () => (
  <div className={style.title} data-test-id="ShippingMethodsTitle">
    <I18n.Text string="checkout.shipping.methods.title" />
  </div>
);

export default Title;
