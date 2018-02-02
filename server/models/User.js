const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  description: String
});

userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);