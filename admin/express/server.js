const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const db = require("./src/database");
const graphql = require("./src/graphql");

// database will be sync'ed in the background
db.sync();

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// add CORS support
app.use(cors());

// add GraphQL to express server
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
  })
);

// set port and listen for requests
const PORT = 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
