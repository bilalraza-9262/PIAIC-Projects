//here import all packages
import inquirer from "inquirer";
import chalk from "chalk";
let randomNumber = Math.floor(Math.random() * 9 + 1);
let chances = 3;
let try_again = true;
console.log(chalk.hex("#dbc85c")("--------Welcome to the Number guessing game----------\n"));
async function guessNumber() {
    while (try_again) {
        while (chances > 0) {
            const userNumber = await inquirer.prompt([{
                    name: "userInput",
                    type: "number",
                    message: "Enter a number between 1 to 10: "
                }]);
            if (isNaN(userNumber.userInput)) {
                console.log(chalk.redBright("\nPlease enter a valid number\n"));
            }
            else if (userNumber.userInput === randomNumber) {
                console.log(chalk.hex("#c1fab6")("\nCagratuation! You guess a correct number\n"));
                break;
            }
            else if (userNumber.userInput < randomNumber) {
                chances--;
                if (chances === 0) {
                    console.log(chalk.hex("#b87478")("\nYou loss this game\n"));
                }
                else if (chances === 1) {
                    console.log(`\nGuess higher, You have only ${chances} cahnce\n`);
                }
                else {
                    console.log(`\nGuess higher, You have ${chances} cahnces\n`);
                }
            }
            else if (userNumber.userInput > randomNumber) {
                chances--;
                if (chances === 0) {
                    console.log(chalk.hex("#b87478")("\nYou loss this game\n"));
                }
                else if (chances === 1) {
                    console.log(`\nGuess lower, You have only ${chances} cahnce\n`);
                }
                else {
                    console.log(`\nGuess lower, You have ${chances} cahnces\n`);
                }
            }
        }
        const play_again = await inquirer.prompt([{
                name: "playagain",
                type: "input",
                message: "Do you want to play again? (yes) or (no) ",
            }]);
        if (play_again.playagain === "yes" || play_again.playagain === "Yes") {
            randomNumber = Math.floor(Math.random() * 9 + 1);
            chances = 3;
        }
        else if (play_again.playagain === "no" || play_again.playagain === "No") {
            try_again = false;
            console.log(chalk.hex("#9bebf2")("\nGood bye!"));
        }
        else {
            console.log("\nPlease enter yes or no\n");
        }
    }
}
//here call main function
guessNumber();
