module.exports = (express, app) => {
  const controller = require("../controllers/usage.controller.js");
  const router = express.Router();

  // update user's day usage
  router.post("/update", controller.update);

  // add routes to server
  app.use("/api/usage", router);
};
