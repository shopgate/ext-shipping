export default (state = {}, action) => {
  switch (action.type) {
    case 'SHIPPING_METHODS':
      return {
        methods: action.methods,
        context: {
          paymentMethod: action.checkout.paymentMethod || null,
          shippingAddress: action.checkout.shippingAddress || null,
        },
      };

    case 'SELECT_SHIPPING_METHOD':
      return {
        ...state,
        methods: state.methods.map(m => ({
          ...m,
          selected: m.id === action.method.id,
        })),
      };

    case 'CHECKOUT_SUCCESS':
      return {
        ...state,
        methods: null,
        context: null,
      };

    default:
      return state;
  }
};
