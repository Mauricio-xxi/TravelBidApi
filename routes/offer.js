
const express = require('express');
const router = express.Router();

const Offer = require('../models/offers');

router.post('/offer', (req, res, next) => {
  const { from, until, location, budget } = req.body;
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
