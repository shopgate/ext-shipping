import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { App } from '@shopgate/pwa-common/context';
import Grid from '@shopgate/pwa-common/components/Grid';
import I18n from '@shopgate/pwa-common/components/I18n';
import Icon from '@shopgate/pwa-common/components/Icon';
import Ellipsis from '@shopgate/pwa-common/components/Ellipsis';
import * as style from './style';

/**
 * @TODO Remove after pwa with icons are packaged
 * @link https://github.com/shopgate/pwa/pull/104
 * @type {string}
 */
const radioChecked = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/>';
const radioUnchecked = '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/><path d="M0 0h24v24H0z" fill="none"/>';

/**
 * @return {*}
 */
const Methods = ({ selectMethod, methods }) => (
  <App>
    {({ checkout }) => (
      <Fragment>
        {
          methods.map(method => (
            <div className={style.method} key={`shipping_${method.id}`}>
              <Grid>
                <Grid.Item grow={1} className={style.name}>
                  {method.amount !== 0 &&
                  <I18n.Price
                    price={method.amount}
                    currency={checkout.currency}
                    className={style.price}
                  />
                  }
                  {method.name}
                </Grid.Item>
                <Grid.Item grow={0} className={style.icon} onClick={() => selectMethod(method)}>
                  {method.selected && <Icon size={28} content={radioChecked} />}
                  {!method.selected && <Icon size={28} content={radioUnchecked} />}
                </Grid.Item>
              </Grid>
              <Ellipsis
                rows={2}
                className={style.description}
              >
                {method.description}
              </Ellipsis>
            </div>
          ))
        }
      </Fragment>
    )}
  </App>
);

Methods.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectMethod: PropTypes.func.isRequired,
};

export default Methods;
