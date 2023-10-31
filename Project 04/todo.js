//here import all packages
import inquirer from "inquirer";
import chalk from "chalk";
//this variable define a Todo list
let allTodos = [];
console.log(chalk.hex("#9eba5b")("\n----------Welcome to the Todo app------------\n"));
//here start is main function for taking todos and confirm for delete items on list-----------------------------------------
async function addOnTodos() {
    while (true) {
        const userInput = await inquirer.prompt([{
                name: "TodoAdding",
                type: "input",
                message: "What do you want to add on your Todo? ",
            }]);
        if (!userInput.TodoAdding) {
            console.log(chalk.redBright("\nYou have not add any thing on your Todo list\n"));
        }
        else {
            allTodos.push(userInput.TodoAdding);
        }
        const add_more = await inquirer.prompt({
            name: "AddMore",
            type: "confirm",
            message: "Do you want to add more on your Todo. ",
            default: false
        });
        if (!add_more.AddMore) {
            if (allTodos.length > 0) {
                console.log(chalk.hex("#7a67f5")("\n--------Your Todo list is----------"));
                for (let i = 0; i < allTodos.length; i++) {
                    console.log(`${i + 1}. ${allTodos[i]}`);
                }
                break;
            }
            else {
                console.log(chalk.redBright("\nYou have not add any thing on your Todo list. Please add something on your Todos\n"));
            }
        }
    }
    const ConfirmDeleting = await inquirer.prompt({
        name: "DeleteTodos",
        type: "confirm",
        message: "Do you want to delete anything on your Todo list ",
        default: false
    });
    if (ConfirmDeleting["DeleteTodos"]) {
        deleteTodos();
    }
    else {
        console.log(chalk.hex("#7a67f5")("\n--------Your Todo list is----------"));
        for (let i = 0; i < allTodos.length; i++) {
            console.log(`${i + 1}: ${allTodos[i]}`);
        }
        console.log(chalk.hex("#62bce3")("\nGo and follow your to-do list.\n"));
    }
}
//here end is main function-----------------------------------------
//this function derive for delete items on Todo list
async function deleteTodos() {
    const deleting = await inquirer.prompt({
        name: "Delete",
        type: "list",
        message: "What do you want to delete on your Todos? ",
        choices: allTodos
    });
    const index = allTodos.indexOf(deleting.Delete);
    allTodos.splice(index, 1);
    if (allTodos.length > 0) {
        console.log(chalk.hex("#7a67f5")("\n--------Your Todo list is----------"));
        for (let i = 0; i < allTodos.length; i++) {
            console.log(`${i + 1}: ${allTodos[i]}`);
        }
        console.log(chalk.hex("#62bce3")("\nGo and follow your to-do list.\n"));
    }
    else {
        console.log(chalk.hex("#d96b04")("\nYou have delete all Todos"));
    }
}
//here call main function
addOnTodos();
