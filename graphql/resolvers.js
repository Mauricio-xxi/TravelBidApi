import User from "../models/user"
import Offer from "../models/offer"
import Bid from "../models/bid"
const createError = require('http-errors')
const bcrypt = require('bcrypt');

export const resolvers = {
  Query :{
  User: ()=> {
      return true
    },
  usersession: (_,{userID},ctx)=> {
    if(ctx.session.currentUser){
      return ({currentsession:true})
    } else {
      return createError(401)
    }
  },
  Offer: async(_,{userID},ctx)=> {
    if(ctx.session.currentUser){
      return await Offer.findOne({userID})
    } else {
      return createError(401)
    }
  },
  Offers: async(_,{location},ctx)=> {
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
      try {
        const {username, password, email} = input;
        const user = await User.findOne({ username }, 'username');
        if (user) {
          return(createError(422));
        } else {
          const salt = bcrypt.genSaltSync(10);
          const hashPass = bcrypt.hashSync(password, salt);
          const newUser = await User.create({ username, password: hashPass, email });
          ctx.session.currentUser = newUser;
          return newUser;
        }
      } catch (error) {
        return (error);
      }
    },
    async login(_,{input},ctx){
      const {username, password} = input;      
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return(createError(404));
        } else if (bcrypt.compareSync(password, user.password)) {
          ctx.session.currentUser = user;
          console.log(ctx.session.currentUser)
          return user;
        } else {
          return(createError(401));
        }
      } catch (error) {
        return(error);
      }
    },
    logout(_,{input},ctx){
      ctx.session.destroy();
      return status(204).send()
    }
  }
};