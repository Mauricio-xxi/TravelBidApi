import User from "../models/user"
import Offer from "../models/offer"
import Bid from "../models/bid"
const createError = require('http-errors')
const bcrypt = require('bcrypt');


const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

export const resolvers = {
  Query :{
    hello: ()=>{
      console.log(ctx.request.headers.authorization)    
      return "hola con graphql"
    },
  User: ()=> {
      return null
    },
  Offer: async(_,{userID},ctx)=> {
    if(ctx.session.currentUser){
      return await Offer.findOne({userID})
    } else {
      return createError(401)
    }
  },
  Offers: async(_,{location},ctx)=> {
    console.log(ctx)
    if(ctx.session.currentUser){
    return await Offer.find({location})
    } else {
      return createError(401)
    }
  },
  Bid: async(_,{input})=> {
    console.log(input)
    return await Bid.findOne({input})
  }
  },
  Mutation: {
    async createUser(_,{input},ctx){
      isNotLoggedIn()
      validationLoggin()
      try {
        const username = input.username;
        const user = await User.findOne({ username }, 'username');
        if (user) {
          return next(createError(422));
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hashPass = bcrypt.hashSync(password, salt);
          const newUser = await User.create({ username, password: hashPass });
          ctx.session.currentUser = newUser;
          res.status(200).json(newUser);
        }
      } catch (error) {
        next(error);
      }
    }
  }
};