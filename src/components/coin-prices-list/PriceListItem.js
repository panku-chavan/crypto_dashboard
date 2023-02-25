import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectBaseCurrency } from '../../globalStates/baseCurrencySlice'

const PriceListItem = (props) => {
  const baseCurrency = useSelector(selectBaseCurrency)

  return (
    <>
      <div className='flex flex-row justify-between mx-1 shadow-lg hover:shadow-xl bg-white rounded-lg my-1'>
        <div className="flex justify-start">
          <div className="mx-2 my-2 flex flex-col justify-center">
            <img src={props.image} alt={`${props.coinName}-photo`} srcSet="" className='h-10 min-w-2' />
          </div>
          <div className='mx-3 my-3'>
            <p className='font-bold text-gray-800'>{props.coinName}</p>
            <p className='text-gray-400'> Mkt.Cap: {Intl.NumberFormat('en-US', { style: 'currency', currency: baseCurrency.currency }).format(props.coinMarketCap)} </p>
          </div>
        </div>
        <div className='flex flex-col justify-center'>

        
        {props.percentageChange > 0 && <div className='mx-4 flex flex-row align-center font-bold text-green-600'>
          <div className="before:content-['▲'] border-green-600 mx-1">
          </div>
          <div>
            {props.percentageChange.toFixed(4)} %
          </div>
        </div>}
        {props.percentageChange < 0 && <div className='mx-4 flex flex-row align-center font-bold text-red-500'>
          <div className="before:content-['▼'] border-red-500 mx-1">
          </div>
          <div>
            {props.percentageChange.toFixed(3)} %
          </div>
        </div>}
        </div>
      </div>
    </>
  )
}

export default PriceListItem