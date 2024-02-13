import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  checkOutShippingData:[],
  checkOutNameAndAddress:[],
  orderId:""
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    checkOutShippingData : (state , action) => {
        state.checkOutShippingData.push(action.payload)
    },
    NameAndAddressfunction : (state , action) => {
      state.checkOutNameAndAddress.push(action.payload)
  },
  order_Id : (state , action) => {
    state.orderId = action.payload
}
  }
})

// Action creators are generated for each case reducer function
export const { checkOutShippingData, NameAndAddressfunction, order_Id } = checkoutSlice.actions

export default checkoutSlice.reducer