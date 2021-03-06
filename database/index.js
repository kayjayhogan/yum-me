const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'yumme',
  user: 'kathleenhogan',
  password: '',
  port: 5432
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
  	return console.log('Error accessing database: ', err )
  }
  console.log('Database is up and running!');
})

module.exports = pool;

// const query = (text, params) => pool.query(text, params)

// module.exports = { query }