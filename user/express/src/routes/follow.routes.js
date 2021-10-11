module.exports = (express, app) => {
  const controller = require("../controllers/follow.controller.js");
  const router = express.Router();

  // add a new following user
  router.get("/add", controller.add);
  
  // remove a new following user
  router.get("/remove", controller.remove);

  // add routes to server
  app.use("/api/follow", router);
};
