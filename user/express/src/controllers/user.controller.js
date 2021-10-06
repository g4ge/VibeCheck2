const db = require("../database");
const argon2 = require("argon2");

/*
 * create a new user
 */ 
exports.create = async (req, res) => {
  // get the user with the similar username in database
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
 * get a single user if the username and password are a match
 */ 
exports.login = async (req, res) => {
  const user = await db.user.findOne({ where: { username: req.query.username } });
  
  if (user === null || await argon2.verify(user.password, req.query.password) === false)
    res.json(null); // login failed
  else
    res.json(user); // login successful
};
