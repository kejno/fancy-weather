/* eslint-disable jsx-a11y/alt-text */
import React, { useContext } from 'react'
import { WeatherContext, IContext } from '../Weather'
import { AnimatedIcons } from '../AnimatedIcons/AnimatedIcons'
import moment from 'moment'

import './ForecastWeather.css'

export const ForecastWeather = () => {

    const context = useContext<IContext>(WeatherContext);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions

    const { store } = context
    const { forecast } = store
    let forecastThreeDay: number[] = [];
    let res = 0;
    if (forecast) {
        for (let i = 4; i < 12; i++) {
            res += forecast.list[i].main.temp
        }
        forecastThreeDay.push(Math.round(res / 8))
        res = 0;
        for (let i = 12; i < 20; i++) {
            res += forecast.list[i].main.temp
        }
        forecastThreeDay.push(Math.round(res / 8))
        res = 0;
        for (let i = 20; i < 28; i++) {
            res += forecast.list[i].main.temp
        }
        forecastThreeDay.push(Math.round(res / 8))
        res = 0;
    }

    if (!forecast) {
        return null
    }

    return (
        <div className="forecast-container">
            {forecastThreeDay.map((el, key) => {
                return (
                    <div className="forecast-wrapp" key={key}>
                        <div className="forecast-day">
                            {moment().add(key + 1, 'd').format('dddd')}
                        </div>
                        <div className="forecast-temperature">
                            {forecastThreeDay[key] + '\u00b0'}
                        </div>
                        <div className="forecast-icon" >
                            <AnimatedIcons size={75} />
                        </div>
                    </div>
                )
            })}

        </div>
    )


}