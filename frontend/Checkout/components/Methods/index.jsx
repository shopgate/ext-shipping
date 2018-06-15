import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { App } from '@shopgate/pwa-common/context';
import Grid from '@shopgate/pwa-common/components/Grid';
import I18n from '@shopgate/pwa-common/components/I18n';
import Ellipsis from '@shopgate/pwa-common/components/Ellipsis';
import RadioCheckedIcon from '@shopgate/pwa-ui-shared/icons/RadioCheckedIcon';
import RadioUncheckedIcon from '@shopgate/pwa-ui-shared/icons/RadioUncheckedIcon';
import * as style from './style';

/**
 * @return {*}
 */
const Methods = ({ selectMethod, methods }) => (
  <App>
    {({ checkout }) => (
      <Fragment>
        {
          methods.map(method => (
            <div
              aria-hidden
              className={style.method}
              key={`shipping_${method.id}`}
              onClick={() => selectMethod(method)}
            >
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
                <Grid.Item grow={0} className={style.icon}>
                  {method.selected && <RadioCheckedIcon size={28} />}
                  {!method.selected && <RadioUncheckedIcon size={28} />}
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
