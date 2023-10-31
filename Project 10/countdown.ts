function Countdown(targetDate:Date) {



    let now = new Date();
    let actualTime = targetDate.getTime() - now.getTime();
    

    const seconds = Math.floor(actualTime / 1000) % 60;
    const hours = Math.floor((actualTime / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((actualTime / (1000 * 60)) % 60);
    const days = Math.floor(actualTime / (1000 * 60 * 60 * 24));

  console.log("Our Wensite is coming soon!");
  const formattedDays = days.toString().padStart(2, '0');
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  console.log(`Days: ${formattedDays} Hours: ${formattedHours} Minutes: ${formattedMinutes} Seconds: ${formattedSeconds}`);
//   console.log(`Days ${days} Hourse ${hours} Minutes ${minutes} Seconds ${seconds}`);
  
}
let launchedDate = new Date("2024-10-09");

setInterval(()=>{
    Countdown(launchedDate)
}, 1000);




