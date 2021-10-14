const db = require("../database");


/*
 * Update user's day usage upon login
 * --------------------
 * success: usage
 */ 
exports.updateStart = async (req, res) => {
  // get user's usage today
  const now = new Date();
  let usage = await db.usage.findOne({ where: { date: now, userId: req.query.userId } }); 

  if (usage === null) {
    // create new daily usage if there is no data entry today
    usage = await db.usage.create({ userId: req.query.userId });
  } else {
    // update existing usage (i.e. user last logged in time)
    usage.lastLogin = now;
    await usage.save();
  }

  res.json(usage);
};


/*
 * Update user's day usage upon logout
 * --------------------
 * success: usage
 */ 
exports.updateEnd = async (req, res) => {
  // get user's usage today
  const now = new Date();
  let usage = await db.usage.findOne({ where: { date: now, userId: req.query.userId } }); 
    
  // update existing usage (i.e. update time spent on last login session to total time spent in a day)
  usage.totalTimeSpent += getDurationInMin(usage.lastLogin, now);
  
  await usage.save();

  res.json(usage);
};


/*
 * Calculate duration of two times in mins
 */ 
const getDurationInMin = (startTime, endTime) => {
  const duration = endTime - startTime;
  const durationInMin = Math.round(duration / 60000); // convert ms to min
  return durationInMin;
}