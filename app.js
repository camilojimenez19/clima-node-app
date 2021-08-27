require('dotenv').config()

const { menu, leerInput, pausa, listarLugares } = require('./helpers/inquirer');
const Busquedas = require('./models/Busquedas');

const main = async() => {   

    const busquedas = new Busquedas()
    let option;

    
    do {
        
        option = await menu()

        switch (option) {
            case 1:
                // Mostrar el mensaje
                const ciudad = await leerInput('Ciudad: ')

                // Buscar los lugares
                const lugares = await busquedas.ciudad( ciudad )

                // Seleccionar el lugar
                const idSeleccionado = await listarLugares(lugares)
                const lugarSeleccionado = lugares.find(lugar => lugar.id === idSeleccionado)
                
                //TODO: Clima

                //TODO: Mostrar resultados

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura:');
                console.log('Tmp minima:');
                console.log('Tmp maxima:');

                break;
            case 2:
                
                break;
        
            default:
                break;
        }
        

        if(option !== 0 ) await pausa()
    } while (option !== 0);
}

main()