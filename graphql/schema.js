import {makeExecutableSchema} from "graphql-tools"
import {resolvers} from "./resolvers"
const typeDefs = `
  type Query {
    User: User
    Offer(userID: String): Offer
    Bid (id: String): Bid
    Offers(location: String):[Offer]
  },
  type User {
    email: String,
    password: String!,
    username: String!
  }

  type Offer {
    userID: ID,
    image: String,
    from: String,
    until: String,
    location: String,
    budget: Float,
    Status: Int,
  }
  type Bid {
    userID: String,
    offerID: String,
    roomID: String,
    bidValue: Float,
    bidDescription: String,
    Status: Int,
    accomodationImage: String,
  }

  type Mutation {
    createUser(input: UserInput): User
    login(input:UserInput):User
    logout (input: UserInput): User
  }

  input UserInput{
    username: String!,
    email: String,
    password: String!,
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})