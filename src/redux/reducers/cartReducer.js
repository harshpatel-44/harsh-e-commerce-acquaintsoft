import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actionTypes/cart";

const initialState = {
  cartProducts: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const isProductInCart = state.cartProducts.filter(
        (item) => item?.product?.id === action.payload.id
      );

      let updateData = [];
      if (isProductInCart.length) {
        updateData = state.cartProducts.map((item) => {
          if (item.product.id === action.payload.id) {
            return { ...item, noOfProducts: item.noOfProducts + 1 };
          } else {
            return { ...item };
          }
        });
      } else {
        updateData = [
          ...state.cartProducts,
          { product: action.payload, noOfProducts: 1 },
        ];
      }
      return {
        ...state,
        cartProducts: [...updateData],
      };
    }

    case REMOVE_FROM_CART: {
      const isOnlyOneProduct = state.cartProducts.filter(
        (item) =>
          item?.product?.id === action.payload.id && item.noOfProducts === 1
      );

      let updateData = [];
      if (isOnlyOneProduct.length) {
        updateData = state.cartProducts.filter(
          (item) => item?.product?.id !== action.payload.id
        );
      } else {
        updateData = state.cartProducts.map((item) => {
          if (item.product.id === action.payload.id) {
            return { ...item, noOfProducts: item.noOfProducts - 1 };
          } else {
            return { ...item };
          }
        });
      }
      return {
        ...state,
        cartProducts: [...updateData],
      };
    }
    case CLEAR_CART: {
      return {
        ...state,
        cartProducts: [],
      };
    }
    default:
      return state;
  }
};

export default cartReducer;
