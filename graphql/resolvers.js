import User from "../models/user"
import Offer from "../models/offer"
import Bid from "../models/bid"

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin,
} = require('../helpers/middlewares');

export const resolvers = {
  Query :{
    hello: ()=>{
      return "hola con graphql"
    },
  User: ()=> {
      return null
    },
  Offer: async(_,{location})=> {
    console.log({location})
    return await Offer.findOne({location})
  },
  Offers: async(_,{location})=> {
    console.log({location})
    return await Offer.find({location})
  },
  Bid: async(_,{input})=> {
    console.log(input)
    return await Bid.findOne({input})
  }
  },
  Mutation: {
    async createUser(_,{input}){
      const newUser = new User (input )
      await newUser.save()
      return newUser
    }
  }
};