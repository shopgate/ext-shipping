import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { App } from '@shopgate/pwa-common/context';
import Grid from '@shopgate/pwa-common/components/Grid';
import I18n from '@shopgate/pwa-common/components/I18n';
import Button from '@shopgate/pwa-common/components/Button';
import CheckedIcon from '@shopgate/pwa-ui-shared/icons/CheckedIcon';
import UncheckedIcon from '@shopgate/pwa-ui-shared/icons/UncheckedIcon';

/**
 * @return {*}
 */
const Methods = ({ selectMethod, methods }) => (
  <App>
    {({ checkout }) => (
      <Fragment>
        {
          methods.map(method => (
            <Fragment key={`shipping_${method.id}`}>
              <Button onClick={() => selectMethod(method)}>
                <Grid>
                  {/* @TODO align li items as table view */}
                  <Grid.Item grow={0}>
                    <I18n.Price price={method.amount} currency={checkout.currency} />
                  </Grid.Item>
                  <Grid.Item grow={1}>
                    {method.name}
                  </Grid.Item>
                  <Grid.Item grow={1}>
                    {method.selected && <CheckedIcon size={28} color="#FA5400" />}
                    {!method.selected && <UncheckedIcon size={28} color="#FA5400" />}
                  </Grid.Item>
                </Grid>
                <small>{method.description}</small>
                <hr />
              </Button>
            </Fragment>
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
