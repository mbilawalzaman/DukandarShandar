import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  checkOutShippingData:[],
  checkOutNameAndAddress:[]
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
  }
  }
})

// Action creators are generated for each case reducer function
export const { checkOutShippingData, NameAndAddressfunction } = checkoutSlice.actions

export default checkoutSlice.reducer