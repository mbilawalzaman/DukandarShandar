import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartData : []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add_To_CART : (state , action) => {
        state.cartData.push(action.payload)

    }
    
  },
})

// Action creators are generated for each case reducer function
export const { add_To_CART } = cartSlice.actions

export default cartSlice.reducer