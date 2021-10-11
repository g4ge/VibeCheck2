const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// database will be sync'ed in the background
db.sync();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// add CORS support
app.use(cors());

// add routes
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/post.routes.js")(express, app);
require("./src/routes/follow.routes.js")(express, app);

// set port and listen for requests
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
