const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const db = require('./config/connection')
const CFonts = require('cfonts');


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
    process.exit();
};

const viewDepartments = () => {
     db.query('SELECT * FROM departments;', (err, data) => {
        console.table(data)
        console.log('\n===============\n')
    if (err) {console.log(err)}
    startTracker()
})
}

const viewEmployees = () => {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, title, department_name AS Department, CONCAT(managers.first_name, " ", managers.last_name) AS Manager FROM roles JOIN employees ON roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id LEFT JOIN employees AS managers ON managers.id = employees.manager_id ORDER BY employees.id;', (err, data) => {
        console.table(data)
    if (err) {console.log(err)}
    startTracker()
})
}

const viewRoles = () => {
    db.query('SELECT roles.id, title, salary, department_name AS Department FROM roles JOIN departments ON departments.id = roles.department_id ORDER BY roles.id;', (err, data) => {
        console.table(data)
    if (err) {console.log(err)}
    startTracker()
})
}

const addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        message: 'Enter the name of the Department',
        name: 'department'
    }])
    .then((answer) => {
        db.query('INSERT INTO departments (department_name) VALUES (?);', answer.department)
        console.log(`New Department ${answer.department} Added.`)
        startTracker()
    })
}

const addRole = () => {
        const arr = [];
        db.query('SELECT * FROM departments').spread(function (rows) {
            
            rows.forEach(dept => {
                const obj = {
                    name: dept.department_name,
                    value: dept.id
                }
                arr.push(obj);
            });
        })
        .then(
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the role?',
                name: 'roleName',
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: 'roleSalary',
            },
            {
                type: 'list',
                message: 'What Department is the role in?',
                name: 'roleDepartment',
                choices: arr
            },
        ])
        .then((answers) => {
            const {roleName, roleSalary, roleDepartment} = answers
            db.query('INSERT INTO roles (roles.title, roles.salary, roles.department_id) VALUES (?, ?, ?);', [roleName, roleSalary, roleDepartment])
            .then(() => {
                console.log(`New Role ${answers.roleName} Added.`)
                startTracker()
            })
            
        })
        
        )
}

const addEmployee = () => {
        const arr = [];
        const arr2 = [{ name: "None", value: -1 }];
        db.query('SELECT * FROM roles').spread(function (rows) {
            
            rows.forEach(role => {
                const obj = {
                    name: role.title,
                    value: role.id
                }
                arr.push(obj);
            });
        })
        .then(
        db.query('SELECT * FROM employees').spread(function (rows) {
            
            rows.forEach(emp => {
                const obj = {
                    name: emp.first_name + " " + emp.last_name,
                    value: emp.id
                }
                arr2.push(obj);
            });
        }))
        .then(
        inquirer.prompt([
            {
                type: 'input',
                message: "What is the Employee's First Name?",
                name: 'newFirstName',
            },
            {
                type: 'input',
                message: "What is the Employee's Last Name?",
                name: 'newLastName',
            },
            {
                type: 'list',
                message: "What is the New Employee's role?",
                name: 'newEmployeeRole',
                choices: arr
            },
            {
                type: 'list',
                message: "Who is the new Employee's Manager?",
                name: 'newEmployeeManager',
                choices: arr2
            },
        ])
        .then((answers) => {
            let {newFirstName, newLastName, newEmployeeRole, newEmployeeManager} = answers
            if (newEmployeeManager === -1) {
                db.query('INSERT INTO employees (employees.first_name, employees.last_name, employees.role_id) VALUES (?, ?, ?);', [newFirstName, newLastName, newEmployeeRole])
            .then(() => {
                console.log(`New Employee ${newFirstName} ${newLastName} Added.`)
                startTracker()
            })
            } else {
                db.query('INSERT INTO employees (employees.first_name, employees.last_name, employees.role_id, employees.manager_id) VALUES (?, ?, ?, ?);', [newFirstName, newLastName, newEmployeeRole, newEmployeeManager])
            .then(() => {
                console.log(`New Employee ${newFirstName} ${newLastName} Added.`)
                startTracker()
            })
            }
            
            
        })
        )
}

const updateEmployee = () => {
    const arr = [];
    const arr2 = [];
    db.query('SELECT * FROM roles').spread(function (rows) {  
        rows.forEach(role => {
            const obj = {
                name: role.title,
                value: role.id
            }
            arr.push(obj);
        });
    })
    .then(
    db.query('SELECT * FROM employees').spread(function (rows) {
        rows.forEach(emp => {
            const obj = {
                name: emp.first_name + " " + emp.last_name,
                value: emp.id
            }
            arr2.push(obj);
        });
    }))
    .then(
    inquirer.prompt([
        {
        type: 'confirm',
        message: "Are you sure?",
        name: 'yes',
        },
        { 
            type: 'list',
            message: "What Employee is changing roles?",
            name: 'changeRole',
            choices: arr2
        },
        {
            type: 'list',
            message: "What is the Employee's new role?",
            name: 'updateRole',
            choices: arr
        }
    ])
        .then((answers) => {
                let {changeRole, updateRole} = answers
                db.query('UPDATE employees SET role_id=? WHERE employees.id=?;', [updateRole, changeRole])
            .then(() => {
                console.log(`Role Updated`)
                startTracker()
            })           
            }
        )
    )
}

const startTracker = () => {
     inquirer.prompt(question)
    .then(async (ans) => {
        const choice = ans.choice
        console.log(choice)
    switch(ans.choice) {
        case 'View all Departments':
            viewDepartments();
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