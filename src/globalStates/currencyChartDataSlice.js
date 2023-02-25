import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    list: [],
    status: 'idle',
    error: null
}

export const fetchCoinData = createAsyncThunk('currencyChartData/fetchCoinData', async (info) => {
    const [cryptoID, baseCurr, timeFrame] = info    //destructuring array
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    if (timeFrame === "1") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=1&interval=hourly`)
        const data = await response.json()
        const dataArray = data.prices.slice(1, 25)

        const result = dataArray.map(element => {
            const date = new Date(element[0])
            element[0] = `${date.toLocaleTimeString()}`
            element[1] = element[1].toFixed(2)
            return [element[0], Number(element[1])]
        })
        return result
    }

    else if (timeFrame === "7") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=7&interval=daily`)
        const data = await response.json()
        const dataArray = data.prices.slice(0, 7)

        const result = dataArray.map(element => {
            const date = new Date(element[0])
            element[0] = weekDays[date.getDay()]
            element[1] = element[1].toFixed(2)
            return [element[0], Number(element[1])]
        })
        return result
    }
    else if (timeFrame === "30") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=30&interval=daily`)
        const data = await response.json()
        const dataArray = data.prices.slice(1, 31)

        const result = dataArray.map(element => {
            const date = new Date(element[0])
            element[0] = `${date.toDateString().split(" ")[1]}` + ` ${date.toDateString().split(" ")[2]}`
            element[1] = element[1].toFixed(2)
            return [element[0], Number(element[1])]
        })
        return result
    }
    else if (timeFrame === "180") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=180&interval=monthly`)
        const data = await response.json()
        const dataArray = data.prices.slice(1, 181)

        const result = dataArray.filter((element, index) => {
            return index % 30 === 0
        }).map(element => {
            const date = new Date(element[0])
            return [months[date.getMonth()], Number(element[1].toFixed(2))]
        })

        return result
    }
    else if (timeFrame === "365") {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoID}/market_chart?vs_currency=${baseCurr}&days=365`)
        const data = await response.json()
        const dataArray = data.prices.slice(1, 366)

        const result = dataArray.filter((element, index) => {
            return index % 30 === 0
        }).map(element => {
            const date = new Date(element[0])
            return [months[date.getMonth()], Number(element[1].toFixed(2))]
        })

        return result.slice(1, 13)
    }
    else {
        return []
    }
})

export const currencyChartDataSlice = createSlice({
    name: 'currencyChartData',
    initialState,
    reducers: {
        reFetch: (state, action) => {
            state.list = []
            state.status = 'idle'
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchCoinData.pending, (state, action) => {
                state.status = 'pending'
            })
            .addCase(fetchCoinData.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.list = action.payload
                // console.log(state.list)
            })
            .addCase(fetchCoinData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase('baseCurrency/baseCurrencyChanged', (state, action) => {
                state.status = 'idle'
                state.list = []
            })
            .addCase('currentCoin/coinChange', (state,action) => {
                state.status = 'idle'
                state.list = []
            })
    }
})

export const selectChartList = (state) => state.currencyChartData.list;
export const selectChartListStatus = (state) => state.currencyChartData.status;

export const { reFetch } = currencyChartDataSlice.actions

export default currencyChartDataSlice.reducer