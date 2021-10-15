const db = require("../database");
const argon2 = require("argon2");

/*
 * Create a new user with user details
 * --------------------
 * success: user
 * fail   : null
 */ 
exports.create = async (req, res) => {
  // get user by username
  const user = await db.user.findOne({ where: { username: req.body.username } }); 

  let newUser = null;

  // if no user with similar username exists, create a new user
  if (user === null) {
    const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  
    newUser = await db.user.create({
      username: req.body.username,
      password: hash,
      name: req.body.name,
      email: req.body.email
    });
  }

  res.json(newUser);
};


/*
 * Authenticate a single user with username & password
 * --------------------
 * success: user
 * fail   : error message
 */ 
exports.login = async (req, res) => {
  // get user by username
  const user = await db.user.findOne({ where: { username: req.query.username } }); 
  
  // check if user doesn't exist or password is incorrect
  if (user === null || await argon2.verify(user.password, req.query.password) === false) {
    res.json({ error: "Incorrect username or password" }); // login failed
  } else {
    // check if user has been blocked/unblocked by admin
    if (user.status)
      res.json(user); // login successful
    else
      res.json({ error: "Account has been blocked by admin" }); // login failed
  }
};


/*
 * Edit a single user with user details
 * --------------------
 * success: user
 * fail   : error message
 */ 
exports.edit = async (req, res) => {
  const user = await db.user.findByPk(req.query.id); // get user by id
  const isPasswordCorrect = await argon2.verify(user.password, req.body.curPassword); // verify password

  if (isPasswordCorrect) {
    // get user by username
    const userByUsername = await db.user.findOne({ where: { username: req.body.username } }); 
    
    // check for user with duplicate username
    if (userByUsername === null || userByUsername.id === parseInt(req.query.id)) {
      // edit user fields if username is unique / not changed
      user.username = req.body.username;
      user.name = req.body.name;
      user.email = req.body.email;
      user.avatar = req.body.avatar;
      
      // edit password if new password is supplied
      if (req.body.newPassword.length) {
        const hash = await argon2.hash(req.body.newPassword, { type: argon2.argon2id });
        user.password = hash;
      }
      
      await user.save();
      res.json(user); // edit successful

    } else {
      res.json({ error: "Duplicate username. Please try again." }); // edit failed
    }
  } else {
    res.json({ error: "Incorrect password. Please try again." }); // edit failed
  }
};


/*
 * Delete a single user with id & password (i.e. purge user data from database)
 * --------------------
 * success: null
 * fail   : error message
 */ 
exports.delete = async (req, res) => {
  const user = await db.user.findByPk(req.query.id); // get user by id
  const isPasswordCorrect = await argon2.verify(user.password, req.query.password); // verify password

  if (isPasswordCorrect) {
    // remove all posts of the deleted user
    const posts = await db.post.findAll({ where: { authorId: req.query.id } });  // get all posts by authorId
    for (let post of posts) {
      post.authorId = 1; // point the author to the dummy user with id 1
      post.isAuthorDeleted = true;
      post.isContentDeleted = true;
      post.content = " This post has been removed as the author does not exist anymore.";
      post.imageUrl = "";
      post.likeCount = 0;
      post.dislikeCount = 0;
    
      await post.save();
    }

    // remove all follower/following connection of the deleted user
    await db.follow.destroy({
      where: {
        [db.Op.or]: [{ followerId: req.query.id }, { followingId: req.query.id } ]
      }
    });
    
    // remove all liked posts of the deleted user
    await db.like.destroy({ where: { userId: req.query.id } });
    
    // remove all disliked posts of the deleted user
    await db.dislike.destroy({ where: { userId: req.query.id } });
      
    // purge user data 
    await db.user.destroy({ where: { id: req.query.id } });
    
    res.json(null) // delete successful
  } else {
    res.json({ error: "Incorrect password." }); // delete failed
  }
};


/*
 * Get a single user with id
 * --------------------
 * success: user
 * fail   : null
 */ 
exports.profile = async (req, res) => {
  const user = await db.user.findByPk(req.query.id); // get user by id

  if (user) 
    res.json(user)
  else
    res.json(null)
};
