import React, {useState} from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto";
import {data as coinsData} from "./Data"

const Portfolio = () => {
  
  const [chartData, setChartData] = useState({
    labels: coinsData.map((data) => data.name),
    datasets:[
      {
        label: "Portfolio",
        data: coinsData.map((data) => data.amount_invested),
        backgroundColor : [
          "rgb(93, 76, 194, 0.7)",
          "rgb(46, 72, 143, 0.7)",
          "rgb(28, 137, 345, 0.7)"
        ]
      }
    ]
  })

  return (
    <>
      <div className='mx-2 my-2 w-1/2 bg-white md:w-full rounded-lg px-2 py-2 shadow-lg'>

        <div className="flex flex-row justify-between font-bold">
          <h2 className="font-sans text-xl mx-2">Portfolio</h2>
          <p className=' text-gray-400'>Total Value: $1000</p>
        </div>
        <div id="Portfolio-pie-chart" className='h-40 flex flex-col'>
          <Pie options={{ maintainAspectRatio: false }} data={chartData}/>
        </div>
      </div>
    </>
  )
}

export default Portfolio