const key = '@shopgate/shipping/CheckoutReducers';
/**
 * @param {Object} state redux
 * @return {*}
 */
export const getMethods = state => state.extensions[key].methods;

/**
 * @param {Object} state state
 * @return {*}
 */
export const getSelectedMethod = state => getMethods(state).find(method => method.selected);
