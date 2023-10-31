//here import inquirer and chalk
import inquirer from 'inquirer';
import chalk from 'chalk';

//here define all interfaces
interface UserInput {
	Pin: number,
	UserChoices: string,
	Amount: number,
	amount: number
}

//here define user Password and user Balance
const password: number = Math.round(Math.random() * 10000 + 1)
let balance: number = Math.round(Math.random() * 1000000)

console.log(chalk.hex("#f0f054")("----------Welocome to my ATM---------"));

//this function take a user pin
async function userPin(pin: number) {

	console.log(chalk.hex("#95e8a8")(`\nYour pin is ${password}\n`));
	while (true) {
		const userInput: UserInput = await inquirer.prompt({
			name: "Pin",
			type: "number",
			message: "Please enter your pin here: ",
			// default: pin,
		})
		if (userInput.Pin !== pin || isNaN(userInput.Pin)) {
			console.log(chalk.hex("#c26b38")("\nYou have not enter a correct pin"));
		} else {
			console.log(chalk.hex("#bd86bf")(`\n you have ${balance} amount\n`));

			atm()
			break

		}
	}
}


//this function give a choices for "ATM" functionality
async function atm() {
	while (true) {

		const user_choices: UserInput = await inquirer.prompt({
			name: "UserChoices",
			type: "list",
			message: chalk.hex("#5095a3")("What do you like to do? "),
			choices: ["Fast Cash", "Withdraw", "Exit"]
		})
		if (user_choices.UserChoices === "Fast Cash") {
			if (balance > 1000) {
				await fastCash()
			} else {
				console.log("\nInsufficient balance\n");

			}
		} else if (user_choices.UserChoices === "Withdraw") {

			if (balance > 1000) {
				await withdraw()
			} else {
				console.log("\nInsufficient balance\n");

			}
		} else {
			break
		}
	}

}

//--------------------------------------------------------------
//this function define fast cash functionality 
async function fastCash() {
	while (true) {

		const choiceAmount: UserInput = await inquirer.prompt([{
			name: "Amount",
			type: "list",
			message: "\nSelect an amount for credit.",
			choices: [1000, 3000, 5000, 10000, 15000]
		}])
		if (choiceAmount.Amount > balance) {
			console.log(chalk.redBright("Your amount is greater than your balance, please select correct amount."));

		} else {
			balance -= choiceAmount.Amount
			console.log(chalk.hex("#bd86bf")(`\nNow, you have ${balance} amount\n`));
			break

		}
	}
}
//this function define Withdraw functionality 
async function withdraw() {
	while (true) {


		const withdrawAmount: UserInput = await inquirer.prompt({
			name: "amount",
			type: "number",
			message: "\nPlease enter amount to withdraw"
		})
		if (isNaN(withdrawAmount.amount)) {
			console.log(chalk.redBright("\nPlease enter a valid number"));

		} else if (withdrawAmount.amount > balance) {
			console.log(chalk.redBright("\nYour amount is greater than your balance, please enter correct amount.\n"));

		} else {
			balance -= withdrawAmount.amount
			console.log(chalk.hex("#bd86bf")(`\n Now, you have ${balance} amount\n`));
			break

		}
	}
}
//----------------------------------------------------------------


//here call function
userPin(password)



























