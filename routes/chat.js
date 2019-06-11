const express = require('express');
const router = express.Router();
const {
  isLoggedIn,
} = require('../helpers/middlewares');

const User = require('../models/user');

router.get('/:currentUserID/:bidownerID', (req, res, next) => {
  const { currentUserID, bidownerID } = req.params;
  User.find({currentUserID})
    .then((user) => {
      res.json(user);
    })
    .catch((error) => {
      next(error);
    });
})


module.exports = router;