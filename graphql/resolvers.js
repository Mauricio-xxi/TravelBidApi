import User from "../models/user"

export const resolvers = {
  Query :{
    hello: ()=>{
      return "hola con graphql"
    },
  User: ()=> {
      return null
    }
  },
  Mutation: {
    createUser(_,{input}){
      const newUser = new User (input )
      console.log(newUser)
    }
  }
};