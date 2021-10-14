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

  type Post {
    id: Int,
    rootId: Int,
    parentId: Int,
    content: String,
    imageURL: String,
    isContentEdited: Boolean,
    isContentDeleted: Boolean,
    isAuthorDeleted: Boolean,
    linkCount: Int,
    dislikeCount: Int,
    postedDate: String,
    editedDate: String,
    authorId: Int,
    user: User
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
    all_posts: [Post]
    all_replies(rootId: Int): [Post]
  }

  # mutations -----------------------------------
  type Mutation {
    edit_user(input: UserInput): User,
    remove_post(id: Int): Post
  }
`);

// resolver function for each API endpoint.
graphql.root = {

  // queries ------------------------------------
  all_users: async () => {
    return await db.user.findAll({ where: { id: { [db.Op.ne]: 1 } } });
  },
  
  all_posts: async () => {
    return await db.post.findAll({
      include: { model: db.user },
      where: { rootId: 0, parentId: 0 }
    });
  },

  all_replies: async (args) => {
    return await db.post.findAll({
      include: { model: db.user },
      where: { rootId: args.rootId }
    });
  },

  // mutations ----------------------------------
  edit_user: async (args) => {
    const user = await db.user.findByPk(args.input.id); // get user by id
  
    // edit user fields
    user.username = args.input.username;
    user.password = args.input.password;
    user.name = args.input.name;
    user.email = args.input.email;
    user.avatar = args.input.avatar;

    await user.save();
    return user;
  },

  remove_post: async (args) => {
    const post = await db.post.findByPk(args.id); // get post by id

    // remove post
    post.isContentDeleted = true;
    post.content = " This " + (post.rootId === 0 && post.parentId === 0 ? "post" : "reply") + " has been deleted by the admin."
    post.imageUrl = "";
    post.likeCount = 0;
    post.dislikeCount = 0;
    await post.save();

    // remove all likes of the post
    await db.like.destroy({ where: { postId: args.id } });
      
    // remove all dislikes of the post
    await db.dislike.destroy({ where: { postId: args.id } });

    return post;
  },
};

module.exports = graphql;
