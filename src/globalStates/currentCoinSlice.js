import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coinName: "Bitcoin",
    coinID: "bitcoin"
}

export const currentCoinSlice = createSlice({
    name: "currentCoin",
    initialState,
    reducers: {
        coinChange: (state, action) => {
            state.coinName = action.payload.coinName
            state.coinID = action.payload.coinID
        }
    }
})

export default currentCoinSlice.reducer
export const { coinChange } = currentCoinSlice.actions
export const selectCurrentCoin = (state) => state.currentCoin
