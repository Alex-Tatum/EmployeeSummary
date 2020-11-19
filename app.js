const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// creating empty array for new team members
const newTeam = [];

promptToAddNewEmployee();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function promptToAddNewEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "add",
            message: "Do you want to add a new employee to your team?",
            choices: [
                "yes",
                "no",
            ]
        }
    ])
    .then(function(data) {
        if(data.add === "yes"){
            addEmployeeToTeam();
        } else {
            fs.writeFile();
        }
    })
}

// adding a new employee to the team
function addEmployeeToTeam() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "what role does the employee have?",
            choices: [
                "manager",
                "engineer",
                "intern"
            ]
        }
    ])
    .then(function(data) {
        if (data.role === "manager") {
            addManager();
        } else if (data.role === "engineer") {
            addEngineer();
        } else {
            addIntern();
        }
    
    });
}

//function to ask questions to add a new manager 
function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "what is the Manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email address?"
        },
        {
            type: "input",
            name: "office",
            message: "what is the manager's office number?"
        }
    ])
    .then(function(data) {
        const employee = new Manager(data.name, data.id, data.email, data.office);
        newTeam.push(employee);
        promptToAddNewEmployee()
    });
}

//funtion to ask questions to add new engineer to team
function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address?"
        },
        {
        type: "input",
        name: "github",
        message: "What is the engineers's GitHub username?"
    }
        ])
        .then(function(data) {
        const employee = new Engineer(data.name, data.id, data.email, data.github);
        newTeam.push(employee);
        promptToAddNewEmployee()
    });
  }

  //Function to ask questions to add a new intern to the team
  function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email address?"
        },
        {
        type: "input",
        name: "github",
        message: "What is the name of the intern's school?"
    }
        ])
        .then(function(data) {
        const employee = new Intern (data.name, data.id, data.email, data.school);
        newTeam.push(employee);
        promptToAddNewEmployee()
    });
  }
  
  //funtion to stop prompts and create files
  function writeFile() {
    console.log("Creating your file. Check output folder for result.");

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(outputPath, render(newTeam), "utf-8");
}

