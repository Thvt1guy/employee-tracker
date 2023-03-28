function menu() {
  //use inquirer to ask the user to select something

  switch (key) {
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

    //when I am done
    menu()
}
function viewRoles(){
    console.log("Viewing roles")

    //when I am done
    menu()
}
function viewEmployees(){
    console.log("Viewing emps")

    //when I am done
    menu()
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