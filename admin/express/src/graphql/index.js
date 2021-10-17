const { buildSchema } = require("graphql");
const db = require("../database");
const argon2 = require("argon2");

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
    likeCount: Int,
    dislikeCount: Int,
    postedDate: String,
    editedDate: String,
    authorId: Int,
    user: User
  }

  type MostPopularPost {
    id: Int,
    rootId: Int,
    parentId: Int,
    content: String,
    imageURL: String,
    isContentEdited: Boolean,
    isContentDeleted: Boolean,
    isAuthorDeleted: Boolean,
    likeCount: Int,
    dislikeCount: Int,
    postedDate: String,
    editedDate: String,
    authorId: Int,
    user: User
    totalLikeCount: Int,
    totalDislikeCount: Int,
    totalReplyCount: Int
  }

  type Usage {
    id: Int,
    date: String,
    userId: Int,
    totalTimeSpent: Int,
    lastLogin: String
  }

  type Days {
    dates: [String],
    num_users: [Int],
    times_spent: [Int]
  }

  type Follow {
    id: Int,
    followerId: Int,
    followingId: Int,
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
    one_user(id: Int): User
    all_users: [User]
    all_posts: [Post]
    all_replies(rootId: Int): [Post]
    num_users_per_day: Days
    time_spent_per_day(userId: Int): Days
    all_following(id: Int): [Follow]
    all_followers(id: Int): [User]
    most_popular_post: MostPopularPost
  }

  # mutations -----------------------------------
  type Mutation {
    edit_user(input: UserInput): User,
    set_user_status(id: Int): User
    remove_post(id: Int): Boolean
    delete_user(id: Int): Boolean
  }
