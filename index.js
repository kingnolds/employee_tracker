const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./config/connection')

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'movie_db'
    },
    console.log(`Connected to the movie_db database.`)
  );

const questions = [
    {
        type: 'list',
        message: 'What do you want to do?',
        name: 'choice',
        choices: ['View all Departments' , 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
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
    {
        // TODO: Dynamically add available departments to his prompt
        type: 'input',
        message: 'What Department is the role in?',
        name: 'roleDepartment',
        when: (answers) => (answers.choice === 'Add a Role')
    },
    {
        type: 'input',
        message: "What is the new Employee's first name?",
        name: 'firstName',
        when: (answers) => (answers.choice === 'Add an Employee')
    },
    {
        type: 'input',
        message: "What is the new Employee's last name?",
        name: 'lastName',
        when: (answers) => (answers.choice === 'Add an Employee')
    },
    {
        type: 'input',
        message: "What is the new Employee's role?",
        name: 'newRole',
        when: (answers) => (answers.choice === 'Add an Employee')
    },
    {
        // TODO: list all the employees with a none option
        type: 'input',
        message: "Who is the new Employee's manager?",
        name: 'newManager',
        when: (answers) => (answers.choice === 'Add an Employee')
    },
    {
        // TODO: role update 
        type: 'list',
        message: "What Employee is changing roles?",
        name: 'changeRole',
        when: (answers) => (answers.choice === 'Update an Employee Role')
    },
    {
        // TODO: role update 
        type: 'list',
        message: "What is the Employee's new role?",
        name: 'updateRole',
        when: (answers) => (answers.choice === 'Update an Employee Role')
    },
]

const startTracker = async () => {
    const ans = await inquirer.prompt(questions)
    switch(ans.choice) {
        case 'View all Departments':
            viewDepartments()
            break;
        case 'View all Roles':
            viewRoles();
            break;
        case 'View all Employees':
            viewEmployees();
            break;
        case 'Add a Department':
            addDepartment();
            break;
        case 'Add a Role':
            addRole();
            break;
        case 'Add an Employee':
            addEmployee();
            break;
        case 'Update an Employee Role':
            updateEmployee();
            break;
        default:
            console.log('Something Broke');
    }
}