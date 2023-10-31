//here import inquirer and chalk
import inquirer from 'inquirer';
import chalk from 'chalk';
console.log(chalk.hex("#f0f054")("----------Welocome to my ATM---------"));
const password = Math.round(Math.random() * 10000 + 1);
let balance = Math.round(Math.random() * 1000000);
async function userPin(pin) {
    console.log(chalk.hex("#95e8a8")(`\nYour pin is ${password}\n`));
    while (true) {
        const userInput = await inquirer.prompt({
            name: "Pin",
            type: "number",
            message: "Please enter your pin here: ",
            // default: pin,
        });
        if (userInput.Pin !== pin || isNaN(userInput.Pin)) {
            console.log(chalk.hex("#c26b38")("\nYou have not enter a correct pin"));
        }
        else {
            console.log(chalk.hex("#bd86bf")(`\n you have ${balance} amount\n`));
            atm();
            break;
        }
    }
}
async function atm() {
    while (true) {
        const user_choices = await inquirer.prompt({
            name: "UserChoices",
            type: "list",
            message: chalk.hex("#5095a3")("What do you like to do? "),
            choices: ["Fast Cash", "Withdraw", "Exit"]
        });
        if (user_choices.UserChoices === "Fast Cash") {
            if (balance > 1000) {
                await fastCash();
            }
            else {
                console.log("\nInsufficient balance\n");
            }
        }
        else if (user_choices.UserChoices === "Withdraw") {
            if (balance > 1000) {
                await withdraw();
            }
            else {
                console.log("\nInsufficient balance\n");
            }
        }
        else {
            break;
        }
    }
}
async function fastCash() {
    while (true) {
        const choiceAmount = await inquirer.prompt([{
                name: "Amount",
                type: "list",
                message: "\nSelect an amount for credit.",
                choices: [1000, 3000, 5000, 10000, 15000]
            }]);
        if (choiceAmount.Amount > balance) {
            console.log(chalk.redBright("Your amount is greater than your balance, please select correct amount."));
        }
        else {
            balance -= choiceAmount.Amount;
            console.log(chalk.hex("#bd86bf")(`\nNow, you have ${balance} amount\n`));
            break;
        }
    }
}
async function withdraw() {
    while (true) {
        const withdrawAmount = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: "\nPlease enter amount to withdraw"
        });
        if (isNaN(withdrawAmount.amount)) {
            console.log(chalk.redBright("\nPlease enter a valid number"));
        }
        else if (withdrawAmount.amount > balance) {
            console.log(chalk.redBright("\nYour amount is greater than your balance, please enter correct amount.\n"));
        }
        else {
            balance -= withdrawAmount.amount;
            console.log(chalk.hex("#bd86bf")(`\n Now, you have ${balance} amount\n`));
            break;
        }
    }
}
//here call all function
userPin(password);
