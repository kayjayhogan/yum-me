const passport = require('passport');
const yelp = require('yelp-fusion');
// const db = require('../database/index.js');

let escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = { 

  register: (req, res) => {}

}