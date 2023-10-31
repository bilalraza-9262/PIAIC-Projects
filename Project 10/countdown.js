import chalk from "chalk";
function Countdown(targetDate) {
    let now = new Date();
    let actualTime = targetDate.getTime() - now.getTime();
    const seconds = Math.floor(actualTime / 1000) % 60;
    const hours = Math.floor((actualTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((actualTime / (1000 * 60)) % 60);
    const days = Math.floor(actualTime / (1000 * 60 * 60 * 24));
    const formattedDays = days.toString();
    const formattedHours = hours.toString();
    const formattedMinutes = minutes.toString();
    const formattedSeconds = seconds.toString();
    if (days > 0) {
        console.log(chalk.greenBright("\nOur Wensite is coming soon!\n"));
        console.log(`Days: ${chalk.blueBright(formattedDays)}, Hours: ${chalk.blueBright(formattedHours)}, Minutes: ${chalk.blueBright(formattedMinutes)}, Seconds: ${formattedSeconds}`);
    }
    else {
        console.log(chalk.yellowBright("\nWebsite has launched"));
    }
    //   console.log(`Days ${days} Hourse ${hours} Minutes ${minutes} Seconds ${seconds}`);
}
let launchedDate = new Date("2024-10-09");
setInterval(() => {
    Countdown(launchedDate);
}, 1000);
