import { main$ } from '@shopgate/pwa-common/streams/main';
import { CART_PATH } from '@shopgate/pwa-common-commerce/cart/constants';
import { routeDidEnter } from '@shopgate/pwa-common/streams/history';
import fetchShippingMethods from './action';
import { getMethods, getContext } from './selectors';

export default (subscribe) => {
  const cartRouteDidEnter$ = routeDidEnter(CART_PATH);
  const checkoutState$ = main$.filter(({ action }) => action.type === 'CHECKOUT_STATE');
  const shippingMethods$ = main$.filter(({ action }) => action.type === 'SHIPPING_METHODS');
  const selectShippingMethod$ = main$.filter(({ action }) => action.type === 'SELECT_SHIPPING_METHOD');

  /**
   * PreFetching of shipping methods on cart enter.
   */
  subscribe(cartRouteDidEnter$, ({ dispatch, getState }) => {
    const methods = getMethods(getState());
    if (!methods) {
      fetchShippingMethods()(dispatch);
    }
  });

  /**
   * Fetch shipping methods when checkout state is changed
   */
  subscribe(checkoutState$, ({ dispatch, getState, action }) => {
    const { shippingAddress, paymentMethod } = getContext(getState());

    let shouldRefresh = false;
    if (action.checkout.paymentMethod) {
      if (!paymentMethod || paymentMethod.id !== action.checkout.paymentMethod.id) {
        shouldRefresh = true;
      }
    }

    if (action.checkout.shippingAddress) {
      if (!shippingAddress || shippingAddress.id !== action.checkout.shippingAddress.id) {
        shouldRefresh = true;
      }
    }

    if (shouldRefresh) {
      fetchShippingMethods(action.checkout)(dispatch);
    }
  });

  /**
   * After receiving shipping methods,
   * notify subscribers that we have default selection
   */
  subscribe(shippingMethods$, ({ dispatch, action }) => {
    const { methods, checkout } = action;

    if (!Object.keys(action.checkout).length) {
      // Prefetch before checkout
      return;
    }

    // Check if checkout method still available
    if (checkout.shippingMethod) {
      const stillExists = methods.find(m => m.id === checkout.shippingMethod.id);
      if (!stillExists) {
        dispatch({
          type: 'CHECKOUT_DATA',
          id: 'shippingMethod',
          data: null,
        });
      }
      return;
    }

    // PreSelect first default method
    const method = methods.find(m => m.selected);
    if (method) {
      dispatch({
        type: 'SELECT_SHIPPING_METHOD',
        method,
      });
    }
  });

  subscribe(selectShippingMethod$, ({ dispatch, action }) => {
    dispatch({
      type: 'CHECKOUT_DATA',
      id: 'shippingMethod',
      data: {
        id: action.method.id,
      },
    });
  });
};
