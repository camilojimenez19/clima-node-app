require('colors')
const { leerInput } = require('./helpers/inquirer')


const main = async() => {

    const texto = await leerInput()
    console.log(texto);
}

main()