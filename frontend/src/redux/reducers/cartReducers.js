import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // if items exiting in cart
      const exitItem = state.cartItems.find((x) => x.product === item.product);

      if (exitItem) {
        return {
          ...state, //what ever the state is return and
          cartItems: state.cartItems.map(
            (x) => (x.product === exitItem.product ? item : x) //update cartItem push new product id item only otherwise return ////same item
          ),
        };
      } else {
        // if not exist then push to the item in cart
        return { ...state, cartItems: [...state.cartItems, item] }; //upadte only cartItem --> item
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload), //remove the item with product id matches
      };

    default:
      return state;
  }
};
