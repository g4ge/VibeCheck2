module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // create a new user
  router.post("/create", controller.create);

  // get the single user if the username and password are a match
  router.get("/login", controller.login);

  // add routes to server
  app.use("/api/user", router);
};
