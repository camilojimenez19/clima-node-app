const axios = require('axios')

class Busquedas {

    historial = []

    constructor(){
        // TODO: leer DB si existe
    }
    
    async ciudad(lugar = ''){

        // TODO: Peticion HTTP

        console.log(lugar);

        return []; // retornar las ciudad que 
    }
}

module.exports = Busquedas