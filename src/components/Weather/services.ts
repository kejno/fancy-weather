import { Lang, Units, unsplashUrl } from '../../common/constants'
import moment from 'moment-timezone'
import { ICoords } from './types'
import { TIME_ZONE_DB } from '../../common/constants'

interface IOptions {
    units: Units
    lang: Lang
}

export const getWeatherByCoords = async ({ lat, lon }: ICoords, options: IOptions, urlData: any): Promise<void> => {
    const { units, lang } = options
    const url = `${urlData}&lat=${lat}&lon=${lon}&units=${units}&lang=${lang.toLowerCase()}`
    try {
        const json = await fetch(url)
        return (await json.json())
    } catch (error) {
        console.error(error)
    }
}

export const getWeatherByAddress = async (place: any, options: IOptions, urlData: any): Promise<void> => {
    const { units, lang } = options
    const url = `${urlData}&q=${place}&units=${units}&lang=${lang.toLowerCase()}`
    try {
        const json = await fetch(url)
        return (await json.json())
    } catch (error) {
        console.error(error)
    }
}

export const getCurrentLocation = (): Promise<ICoords> =>
    new Promise((resolve, reject) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude: lat, longitude: lon } = position.coords
                resolve({ lon, lat })
            }, (error) => reject(error));
        } else {
            reject('Not supported')
        }
    })

export const getBackgroundUrl = async () => {
    try {
        const json = await fetch(unsplashUrl)
        const backgroundData = await json.json()
        return backgroundData?.urls?.regular
    } catch (error) {
        console.error(error)
    }
}

export const ISOtoCountry = async (country: any) => {
    try {
        const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
        const res = await fetch(url);
        return (await res.json());
    } catch (error) {
        console.error(error)
    }
}

export const yandexTranslate = async (words: any, lang: any) => {
    try {
        const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200427T173412Z.faf51b65cd039073.f96213a5294f7181ca021f4cafa3026300e8115f&text=${words}&lang=${lang.toLowerCase()}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.text[0];
    } catch (error) {
        console.error(error)
    }
}

export const timeZone = async (lat: any, lon: any) => {
    try {
        const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${TIME_ZONE_DB}&format=json&by=position&lat=${lat}&lng=${lon}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.zoneName;
    } catch (error) {
        console.error(error)
    }
}

export const covidToCountry = async (country: any) => {
    const nowDate = moment().subtract(1, 'days').format("YYYY-MM-DD")
    const yesterday = moment().subtract(2, 'days').format("YYYY-MM-DD")
    try {
        const url = `https://api.covid19api.com/country/${country}?from=${yesterday}T00:00:00Z&to=${nowDate}T00:00:00Z`;
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}

