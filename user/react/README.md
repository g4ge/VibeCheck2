# VibeCheck

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the App

In the project directory,

1. run `npm install` to install modules listed as dependencies in `package.json`.
2. run `npm start` and open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Design Decisions

### Data storage

- User and post data are stored in local storage.
- Images and icons used in the app are stored in project directory.
- Images uploaded in the posts/replies are stored in AWS S3 Bucket.

### User authentication

- User is redirected to _Sign In_ page upon successful account registration.
- User is redirected to _Landing_ page upon successful account deletion.
- User is redirected to _Profile_ page upon successful login.
- Duplicate emails are not allowed as email is the unique identifier for the users.
- Once user is authenticated (i.e. signed in), the user is stored with React Context.\
  It is also stored in local storage by `src/components/data/AuthUserRepository.js`\
  so that it can be retrieved when a page is refreshed, thus preventing data lost.

### User profile management

- User is given a default avatar upon successful account registration.\
  User is able to choose one of 6 avatars stored in `src/components/images/avatars/` and add it in _Profile_ page.
- User only edits the field he/she wants to change (all field are not required except _current password_).
- Once profile is edited, the updated details are reflected in all posts/replies (including previous ones).

### Post behaviour

- Nested replies supported.
- One image can be uploaded together with a post/reply, but it cannot be changed/deleted after it was posted.
- Image of the post/reply is retrieved via its URL.
- Every user can reply to all posts/replies. Only the authors can edit and delete their own post/reply.
- Only selected post/reply is deleted, the replies to it remain unchanged.
- User is able to reply to post/reply that has been deleted.
- Post and reply are divided into two components. When any replies are added/edited/deleted, only that single post is updated/re-rendered.
- Posts are stored as array and managed by `src/components/data/PostsRepository.js`.
- Replies are stored as object (key: _Post ID_, value: _array of replies_) and managed by `src/components/data/RepliesRepository.js`.
- A user icon is displayed next to the name of the post's author if he/she is the current logged in user.
- An edit icon is displayed next to the posted date & time if the post/reply was edited.

### Search behaviour

- User is able to list all posts/replies made by other users by searching their names (case insensitive).
- If the switch "_Include posts/replies by other users in the same post_" is disabled:
  - All replies are listed in separated posts along with the main posts.
  - User is not able to reply/edit/delete the listed posts/replies.
