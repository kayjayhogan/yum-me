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
  }

}