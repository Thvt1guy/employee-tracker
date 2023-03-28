const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
var connection;

async function main() {
    // get the client
    // create the connection
    try {
        
        connection = await mysql.createConnection({port: 3307, host:'localhost', user: 'root', password: 'Alove6262!', database: 'mycompany_db'});
        // query database
        const [rows, fields] = await connection.execute('SELECT * FROM department');
        console.log(rows)
        app()
    } catch (error) {
        console.log(error)
    }
}
const {menuQs,addDepartmentQs, addEmployeeQs,addRoleQs} = require("./questions.js")
async function app() {
  //use inquirer to ask the user to select something
    var {menu} = await inquirer
    .prompt(menuQs)
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
    default:
        console.log("Thanks for using our app!")
      break;
  }
}


async function viewDepartments(){
    console.log("Viewing depts")
    const [rows, fields] = await connection.execute('SELECT * FROM department');
    console.log(rows)

    //when I am done
    app()
}
function viewRoles(){
    console.log("Viewing roles")

    //when I am done
    app()
}
function viewEmployees(){
    console.log("Viewing emps")

    //when I am done
    app()
}
function addDepartment(){
    console.log("Add depts")

    //when I am done
    viewDepartments()
}
function addRole(){
    console.log("add role")

    //when I am done
    viewRoles()
}
function addEmployee(){
    console.log("add emps")

    //when I am done
    viewEmployees()
}

main()