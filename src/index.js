let today = new Date();
let day = today.getDay();
let daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
];
let date =
  today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();

let hour = today.getHours();
if (hour < 9) {
  hour = `0${hour}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = hour + ":" + minutes;
let dateTime = date + " ⌚ " + time;

document.getElementById("displayDateTime").innerHTML =
  "📅 " + daylist[day] + ", " + dateTime;
