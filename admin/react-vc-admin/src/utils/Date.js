function convertTimestampToDate(epoch) {
  /*
   * convert database string epoch into new date string format:
   * 1634018401000 -> 12 Oct 2021
   */
  const options = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric'
  };

  const datetime = new Date(parseInt(epoch)); // convert epoch to js datetime
  const dateStr = datetime.toLocaleDateString('en-AU', options); // convert js datetime into specifed format
  
  return dateStr;
}


function convertTimestampToTime(epoch) {
  /*
   * convert database string epoch into new time string format:
   * 1634018401000 -> 05:00pm
   */
  const datetime = new Date(parseInt(epoch)); // convert epoch to js datetime

  let hour = datetime.getHours();
  // add leading zero to single digit minute
  const min = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes(); 
 
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


function convertTimestampToDateTime(epoch) {
  const date = convertTimestampToDate(epoch);
  const time = convertTimestampToTime(epoch);
  
  return date + " | " + time;
}


export {
  convertTimestampToDate,
  convertTimestampToTime,
  convertTimestampToDateTime
}
  