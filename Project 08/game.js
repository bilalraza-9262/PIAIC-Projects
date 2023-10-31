//here import inquirer & chalk
import inquirer from "inquirer";
import chalk from "chalk";
//here drvie main options
let userHealth = 100;
let opponentHealth = 100;
let healthDrop = 3;
const oppositeTeam = ["Skeleton", "Zombie", "Warrior", "Assassin"];
const userOption = ["Attack", "Drink Health", "Quit"];
let playAgain = true;
let userNameUpperCase;
let opponentNameUpperCase;
//here main async function start
async function Game() {
    console.log(chalk.greenBright("\n------------Welcome to the Adventure Game!-------------\n"));
    while (true) {
        //here asking user about his/her name and opposite name
        const userName = await inquirer.prompt([{
                name: "UserName",
                type: "input",
                message: "Please enter your name here"
            }]);
        const oppositeName = await inquirer.prompt([{
                name: "OppositeName",
                type: "list",
                message: "Select your opponent name here",
                choices: oppositeTeam
            }]);
        if (!userName.UserName) {
            console.log("please enter correct name");
        }
        else {
            //here convert name to upper case
            userNameUpperCase = userName.UserName.charAt(0).toUpperCase() + userName.UserName.slice(1).toLowerCase();
            opponentNameUpperCase = oppositeName.OppositeName.charAt(0).toUpperCase() + oppositeName.OppositeName.slice(1).toLowerCase();
            console.log(`\n${userNameUpperCase.toUpperCase()} VS ${opponentNameUpperCase.toUpperCase()}`);
            console.log(`\n${userNameUpperCase} health is ${userHealth}`);
            console.log(`${userNameUpperCase} health is ${opponentHealth}`);
            break;
        }
    }
    while (userHealth > 0 && opponentHealth > 0) {
        console.log("\n What do you like to do?");
        const option = await inquirer.prompt([{
                name: "Option",
                type: "list",
                choices: userOption
            }]);
        if (option.Option === "Attack") {
            let num = Math.round(Math.random() * 2);
            if (num > 0) {
                userHealth -= 25;
                if (userHealth <= 0) {
                    console.log(chalk.redBright("\n You lose, better luck next time."));
                    userHealth = 0;
                }
                else {
                    console.log(`\n${userNameUpperCase} health is ${userHealth}`);
                    console.log(`${opponentNameUpperCase} health is ${opponentHealth}`);
                    console.log(`\nYou have ${healthDrop} health drop`);
                }
            }
            else if (num <= 0) {
                opponentHealth -= 25;
                if (opponentHealth <= 0) {
                    console.log(chalk.cyanBright("\nCangratulations! you win."));
                    opponentHealth = 0;
                }
                else {
                    console.log(`\n${userNameUpperCase} health is ${userHealth}`);
                    console.log(`${opponentNameUpperCase} health is ${opponentHealth}`);
                    console.log(`\nYou have ${healthDrop} health drop`);
                }
            }
            ;
        }
        else if (option.Option === "Drink Health") {
            if (healthDrop <= 0) {
                console.log("You can not drink Health drop");
            }
            else {
                userHealth += 15;
                healthDrop--;
                console.log(` you drink health drop, now your health is ${userHealth} and opponent health is ${opponentHealth} and you have ${healthDrop} health drop`);
            }
        }
        else if (option.Option === "Quit") {
            userHealth = 0;
            console.log(chalk.redBright("You lose because you quit game"));
        }
        ;
    }
    ;
    const tryAgain = await inquirer.prompt([
        {
            name: "TryAgain",
            type: "confirm",
            message: "Do you want to play again? Press 'Y' to play again or 'N' to quit.",
            default: false
        },
    ]);
    if (tryAgain.TryAgain) {
        userHealth = 100;
        opponentHealth = 100;
        Game();
    }
    else {
        playAgain = false;
        console.log("Goodbye!");
    }
    ;
}
;
Game();
