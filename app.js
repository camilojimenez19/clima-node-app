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

                if (idSeleccionado === 0) continue;

                
                const lugarSeleccionado = lugares.find(lugar => lugar.id === idSeleccionado)
                
                // Guardar en DB
                busquedas.agregarHistorial(lugarSeleccionado.nombre)

                // Obtener la informacion del Clima
                
                const infoClima = await busquedas.climaLugar(lugarSeleccionado)                

                // Mostrar resultados

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.nombre);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura:', infoClima.temp);
                console.log('Tmp minima:', infoClima.min);
                console.log('Tmp maxima:', infoClima.max);
                console.log('Como esta el clima:',infoClima.desc);

                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green
                    console.log(`${idx} ${lugar}`);                    
                });
                
                break;
        
            default:
                break;
        }

        
        

        if(option !== 0 ) await pausa()
    } while (option !== 0);
}

main()