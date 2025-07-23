import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {},
  reducers: {
    setCustomer: (state, action) => Object.assign(state, action.payload),
    clearCustomer: (state) => Object.keys(state).forEach(k => delete state[k]),
  },
});
export const { setCustomer, clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;
