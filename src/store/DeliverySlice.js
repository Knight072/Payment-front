import { createSlice } from '@reduxjs/toolkit';

const deliverySlice = createSlice({
  name: 'delivery',
  initialState: {},
  reducers: {
    setDelivery: (state, action) => Object.assign(state, action.payload),
    clearDelivery: (state) => Object.keys(state).forEach(k => delete state[k]),
  },
});
export const { setDelivery, clearDelivery } = deliverySlice.actions;
export default deliverySlice.reducer;
