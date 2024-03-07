import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartData: JSON.parse(localStorage.getItem('cartData')) || [],
  cartTotalPrice: JSON.parse(localStorage.getItem('cartTotalPrice')) || [],
  quantity: JSON.parse(localStorage.getItem('quantity')) || 0,
  cartTotal: JSON.parse(localStorage.getItem('cartTotal')) || 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add_To_CART: (state, action) => {
      state.cartData.push(action.payload)
      localStorage.setItem('cartData', JSON.stringify(state.cartData))
    },
    cart_total_price: (state, action) => {
      state.cartTotalPrice.push(action.payload)
      localStorage.setItem('cartTotalPrice', JSON.stringify(state.cartTotalPrice))
    },
    qtt: (state, action) => {
      state.quantity = action.payload
      localStorage.setItem('quantity', JSON.stringify(state.quantity))
    },
    removeCartItem: (state, action) => {
      state.cartData.splice(action.payload, 1)
      localStorage.setItem('cartData', JSON.stringify(state.cartData))
    },
    cartTotal: (state, action) => {
      state.cartTotal += action.payload
      localStorage.setItem('cartTotal', JSON.stringify(state.cartTotal))
    },
  }
})

// Action creators are generated for each case reducer function
export const { add_To_CART, cart_total_price, qtt, removeCartItem, cartTotal } = cartSlice.actions

export default cartSlice.reducer