const router = require('express').Router();
const controller = require('./controller.js');

router.route('/browse')
  .get(controller.findRecent);

router.route('/users/:id/info')
  .get(controller.findUserInfo);

router.route('/users/:id/feed')
  .get(controller.findFeed);

router.route('/users/:id/posts')
  .get(controller.findUserPosts);

router.route('/users/:id/followers')
  .get(controller.findFollowers);

router.route('/users/:id/following')
  .get(controller.findFollowing);

router.route('/posts/:id')
  .get(controller.findOnePost);

router.route('/posts/:id/likes')
  .get(controller.findPostLikes);

router.route('/posts/:id/comments')
  .get(controller.findPostComments);

router.route('/comments')
  .post(controller.postComment);

router.route('/register')
  .post(controller.register);

router.route('/login')
  .post(controller.login);

module.exports = router;