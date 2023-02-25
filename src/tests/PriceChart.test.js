import React from "react";
import { render, fireEvent, waitFor, screen, getByRole, cleanup } from "@testing-library/react"
import { Provider } from "react-redux"
import { configureStore } from '@reduxjs/toolkit'
import coinsListReducer, { fetchCoinsList } from "../globalStates/coinsListSlice"
import currentCoinReducer, { coinChange } from "../globalStates/currentCoinSlice"
import currencyChartDataReducer, { fetchCoinData } from "../globalStates/currencyChartDataSlice"
import baseCurrencyReducer from "../globalStates/baseCurrencySlice"
import PriceChart from "../components/Price-chart/PriceChart";
import '@testing-library/jest-dom/extend-expect';

describe('PriceChart Componenent', () => {
    let store
    let component
    let getByText
    let coinSelectorElement
    let paragraphElement
    let lineChart
    let chartSelector

    beforeAll(async () => {
        store = configureStore({
            reducer: {
                coinsList: coinsListReducer,
                baseCurrency: baseCurrencyReducer,
                currentCoin: currentCoinReducer,
                currencyChartData: currencyChartDataReducer
            },
        })

        await store.dispatch(fetchCoinsList("USD"))
        await store.dispatch(fetchCoinData(["bitcoin", "usd", "1"]))

        component = render(<Provider store={store}>
            <PriceChart />
        </Provider>)

        coinSelectorElement = component.getByTestId("coinSelector")
        getByText = component.getByText
        paragraphElement = component.container.querySelectorAll("p")
        lineChart = component.getByTestId("line-chart")
        // barChart = component.getByTestId("bar-chart")
        // barChartHorizontal = component.getByTestId("bar-chart-horizontal")
        chartSelector = component.getByTestId("chartSelector")
    })

    afterAll(cleanup)

    it("should render current baseCurrency, current coin", () => {
        expect(paragraphElement[0]).toHaveTextContent("USD")
        expect(paragraphElement[1]).toHaveTextContent("Bitcoin")
    })

    it("should change and dispatch coins upon selecting different options from coins list", async () => {
        coinSelectorElement.addEventListener('change', (e) => {
            const data = e.target.value.split("+")
            store.dispatch(coinChange({ coinName: data[1], coinID: data[0] }))
        })
        fireEvent.change(coinSelectorElement, { target: { value: 'ethereum+Ethereum' } })
        expect(coinSelectorElement.value).toBe("ethereum+Ethereum")
        expect(store.getState().currentCoin.coinName).toBe('Ethereum')
    })

    it("should render charts and change when selecting different chart options", async () => {
        setTimeout(() => {
            expect(lineChart).toBeInTheDocument()

            // changing chart type to bar chart
            fireEvent.change(chartSelector, {target: {value: 'Bar Chart Vertical'}})
            const barChart = component.getByTestId("bar-chart")
            expect(lineChart).not.toBeInTheDocument()
            expect(barChart).toBeInTheDocument()

            // changing chart type of bar chart horizontal
            fireEvent.change(chartSelector, {target: {value: 'Bar Chart Horizontal'}})
            const barChartHorizontal = component.getByTestId('bar-chart-horizontal')
            expect(barChart).not.toBeInTheDocument()
            expect(barChartHorizontal).toBeInTheDocument()
        }, 1000)
    })
})