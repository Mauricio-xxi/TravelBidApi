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
      console.log(input)
      return null 
    }
  }
};