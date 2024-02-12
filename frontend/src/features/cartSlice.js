import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartData : [],
  cartTotalPrice: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add_To_CART : (state , action) => {
        state.cartData.push(action.payload)

    },
    cart_total_price : (state , action) => {
      state.cartTotalPrice.push(action.payload)
  },
    
  },
})

// Action creators are generated for each case reducer function
export const { add_To_CART , cart_total_price} = cartSlice.actions

export default cartSlice.reducer