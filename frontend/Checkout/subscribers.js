import { main$ } from '@shopgate/pwa-common/streams/main';
import { cartReceived$ } from '@shopgate/pwa-common-commerce/cart/streams';
import fetchShippingMethods from './action';
import { getMethods, getContext, getSelectedMethod } from './selectors';

export default (subscribe) => {
  const checkoutEnter$ = main$.filter(({ action }) => action.type === 'CHECKOUT_ENTER');
  const checkoutState$ = main$.filter(({ action }) => action.type === 'CHECKOUT_STATE');
  const shippingMethods$ = main$.filter(({ action }) => action.type === 'SHIPPING_METHODS');
  const selectShippingMethod$ = main$.filter(({ action }) => action.type === 'SELECT_SHIPPING_METHOD');

  /**
   * PreFetching of shipping methods on cart enter.
   */
  subscribe(cartReceived$, ({ dispatch, getState }) => {
    const methods = getMethods(getState());
    if (!methods) {
      fetchShippingMethods()(dispatch);
    }
  });

  /**
   * PreSelect shipping method on checkout enter.
   */
  subscribe(checkoutEnter$, ({ dispatch, getState, action }) => {
    if (action.checkout.shippingMethod) {
      // Already exists
      return;
    }

    const method = getSelectedMethod(getState());
    if (method) {
      dispatch({
        type: 'SELECT_SHIPPING_METHOD',
        method,
      });
    }
  });

  let fetchShippingMethodsTimeout = null;
  /**
   * Fetch shipping methods when checkout state is changed
   */
  subscribe(checkoutState$, ({ dispatch, getState, action }) => {
    clearTimeout(fetchShippingMethodsTimeout);

    const context = getContext(getState());
    if (!context) {
      // Do not refresh on unknown context
      return;
    }

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
      fetchShippingMethodsTimeout = setTimeout(
        dispatch,
        700,
        fetchShippingMethods(action.checkout)
      );
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

    const method = methods.find(shipMethod => shipMethod.selected);

    // Check if checkout method still available
    if (checkout.shippingMethod) {
      const stillExists = methods.find(m => m.id === checkout.shippingMethod.id);
      if (!stillExists) {
        let data = null;
        if (method) {
          data = method;
        }
        dispatch({
          type: 'CHECKOUT_DATA',
          id: 'shippingMethod',
          data,
        });
      }
      return;
    }

    // PreSelect first default method
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
