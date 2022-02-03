const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./config/connection')
const action = require('./utils/actions');
const CFonts = require('cfonts');
// console.log(action)

const question = [
    {
        type: 'list',
        message: 'What do you want to do?',
        name: 'choice',
        choices: ['View all Departments' , 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
    }
]

const exit = () => {
    console.log('Bye for Now!');
    // db.end();
    process.exit();
};

// const actionFunctions = {
//     'View All Employees': action.viewEmployees,
//     'Add an Employee': action.addEmployee,
//     'Update an Employee Role': action.updateEmployee,
//     'View All Roles': action.viewRoles,
//     'Add a Role': action.addRole,
//     'View All Departments': action.viewDepartments,
//     'Add a Department': action.addDepartment,
//     'Exit': exit
// }

// const startTracker = async () => {
//         try {
//             console.log("\n------------------------\n")
//             const userInput = await inquirer.prompt(question);
//             console.log(userInput)
//             console.log("\n------------------------\n")
//             await actionFunctions[userInput.choice]();
//             startTracker();
//         } catch (err) {
//             console.log(err);
//         }
//     };
const startTracker = () => {
     inquirer.prompt(question)
    .then((ans) => {
        const choice = ans.choice
        console.log(choice)
    switch(ans.choice) {
        case 'View all Departments':
            action.viewDepartments();
            break;
        case 'View all Roles':
            action.viewRoles();
            break;
        case 'View all Employees':
            action.viewEmployees();
            break;
        case 'Add a Department':
            action.addDepartment();
            break;
        case 'Add a Role':
            action.addRole();
            break;
        case 'Add an Employee':
            action.addEmployee();
            break;
        case 'Update an Employee Role':
            action.updateEmployee();
            break;
        case 'Exit':
            exit();
            break;
        default:
            console.log('Something Broke');
    }
    })
}

const init = () => {
    CFonts.say('Employee Tracker', {
        font: 'slick',
        colors: ['cyanBright']
    })
    startTracker()
}

init()