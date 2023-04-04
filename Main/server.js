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
        .then((name) => {
            let menu = name.menu;
            // console.log(name)
            switch (menu) {
                case "View all departments":
                    // console.log('!!Department switch ran!!');
                    viewDepartments();
                    break;
                case "View all roles":
                    // console.log('!!Roles switch ran!!');
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
                default:
                    console.log("Thanks for using our app!")
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
        password: `${pass}`,
        database: "mycompany_db",
    },
    // app();
    console.log("Connected to mycompany_db!")
);


function viewDepartments(){
    console.log("Viewing Departments")
        db.query('SELECT name FROM department', function (err, results)
      {
      console.table(results)
      //when I am done
      init();
    });
}

function viewRoles(){
    console.log("Viewing Roles")
        db.query('SELECT * FROM role', function (err, results)
      {
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
            ON r.department_id = d.department_id;`, function (err, results)
      {
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


init();


// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 