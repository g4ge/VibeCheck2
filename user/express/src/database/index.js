const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};


// create sequelize
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});


// include models
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.follow = require("./models/follow.js")(db.sequelize, DataTypes);
db.like = require("./models/like.js")(db.sequelize, DataTypes);
db.dislike = require("./models/dislike.js")(db.sequelize, DataTypes);
db.usage = require("./models/usage.js")(db.sequelize, DataTypes);


// relate tables
db.post.belongsTo(db.user, { foreignKey: { name: "authorId", allowNull: false } }); // post to user (many to one)
db.follow.belongsTo(db.user, { foreignKey: { name: "followingId", allowNull: false } }); // follower to following (one to one)
db.like.belongsTo(db.post, { foreignKey: { name: "postId", allowNull: false } }); // user to liked post (one to one)
db.dislike.belongsTo(db.post, { foreignKey: { name: "postId", allowNull: false } }); // user to disliked post (one to one)


// include a sync option with seed data logic included
db.sync = async () => {
  // sync schema
  await db.sequelize.sync();
  await seedUserData();
  await seedUsageData();
};


async function seedUserData() {
  const count = await db.user.count();

  // only seed data if necessary
  if (count > 0)
    return;

  const argon2 = require("argon2");

  // create a dummy user, all posts relate to this user if the original is deleted to overcome foreign key checks
  let hash = await argon2.hash("dummy", { type: argon2.argon2id });
  await db.user.create({ 
    username: "",
    password: hash,
    name: "",
    email: "",
    status: false,
    avatar: "AvatarQuestion"
  });

  hash = await argon2.hash("qqQQ11!!", { type: argon2.argon2id });
  await db.user.create({ 
    username: "Alice",
    password: hash,
    name: "Alice Smith",
    email: "alice@smith.com",
    avatar: "AvatarCat"
  });

  hash = await argon2.hash("qqQQ11!!", { type: argon2.argon2id });
  await db.user.create({ 
    username: "Bob",
    password: hash,
    name: "Bob Smith",
    email: "bob@smith.com",
    avatar: "AvatarCoffee"
  });

  hash = await argon2.hash("qqQQ11!!", { type: argon2.argon2id });
  await db.user.create({ 
    username: "Charlie",
    password: hash,
    name: "Charlie Smith",
    email: "charlie@smith.com",
    avatar: "AvatarConsole"
  });
}

async function seedUsageData() {
  const count = await db.usage.count();

  // only seed data if necessary
  if (count > 0)
    return;

  await db.usage.create({ 
    userId: 1,
  });
}

module.exports = db;
