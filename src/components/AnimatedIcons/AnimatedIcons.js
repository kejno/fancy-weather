import React, { useContext } from 'react'
import ReactAnimatedWeather from 'react-animated-weather';
import { WeatherContext } from '../Weather/Weather'

import './AnimatedIcons.css'



export const AnimatedIcons = (props) => {

    const db = {

        "01d": "CLEAR_DAY",
        "01n": "CLEAR_NIGHT",
        "02d": "PARTLY_CLOUDY_DAY",
        "02n": "PARTLY_CLOUDY_NIGHT",
        "03d": "CLOUDY",
        "03n": "CLOUDY",
        "04d": "CLOUDY",
        "04n": "CLOUDY",
        "09d": "RAIN",
        "09n": "RAIN",
        "10d": "RAIN",
        "10n": "RAIN",
        "11d": "RAIN",
        "11n": "RAIN",
        "13d": "SNOW",
        "13dn": "SNOW",
        "50d": "FOG",
        "50n": "FOG"
    }

    const context = useContext(WeatherContext);
    const { store } = context
    const { weather } = store

    const icon = weather.weather[0].icon;

    const options = {
        icon: db[icon],
        color: 'goldenrod',
        size: 100,
        animate: true
    };

    return (
        <div className="icon">
            <ReactAnimatedWeather
                icon={options.icon}
                color={options.color}
                size={props.size || options.size}
                animate={options.animate}
            />
        </div>

    )
};

