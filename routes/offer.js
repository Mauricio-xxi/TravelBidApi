
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
  isLoggedIn,
} = require('../helpers/middlewares');

const Offer = require('../models/offer');

router.post('/', isLoggedIn(), (req, res, next) => {
  const { from, until, location, budget } = req.body;
  const userID  = req.session.currentUser._id;
  const newOffer = new Offer({
    userID,
    // image,
    from,
    until,
    location,
    budget,
  });

  newOffer.save()
    .then((offer) => {
      res.status(200);
      res.json({ offer });
    })
    .catch(next);
});

module.exports = router;
