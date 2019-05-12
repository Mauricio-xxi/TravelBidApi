
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {
  isLoggedIn,
} = require('../helpers/middlewares');

const Bid = require('../models/bid');
const Offer = require('../models/offer');
const Room = require('../models/room');
const User = require('../models/user');


router.post('/', async (req, res, next) => {
  const { description, value, offerID } = req.body;
  const userID  = req.session.currentUser._id;
  const room = await Room.find({userID});
  const roomID = room[0]._id;
  const newBid = new Bid({
    userID,
    offerID,
    roomID,
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
  Bid.find({offerID}).populate('userID')
      .then((bids) => {
        res.status(200);
        res.json(bids);
      })
      .catch(next);
});

// router.get('/userBids/:userID', async (req, res, next) => {
//   const { userID } = req.params;
//   const bids = await Bid.find({userID}).populate('offerID')
//   const offerOwners = await bids.forEach( async (bid)=>{
//     return await User.findById(bid.offerID.userID)
//   })
//       .then((bids, offerOwners) => {
//         console.log(bids);
//         res.status(200);
//         res.json(bids);
//       })
//       .catch(next);
// });

router.get('/userBids/:userID', async (req, res, next) => {
  try {
    const { userID } = req.params;
    const bids = await Bid.find({userID}).populate('offerID')
    await bids.map( async (bid)=>{
         await User.findById(bid.offerID.userID)
         .then(async (owner) => {
           const offerOwners = [];
          await offerOwners.push(owner);
          res.json({bids, offerOwners});
        });
      });
      
  } catch (error) {
    next(error);
  }
});



router.delete('/:bidID', (req, res, next) => {
  const bidID  = req.params.bidID;
  Bid.findByIdAndDelete(bidID)
    .then(() => {
      res.json({ message: `Bid with ${bidID} was removed successfully.` });
    })
    .catch(next);
});


router.put('/:bidID', isLoggedIn(), (req, res, next) => {
  const { description, value, Status } = req.body;
  const bidID = req.params.bidID;
  Bid.findByIdAndUpdate(bidID, {
    description,
    value,
    Status,
  }, { new: true })
    .then((bid) => {
      res.json({bid});
    })
    .catch((error) => {
      next(error);
    });
});


router.put('/:bidID/accept', isLoggedIn(), async (req, res, next) => {
  console.log('we are in bid accet')
  try {
    const { Status, offerID } = req.body;
    const bidID = req.params.bidID;
    await Bid.findByIdAndUpdate(bidID, { Status }, { new: true });
    await Offer.findByIdAndUpdate(offerID, { Status: 1 });
    const bids = await Bid.find({offerID, Status: 0});
    await bids.forEach( async (bid) => {
       await Bid.findByIdAndUpdate(bid.id, { Status: 2 });
    });

    res.json({message: `Bid with ${bidID} was accepted successfully.`});
  
  } catch (error) {
    next(error);
  }
});

router.put('/:bidID/decline', isLoggedIn(), async (req, res, next) => {
  console.log('we are in bid decline')
  try {
    const { Status } = req.body;
    const bidID = req.params.bidID;
    await Bid.findByIdAndUpdate(bidID, { Status }, { new: true });

    res.json({message: `Bid with ${bidID} was declined successfully.`});
  
  } catch (error) {
    next(error);
  }
});






module.exports = router;
