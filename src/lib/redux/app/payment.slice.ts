import { createSlice } from '@reduxjs/toolkit';

interface PaymentType {
  id: number;
  name: string;
  status: string;
  slug: string;
  minimum: number;
  maximum: number;
  image: string;
}
interface PaymentSlice {
  paymentTypes: PaymentType[];
  fetchDataPaymentTypes: boolean;
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentTypes: [],
    fetchDataPaymentTypes: true,
  } as PaymentSlice,
  reducers: {
    setPaymentTypes(state, action) {
      state.paymentTypes = action.payload.data;
      state.fetchDataPaymentTypes = false;
    },
  },
});

export const { setPaymentTypes } = paymentSlice.actions;

export default paymentSlice.reducer;
