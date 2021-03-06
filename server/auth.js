const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
  // this should be validated and only needed data should be taken from
  // request body, password should be encrypted
  const userData = req.body;
  const foundUser = await User.findOne({ email: userData.email });
  if (foundUser) return res.status(409).send({ message: 'Email taken!'});

  var user = new User(userData);
  user.save((err, newUser) => {
    if (err) return res.status(500).send({ message: 'Error saving user'});

    createSendtoken(res, newUser)
  })
});

router.post('/login', async (req, res) => {
  // this should be validated and only needed data should be taken from
  // request body, password should be encrypted
  const loginData = req.body;
  const user = await User.findOne({ email: loginData.email });

  if (!user) return res.status(401).send({ message: 'Email or Password wrong'});

  bcrypt.compare(loginData.password, user.password, (err, isMatch) => {
    if (!isMatch) return res.status(401).send({ message: 'Email or Password wrong'});

    createSendtoken(res, user);
  })
});

function createSendtoken(res, user) {
  const { _id, email } = user;
  const payload = {
    sub: _id
  };

  const token = jwt.encode(payload, '123');

  res.status(200).send({user: { _id, email }, token});
}

const auth = {
  router,
  checkAuthenticated: (req, res, next) => {
    if (!req.header('authorization')) {
      return res.status(401).send({ message: 'Unauthorized. Missing Auth Header'});
    }
    const token = req.header('authorization').split(' ')[1];

    const payload = jwt.decode(token, '123');

    if (!payload) {
      return res.status(401).send({ message: 'Unauthorized. Auth Header Invalid'});
    }

    req.userId = payload.sub;
    next();
  }
}

module.exports = auth;