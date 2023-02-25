import { configureStore } from "@reduxjs/toolkit";
import { baseCurrencySlice } from "../globalStates/baseCurrencySlice";
import { coinsListSLice, fetchCoinsList } from "../globalStates/coinsListSlice";
import { currentCoinSlice } from "../globalStates/currentCoinSlice";
import { currencyChartDataSlice, fetchCoinData, reFetch } from "../globalStates/currencyChartDataSlice"

let store
beforeEach(() => {
    // creating a mock store before each test case. 
    store = configureStore({
        reducer: {
            baseCurrency: baseCurrencySlice.reducer,
            currentCoin: currentCoinSlice.reducer,
            coinsList: coinsListSLice.reducer,
            currencyChartData: currencyChartDataSlice.reducer
        },
    });
});

//testing baseCurrency
describe("baseCurrencySlice", () => {

    it("should change the currency", () => {

        // making sure the initial state is as defined
        expect(store.getState().baseCurrency.currency).toEqual("USD")

        // dispatching
        store.dispatch(baseCurrencySlice.actions.baseCurrencyChanged("EUR"));

        // Check that the state was updated correctly
        expect(store.getState().baseCurrency.currency).toEqual("EUR");
    });
});

//tesing currentCoin
describe("currentCoinSlice", () => {
    it("should change the current coin in consideration", () => {
        store.dispatch(currentCoinSlice.actions.coinChange({ coinName: "Bitcoin", coinID: "bitcoin" }))

        // checking whether state was updated correctly
        expect(store.getState().currentCoin).toEqual({ coinName: "Bitcoin", coinID: "bitcoin" })
    })
})

//testing coinsList
describe("coinsListSlice", () => {

    // making sure the initial state is as defined
    it("should fetch the coins list according to the baseCurrency and status should become idle when baseCurrency is changed", async () => {
        expect(store.getState().coinsList).toEqual({
            list: [],
            status: "idle",
            error: null
        })

        await store.dispatch(fetchCoinsList(store.getState().baseCurrency.currency))

        expect(store.getState().coinsList.status).toEqual("succeeded")

        // for the list it is difficult to foresee what the actual list will be, but as stated in api its size should be 100, so I'll check exactly that
        expect(store.getState().coinsList.list.length).toEqual(100)

        // Now, I'll change the baseCurrency and expect coinsList status to be 'idle'.
        store.dispatch(baseCurrencySlice.actions.baseCurrencyChanged("EUR"))
        expect(store.getState().coinsList.status).toEqual("idle")
    })
})

// testing currencyChartData
describe("currencyChartDataSlice", () => {

    it("Should fetch the current coin's chart data and status should become idle and list empty when 'reFetch' is dispathced", async () => {
        // testing intial state
        expect(store.getState().currencyChartData).toEqual({
            list: [],
            status: 'idle',
            error: null
        })

        // dispatching asynchronous function. 
        await store.dispatch(fetchCoinData(["bitcoin", "usd", "1"]))

        // checking state after 
        expect(store.getState().currencyChartData.status).toEqual('succeeded')

        // as in coinsList I will simply check if the list's length is greater than 0 or not. 
        expect(store.getState().currencyChartData.list.length).toBeGreaterThan(0)

        // Testing 'reFetch'
        store.dispatch(currencyChartDataSlice.actions.reFetch())
        expect(store.getState().currencyChartData.status).toEqual('idle')
        expect(store.getState().currencyChartData.list).toEqual([])
    })
})



