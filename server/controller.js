const yelp = require('yelp-fusion');
const db = require('../database/index.js');
const bcrypt = require('bcryptjs');

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
      ORDER BY
        created_at DESC
    ;`)
    .then((data) => {
      res.status(200).send(data.rows);
    })
    .catch((err) => {
      res.status(400).send("Error finding user's posts: ", err);
    });
  },
  // get one post 
  findOnePost: (req, res) => {
    let { id } = req.params;
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
      res.status(400).send("Error finding post: ", err);
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
    });
  },
  // get restaurant using Yelp API
  getRestaurant: (req, res) => {    
    const apiKey = `${process.env.KEY}`;
    const searchRequest = {
      term: req.query.term,
      location: req.query.location,
      categories: 'Food'
    };
    const client = yelp.client(apiKey);

    client.search(searchRequest)
    .then(response => {
      const firstResult = response.jsonBody.businesses.slice(0,10);
      const prettyJson = JSON.stringify(firstResult, null, 4);
      res.status(200).send(JSON.parse(prettyJson))
    }).catch(err => {
      res.status(404).send('Error getting restaurants: ', err);
    });
  },
  // get one restaurant from the database
  fetchOneRestaurant: (req, res) => {
    const { id } = req.params;
    db.query(`
      SELECT *
        FROM restaurants
      WHERE
        id = ${id}
    ;`)
    .then(data => {
      res.status(200).send(data.rows[0]);
    })
    .catch(err => {
      res.status(404).send("Error finding followed users: ", err);
    });
  },
  // search users or posts
  search: (req, res) => {
    const { term } = req.query;
    db.query(`
      SELECT to_json(post), rest.rest_name
        FROM posts post
      INNER JOIN
        restaurants rest
      ON
        LOWER(rest.rest_name) LIKE LOWER('%${term}%')
      AND
        post.restaurant_id = rest.id
    ;`, (err, restaurantMatches) => {
      if(err) res.status(404).send("Could not search restaurants for search term: ", err);
      else {
        // fint posts where title matches
        db.query(`
          SELECT *
            FROM posts
          WHERE
            LOWER(title) LIKE LOWER('%${term}%')
        ;`, (err, postMatches) => {
          if(err) res.status(404).send("Could not search posts for search term: ", err);
          else {
            // fint users where username or name matches
            db.query(`
              SELECT *
                FROM users
              WHERE
                LOWER(username) LIKE LOWER('%${term}%') 
              OR 
                LOWER(firstname) LIKE LOWER('%${term}%') 
              OR 
                LOWER(lastname) LIKE LOWER('%${term}%')
            ;`, (err, userMatches) => {
              if(err) res.status(404).send("Could not search users for search term: ", err);
              else res.status(200).send({ 
                restaurantMatches: restaurantMatches.rows, 
                postMatches: postMatches.rows, 
                userMatches: userMatches.rows 
              });
            })
          }
        })
      }
    })
  },

// POSTING

  postComment: (req, res) => {
    const { author_id, post_id, content } = req.body;
    const options = [author_id, post_id, content];
    db.query(`
      INSERT into comments 
        (author_id, post_id, content)
      VALUES
        ($1, $2, $3)
    ;`, options)
    .then(() => res.status(200).send("Successfully posted comment."))
    .catch(err => res.status(404).send("Error posting comment: ", err));
  },

  postRestaurant: (req, res) => {
    const { rest_name, address_city, address_state, address_country, price, rating, rest_url } = req.body;
    const options = [rest_name, address_city, address_state, address_country, price, rating, rest_url];
    db.query(`
      INSERT into restaurants 
        (rest_name, address_city, address_state, address_country, price, rating, rest_url)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    ;`, options)
    .then((data) => res.status(200).send(data.rows[0]))
    .catch(err => res.status(404).send("Error posting restaurant: ", err));
  },

  createPost: (req, res) => {
    const { title, author_id, restaurant_id, descript, recommended, img_url } = req.body;
    const options = [title, author_id, restaurant_id, descript, recommended, img_url];
    db.query(`
      INSERT into posts 
        (title, author_id, restaurant_id, descript, recommended, img_url)
      VALUES
        ($1, $2, $3, $4, $5, $6)
    ;`, options)
    .then(() => res.status(200).send("Successfully created post"))
    .catch(err => res.status(404).send("Error creating post: ", err));
  },

  likePost: (req, res) => {
    const { post_id, user_id } = req.body;
    db.query(`
      INSERT into likes 
        (post_id, user_id)
      VALUES
        (${post_id}, ${user_id})
    ;`)
    .then(() => res.status(200).send("Successfully liked post"))
    .catch(err => res.status(404).send("Error liking post: ", err));
  },

  unlikePost: (req, res) => {
    const { post_id, user_id } = req.body;
    db.query(`
      DELETE from likes 
      WHERE
        post_id = ${post_id} AND user_id = ${user_id}
    ;`)
    .then(() => res.status(200).send("Successfully unliked post"))
    .catch(err => res.status(404).send("Error unliking post: ", err));
  },

  followUser: (req, res) => {
    const { followed_id, user_id } = req.body;
    db.query(`
      INSERT into followers 
        (followed_user_id, user_id)
      VALUES
        (${followed_id}, ${user_id})
    ;`)
    .then(data => res.status(200).send(data.rows))
    .catch(err => res.status(404).send("Error following user: ", err));
  },

  unfollowUser: (req, res) => {
    const { followed_id, user_id } = req.body;
    db.query(`
      DELETE from followers 
      WHERE
        followed_user_id = ${followed_id} AND user_id = ${user_id}
    ;`)
    .then(() => res.status(200).send("Successfully following user"))
    .catch(err => res.status(404).send("Error following user: ", err));
  },

// EDITING

  editPost: (req, res) => {
    const { id } = req.params;
    const { title, descript, recommended } = req.body;
    db.query(`
      UPDATE posts
      SET title = '${title}',
          descript = '${descript}',
          recommended = ${recommended}
      WHERE id = ${id}
    ;`)
    .then(() => res.status(200).send("Successfully edited post"))
    .catch(err => res.status(404).send("Error updating post: ", err));
  },

// AUTHENTICATION

  login: (req, res) => {
    const { email, password } = req.body;
    // find user to compare passwords
    db.query(`
      SELECT * 
        FROM users
      WHERE
        email = '${email}'
    ;`)
    .then(data => {
      if(!data.rows[0]) {
        res.status(404).send("No email found.");
      }
      bcrypt.compare(password, data.rows[0].pass, (err, response) => {
        if(err) console.log("Error with bcrypt: ", err);
        else if(response) {
          res.status(200).send(data.rows[0]);
        }
        else {
          res.status(204).send("Incorrect password");
        }
      });
    })
    .catch(err => {
      res.status(404).send("Error logging in: ", err);
    })
  },

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