const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const MYSQLPORT = process.env.MYSQLPORT || 3307;
const cTable = require('console.table');
const pass = require('./config');
const {menuQs, addDepartmentQs, addEmployeeQs, addRoleQs} = require("./questions.js")


// function main() {
  // get the client
  // create the connection
  const connection = mysql.createConnection(
    {
      port: MYSQLPORT,
      host: "localhost",
      user: "root",
      password: `${pass}`,
      database: "mycompany_db",
    },
    // app();
  console.log("Connected to database!")
  );


function app() {
  //use inquirer to ask the user to select something
    var {menu} = inquirer
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


function viewDepartments(){
    console.log("Viewing depts")
      connection.query('SELECT name FROM department', (err, results)=>{
      try{
      console.table(results)
      //when I am done
      // app()
      } catch(err){
        console.log(err);
      }

    });
    


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


app();
// main()