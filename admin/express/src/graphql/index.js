const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = {};

// construct a schema using GraphQL schema language
graphql.schema = buildSchema(`
  # types ---------------------------------------
  type User {
    id: Int,
    username: String,
    password: String,
    name: String,
    email: String,
    avatar: String,
    status: Boolean
  }

  # inputs --------------------------------------
  input UserInput {
    id: Int,
    username: String,
    password: String,
    name: String,
    email: String,
    avatar: String,
    status: Boolean,
  }

  # queries -------------------------------------
  type Query {
    all_users: [User]
  }

  # mutations -----------------------------------
  type Mutation {
    edit_user(input: UserInput): User,
  }
`);

// resolver function for each API endpoint.
graphql.root = {

  // queries ------------------------------------
  all_users: async () => {
    return await db.user.findAll({ where: { id: { [db.Op.ne]: 1 } } });
  },

  // mutations ----------------------------------
  edit_user: async (args) => {
    const user = await db.user.findByPk(args.input.id);
  
    // edit user fields
    user.username = args.input.username;
    user.password = args.input.password;
    user.name = args.input.name;
    user.email = args.input.email;
    user.avatar = args.input.avatar;

    await user.save();
    return user;
  },
};

module.exports = graphql;
