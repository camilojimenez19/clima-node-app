const inquirer = require('inquirer')
require('colors')

const preguntasMenu = [
    {
        type: 'list',
        name: 'option',
        message: 'Que deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.yellow} Crear una tarea.`
            },
            {
                value: '2',
                name: `${'2.'.yellow} Listar tareas.`
            },
            {
                value: '3',
                name: `${'3.'.yellow} Listar tareas completadas.`
            },
            {
                value: '4',
                name: `${'4.'.yellow} Listar tareas pendientes.`
            },
            {
                value: '5',
                name: `${'5.'.yellow} Completar tarea.`
            },
            {
                value: '6',
                name: `${'6.'.yellow} Borrar una tarea.`
            },
            {
                value: '0',
                name: `${'0.'.yellow} Salir.`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log('=============================='.blue)
    console.log('    Seleccione una opción     ')
    console.log('==============================\n'.blue)

    const { option } = await inquirer.prompt(preguntasMenu)

    return option
}

const inquirerPausa = async () => {

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
    inquirerMenu,
    inquirerPausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}