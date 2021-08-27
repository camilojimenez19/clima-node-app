const axios = require('axios')

class Busquedas {

    historial = []

    constructor(){
        // TODO: leer DB si existe
    }

    /**
     * Obtener los parametros por defecto del MapBox API
     */
    get paramsMapbox(){
        return {
            access_token: process.env.MAPBOX_KEY,
            limit: 5,
            language: 'es'
        }
    }

    /**
     * Obtener los parametros por defecto del Open Weather API
     */
    get paramsOpenWeather(){
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }
    
    async ciudad(lugar = ''){

        try {
            // Peticion HTTP
            const instance =  axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const response = await instance.get()
            const features = response.data.features
            
            return features.map((lugar) => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        } catch (error) {
            console.error('Hubo un problema buscando el lugar: ', error);
            return []
        }
    }

    async climaLugar({ lat, lng }){

        try {            
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: {...this.paramsOpenWeather, lat, lon: lng}
            })
            const response = await instance.get()
            const {weather, main} = response.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.error('Hubo un problema buscando el clima del lugar: ', error);
            return {}
        }
    }
}

module.exports = Busquedas