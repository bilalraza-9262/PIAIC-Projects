//here import packeges
import inquirer from "inquirer";
import chalk from 'chalk';

//here import all files
import add from "../src/add.js";
import subtraction from "../src/subtract.js";
import multiplication from "../src/multiply.js";
import division from "../src/division.js";

interface User {
	operation: string,
	number1: number,
	number2: number
}

//here async finction is start

async function calculator() {
	const userInput: User = await inquirer.prompt([{
		name: "operation",
		type: "list",
		message: chalk.yellowBright("\nWhich operator you want to perform\n"),
		choices: ["Addition", "Subtraction", "Multiplication", "Division"]
	}, {
		name: "number1",
		type: "number",
		message: "Please enter First number here: "
	}, {
		name: "number2",
		type: "number",
		message: "Please enter Second number here: "
	}])

	let adding: number = add(userInput.number1, userInput.number2)
	let subtract: number = subtraction(userInput.number1, userInput.number2)
	let multiply: number = multiplication(userInput.number1, userInput.number2)
	let divide: number = division(userInput.number1, userInput.number2)

	if (isNaN(userInput.number1) || isNaN(userInput.number2)) {
		console.log(chalk.redBright("\nPlease enter a valid number"));

	} else if (userInput.operation === "Addition") {
		console.log("\nYour answer is ");
		console.log(adding);
	} else if (userInput.operation === "Subtraction") {
		console.log("\nYour answer is ");
		console.log(subtract);

	} else if (userInput.operation === "Multiplication") {
		console.log("\nYour answer is ");
		console.log(multiply);

	} else if (userInput.operation === "Division") {
		console.log("\nYour answer is ");
		console.log(divide);

	}
}
calculator()








