# VC Admin App Design Decisions

## Number of users using VC per day

- Once a user is logged in to VC for the first time on the day,\
  the number of users using VC per day increases by one.
- The graph shows the data for the last 7 days.

## Following user statistics for each user

- All the following and followers of the user are listed.
- The number of following and followers of the user are counted and shown in graphs.

## Most popular post of all the posts made

- Most popular post is defined as the post with the most number of likes (_including likes of its replies_)\
  and replies.
- If there are two or more posts with the same number of likes and replies, the most popular post would be\
  the one with the least number of dislikes (_including dislikes of its replies_).
- If there are two or more posts with the same number of likes, dislikes and replies, the most popular post would be\
  the older post among them.

## Time spent on VC on a daily basis by each user

- Once a user is logged in to VC on a day, the login time is recorded. When the user logs out, \
  the time spent on VC is calculated using the formula `logged out time - logged in time`. \
  The result is added to the total time spent of the day.
- The graph shows the data for the last 7 days.
