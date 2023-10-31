import inquirer from "inquirer";
import chalk from "chalk";




class Person {

    name: string;
    value: number;


    constructor() {
        this.name = '';
        this.value = 0
    }

    async UserAnswer() {

        let userName = await inquirer.prompt([{
            name: "UserName",
            type: "string",
            message: "Please enter your name here!"
        }])
        let userValue = await inquirer.prompt([{
            name: "UserValue",
            type: "number",
            message: "\nEnter 1 if you are a shy person and enter 2 if you want to talk to other people"
        }])
        // const user = new Person(userName.UserName, userValue.UserValue);
        this.name = userName.UserName
        this.value = userValue.UserValue

        if (userValue.UserValue === 1) {
            this.Shy()
        } else if (userValue.UserValue === 2) {
            this.Friend()
        } else {
            console.log(chalk.redBright("Please enter correct number"));

        }
        // console.log(user);

    }
    Shy() {
        console.log(chalk.cyan(`\nYour name is  ${this.name.charAt(0).toUpperCase() + this.name.slice(1)} and you are a shy person 🙈`));

    }
    Friend() {
        console.log(chalk.cyan(`\nYour name is  ${this.name.charAt(0).toUpperCase() + this.name.slice(1)} and you are a friendly 🤗`));


    }

}

const user = new Person()
user.UserAnswer()