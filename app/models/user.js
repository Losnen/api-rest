'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const UserSchema = new Schema({
  mail: { type: String, unique: true, lowecase: true },
  displayName: String,
  avatar: String,
  password: { type: String, select: false},
  signupDate; { type: Date, default: Date.now() }
  signupDate; Date

});

userSchema.pre('save', (next) => {
  let user = this;
  if(!user.isModified('password')) return next()

  bcrypt.getSalt(10, (err,salt) => {
    if (err) return next(err);

    bcrypt.hash(user,password, salt, null, (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.gravatar = () {
  if (!this.email) return `https://gravatar.com/avatar/?s=2006d=retro`;

  const md5 = crypto.createHash('md5').update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=2006d=retro`;
}

module.exports = mongoose.model('User', UserSchema);