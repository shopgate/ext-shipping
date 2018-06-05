/**
 * @param {Object} state redux
 * @return {*}
 */
export const getMethods = state => state.extensions['@shopgate/shipping/CheckoutReducers'].methods;

/**
 * @param {Object} state state
 * @return {*}
 */
export const getSelectedMethod = state => state.extensions['@shopgate/shipping/CheckoutReducers'].selectedMethod;
