function getCurrentDate() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // get current javascript datetime
  const today = new Date();

  // add leading zero to single digit
  const day = today.getDate() < 10 ? "0" + today.getDate() : today.getDate(); 
  const month = months[today.getMonth()];
  const year = today.getFullYear();
  
  return day + " " + month + " " + year;
}

function getCurrentTime() {
  // get current javascript datetime
  const today = new Date();
  
  let hour = today.getHours();
  // add leading zero to single digit minute
  const min = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes(); 
 
  // convert to 12-hour format
  const ampm = hour < 12 ? "am" : "pm"; 
  if (hour > 12) 
    hour -= 12;
  if (hour === 0) 
    hour = 12;

  // add leading zero to single digit hour
  if (hour < 10) 
    hour = "0" + hour; 
  
  return hour + ":" + min + ampm;
}

function getMsSinceEpoch() {
  // get current javascript datetime
  const today = new Date();

  // return number of milliseconds since epoch in string
  return (today.getTime()).toString();
}

export {
  getCurrentDate,
  getCurrentTime,
  getMsSinceEpoch
}
  