`);

// resolver function for each API endpoint.
graphql.root = {

  /*
   * queries ------------------------------------
   */
  
  // Get one user based on user id
  one_user: async (args) => {
    return await db.user.findByPk(args.id);
  },

  // Get all users except dummy user (i.e. user with id = 1)
  all_users: async () => {
    return await db.user.findAll({ where: { id: { [db.Op.ne]: 1 } } });
  },
  
  // Get all root posts (i.e. post with rootId = 0 and parentId = 0)
  all_posts: async () => {
    return await db.post.findAll({
      include: { model: db.user },
      where: { rootId: 0, parentId: 0 }
    });
  },

  // Get all replies to other posts/replies
  all_replies: async (args) => {
    return await db.post.findAll({
      include: { model: db.user },
      where: { rootId: args.rootId }
    });
  },

  // Get number of user per day for the last 7 days
  num_users_per_day: async () => {
    let dates = [];
    let num_users = [];

    const today = new Date();
    
    // iterate over last 7 days
    for (let i = 6; i >= 0; --i) {
      // get the day
      let day = new Date(today);
      day.setDate(day.getDate() - i);

      // get number of logged in users on the day
      const count = await db.usage.count({
        where: { 
          date: day,
          id: { [db.Op.ne]: 1 }
        }
      });

      // add date and user count to array
      dates.push(day.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }));
      num_users.push(count);
    }
    
    return { dates, num_users };
  },

  // Get time spent of a user per day in mins for the last 7 days
  time_spent_per_day: async (args) => {
    let dates = [];
    let times_spent = [];

    const today = new Date();
    
    // iterate over last 7 days
    for (let i = 6; i >= 0; --i) {
      // get the day
      let day = new Date(today);
      day.setDate(day.getDate() - i);

      // get user usage of the day
      const userUsage = await db.usage.findOne({ where: { date: day, userId: args.userId } });
        
      // add date and user count to array
      dates.push(day.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' }));
      times_spent.push(userUsage ? userUsage.totalTimeSpent : 0);
    }
    
    return { dates, times_spent };
  },

  // Get all users followed by the user
  all_following: async (args) => {
    return await db.follow.findAll({
      include: { model: db.user },
      where: { followerId: args.id }
    }); 
  },

  // Get all followers of the user
  all_followers: async (args) => {
    // get all connections where a user has followed the input user
    const follows = await db.follow.findAll({ where: { followingId: args.id } }); 
    
    let followers = [];

    for (const follow of follows) {
      const follower = await db.user.findByPk(follow.followerId);
      followers.push(follower);
    }

    return followers;
  },


  // Get the most popular post of all the posts
  most_popular_post: async () => {
    let mostPopularPost = {};
    let mostPopularPostLikeCount = -1;
    let mostPopularPostDislikeCount = Number.MAX_SAFE_INTEGER;
    let mostPopularPostReplyCount = -1;

    // get all the root posts
    const posts = await db.post.findAll({
      include: { model: db.user },
      where: { rootId: 0, parentId: 0 }
    });

    // iterate over all the root posts
    for (const post of posts) {
      // get all the replies
      const replies = await db.post.findAll({
        include: { model: db.user },
        where: { rootId: post.id }
      });
      
      // define initial counts
      let totalLikeCount = post.likeCount;
      let totalDislikeCount = post.dislikeCount;
      let totalReplyCount = replies ? replies.length : 0;

      // iterate over all the replies to this root post and update the like & dislike counts
      for (const reply of replies) {
        totalLikeCount += reply.likeCount;
        totalDislikeCount += reply.dislikeCount;
      }

      // define the popularity of the current and most popular post
      const popularity = totalLikeCount + totalReplyCount;
      const maxPopularity = mostPopularPostLikeCount + mostPopularPostReplyCount;

      // update most popular post
      // (if two current most popular posts have the same popularity, pick the post with the lower total dislike count,
      // ignore the newer post if they have the same total dislike count)
      if (popularity > maxPopularity || (popularity == maxPopularity && totalDislikeCount < mostPopularPostDislikeCount)) {
        mostPopularPost = post;
        mostPopularPostLikeCount = totalLikeCount;
        mostPopularPostDislikeCount = totalDislikeCount;
        mostPopularPostReplyCount = totalReplyCount;
      }
    }
    
    // add popularity attributes
    mostPopularPost["totalLikeCount"] = mostPopularPostLikeCount;
    mostPopularPost["totalDislikeCount"] = mostPopularPostDislikeCount;
    mostPopularPost["totalReplyCount"] = mostPopularPostReplyCount;    
    return mostPopularPost;
  },

  /*
   * mutations ----------------------------------
   */

  // Edit user profile information
  edit_user: async (args) => {
    const user = await db.user.findByPk(args.input.id); // get user by id

    // get user by username
    const userByUsername = await db.user.findOne({ where: { username: args.input.username } }); 
    
    // check for user with duplicate username
    if (userByUsername === null || userByUsername.id === args.input.id) {
      // edit user fields
      user.username = args.input.username;
      user.name = args.input.name;
      user.email = args.input.email;
      user.avatar = args.input.avatar;

      // edit password if new password is supplied
      if (args.input.password) {
        const hash = await argon2.hash(args.input.password, { type: argon2.argon2id });
        user.password = hash;
      }

      await user.save();
      return user;
    }

    return null;
  },

  // Set user status (blocked/unblocked)
  set_user_status: async (args) => {
    const user = await db.user.findByPk(args.id); // get user by id

    user.status = !user.status;
    await user.save();

    return user;
  },

  // Remove user's post or reply
  remove_post: async (args) => {
    const post = await db.post.findByPk(args.id); // get post by id

    // remove post
    post.isContentDeleted = true;
    post.content = " This " + (post.rootId === 0 && post.parentId === 0 ? "post" : "reply") + " has been deleted by the admin."
    post.imageURL = "";
    post.likeCount = 0;
    post.dislikeCount = 0;
    await post.save();

    // remove all likes of the post
    await db.like.destroy({ where: { postId: args.id } });
      
    // remove all dislikes of the post
    await db.dislike.destroy({ where: { postId: args.id } });

    return true;
  },


  // Delete a single user from database
  delete_user: async (args) => {
    // remove all posts of the deleted user
    const posts = await db.post.findAll({ where: { authorId: args.id } });  // get all posts by authorId
    for (let post of posts) {
      post.authorId = 1; // point the author to the dummy user with id 1
      post.isAuthorDeleted = true;
      post.isContentDeleted = true;
      post.content = " This post has been removed as the author is deleted by the admin.";
      post.imageURL = "";
      post.likeCount = 0;
      post.dislikeCount = 0;
    
      await post.save();
    }

    // remove all follower/following connection of the deleted user
    await db.follow.destroy({
      where: {
        [db.Op.or]: [{ followerId: args.id }, { followingId: args.id } ]
      }
    });
    
    // remove all liked posts of the deleted user
    await db.like.destroy({ where: { userId: args.id } });
    
    // remove all disliked posts of the deleted user
    await db.dislike.destroy({ where: { userId: args.id } });
      
    // purge user data 
    await db.user.destroy({ where: { id: args.id } });
    
    return true;
  },
};

module.exports = graphql;
