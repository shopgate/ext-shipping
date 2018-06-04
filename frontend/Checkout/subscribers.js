import { main$ } from '@shopgate/pwa-common/streams/main';
import fetchShippingMethods from './action';
import { getSelectedMethod } from './selectors';

export default (subscribe) => {
  const checkoutState$ = main$.filter(({ action }) => action.type === 'CHECKOUT_STATE');
  const shippingMethods$ = main$.filter(({ action }) => action.type === 'SHIPPING_METHODS');
  const selectShippingMethod$ = main$.filter(({ action }) => action.type === 'SELECT_SHIPPING_METHOD');

  /**
   * Fetch shipping methods when checkout state is changed
   */
  subscribe(checkoutState$, ({ dispatch, action }) => {
    fetchShippingMethods(action.checkout)(dispatch);
  });

  /**
   * After receiving shipping methods,
   * notify subscribers that we have default selection
   */
  subscribe(shippingMethods$, ({ dispatch, getState, action }) => {
    const selectedMethod = getSelectedMethod(getState());
    if (selectedMethod) {
      return;
    }
    // PreSelect first default method
    const method = action.methods.find(shipMethod => shipMethod.selected);
    if (method) {
      dispatch({
        type: 'SELECT_SHIPPING_METHOD',
        method,
      });
    }
  });

  subscribe(selectShippingMethod$, ({ dispatch, getState, action }) => {
    const selectedMethod = getSelectedMethod(getState());
    if (selectedMethod && selectedMethod.id === action.method.id) {
      // Already selected
      return;
    }
    dispatch({
      type: 'CHECKOUT_DATA',
      id: 'shippingMethod',
      data: {
        id: action.method.id,
      },
    });
  });
};
