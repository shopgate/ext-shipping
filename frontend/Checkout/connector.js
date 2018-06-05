import { connect } from 'react-redux';
import { getMethods } from './selectors';

/**
 * @param {Object} state state
 * @return {{methods: *}}
 */
const mapStateToProps = state => ({
  methods: getMethods(state),
});

/**
 * @param {function} dispatch redux
 * @return {{selectMethod: (function(*): *)}}
 */
const mapDispatchToProps = dispatch => ({
  selectMethod: method => dispatch({
    type: 'SELECT_SHIPPING_METHOD',
    method,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps);
