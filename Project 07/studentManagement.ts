//here import inquirer & chalk
import inquirer from "inquirer";
import chalk from "chalk";

//here defined type of static keyword in Class
type Static_Student = {
    id: number,
    name: string,
    courses: string,
    balance: number,
    amount: number,
    age: number
};
//her start class
class StudentManager {
    static students: Static_Student[] = [];
    id: number;
    name: string;
    courses: string
    balance: number;
    amount: number;
    age: number;

    constructor() {
        this.id = 0;
        this.name = '';
        this.courses = '';
        this.balance = 0;
        this.amount = 0;
        this.age = 0;
    };

    //here start enrollStudent method for Enrollrd Student
    async enrollStudent() {
        console.log(chalk.hex("#cf9d40")("\nFill the form for enrolling"));

        const userEnroll = await inquirer.prompt([
            {
                name: "userName",
                type: "input",
                message: "Enter your name here:",
            },
            {
                name: "userAge",
                type: "number",
                message: "Enter your age here:",
            },
            {
                name: "userCourse",
                type: "list",
                message: "Select any course",
                choices: ["Web Development", "Digital Marketing", "Freelancing"],
            },
            {
                name: "userBalance",
                type: "number",
                message: "How much is your balance for paying fees: "
            }
        ]);

        if (isNaN(userEnroll.userBalance) || userEnroll.userBalance === 0) {
            console.log("Enter valid amount");

        } else if (userEnroll.userName == '' || isNaN(userEnroll.userAge)) {
            console.log("Please fill correctly");

        } else {
            this.name = userEnroll.userName.charAt(0).toUpperCase() + userEnroll.userName.slice(1).toLowerCase();;
            this.age = userEnroll.userAge;
            this.balance = userEnroll.userBalance;
            this.courses = userEnroll.userCourse;
            this.id = Math.floor(Math.random() * 90000) + 10000

            StudentManager.students.push({  //adding in main array of all students
                id: this.id,
                name: this.name,
                courses: this.courses,
                balance: this.balance,
                amount: 0,
                age: this.age
            });

            // console.log(StudentManager.students)
            console.log(`${this.name} has been enrolled in ${userEnroll.userCourse} course.`);

        };
    };// here end enrollStudent method

    async payTuitionFees() {
        if (this.name === '') {
            console.log("Before enrolling, you can not pay any tuition fees ");

        } else {
            const amountToPay = await inquirer.prompt({
                name: "paymentAmount",
                type: "number",
                message: `Enter the tuition fee amount to pay for ${this.name} for ${this.courses} course: `,
            });

            if (isNaN(amountToPay.paymentAmount)) {

                console.log("Enter valid amount");

            } else if (amountToPay.paymentAmount <= this.balance) {

                this.amount = amountToPay.paymentAmount;
                this.balance -= this.amount;

                console.log(`${this.name} has paid $${amountToPay.paymentAmount} tuition fees.`);

                // jo students ki array banai hai us me bh amount minus krwa rehe hain
                for (let i = 0; i < StudentManager.students.length; i++) {

                    if (StudentManager.students[i].name === this.name) {

                        StudentManager.students[i].balance = StudentManager.students[i].balance - amountToPay.paymentAmount;
                        StudentManager.students[i].amount = amountToPay.paymentAmount;

                        // console.log(StudentManager.students);
                        break; // Break out of the loop once ;the user is found and updated
                    };
                };

            } else {
                console.log(`${this.name} doesn't have sufficient balance.`);
            };
        };
    };

    viewBalance() {

        if (isNaN(this.balance) || this.balance === 0) {
            console.log("You have no balance because you are not enrolled.");

        } else {
            console.log(`${this.name}'s balance: $${this.balance}`);
        };

    };

    Status() {
        if (this.name === '') {
            console.log("You have not enroll any student");

        } else {
            console.log('\n-------------X-------------X-------------X-------------');
            console.log('-------------X--------All Students--------X-------------');
            console.log('-------------X-------------X-------------X-------------\n');

            StudentManager.students.forEach((stud) => {

                console.log(`Student id: ${stud.id}`);
                console.log(`Name is: ${stud.name}`);
                console.log(`Age is ${stud.age}`);
                console.log(`Course Enrolled: ${stud.courses}`);
                console.log(`Your balance is $${stud.balance}`);
                console.log(`Your course amount is $${stud.amount}`);

                if (stud.amount === 0) {
                    console.log("\nYou have not paid course amount");

                } else {
                    console.log("You have paid your course amount");

                }

                console.log('\n-------------X-------------X-------------X-------------\n');
            });
        };
    };
};

async function main() {
    const student_01 = new StudentManager();
    while (true) {
        const userAction = await inquirer.prompt([{
            name: "userAction",
            type: "list",
            message: "Choose your action",
            choices: ["Enroll Student", "View Balance", "Pay fees", "Show Status", "Exit"]
        }]);

        switch (userAction.userAction) {
            case "Enroll Student":
                await student_01.enrollStudent();
                break;
            case "View Balance":
                student_01.viewBalance();
                break;
            case "Pay fees":
                await student_01.payTuitionFees()
                break;
            case "Show Status":
                student_01.Status();
                break;
            case "Exit":
                console.log("Goodbye!");
                process.exit(0);
        };
    };
};

main();


