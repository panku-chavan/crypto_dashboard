import { configureStore } from "@reduxjs/toolkit";
import baseCurrenyReducer from '../globalStates/baseCurrencySlice'
import coinsListReducer from '../globalStates/coinsListSlice'
import currencyChartDataReducer from '../globalStates/currencyChartDataSlice'
import currentCoinReducer from "../globalStates/currentCoinSlice"

export const store = configureStore({
    reducer: {
        baseCurrency: baseCurrenyReducer,
        coinsList: coinsListReducer,
        currencyChartData: currencyChartDataReducer,
        currentCoin: currentCoinReducer
    }
})