module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // create a new post
  router.post("/create", controller.create);
  
  // add image url of a post
  router.get("/image", controller.image);

  // get all posts (root post only)
  router.get("/all", controller.all);

  // get all replies to a root post
  router.get("/replies", controller.replies);
  
  // edit a single post/reply
  router.post("/edit", controller.edit);

  // add routes to server
  app.use("/api/post", router);
};
