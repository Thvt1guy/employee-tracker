module.exports ={
    menuQs: [{
        type: 'list',
        name: 'menu',
        message: 'Select an option to start',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Update employee role', 'Quit'],
    }],
    addDepartmentQs: [],
    addRoleQs: [],
    addEmployeeQs: [{
        type: 'input',
        name: 'title',
        message: 'What will be your .svg document title?'
    },
    {
        type: 'maxlength-input',
        name: 'text',
        message: 'What will be your text?',
        maxLength: 3
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'What will be your text color?'
    },
    
    {
        type: 'input',
        name: 'shapeColor',
        message: 'What will be your shape\'s color?'
    }
    ]
}

