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
        db.query(`SELECT employee_id, first_name, last_name, title, name, salary, manager_id
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

function addDepartment(){
    console.log("Department Added")
        db.query(`SELECT * FROM role`, function (err, results)
      {
      console.table(results)
      //when I am done
      init();
    });
}


init();


// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 