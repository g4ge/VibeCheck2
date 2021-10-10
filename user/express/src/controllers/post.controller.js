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
