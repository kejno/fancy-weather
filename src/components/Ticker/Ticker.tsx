import React, { useContext } from 'react'
import { WeatherContext, IContext } from '../Weather'
import './Ticker.scss'



export const Ticker = () => {

    const context = useContext<IContext>(WeatherContext);
    const { store } = context
    const { covidInfo, currentCountry } = store
    const today = covidInfo ? covidInfo[1] : null
    const yestoday = covidInfo ? covidInfo[0] : null

    return (
        <div className="ticker-wrap">
            <div className="ticker">
                <div className="ticker__item">Covid-19 info for {`${currentCountry} : All ${today?.Confirmed}(+${today?.Confirmed - yestoday?.Confirmed})`}</div>
                <div className="ticker__item">Death: {`${today?.Deaths}(+${today?.Deaths - yestoday?.Deaths})`}</div>
                <div className="ticker__item">Recovered: {`${today?.Recovered}(+${today?.Recovered - yestoday?.Recovered})`}</div>
            </div>
        </div>
    )


}