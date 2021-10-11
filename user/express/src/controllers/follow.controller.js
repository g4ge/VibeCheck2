const db = require("../database");

/*
 * Add a new following user
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
 * Remove a following user
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
