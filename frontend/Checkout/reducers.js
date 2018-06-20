export default (state = {}, action) => {
  switch (action.type) {
    case 'SHIPPING_METHODS':
      return {
        methods: action.methods,
      };

    case 'CHECKOUT_SUCCESS':
      return {
        ...state,
        methods: null,
      };

    default:
      return {
        methods: null,
        ...state,
      };
  }
};
