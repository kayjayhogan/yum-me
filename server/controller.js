const passport = require('passport');
const yelp = require('yelp-fusion');
const db = require('../database/index.js');
const bcrypt = require('bcryptjs');

let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = { 

  // find recent posts made by anyone
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
  // retrieve feed of posts from people you follow
  findFeed: (req, res) => {
    let { id } = req.params;
    db.query(`
      SELECT followed_user_id 
        FROM followers
      WHERE
        user_id = ${id}
    ;`)
    .then((data) => {
      let feedUsers = [];
      data.rows.forEach(followedUser => {
        feedUsers.push(followedUser["followed_user_id"]);
      });
      return feedUsers;
    })
    .then((arr) => {
      return db.query(`
        SELECT * 
          FROM posts 
        WHERE 
          author_id = ANY ($1)
        ORDER BY
          created_at DESC`
        , [arr]);
    })
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      res.status(400).send("Error finding recent posts: ", err);
    });
  },
  // get info of one user
  findUserInfo: (req, res) => {
    let { id } = req.params;
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
  // get posts made by a given user
  findUserPosts: (req, res) => {
    let { id } = req.params;
    db.query(`
      SELECT *
        FROM posts
      WHERE
        author_id = ${id}
    ;`)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      res.status(400).send("Error finding user's posts': ", err);
    })
  },
  // get likes of a post
  findPostLikes: (req, res) => {
    let { id } = req.params;
    db.query(`
      SELECT *
        FROM likes
      WHERE
        post_id = ${id}
    ;`)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      res.status(400).send("Error finding post likes: ", err);
    })
  },
  // get comments of a post
  findPostComments: (req, res) => {
    let { id } = req.params;
    db.query(`
      SELECT *
        FROM comments
      WHERE
        post_id = ${id}
    ;`)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      res.status(400).send("Error finding post comments: ", err);
    })
  },
  // get user's followers
  findFollowers: (req, res) => {
    let { id } = req.params;
    db.query(`
      SELECT user_id 
        FROM followers
      WHERE
        followed_user_id = ${id}
    ;`)
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => {
      res.status(404).send("Error finding followers: ", err);
    })
  },  
  // get those a user is following
  findFollowing: (req, res) => {
    let { id } = req.params;
    db.query(`
      SELECT followed_user_id 
        FROM followers
      WHERE
        user_id = ${id}
    ;`)
    .then(data => {
      res.status(200).send(data.rows);
    })
    .catch(err => {
      res.status(404).send("Error finding followed users: ", err);
    })
  },
// AUTHENTICATION

  register: (req, res) => {
    const { username, firstName, lastName, email, password, password2, avatar, location } = req.body;
    let errors = [];

    if (!username || !firstName || !lastName || !email || !password || !password2 || !avatar || !location) {
      errors.push({ msg: "Please enter all fields."});
    }

    if (password !== password2) {
      errors.push({ msg: "Passwords do not match."});
    }

    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters."});
    }

    if (errors.length > 0) {
      res.status(404).send("Please enter all fields.")
    } else {

      // MAKING PROMISES OF BCRYPT FUNCTIONS
      // ---------------------------------
      generateSalt = (password) => {
        return new Promise((resolve, reject) => {
          bcrypt.genSalt(10, (err, salt) => {            
            if (err) {
              reject(err);
            } 
            else {
              resolve({ salt, password });        
            }            
          });
        });
      }

      generateHash = (salt, password) => {
        return new Promise((resolve, reject) => {
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
              reject(err);
            } else {
              resolve(hash);
            }
          });
        });
      }
      // ---------------------------------

      db.query(`
        SELECT email 
          FROM users 
        WHERE 
          email = '${email}'
      `)
      .then((data) => {
        if(data.rows.length > 0) {
          res.status(409).send("An account with this email already exists.")
        }
      })
      .then(() => {
        return generateSalt(password);
      })
      .then((result) => {
        return generateHash(result.salt, result.password);
      })
      .then((result) => {
        let pass = result;
        return db.query(`
          INSERT INTO users
            (email, firstname, lastname, username, pass, loc, avatar) 
          VALUES('${email}', '${firstName}', '${lastName}', '${username}', '${pass}', '${location}', '${avatar}') 
            RETURNING *
        ;`)
      })
      .then(data => res.status(200).send(data.rows[0]))
      .catch(err => res.status(404).send("Could not register user: ", err));
    }
  }

}