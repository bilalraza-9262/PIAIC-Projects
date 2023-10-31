// here import
import inquirer from "inquirer";
let innerWhile = true;
async function getUserDetails() {
    let userInput = await inquirer.prompt([
        {
            name: "username",
            type: "string",
            message: "Please enter your name here",
        },
        {
            name: "usergender",
            type: "list",
            message: "Select your gender here",
            choices: ["Male", "Female"]
        },
        {
            name: "usernumber",
            type: "number",
            message: "Please enter your Phone number here",
        },
        {
            name: "userBalance",
            type: "number",
            message: "Please enter your current balance here",
        }
    ]);
    let phoneNumber = userInput.usernumber;
    if (typeof userInput.username == "number") {
        console.log("Enter a correct name");
        return getUserDetails();
    }
    else if (isNaN(userInput.usernumber) || isNaN(userInput.userBalance)) {
        console.log("Please enter valid numbers for phone number and balance.");
        return getUserDetails();
    }
    else if (userInput.userBalance < 1000 || phoneNumber.toString().split("").length < 11) {
        console.log("PLease enter a valid phone number or balance, your balance must be greater then or equal to 1000 ruppes or your phone number must be 11 characters");
        return getUserDetails();
    }
    return userInput;
}
async function main() {
    let callFunction = await getUserDetails();
    const customer_class = new Customer(callFunction.username, callFunction.usergender, callFunction.usernumber, callFunction.userBalance);
    while (innerWhile) {
        const account_details = await inquirer.prompt([
            {
                name: "ThreeDetails",
                type: "list",
                choices: ["Account Details", "Money out", "Exit from Account"]
            }
        ]);
        if (account_details.ThreeDetails === "Account Details") {
            customer_class.Account_details();
        }
        else if (account_details.ThreeDetails === "Money out") {
            const takingMoney = await inquirer.prompt([{
                    name: "DebitCredit",
                    type: "list",
                    choices: ["Debit", "Credit"]
                }]);
            if (takingMoney.DebitCredit === "Credit") {
                const creditMoney = await inquirer.prompt([{
                        name: "Credit",
                        type: "number",
                        message: "Please enter amount "
                    }]);
                if (isNaN(creditMoney.Credit)) {
                    console.log("Please enter a valid number");
                }
                else {
                    customer_class.Credit(creditMoney.Credit);
                }
            }
            else {
                const debitMoney = await inquirer.prompt([{
                        name: "Debit",
                        type: "list",
                        choices: [1000, 5000, 10000, 150000, 20000]
                    }]);
                customer_class.Debit(debitMoney.Debit);
            }
        }
        else if (account_details.ThreeDetails === "Exit from Account") {
            innerWhile = false;
        }
    }
}
class Customer {
    _name;
    _gender;
    _phone;
    _balance;
    constructor(name, gender, phone, balance) {
        this._name = name;
        this._gender = gender;
        this._phone = phone;
        this._balance = balance;
    }
    //here account details method
    Account_details() {
        console.log("\n-------------Account Details----------------\n");
        console.log(`Your name is ${this._name.charAt(0).toUpperCase() + this._name.slice(1)}`);
        console.log(`Your gender is ${this._gender}`);
        console.log(`Your Phone number is ${this._phone}`);
        console.log(`Your Account balance is ${this._balance}`);
    }
    //here Credit method
    Credit(creditAmount) {
        if (this._balance === 0) {
            console.log("Insufficient fBalance");
        }
        else if (this._balance < creditAmount) {
            console.log("Please enter a correct amount because your amount is greater hen your balance");
        }
        else {
            this._balance -= creditAmount;
            console.log(`\nyou have ${this._balance} balance left`);
        }
    }
    //here debit method
    Debit(debit_amount) {
        if (this._balance < debit_amount) {
            console.log("Please enter a correct amount because your amount is greater hen your balance");
        }
        else {
            this._balance -= debit_amount;
            console.log(`\nyou have ${this._balance} balance left`);
        }
    }
}
main();
