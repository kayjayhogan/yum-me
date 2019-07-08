const passport = require('passport');
const yelp = require('yelp-fusion');
const db = require('../database/index.js');

let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = { 

  findRecent: (req, res) => {
    db.query(`
    SELECT * 
      FROM posts
    ORDER BY
      created_at DESC
    ;`)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      res.status(400).send("Error finding recent posts: ", err);
    })
  },

// UTILITY FETCH FUNCTIONS

  findUserInfo: (req, res) => {
    let { id } = req.query;
    db.query(`
      SELECT *
        FROM users
      WHERE
        id = ${id}
    ;`)
    .then((data) => {
      res.status(200).send(data.rows[0]);
    })
    .catch((err) => {
      res.status(400).send("Error finding user info: ", err);
    })
  },

  findPostLikes: (req, res) => {
    let { id } = req.query;
    db.query(`
      SELECT *
        FROM posts
      WHERE
        id = ${id}
    ;`)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      res.status(400).send("Error finding user info: ", err);
    })
  },

  findPostComments: (req, res) => {
    let { id } = req.query;
    db.query(`
      SELECT *
        FROM comments
      WHERE
        id = ${id}
    ;`)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      res.status(400).send("Error finding user info: ", err);
    })
  }

}