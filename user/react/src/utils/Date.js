function convertTimestampToDate(timestampStr) {
  /*
   * convert database datetime into new date string format:
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


function convertTimestampToTime(timestampStr) {
  const epoch = Date.parse(timestampStr); // convert timestamp in string into epoch
  const datetime = new Date(epoch); // convert epoch to js datetime

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


function convertTimestampToDateTime(timestampStr) {
  const date = convertTimestampToDate(timestampStr);
  const time = convertTimestampToTime(timestampStr);
  
  return date + " | " + time;
}


export {
  convertTimestampToDate,
  convertTimestampToTime,
  convertTimestampToDateTime
}
  