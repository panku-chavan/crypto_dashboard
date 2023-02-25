import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    currency: "USD"
}

export const baseCurrencySlice = createSlice({
    name: 'baseCurrency',
    initialState,
    reducers: {
        baseCurrencyChanged: (state, action) => {
            state.currency = action.payload
        }
    },
})

export const selectBaseCurrency = (state) => state.baseCurrency

export const { baseCurrencyChanged } = baseCurrencySlice.actions

export default baseCurrencySlice.reducer

// write test case to check whether a component is dispatching changes to redux store made with @reduxjs/toolkit and test case should be according to @testing-library/react. and mock store is also made up with @reduxjs/toolkit