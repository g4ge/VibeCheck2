module.exports = (express, app) => {
  const controller = require("../controllers/usage.controller.js");
  const router = express.Router();

  // update user's day usage upon login
  router.get("/updateStart", controller.updateStart);
  
  // update user's day usage upon logout
  router.get("/updateEnd", controller.updateEnd);

  // add routes to server
  app.use("/api/usage", router);
};
