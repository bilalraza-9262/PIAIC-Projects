//here import all packages
import inquirer from "inquirer";
import chalk from "chalk";
import axios from "axios";

//here define user input interface
interface UserAnswer {
	fromCurrency: string[],
	amount: number,
	toCurrency: string[]
}

//here is API url 
let apiUrl: string = "https://v6.exchangerate-api.com/v6/40c92bcfed10f7809d887273/latest/PKR"

console.log(chalk.greenBright("\n--------------------Wlecome to the Currency Converter App---------------------- \n"));

async function exchangeRates() {
	try {
		const response = await axios.get(apiUrl)
		if (response.status == 200) {
			const data = response.data;
			return data.conversion_rates
		}
	} catch (error) {
		console.log(chalk.redBright(`An error occurred while fetching data: ${error}`));
		return null
	}
}


//this function take a source currency then amount then target currency from user and then return all input 

async function main(): Promise<UserAnswer | null> {
	const exchangerate: Function = await exchangeRates();
	let data: string[] = Object.keys(exchangerate)
	if (exchangerate !== null) {

		const answer: UserAnswer = await inquirer.prompt([
			{
				name: "fromCurrency",
				type: "list",
				message: chalk.hex("#c779a5")("Enter the source currency\n"),
				choices: data
			},
			{
				name: "amount",
				type: "input",
				message: chalk.hex("#d1bc47")("enter the amount to convert\n"),
				validate: (value) => !isNaN(parseFloat(value)) ? true : chalk.redBright('\nPlease enter a valid number.'),
			},
			{
				name: "toCurrency",
				type: "list",
				message: chalk.hex("#c779a5")("Select the target currency\n"),
				choices: data
			}])

		return answer


	} else {
		console.error(chalk.redBright('Failed to fetch data. Check your API key and base currency.'));
		return null
	}
}

//this function convert a source currency amount into target currency amount
async function convertCurrency() {
	const userAnswers = await main() as UserAnswer;
	const fromCurrency: string[] = userAnswers.fromCurrency;
	const toCurrency: string[] = userAnswers.toCurrency;
	const amount: number = userAnswers.amount;

	const convertApiUrl = `https://v6.exchangerate-api.com/v6/40c92bcfed10f7809d887273/pair/${fromCurrency}/${toCurrency}`;

	try {
		const response = await axios.get(convertApiUrl);
		if (response.status === 200) {
			const rates = response.data;
			const convertedAmount :number= amount * rates.conversion_rate;
			console.log(
				chalk.hex("#86e3e0")(`\n${chalk.blueBright(amount)} "${fromCurrency}" is equal to ${chalk.blueBright(convertedAmount)} "${toCurrency}"`)
			);
		} else {
			console.error(chalk.redBright("Failed to fetch conversion rates."));
		}
	} catch (error) {
		console.error(chalk.redBright(`An error occurred while fetching conversion rates: ${error}`));
	}
}

convertCurrency()




