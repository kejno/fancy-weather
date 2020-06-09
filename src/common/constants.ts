export const API_KEY = 'a0e103a9fdaf7f6ff2354f9ebbe962bc';
export const UNSPLASH_ACCESS_KEY = 'rMTl8p3ps6oRoac-I58x04O57JYaAkGk9BVmHsTQQog';
export const GOOGLE_API_KEY = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
export const TIME_ZONE_DB = 'KJRU5KNGVW45';
export enum Units {
    metric = 'metric',
    imperial = 'imperial'
}

export enum Lang {
    en = 'EN',
    ru = 'RU',
    by = 'BE'
}

const month = new Date().getMonth()
const hour = new Date().getHours()
const m = (month > 1 && month < 5)
    ? 'spring'
    : (month > 4 && month < 8)
        ? 'summer'
        : (month > 7 && month < 11)
            ? 'autumn'
            : 'winter'

const d = (hour > 5 && hour < 11)
    ? 'morning'
    : (hour > 10 && hour < 20)
        ? 'afternoon'
        : (hour > 19 && hour < 24)
            ? 'evening'
            : 'night'

export const initialCenterMap = { lat: 27, lon: 53 }

export const weatherMapCommonUrl = 'https://api.openweathermap.org/data/2.5'
export const forecastUrl = `${weatherMapCommonUrl}/forecast?APPID=${API_KEY}`
export const weatherUrl = `${weatherMapCommonUrl}/weather?APPID=${API_KEY}`

export const unsplashUrl = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature,${d},${m}&client_id=${UNSPLASH_ACCESS_KEY}`
console.log(`query=nature,${d},${m}`)
export const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&types=(cities)&`

export const covidUrl = `https://api.covid19api.com/`






