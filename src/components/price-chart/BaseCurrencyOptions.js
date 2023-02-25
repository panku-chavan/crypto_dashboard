import React from 'react'
import { useDispatch } from 'react-redux' 
import { baseCurrencyChanged } from '../../globalStates/baseCurrencySlice'

const BaseCurrencyOptions = () => {
  const dispatch = useDispatch()

  const onClickBaseCurrencyChanged = (e) => {
    dispatch(baseCurrencyChanged(e.target.value)) 
  }

  return (
    <div className='mx-3 my-2'>
    <select name='currencySelector' className='p-2 font-bold rounded-lg' onChange={onClickBaseCurrencyChanged} >
        <option className='p-2 font-bold rounded-lg text-gray-600' value="USD" >USD</option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="INR" >INR</option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="EUR" >EUR</option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="GBP" >GBP</option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="CNY" >CNY</option>
        <option className='p-2 font-bold rounded-lg text-gray-600' value="JPY" >JPY</option>
    </select>
    </div>
  )
}

export default BaseCurrencyOptions