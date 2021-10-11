module.exports = (express, app) => {
  const controller = require("../controllers/follow.controller.js");
  const router = express.Router();

  // add a new followed user
  router.get("/add", controller.add);
  
  // remove a new followed user
  router.get("/remove", controller.remove);

  // get all followed users
  router.get("/followed", controller.followed);

  // get all unfollowed users
  router.get("/unfollowed", controller.unfollowed);

  // add routes to server
  app.use("/api/follow", router);
};
