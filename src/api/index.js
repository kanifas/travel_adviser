import axios from "axios"

export const getPlaces = async (type, sw, ne) => {
    const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
    const options = {
        params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            // restaurant_tagcategory_standalone: '10591',
            // restaurant_tagcategory: '10591',
            // limit: '30',
            // currency: 'USD',
            // open_now: 'false',
            // lunit: 'km',
            // lang: 'en_US',
            lang: 'ru_RU',
        },
        headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY
        }
    }

    try {
        const { data: { data } } = await axios.get(URL, options)
        return data
    } catch (error) {
        console.log(error)
    } 
}

export const getWeatherData = async (lat, lng) => {
    try {
        const URL = `https://community-open-weather-map.p.rapidapi.com/find`
        const options = {
            params: {
                lon: lng,
                lat: lat,
            },
            headers: {
                'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_API_KEY
            }
        }
        const { data } = await axios.get(URL, options)
        return data
    } catch(error) {

    }
}