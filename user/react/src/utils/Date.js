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

function convertTimestampToDate(timestampStr) {
  /*
   * convert database datetime into new string format:
   * 2021-10-07T09:54:39.000Z -> 7 Oct 2021
   */
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric'
  };

  const epoch = Date.parse(timestampStr); // convert timestamp in string into epoch
  const datetime = new Date(epoch); // convert epoch to js datetime
  const dateStr = datetime.toLocaleDateString('en-AU', options); // convert js datetime into specifed format
  
  return dateStr;
}

export {
  getCurrentDate,
  getCurrentTime,
  getMsSinceEpoch,
  convertTimestampToDate
}
  