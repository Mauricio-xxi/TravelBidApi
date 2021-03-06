
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
  isLoggedIn,
} = require('../helpers/middlewares');

const Offer = require('../models/offer');

router.post('/', (req, res, next) => {
  const { from, until, budget } = req.body;
  const location = req.body.location.toUpperCase();
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
      res.json({offer});
      console.log({offer});
    })
    .catch(next);
});

router.get('/', (req, res, next) => {
  const id  = req.session.currentUser._id;
  Offer.find({ userID: id })
    .then((offers) => {
      res.status(200);
      res.json(offers);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const offerID = req.params.id;

  Offer.findById(offerID).populate('userID')
    .then((offer) => {
      res.status(200);
      res.json(offer);
    })
    .catch(next);

});


// GET SEARCH INPUT
router.get('/search/:city', (req, res, next) => {
  const { city } = req.params;
  console.log(city)
  Offer.find({ location: city }).populate('userID')
    .then((offers) => {
      res.status(200);
      res.json(offers);
      console.log(offers);
    })
    .catch(next);
});

router.put('/:id', isLoggedIn(), (req, res, next) => {
  const { from, until, budget } = req.body;
  const offerID = req.params.id;
  // const userID = req.session.currentUser._id;
  Offer.findByIdAndUpdate(offerID, {
    // userID,
    from,
    until,
    budget,
  }, { new: true })
    .then((offer) => {
      res.json({offer});
    })
    .catch((error) => {
      next(error);
    });
});

router.delete('/:id', isLoggedIn(), (req, res, next) => {
  const offerID = req.params.id;
  Offer.findByIdAndDelete(offerID)
    .then(() => {
      res.json({ message: `Offer with ${offerID} is removed successfully.` });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
