const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { isLoggedIn } = require('../helpers/middlewares');

const User = require('../models/user');

router.get('/', (req, res, next) => {
  const _id  = req.session.currentUser._id;
  User.findById({ _id })
    .then((Profile) => {
      res.status(200);
      res.json(Profile);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  const _id  = req.body.id;
  User.findById( {_id} )
    .then((Profile) => {
      res.status(200);
      res.json(Profile);
    })
    .catch(next);
});

router.put('/', isLoggedIn(), (req, res, next) => {
  console.log(req.body)
  const { email, age, gender, description, city, userImage } = req.body;
  const _id = req.session.currentUser._id;
  User.findByIdAndUpdate(_id, {
    email,
    age,
    gender,
    description,
    city,
    userImage
  }, { new: true })
    .then((Profile) => {
      res.json({Profile});
    })
    .catch((error) => {
      next(error);
    });
});

// Borrar usuario ????
// router.delete('/', isLoggedIn(), (req, res, next) => {
//   const UserID = req.params.id;
//   Room.findByIdAndDelete(UserID)
//     .then(() => {
//       res.json({ message: `User with ${UserID} is removed successfully.` });
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

module.exports = router;