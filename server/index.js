const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./router');
const db = require('../database/index.js')

const app = express();
const port = process.env.PORT || 4000;

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));