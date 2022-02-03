const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./config/connection')
const action = require('./utils/actions');
const CFonts = require('cfonts');
// console.log(action)

const questions = [
    {
        type: 'list',
        message: 'What do you want to do?',
        name: 'choice',
        choices: ['View all Departments' , 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
    },
    // {
    //     type: 'input',
    //     message: 'Enter the name of the Department',
    //     name: 'department',
    //     when: (answers) => (answers.choice === 'Add a Department')
    // },
    // {
    //     type: 'input',
    //     message: 'What is the role?',
    //     name: 'roleName',
    //     when: (answers) => (answers.choice === 'Add a Role')
    // },
    // {
    //     type: 'input',
    //     message: 'What is the salary for this role?',
    //     name: 'roleSalary',
    //     when: (answers) => (answers.choice === 'Add a Role')
    // },
    // {
    //     // TODO: Dynamically add available departments to his prompt
    //     type: 'input',
    //     message: 'What Department is the role in?',
    //     name: 'roleDepartment',
    //     when: (answers) => (answers.choice === 'Add a Role')
    // },
    // {
    //     type: 'input',
    //     message: "What is the new Employee's first name?",
    //     name: 'firstName',
    //     when: (answers) => (answers.choice === 'Add an Employee')
    // },
    // {
    //     type: 'input',
    //     message: "What is the new Employee's last name?",
    //     name: 'lastName',
    //     when: (answers) => (answers.choice === 'Add an Employee')
    // },
    // {
    //     type: 'input',
    //     message: "What is the new Employee's role?",
    //     name: 'newRole',
    //     when: (answers) => (answers.choice === 'Add an Employee')
    // },
    // {
    //     // TODO: list all the employees with a none option
    //     type: 'input',
    //     message: "Who is the new Employee's manager?",
    //     name: 'newManager',
    //     when: (answers) => (answers.choice === 'Add an Employee')
    // },
    // {
    //     // TODO: role update 
    //     type: 'list',
    //     message: "What Employee is changing roles?",
    //     name: 'changeRole',
    //     when: (answers) => (answers.choice === 'Update an Employee Role')
    // },
    // {
    //     // TODO: role update 
    //     type: 'list',
    //     message: "What is the Employee's new role?",
    //     name: 'updateRole',
    //     when: (answers) => (answers.choice === 'Update an Employee Role')
    // },
]

const exit = () => {
    console.log('Bye for Now!');
    // db.end();
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
        case 'Exit':
            exit();
            // function exit () {
            //     prompt.ui.close();
            //   }
            // exit()
            break;
        default:
            console.log('Something Broke');
    }
    console.log('\n======================\n')
    startTracker()
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