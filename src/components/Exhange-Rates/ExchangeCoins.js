import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCoinsList, selectCoinsListStatus } from '../../globalStates/coinsListSlice'

const ExchangeCoins = () => {
    const coinsList = useSelector(selectCoinsList)
    const coinListStatus = useSelector(selectCoinsListStatus)
    const [exRate, setExRate] = useState(0)
    const [buyCoin, setBuyCoin] = useState(1)
    const [sellCoin, setSellCoin] = useState(1)
    const [amt, setAmt] = useState(0)

    const onChangeAmt = (e) => {
        setAmt(e.target.value)
    }

    const onChangeSellCoin = (e) => {
        setSellCoin(e.target.value)
    }

    const onChangeBuyCoin = (e) => {
        setBuyCoin(e.target.value)
    }

    const onClickExchange = () => {
        if (coinListStatus) {
            setExRate(((Number(sellCoin) / Number(buyCoin)) * Number(amt)).toFixed(2))
        }
    }

    return (
        <>
            <div className='mx-2 my-2 w-1/2 rounded-lg md:w-full bg-white shadow-lg'>
                <h2 className='text-xl font-bold mx-2 my-2'>Exchange Coins</h2>
                <div className='flex flex-col justify-center align-middle'>
                    <div className='mx-auto'>
                        <div className='flex flex-row w-80 justify-center'>
                            <p className='text-red-700 font-bold mx-2 my-2'>Sell</p>
                            <select name="coinSelectorSelling" className='bg-gray-100 rounded-sm mx-2 my-2 text-gray-800 font-semibold' onChange={onChangeSellCoin}>
                                {coinListStatus && coinsList.map(element => {
                                    return <option value={element.current_price} key={element.id}>{element.name}</option>
                                })}
                            </select>
                            <input type="number" className="rounded-md border w-full border-gray-300" name="enterAmount" value={amt} onChange={onChangeAmt} />
                        </div>
                        <div className='flex flex-row w-80 justify-between'>
                            <p className='text-green-700 font-bold mx-2 my-2'> Buy </p>
                            <select name="coinSelectorBuying" className='bg-gray-100 rounded-sm mx-2 my-2 text-gray-800 font-semibold' onChange={onChangeBuyCoin}>
                                {coinListStatus && coinsList.map(element => {
                                    return <option value={element.current_price} key={element.id}>{element.name}</option>
                                })}
                            </select>
                            <div name='exchangeRate' className='text-green-600 font-bold mx-2 my-2 w-full'>{exRate}</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center'>
                    <button name='Exchange' className='bg-blue-600 text-white font-bold p-2.5 rounded-lg my-3 shadow-sm shadow-blue-700 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-700' onClick={onClickExchange}>
                        Exchange
                    </button>
                </div>
            </div>
        </>
    )
}

export default ExchangeCoins