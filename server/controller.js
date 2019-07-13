const passport = require('passport');
const yelp = require('yelp-fusion');
const db = require('../database/index.js');
const bcrypt = require('bcryptjs');

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

// AUTH

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