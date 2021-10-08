module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // create a new user
  router.post("/create", controller.create);

  // get a single user
  router.get("/login", controller.login);
  
  // edit a single user
  router.post("/edit", controller.edit);

  // delete a single user
  router.get("/delete", controller.delete);

  // add routes to server
  app.use("/api/user", router);
};
