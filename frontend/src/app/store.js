import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cartSlice';
import checkoutReducder from '../features/checkoutSlice';



export const store = configureStore({
  reducer: {cart : cartReducer, checkout: checkoutReducder}
});
