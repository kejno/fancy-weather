import React, { useContext } from 'react';
import moment from 'moment-timezone'
import { WeatherContext, IContext } from '../Weather'
import Clock from '../Clock/Clock.js'


import 'moment/locale/ru';
import 'moment/locale/be';

import './TimeLocation.css'

export const TimeLocation = () => {

    const context = useContext<IContext>(WeatherContext);
    const { store } = context
    const { lang, timezone } = store
    localStorage.getItem('lang') ? localStorage.getItem('lang') :
        moment.locale(lang)

    return (
        <div className="time-location">
            {
                moment().tz(timezone).format('dddd D MMMM YYYY')
            }
            <Clock />
        </div>
    )
}


