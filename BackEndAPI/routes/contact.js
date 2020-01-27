var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var Contact = require("../models/contact");

//GET ALL contacts
//

router.get("/mycont" , passport.authenticate('jwt', { session: false}),(req, res, next) => {
  var token = getToken(req.headers);
  if (token) {

  Contact.find().then(documents => {
    res.status(200).json({
      message: "Contacts fetched successfully!",
      conts: documents
    });
  });
}
else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});
// Get Contact by ID
router.get("/:id" , passport.authenticate('jwt', { session: false}), (req, res, next) => {
  var token = getToken(req.headers);
 
  if (token) {
  Contact.findById(req.params.id).then(cont => {
      res.status(200).json(cont);
  }).catch(error => {
    res.status(404).json({
      message: "contact not found!!!!"
    })});
}
else
{
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
}
});

/////////////////////////////////
//Add Contact
router.post('/add', passport.authenticate('jwt', { session: false}),function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
     creator: req.user._id
    });

    newContact.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save Contact failed.'});
      }
      res.json({success: true, msg: 'Successful created new Contact.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// Update Contact
router.put("/:id", passport.authenticate('jwt', { session: false}),(req, res, next) => {
  var token = getToken(req.headers);
 
  if (token) {
    const cont = new Contact({
      _id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      creator: req.user._id,
    });
  Contact.updateOne({ id: req.params.id , creator: req.user._id}, cont).then(result => {
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
// Delete Contact
router.delete("/:id", passport.authenticate('jwt', { session: false}),(req, res, next) => {
  var token = getToken(req.headers);
  if (token) {
  Contact.deleteOne({ _id: req.params.id , creator: req.user._id})
    .then(result => {
      console.log(result);
        res.status(200).json({ message: "Contact Deleted successful!" });
    })
    .catch(error => {
      res.status(500).json({
        message: "NO Valid Contact to delete"
      });
    });
  }
  else
{
  return res.status(403).send({success: false, msg: 'Unauthorized.'});
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
  