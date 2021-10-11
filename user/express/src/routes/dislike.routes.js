module.exports = (express, app) => {
  const controller = require("../controllers/dislike.controller.js");
  const router = express.Router();

  // add a dislike to a post
  router.get("/add", controller.add);
  
  // remoev a dislike from a post
  router.get("/remove", controller.remove);

  // check if a user has disliked the post
  router.get("/status", controller.status);

  // add routes to server
  app.use("/api/dislike", router);
};
