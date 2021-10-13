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


// relate tables
db.post.belongsTo(db.user, { foreignKey: { name: "authorId", allowNull: false } }); // post to user (many to one)
db.follow.belongsTo(db.user, { foreignKey: { name: "followingId", allowNull: false } }); // follower to following (one to one)
db.like.belongsTo(db.post, { foreignKey: { name: "postId", allowNull: false } }); // user to liked post (one to one)
db.dislike.belongsTo(db.post, { foreignKey: { name: "postId", allowNull: false } }); // user to disliked post (one to one)


// include a sync option with seed data logic included
db.sync = async () => {
  // sync schema
  await db.sequelize.sync();
  await seedData();
};


module.exports = db;
