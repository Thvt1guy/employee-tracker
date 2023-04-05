const inquirer = require('inquirer');
const mysql = require('mysql2');
const MYSQLPORT = process.env.MYSQLPORT || 3307;
const pass = require('./config');
const cTable = require('console.table');

function init() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'Select an option to start.',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role', 'Quit'],
            },
        ])
        .then(({menu}) => {
            switch (menu) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a department":
                    addDepartment();
                    break;
                case "Add a role":
                    addRole();
                    break;
                case "Add an employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateRole();
                    break;
                default:
                    console.log("Thanks for using our app! \"Ctrl + C\" to use Terminal again")
                    break;
            }
        })
}

//connecting to my database
const db = mysql.createConnection(
    {
        port: MYSQLPORT,
        host: "localhost",
        user: "root",
        password: pass,
        database: "mycompany_db",
    },
    console.log("Connected to mycompany_db!")
);


function viewDepartments(){
    console.log("Viewing Departments")
        db.query('SELECT name FROM department', function (err, results) {
      console.table(results)
      //when I am done
      init();
    });
}

function viewRoles(){
    console.log("Viewing Roles")
        db.query('SELECT * FROM role', function (err, results) {
      console.table(results)
      //when I am done
      init();
    });
}

function viewEmployees(){
    console.log("Viewing Employees")
        db.query(`SELECT employee_id, first_name, last_name, title AS job_title, name AS department, salary, manager_id
        FROM role r
        JOIN employee e
            ON r.id = e.role_id
        JOIN department d
            ON r.department_id = d.department_id;`, function (err, results) {
      console.table(results)
      //when I am done
      init();
    });
}

function addDepartment() {
    console.log("Department Added")
        inquirer
        .prompt([{
            type: 'input',
            name: 'addDep',
            message: 'What will be the name of your new department?'
        }
    ])
    .then((DepName)=> {
        // console.log(DepName.addDep);
        db.query(`INSERT INTO department (name)
        VALUES ("${DepName.addDep}");`, function (err, results) {
          console.table(results)
          //when I am done
          init();
        });
    })
}

function addRole(){
    console.log("Role Added")
        inquirer
        .prompt([{
            type: 'input',
            name: 'addRole',
            message: 'What will be the title of your new role?'
        },
        {
            type: 'input',
            name: 'addSal',
            message: 'What will be the salary of your new role?'
        },
        {
            type: 'input',
            name: 'addRoleId',
            message: 'What will be the Department id that you will reference for your new role?'
        }
    ]).then((DepName)=> {
        // console.log(DepName.addDep);
        db.query(`INSERT INTO role (title, salary, department_id)
        VALUES (\"${DepName.addRole}\", ${DepName.addSal}, ${DepName.addRoleId});`, function (err, results) {
          console.table(results)
          //when I am done
          init();
        });
    })
}

function addEmployee(){
    console.log("Employee Added")
        inquirer
        .prompt([{
            type: 'input',
            name: 'addFirst',
            message: 'What will be the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'addLast',
            message: 'What will be the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'addRoleId',
            message: 'What will be the Role id that your employee will have?'
        }
    ]).then((DepName)=> {
        // console.log(DepName.addDep);
        db.query(`INSERT INTO employee (first_name, last_name, role_id)
        VALUES (\"${DepName.addFirst}\", \"${DepName.addLast}\", ${DepName.addRoleId});`, function (err, results) {
          console.table(results);
          //when I am done
          init();
        });
    })
}

function updateRole(){
    console.log("Employee Role Updated")
    inquirer
    .prompt([{
        type: 'input',
        name: 'upId',
        message: 'What will be the employee\'s id?'
    },
    {
        type: 'input',
        name: 'upRole',
        message: 'What will be the employee\'s new role id?'
    }
]).then((DepName)=> {
    // console.log(DepName.addDep);
    db.query(`UPDATE employee
    SET role_id = ${DepName.upRole}
    WHERE employee_id = ${DepName.upId};`, function (err, results) {
      console.table(results);
      //when I am done
      init();
    });
})
}

init();