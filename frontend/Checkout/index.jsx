import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import connect from './connector';
import Title from './components/Title';
import Methods from './components/Methods';

/**
 * Select address component
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

    this.state = {
      method: {
        id: props.selectedMethod.id,
      },
    };

    this.selectMethodTimeout = null;
  }

  submitMethod = () => {
    this.props.selectMethod(this.state.method);
  }

  /**
   * Update state to ReRender children, then dispatch action about selection
   * @param {Object} method method
   */
  handleMethodSelection = (method) => {
    this.setState({ method }, () => {
      clearTimeout(this.selectMethodTimeout);
      this.selectMethodTimeout = setTimeout(this.submitMethod, 700);
    });
  }

  /**
   * @return {*}
   */
  render() {
    const { methods } = this.props;

    const methodsWitSelection = methods.map(method => ({
      ...method,
      selected: this.state.method.id === method.id,
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
