import React, { useRef } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import { Controls, Weather } from '../'
import { CurrentWeather } from '../CurrentWeather/CurrentWeather'
import { theme } from '../../theme'
import { googleMapsUrl, loadScript } from '../../common'
import { MainContainer } from '../MainContainer/MainContainer'
import { ForecastWeather } from '../ForecastWeather/ForecastWeather'
import { YdMap } from '../YdMap/YdMap'
import { Coordinates } from '../Coordinates/Coordinates'
import { Ticker } from '../Ticker/Ticker'

import './styles.css'

function App() {
    const loaded = useRef(false)

    if (typeof window !== 'undefined' && !loaded.current) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                googleMapsUrl,
                document.querySelector('head'),
                'google-maps',
            );
        }
        loaded.current = true
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Weather>
                    <Controls />
                    <MainContainer>
                        <CurrentWeather />
                        {<ForecastWeather />}
                        <YdMap />
                        <Coordinates />
                    </MainContainer>
                    <Ticker />
                </Weather>
            </div>
        </ThemeProvider>
    )
}

export default App
