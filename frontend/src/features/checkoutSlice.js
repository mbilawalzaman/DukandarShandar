import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  checkOutShippingData:[]
}

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    checkOutShippingData : (state , action) => {
        state.checkOutShippingData.push(action.payload)

    }
  }
})

// Action creators are generated for each case reducer function
export const { checkOutShippingData } = checkoutSlice.actions

export default checkoutSlice.reducer