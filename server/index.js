const cors = require('cors');
const jwt = require('jwt-simple');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

const app = express();

const User = require('./models/User');
const Post = require('./models/Post');
const auth = require('./auth');
const general = require('./general');

mongoose.Promise = Promise;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/auth', auth.router);
app.use('/api', general);

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../client/dist/index.html'))
});

const local = 'mongodb://localhost:27017/mean-app';
const remote = 'mongodb://test:test@ds121268.mlab.com:21268/ekundayo-meanapp';

mongoose.connect(local, (err) => {
  if (!err)
    console.log('connected to mongo');
});

app.listen(process.env.PORT || 3000);

