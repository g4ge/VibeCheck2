module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // create a new post
  router.post("/create", controller.create);
  
  // add image url of a post
  router.get("/image", controller.image);

  // add routes to server
  app.use("/api/post", router);
};