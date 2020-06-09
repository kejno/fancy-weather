import React, { Component, ReactNode } from 'react'

import { getBackgroundUrl, getCurrentLocation, getWeatherByAddress, getWeatherByCoords, ISOtoCountry, yandexTranslate, timeZone, covidToCountry } from './services'
import { IContext, IState } from './types'
import { Progress } from '../Progress'
import { initialCenterMap, Lang, Units, weatherUrl, forecastUrl } from '../../common/constants'

import './index.scss'

interface IProps { }

const defaultState: IState = {
    isLoading: false,
    error: null,
    currentLocation: initialCenterMap,
    place: null,
    city: null,
    country: null,
    weather: null,
    forecast: null,
    backgroundUrl: '',
    lang: localStorage.getItem('lang') ? localStorage.getItem('lang') : Lang.en,
    units: localStorage.getItem('units') ? localStorage.getItem('units') : Units.metric,
    timezone: null,
    currentCountry: null,
    covidInfo: null
}

export const WeatherContext = React.createContext<IContext>({
    store: defaultState,
    onAddressChange: (address: any) => null
});

export class Weather extends Component<IProps, IState> {

    state: IState = defaultState
    public componentDidMount(): void {
        this.fetchAll()
    }

    componentDidCatch(error: Error): void {
        this.setState({ error })
    }

    public fetchAll = async (place?: string): Promise<void> => {
        const { lang, units } = this.state
        this.setState({ isLoading: true })
        try {
            const currentLocation = await getCurrentLocation()
            const getWeather = (this.state.place || place)
                ? getWeatherByAddress((this.state.place || place), { lang, units }, weatherUrl)
                : getWeatherByCoords(currentLocation, { lang, units }, weatherUrl)
            const getForecast = (this.state.place || place)
                ? getWeatherByAddress((this.state.place || place), { lang, units }, forecastUrl)
                : getWeatherByCoords(currentLocation, { lang, units }, forecastUrl)

            try {
                const [weather, backgroundUrl, forecast] = await Promise.all([
                    getWeather,
                    getBackgroundUrl(),
                    getForecast,

                ])
                const [getFullCoutry] = await ISOtoCountry(weather.sys.country)
                const timezone = await timeZone(weather.coord.lat, weather.coord.lon)
                const currentCountry = await ISOtoCountry(weather.sys.country);
                const city = await yandexTranslate(weather.name, lang)
                const country = await yandexTranslate(getFullCoutry.name, lang)


                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                !place ? this.setState({ currentCountry: currentCountry[0].name }) : null

                const covidInfo = await covidToCountry(this.state.currentCountry);
                this.setState({ backgroundUrl, weather, currentLocation, forecast, city, country, timezone, covidInfo })
            } catch (err) {
                alert("ИЗВИНИТЕ, МЫ НЕ МОЖЕМ УЗНАТЬ ПОГОДУ ДЛЯ ЭТОГО ГОРОДА");
            }

        } catch (error) {
            this.setState({ error })
            console.error(error)
        } finally {
            this.setState({ isLoading: false })
        }
    }

    public handleLanguageChange = (lang: Lang) => {
        this.setState({ lang },
            () => {
                localStorage.setItem('lang', this.state.lang);
                this.fetchAll()
            })

    }

    public handleUnitsChange = (units: Units) => {
        this.setState({ units },
            () => {
                localStorage.setItem('units', this.state.units);
                this.fetchAll()
            })
    }

    public onClickReshreshButton = () => this.fetchAll()

    public handleAddressChange = (place: string) => this.setState({ place }, () => {
        const { place } = this.state
        if (place) {
            this.fetchAll(place)
        }
    })

    render(): ReactNode {
        const context: IContext = {
            store: this.state,
            onRefresh: this.onClickReshreshButton,
            onLangChange: this.handleLanguageChange,
            onUnitsChange: this.handleUnitsChange,
            onAddressChange: this.handleAddressChange
        }
        const { backgroundUrl, isLoading, error } = this.state

        if (error) {
            return <div>Something went wrong</div>
        }

        let containerStyle
        if (backgroundUrl) {
            containerStyle = { backgroundImage: `url(${backgroundUrl})` }
        }
        return (
            <WeatherContext.Provider value={context}>
                <div style={containerStyle} className="app-container">
                    {isLoading && <Progress />}
                    {this.props.children}
                </div>
            </WeatherContext.Provider>
        )
    }

}