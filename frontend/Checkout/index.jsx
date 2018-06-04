import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import Title from './components/Title';
import Methods from './components/Methods';

/**
 * @param {Object} props props
 * @return {*}
 */
const Checkout = ({ selectMethod, methods }) => (
  <Fragment>
    <Title />
    <Methods methods={methods} selectMethod={selectMethod} />
  </Fragment>
);

Checkout.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectMethod: PropTypes.func.isRequired,
};

export default connect(Checkout);
