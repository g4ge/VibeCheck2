# VC User App Design Decisions

## Data Storage

- Application data is stored in the Cloud MySQL database.
- Images and icons used in the app are stored in project directory.
- Images uploaded in the posts/replies are stored in AWS S3 Bucket.

## User Authentication

- User is redirected to _Sign In_ page upon successful account registration.
- User is redirected to _Landing_ page upon successful account deletion.
- User is redirected to _Profile_ page upon successful login.
- Once user is authenticated (i.e. signed in), the user is stored with React Context.\
  It is also stored in local storage by `react-vc-user/src/data/AuthUserRepository.js`\
  so that it can be retrieved when a page is refreshed, thus preventing data lost.

## User Profile Management

- User is given a default avatar upon successful account registration.\
  User is able to choose one of 6 avatars stored in `react-vc-user/src/images/avatars/` and add it in _Profile_ page.
- User only edits the field he/she wants to change (all field are not required except _current password_).
- All posts and replies of the user is listed in the user profile so that others can view them.

## Post/Reply Behaviour

- Nested replies supported.
- One image can be uploaded together with a post/reply, but it cannot be changed/deleted after it was posted.
- Only the authors can edit and delete their own post/reply.
- Only selected post/reply is deleted, the replies to it remain unchanged.
- User is able to reply to the post/reply that has been deleted.
- A user icon is displayed next to the name of the post's author if he/she is the current logged in user.
- An edit icon is displayed next to the posted date & time if the post/reply was edited.

## Like/Dislike Behaviour

- User can like/dislike all posts and replies.
- User cannot like and dislike a post/reply at once.

## Follow Behaviour

- User can follow other users on their profile page.
