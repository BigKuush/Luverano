import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
    shippingType: 'free' | 'express';
    shippingPrice: number;
}

const initialState: OrderState = {
    shippingType: 'free',
    shippingPrice: 0,
};

const OrderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setShippingType: (state, action) => {
            state.shippingType = action.payload;
            state.shippingPrice = action.payload === 'express' ? 5000 : 0;
        },
    },
});

export const { setShippingType } = OrderSlice.actions;
export default OrderSlice.reducer;
