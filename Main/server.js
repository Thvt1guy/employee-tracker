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
            // {
            //     type: 'maxlength-input',
            //     name: 'text',
            //     message: 'What will be your text?',
            //     maxLength: 3
            // },
            // {
            //     type: 'input',
            //     name: 'textColor',
            //     message: 'What will be your text color?'
            // },
            // {
            //     type: 'list',
            //     name: 'shapeType',
            //     message: 'Choose a shape.',
            //     choices: ['Circle', 'Triangle', 'Square'],
            // },
            // {
            //     type: 'input',
            //     name: 'shapeColor',
            //     message: 'What will be your shape\'s color?'
            // }
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
    console.log("Viewing depts")
        db.query('SELECT name FROM department', function (err, results)
      {
      console.table(results)
      //when I am done
      init();
    });
}

init();