const fs = require('fs')
const axios = require('axios')

class Busquedas {

    historial = []
    dbPath = './db/database.json'

    constructor(){
        // leer DB si existe
        this.leerDB()
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

    get historialCapitalizado(){

        // return this.historial.map(lugar => lugar.t})
    }

    /**
     * Obtener la lista de ciudades que coincidan con lo escrito por el usuario
     * @param {string} lugar 
     * @returns {array} lugares
     */
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

    /**
     * Obtener la informacion del clima de un lugar seleccionado
     * @param {object} lugar 
     * @returns {object} informacion del clima
     */
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

    /**
     * Agrega un lugar al historial y guarda en el archivo
     * @param {string} lugar 
     */
    agregarHistorial( lugar = ''){
        // Prevenir duplicados
        if(this.historial.includes( lugar.toLocaleLowerCase() )) return;

        this.historial.unshift(lugar.toLocaleLowerCase())

        // Grabar en DB o archivo de text
        this.guardarDB()
    }

    /**
     * Guarda el historial en el archivo
     */
    guardarDB(){
        try {
            const payload = {
                historial: this.historial
            }
            fs.writeFileSync(this.dbPath, JSON.stringify(payload))
            
        } catch (error) {
            console.error('Error al guardar el historial en el archivo');
        }
    }

    /**
     * Lee el archivo para agregar el historial guardado
     */
    leerDB(){
        // Validar si existe
        if(fs.existsSync(this.dbPath)){
            const infoFile = fs.readFileSync(this.dbPath, {encoding: 'utf-8'}) 
            const data = JSON.parse(infoFile)

            this.historial = data.historial
        }
    }
}

module.exports = Busquedas