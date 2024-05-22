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
  paymentTypeId?: number;
  fetchDataPaymentTypes: boolean;
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentTypes: [],
    fetchDataPaymentTypes: true,
    paymentTypeId: undefined,
  } as PaymentSlice,
  reducers: {
    setPaymentTypes(state, action) {
      state.paymentTypes = action.payload.data;
      state.fetchDataPaymentTypes = false;
    },
    setPaymentTypeId(state, action) {
      state.paymentTypeId = action.payload.id;
    },
  },
});

export const { setPaymentTypes, setPaymentTypeId } = paymentSlice.actions;

export default paymentSlice.reducer;
