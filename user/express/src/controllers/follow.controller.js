const db = require("../database");

/*
 * Add a new followed user
 * --------------------
 * success: connection
 */ 
exports.add = async (req, res) => {
  const follow = await db.follow.create({
    followerId: req.query.followerId,
    followingId: req.query.followingId
  });

  res.json(follow);
};


/*
 * Remove a followed user
 * --------------------
 * success: null
 */ 
exports.remove = async (req, res) => {
  await db.follow.destroy({ 
    where: { 
      followerId: req.query.followerId,
      followingId: req.query.followingId
    } 
  });

  res.json(null);
};


/*
 * Get all followed users
 * --------------------
 * success: users
 */ 
exports.followed = async (req, res) => {
  // eager load all users
  const users = await db.follow.findAll({
    include: { model: db.user },
    where: { followerId: req.query.followerId }
  });

  res.json(users); 
};


/*
 * Get all unfollowed users
 * --------------------
 * success: users
 */ 
exports.unfollowed = async (req, res) => {
  // get all followed users (eager load all users)
  const followedUsers = await db.follow.findAll({
    include: { model: db.user },
    where: { followerId: req.query.followerId }
  });

  // extract the followed user id's
  let followedUsersId = followedUsers.map(user => user.followingId);
  followedUsersId.push(1); // add dummy user id
  followedUsersId.push(req.query.followerId); // add self user id

  // get all unfollowed users (i.e. users excluding followed users, dummy user and the user itself)
  const unfollowedUsers = await db.user.findAll({ where: { id: { [db.Op.notIn]: followedUsersId } } });
  
  res.json(unfollowedUsers); 
};


/*
 * Check if a user has followed another user
 * --------------------
 * success: true
 * fail   : false
 */ 
exports.status = async (req, res) => {
  // get the follow connection if a user follows another user
  const follow = await db.follow.findOne({ 
    where: { 
      followerId: req.query.followerId, 
      followingId: req.query.followingId } 
  }); 
  
  res.json(follow ? true : false);
};
