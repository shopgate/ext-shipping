import React from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import Title from './components/Title';
import Methods from './components/Methods';
import * as style from './style';

/**
 * @param {Object} props props
 * @return {*}
 */
const Checkout = ({ selectMethod, methods }) => (
  <div className={style.container}>
    <Title />
    <Methods methods={methods} selectMethod={selectMethod} />
  </div>
);

Checkout.propTypes = {
  methods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  selectMethod: PropTypes.func.isRequired,
};

export default connect(Checkout);
