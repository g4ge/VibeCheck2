module.exports = (express, app) => {
  const controller = require("../controllers/like.controller.js");
  const router = express.Router();

  // add a like to a post
  router.get("/add", controller.add);
  
  // remoev a like from a post
  router.get("/remove", controller.remove);

  // check if a user has liked the post
  router.get("/status", controller.status);

  // add routes to server
  app.use("/api/like", router);
};
