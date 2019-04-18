
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
  isLoggedIn,
} = require('../helpers/middlewares');

const Offer = require('../models/offer');

router.post('/', (req, res, next) => {
  console.log(req);
  const { description, value, offerID } = req.body;
  const userID  = req.session.currentUser._id;
  const newBid = new Bid({
    userID,
    offerID,
    description,
    value ,
  });

  newBid.save()
    .then((bid) => {
      res.status(200);
      res.json({bid});
      console.log({bid});
    })
    .catch(next);
});

router.get('/:offerID', (req, res, next) => {
  const offerID  = req.params.offerID;
  Bid.find({ offerID: offerID })
    .then((bids) => {
      res.status(200);
      res.json(bids);
    })
    .catch(next);
});

// router.get('/:id', (req, res, next) => {
//   const offerID = req.params.id;

//   Offer.findById(offerID)
//     .then((offer) => {
//       res.status(200);
//       res.json(offer);
//     })
//     .catch(next);

// });


// // GET SEARCH INPUT
// router.get('/search/:city', (req, res, next) => {
//   const { city } = req.params;
//   Offer.find({ location: city })
//     .then((offers) => {
//       res.status(200);
//       res.json(offers);
//     })
//     .catch(next);
// });

// router.put('/:id', isLoggedIn(), (req, res, next) => {
//   const { from, until, budget } = req.body;
//   const offerID = req.params.id;
//   // const userID = req.session.currentUser._id;
//   Offer.findByIdAndUpdate(offerID, {
//     // userID,
//     from,
//     until,
//     budget,
//   }, { new: true })
//     .then((offer) => {
//       res.json({offer});
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// router.delete('/:id', isLoggedIn(), (req, res, next) => {
//   const offerID = req.params.id;
//   Offer.findByIdAndDelete(offerID)
//     .then(() => {
//       res.json({ message: `Offer with ${offerID} is removed successfully.` });
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

module.exports = router;
