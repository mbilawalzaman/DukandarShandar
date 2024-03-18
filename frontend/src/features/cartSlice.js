import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartData: JSON.parse(localStorage.getItem('cartData')) || [],
  cartTotalPrice: JSON.parse(localStorage.getItem('cartTotalPrice')) || [],
  quantity: JSON.parse(localStorage.getItem('quantity')) || 0,
  cartTotal: JSON.parse(localStorage.getItem('cartTotal')) || 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add_To_CART: (state, action) => {
      const existingProductIndex = state.cartData.findIndex(item => item.id === action.payload.id);
    
      if (existingProductIndex !== -1) {
        state.cartData[existingProductIndex].quantity += action.payload.quantity;
        state.cartTotalPrice[existingProductIndex] += action.payload.price * action.payload.quantity;
      } else {
        state.cartData.push(action.payload);
        state.cartTotalPrice.push(action.payload.price * action.payload.quantity);
      }
      localStorage.setItem('cartData', JSON.stringify(state.cartData));
      localStorage.setItem('cartTotalPrice', JSON.stringify(state.cartTotalPrice));
    },
    cart_total_price: (state, action) => {
      state.cartTotalPrice.push(action.payload);
      localStorage.setItem('cartTotalPrice', JSON.stringify(state.cartTotalPrice));
    },
    
    qtt: (state, action) => {
      state.quantity = action.payload;
      localStorage.setItem('quantity', JSON.stringify(state.quantity));
    },
    removeCartItem: (state, action) => {
      const indexToRemove = state.cartData.findIndex(item => item.id === action.payload.id);
      if (indexToRemove !== -1) {
        state.cartData.splice(indexToRemove, 1);
        state.cartTotalPrice.splice(indexToRemove, 1); // Remove corresponding price
        localStorage.setItem('cartData', JSON.stringify(state.cartData));
        localStorage.setItem('cartTotalPrice', JSON.stringify(state.cartTotalPrice));
      }
    },
    cartTotal: (state, action) => {
      state.cartTotal += action.payload;
      localStorage.setItem('cartTotal', JSON.stringify(state.cartTotal));
    },
  },
});

// Action creators are generated for each case reducer function
export const { add_To_CART, cart_total_price, qtt, removeCartItem, cartTotal } = cartSlice.actions;

export default cartSlice.reducer;