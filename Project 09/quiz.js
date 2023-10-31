import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.yellowBright("\nWelcome to the MCQ's based Quiz Game!"));
console.log("------------------------------------");
//here explain questions and answers
let questions = [
    "\nQ 01 : Who is the Founder of PIAIC?",
    "\nQ 02 : Who made Typescript?",
    "\nQ 03 : What is the purpose of type annotations in TypeScript?",
    "\nQ 04 : What is TypeScript primarily used for?",
    "\nQ 05 : which one is the most used programming languages among developers worldwide as of 2023?"
];
let correctAnswers = [
    "b)Dr. Arif Alvi",
    "b)Anders Hejlsberg",
    "a)To specify the data type of a variable",
    "b)Front-end web development",
    "c)JavaScript"
];
//here define score value
let score = 0;
async function Quiz_game() {
    while (true) {
        //here start user input
        let userAnswer = await inquirer.prompt([
            {
                name: "answer01",
                type: "list",
                message: questions[0],
                choices: ["a)Zia Khan", "b)Dr. Arif Alvi", "c)DR. Imran"]
            },
            {
                name: "answer02",
                type: "list",
                message: questions[1],
                choices: ["a)Brendan Eich", "b)Anders Hejlsberg", "c)Guido van Rossum"]
            },
            {
                name: "answer03",
                type: "list",
                message: questions[2],
                choices: [
                    "a)To specify the data type of a variable",
                    "b)To define a new class",
                    "c)To create an interface"
                ],
            },
            {
                name: "answer04",
                type: "list",
                message: questions[3],
                choices: [
                    "a)Server-side programming",
                    "b)Front-end web development",
                    "c)Data analysis"
                ]
            },
            {
                name: "answer05",
                type: "list",
                message: questions[4],
                choices: [
                    "a)SQL",
                    "b)Python",
                    "c)JavaScript"
                ]
            }
        ]);
        console.log(chalk.hex("#e7f2c4")("\n Check answers"));
        console.log(" " + "-------------");
        for (let i = 0; i < questions.length; i++) {
            const answers = userAnswer[`answer0${i + 1}`];
            // 
            if (answers === correctAnswers[i]) {
                console.log(`answer${i + 1}: ${chalk.green("Correct!")}`);
                score += 2;
            }
            else {
                console.log(`answer${i + 1}: ${chalk.red("Wrongt!")}`);
            }
        }
        let percentage = (score / 10) * 100;
        if (percentage >= 60) {
            console.log(`\nCongratulations! 🙌  you are a winner, you got score ${score} out of 10`);
        }
        else if (score <= 4) {
            console.log(`\n😢 You lose, you got score ${score} out of 10`);
        }
        ;
        const playAgain = await inquirer.prompt({
            name: "tryAgain",
            type: "confirm",
            message: "\nDo you want to play again? ",
            default: false
        });
        if (!playAgain.tryAgain) {
            console.log("\nGood bye!\n");
            break;
        }
        else {
            score = 0;
        }
    }
}
//here fubnction call
Quiz_game();
// for (let i = 0; i < questions.length; i++) {
//     // const  one_by_one_questions= questions[i];
//     // console.log(one_by_one_questions);
//     // const one_by_one_choices=await choices[`answer0${i+1}`];
//     // console.log(one_by_one_choices);
//     if (userAnswer[`answer0${i+1}`]===correctAnswers[i]) {
//          console.log("Your answer is correct!");
//          score+=2;
//     } else {
//          console.log("Your answer is wrong!");
//     };
// };
