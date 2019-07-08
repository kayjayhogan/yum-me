const router = require('express').Router();
const controller = require('./controller.js');

router.route('/browse')
  .get(controller.findRecent);

router.route('/user_info')
  .get(controller.findUserInfo);

router.route('/post_likes')
  .get(controller.findPostLikes);

router.route('/post_comments')
  .get(controller.findPostComments);

module.exports = router;