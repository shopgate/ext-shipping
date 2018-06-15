export default (state = {}, action) => {
  switch (action.type) {
    case 'SHIPPING_METHODS':
      return {
        methods: action.methods,
      };

    default:
      return {
        methods: null,
        ...state,
      };
  }
};
