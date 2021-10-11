const db = require("../database");

/*
 * Add a dislike to a post
 * --------------------
 * success: dislike
 */ 
exports.add = async (req, res) => {
  // add a new like to the post
  const dislike = await db.dislike.create({
    userId: req.query.userId,
    postId: req.query.postId
  });

  // update dislike count on the post
  const post = await db.post.findByPk(req.query.postId); // get post by id
  post.dislikeCount += 1;
  await post.save();

  res.json(dislike);
};


/*
 * Remove a dislike from a post
 * --------------------
 * success: null
 */ 
exports.remove = async (req, res) => {
  // remove a like from the post
  await db.dislike.destroy({ 
    where: { 
      userId: req.query.userId,
      postId: req.query.postId
    } 
  });

  // update dislike count on the post
  const post = await db.post.findByPk(req.query.postId); // get post by id
  post.dislikeCount -= 1;
  await post.save();

  res.json(null);
};


/*
 * Check if a user has disliked the post
 * --------------------
 * success: true
 * fail   : false
 */ 
exports.status = async (req, res) => {
  // get the dislike status if a user has disliked the post
  const dislike = await db.dislike.findOne({ 
    where: { 
      userId: req.query.userId,
      postId: req.query.postId 
    } 
  }); 
  
  res.json(dislike ? true : false);
};
