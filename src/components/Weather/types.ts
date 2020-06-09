import { Lang, Units } from '../../common/constants'

export interface ICoords {
    lat: number
    lon: number
}

export interface IState {
    isLoading: boolean
    error: Error | null
    currentLocation: ICoords | null
    place: string | null
    city: string | null
    country: string | null
    weather: any
    forecast: any
    backgroundUrl: string
    lang: any
    units: any
    timezone: any
    currentCountry: any
    covidInfo: any
}

export interface IContext {
    [x: string]: any;
    store: IState
    onRefresh?: () => void
    onLangChange?: (lang: Lang) => void
    onUnitsChange?: (units: Units) => void
    onAddressChange: (address: string) => void
}