import {makeExecutableSchema} from "graphql-tools"
import {resolvers} from "./resolvers"
const typeDefs = `
  type Query {
    hello: String
    User: User
  },
  type User {
    email: String!,
    password: String!,
  }

  type Mutation {
    createUser(input: UserInput): User
  }

  input UserInput{
    email: String!,
    password: String!,
  }
`;

export default makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers
})