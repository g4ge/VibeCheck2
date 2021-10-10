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


// relate post and user
db.post.belongsTo(db.user, { foreignKey: { name: "authorId", allowNull: false } });


// include a sync option with seed data logic included
db.sync = async () => {
  // sync schema
  await db.sequelize.sync();
  await seedData();
};


async function seedData() {
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
    status: false
  });

  hash = await argon2.hash("qqQQ11!!", { type: argon2.argon2id });
  await db.user.create({ 
    username: "Violetto",
    password: hash,
    name: "Violet Evergarden",
    email: "violet@evergarden.com"
  });

  hash = await argon2.hash("qqQQ11!!", { type: argon2.argon2id });
  await db.user.create({ 
    username: "Mai",
    password: hash,
    name: "Mai Sakurajima",
    email: "mai@sakurajima.com"
  });
}

module.exports = db;
