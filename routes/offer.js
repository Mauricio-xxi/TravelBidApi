
const express = require('express');
const router = express.Router();

const Offer = require('../models/offer');
console.log('we are in offer')

router.post('/offer', (req, res, next) => {
  console.log(req.body)
  const { userID, from, until, location, budget } = req.body;
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
