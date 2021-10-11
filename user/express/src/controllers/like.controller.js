const db = require("../database");

/*
 * Add a like to a post
 * --------------------
 * success: like
 */ 
exports.add = async (req, res) => {
  // add a new like to the post
  const like = await db.like.create({
    userId: req.query.userId,
    postId: req.query.postId
  });

  // update like count on the post
  const post = await db.post.findByPk(req.query.postId); // get post by id
  post.likeCount += 1;
  await post.save();

  res.json(like);
};


/*
 * Remove a like from a post
 * --------------------
 * success: null
 */ 
exports.remove = async (req, res) => {
  // remove a like from the post
  await db.like.destroy({ 
    where: { 
      userId: req.query.userId,
      postId: req.query.postId
    } 
  });

  // update like count on the post
  const post = await db.post.findByPk(req.query.postId); // get post by id
  post.likeCount -= 1;
  await post.save();

  res.json(null);
};


/*
 * Check if a user has liked the post
 * --------------------
 * success: true
 * fail   : false
 */ 
exports.status = async (req, res) => {
  // get the like status if a user has liked the post
  const like = await db.like.findOne({ 
    where: { 
      userId: req.query.userId,
      postId: req.query.postId 
    } 
  }); 
  
  res.json(like ? true : false);
};
