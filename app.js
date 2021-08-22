require('colors')
const { inquirerMenu, leerInput, inquirerPausa } = require('./helpers/inquirer')


const main = async() => {

    let option = null

    do {
        
        option = await inquirerMenu()

        console.log({option});

        if(option !== 0 ) await inquirerPausa()


    } while (option !== 0);
}

main()