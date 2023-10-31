//here import all packages
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.hex("#edb91c")("---------------Welcome to the Word Counter App---------------\n"));

//here define interface
interface User {
	UserSentence: string
}

//Promise is start
let promise = new Promise<User>((resolve, reject) => {
	inquirer
		.prompt({
			name: "UserSentence",
			type: "input",
			message: "Please enter sentence here: ",
			// validate: (value) => typeof value == "string" ? true : chalk.redBright('\nPlease enter a valid characters.'),
		}).then((userInput) => {
			if (userInput.UserSentence) {
				resolve(userInput.UserSentence);
			} else {
				reject(Error)
			}
		})

})

//promise result
promise.then((response:any) => {
	const sentence = response.split(" ")
	let wordCount = sentence.filter((value: string) => {
		return value !== ""

	}).length
	console.log(chalk.hex("#69c9a0")(`Word Count: ${chalk.hex("#d7ed72")(wordCount)} `));
	return response
}).then((againResponse) => {
	const sentence = againResponse.split("")
	let alphabetCount = sentence.filter((value: string) => {
		return value !== " "

	}).length
	console.log(chalk.hex("#69c9a0")(`Alphabet Count: ${chalk.hex("#d7ed72")(alphabetCount)} `));

}).catch((error) => {
	console.log(chalk.redBright(`Error: Can not read property (${error.message})`) );

}).finally(() => {
	console.log(chalk.hex("#edafbb")("\nThank you!"));

})