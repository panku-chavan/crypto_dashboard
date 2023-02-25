import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BaseCurrencyOptions from './BaseCurrencyOptions'
import SearchBar from './SearchBar'
import { Line, Bar } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import { selectBaseCurrency } from '../../globalStates/baseCurrencySlice'
import { selectCoinsList } from '../../globalStates/coinsListSlice'
import { selectChartList, selectChartListStatus, fetchCoinData, reFetch } from '../../globalStates/currencyChartDataSlice'
import { coinChange, selectCurrentCoin } from '../../globalStates/currentCoinSlice'

export const PriceChart = () => {
  const baseCurrency = useSelector(selectBaseCurrency)
  const coinsList = useSelector(selectCoinsList)
  const chartList = useSelector(selectChartList)
  const chartListStatus = useSelector(selectChartListStatus)
  const currentCrypto = useSelector(selectCurrentCoin)
  const dispatch = useDispatch()

  const [timehorizon, setTimeHorizon] = useState("1")
  const [chartType, setChartType] = useState("Line Chart")

  const onClickChangeTimeHorizon = (e) => {
    setTimeHorizon(e.target.value)
    dispatch(reFetch())
  }

  useEffect(() => {
    if (chartListStatus === 'idle') {
      dispatch(fetchCoinData([currentCrypto.coinID, baseCurrency.currency.toLowerCase(), timehorizon.toString()]))
    }

    return () => {}
  }, [chartListStatus, timehorizon])

  const currencyData = { 
    labels: chartList.map((data) => data[0]),
    datasets: [{
        label: `Price in ${baseCurrency.currency}`,
        data: chartList.map((data) => data[1]),
        backGroundColor: 'rgb(33, 76, 194)',
        tension: 0.1,
        pointStyle: false,
      }],
  }

  return (
    <>
      <div className='flex flex-row '>
        <BaseCurrencyOptions />
        <SearchBar />
      </div>
      <div className="bg-white rounded-lg h-96 md:h-auto mx-3 my-2">
        <div className="flex flex-row md:flex-col-reverse">
          <div className="flex flex-row w-4/6 md:w-full justify-center">

            {[["1D",1], ["1W", 7], ["1M", 30], ["6M", 180], ["1Y", 365]].map((element, index) => {
              return <button key={index}
                className={timehorizon === String(element[1]) ? 'bg-gray-100 border font-semibold rounded-md px-2 py-1 mx-1 my-1 border-blue-500 text-blue-500' : 'bg-gray-100 border font-semibold rounded-md px-2 py-1 mx-1 my-1'}
                onClick={onClickChangeTimeHorizon} value={element[1]}>
                {element[0]}
              </button>
            })}

          </div>
          <div className="flex flex-row  justify-center">
            <select id="coinSelector"
            data-testid = "coinSelector"
            className='px-2 mx-1 my-1 font-semibold text-sm bg-gray-100 rounded-md no-scrollbar' 
            onChange={(e) => {
              const data = e.target.value.split("+")
              dispatch(coinChange({coinName: data[1], coinID: data[0]}))
            }}>
              {coinsList.map((element, index) => {
                return <option key={index} 
                className="bg-gray-100 text-gray-500 font-semibold my-1"
                value={`${element.id}+${element.name}`}
                >
                  {element.name}
                </option>
              })}

            </select>
            <select  id="chartSelector" data-testid = "chartSelector" className='px-2 mx-1 my-1 font-semibold text-sm bg-gray-100 rounded-md' onChange={(e) => { setChartType(e.target.value) }}>

              {["Line Chart", "Bar Chart Vertical", "Bar Chart Horizontal"].map((element, index) => {
                return <option key={index} className="bg-gray-100 text-gray-500 font-semibold my-1 hover:bg-gray-200" value={element}>{element}</option>
              })}
            </select>
          </div>

        </div>

        <div className="flex flex-row justify-between">
          <p className='mx-3 font-semibold'>{baseCurrency.currency}</p>
          <p className='mx-3 font-semibold'>{currentCrypto.coinName}</p>
        </div>

        <div className='py-1 px-1 h-5/6 flex flex-col justify-center w-auto' data-testid="thediv">
          {chartType === "Line Chart" && <Line options={{ maintainAspectRatio: false }} data={currencyData} data-testid="line-chart" />}

          {chartType === "Bar Chart Vertical" && <Bar options={{ maintainAspectRatio: false }} data={currencyData} data-testid = "bar-chart" />}

          {chartType === "Bar Chart Horizontal" && <Bar options={
            { maintainAspectRatio: false,
              indexAxis: 'y'
          }} data={currencyData} data-testid = "bar-chart-horizontal"/>}
        </div>
      </div>
    </>
  )
}

