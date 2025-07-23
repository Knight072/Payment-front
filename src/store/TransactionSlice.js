import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('transaction')) || {};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      Object.assign(state, action.payload);
      localStorage.setItem('transaction', JSON.stringify(state));
    },
    clearTransaction: (state) => {
      Object.keys(state).forEach(k => delete state[k]);
      localStorage.removeItem('transaction');
    },
  },
});
export const { setTransaction, clearTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
