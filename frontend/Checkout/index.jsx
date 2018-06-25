import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import Title from './components/Title';
import Methods from './components/Methods';

/**
 * Select method component
 */
class Checkout extends Component {
  static propTypes = {
    methods: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    selectedMethod: PropTypes.shape().isRequired,
    selectMethod: PropTypes.func.isRequired,
  }

  /**
   * @param {Object} props props
   */
  constructor(props) {
    super(props);
  }

  /**
   * Update state to ReRender children, then dispatch action
   * @param {Object} method
   */
  handleMethodSelection = (method) => {
    this.props.selectMethod(method);
  }

  /**
   * @return {*}
   */
  render() {
    const { methods } = this.props;

    const methodsWitSelection = methods.map(method => ({
      ...method,
      selected: this.props.selectedMethod.id === method.id,
    }));

    return (
      <Fragment>
        <Title />
        <Methods methods={methodsWitSelection} selectMethod={this.handleMethodSelection} />
      </Fragment>
    );
  }
}

export default connect(Checkout);
