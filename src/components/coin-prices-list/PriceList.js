import React, { useEffect, useRef } from 'react'
import PriceListItem from './PriceListItem'
import { fetchCoinsList, selectCoinsListStatus } from '../../globalStates/coinsListSlice'
import { selectCoinsList } from '../../globalStates/coinsListSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectBaseCurrency } from '../../globalStates/baseCurrencySlice'

export const PriceList = () => {
    const effectRan = useRef(false)
    const dispatch = useDispatch()
    const baseCurrency = useSelector(selectBaseCurrency)
    const coinsListStatus = useSelector(selectCoinsListStatus)
    const coinsList = useSelector(selectCoinsList)

    useEffect(() => {
        if (!effectRan.current) {
            if (coinsListStatus === "idle") {
                dispatch(fetchCoinsList(baseCurrency.currency.toLowerCase()))
            }
        }
        return () => {}
    }, [coinsListStatus])

    return (
        <>
            <div className='bg-white mx-2 my-2 rounded-lg h-[85.5vh] md:h-auto overflow-y-auto no-scrollbar'>
                <h1 className='text-xl font-bold text-gray-700 bg-white mx-4 my-2 px-1 py-1 rounded-lg'>Cryptocurrencies by market cap</h1>
                {coinsList ?
                    <div className='flex flex-col'>
                        {coinsList.map(elem => {
                            return <PriceListItem
                                key={elem.symbol} coinName={elem.name}
                                coinMarketCap={elem.market_cap} percentageChange={elem.market_cap_change_percentage_24h} image={elem.image} />
                        })}
                    </div> : null}
            </div>
        </>
    )
}

