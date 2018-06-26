import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import Title from './components/Title';
import Methods from './components/Methods';

/**
 * @param {Object} props props
 * @return {*}
 */
const Checkout = ({ methods, selectedMethod, selectMethod }) => (
  <Fragment>
    <Title />
    <Methods
      methods={methods.map(method => ({
      ...method,
      selected: selectedMethod.id === method.id,
    }))}
      selectMethod={method => selectMethod(method)}
    />
  </Fragment>
);

Checkout.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectedMethod: PropTypes.shape().isRequired,
  selectMethod: PropTypes.func.isRequired,
};

export default connect(Checkout);
