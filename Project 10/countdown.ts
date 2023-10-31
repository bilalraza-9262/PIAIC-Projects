import chalk from "chalk";

function Countdown(targetDate: Date) {

  let now: Date = new Date();
  let actualTime: number = targetDate.getTime() - now.getTime();


  const seconds: number = Math.floor(actualTime / 1000) % 60;
  const hours: number = Math.floor((actualTime / (1000 * 60 * 60)) % 24);
  const minutes: number = Math.floor((actualTime / (1000 * 60)) % 60);
  const days: number = Math.floor(actualTime / (1000 * 60 * 60 * 24));


  const formattedDays: string = days.toString()
  const formattedHours: string = hours.toString()
  const formattedMinutes: string = minutes.toString()
  const formattedSeconds: string = seconds.toString()
  if (days > 0) {
    console.log(chalk.greenBright("\nOur Wensite is coming soon!\n"));
    console.log(`Days: ${chalk.blueBright(formattedDays)}, Hours: ${chalk.blueBright(formattedHours)}, Minutes: ${chalk.blueBright(formattedMinutes)}, Seconds: ${formattedSeconds}`);
  } else {
    console.log(chalk.yellowBright("\nWebsite has launched"));

  }

  //   console.log(`Days ${days} Hourse ${hours} Minutes ${minutes} Seconds ${seconds}`);

}
let launchedDate = new Date("2024-10-09");

setInterval(() => {
  Countdown(launchedDate)
}, 1000);




