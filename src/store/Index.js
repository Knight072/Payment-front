import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './ProductsSlice';
import transactionReducer from './TransactionSlice.js';
import customerReducer from './CustomerSlice';
import deliveryReducer from './DeliverySlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    transaction: transactionReducer,
    customer: customerReducer,
    delivery: deliveryReducer,
  },
});
