const express = require('express');

const User = require('./models/User');
const Post = require('./models/Post');
const auth = require('./auth');

const router = express.Router();

router.get('/posts/:id', async (req, res) => {
  const author = req.params.id;
  const posts = await Post.find({ author }, '-__v');
  return res.status(200).send(posts);
});

router.post('/post', auth.checkAuthenticated, (req, res) => {
  const postData = req.body;
  postData.author = req.userId;

  const post = new Post(postData);

  console.log(req.body);

  post.save((err, result) => {
    if (err) {
      console.error('error saving post');
      return res.status(201).send({ message: 'post created'});
    }
    return res.status(200).send({ message: 'Ok' });
  })
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password -__v');
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password -__v');
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;