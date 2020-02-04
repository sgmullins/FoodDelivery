import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    name: String!
    email: String!
    foods: [Food!]
  }

  type Token {
    token: String!
  }

  extend type Query {
    user(name: String!): User!
    login(name: String!, password: String!): Token!
  }

  extend type Mutation {
    createUser(name: String!, password: String!, email: String!): User!
  }
`;
