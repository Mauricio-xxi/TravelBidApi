const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { isLoggedIn } = require('../helpers/middlewares');

const Profile = require('../models/profile');

router.get('/', (req, res, next) => {
  const userID  = req.session.currentUser._id;
  Profile.find({ userID })
    .then((Profile) => {
      res.status(200);
      res.json(Profile);
    })
    .catch(next);
});

router.put('/', isLoggedIn(), (req, res, next) => {
  const { email, age, gender, description, city, userImage } = req.body;
  const userID = req.session.currentUser._id;
  Profile.findByIdAndUpdate(userID, {
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