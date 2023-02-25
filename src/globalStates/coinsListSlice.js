import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    status: "idle",
    error: null
}

export const fetchCoinsList = createAsyncThunk('coinsList/fetchCoinsList', async (currBaseCurrency) => {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currBaseCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
    const data = await response.json()
    return data
})

export const coinsListSLice = createSlice({
    name: 'coinsList',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCoinsList.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCoinsList.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
            })
            .addCase(fetchCoinsList.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase('baseCurrency/baseCurrencyChanged', (state, action) => {
                state.status= 'idle'
                state.list = []
            })
    }
})

export const selectCoinsList = (state) => state.coinsList.list;
export const selectCoinsListStatus = (state) => state.coinsList.status;

export default coinsListSLice.reducer



