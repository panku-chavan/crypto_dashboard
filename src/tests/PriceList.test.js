import React from "react"
import { render, fireEvent, cleanup, queryByText } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit'
import PriceList from "../components/Coin-prices-list/PriceList"
import coinsListReducer, { fetchCoinsList, selectCoinsList } from "../globalStates/coinsListSlice"
import baseCurrencyReducer from "../globalStates/baseCurrencySlice"

describe('PriceList component', () => {
    let store
    let component
    let getByText
    let container

    beforeEach(async () => {
        store = configureStore({
            reducer: {
                coinsList: coinsListReducer,
                baseCurrency: baseCurrencyReducer
            },
        })

        await store.dispatch(fetchCoinsList("USD"))

        component = render(
            <Provider store={store}>
                <PriceList />
            </Provider>)

        getByText = component.getByText
        container = component.container
    })

    afterEach(cleanup)


    it("should render elements", () => {
        expect(getByText("Cryptocurrencies by market cap")).toBeInTheDocument()
    })

    // checking for PriceListItem components, one thing it will have is "Mkt.Cap:" with numbers formatted according to currency 
    // In this test case I am checking the first element 
    it("should render PriceListItem", () => {
        if (store.getState().coinsList.list.length > 0) {
            const mktCapFirst = store.getState().coinsList.list[0].market_cap
            const text = `Mkt.Cap: ${Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(mktCapFirst)}`
            expect(getByText(text)).toBeInTheDocument()
        }
    })

})