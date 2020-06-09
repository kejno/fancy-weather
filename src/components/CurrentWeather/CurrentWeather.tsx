import React, { useContext } from 'react';
import { WeatherContext, IContext } from '../Weather'
import { TimeLocation } from '../TimeLocation/TimeLocation'
import weatherBy from '../../common/weatherBy'
import discWeather from '../../common/discWeather'

import './CurrentWeather.css'
import { AnimatedIcons } from '../AnimatedIcons/AnimatedIcons';

export const CurrentWeather = () => {

    const context = useContext<IContext>(WeatherContext);
    const { store } = context
    const { lang, weather, city, country } = store

    if (weather) {

        return (
            <div className="weather-container">
                <div className="weather-location">{city + ', ' + country}</div>
                <TimeLocation />
                <div className="weather-temperature__today">{Math.round(weather.main.temp) + '\u00b0'}</div>
                <div className="weather-icon"><AnimatedIcons /></div>
                <div className="weather-description">
                    <div className="weather-description__main" data-i18n="description.main">
                        {lang === 'BE' ? weatherBy.weather[weather.weather[0].id] : weather.weather[0].description}
                    </div>
                    <div className="weather-description__feels-like" data-i18n="feels">
                        {discWeather[lang].feels}: {Math.round(weather.main.feels_like) + '\u00b0'}
                    </div>
                    <div className="weather-description__wind-speed" data-i18n="wind">
                        {discWeather[lang].wind}: {Math.round(weather.wind.speed)}m/s
                    </div>
                    <div className="weather-description__humidity" data-i18n="humidity">
                        {discWeather[lang].humidity}: {Math.round(weather.main.humidity)}%
                    </div>
                </div>
            </div >
        )
    }
    return null;


}