require('colors')
const { menu, leerInput, pausa } = require('./helpers/inquirer');
const Busquedas = require('./models/Busquedas');


const main = async() => {

    const busquedas = new Busquedas()
    let option;

    
    do {
        
        option = await menu()

        switch (option) {
            case 1:
                // Mostrar el mensaje
                const lugar = await leerInput('Ciudad: ')
                await busquedas.ciudad( lugar )

                // TODO: Buscar los lugares

                // TODO: Seleccionar el lugar

                //TODO: Clima

                //TODO: Mostrar resultados

                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad:');
                console.log('Lat:');
                console.log('Lng:');
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