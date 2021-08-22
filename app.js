require('colors')
const { menu, leerInput, pausa } = require('./helpers/inquirer')


const main = async() => {

    let option;

    do {
        
        option = await menu()
        

        if(option !== 0 ) await pausa()
    } while (option !== 0);
}

main()