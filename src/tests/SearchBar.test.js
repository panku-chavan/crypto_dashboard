import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import currentCoinSlice from '../globalStates/currentCoinSlice'
import SearchBar from '../components/Price-chart/SearchBar'

describe('SearchBar Component', () => {
    let store
    let component
    let SearchButton
    let InputArea
    let SearchModal

    beforeEach(() => {
        store = configureStore({
            reducer: {
                currentCoin: currentCoinSlice.reducers
            }
        })

        component = render(
            <Provider store={store}>
                <SearchBar />
            </Provider>
        )

        SearchButton = component.container.getElementsByTagName('button')[0]
        InputArea = component.container.getElementsByTagName('input')[0]
        SearchModal = component.container.querySelector("[name='searchModal']")
    })

    it("Should set the showSearchModal to true if Search Button is clicked", async () => {
        // fireEvent.change(InputArea, { target: { value: "BTC" } })
        // fireEvent.click(SearchButton)
        // const { getByPlaceholderText, getByText, getByTestId } = component
        // expect(getByText('/Search Results/')).toBeInTheDocument()
    })
})