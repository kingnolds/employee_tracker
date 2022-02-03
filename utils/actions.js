const db = require("../config/connection");
const mysql = require('mysql2/promise');
const inquirer = require("inquirer");

// Function for each option, view options show a table of available info
//              add options ask for inputs and have lists of availibel departmnets and roles


const viewDepartments = () => {
     db.query('SELECT * FROM departments;', (err, data) => {
        console.table(data)
    if (err) {console.log(err)}
})
}

const viewEmployees = () => {
    db.query('SELECT employees.id, employees.first_name, employees.last_name, title, department_name AS Department, CONCAT(managers.first_name, " ", managers.last_name) AS Manager FROM roles JOIN employees ON roles.id = employees.role_id JOIN departments ON departments.id = roles.department_id LEFT JOIN employees AS managers ON managers.id = employees.manager_id ORDER BY employees.id;', (err, data) => {
        console.table(data)
    if (err) {console.log(err)}
})
}

const viewRoles = () => {
    db.query('SELECT roles.id, title, salary, department_name AS Department FROM roles JOIN departments ON departments.id = roles.department_id ORDER BY roles.id;', (err, data) => {
        console.table(data)
    if (err) {console.log(err)}
})
}

const addDepartment = async () => {
    const answer = await inquirer.prompt([{
        type: 'input',
        message: 'Enter the name of the Department',
        name: 'department'
    }])
    db.query('INSERT INTO departments (department_name) VALUES (?);', answer.department, (err, data) => {
        console.log(`New Department ${answer.department} Added.`)
    if (err) {console.log(err)}
    })
}
// db.query('SELECT * FROM departments').spread(function (rows) {
//     const arr = [];
//     rows.forEach(dept => {
//         const obj = {
//             name: dept.department_name,
//             value: dept.id
//         }
//         arr.push(obj);
//     });
//     return arr
// })
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
            console.log(roleName)
            console.log(roleSalary)
            console.log(roleDepartment)
            db.query('INSERT INTO roles (roles.title, roles.salary, roles.department_id) VALUES (?, ?, ?);', [roleName, roleSalary, roleDepartment])
            .then(() => {
                console.log(`New Role ${answers.roleName} Added.`)
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
            console.log(newFirstName)
            console.log(newLastName)
            console.log(newEmployeeRole, newEmployeeManager)
            if (newEmployeeManager === -1) {
                db.query('INSERT INTO employees (employees.first_name, employees.last_name, employees.role_id) VALUES (?, ?, ?);', [newFirstName, newLastName, newEmployeeRole])
            .then(() => {
                console.log(`New Employee ${newFirstName} ${newLastName} Added.`)
            })
            } else {
                db.query('INSERT INTO employees (employees.first_name, employees.last_name, employees.role_id, employees.manager_id) VALUES (?, ?, ?, ?);', [newFirstName, newLastName, newEmployeeRole, newEmployeeManager])
            .then(() => {
                console.log(`New Employee ${newFirstName} ${newLastName} Added.`)
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
                type: 'list',
                message: "What Employee is changing roles?",
                name: 'changeRole',
                when: (answers) => (answers.choice === 'Update an Employee Role')
            },
            {
                type: 'list',
                message: "What is the Employee's new role?",
                name: 'updateRole',
                when: (answers) => (answers.choice === 'Update an Employee Role')
            },
        ])
    )
}

addEmployee()