const express = require('express');
const router = express.Router();
var config = require('../config/keys');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
// Load User model
const User = require('../models/User');


//GET ALL Users
router.get('/user' , passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    User.find(function (err, users) {
      if (err) return next(err);
      res.json(users);
    })
    
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});
// Get User by ID
router.get("/:id" , passport.authenticate('jwt', { session: false}), (req, res, next) => {
  var token = getToken(req.headers);
 
  if (token) {
  User.findById(req.params.id).then(user => {
      res.status(200).json(user);
  }).catch(error => {
    res.status(404).json({
      message: "User not found!!!!"
    })});
}
else
{
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});
// Edit User
router.put("/:id", passport.authenticate('jwt', { session: false}),(req, res, next) => {
  var token = getToken(req.headers);
 
  if (token) {
    const user = new User({
      id: req.user._id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
     
    });
  User.updateOne({ id: req.params.id }, user).then(result => {
    res.status(200).json({ message: "Updated successfully!" });
  }).catch(error => {
    res.status(500).json({
      message: "Update failed!"
    })});
}
else
{
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}

});

// Delete User
router.delete("/:id", passport.authenticate('jwt', { session: false}),(req, res, next) => {
  var token = getToken(req.headers);
  if (token) {
  User.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
        res.status(200).json({ message: "User Deleted successful!" });
    })
    .catch(error => {
      res.status(500).json({
        message: "NO Valid User to delete"
      });
    });
  }
  else
{
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});

  
//signUp
router.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      email   : req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Email already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});
//signin
router.post('/signin', function(req, res) {
  User.findOne({
    //username: req.body.username
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          });
          // return the information including token as JSON
          res.json({success: true, token: 'jwt ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});
////////////////////////////
// Logout
router.post('/logout',passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
try{
  
  req.logout();
  res.json({success: true , msg: 'You Logged OUT Successfully.'});
}
catch(e){
  res.send(e.message)
} 
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
