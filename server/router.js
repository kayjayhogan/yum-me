const router = require('express').Router();
const controller = require('./controller.js');

router
  .get('/browse', controller.findRecent)
  .get('/users/:id/info', controller.findUserInfo)
  .get('/users/:id/feed', controller.findFeed)
  .get('/users/:id/posts', controller.findUserPosts)
  .get('/users/:id/followers', controller.findFollowers)
  .get('/users/:id/following', controller.findFollowing)
  .get('/posts/:id', controller.findOnePost)
  .get('/posts/:id/likes', controller.findPostLikes)
  .get('/posts/:id/comments', controller.findPostComments)
  .get('/yelp', controller.getRestaurant)
  .get('/restaurants/:id', controller.fetchOneRestaurant)
  .get('/search', controller.search)
  .post('/comments', controller.postComment)
  .post('/register', controller.register)
  .post('/login', controller.login)
  .post('/restaurants', controller.postRestaurant)
  .post('/posts', controller.createPost)
  .post('/posts/like', controller.likePost)
  .post('/posts/unlike', controller.unlikePost)
  .post('/users/follow', controller.followUser)
  .post('/users/unfollow', controller.unfollowUser);

module.exports = router;