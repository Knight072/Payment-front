import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProducts: (state, action) => action.payload,
    updateStock: (state, action) => {
      const { id, newStock } = action.payload;
      const prod = state.find((p) => p.id === id);
      if (prod) prod.stock = newStock;
    },
  },
});
export const { setProducts, updateStock } = productsSlice.actions;
export default productsSlice.reducer;
