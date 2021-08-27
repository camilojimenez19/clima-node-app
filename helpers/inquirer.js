const inquirer = require('inquirer')
require('colors')

/**
 * Menu principal
 * @returns Opcion seleccionada
 */
const menu = async () => {

    const preguntasMenu = [
        {
            type: 'list',
            name: 'option',
            message: 'Que deseas hacer?',
            choices: [
                {
                    value: 1,
                    name: `${'1.'.yellow} Buscar ciudad.`
                },
                {
                    value: 2,
                    name: `${'2.'.yellow} Historial.`
                },
                {
                    value: 0,
                    name: `${'0.'.yellow} Salir.`
                },
            ]
        }
    ]

    console.clear()
    console.log('=============================='.blue)
    console.log('    Seleccione una opción     ')
    console.log('==============================\n'.blue)

    const { option } = await inquirer.prompt(preguntasMenu)

    return option
}

/**
 * Generar una pausa
 */
const pausa = async () => {

    const msgPausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.blue} para continuar`
        }
    ] 

    console.log('\n');
    await inquirer.prompt(msgPausa)
}

/**
 * Mostrar un mensaje para obtener un string que dijita el usuario
 * @param {string} message 
 * @returns 
 */
const leerInput = async ( message = '' ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if ( value.length === 0 )
                    return 'Por favor ingrese un valor'

                return true                    
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)

    return desc
}


/**
 * Mesaje de confirmacion
 * @param {string} message 
 * @returns 
 */
const confirmar = async (message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(pregunta)
    return ok
}


const listadoTareasBorrar = async( tareas = [] ) => {
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`
        }
    })

    choices.unshift({
        value: '0',
        name: `${'0'.green} Cancelar`
    })

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar una tarea',
            choices 
        }
    ]

    const { id } = await inquirer.prompt(preguntas)
    return id
}

const mostrarListadoChecklist = async( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green
        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    })

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices 
        }
    ]

    const { ids } = await inquirer.prompt(preguntas)
    return ids
}

module.exports = {
    menu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}