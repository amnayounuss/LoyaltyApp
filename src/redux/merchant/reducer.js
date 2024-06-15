import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const merchantSlice = createSlice({
    name: "merchant",
    initialState: {
        merchants: [],
    },
    reducers: {
        setMerchantList: ((state, action) => {
            state.merchants = action.payload;
        }),
    },
});
export const { setMerchantList } = merchantSlice.actions;
export const merchantReducer = merchantSlice.reducer;