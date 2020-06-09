import React, { useContext } from 'react'
import { WeatherContext } from '../Weather'
import discWeather from '../../common/discWeather'

import './Coordinates.css'

export const Coordinates = () => {
    const context = useContext(WeatherContext);
    const { store } = context
    const { lang, currentLocation, place, weather } = store

    const coordinates = Object.values(place ? weather.coord : currentLocation);

    const coordName = [discWeather[lang].longitude, discWeather[lang].latitude]

    return (
        <div className="coordinates">

            {coordName.map((el, key) => {
                return (
                    <p key={key} className={'coordinates-' + el}>
                        {el}: {Math.floor(coordinates[key]) + '\u00b0' + Math.round((coordinates[key] - Math.floor(coordinates[key])) * 60) + '\''}
                    </p>
                )
            })}

        </div>

    )
}