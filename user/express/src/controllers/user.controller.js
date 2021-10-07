const db = require("../database");
const argon2 = require("argon2");

/*
 * Create a new user
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
 * Get a single user
 */ 
exports.login = async (req, res) => {
  // get user by username
  const user = await db.user.findOne({ where: { username: req.query.username } }); 
  
  // check if user doesn't exist or password is incorrect
  if (user === null || await argon2.verify(user.password, req.query.password) === false)
    res.json(null); // login failed
  else
    res.json(user); // login successful
};


/*
 * Edit a single user
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
