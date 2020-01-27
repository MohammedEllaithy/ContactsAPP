const mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    maxlength:20,
    minlength:2,
    trim:true,
    //required: true
  },
  email: {
    type: String,
    required: true,
    trim:true,
    unique: true 

  },
  password: {
    type: String,
    //required: true,
    trim:true

  },
  date: {
    type: Date,
    default: Date.now
  },

});

UserSchema.virtual('cont', {
  ref: 'Contact',
  localField: '_id',
  foreignField: 'creator'
})
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, function (err, salt) {
          if (err) {
              return next(err);
          }
          bcrypt.hash(user.password, salt, null, function (err, hash) {
              if (err) {
                  return next(err);
              }
              user.password = hash;
              next();
          });
      });
  } else {
      return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
          return cb(err);
      }
      cb(null, isMatch);
  });
};

UserSchema.plugin(uniqueValidator);


const User = mongoose.model('User', UserSchema);

module.exports = User;
