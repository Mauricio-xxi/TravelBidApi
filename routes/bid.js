
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
  isLoggedIn,
} = require('../helpers/middlewares');

const Bid = require('../models/bid');
const Offer = require('../models/offer');

router.post('/', (req, res, next) => {
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
    })
    .catch(next);
});

router.get('/:offerID', (req, res, next) => {
  const { offerID } = req.params;
  Bid.find({offerID})
      .then((bids) => {
        res.status(200);
        res.json(bids);
      })
      .catch(next);
});

router.get('/userBids/:userID', (req, res, next) => {
  const { userID } = req.params;
  Bid.find({userID})
      .then((bids) => {
        res.status(200);
        res.json(bids);
      })
      .catch(next);
});

router.delete('/:bidID', (req, res, next) => {
  const bidID  = req.params.bidID;
  Bid.findByIdAndDelete(bidID)
    .then(() => {
      res.json({ message: `Bid with ${bidID} was removed successfully.` });
    })
    .catch(next);
});


// router.put('/:bidID', isLoggedIn(), (req, res, next) => {
//   const { description, value, Status } = req.body;
//   const bidID = req.params.bidID;
//   Bid.findByIdAndUpdate(bidID, {
//     description,
//     value,
//     Status,
//   }, { new: true })
//     .then((bid) => {
//       res.json({bid});
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// Edit BID
router.put('/:bidID', isLoggedIn(), async (req, res, next) => {
  const { description, value, Status, offerID } = req.body;
  const bidID = req.params.bidID;
  try {

    await Bid.findByIdAndUpdate(bidID, {
      description,
      value,
      Status,
    }, { new: true });

    if (Status === 1) {
      await Offer.findByIdAndUpdate(offerID, { Status });
      const bids = await Bid.find({offerID, Status: 0});
      console.log(bids)
      bids.forEach((bid) => {
         Bid.findByIdAndUpdate(bid.id, { Status: 2 });
         console.log(bid.id);
      });
    }
    
    
      

   
  //  else if (Status === 2) {
  //   await Offer.findByIdAndUpdate(offerID, { Status: 1 });
  //   const bids = await Bid.find({offerID, Status: 0 || null });
  //   await bids.forEach(async (bid) => {
  //     await Bid.findByIdAndUpdate(bid.id, { Status: 2 });
  //   });
  //  }

  } catch (error) {
    next(error);
  }
});

module.exports = router;
