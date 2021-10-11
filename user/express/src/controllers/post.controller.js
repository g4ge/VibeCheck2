const db = require("../database");

/*
 * Create a new post with post details
 * --------------------
 * success: post
 */ 
exports.create = async (req, res) => {
  const newPost = await db.post.create({
    authorId: req.body.authorId,
    rootId: req.body.rootId,
    parentId: req.body.parentId,
    imageURL: "",
    content: req.body.content
  });

  res.json(newPost);
};


/*
 * Add image url of a post
 * --------------------
 * success: post
 */ 
exports.image = async (req, res) => {
  const post = await db.post.findByPk(req.query.id); // get post by id
  post.imageURL = req.query.imageURL; // update image URL
  await post.save();

  res.json(post);
};


/*
 * Get all posts (root post only, i.e. post with rootId = 0, parentId = 0)
 * --------------------
 * success: posts
 */ 
exports.all = async (req, res) => {
  // eager load all posts
  const posts = await db.post.findAll({
    include: { model: db.user },
    where: { rootId: 0, parentId: 0 }
  });

  res.json(posts);
};


/*
 * Get all replies to a root post
 * --------------------
 * success: replies
 */ 
exports.replies = async (req, res) => {
  // eager load all posts
  const replies = await db.post.findAll({
    include: { model: db.user },
    where: { rootId: req.query.rootId }
  });

  res.json(replies);
};


/*
 * Edit a single post/reply
 * --------------------
 * success: post/reply
 */ 
exports.edit = async (req, res) => {
  const post = await db.post.findByPk(req.query.id); // get post by id
  
  // edit post
  post.content = req.body.content;
  post.isContentEdited = true;
  
  await post.save();

  res.json(post);
};


/*
 * Remove a single post/reply (item still exists in table after removal)
 * --------------------
 * success: null
 */ 
exports.remove = async (req, res) => {
  const post = await db.post.findByPk(req.query.id); // get post by id

  // remove post
  post.isContentDeleted = true;
  post.content = " This post has been deleted by the author."
  post.imageUrl = "";
  post.likeCount = 0;
  post.dislikeCount = 0;
  
  await post.save();

  res.json(null);
};


/*
 * Get all posts & replies of a user
 * --------------------
 * success: posts & replies
 */ 
exports.user = async (req, res) => {
  // eager load all posts
  const posts = await db.post.findAll({
    include: { model: db.user },
    where: { authorId: req.query.authorId }
  });

  res.json(posts);
};
