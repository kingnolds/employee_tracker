const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./config/connection')
const action = require('./utils/actions');
const CFonts = require('cfonts');

const questions = [
    {
        type: 'list',
        message: 'What do you want to do?',
        name: 'choice',
        choices: ['View all Departments' , 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
    }
]

const exit = () => {
    console.log('Bye for Now!');
    process.exit();
};

const startTracker = () => {
     inquirer.prompt(questions)
    .then((ans) => {
    switch(ans.choice) {
        case 'View all Departments':
            action.viewDepartments()
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
        // case 'Exit':
        //     exit();
        //     break;
        default:
            console.log('Something Broke');
    }
    }).then(() => {
      console.log('\n======================\n')
    startTracker()  
    }
    )
}
const init = () => {
    CFonts.say('Employee Tracker', {
        font: 'slick',
        colors: ['cyanBright']
    })
    startTracker()
}
init()